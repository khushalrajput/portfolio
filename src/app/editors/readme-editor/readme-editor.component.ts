import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-readme-editor',
  template: `
    <div class="readme-editor">
      <div class="markdown-preview">
        <div class="preview-badge">Preview</div>

        <h1 class="name">{{ data.profile.name }}</h1>

        <p class="tagline">
          {{ displayedTagline() }}<span class="typing-cursor" [class.blink]="taglineDone()">|</span>
        </p>

        <p class="intro">{{ data.profile.intro }}</p>

        <div class="info-section">
          <h2>📍 Location</h2>
          <p>{{ data.profile.location }}</p>

          <h2>💼 Current Role</h2>
          <p>{{ data.profile.role }} &#64; {{ data.profile.company }}</p>

          <h2>🎓 Education</h2>
          @for (edu of data.profile.education; track edu.institution) {
            <p class="edu-item">
              <strong>{{ edu.degree }}</strong> — {{ edu.institution }} ({{ edu.cgpa }} CGPA)
              <br />
              <span class="period">{{ edu.years }}</span>
            </p>
          }

          <h2>🏆 Recognition</h2>
          @for (award of data.profile.recognition; track award.title) {
            <p class="award-item">
              <span class="award-title">{{ award.title }}</span>
              <span class="award-period">{{ award.period }}</span>
            </p>
          }

          <h2>📜 Certifications</h2>
          @for (cert of data.profile.certifications; track cert) {
            <p>{{ cert }}</p>
          }
        </div>

        <div class="social-links">
          <a [href]="data.profile.links.github" target="_blank" rel="noopener" class="social-link">
            GitHub
          </a>
          <a [href]="data.profile.links.linkedin" target="_blank" rel="noopener" class="social-link">
            LinkedIn
          </a>
          <a [href]="'mailto:' + data.profile.email" class="social-link">
            {{ data.profile.email }}
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .readme-editor {
      padding: 24px 48px;
      max-width: 800px;
      overflow-y: auto;
      height: 100%;
    }

    .preview-badge {
      display: inline-block;
      padding: 2px 8px;
      background: rgba(255, 255, 255, 0.08);
      color: var(--vsc-text-muted);
      font-size: 10px;
      border-radius: 3px;
      margin-bottom: 16px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .name {
      font-size: 28px;
      font-weight: 600;
      color: var(--vsc-text-active);
      margin-bottom: 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .tagline {
      font-size: 16px;
      color: var(--vsc-accent-blue);
      margin-bottom: 16px;
    }

    .typing-cursor {
      opacity: 1;
      &.blink { animation: blink 1s step-end infinite; }
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    .intro {
      font-size: 14px;
      color: var(--vsc-text-primary);
      line-height: 1.6;
      margin-bottom: 24px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .info-section h2 {
      font-size: 16px;
      color: var(--vsc-text-active);
      margin: 20px 0 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .info-section p {
      font-size: 13px;
      color: var(--vsc-text-primary);
      line-height: 1.5;
      margin-bottom: 4px;
    }

    .period {
      color: var(--vsc-text-muted);
      font-size: 12px;
    }

    .award-item {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .award-title {
      color: var(--vsc-accent-yellow);
    }

    .award-period {
      color: var(--vsc-text-muted);
      font-size: 11px;
    }

    .social-links {
      display: flex;
      gap: 12px;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid var(--vsc-border);
    }

    .social-link {
      padding: 6px 16px;
      background: rgba(0, 122, 204, 0.15);
      color: var(--vsc-accent-blue);
      text-decoration: none;
      border-radius: 4px;
      font-size: 12px;

      &:hover {
        background: rgba(0, 122, 204, 0.3);
      }
    }
  `],
})
export class ReadmeEditorComponent implements OnInit, OnDestroy {
  readonly displayedTagline = signal('');
  readonly taglineDone = signal(false);
  private timerId: ReturnType<typeof setTimeout> | null = null;

  constructor(protected readonly data: PortfolioDataService) {}

  ngOnInit(): void {
    const tagline = this.data.profile.tagline;
    let index = 0;
    const type = () => {
      if (index < tagline.length) {
        this.displayedTagline.set(tagline.slice(0, index + 1));
        index++;
        this.timerId = setTimeout(type, 50);
      } else {
        this.taglineDone.set(true);
      }
    };
    this.timerId = setTimeout(type, 300);
  }

  ngOnDestroy(): void {
    if (this.timerId) clearTimeout(this.timerId);
  }
}
