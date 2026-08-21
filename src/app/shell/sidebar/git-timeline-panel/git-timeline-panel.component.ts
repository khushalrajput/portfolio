import { Component, signal } from '@angular/core';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { ExperienceCommit, ExperienceEntry } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-git-timeline-panel',
  template: `
    <div class="git-panel">
      <div class="panel-header">Source Control</div>

      <!-- Filter chips -->
      <div class="filter-chips">
        @for (filter of filters; track filter) {
          <button
            class="chip"
            [class.active]="activeFilter() === filter"
            (click)="setFilter(filter)"
          >
            {{ filter }}
          </button>
        }
      </div>

      <!-- Timeline -->
      <div class="timeline">
        @for (entry of data.experience; track entry.id) {
          <div class="timeline-entry">
            <!-- Branch node -->
            <div class="branch-node" [class.current]="entry.isCurrent">
              <div class="node-dot"></div>
              <div class="node-info">
                <span class="node-role">{{ entry.role }}</span>
                <span class="node-org">{{ entry.organization }}</span>
                <span class="node-period">{{ entry.period }}</span>
                @if (entry.isCurrent) {
                  <span class="head-badge">HEAD</span>
                }
              </div>
            </div>

            <!-- Tags -->
            @for (tag of entry.tags; track tag.name) {
              <div class="tag-item">
                <span class="tag-icon">🏷</span>
                <span class="tag-label">{{ tag.label }}</span>
                <span class="tag-name">{{ tag.name }}</span>
              </div>
            }

            <!-- Commits -->
            @for (commit of filterCommits(entry.commits); track commit.hash) {
              <div class="commit-item" (click)="toggleCommit(commit.hash)">
                <div class="commit-line"></div>
                <div class="commit-content">
                  <div class="commit-header">
                    <span class="commit-type" [attr.data-type]="commit.type">{{ commit.type }}</span>
                    <span class="commit-message">{{ commit.message }}</span>
                  </div>
                  <div class="commit-meta">
                    <span class="commit-hash">{{ commit.hash }}</span>
                    <span class="commit-author">Khushal Rajput</span>
                  </div>

                  @if (expandedCommit() === commit.hash) {
                    <div class="commit-details">
                      <p class="commit-description">{{ commit.description }}</p>
                      <div class="commit-stack">
                        @for (tech of commit.techStack; track tech) {
                          <span class="tech-badge">{{ tech }}</span>
                        }
                      </div>
                      @if (commit.impact) {
                        <div class="commit-impact">
                          <span class="impact-label">Impact:</span>
                          <span class="impact-added">+ {{ commit.impact }}</span>
                        </div>
                      }
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .git-panel {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: auto;
    }

    .panel-header {
      padding: 8px 16px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--vsc-text-muted);
    }

    .filter-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      padding: 4px 12px 8px;
    }

    .chip {
      padding: 2px 8px;
      border: 1px solid var(--vsc-border);
      background: transparent;
      color: var(--vsc-text-muted);
      font-size: 11px;
      border-radius: 10px;
      cursor: pointer;

      &:hover { color: var(--vsc-text-primary); }
      &.active {
        background: var(--vsc-bg-statusbar);
        color: white;
        border-color: var(--vsc-bg-statusbar);
      }
    }

    .timeline {
      padding: 0 12px;
    }

    .timeline-entry {
      position: relative;
      padding-left: 20px;
      border-left: 2px solid var(--vsc-border);
      margin-left: 8px;
      padding-bottom: 16px;
    }

    .branch-node {
      position: relative;
      margin-bottom: 8px;
      margin-left: -28px;
      padding-left: 28px;
    }

    .node-dot {
      position: absolute;
      left: -7px;
      top: 4px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--vsc-accent-blue);
      border: 2px solid var(--vsc-bg-sidebar);
    }

    .current .node-dot {
      background: #4ec9b0;
      box-shadow: 0 0 8px rgba(78, 201, 176, 0.4);
    }

    .node-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .node-role {
      font-size: 13px;
      font-weight: 600;
      color: var(--vsc-text-active);
    }

    .node-org {
      font-size: 12px;
      color: var(--vsc-accent-blue);
    }

    .node-period {
      font-size: 11px;
      color: var(--vsc-text-muted);
    }

    .head-badge {
      display: inline-block;
      padding: 1px 6px;
      background: #4ec9b0;
      color: #1e1e1e;
      font-size: 10px;
      font-weight: 700;
      border-radius: 3px;
      width: fit-content;
      margin-top: 2px;
    }

    .tag-item {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 2px 0;
      margin-bottom: 4px;
    }

    .tag-icon { font-size: 12px; }
    .tag-label {
      font-size: 11px;
      color: #dcdcaa;
    }
    .tag-name {
      font-size: 10px;
      color: var(--vsc-text-muted);
    }

    .commit-item {
      position: relative;
      padding: 4px 0;
      cursor: pointer;

      &:hover {
        background: var(--vsc-bg-hover);
        border-radius: 3px;
      }
    }

    .commit-line {
      position: absolute;
      left: -14px;
      top: 12px;
      width: 8px;
      height: 1px;
      background: var(--vsc-border);
    }

    .commit-header {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .commit-type {
      font-size: 10px;
      font-weight: 600;
      padding: 1px 4px;
      border-radius: 3px;
      text-transform: uppercase;

      &[data-type="feat"] { color: #4ec9b0; background: rgba(78, 201, 176, 0.1); }
      &[data-type="fix"] { color: #f44747; background: rgba(244, 71, 71, 0.1); }
      &[data-type="refactor"] { color: #dcdcaa; background: rgba(220, 220, 170, 0.1); }
      &[data-type="chore"] { color: #858585; background: rgba(133, 133, 133, 0.1); }
    }

    .commit-message {
      font-size: 12px;
      color: var(--vsc-text-primary);
    }

    .commit-meta {
      display: flex;
      gap: 8px;
      margin-top: 2px;
    }

    .commit-hash {
      font-size: 11px;
      color: var(--vsc-accent-yellow);
      font-family: monospace;
    }

    .commit-author {
      font-size: 11px;
      color: var(--vsc-text-muted);
    }

    .commit-details {
      margin-top: 8px;
      padding: 8px;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 4px;
      border-left: 2px solid var(--vsc-accent-blue);
    }

    .commit-description {
      font-size: 12px;
      color: var(--vsc-text-primary);
      margin-bottom: 8px;
      line-height: 1.4;
    }

    .commit-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-bottom: 6px;
    }

    .tech-badge {
      padding: 2px 6px;
      background: rgba(86, 156, 214, 0.15);
      color: var(--vsc-accent-blue);
      font-size: 10px;
      border-radius: 3px;
    }

    .commit-impact {
      font-size: 11px;
      margin-top: 4px;
    }

    .impact-label {
      color: var(--vsc-text-muted);
    }

    .impact-added {
      color: var(--vsc-accent-green);
      font-weight: 600;
    }
  `],
})
export class GitTimelinePanelComponent {
  readonly filters = ['All', 'Angular', '.NET', 'Azure', 'Personal'];
  readonly activeFilter = signal('All');
  readonly expandedCommit = signal<string | null>(null);

  constructor(protected readonly data: PortfolioDataService) {}

  setFilter(filter: string): void {
    this.activeFilter.set(filter);
  }

  toggleCommit(hash: string): void {
    this.expandedCommit.update((current) => (current === hash ? null : hash));
  }

  filterCommits(commits: ExperienceCommit[]): ExperienceCommit[] {
    const filter = this.activeFilter();
    if (filter === 'All') return commits;
    if (filter === 'Personal') {
      return commits.filter((c) =>
        c.message.toLowerCase().includes('personal')
      );
    }
    return commits.filter((c) =>
      c.techStack.some((t) => t.toLowerCase().includes(filter.toLowerCase()))
    );
  }
}
