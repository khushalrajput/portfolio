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
          <span class="badge">{{ data.profile.role }}</span>
          <span class="badge">Full Stack Dev</span>
          <span class="badge">Angular · .NET</span>
          <span class="badge badge-accent">&#64; {{ data.profile.company }}</span>
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
        </div>

        <!-- Divider -->
        <div class="divider"></div>

        <!-- Stats row -->
        <div class="stats-row">
          <div class="stat-item">
            <span class="stat-value">1.5<span class="stat-plus">+</span></span>
            <span class="stat-label">YEARS</span>
          </div>
          <div class="stat-sep"></div>
          <div class="stat-item">
            <span class="stat-value">4<span class="stat-plus">+</span></span>
            <span class="stat-label">PROJECTS</span>
          </div>
          <div class="stat-sep"></div>
          <div class="stat-item">
            <span class="stat-value stat-inf">&#8734;</span>
            <span class="stat-label">CURIOSITY</span>
          </div>
        </div>

        <!-- Social links -->
        <div class="social-row">
          <a [href]="data.profile.links.github" target="_blank" rel="noopener" class="social-link">
            <span class="syn-comment">// </span>github
          </a>
          <a [href]="data.profile.links.linkedin" target="_blank" rel="noopener" class="social-link">
            <span class="syn-comment">// </span>linkedin
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
      max-width: 820px;
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

    /* Stats row */
    .stats-row {
      display: flex;
      align-items: center;
      gap: 0;
      margin-bottom: 36px;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0 32px 0 0;
    }

    .stat-item:first-child {
      padding-left: 0;
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

    .stat-sep {
      width: 1px;
      height: 40px;
      background: var(--vsc-border);
      margin: 0 32px 0 0;
      align-self: center;
      flex-shrink: 0;
    }

    /* Social links */
    .social-row {
      display: flex;
      gap: 20px;
    }

    .social-link {
      font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
      font-size: 13px;
      color: var(--vsc-text-muted);
      text-decoration: none;
      transition: color 0.15s;

      &:hover {
        color: var(--vsc-accent-cyan);
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
        label: 'about-me.component.ts',
        icon: 'typescript',
        route: '/about',
        fileExtension: 'ts',
        isModified: true,
        breadcrumb: ['PORTFOLIO', 'src', 'app', 'portfolio', 'about-me.component.ts'],
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
