import { Component } from '@angular/core';
import { SidebarService } from '../../core/services/sidebar.service';
import { ExplorerPanelComponent } from './explorer-panel/explorer-panel.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';
import { GitTimelinePanelComponent } from './git-timeline-panel/git-timeline-panel.component';
import { SkillsPanelComponent } from './skills-panel/skills-panel.component';

@Component({
  selector: 'app-sidebar',
  imports: [
    ExplorerPanelComponent,
    SearchPanelComponent,
    GitTimelinePanelComponent,
    SkillsPanelComponent,
  ],
  template: `
    <div class="sidebar">
      <button class="sidebar-close-mobile" aria-label="Close Sidebar" (click)="sidebarService.closePanel()">×</button>
      @switch (sidebarService.activePanel()) {
        @case ('explorer') {
          <app-explorer-panel />
        }
        @case ('search') {
          <app-search-panel />
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
      position: relative;
      width: 320px;
      min-width: 240px;
      max-width: 400px;
      height: 100%;
      background-color: var(--vsc-bg-sidebar);
      border-right: 1px solid var(--vsc-border);
      overflow: hidden;
      display: flex;
      flex-direction: column;

      app-explorer-panel,
      app-search-panel,
      app-git-timeline-panel,
      app-skills-panel {
        flex: 1;
        min-height: 0;
        overflow: hidden;
      }
    }

    .sidebar-close-mobile {
      display: none;
    }

    @media (max-width: 768px) {
      .sidebar {
        width: 100%;
        min-width: unset;
        max-width: unset;
      }

      .sidebar-close-mobile {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 4px;
        right: 4px;
        width: 28px;
        height: 28px;
        background: transparent;
        border: none;
        color: var(--vsc-text-muted);
        font-size: 18px;
        cursor: pointer;
        border-radius: 4px;
        z-index: 10;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--vsc-text-active);
        }
      }
    }
  `],
})
export class SidebarComponent {
  constructor(protected readonly sidebarService: SidebarService) {}
}
