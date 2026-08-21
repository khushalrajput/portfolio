import { Injectable } from '@angular/core';
import {
  Profile,
  SkillsData,
  Project,
  ExperienceEntry,
  FileTreeNode,
} from '../models/portfolio.models';

import profileData from '../../../data/profile.json';
import skillsData from '../../../data/skills.json';
import projectsData from '../../../data/projects.json';
import experienceData from '../../../data/experience.json';
import fileTreeData from '../../../data/file-tree.json';
import chatbotData from '../../../data/chatbot-context.json';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  readonly profile: Profile = profileData as Profile;
  readonly skills: SkillsData = skillsData as SkillsData;
  readonly projects: Project[] = projectsData as Project[];
  readonly experience: ExperienceEntry[] = experienceData as ExperienceEntry[];
  readonly fileTree: FileTreeNode[] = fileTreeData as FileTreeNode[];
  readonly chatbotContext = chatbotData;
}
