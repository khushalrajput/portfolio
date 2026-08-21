import { Component } from '@angular/core';

@Component({
  selector: 'app-title-bar',
  template: `
    <div class="title-bar">
      <div class="title-bar-left">
        <svg class="vscode-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M15.5 0.5L6.5 15.5L0.5 10.5L4.5 8.5L2.5 5.5L8.5 3.5L7.5 0.5L15.5 0.5Z" fill="#007ACC"/>
        </svg>
        <div class="nav-arrows">
          <button class="nav-btn" aria-label="Go Back">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M7.5 1L1 8l6.5 7 .7-.7L2.4 8.5H15v-1H2.4l5.8-5.8-.7-.7z"/></svg>
          </button>
          <button class="nav-btn" aria-label="Go Forward">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8.5 1l6.5 7-6.5 7-.7-.7 5.8-5.8H1v-1h12.6L7.8 1.7l.7-.7z"/></svg>
          </button>
        </div>
      </div>
      <div class="title-bar-center">
        <div class="command-palette-box">
          portfolio
        </div>
      </div>
      <div class="title-bar-right">
        <button class="layout-btn" aria-label="Toggle Panel">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M2 1h12l1 1v12l-1 1H2l-1-1V2l1-1zm0 1v12h12V2H2zm1 8h10v3H3v-3z"/></svg>
        </button>
        <button class="layout-btn" aria-label="Toggle Sidebar">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M2 1h12l1 1v12l-1 1H2l-1-1V2l1-1zm0 1v12h12V2H2zm1 1h4v10H3V3z"/></svg>
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
      gap: 4px;
    }

    .title-bar-left {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .vscode-icon {
      width: 16px;
      height: 16px;
    }

    .nav-arrows {
      display: flex;
      gap: 0;
    }

    .nav-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 22px;
      background: transparent;
      border: none;
      color: var(--vsc-text-muted);
      cursor: pointer;
      border-radius: 4px;
      opacity: 0.5;

      &:hover {
        background: rgba(255, 255, 255, 0.08);
        opacity: 0.8;
      }
    }

    .title-bar-center {
      flex: 1;
      display: flex;
      justify-content: center;
    }

    .command-palette-box {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 200px;
      max-width: 400px;
      height: 22px;
      padding: 0 48px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      font-size: 11px;
      color: var(--vsc-text-muted);
      cursor: pointer;

      &:hover {
        background: rgba(255, 255, 255, 0.08);
      }
    }

    .title-bar-right {
      display: flex;
      align-items: center;
      gap: 0;
    }

    .layout-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 22px;
      background: transparent;
      border: none;
      color: var(--vsc-text-muted);
      cursor: pointer;
      border-radius: 4px;

      &:hover {
        background: rgba(255, 255, 255, 0.08);
      }
    }
  `],
})
export class TitleBarComponent {}
