import { Component } from '@angular/core';

@Component({
  selector: 'app-styles-editor',
  template: `<div class="editor-placeholder">styles.scss — content coming soon</div>`,
  styles: [`
    .editor-placeholder {
      padding: 20px;
      color: var(--vsc-text-muted);
      font-size: 14px;
    }
  `],
})
export class StylesEditorComponent {}
