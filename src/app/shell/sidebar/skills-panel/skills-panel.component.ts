import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';

@Component({
  selector: 'app-skills-panel',
  imports: [ChartModule],
  template: `
    <div class="skills-panel">
      <div class="panel-header">Skills Overview</div>

      <div class="chart-container">
        <p-chart type="radar" [data]="chartData" [options]="chartOptions" [style]="{ width: '100%', maxWidth: '280px' }" />
      </div>

      <div class="skills-list">
        @for (category of categories; track category.name) {
          <div class="skill-category">
            <div class="category-header">{{ category.name }}</div>
            @for (skill of category.skills; track skill.name) {
              <div class="skill-item">
                <span class="skill-name">{{ skill.name }}</span>
                <div class="skill-bar">
                  <div class="skill-fill" [style.width.%]="skill.proficiency"></div>
                </div>
                <span class="skill-value">{{ skill.proficiency }}%</span>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .skills-panel {
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

    .chart-container {
      display: flex;
      justify-content: center;
      padding: 8px;
    }

    .skills-list {
      padding: 8px 12px;
    }

    .skill-category {
      margin-bottom: 12px;
    }

    .category-header {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--vsc-accent-blue);
      margin-bottom: 4px;
      letter-spacing: 0.5px;
    }

    .skill-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 2px 0;
    }

    .skill-name {
      font-size: 11px;
      color: var(--vsc-text-primary);
      min-width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .skill-bar {
      flex: 1;
      height: 4px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      overflow: hidden;
    }

    .skill-fill {
      height: 100%;
      background: var(--vsc-bg-statusbar);
      border-radius: 2px;
      transition: width 0.8s ease-out;
    }

    .skill-value {
      font-size: 10px;
      color: var(--vsc-text-muted);
      min-width: 28px;
      text-align: right;
    }
  `],
})
export class SkillsPanelComponent implements OnInit {
  chartData: any;
  chartOptions: any;
  categories: { name: string; skills: { name: string; proficiency: number }[] }[] = [];

  constructor(private readonly data: PortfolioDataService) {}

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
          ticks: {
            stepSize: 20,
            color: '#858585',
            backdropColor: 'transparent',
            font: { size: 9 },
          },
          grid: { color: 'rgba(255,255,255,0.08)' },
          angleLines: { color: 'rgba(255,255,255,0.08)' },
          pointLabels: {
            color: '#d4d4d4',
            font: { size: 10, family: 'Cascadia Code, monospace' },
          },
        },
      },
      plugins: {
        legend: { display: false },
      },
      responsive: true,
      maintainAspectRatio: true,
    };

    const categoryMap: Record<string, string> = {
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'Database',
      architecture: 'Architecture',
      devops: 'DevOps',
      ai: 'AI',
    };

    const grouped = new Map<string, { name: string; proficiency: number }[]>();
    for (const skill of skills.allSkills) {
      const cat = categoryMap[skill.category] ?? skill.category;
      if (!grouped.has(cat)) grouped.set(cat, []);
      grouped.get(cat)!.push({ name: skill.name, proficiency: skill.proficiency });
    }

    this.categories = Array.from(grouped.entries()).map(([name, skills]) => ({
      name,
      skills: skills.sort((a, b) => b.proficiency - a.proficiency),
    }));
  }
}
