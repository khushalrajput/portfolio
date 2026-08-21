import { Component } from '@angular/core';

@Component({
  selector: 'app-copilot-chat-panel',
  template: `<div class="panel-placeholder">Copilot Chat — coming soon</div>`,
  styles: [`
    .panel-placeholder {
      padding: 16px;
      color: var(--vsc-text-muted);
      font-size: 12px;
    }
  `],
})
export class CopilotChatPanelComponent {}
