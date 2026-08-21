import { Component } from '@angular/core';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-resume-editor',
  template: `
    <div class="resume-editor">
      <div class="resume-header">
        <h2>{{ data.profile.name }}</h2>
        <p class="subtitle">{{ data.profile.role }} · {{ data.profile.company }}</p>
        <div class="resume-actions">
          <a href="/assets/resume.pdf" download class="download-btn">
            ⬇ Download Resume (PDF)
          </a>
        </div>
      </div>

      <div class="resume-content">
        <section class="resume-section">
          <h3>Technical Skills</h3>
          <div class="skills-grid">
            <div class="skill-group">
              <strong>Frontend:</strong> Angular 16–21, TypeScript, RxJS, Signals, PrimeNG, TailwindCSS
            </div>
            <div class="skill-group">
              <strong>Backend:</strong> C#, .NET 8/9/10, ASP.NET Core, EF Core, SignalR, MediatR
            </div>
            <div class="skill-group">
              <strong>Architecture:</strong> Clean Architecture, CQRS, REST APIs, Microservices, RBAC
            </div>
            <div class="skill-group">
              <strong>Databases:</strong> SQL Server, PostgreSQL, SQLite
            </div>
            <div class="skill-group">
              <strong>DevOps:</strong> SonarQube, GitHub Actions, Azure
            </div>
          </div>
        </section>

        <section class="resume-section">
          <h3>Experience</h3>
          @for (entry of data.experience; track entry.id) {
            <div class="experience-entry">
              <div class="exp-header">
                <span class="exp-role">{{ entry.role }}</span>
                <span class="exp-org">{{ entry.organization }}</span>
                <span class="exp-period">{{ entry.period }}</span>
              </div>
            </div>
          }
        </section>

        <section class="resume-section">
          <h3>Projects</h3>
          @for (project of data.projects; track project.name) {
            <div class="project-entry">
              <strong>{{ project.name }}</strong> — {{ project.domain }}
              <div class="project-tech">{{ project.stack.join(' · ') }}</div>
            </div>
          }
        </section>
      </div>
    </div>
  `,
  styles: [`
    .resume-editor {
      padding: 24px 48px;
      max-width: 800px;
      overflow-y: auto;
      height: 100%;
    }

    .resume-header {
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--vsc-border);
    }

    .resume-header h2 {
      font-size: 22px;
      color: var(--vsc-text-active);
      margin: 0 0 4px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .subtitle {
      color: var(--vsc-text-muted);
      font-size: 13px;
      margin-bottom: 12px;
    }

    .download-btn {
      display: inline-block;
      padding: 8px 20px;
      background: var(--vsc-bg-statusbar);
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-size: 13px;

      &:hover { opacity: 0.9; }
    }

    .resume-section {
      margin-bottom: 20px;
    }

    .resume-section h3 {
      font-size: 15px;
      color: var(--vsc-accent-blue);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .skill-group {
      font-size: 12px;
      color: var(--vsc-text-primary);
      padding: 2px 0;
      line-height: 1.5;

      strong {
        color: var(--vsc-accent-cyan);
      }
    }

    .experience-entry {
      margin-bottom: 8px;
    }

    .exp-header {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: baseline;
    }

    .exp-role {
      font-size: 13px;
      font-weight: 600;
      color: var(--vsc-text-active);
    }

    .exp-org {
      font-size: 13px;
      color: var(--vsc-accent-blue);
    }

    .exp-period {
      font-size: 11px;
      color: var(--vsc-text-muted);
    }

    .project-entry {
      font-size: 12px;
      color: var(--vsc-text-primary);
      margin-bottom: 6px;

      strong {
        color: var(--vsc-text-active);
      }
    }

    .project-tech {
      font-size: 11px;
      color: var(--vsc-text-muted);
      margin-top: 2px;
    }
  `],
})
export class ResumeEditorComponent {
  constructor(protected readonly data: PortfolioDataService) {}
}
