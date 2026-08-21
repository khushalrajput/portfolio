import { Component, signal } from '@angular/core';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-status-bar',
  template: `
    <div class="status-bar">
      <div class="status-left">
        <a class="status-item branch" [href]="data.profile.links.github" target="_blank" rel="noopener">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5z"/>
          </svg>
          master*
        </a>
        <span class="status-item">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 4a4 4 0 100 8 4 4 0 000-8z"/>
          </svg>
          0↓ 0↑
        </span>
        <span class="status-item">⊘ 0</span>
        <span class="status-item warning">⚠ 1</span>
      </div>
      <div class="status-right">
        <span class="status-item">Ln 12, Col 40</span>
        <span class="status-item">Spaces: 2</span>
        <span class="status-item">UTF-8</span>
        <span class="status-item">LF</span>
        <span class="status-item">Angular v21</span>
        <span class="status-item">.NET 10</span>
        <button
          class="status-item bell"
          [class.pulsing]="showNotification()"
          (click)="toggleNotification()"
        >
          🔔
          @if (showNotification()) {
            <div class="notification-popup">
              Want to connect? Find me on
              <a [href]="data.profile.links.linkedin" target="_blank" rel="noopener">LinkedIn</a>
              or
              <a [href]="data.profile.links.github" target="_blank" rel="noopener">GitHub</a>
            </div>
          }
        </button>
        <a class="status-item link" [href]="data.profile.links.github" target="_blank" rel="noopener">GitHub</a>
        <a class="status-item link" [href]="data.profile.links.linkedin" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </div>
  `,
  styles: [`
    .status-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 22px;
      background-color: var(--vsc-bg-statusbar);
      color: white;
      font-size: 12px;
      padding: 0 8px;
      user-select: none;
    }

    .status-left,
    .status-right {
      display: flex;
      align-items: center;
      gap: 0;
    }

    .status-item {
      display: flex;
      align-items: center;
      gap: 3px;
      padding: 0 6px;
      height: 22px;
      color: white;
      text-decoration: none;
      font-size: 11px;
      white-space: nowrap;
      cursor: default;

      svg {
        opacity: 0.9;
      }
    }

    a.status-item:hover,
    button.status-item:hover {
      background: rgba(255, 255, 255, 0.12);
      cursor: pointer;
    }

    .warning {
      color: #ffd700;
    }

    .branch {
      background: rgba(255, 255, 255, 0.12);
      cursor: pointer;
    }

    .bell {
      position: relative;
      border: none;
      background: transparent;
      font-size: 12px;
    }

    .bell.pulsing {
      animation: pulse 2s infinite;
    }

    .notification-popup {
      position: absolute;
      bottom: 28px;
      right: 0;
      background: var(--vsc-bg-sidebar);
      border: 1px solid var(--vsc-border);
      padding: 12px 16px;
      border-radius: 4px;
      font-size: 12px;
      color: var(--vsc-text-primary);
      white-space: nowrap;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
      z-index: 100;

      a {
        color: var(--vsc-accent-blue);
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .link {
      text-decoration: none;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `],
})
export class StatusBarComponent {
  readonly showNotification = signal(false);

  constructor(protected readonly data: PortfolioDataService) {}

  toggleNotification(): void {
    this.showNotification.update((v) => !v);
  }
}
