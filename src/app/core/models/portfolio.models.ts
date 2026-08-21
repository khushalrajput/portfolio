export interface Profile {
  name: string;
  role: string;
  company: string;
  location: string;
  email: string;
  tagline: string;
  intro: string;
  links: {
    github: string;
    linkedin: string;
  };
  education: Education[];
  certifications: string[];
  recognition: Recognition[];
}

export interface Education {
  degree: string;
  institution: string;
  cgpa: string;
  years: string;
}

export interface Recognition {
  title: string;
  period: string;
  link?: string;
}

export interface Skill {
  name: string;
  proficiency: number; // 0-100
  category: 'frontend' | 'backend' | 'database' | 'architecture' | 'devops' | 'ai';
}

export interface SkillsData {
  radarLabels: string[];
  radarValues: number[];
  allSkills: Skill[];
}

export interface Project {
  name: string;
  domain: string;
  stack: string[];
  description: string;
  highlights: string[];
  link?: string;
}

export interface ExperienceCommit {
  hash: string;
  type: 'feat' | 'fix' | 'refactor' | 'chore';
  message: string;
  description: string;
  techStack: string[];
  impact?: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  period: string;
  isCurrent: boolean;
  commits: ExperienceCommit[];
  tags: ExperienceTag[];
}

export interface ExperienceTag {
  name: string;
  label: string;
}

export interface FileTreeNode {
  label: string;
  icon: string;
  expandedIcon?: string;
  collapsedIcon?: string;
  children?: FileTreeNode[];
  route?: string;
  type: 'file' | 'folder';
  fileExtension?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface TabItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  fileExtension: string;
  isModified: boolean;
  breadcrumb: string[];
}
