import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { TabService } from '../../core/services/tab.service';
import { TabItem } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-readme-editor',
  template: `
    <div class="readme-editor">
      <div class="editor-content">

        <!-- Comment line -->
        <p class="syn-comment">// hello world !! Welcome to my portfolio</p>

        <!-- HUGE Name -->
        <div class="hero-name">
          <span class="name-first">Khushal Singh </span><span class="name-last">Rajput</span>
        </div>

        <!-- Role badges -->
        <div class="role-badges">
          <span class="badge"><span class="badge-dot dot-green"></span>{{ data.profile.role }}</span>
          <span class="badge"><span class="badge-dot dot-blue"></span>Full Stack Dev</span>
          <span class="badge"><span class="badge-dot dot-purple"></span>Angular · .NET</span>
          <span class="badge badge-accent"><span class="badge-dot dot-cyan"></span>&#64; {{ data.profile.company }}</span>
        </div>

        <!-- Tagline with typing animation -->
        <p class="tagline">
          <span class="syn-comment">// </span>{{ displayedTagline() }}<span class="typing-cursor" [class.blink]="taglineDone()">|</span>
        </p>

        <!-- Intro paragraph -->
        <p class="intro">
          Software Engineer at
          <strong class="kw-accent">Bacancy</strong>
          delivering enterprise production systems across
          <strong class="kw-accent">pharma</strong>,
          <strong class="kw-accent">govtech</strong>, and
          <strong class="kw-accent">real estate</strong>
          using
          <strong class="kw-cyan">Angular</strong> and
          <strong class="kw-cyan">ASP.NET Core</strong>.
          Passionate about
          <strong class="kw-accent">clean architecture</strong>,
          <strong class="kw-accent">AI integration</strong>,
          and building tools that solve real problems.
        </p>

        <!-- Action buttons -->
        <div class="action-row">
          <button class="action-btn btn-primary" (click)="navigate('projects')">
            <span class="btn-icon">&#9654;</span> Projects
          </button>
          <button class="action-btn btn-secondary" (click)="navigate('about')">
            <span class="btn-icon">&#9993;</span> About Me
          </button>
          <button class="action-btn btn-secondary" (click)="navigate('skills')">
            <span class="btn-icon">&#9889;</span> Skills
          </button>
          <a [href]="'mailto:' + data.profile.email" class="action-btn btn-ghost">
            <span class="btn-icon">&#128231;</span> Contact
          </a>
          <a href="khushal_resume_angular.pdf" download class="action-btn btn-ghost">
            <span class="btn-icon">&#8615;</span> Resume
          </a>
        </div>

        <!-- Divider -->
        <div class="divider"></div>

        <!-- Stats row -->
        <div class="stats-card">
          <div class="stat-item">
            <span class="stat-value">2<span class="stat-plus">+</span></span>
            <span class="stat-label">YEARS</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">4<span class="stat-plus">+</span></span>
            <span class="stat-label">PROJECTS</span>
          </div>
          <div class="stat-item">
            <span class="stat-value stat-inf">&#8734;</span>
            <span class="stat-label">CURIOSITY</span>
          </div>
          <div class="stat-item">
            <span class="stat-value stat-arrow">&#8593;</span>
            <span class="stat-label">ALWAYS LEARNING</span>
          </div>
        </div>

        <!-- Social links -->
        <div class="social-row">
          <a [href]="data.profile.links.github" target="_blank" rel="noopener" class="social-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          <a [href]="data.profile.links.linkedin" target="_blank" rel="noopener" class="social-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a [href]="'mailto:' + data.profile.email" class="social-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            Email
          </a>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .readme-editor {
      height: 100%;
      overflow-y: auto;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 48px 64px;
      background: var(--vsc-bg-editor);
    }

    .editor-content {
      max-width: 960px;
      width: 100%;
    }

    /* Comment line */
    .syn-comment {
      color: var(--vsc-accent-green);
      font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
      font-size: 14px;
      margin-bottom: 28px;
      opacity: 0.85;
      letter-spacing: 0.3px;
    }

    /* Hero name */
    .hero-name {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: clamp(48px, 7vw, 76px);
      font-weight: 800;
      line-height: 1.05;
      margin-bottom: 28px;
      letter-spacing: -1.5px;
    }

    .name-first {
      color: var(--vsc-text-active);
    }

    .name-last {
      color: var(--vsc-accent-cyan);
    }

    /* Role badges */
    .role-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 28px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 4px 14px;
      border: 1px solid var(--vsc-border);
      color: var(--vsc-text-primary);
      font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
      font-size: 12px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.04);
      letter-spacing: 0.2px;
      transition: border-color 0.2s, background 0.2s;

      &:hover {
        border-color: var(--vsc-accent-cyan);
        background: rgba(78, 201, 176, 0.08);
      }
    }

    .badge-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .dot-green { background: var(--vsc-accent-green); }
    .dot-blue { background: var(--vsc-accent-blue); }
    .dot-purple { background: var(--vsc-accent-purple); }
    .dot-cyan { background: var(--vsc-accent-cyan); }

    .badge-accent {
      border-color: var(--vsc-accent-cyan);
      color: var(--vsc-accent-cyan);
      background: rgba(78, 201, 176, 0.08);
    }

    /* Tagline */
    .tagline {
      font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
      font-size: 15px;
      color: var(--vsc-accent-light-blue);
      margin-bottom: 28px;
      letter-spacing: 0.2px;
    }

    .typing-cursor {
      opacity: 1;
      color: var(--vsc-accent-cyan);
      font-weight: 300;

      &.blink {
        animation: blink 1s step-end infinite;
      }
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    /* Intro */
    .intro {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 15px;
      color: var(--vsc-text-primary);
      line-height: 1.8;
      margin-bottom: 36px;
      max-width: 680px;
    }

    .kw-accent {
      color: var(--vsc-accent-yellow);
      font-weight: 600;
    }

    .kw-cyan {
      color: var(--vsc-accent-cyan);
      font-weight: 600;
    }

    /* Action buttons */
    .action-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 40px;
      align-items: center;
    }

    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 9px 20px;
      font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
      font-size: 13px;
      border-radius: 4px;
      border: 1px solid transparent;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.15s ease;
      font-weight: 500;
      letter-spacing: 0.2px;
    }

    .btn-icon {
      font-size: 11px;
      opacity: 0.85;
    }

    .btn-primary {
      background: var(--vsc-accent-cyan);
      color: #1e1e1e;
      border-color: var(--vsc-accent-cyan);

      &:hover {
        background: #5dd9be;
        border-color: #5dd9be;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(78, 201, 176, 0.35);
      }
    }

    .btn-secondary {
      background: rgba(78, 201, 176, 0.1);
      color: var(--vsc-accent-cyan);
      border-color: rgba(78, 201, 176, 0.4);

      &:hover {
        background: rgba(78, 201, 176, 0.18);
        border-color: var(--vsc-accent-cyan);
        transform: translateY(-1px);
      }
    }

    .btn-ghost {
      background: transparent;
      color: var(--vsc-text-muted);
      border-color: var(--vsc-border);

      &:hover {
        color: var(--vsc-text-primary);
        border-color: var(--vsc-text-muted);
        background: rgba(255, 255, 255, 0.04);
        transform: translateY(-1px);
      }
    }

    /* Divider */
    .divider {
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, var(--vsc-border) 0%, transparent 100%);
      margin-bottom: 32px;
    }

    /* Stats card */
    .stats-card {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 24px 16px;
      border: 1px solid var(--vsc-border);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.02);
      margin-bottom: 36px;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .stat-value {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 36px;
      font-weight: 800;
      color: var(--vsc-accent-cyan);
      line-height: 1;
      letter-spacing: -0.5px;
    }

    .stat-inf {
      font-size: 40px;
    }

    .stat-arrow {
      font-size: 36px;
    }

    .stat-plus {
      font-size: 24px;
      font-weight: 600;
      color: var(--vsc-accent-yellow);
    }

    .stat-label {
      font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
      font-size: 10px;
      color: var(--vsc-text-muted);
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-top: 4px;
    }

    /* Social links */
    .social-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .social-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border: 1px solid var(--vsc-border);
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.03);
      color: var(--vsc-text-muted);
      font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
      font-size: 12px;
      text-decoration: none;
      transition: all 0.15s ease;

      svg {
        flex-shrink: 0;
        opacity: 0.7;
      }

      &:hover {
        color: var(--vsc-text-active);
        border-color: var(--vsc-accent-cyan);
        background: rgba(78, 201, 176, 0.06);

        svg { opacity: 1; }
      }
    }

    @media (max-width: 768px) {
      .readme-editor {
        padding: 24px 16px;
      }

      .hero-name {
        margin-bottom: 20px;
      }

      .role-badges {
        gap: 8px;
        margin-bottom: 20px;
      }

      .intro {
        font-size: 14px;
        margin-bottom: 24px;
      }

      .action-row {
        gap: 8px;
        margin-bottom: 28px;
      }

      .action-btn {
        padding: 8px 14px;
        font-size: 12px;
      }

      .stats-card {
        padding: 16px 8px;
        gap: 8px;
      }

      .stat-value {
        font-size: 28px;
      }

      .stat-inf, .stat-arrow {
        font-size: 32px;
      }

      .stat-plus {
        font-size: 18px;
      }
    }

    @media (max-width: 480px) {
      .readme-editor {
        padding: 16px 12px;
      }

      .stats-card {
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
      }

      .stat-item {
        min-width: 80px;
      }

      .action-row {
        flex-direction: column;
      }

      .action-btn {
        width: 100%;
        justify-content: center;
      }

      .social-row {
        flex-direction: column;
        gap: 8px;
      }

      .social-badge {
        width: 100%;
        justify-content: center;
      }
    }
  `],
})
export class ReadmeEditorComponent implements OnInit, OnDestroy {
  readonly displayedTagline = signal('');
  readonly taglineDone = signal(false);
  private timerId: ReturnType<typeof setTimeout> | null = null;

  constructor(
    protected readonly data: PortfolioDataService,
    private readonly tabService: TabService,
  ) {}

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

  navigate(tabId: string): void {
    const tabMap: Record<string, TabItem> = {
      projects: {
        id: 'projects',
        label: 'projects.component.ts',
        icon: 'typescript',
        route: '/projects',
        fileExtension: 'ts',
        isModified: false,
        breadcrumb: ['PORTFOLIO', 'src', 'app', 'portfolio', 'projects.component.ts'],
      },
      about: {
        id: 'about',
        label: 'about-me.scss',
        icon: 'scss',
        route: '/about',
        fileExtension: 'scss',
        isModified: false,
        breadcrumb: ['PORTFOLIO', 'src', 'app', 'portfolio', 'about-me.scss'],
      },
      skills: {
        id: 'skills',
        label: 'skill-radar.component.ts',
        icon: 'typescript',
        route: '/skills',
        fileExtension: 'ts',
        isModified: false,
        breadcrumb: ['PORTFOLIO', 'src', 'app', 'portfolio', 'skill-radar.component.ts'],
      },
    };

    const tab = tabMap[tabId];
    if (tab) {
      this.tabService.openTab(tab);
    }
  }
}
