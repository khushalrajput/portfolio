import { Component, inject } from '@angular/core';
import { CodeEditorComponent } from '../../shared/components/code-editor.component';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-about-me-editor',
  imports: [CodeEditorComponent],
  template: `<app-code-editor [code]="code" language="scss" />`,
})
export class AboutMeEditorComponent {
  private data = inject(PortfolioDataService);

  get code(): string {
    const p = this.data.profile;
    const skills = this.data.skills.allSkills;

    const group = (cat: string) =>
      skills
        .filter((s) => s.category === cat)
        .map((s) => `'${s.name}'`)
        .join(', ');

    const certs = p.certifications.map((c) => `  '${c}',`).join('\n');

    const awards = p.recognition
      .map(
        (r) =>
          `  ('${r.title}',${' '.repeat(Math.max(1, 34 - r.title.length))}'${r.period}'),`
      )
      .join('\n');

    const edu = p.education[0];

    return `// about-me.scss
// ${p.name} — ${p.role} @ ${p.company}

// ==========================================
//  Identity
// ==========================================

$name:       '${p.name}';
$role:       '${p.role}';
$company:    '${p.company}';
$location:   '${p.location}';
$email:      '${p.email}';

// ==========================================
//  Education
// ==========================================

$degree:     '${edu.degree}';
$university: '${edu.institution}';
$cgpa:       ${edu.cgpa};
$graduated:  ${edu.years.split('–')[1]?.trim() || edu.years};

// ==========================================
//  Skills
// ==========================================

$frontend: (
  ${group('frontend')}
);

$backend: (
  ${group('backend')}
);

$architecture: (
  ${group('architecture')}
);

$databases: (${group('database')});
$ai:        (${group('ai')});
$devops:    (${group('devops')});

// ==========================================
//  Certifications
// ==========================================

$certifications: (
${certs}
);

// ==========================================
//  Recognition & Awards
// ==========================================

$awards: (
${awards}
);

// ==========================================
//  Links
// ==========================================

$github:   '${p.links.github}';
$linkedin: '${p.links.linkedin}';

// ==========================================
//  Mixin: About Me Card
// ==========================================

@mixin about-me-card {
  .developer-card {
    name:       $name;
    role:       $role;
    company:    $company;
    location:   $location;
    education:  $degree, $university;
    cgpa:       $cgpa;

    .skills {
      frontend:     $frontend;
      backend:      $backend;
      architecture: $architecture;
      databases:    $databases;
      ai:           $ai;
      devops:       $devops;
    }

    .contact {
      email:    $email;
      github:   $github;
      linkedin: $linkedin;
    }
  }
}`;
  }
}
