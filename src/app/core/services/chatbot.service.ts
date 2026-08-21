import { Injectable, signal, computed } from '@angular/core';
import { ChatMessage } from '../models/portfolio.models';
import { PortfolioDataService } from './portfolio-data.service';
import { environment } from '../../../environments/environment';

const MAX_REQUESTS = 3;
const STORAGE_KEY = 'portfolio_chat_count';

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  private readonly _messages = signal<ChatMessage[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _requestCount = signal(this.getStoredCount());

  readonly messages = this._messages.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly requestCount = this._requestCount.asReadonly();
  readonly remainingRequests = computed(() => MAX_REQUESTS - this._requestCount());
  readonly isLimitReached = computed(() => this._requestCount() >= MAX_REQUESTS);

  constructor(private readonly dataService: PortfolioDataService) {}

  async sendMessage(userMessage: string): Promise<void> {
    if (this.isLimitReached() || !userMessage.trim()) return;

    // Add user message
    this._messages.update((msgs) => [
      ...msgs,
      { role: 'user', content: userMessage.trim(), timestamp: new Date() },
    ]);

    this._isLoading.set(true);

    try {
      const response = await this.callGeminiApi(userMessage.trim());
      this._messages.update((msgs) => [
        ...msgs,
        { role: 'assistant', content: response, timestamp: new Date() },
      ]);
      this._requestCount.update((c) => c + 1);
      this.storeCount(this._requestCount());
    } catch {
      // Fallback to pre-scripted response
      const fallback = this.getFallbackResponse(userMessage);
      this._messages.update((msgs) => [
        ...msgs,
        { role: 'assistant', content: fallback, timestamp: new Date() },
      ]);
      this._requestCount.update((c) => c + 1);
      this.storeCount(this._requestCount());
    } finally {
      this._isLoading.set(false);
    }
  }

  private async callGeminiApi(userMessage: string): Promise<string> {
    const apiKey = environment.geminiApiKey;
    if (!apiKey) {
      throw new Error('No API key configured');
    }

    const systemPrompt = this.dataService.chatbotContext.systemPrompt;

    const response = await fetch(`${environment.geminiApiUrl}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ parts: [{ text: userMessage }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      }),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Sorry, I could not generate a response.';
  }

  private getFallbackResponse(question: string): string {
    const fallbacks = this.dataService.chatbotContext.fallbackResponses as Record<string, string>;
    const lowerQ = question.toLowerCase();

    for (const [key, value] of Object.entries(fallbacks)) {
      if (lowerQ.includes(key.toLowerCase().split(' ').slice(0, 2).join(' '))) {
        return value;
      }
    }

    return "I can only answer questions about Khushal's professional profile. Try asking about his tech stack, projects, or experience!";
  }

  private getStoredCount(): number {
    try {
      return parseInt(localStorage.getItem(STORAGE_KEY) ?? '0', 10);
    } catch {
      return 0;
    }
  }

  private storeCount(count: number): void {
    try {
      localStorage.setItem(STORAGE_KEY, count.toString());
    } catch {
      // localStorage unavailable — count resets on reload
    }
  }
}
