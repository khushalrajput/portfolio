import { Component, signal } from '@angular/core';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { CodeEditorComponent } from '../../shared/components/code-editor.component';

@Component({
  selector: 'app-projects-editor',
  imports: [CodeEditorComponent],
  template: `
    <div class="projects-editor">
      <!-- Split view tabs -->
      <div class="split-tabs">
        <button class="split-tab" [class.active]="view() === 'code'" (click)="view.set('code')">
          &lt;/&gt; Code
        </button>
        <button class="split-tab" [class.active]="view() === 'preview'" (click)="view.set('preview')">
          ▷ Preview
        </button>
      </div>

      @if (view() === 'code') {
        <app-code-editor [code]="codeContent" language="html" />
      } @else {
        <div class="preview-pane">
          @for (project of data.projects; track project.name) {
            <div class="project-card">
              <div class="card-header">
                <h3 class="project-name">{{ project.name }}</h3>
                <span class="project-domain">{{ project.domain }}</span>
              </div>
              <p class="project-desc">{{ project.description }}</p>
              <div class="project-highlights">
                @for (h of project.highlights; track h) {
                  <div class="highlight">✓ {{ h }}</div>
                }
              </div>
              <div class="project-stack">
                @for (tech of project.stack; track tech) {
                  <span class="tech-badge">{{ tech }}</span>
                }
              </div>
              @if (project.link) {
                <a [href]="project.link" target="_blank" rel="noopener" class="project-link">
                  View Project →
                </a>
              }
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .projects-editor {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .split-tabs {
      display: flex;
      background: var(--vsc-bg-tab-inactive);
      border-bottom: 1px solid var(--vsc-border);
    }

    .split-tab {
      padding: 6px 16px;
      background: transparent;
      border: none;
      color: var(--vsc-text-muted);
      font-size: 12px;
      cursor: pointer;

      &.active {
        color: var(--vsc-text-active);
        border-bottom: 1px solid var(--vsc-bg-statusbar);
      }

      &:hover { color: var(--vsc-text-primary); }
    }

    .preview-pane {
      padding: 24px;
      overflow-y: auto;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .project-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--vsc-border);
      border-radius: 6px;
      padding: 20px;
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .project-name {
      font-size: 16px;
      font-weight: 600;
      color: var(--vsc-text-active);
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .project-domain {
      padding: 2px 8px;
      background: rgba(78, 201, 176, 0.15);
      color: var(--vsc-accent-cyan);
      font-size: 11px;
      border-radius: 3px;
    }

    .project-desc {
      font-size: 13px;
      color: var(--vsc-text-primary);
      line-height: 1.5;
      margin-bottom: 12px;
    }

    .project-highlights {
      margin-bottom: 12px;
    }

    .highlight {
      font-size: 12px;
      color: var(--vsc-accent-green);
      padding: 2px 0;
      line-height: 1.4;
    }

    .project-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 12px;
    }

    .tech-badge {
      padding: 3px 8px;
      background: rgba(86, 156, 214, 0.15);
      color: var(--vsc-accent-blue);
      font-size: 11px;
      border-radius: 3px;
    }

    .project-link {
      color: var(--vsc-accent-blue);
      font-size: 12px;
      text-decoration: none;
      &:hover { text-decoration: underline; }
    }
  `],
})
export class ProjectsEditorComponent {
  readonly view = signal<'code' | 'preview'>('preview');

  constructor(protected readonly data: PortfolioDataService) {}

  readonly codeContent = `<!-- projects.component.html -->
<div class="projects-container">
  @for (project of projects(); track project.name) {
    <app-project-card
      [name]="project.name"
      [domain]="project.domain"
      [stack]="project.stack"
      [description]="project.description"
      [highlights]="project.highlights"
      [link]="project.link"
    />
  }
</div>

<!-- Invoice Automation System -->
<app-project-card
  name="Invoice Automation System"
  domain="Pharma"
  [stack]="['Angular 19', '.NET 9', 'Azure AI', 'PrimeNG']"
  description="AI-powered invoice extraction pipeline..."
/>

<!-- Registry Management System -->
<app-project-card
  name="Registry Management System"
  domain="GovTech"
  [stack]="['Angular 18', '.NET 8', 'SQL Server', 'PrimeNG']"
  description="Legal operations platform for Spanish agencies..."
/>

<!-- CareerLens -->
<app-project-card
  name="CareerLens"
  domain="Personal"
  [stack]="['Angular 21', '.NET 10', 'LLamaSharp', 'SignalR']"
  description="Privacy-first AI resume tool..."
  link="https://github.com/khushalrajput"
/>`;
}
