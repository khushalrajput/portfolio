import { Component } from '@angular/core';

@Component({
  selector: 'app-readme-editor',
  template: `<div class="editor-placeholder">readme.md — content coming soon</div>`,
  styles: [`
    .editor-placeholder {
      padding: 20px;
      color: var(--vsc-text-muted);
      font-size: 14px;
    }
  `],
})
export class ReadmeEditorComponent {}
