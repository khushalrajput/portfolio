import { Component } from '@angular/core';

@Component({
  selector: 'app-resume-editor',
  template: `<div class="editor-placeholder">resume.pdf — content coming soon</div>`,
  styles: [`
    .editor-placeholder {
      padding: 20px;
      color: var(--vsc-text-muted);
      font-size: 14px;
    }
  `],
})
export class ResumeEditorComponent {}
