import { Component, inject } from '@angular/core';
import { CodeEditorComponent } from '../../shared/components/code-editor.component';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-angular-json-editor',
  imports: [CodeEditorComponent],
  template: `<app-code-editor [code]="code" language="json" />`,
})
export class AngularJsonEditorComponent {
  private data = inject(PortfolioDataService);

  get code(): string {
    const p = this.data.profile;
    const skills = this.data.skills.allSkills;

    const group = (cat: string) =>
      skills
        .filter((s) => s.category === cat)
        .map((s) => `"${s.name}"`)
        .join(', ');

    const obj = {
      developer: p.name,
      role: p.role,
      company: p.company,
      location: p.location,
      education: {
        degree: p.education[0].degree,
        university: p.education[0].institution,
        cgpa: parseFloat(p.education[0].cgpa),
        graduated: parseInt(p.education[0].years.split('–')[1]?.trim() || p.education[0].years, 10),
      },
      skills: {
        frontend: skills.filter((s) => s.category === 'frontend').map((s) => s.name),
        backend: skills.filter((s) => s.category === 'backend').map((s) => s.name),
        architecture: skills.filter((s) => s.category === 'architecture').map((s) => s.name),
        databases: skills.filter((s) => s.category === 'database').map((s) => s.name),
        ai: skills.filter((s) => s.category === 'ai').map((s) => s.name),
        devops: skills.filter((s) => s.category === 'devops').map((s) => s.name),
      },
      certifications: p.certifications,
      recognition: p.recognition.map((r) => ({
        award: r.title,
        period: r.period,
      })),
      links: {
        github: p.links.github,
        linkedin: p.links.linkedin,
        email: p.email,
      },
    };

    return JSON.stringify(obj, null, 2);
  }
}
