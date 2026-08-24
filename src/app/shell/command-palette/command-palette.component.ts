import { Component, signal, computed, OnInit, OnDestroy, ElementRef, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../core/services/layout.service';
import { SidebarService } from '../../core/services/sidebar.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

interface PaletteCommand {
  id: string;
  label: string;
  category: string;
  action: () => void;
}

@Component({
  selector: 'app-command-palette',
  template: `
    @if (layoutService.commandPaletteOpen()) {
      <div class="palette-backdrop" (click)="layoutService.closeCommandPalette()">
        <div class="palette-container" (click)="$event.stopPropagation()">
          <div class="palette-input-wrapper">
            <span class="palette-prefix">></span>
            <input
              #searchInput
              type="text"
              class="palette-input"
              placeholder="Type a command..."
              [value]="query()"
              (input)="query.set(searchInput.value)"
              (keydown.escape)="layoutService.closeCommandPalette()"
              (keydown.enter)="executeSelected()"
              (keydown.arrowDown)="moveSelection(1)"
              (keydown.arrowUp)="moveSelection(-1)"
            />
          </div>
          <div class="palette-results">
            @for (cmd of filtered(); track cmd.id; let i = $index) {
              <button
                class="palette-item"
                [class.selected]="i === selectedIndex()"
                (click)="execute(cmd)"
                (mouseenter)="selectedIndex.set(i)"
              >
                <span class="palette-category">{{ cmd.category }}</span>
                <span class="palette-label">{{ cmd.label }}</span>
              </button>
            }
            @if (filtered().length === 0) {
              <div class="palette-empty">No matching commands</div>
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .palette-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      display: flex;
      justify-content: center;
      padding-top: 60px;
    }

    .palette-container {
      width: 600px;
      max-height: 400px;
      background: var(--vsc-bg-editor);
      border: 1px solid var(--vsc-border);
      border-radius: 6px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: fit-content;
    }

    .palette-input-wrapper {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      border-bottom: 1px solid var(--vsc-border);
    }

    .palette-prefix {
      color: var(--vsc-accent-blue);
      font-size: 14px;
      margin-right: 6px;
      font-family: 'Cascadia Code', monospace;
    }

    .palette-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: var(--vsc-text-primary);
      font-size: 14px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .palette-results {
      overflow-y: auto;
      max-height: 340px;
    }

    .palette-item {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 6px 14px;
      background: transparent;
      border: none;
      color: var(--vsc-text-primary);
      font-size: 13px;
      cursor: pointer;
      text-align: left;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

      &:hover,
      &.selected {
        background: var(--vsc-bg-selection);
      }
    }

    .palette-category {
      color: var(--vsc-accent-blue);
      font-size: 11px;
      min-width: 70px;
    }

    .palette-label {
      color: var(--vsc-text-primary);
    }

    .palette-empty {
      padding: 12px 14px;
      color: var(--vsc-text-muted);
      font-size: 13px;
    }

    @media (max-width: 768px) {
      .palette-backdrop {
        padding-top: 30px;
      }

      .palette-container {
        width: 95vw;
        max-height: 70vh;
      }
    }
  `],
})
export class CommandPaletteComponent implements OnInit, OnDestroy {
  private readonly searchInput = viewChild<ElementRef>('searchInput');

  readonly query = signal('');
  readonly selectedIndex = signal(0);

  private commands: PaletteCommand[] = [];

  readonly filtered = computed(() => {
    const q = this.query().toLowerCase();
    if (!q) return this.commands;
    return this.commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q),
    );
  });

  private observer: MutationObserver | null = null;

  constructor(
    protected readonly layoutService: LayoutService,
    private readonly router: Router,
    private readonly sidebarService: SidebarService,
    private readonly data: PortfolioDataService,
  ) {}

  ngOnInit(): void {
    this.commands = [
      // Navigation
      { id: 'go-readme', label: 'Go to README', category: 'Go', action: () => this.router.navigate(['/readme']) },
      { id: 'go-about', label: 'Go to About Me', category: 'Go', action: () => this.router.navigate(['/about']) },
      { id: 'go-projects', label: 'Go to Projects', category: 'Go', action: () => this.router.navigate(['/projects']) },
      { id: 'go-skills', label: 'Go to Skills', category: 'Go', action: () => this.router.navigate(['/skills']) },
      { id: 'go-config', label: 'Go to App Config', category: 'Go', action: () => this.router.navigate(['/styles']) },
      { id: 'go-angular-json', label: 'Go to angular.json', category: 'Go', action: () => this.router.navigate(['/angular-json']) },
      // View
      { id: 'toggle-sidebar', label: 'Toggle Sidebar', category: 'View', action: () => this.toggleSidebar() },
      { id: 'toggle-terminal', label: 'Toggle Terminal', category: 'View', action: () => this.layoutService.toggleTerminal() },
      { id: 'toggle-copilot', label: 'Toggle Copilot Chat', category: 'View', action: () => this.sidebarService.toggleCopilot() },
      { id: 'show-explorer', label: 'Show Explorer', category: 'View', action: () => this.sidebarService.togglePanel('explorer') },
      { id: 'show-git', label: 'Show Source Control', category: 'View', action: () => this.sidebarService.togglePanel('git') },
      { id: 'show-search', label: 'Show Search', category: 'View', action: () => this.sidebarService.togglePanel('search') },
      { id: 'show-skills', label: 'Show Skills Panel', category: 'View', action: () => this.sidebarService.togglePanel('skills') },
      // File
      { id: 'download-resume', label: 'Download Resume', category: 'File', action: () => this.downloadResume() },
      { id: 'open-github', label: 'Open GitHub', category: 'File', action: () => window.open(this.data.profile.links.github, '_blank') },
      { id: 'open-linkedin', label: 'Open LinkedIn', category: 'File', action: () => window.open(this.data.profile.links.linkedin, '_blank') },
      // Help
      { id: 'about', label: 'About', category: 'Help', action: () => this.router.navigate(['/readme']) },
    ];

    // Focus input when palette opens
    this.observer = new MutationObserver(() => {
      setTimeout(() => this.searchInput()?.nativeElement?.focus());
    });
    this.observer.observe(document.body, { childList: true, subtree: true });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  moveSelection(delta: number): void {
    const len = this.filtered().length;
    if (len === 0) return;
    this.selectedIndex.update((i) => (i + delta + len) % len);
  }

  executeSelected(): void {
    const items = this.filtered();
    const idx = this.selectedIndex();
    if (items[idx]) {
      this.execute(items[idx]);
    }
  }

  execute(cmd: PaletteCommand): void {
    this.layoutService.closeCommandPalette();
    this.query.set('');
    this.selectedIndex.set(0);
    cmd.action();
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
