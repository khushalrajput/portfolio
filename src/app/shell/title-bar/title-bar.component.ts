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
        ANGULAR .NET DEVELOPER PORTFOLIO — Visual Studio Code
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
  `],
})
export class TitleBarComponent {}
