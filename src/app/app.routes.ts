import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'readme', pathMatch: 'full' },
  {
    path: 'readme',
    loadComponent: () =>
      import('./editors/readme-editor/readme-editor.component').then(
        (m) => m.ReadmeEditorComponent
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./editors/about-me-editor/about-me-editor.component').then(
        (m) => m.AboutMeEditorComponent
      ),
  },
  {
    path: 'styles',
    loadComponent: () =>
      import('./editors/styles-editor/styles-editor.component').then(
        (m) => m.StylesEditorComponent
      ),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./editors/projects-editor/projects-editor.component').then(
        (m) => m.ProjectsEditorComponent
      ),
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./editors/skill-radar-editor/skill-radar-editor.component').then(
        (m) => m.SkillRadarEditorComponent
      ),
  },
  {
    path: 'resume',
    loadComponent: () =>
      import('./editors/resume-editor/resume-editor.component').then(
        (m) => m.ResumeEditorComponent
      ),
  },
  { path: '**', redirectTo: 'readme' },
];
