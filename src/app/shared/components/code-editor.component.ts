import { Component, input } from '@angular/core';
import { SyntaxHighlightPipe } from '../pipes/syntax-highlight.pipe';

@Component({
  selector: 'app-code-editor',
  imports: [SyntaxHighlightPipe],
  template: `
    <div class="code-editor">
      <div class="line-numbers">
        @for (lineNum of lineNumbers(); track lineNum) {
          <span class="line-number">{{ lineNum }}</span>
        }
      </div>
      <pre class="code-content"><code [innerHTML]="code() | syntaxHighlight:language()"></code></pre>
    </div>
  `,
  styles: [`
    .code-editor {
      display: flex;
      font-family: 'Cascadia Code', 'Fira Code', monospace;
      font-size: 13px;
      line-height: 20px;
      overflow: auto;
    }

    .line-numbers {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 12px 12px 12px 16px;
      color: var(--vsc-line-number);
      user-select: none;
      min-width: 50px;
      background: var(--vsc-bg-editor);
    }

    .line-number {
      font-size: 13px;
      line-height: 20px;
    }

    .code-content {
      flex: 1;
      padding: 12px 16px;
      margin: 0;
      color: var(--vsc-text-primary);
      white-space: pre;
      overflow-x: auto;
    }

    :host ::ng-deep {
      .syn-keyword { color: var(--vsc-accent-blue); }
      .syn-string { color: var(--vsc-accent-orange); }
      .syn-comment { color: var(--vsc-accent-green); font-style: italic; }
      .syn-type { color: var(--vsc-accent-cyan); }
      .syn-number { color: #b5cea8; }
      .syn-decorator { color: var(--vsc-accent-yellow); }
      .syn-tag { color: var(--vsc-accent-blue); }
      .syn-attribute { color: var(--vsc-accent-light-blue); }
      .syn-selector { color: #d7ba7d; }
      .syn-value { color: var(--vsc-accent-orange); }
    }
  `],
})
export class CodeEditorComponent {
  readonly code = input.required<string>();
  readonly language = input<string>('typescript');
  readonly startLine = input<number>(1);

  lineNumbers(): number[] {
    const lines = this.code().split('\n').length;
    const start = this.startLine();
    return Array.from({ length: lines }, (_, i) => i + start);
  }
}
