import { Component } from '@angular/core';
import { CodeEditorComponent } from '../../shared/components/code-editor.component';

@Component({
  selector: 'app-about-me-editor',
  imports: [CodeEditorComponent],
  template: `<app-code-editor [code]="code" language="typescript" />`,
})
export class AboutMeEditorComponent {
  readonly code = `import { Component } from '@angular/core';

// About Me — Khushal Singh Rajput
// Full Stack Developer | Angular | .NET Core

const developer = {
  name: 'Khushal Singh Rajput',
  role: 'Software Engineer',
  company: 'Bacancy',
  location: 'Ahmedabad, India',
  email: 'rajputkhushal31@gmail.com',

  education: {
    degree: 'B.E., Information Technology',
    university: 'Vishwakarma Government Engineering College',
    cgpa: 8.96,
    graduated: 2024,
  },

  skills: {
    frontend: ['Angular 16-21', 'TypeScript', 'RxJS', 'Signals', 'PrimeNG', 'TailwindCSS'],
    backend: ['C#', '.NET 8/9/10', 'ASP.NET Core', 'EF Core', 'SignalR', 'MediatR'],
    architecture: ['Clean Architecture', 'CQRS', 'REST APIs', 'Microservices', 'RBAC'],
    databases: ['SQL Server', 'PostgreSQL', 'SQLite'],
    ai: ['LLamaSharp', 'Azure AI Document Intelligence'],
    devops: ['SonarQube', 'GitHub Actions', 'Azure'],
  },

  certifications: [
    'Azure Fundamentals: AZ-900 Exam Prep',
  ],

  recognition: [
    { award: 'Fast-Track Innovator', quarter: 'Q3 2025' },
    { award: 'Excellence Award', year: '2024-2025' },
    { award: 'Extra Mile Award', year: '2024-2025' },
    { award: 'Marvellous Performance Award', year: '2024-2025' },
  ],

  links: {
    github: 'https://github.com/khushalrajput',
    linkedin: 'https://linkedin.com/in/khushalsinghrajput',
  },
};

export default developer;`;
}
