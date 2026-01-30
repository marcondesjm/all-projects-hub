export type ProjectStatus = 'published' | 'draft' | 'archived';
export type ProjectType = 'website' | 'landing' | 'app' | 'funnel' | 'other';

export interface LovableAccount {
  id: string;
  email: string;
  name: string;
  color: 'blue' | 'emerald' | 'amber' | 'rose' | 'violet';
  projectCount: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  screenshot?: string;
  status: ProjectStatus;
  type: ProjectType;
  accountId: string;
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
  tags: string[];
  notes?: string;
  viewCount: number;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}
