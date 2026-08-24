import { Component } from '@angular/core';
import { TabService } from '../../core/services/tab.service';

@Component({
  selector: 'app-tab-bar',
  template: `
    <div class="tab-bar">
      @for (tab of tabService.tabs(); track tab.id) {
        <div
          class="tab"
          [class.active]="tabService.activeTabId() === tab.id"
          (click)="tabService.activateTab(tab.id)"
        >
          <span class="tab-icon" [attr.data-ext]="tab.fileExtension">
            <span class="file-icon" [class]="'icon-' + tab.icon"></span>
          </span>
          <span class="tab-label">{{ tab.label }}</span>
          @if (tab.isModified) {
            <span class="tab-modified">●</span>
          }
          <button
            class="tab-close"
            (click)="closeTab($event, tab.id)"
            aria-label="Close tab"
          >
            ×
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .tab-bar {
      display: flex;
      background-color: var(--vsc-bg-tab-inactive);
      height: 35px;
      overflow-x: auto;
      overflow-y: hidden;

      &::-webkit-scrollbar {
        height: 3px;
      }
    }

    .tab {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 12px;
      height: 35px;
      min-width: 120px;
      max-width: 200px;
      background-color: var(--vsc-bg-tab-inactive);
      color: var(--vsc-text-muted);
      font-size: 12px;
      cursor: pointer;
      border-right: 1px solid var(--vsc-border);
      white-space: nowrap;
      user-select: none;

      &:hover {
        .tab-close {
          opacity: 1;
        }
      }

      &.active {
        background-color: var(--vsc-bg-tab-active);
        color: var(--vsc-text-active);
        border-top: 1px solid var(--vsc-bg-statusbar);
        border-bottom: 1px solid var(--vsc-bg-tab-active);
      }
    }

    .tab-icon {
      display: flex;
      align-items: center;
    }

    .file-icon {
      width: 16px;
      height: 16px;
      display: inline-block;
    }

    .icon-typescript { color: #3178c6; }
    .icon-html { color: #e34c26; }
    .icon-scss { color: #cd6799; }
    .icon-json { color: #cbcb41; }
    .icon-markdown { color: #519aba; }
    .icon-pdf { color: #e44d26; }

    .file-icon::before {
      font-size: 14px;
      font-weight: bold;
    }

    .icon-typescript::before { content: 'TS'; color: #3178c6; font-size: 10px; }
    .icon-html::before { content: '<>'; color: #e34c26; font-size: 10px; }
    .icon-scss::before { content: 'S'; color: #cd6799; font-size: 10px; }
    .icon-json::before { content: '{}'; color: #cbcb41; font-size: 10px; }
    .icon-markdown::before { content: 'M↓'; color: #519aba; font-size: 10px; }
    .icon-pdf::before { content: 'PDF'; color: #e44d26; font-size: 9px; }

    .tab-label {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .tab-modified {
      color: var(--vsc-text-muted);
      font-size: 10px;
      margin-left: -2px;
    }

    .tab-close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border: none;
      background: transparent;
      color: var(--vsc-text-muted);
      font-size: 16px;
      cursor: pointer;
      border-radius: 4px;
      opacity: 0;
      margin-left: auto;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }

    @media (max-width: 768px) {
      .tab {
        min-width: 80px;
        max-width: 140px;
        padding: 0 8px;
        gap: 4px;
      }

      .tab-close {
        opacity: 1;
        width: 16px;
        height: 16px;
        font-size: 14px;
      }
    }
  `],
})
export class TabBarComponent {
  constructor(protected readonly tabService: TabService) {}

  closeTab(event: Event, tabId: string): void {
    event.stopPropagation();
    this.tabService.closeTab(tabId);
  }
}
