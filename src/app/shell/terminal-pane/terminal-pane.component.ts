import { Component, signal, effect, OnInit, OnDestroy, ElementRef, viewChild } from '@angular/core';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-terminal-pane',
  template: `
    <div class="terminal-pane" [class.collapsed]="layoutService.terminalCollapsed()">
      <div class="terminal-header" (click)="layoutService.toggleTerminal()">
        <div class="terminal-tabs">
          <span class="terminal-tab active">TERMINAL</span>
          <span class="terminal-tab">PROBLEMS</span>
          <span class="terminal-tab">OUTPUT</span>
          <span class="terminal-tab">DEBUG CONSOLE</span>
        </div>
        <div class="terminal-actions">
          <button class="terminal-action" (click)="layoutService.toggleTerminal(); $event.stopPropagation()">
            {{ layoutService.terminalCollapsed() ? '▲' : '▼' }}
          </button>
        </div>
      </div>
      @if (!layoutService.terminalCollapsed()) {
        <div class="terminal-body" #terminalBody>
          <pre class="terminal-output">{{ displayedText() }}<span class="cursor" [class.blink]="typingDone()">█</span></pre>
        </div>
      }
    </div>
  `,
  styles: [`
    .terminal-pane {
      display: flex;
      flex-direction: column;
      background-color: var(--vsc-bg-terminal);
      border-top: 1px solid var(--vsc-border);
      min-height: 30px;
    }

    .terminal-pane:not(.collapsed) {
      height: 200px;
    }

    .terminal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 30px;
      padding: 0 12px;
      background-color: var(--vsc-bg-editor);
      border-bottom: 1px solid var(--vsc-border);
      cursor: pointer;
    }

    .terminal-tabs {
      display: flex;
      gap: 0;
    }

    .terminal-tab {
      padding: 4px 12px;
      font-size: 11px;
      color: var(--vsc-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      cursor: pointer;

      &.active {
        color: var(--vsc-text-active);
        border-bottom: 1px solid var(--vsc-text-active);
      }
    }

    .terminal-actions {
      display: flex;
    }

    .terminal-action {
      background: transparent;
      border: none;
      color: var(--vsc-text-muted);
      cursor: pointer;
      padding: 2px 6px;
      font-size: 10px;

      &:hover {
        color: var(--vsc-text-active);
      }
    }

    .terminal-body {
      flex: 1;
      overflow: auto;
      padding: 8px 12px;
    }

    .terminal-output {
      font-family: 'Cascadia Code', 'Fira Code', monospace;
      font-size: 13px;
      line-height: 1.5;
      color: var(--vsc-text-primary);
      white-space: pre-wrap;
      margin: 0;
    }

    .cursor {
      opacity: 1;
    }

    .cursor.blink {
      animation: blink 1s step-end infinite;
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    @media (max-width: 768px) {
      .terminal-pane:not(.collapsed) {
        height: 140px;
      }

      .terminal-tab {
        padding: 4px 8px;
        font-size: 10px;
      }

      .terminal-output {
        font-size: 11px;
      }
    }
  `],
})
export class TerminalPaneComponent implements OnInit, OnDestroy {
  readonly displayedText = signal('');
  readonly typingDone = signal(false);

  private readonly terminalBody = viewChild<ElementRef>('terminalBody');
  private timerId: ReturnType<typeof setTimeout> | null = null;

  constructor(protected readonly layoutService: LayoutService) {}

  private readonly fullText = `khushal@portfolio:~$ ng serve --configuration production
⠋ Building portfolio...

✔ Browser application bundle generation complete.
✔ Compiling Angular components...

  Angular v21.2.0 | .NET 10 Backend Ready

  Local:   http://localhost:4200/
  Network: http://192.168.1.10:4200/

  Build completed in 2.4s

  ✓ 0 Errors | ⚠ 1 Warning (unused import)

khushal@portfolio:~$ `;

  ngOnInit(): void {
    this.typeText();
  }

  ngOnDestroy(): void {
    if (this.timerId) clearTimeout(this.timerId);
  }

  private typeText(): void {
    let index = 0;
    const speed = 15;

    const type = () => {
      if (index < this.fullText.length) {
        this.displayedText.set(this.fullText.slice(0, index + 1));
        index++;
        this.timerId = setTimeout(type, speed);
      } else {
        this.typingDone.set(true);
      }
    };

    this.timerId = setTimeout(type, 500);
  }
}
