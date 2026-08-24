import { Component, signal, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../core/services/sidebar.service';
import { LayoutService } from '../../core/services/layout.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

interface MenuItem {
  label: string;
  action?: () => void;
  divider?: boolean;
  shortcut?: string;
}

interface Menu {
  label: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-menu-bar',
  template: `
    <div class="menu-bar">
      @for (menu of menus; track menu.label) {
        <div class="menu-wrapper">
          <button
            class="menu-item"
            [class.active]="openMenu() === menu.label"
            (click)="toggleMenu(menu.label)"
            (mouseenter)="hoverMenu(menu.label)"
          >
            {{ menu.label }}
          </button>
          @if (openMenu() === menu.label) {
            <div class="dropdown">
              @for (item of menu.items; track item.label) {
                @if (item.divider) {
                  <div class="dropdown-divider"></div>
                } @else {
                  <button class="dropdown-item" (click)="executeItem(item)">
                    <span class="dropdown-label">{{ item.label }}</span>
                    @if (item.shortcut) {
                      <span class="dropdown-shortcut">{{ item.shortcut }}</span>
                    }
                  </button>
                }
              }
            </div>
          }
        </div>
      }
      <div class="spacer"></div>
      <div class="menu-wrapper">
        <button
          class="menu-item copilot-item"
          [class.active]="openMenu() === 'Copilot'"
          (click)="toggleCopilot()"
        >
          Copilot
        </button>
      </div>
    </div>
  `,
  styles: [`
    .menu-bar {
      display: flex;
      align-items: center;
      height: 30px;
      background-color: var(--vsc-bg-titlebar);
      padding: 0 8px;
      gap: 0;
      border-bottom: 1px solid var(--vsc-border);
    }

    .menu-wrapper {
      position: relative;
    }

    .spacer {
      flex: 1;
    }

    .menu-item {
      padding: 4px 8px;
      color: var(--vsc-text-muted);
      background: transparent;
      border: none;
      font-size: 12px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      cursor: pointer;
      border-radius: 4px;

      &:hover,
      &.active {
        background: rgba(255, 255, 255, 0.1);
        color: var(--vsc-text-primary);
      }
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 220px;
      background: var(--vsc-bg-editor);
      border: 1px solid var(--vsc-border);
      border-radius: 4px;
      padding: 4px 0;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
      z-index: 500;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 4px 24px;
      background: transparent;
      border: none;
      color: var(--vsc-text-primary);
      font-size: 12px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      cursor: pointer;
      text-align: left;

      &:hover {
        background: var(--vsc-bg-selection);
      }
    }

    .dropdown-label {
      flex: 1;
    }

    .dropdown-shortcut {
      color: var(--vsc-text-muted);
      font-size: 11px;
      margin-left: 24px;
    }

    .dropdown-divider {
      height: 1px;
      background: var(--vsc-border);
      margin: 4px 0;
    }
  `],
})
export class MenuBarComponent {
  readonly openMenu = signal<string | null>(null);

  constructor(
    private readonly router: Router,
    private readonly sidebarService: SidebarService,
    private readonly layoutService: LayoutService,
    private readonly data: PortfolioDataService,
  ) {}

  readonly menus: Menu[] = [
    {
      label: 'File',
      items: [
        { label: 'Download Resume', action: () => this.downloadResume() },
        { label: '', divider: true },
        { label: 'Open GitHub', action: () => window.open(this.data.profile.links.github, '_blank') },
        { label: 'Open LinkedIn', action: () => window.open(this.data.profile.links.linkedin, '_blank') },
      ],
    },
    {
      label: 'View',
      items: [
        { label: 'Command Palette...', shortcut: 'Ctrl+Shift+P', action: () => this.layoutService.openCommandPalette() },
        { label: '', divider: true },
        { label: 'Explorer', shortcut: 'Ctrl+Shift+E', action: () => this.sidebarService.togglePanel('explorer') },
        { label: 'Search', shortcut: 'Ctrl+Shift+F', action: () => this.sidebarService.togglePanel('search') },
        { label: 'Source Control', shortcut: 'Ctrl+Shift+G', action: () => this.sidebarService.togglePanel('git') },
        { label: '', divider: true },
        { label: 'Toggle Sidebar', shortcut: 'Ctrl+B', action: () => this.toggleSidebar() },
        { label: 'Toggle Terminal', shortcut: 'Ctrl+`', action: () => this.layoutService.toggleTerminal() },
      ],
    },
    {
      label: 'Go',
      items: [
        { label: 'README', action: () => this.router.navigate(['/readme']) },
        { label: 'About Me', action: () => this.router.navigate(['/about']) },
        { label: 'Projects', action: () => this.router.navigate(['/projects']) },
        { label: 'Skills', action: () => this.router.navigate(['/skills']) },
        { label: 'Styles', action: () => this.router.navigate(['/styles']) },
        { label: 'Resume', action: () => this.router.navigate(['/resume']) },
      ],
    },
    {
      label: 'Terminal',
      items: [
        { label: 'Toggle Terminal', shortcut: 'Ctrl+`', action: () => this.layoutService.toggleTerminal() },
      ],
    },
    {
      label: 'Help',
      items: [
        { label: 'About', action: () => this.router.navigate(['/readme']) },
        { label: '', divider: true },
        { label: 'View GitHub Repo', action: () => window.open(this.data.profile.links.github, '_blank') },
        { label: 'Connect on LinkedIn', action: () => window.open(this.data.profile.links.linkedin, '_blank') },
      ],
    },
  ];

  toggleMenu(label: string): void {
    this.openMenu.update((current) => (current === label ? null : label));
  }

  hoverMenu(label: string): void {
    if (this.openMenu() !== null) {
      this.openMenu.set(label);
    }
  }

  executeItem(item: MenuItem): void {
    this.openMenu.set(null);
    item.action?.();
  }

  toggleCopilot(): void {
    this.openMenu.set(null);
    this.sidebarService.toggleCopilot();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('app-menu-bar')) {
      this.openMenu.set(null);
    }
  }

  private toggleSidebar(): void {
    if (this.sidebarService.isOpen()) {
      this.sidebarService.closePanel();
    } else {
      this.sidebarService.togglePanel('explorer');
    }
  }

  private downloadResume(): void {
    const link = document.createElement('a');
    link.href = 'khushal_resume_angular.pdf';
    link.download = 'khushal_resume_angular.pdf';
    link.click();
  }
}
