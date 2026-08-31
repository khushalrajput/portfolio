import{a as k}from"./chunk-UMFKZBYT.js";import"./chunk-MD5JED4R.js";import{a as y}from"./chunk-G4442JPE.js";import{Ba as C,Ea as o,Jb as f,Ma as j,Mb as a,Nb as p,Ob as P,Ra as b,ea as u,eb as m,fb as v,hb as g,ib as d,jb as l,kb as x,lb as r,mb as n,nb as h,wb as _,yb as s}from"./chunk-ZUNLPZLL.js";var S=(e,i)=>i.name;function w(e,i){if(e&1&&h(0,"app-code-editor",3),e&2){let t=s();x("code",t.codeContent)}}function O(e,i){if(e&1&&(r(0,"div",11),a(1),n()),e&2){let t=i.$implicit;o(),P("\u2713 ",t)}}function T(e,i){if(e&1&&(r(0,"span",13),a(1),n()),e&2){let t=i.$implicit;o(),p(t)}}function I(e,i){if(e&1&&(r(0,"a",14),a(1," View Project \u2192 "),n()),e&2){let t=s().$implicit;x("href",t.link,C)}}function z(e,i){if(e&1&&(r(0,"div",5)(1,"div",6)(2,"h3",7),a(3),n(),r(4,"span",8),a(5),n()(),r(6,"p",9),a(7),n(),r(8,"div",10),d(9,O,2,1,"div",11,g),n(),r(11,"div",12),d(12,T,2,1,"span",13,g),n(),m(14,I,2,1,"a",14),n()),e&2){let t=i.$implicit;o(3),p(t.name),o(2),p(t.domain),o(2),p(t.description),o(2),l(t.highlights),o(3),l(t.stack),o(2),v(t.link?14:-1)}}function A(e,i){if(e&1&&(r(0,"div",4),d(1,z,15,4,"div",5,S),n()),e&2){let t=s();o(),l(t.data.projects)}}var E=class e{constructor(i){this.data=i}data;view=u("preview");codeContent=`<!-- projects.component.html -->
<div class="projects-container">
  @for (project of projects(); track project.name) {
    <app-project-card
      [name]="project.name"
      [domain]="project.domain"
      [stack]="project.stack"
      [description]="project.description"
      [highlights]="project.highlights"
      [link]="project.link"
    />
  }
</div>

<!-- Invoice Automation System -->
<app-project-card
  name="Invoice Automation System"
  domain="Pharma"
  [stack]="['Angular 19', '.NET 9', 'Azure AI', 'PrimeNG']"
  description="AI-powered invoice extraction pipeline..."
/>

<!-- Registry Management System -->
<app-project-card
  name="Registry Management System"
  domain="GovTech"
  [stack]="['Angular 18', '.NET 8', 'SQL Server', 'PrimeNG']"
  description="Legal operations platform for Spanish agencies..."
/>

<!-- CareerLens -->
<app-project-card
  name="CareerLens"
  domain="Personal"
  [stack]="['Angular 21', '.NET 10', 'LLamaSharp', 'SignalR']"
  description="Privacy-first AI resume tool..."
  link="https://github.com/khushalrajput"
/>`;static \u0275fac=function(t){return new(t||e)(j(y))};static \u0275cmp=b({type:e,selectors:[["app-projects-editor"]],decls:8,vars:5,consts:[[1,"projects-editor"],[1,"split-tabs"],[1,"split-tab",3,"click"],["language","html",3,"code"],[1,"preview-pane"],[1,"project-card"],[1,"card-header"],[1,"project-name"],[1,"project-domain"],[1,"project-desc"],[1,"project-highlights"],[1,"highlight"],[1,"project-stack"],[1,"tech-badge"],["target","_blank","rel","noopener",1,"project-link",3,"href"]],template:function(t,c){t&1&&(r(0,"div",0)(1,"div",1)(2,"button",2),_("click",function(){return c.view.set("code")}),a(3," </> Code "),n(),r(4,"button",2),_("click",function(){return c.view.set("preview")}),a(5," \u25B7 Preview "),n()(),m(6,w,1,1,"app-code-editor",3)(7,A,3,0,"div",4),n()),t&2&&(o(2),f("active",c.view()==="code"),o(2),f("active",c.view()==="preview"),o(2),v(c.view()==="code"?6:7))},dependencies:[k],styles:[".projects-editor[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:100%}.split-tabs[_ngcontent-%COMP%]{display:flex;background:var(--vsc-bg-tab-inactive);border-bottom:1px solid var(--vsc-border)}.split-tab[_ngcontent-%COMP%]{padding:6px 16px;background:transparent;border:none;color:var(--vsc-text-muted);font-size:12px;cursor:pointer}.split-tab.active[_ngcontent-%COMP%]{color:var(--vsc-text-active);border-bottom:1px solid var(--vsc-bg-statusbar)}.split-tab[_ngcontent-%COMP%]:hover{color:var(--vsc-text-primary)}.preview-pane[_ngcontent-%COMP%]{padding:24px;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:20px}.project-card[_ngcontent-%COMP%]{background:#ffffff08;border:1px solid var(--vsc-border);border-radius:6px;padding:20px}.card-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}.project-name[_ngcontent-%COMP%]{font-size:16px;font-weight:600;color:var(--vsc-text-active);margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif}.project-domain[_ngcontent-%COMP%]{padding:2px 8px;background:#4ec9b026;color:var(--vsc-accent-cyan);font-size:11px;border-radius:3px}.project-desc[_ngcontent-%COMP%]{font-size:13px;color:var(--vsc-text-primary);line-height:1.5;margin-bottom:12px}.project-highlights[_ngcontent-%COMP%]{margin-bottom:12px}.highlight[_ngcontent-%COMP%]{font-size:12px;color:var(--vsc-accent-green);padding:2px 0;line-height:1.4}.project-stack[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}.tech-badge[_ngcontent-%COMP%]{padding:3px 8px;background:#569cd626;color:var(--vsc-accent-blue);font-size:11px;border-radius:3px}.project-link[_ngcontent-%COMP%]{color:var(--vsc-accent-blue);font-size:12px;text-decoration:none}.project-link[_ngcontent-%COMP%]:hover{text-decoration:underline}@media(max-width:768px){.preview-pane[_ngcontent-%COMP%]{padding:16px 12px;gap:16px}.project-card[_ngcontent-%COMP%]{padding:16px}.card-header[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start;gap:6px}}"]})};export{E as ProjectsEditorComponent};
