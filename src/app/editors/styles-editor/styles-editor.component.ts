import { Component } from '@angular/core';
import { CodeEditorComponent } from '../../shared/components/code-editor.component';

@Component({
  selector: 'app-styles-editor',
  imports: [CodeEditorComponent],
  template: `<app-code-editor [code]="code" language="scss" />`,
})
export class StylesEditorComponent {
  readonly code = `// src/styles.scss
// Portfolio Global Styles — VS Code Dark+ Theme
// Technologies: PrimeNG + TailwindCSS

@import "tailwindcss";

// ==========================================
// PrimeNG Component Overrides
// ==========================================

.p-button {
  background: var(--vsc-bg-statusbar);
  border: none;
  border-radius: 4px;
  font-family: 'Cascadia Code', monospace;
  font-size: 12px;
  padding: 6px 14px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
    background: var(--vsc-bg-statusbar);
  }
}

.p-inputtext {
  background: var(--vsc-bg-input);
  border: 1px solid var(--vsc-border);
  color: var(--vsc-text-primary);
  font-family: 'Cascadia Code', monospace;
  font-size: 13px;

  &:focus {
    border-color: var(--vsc-bg-statusbar);
    box-shadow: none;
  }
}

.p-tree {
  background: transparent;
  border: none;
  color: var(--vsc-text-primary);
  font-family: 'Cascadia Code', monospace;
}

// ==========================================
// Tailwind @apply Utilities
// ==========================================

.my-custom-button {
  @apply bg-blue-600 text-white font-bold p-4 rounded;
}

.vscode-panel {
  @apply bg-vsc-sidebar border border-vsc-border rounded;
}

.editor-tab-active {
  @apply bg-vsc-tab-active text-vsc-text-active border-t border-t-blue-500;
}

.status-bar-item {
  @apply flex items-center gap-1 px-2 h-full text-white text-xs whitespace-nowrap;
}

.syntax-keyword {
  @apply text-vsc-accent-blue;
}

.syntax-string {
  @apply text-vsc-accent-orange;
}

.syntax-comment {
  @apply text-vsc-accent-green italic;
}

// ==========================================
// Animation Keyframes
// ==========================================

@keyframes terminal-typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}`;
}
