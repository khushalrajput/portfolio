import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../../core/services/chatbot.service';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';

@Component({
  selector: 'app-copilot-chat-panel',
  imports: [FormsModule],
  template: `
    <div class="chat-panel">
      <div class="panel-header">
        <span class="copilot-icon">✦</span> COPILOT CHAT
      </div>

      <div class="chat-messages">
        <!-- Welcome message -->
        @if (chatbot.messages().length === 0) {
          <div class="welcome-message">
            <div class="bot-avatar">✦</div>
            <div class="welcome-text">
              <p>Hi! I'm Khushal's portfolio assistant. Ask me anything about his skills, experience, or projects.</p>
            </div>
            <div class="suggested-questions">
              @for (q of suggestedQuestions; track q) {
                <button class="suggestion-chip" (click)="askQuestion(q)" [disabled]="chatbot.isLimitReached()">
                  {{ q }}
                </button>
              }
            </div>
          </div>
        }

        <!-- Messages -->
        @for (msg of chatbot.messages(); track msg.timestamp) {
          <div class="message" [class.user]="msg.role === 'user'" [class.assistant]="msg.role === 'assistant'">
            @if (msg.role === 'assistant') {
              <span class="bot-avatar small">✦</span>
            }
            <div class="message-content">{{ msg.content }}</div>
          </div>
        }

        <!-- Typing indicator -->
        @if (chatbot.isLoading()) {
          <div class="message assistant">
            <span class="bot-avatar small">✦</span>
            <div class="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        }

        <!-- Limit reached -->
        @if (chatbot.isLimitReached()) {
          <div class="limit-message">
            You've used all 3 questions. Connect on
            <a [href]="data.profile.links.linkedin" target="_blank" rel="noopener">LinkedIn</a>
            for more!
          </div>
        }
      </div>

      <!-- Input -->
      <div class="chat-input">
        <div class="remaining">{{ chatbot.remainingRequests() }} questions remaining</div>
        <div class="input-row">
          <input
            type="text"
            [(ngModel)]="inputText"
            placeholder="Ask something..."
            (keydown.enter)="send()"
            [disabled]="chatbot.isLimitReached() || chatbot.isLoading()"
          />
          <button
            class="send-btn"
            (click)="send()"
            [disabled]="chatbot.isLimitReached() || chatbot.isLoading() || !inputText.trim()"
          >
            ⏎
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chat-panel {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .panel-header {
      padding: 8px 16px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--vsc-text-muted);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .copilot-icon {
      color: var(--vsc-accent-purple);
      font-size: 14px;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .welcome-message {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .bot-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      background: rgba(197, 134, 192, 0.15);
      border-radius: 50%;
      color: var(--vsc-accent-purple);
      font-size: 14px;
      flex-shrink: 0;
    }

    .bot-avatar.small {
      width: 22px;
      height: 22px;
      font-size: 11px;
    }

    .welcome-text p {
      font-size: 12px;
      color: var(--vsc-text-primary);
      line-height: 1.5;
    }

    .suggested-questions {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .suggestion-chip {
      text-align: left;
      padding: 6px 10px;
      background: rgba(0, 122, 204, 0.1);
      border: 1px solid rgba(0, 122, 204, 0.3);
      color: var(--vsc-accent-blue);
      font-size: 11px;
      border-radius: 6px;
      cursor: pointer;

      &:hover:not(:disabled) {
        background: rgba(0, 122, 204, 0.2);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .message {
      display: flex;
      gap: 8px;
      align-items: flex-start;

      &.user {
        justify-content: flex-end;
      }
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

    .typing-indicator {
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

    .limit-message {
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

    .chat-input {
      padding: 8px 12px;
      border-top: 1px solid var(--vsc-border);
    }

    .remaining {
      font-size: 10px;
      color: var(--vsc-text-muted);
      margin-bottom: 4px;
    }

    .input-row {
      display: flex;
      gap: 6px;

      input {
        flex: 1;
        padding: 6px 10px;
        background: var(--vsc-bg-input);
        border: 1px solid var(--vsc-border);
        color: var(--vsc-text-primary);
        font-size: 12px;
        font-family: inherit;
        border-radius: 4px;
        outline: none;

        &:focus {
          border-color: var(--vsc-bg-statusbar);
        }

        &:disabled {
          opacity: 0.5;
        }
      }
    }

    .send-btn {
      padding: 6px 10px;
      background: var(--vsc-bg-statusbar);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;

      &:hover:not(:disabled) {
        opacity: 0.9;
      }

      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }
  `],
})
export class CopilotChatPanelComponent {
  inputText = '';
  readonly suggestedQuestions: string[];

  constructor(
    protected readonly chatbot: ChatbotService,
    protected readonly data: PortfolioDataService,
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
