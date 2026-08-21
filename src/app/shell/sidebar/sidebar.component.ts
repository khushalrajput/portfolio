import { Component } from '@angular/core';
import { SidebarService } from '../../core/services/sidebar.service';
import { ExplorerPanelComponent } from './explorer-panel/explorer-panel.component';
import { GitTimelinePanelComponent } from './git-timeline-panel/git-timeline-panel.component';
import { SkillsPanelComponent } from './skills-panel/skills-panel.component';

@Component({
  selector: 'app-sidebar',
  imports: [
    ExplorerPanelComponent,
    GitTimelinePanelComponent,
    SkillsPanelComponent,
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
