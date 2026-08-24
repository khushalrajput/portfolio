import { Component, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { SidebarService } from '../../core/services/sidebar.service';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-title-bar',
  template: `
    <div class="title-bar">
      <div class="title-bar-left">
        <img class="vscode-icon" src="logo.webp" alt="Logo" width="16" height="16" />
        <div class="nav-arrows">
          <button class="nav-btn" aria-label="Go Back" title="Go Back" (click)="goBack()">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M7.5 1L1 8l6.5 7 .7-.7L2.4 8.5H15v-1H2.4l5.8-5.8-.7-.7z"/></svg>
          </button>
          <button class="nav-btn" aria-label="Go Forward" title="Go Forward" (click)="goForward()">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8.5 1l6.5 7-6.5 7-.7-.7 5.8-5.8H1v-1h12.6L7.8 1.7l.7-.7z"/></svg>
          </button>
        </div>
      </div>
      <div class="title-bar-center">
        <button class="command-palette-box" (click)="layoutService.openCommandPalette()">
          portfolio — search commands (Ctrl+Shift+P)
        </button>
      </div>
      <div class="title-bar-right">
        <button class="layout-btn" aria-label="Toggle Terminal" title="Toggle Terminal (Ctrl+\`)" (click)="layoutService.toggleTerminal()">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M2 1h12l1 1v12l-1 1H2l-1-1V2l1-1zm0 1v12h12V2H2zm1 8h10v3H3v-3z"/></svg>
        </button>
        <button class="layout-btn" aria-label="Toggle Sidebar" title="Toggle Sidebar (Ctrl+B)" (click)="toggleSidebar()">
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

      &:hover {
        background: rgba(255, 255, 255, 0.08);
        color: var(--vsc-text-primary);
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
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

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

    @media (max-width: 768px) {
      .nav-arrows {
        display: none;
      }

      .command-palette-box {
        min-width: unset;
        padding: 0 12px;
        font-size: 10px;
      }

      .title-bar-right {
        display: none;
      }
    }
  `],
})
export class TitleBarComponent {
  constructor(
    private readonly location: Location,
    private readonly sidebarService: SidebarService,
    protected readonly layoutService: LayoutService,
  ) {}

  goBack(): void {
    this.location.back();
  }

  goForward(): void {
    this.location.forward();
  }

  toggleSidebar(): void {
    if (this.sidebarService.isOpen()) {
      this.sidebarService.closePanel();
    } else {
      this.sidebarService.togglePanel('explorer');
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.ctrlKey && event.shiftKey && event.key === 'P') {
      event.preventDefault();
      this.layoutService.toggleCommandPalette();
    }
    if (event.ctrlKey && event.key === 'b') {
      event.preventDefault();
      this.toggleSidebar();
    }
    if (event.ctrlKey && event.key === '`') {
      event.preventDefault();
      this.layoutService.toggleTerminal();
    }
  }
}
