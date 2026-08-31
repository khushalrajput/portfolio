import{a as p}from"./chunk-UMFKZBYT.js";import"./chunk-MD5JED4R.js";import{a as l}from"./chunk-G4442JPE.js";import{N as c,Ra as s,kb as d,nb as $}from"./chunk-ZUNLPZLL.js";var m=class r{data=c(l);get code(){let e=this.data.profile,i=this.data.skills.allSkills,t=o=>i.filter(n=>n.category===o).map(n=>`'${n.name}'`).join(", "),u=e.certifications.map(o=>`  '${o}',`).join(`
`),g=e.recognition.map(o=>`  ('${o.title}',${" ".repeat(Math.max(1,34-o.title.length))}'${o.period}'),`).join(`
`),a=e.education[0];return`// about-me.scss
// ${e.name} \u2014 ${e.role} @ ${e.company}

// ==========================================
//  Identity
// ==========================================

$name:       '${e.name}';
$role:       '${e.role}';
$company:    '${e.company}';
$location:   '${e.location}';
$email:      '${e.email}';

// ==========================================
//  Education
// ==========================================

$degree:     '${a.degree}';
$university: '${a.institution}';
$cgpa:       ${a.cgpa};
$graduated:  ${a.years.split("\u2013")[1]?.trim()||a.years};

// ==========================================
//  Skills
// ==========================================

$frontend: (
  ${t("frontend")}
);

$backend: (
  ${t("backend")}
);

$architecture: (
  ${t("architecture")}
);

$databases: (${t("database")});
$ai:        (${t("ai")});
$devops:    (${t("devops")});

// ==========================================
//  Certifications
// ==========================================

$certifications: (
${u}
);

// ==========================================
//  Recognition & Awards
// ==========================================

$awards: (
${g}
);

// ==========================================
//  Links
// ==========================================

$github:   '${e.links.github}';
$linkedin: '${e.links.linkedin}';

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
}`}static \u0275fac=function(i){return new(i||r)};static \u0275cmp=s({type:r,selectors:[["app-about-me-editor"]],decls:1,vars:1,consts:[["language","scss",3,"code"]],template:function(i,t){i&1&&$(0,"app-code-editor",0),i&2&&d("code",t.code)},dependencies:[p],encapsulation:2})};export{m as AboutMeEditorComponent};
