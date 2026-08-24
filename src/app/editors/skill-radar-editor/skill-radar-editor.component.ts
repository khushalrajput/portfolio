import { Component, OnInit, signal } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CodeEditorComponent } from '../../shared/components/code-editor.component';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-skill-radar-editor',
  imports: [ChartModule, CodeEditorComponent],
  template: `
    <div class="skill-radar-editor">
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
        <app-code-editor [code]="codeContent" language="typescript" />
      } @else {
        <div class="preview-pane">
          <!-- Radar chart -->
          <div class="chart-card">
            <h3 class="section-title">Proficiency Radar</h3>
            <div class="chart-wrapper">
              <p-chart type="radar" [data]="chartData" [options]="chartOptions" />
            </div>
          </div>

          <!-- Skills by category -->
          @for (category of categories; track category.key) {
            <div class="category-card">
              <h3 class="category-title">{{ category.label }}</h3>
              <div class="skills-list">
                @for (skill of getSkillsByCategory(category.key); track skill.name) {
                  <div class="skill-row">
                    <span class="skill-name">{{ skill.name }}</span>
                    <div class="skill-bar-track">
                      <div class="skill-bar-fill" [style.width.%]="skill.proficiency"
                           [style.background]="category.color"></div>
                    </div>
                    <span class="skill-pct">{{ skill.proficiency }}%</span>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .skill-radar-editor {
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

    .chart-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--vsc-border);
      border-radius: 6px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--vsc-text-active);
      margin: 0 0 16px;
      align-self: flex-start;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .chart-wrapper {
      max-width: 380px;
      width: 100%;
    }

    .category-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--vsc-border);
      border-radius: 6px;
      padding: 20px;
    }

    .category-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--vsc-accent-cyan);
      margin: 0 0 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .skills-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .skill-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .skill-name {
      font-size: 12px;
      color: var(--vsc-text-primary);
      min-width: 160px;
      flex-shrink: 0;
    }

    .skill-bar-track {
      flex: 1;
      height: 6px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 3px;
      overflow: hidden;
    }

    .skill-bar-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 0.6s ease;
    }

    .skill-pct {
      font-size: 11px;
      color: var(--vsc-text-muted);
      min-width: 32px;
      text-align: right;
      font-family: 'Cascadia Code', monospace;
    }

    @media (max-width: 768px) {
      .preview-pane {
        padding: 16px 12px;
        gap: 16px;
      }

      .chart-card, .category-card {
        padding: 16px;
      }

      .chart-wrapper {
        max-width: 300px;
      }

      .skill-name {
        min-width: 120px;
        font-size: 11px;
      }
    }
  `],
})
export class SkillRadarEditorComponent implements OnInit {
  readonly view = signal<'code' | 'preview'>('preview');
  chartData: any;
  chartOptions: any;

  readonly categories = [
    { key: 'frontend', label: 'Frontend', color: '#4ec9b0' },
    { key: 'backend', label: 'Backend', color: '#569cd6' },
    { key: 'database', label: 'Database', color: '#cbcb41' },
    { key: 'architecture', label: 'Architecture', color: '#c586c0' },
    { key: 'devops', label: 'DevOps', color: '#ce9178' },
    { key: 'ai', label: 'AI / ML', color: '#4fc1ff' },
  ];

  constructor(private readonly data: PortfolioDataService) {}

  getSkillsByCategory(category: string) {
    return this.data.skills.allSkills.filter((s: any) => s.category === category);
  }

  readonly codeContent = `// skill-radar.ts
import { ChartConfiguration } from 'chart.js';

const skillRadarConfig: ChartConfiguration<'radar'> = {
  type: 'radar',
  data: {
    labels: ['Angular', '.NET Core', 'TypeScript', 'RxJS', 'SQL', 'C#', 'Azure', 'Clean Arch'],
    datasets: [{
      label: 'Proficiency',
      data: [95, 85, 92, 80, 78, 83, 65, 82],
      backgroundColor: 'rgba(0, 122, 204, 0.2)',
      borderColor: '#007acc',
      pointBackgroundColor: '#007acc',
    }],
  },
  options: {
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { stepSize: 20 },
      },
    },
    plugins: { legend: { display: false } },
  },
};

export default skillRadarConfig;`;

  ngOnInit(): void {
    const skills = this.data.skills;
    this.chartData = {
      labels: skills.radarLabels,
      datasets: [
        {
          label: 'Proficiency',
          data: skills.radarValues,
          backgroundColor: 'rgba(0, 122, 204, 0.2)',
          borderColor: '#007acc',
          pointBackgroundColor: '#007acc',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#007acc',
        },
      ],
    };

    this.chartOptions = {
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: { stepSize: 20, color: '#858585', backdropColor: 'transparent', font: { size: 10 } },
          grid: { color: 'rgba(255,255,255,0.08)' },
          angleLines: { color: 'rgba(255,255,255,0.08)' },
          pointLabels: { color: '#d4d4d4', font: { size: 11, family: 'Cascadia Code, monospace' } },
        },
      },
      plugins: { legend: { display: false } },
      responsive: true,
      maintainAspectRatio: true,
    };
  }
}
