import { Component, signal } from '@angular/core';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-status-bar',
  template: `
    <div class="status-bar">
      <div class="status-left">
        <a class="status-item branch" [href]="data.profile.links.github" target="_blank" rel="noopener">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
            <path d="M14.5 2H9.71l-.85-.85L8.5.79h-3l-.36.36L4.29 2H1.5l-.5.5v10l.5.5h13l.5-.5v-10l-.5-.5zm-.5 10H2V3h2.29l.85.85.36.15h3l.35-.15.86-.85H14v9z"/>
          </svg>
          main*
        </a>
        <span class="status-item sync">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2.5 2h11l.5.5v11l-.5.5h-11l-.5-.5v-11l.5-.5zM3 13h10V3H3v10z"/>
          </svg>
          ↑0 ↓321
        </span>
      </div>
      <div class="status-center">
        <span class="status-item errors">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 110 14A7 7 0 018 1zm0 1a6 6 0 100 12A6 6 0 008 2zm-.7 8.5h1.4v1.4H7.3V10.5zm0-6.4h1.4v5h-1.4v-5z"/>
          </svg>
          0
        </span>
        <span class="status-item warnings">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M7.56 1h.88l6.94 12.81-.44.75H1.06l-.44-.75L7.56 1zm.44 2.12L2.47 13h11.06L8 3.12zM7.25 11h1.5v1.5h-1.5V11zm0-5h1.5v4h-1.5V6z"/>
          </svg>
          1
        </span>
      </div>
      <div class="status-right">
        <span class="status-item">Ln 12, Col 40</span>
        <span class="status-item">Spaces: 2</span>
        <span class="status-item">UTF-8</span>
        <span class="status-item">LF</span>
        <span class="status-item">{{ '{' }}{{ '}' }} TypeScript Angular</span>
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
      padding: 0 4px;
      user-select: none;
    }

    .status-left,
    .status-center,
    .status-right {
      display: flex;
      align-items: center;
      gap: 0;
    }

    .status-item {
      display: flex;
      align-items: center;
      gap: 3px;
      padding: 0 5px;
      height: 22px;
      color: white;
      text-decoration: none;
      font-size: 11px;
      white-space: nowrap;
      cursor: default;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;

      svg {
        opacity: 0.9;
      }
    }

    a.status-item:hover,
    button.status-item:hover {
      background: rgba(255, 255, 255, 0.12);
      cursor: pointer;
    }

    .warnings {
      color: #ffd700;
    }

    .branch {
      background: rgba(255, 255, 255, 0.08);
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

    @media (max-width: 768px) {
      .status-center {
        display: none;
      }

      .status-right {
        .status-item:not(.bell):not(.link) {
          display: none;
        }
      }
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
