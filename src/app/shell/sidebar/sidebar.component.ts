import { Component } from '@angular/core';
import { SidebarService } from '../../core/services/sidebar.service';
import { ExplorerPanelComponent } from './explorer-panel/explorer-panel.component';
import { GitTimelinePanelComponent } from './git-timeline-panel/git-timeline-panel.component';
import { SkillsPanelComponent } from './skills-panel/skills-panel.component';
import { CopilotChatPanelComponent } from './copilot-chat-panel/copilot-chat-panel.component';

@Component({
  selector: 'app-sidebar',
  imports: [
    ExplorerPanelComponent,
    GitTimelinePanelComponent,
    SkillsPanelComponent,
    CopilotChatPanelComponent,
  ],
  template: `
    <div class="sidebar">
      @switch (sidebarService.activePanel()) {
        @case ('explorer') {
          <app-explorer-panel />
        }
        @case ('git') {
          <app-git-timeline-panel />
        }
        @case ('skills') {
          <app-skills-panel />
        }
        @case ('copilot') {
          <app-copilot-chat-panel />
        }
      }
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      height: 100%;
    }

    .sidebar {
      width: 260px;
      min-width: 200px;
      max-width: 400px;
      height: 100%;
      background-color: var(--vsc-bg-sidebar);
      border-right: 1px solid var(--vsc-border);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
  `],
})
export class SidebarComponent {
  constructor(protected readonly sidebarService: SidebarService) {}
}
