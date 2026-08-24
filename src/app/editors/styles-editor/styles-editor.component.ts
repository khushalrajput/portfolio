import { Component, inject } from '@angular/core';
import { CodeEditorComponent } from '../../shared/components/code-editor.component';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-styles-editor',
  imports: [CodeEditorComponent],
  template: `<app-code-editor [code]="code" language="typescript" />`,
})
export class StylesEditorComponent {
  private data = inject(PortfolioDataService);

  get code(): string {
    const name = this.data.profile.name;

    return `// app.config.ts — Developer Workspace Configuration
import { WorkspaceConfig } from '@khushal/portfolio';

export const appConfig: WorkspaceConfig = {
  developer: '${name}',

  workspace: {
    editor: 'VS Code',
    theme: 'Dark+ (default)',
    font: 'Cascadia Code',
    fontSize: 14,
    tabSize: 2,
    formatOnSave: true,
    bracketPairColorization: true,
  },

  extensions: [
    'Angular Language Service',
    'Prettier',
    'ESLint',
    'GitLens',
    'C# Dev Kit',
    'Thunder Client',
    'Tailwind CSS IntelliSense',
    'Error Lens',
    'Material Icon Theme',
    'GitHub Copilot',
  ],

  dailyTools: {
    versionControl: 'Git + GitHub',
    apiTesting: 'Thunder Client / Postman',
    database: 'SSMS / Azure Data Studio',
    terminal: 'Windows Terminal + Git Bash',
    browser: 'Chrome DevTools',
    ciCd: 'GitHub Actions',
    codeQuality: 'SonarQube',
  },

  workflow: {
    methodology: 'Agile / Scrum',
    branchStrategy: 'GitFlow',
    codeReview: true,
    pairProgramming: true,
    standups: 'Daily @ 10:00 AM IST',
  },

  interests: [
    'Clean Architecture patterns',
    'AI-powered developer tools',
    'Open source contribution',
    'Performance optimization',
    'Building side projects',
  ],
};

export default appConfig;`;
  }
}
