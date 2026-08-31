import{a as p}from"./chunk-UMFKZBYT.js";import"./chunk-MD5JED4R.js";import{a as s}from"./chunk-G4442JPE.js";import{N as i,Ra as r,kb as n,nb as a}from"./chunk-ZUNLPZLL.js";var l=class t{data=i(s);get code(){return`// app.config.ts \u2014 Developer Workspace Configuration
import { WorkspaceConfig } from '@khushal/portfolio';

export const appConfig: WorkspaceConfig = {
  developer: '${this.data.profile.name}',

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

export default appConfig;`}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=r({type:t,selectors:[["app-styles-editor"]],decls:1,vars:1,consts:[["language","typescript",3,"code"]],template:function(e,d){e&1&&a(0,"app-code-editor",0),e&2&&n("code",d.code)},dependencies:[p],encapsulation:2})};export{l as StylesEditorComponent};
