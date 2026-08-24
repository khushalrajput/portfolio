import { Component, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';

interface SearchResult {
  label: string;
  description: string;
  route: string;
  type: 'project' | 'skill' | 'experience' | 'page';
}

@Component({
  selector: 'app-search-panel',
  template: `
    <div class="search-panel">
      <div class="panel-header">
        <span>Search</span>
      </div>
      <div class="search-input-wrapper">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="search-icon">
          <path d="M15.25 0a8.25 8.25 0 0 0-6.18 13.72L1 21.75l1.5 1.5 8.03-8.07A8.25 8.25 0 1 0 15.25 0zm0 14.5a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5z" />
        </svg>
        <input
          type="text"
          class="search-input"
          placeholder="Search portfolio..."
          [value]="query()"
          (input)="onInput($event)"
        />
      </div>
      <div class="search-results">
        @if (query().length === 0) {
          <div class="search-hint">Type to search across projects, skills, and experience</div>
        } @else if (results().length === 0) {
          <div class="search-hint">No results for "{{ query() }}"</div>
        } @else {
          @for (result of results(); track result.label) {
            <button class="result-item" (click)="navigate(result)">
              <span class="result-type">{{ result.type }}</span>
              <div class="result-content">
                <span class="result-label">{{ result.label }}</span>
                <span class="result-desc">{{ result.description }}</span>
              </div>
            </button>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    .search-panel {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: auto;
    }

    .panel-header {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--vsc-text-muted);
    }

    .search-input-wrapper {
      display: flex;
      align-items: center;
      margin: 0 8px 8px;
      padding: 4px 8px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--vsc-border);
      border-radius: 4px;
      gap: 6px;
    }

    .search-icon {
      color: var(--vsc-text-muted);
      flex-shrink: 0;
    }

    .search-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: var(--vsc-text-primary);
      font-size: 13px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

      &::placeholder {
        color: var(--vsc-text-muted);
      }
    }

    .search-results {
      flex: 1;
      overflow-y: auto;
    }

    .search-hint {
      padding: 12px 16px;
      color: var(--vsc-text-muted);
      font-size: 12px;
    }

    .result-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      width: 100%;
      padding: 6px 12px;
      background: transparent;
      border: none;
      cursor: pointer;
      text-align: left;

      &:hover {
        background: var(--vsc-bg-hover);
      }
    }

    .result-type {
      font-size: 9px;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--vsc-accent-blue);
      background: rgba(0, 122, 204, 0.15);
      padding: 1px 4px;
      border-radius: 3px;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .result-content {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .result-label {
      font-size: 13px;
      color: var(--vsc-text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .result-desc {
      font-size: 11px;
      color: var(--vsc-text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `],
})
export class SearchPanelComponent {
  readonly query = signal('');

  private allResults: SearchResult[] = [];

  readonly results = computed(() => {
    const q = this.query().toLowerCase();
    if (!q) return [];
    return this.allResults.filter(
      (r) =>
        r.label.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q),
    );
  });

  constructor(
    private readonly data: PortfolioDataService,
    private readonly router: Router,
  ) {
    this.buildIndex();
  }

  onInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  navigate(result: SearchResult): void {
    this.router.navigate([result.route]);
  }

  private buildIndex(): void {
    // Pages
    this.allResults.push(
      { label: 'README', description: 'Introduction and overview', route: '/readme', type: 'page' },
      { label: 'About Me', description: this.data.profile.role + ' at ' + this.data.profile.company, route: '/about', type: 'page' },
      { label: 'Projects', description: 'Portfolio projects showcase', route: '/projects', type: 'page' },
      { label: 'Skills', description: 'Technical skills radar', route: '/skills', type: 'page' },
      { label: 'Styles', description: 'Theme and styling', route: '/styles', type: 'page' },
      { label: 'Resume', description: 'Downloadable resume', route: '/resume', type: 'page' },
    );

    // Projects
    for (const project of this.data.projects) {
      this.allResults.push({
        label: project.name,
        description: project.domain + ' — ' + project.stack.join(', '),
        route: '/projects',
        type: 'project',
      });
    }

    // Skills
    for (const skill of this.data.skills.allSkills) {
      this.allResults.push({
        label: skill.name,
        description: skill.category + ' — proficiency ' + skill.proficiency + '%',
        route: '/skills',
        type: 'skill',
      });
    }

    // Experience
    for (const entry of this.data.experience) {
      this.allResults.push({
        label: entry.role + ' @ ' + entry.organization,
        description: entry.period,
        route: '/about',
        type: 'experience',
      });
    }
  }
}
