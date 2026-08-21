import { Component } from '@angular/core';
import { SidebarService, SidebarPanel } from '../../core/services/sidebar.service';

interface ActivityBarItem {
  panel: SidebarPanel;
  label: string;
  svgPath: string;
  badge?: number;
}

@Component({
  selector: 'app-activity-bar',
  template: `
    <div class="activity-bar">
      <div class="activity-bar-top">
        @for (item of topItems; track item.panel) {
          <button
            class="activity-icon"
            [class.active]="sidebarService.activePanel() === item.panel"
            [attr.aria-label]="item.label"
            [title]="item.label"
            (click)="sidebarService.togglePanel(item.panel)"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path [attr.d]="item.svgPath" />
            </svg>
            @if (item.badge) {
              <span class="badge">{{ item.badge }}</span>
            }
          </button>
        }
      </div>
      <div class="activity-bar-bottom">
        @for (item of bottomItems; track item.panel) {
          <button
            class="activity-icon"
            [class.active]="sidebarService.activePanel() === item.panel"
            [attr.aria-label]="item.label"
            [title]="item.label"
            (click)="sidebarService.togglePanel(item.panel)"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path [attr.d]="item.svgPath" />
            </svg>
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    .activity-bar {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 48px;
      min-width: 48px;
      background-color: var(--vsc-bg-activitybar);
      border-right: 1px solid var(--vsc-border);
    }

    .activity-bar-top,
    .activity-bar-bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .activity-icon {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border: none;
      background: transparent;
      color: var(--vsc-text-muted);
      cursor: pointer;
      border-left: 2px solid transparent;

      &:hover {
        color: var(--vsc-text-active);
      }

      &.active {
        color: var(--vsc-text-active);
        border-left-color: var(--vsc-text-active);
      }
    }

    .badge {
      position: absolute;
      top: 8px;
      right: 8px;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      background: var(--vsc-bg-statusbar);
      color: white;
      font-size: 9px;
      font-weight: 600;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `],
})
export class ActivityBarComponent {
  constructor(protected readonly sidebarService: SidebarService) {}

  readonly topItems: ActivityBarItem[] = [
    {
      panel: 'explorer',
      label: 'Explorer',
      svgPath: 'M17.5 0H8.5L7 1.5V6H2.5L1 7.5V22.5699L2.5 24H14.5699L16 22.5699V18H20.7L22 16.5699V4.5L17.5 0ZM17.5 2.12L19.88 4.5H17.5V2.12ZM14.5 22.5H2.5V7.5H7V16.5699L8.5 18H14.5V22.5ZM20.5 16.5H8.5V1.5H16V6H20.5V16.5Z',
    },
    {
      panel: 'git',
      label: 'Source Control',
      svgPath: 'M21.007 8.222A3.738 3.738 0 0 0 15.045 5.2a3.737 3.737 0 0 0 1.156 6.583 2.988 2.988 0 0 1-2.668 1.67h-2.99a4.456 4.456 0 0 0-2.989 1.165V7.4a3.737 3.737 0 1 0-1.494 0v9.117a3.776 3.776 0 1 0 1.816.099 2.99 2.99 0 0 1 2.668-1.667h2.99a4.484 4.484 0 0 0 4.223-3.039 3.736 3.736 0 0 0 3.25-3.687ZM4.565 3.738a2.242 2.242 0 1 1 4.484 0 2.242 2.242 0 0 1-4.484 0Zm4.484 16.441a2.242 2.242 0 1 1-4.484 0 2.242 2.242 0 0 1 4.484 0Zm8.221-9.715a2.242 2.242 0 1 1 0-4.484 2.242 2.242 0 0 1 0 4.484Z',
      badge: 5,
    },
  ];

  readonly bottomItems: ActivityBarItem[] = [
    {
      panel: 'skills',
      label: 'Skills Overview',
      svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    },
    {
      panel: 'copilot',
      label: 'Copilot Chat',
      svgPath: 'M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7 3.5v7.64l-7 3.5-7-3.5V7.68l7-3.5zM12 8a4 4 0 100 8 4 4 0 000-8zm0 2a2 2 0 110 4 2 2 0 010-4z',
    },
  ];
}
