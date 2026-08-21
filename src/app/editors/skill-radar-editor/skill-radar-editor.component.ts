import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CodeEditorComponent } from '../../shared/components/code-editor.component';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-skill-radar-editor',
  imports: [ChartModule, CodeEditorComponent],
  template: `
    <div class="skill-radar-editor">
      <div class="code-section">
        <app-code-editor [code]="codeContent" language="typescript" />
      </div>
      <div class="chart-section">
        <div class="chart-header">// Live Output</div>
        <div class="chart-wrapper">
          <p-chart type="radar" [data]="chartData" [options]="chartOptions" />
        </div>
      </div>
    </div>
  `,
  styles: [`
    .skill-radar-editor {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .code-section {
      flex: 1;
      overflow: auto;
      border-bottom: 1px solid var(--vsc-border);
    }

    .chart-section {
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .chart-header {
      font-size: 12px;
      color: var(--vsc-accent-green);
      font-style: italic;
      margin-bottom: 8px;
      align-self: flex-start;
    }

    .chart-wrapper {
      max-width: 400px;
      width: 100%;
    }
  `],
})
export class SkillRadarEditorComponent implements OnInit {
  chartData: any;
  chartOptions: any;

  constructor(private readonly data: PortfolioDataService) {}

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
