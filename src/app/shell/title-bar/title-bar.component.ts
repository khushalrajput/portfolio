import { Component } from '@angular/core';

@Component({
  selector: 'app-title-bar',
  template: `
    <div class="title-bar">
      <div class="title-bar-left">
        <svg class="vscode-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M15.5 0.5L6.5 15.5L0.5 10.5L4.5 8.5L2.5 5.5L8.5 3.5L7.5 0.5L15.5 0.5Z" fill="#007ACC"/>
        </svg>
      </div>
      <div class="title-bar-center">
        ANGULAR .NET DEVELOPER PORTFOLIO - Visual Studio Code
      </div>
      <div class="title-bar-controls">
        <button class="control-btn" aria-label="Minimize">
          <svg width="10" height="1" viewBox="0 0 10 1"><rect width="10" height="1" fill="currentColor"/></svg>
        </button>
        <button class="control-btn" aria-label="Maximize">
          <svg width="10" height="10" viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" stroke="currentColor" fill="none"/></svg>
        </button>
        <button class="control-btn close-btn" aria-label="Close">
          <svg width="10" height="10" viewBox="0 0 10 10"><line x1="0" y1="0" x2="10" y2="10" stroke="currentColor"/><line x1="10" y1="0" x2="0" y2="10" stroke="currentColor"/></svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .title-bar {
      display: flex;
      align-items: center;
      height: 30px;
      background-color: var(--vsc-bg-titlebar);
      color: var(--vsc-text-muted);
      font-size: 12px;
      padding: 0 8px;
      user-select: none;
      -webkit-app-region: drag;
    }

    .title-bar-left {
      display: flex;
      align-items: center;
      width: 60px;
    }

    .vscode-icon {
      width: 16px;
      height: 16px;
    }

    .title-bar-center {
      flex: 1;
      text-align: center;
      font-size: 11px;
      letter-spacing: 0.02em;
    }

    .title-bar-controls {
      display: flex;
      align-items: center;
      gap: 0;
      -webkit-app-region: no-drag;
    }

    .control-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 46px;
      height: 30px;
      border: none;
      background: transparent;
      color: var(--vsc-text-muted);
      cursor: pointer;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }

    .close-btn:hover {
      background: #e81123;
      color: white;
    }
  `],
})
export class TitleBarComponent {}
