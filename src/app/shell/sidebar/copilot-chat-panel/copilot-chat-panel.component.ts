import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../../core/services/chatbot.service';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-copilot-chat-panel',
  imports: [FormsModule],
  template: `
    <div class="copilot-panel">
      <!-- Header -->
      <div class="copilot-header">
        <div class="header-left">
          <span class="copilot-icon">✦</span>
          <span class="header-title">Khushal's AI Assistant</span>
        </div>
        <button class="header-close" (click)="sidebar.closeCopilot()" aria-label="Close">×</button>
      </div>

      <!-- Workspace badge -->
      <div class="workspace-bar">
        <span class="workspace-label">WORKSPACE</span>
        <span class="workspace-badge">● portfolio · khushal-rajput</span>
      </div>

      <!-- Chat area -->
      <div class="chat-area">
        @if (chatbot.messages().length === 0) {
          <!-- Welcome -->
          <div class="welcome">
            <div class="bot-avatar">✦</div>
            <h3 class="greeting">Hi! I'm Khushal's Copilot 👋</h3>
            <p class="greeting-sub">Ask me anything about his projects, skills, experience, or achievements.</p>

            <!-- Suggested questions grid -->
            <div class="suggestions-grid">
              @for (q of suggestedQuestions; track q) {
                <button
                  class="suggestion-card"
                  (click)="askQuestion(q)"
                  [disabled]="chatbot.isLimitReached()"
                >
                  <span class="suggestion-icon">✦</span>
                  <span class="suggestion-text">{{ q }}</span>
                </button>
              }
            </div>
          </div>
        }

        <!-- Messages -->
        @for (msg of chatbot.messages(); track msg.timestamp) {
          <div class="message" [class.user]="msg.role === 'user'" [class.assistant]="msg.role === 'assistant'">
            @if (msg.role === 'assistant') {
              <span class="msg-avatar">✦</span>
            }
            <div class="message-content">{{ msg.content }}</div>
          </div>
        }

        <!-- Typing indicator -->
        @if (chatbot.isLoading()) {
          <div class="message assistant">
            <span class="msg-avatar">✦</span>
            <div class="typing-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        }

        <!-- Limit reached -->
        @if (chatbot.isLimitReached()) {
          <div class="limit-msg">
            You've used all 3 questions. Connect on
            <a [href]="data.profile.links.linkedin" target="_blank" rel="noopener">LinkedIn</a>
            for more!
          </div>
        }
      </div>

      <!-- Input area -->
      <div class="input-area">
        <div class="input-wrapper">
          <input
            type="text"
            [(ngModel)]="inputText"
            placeholder="Ask about projects, experience, skills..."
            (keydown.enter)="send()"
            [disabled]="chatbot.isLimitReached() || chatbot.isLoading()"
          />
          <button
            class="send-btn"
            (click)="send()"
            [disabled]="chatbot.isLimitReached() || chatbot.isLoading() || !inputText.trim()"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1 1.91L7.37 8 1 14.09V1.91zM2 4.09V11.91L6.63 8 2 4.09zM15 8L8 1.91V14.09L15 8z"/>
            </svg>
          </button>
        </div>
        <div class="input-footer">
          <span class="remaining">{{ chatbot.remainingRequests() }}/3 remaining</span>
          <span class="disclaimer">AI can make mistakes · Contact Khushal directly for important info</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      height: 100%;
    }

    .copilot-panel {
      width: 340px;
      min-width: 280px;
      height: 100%;
      background: var(--vsc-bg-sidebar);
      border-left: 1px solid var(--vsc-border);
      display: flex;
      flex-direction: column;
    }

    .copilot-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      border-bottom: 1px solid var(--vsc-border);
      min-height: 36px;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .copilot-icon {
      color: var(--vsc-accent-purple);
      font-size: 14px;
    }

    .header-title {
      font-size: 12px;
      font-weight: 600;
      color: var(--vsc-text-active);
    }

    .header-close {
      background: transparent;
      border: none;
      color: var(--vsc-text-muted);
      font-size: 18px;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 4px;
      line-height: 1;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: var(--vsc-text-active);
      }
    }

    .workspace-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border-bottom: 1px solid var(--vsc-border);
    }

    .workspace-label {
      font-size: 10px;
      color: var(--vsc-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .workspace-badge {
      font-size: 11px;
      color: var(--vsc-accent-cyan);
      background: rgba(78, 201, 176, 0.1);
      padding: 2px 8px;
      border-radius: 10px;
      border: 1px solid rgba(78, 201, 176, 0.2);
    }

    .chat-area {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .welcome {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 8px;
      padding-top: 16px;
    }

    .bot-avatar {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(197, 134, 192, 0.15);
      border-radius: 50%;
      color: var(--vsc-accent-purple);
      font-size: 22px;
    }

    .greeting {
      font-size: 15px;
      font-weight: 600;
      color: var(--vsc-text-active);
      margin: 4px 0 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .greeting-sub {
      font-size: 12px;
      color: var(--vsc-text-muted);
      line-height: 1.4;
      max-width: 280px;
    }

    .suggestions-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      width: 100%;
      margin-top: 12px;
    }

    .suggestion-card {
      display: flex;
      align-items: flex-start;
      gap: 6px;
      padding: 10px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--vsc-border);
      border-radius: 8px;
      color: var(--vsc-text-primary);
      font-size: 11px;
      text-align: left;
      cursor: pointer;
      line-height: 1.4;

      &:hover:not(:disabled) {
        border-color: var(--vsc-accent-purple);
        background: rgba(197, 134, 192, 0.05);
      }

      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }

    .suggestion-icon {
      color: var(--vsc-accent-purple);
      font-size: 10px;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .suggestion-text {
      flex: 1;
    }

    .message {
      display: flex;
      gap: 8px;
      align-items: flex-start;

      &.user {
        justify-content: flex-end;
      }
    }

    .msg-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      background: rgba(197, 134, 192, 0.15);
      border-radius: 50%;
      color: var(--vsc-accent-purple);
      font-size: 11px;
      flex-shrink: 0;
    }

    .message-content {
      max-width: 85%;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 12px;
      line-height: 1.5;
      white-space: pre-wrap;
    }

    .user .message-content {
      background: var(--vsc-bg-statusbar);
      color: white;
      border-bottom-right-radius: 2px;
    }

    .assistant .message-content {
      background: rgba(255, 255, 255, 0.05);
      color: var(--vsc-text-primary);
      border-bottom-left-radius: 2px;
    }

    .typing-dots {
      display: flex;
      gap: 4px;
      padding: 12px;

      span {
        width: 6px;
        height: 6px;
        background: var(--vsc-text-muted);
        border-radius: 50%;
        animation: bounce 1.4s infinite ease-in-out;

        &:nth-child(1) { animation-delay: 0s; }
        &:nth-child(2) { animation-delay: 0.2s; }
        &:nth-child(3) { animation-delay: 0.4s; }
      }
    }

    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
      40% { transform: scale(1); opacity: 1; }
    }

    .limit-msg {
      text-align: center;
      padding: 12px;
      font-size: 12px;
      color: var(--vsc-text-muted);
      background: rgba(255, 255, 255, 0.03);
      border-radius: 6px;

      a {
        color: var(--vsc-accent-blue);
        text-decoration: none;
        &:hover { text-decoration: underline; }
      }
    }

    .input-area {
      border-top: 1px solid var(--vsc-border);
      padding: 8px 12px;
    }

    .input-wrapper {
      display: flex;
      gap: 6px;
      background: var(--vsc-bg-input);
      border: 1px solid var(--vsc-border);
      border-radius: 6px;
      padding: 2px;

      &:focus-within {
        border-color: var(--vsc-bg-statusbar);
      }

      input {
        flex: 1;
        padding: 6px 8px;
        background: transparent;
        border: none;
        color: var(--vsc-text-primary);
        font-size: 12px;
        font-family: inherit;
        outline: none;

        &:disabled { opacity: 0.5; }
      }
    }

    .send-btn {
      padding: 6px 8px;
      background: var(--vsc-accent-purple);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;

      &:hover:not(:disabled) { opacity: 0.9; }
      &:disabled { opacity: 0.3; cursor: not-allowed; }
    }

    .input-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 4px;
      padding: 0 2px;
    }

    .remaining {
      font-size: 10px;
      color: var(--vsc-text-muted);
    }

    .disclaimer {
      font-size: 9px;
      color: var(--vsc-text-muted);
      opacity: 0.7;
    }
  `],
})
export class CopilotChatPanelComponent {
  inputText = '';
  readonly suggestedQuestions: string[];

  constructor(
    protected readonly chatbot: ChatbotService,
    protected readonly data: PortfolioDataService,
    protected readonly sidebar: SidebarService,
  ) {
    this.suggestedQuestions = data.chatbotContext.suggestedQuestions;
  }

  async send(): Promise<void> {
    if (!this.inputText.trim()) return;
    const message = this.inputText;
    this.inputText = '';
    await this.chatbot.sendMessage(message);
  }

  async askQuestion(question: string): Promise<void> {
    this.inputText = '';
    await this.chatbot.sendMessage(question);
  }
}
