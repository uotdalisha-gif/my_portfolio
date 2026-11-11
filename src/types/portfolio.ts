import { LucideIcon } from 'lucide-react';

export type SkillCategory = 'ALL' | 'DEVELOPMENT' | 'NETWORKING' | 'DESIGN' | 'TOOLS';

export type PortfolioTab = 'projects' | 'certificates' | 'awards';

export type CursorVariant = 'default' | 'hover' | 'drag' | 'project';

export interface SkillItem {
  id: string;
  name: string;
  category: Exclude<SkillCategory, 'ALL'>;
  description: string;
  icon?: LucideIcon;
  simpleIcon?: {
    title?: string;
    path: string;
    hex?: string;
  };
  brandColor?: string;
  proficiency: 'Familiar' | 'Intermediate' | 'Proficient' | 'Advanced' | 'Expert';
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  fullDescription: string;
  tags: string[];
  metrics: string;
  accentColor: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  badge: string;
  description: string;
  imageUrl?: string;
  credentialUrl?: string;
}

export interface LanguageItem {
  language: string;
  nativeName: string;
  proficiency: string;
  level: string;
  description: string;
}

export interface AwardItem {
  id: string;
  title: string;
  event: string;
  date: string;
  description: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  details: string;
  location: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  badgeColor?: string;
}

export interface ProfileInfo {
  name: string;
  nativeName: string;
  headline: string;
  subheadline: string;
  bio: string;
  secondaryBio: string;
  university: string;
  faculty: string;
  location: string;
  studentId: string;
  email: string;
  githubUrl: string;
  telegramUrl: string;
  phone: string;
  avatarUrl?: string;
  isAvailableForWork: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'CERTIFICATES' | 'ACADEMIC' | 'ACTIVITIES';
  imageUrl: string;
  date: string;
  description: string;
}

export interface NavItem {
  id: string;
  label: string;
}

