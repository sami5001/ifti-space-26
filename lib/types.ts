// Content type definitions for MDX frontmatter

export interface PersonProfile {
  name: string;
  tagline: string;
  institution?: string | null;
  department?: string | null;
  bio?: string | null;
  heroImage?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroTagline?: string | null;
  email?: string | null;
  social?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    googleScholar?: string;
    researchGate?: string;
    orcid?: string;
    website?: string;
  };
  profileUrls?: { label: string; url: string }[];
  employers?: { name: string; logo?: string }[];
  memberships?: { name: string; logo?: string }[];
  content: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  shortTitle?: string;
  institution?: string;
  department?: string;
  dateRange?: string;
  status: 'ongoing' | 'completed';
  category?: 'thesis' | 'project' | 'experiment' | 'bootcamp' | 'other';
  description?: string;
  supervisors?: string;
  tags?: string[];
  links?: { label: string; url: string }[];
  featured?: boolean;
  content: string;
}

export interface Publication {
  id: string;
  type: 'journal' | 'preprint' | 'thesis' | 'report' | 'book' | 'conference';
  title: string;
  authors: string;
  venue: string;
  year: number;
  status?: 'published' | 'in-prep' | 'preprint' | 'accepted';
  doi?: string;
  url?: string;
  abstract?: string;
  content: string;
}

export interface Talk {
  id: string;
  title: string;
  event: string;
  location?: string;
  date: string;
  year: number;
  type?: 'keynote' | 'presentation' | 'workshop' | 'panel' | 'invited';
  url?: string;
  description?: string;
  content: string;
}

export interface Poster {
  id: string;
  title: string;
  event: string;
  location?: string;
  date: string;
  year: number;
  coAuthors?: string;
  url?: string;
  content: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  publishedAt: string;
  author?: string | null;
  draft?: boolean;
  tags?: string[];
  excerpt?: string | null;
  ogImage?: string | null;
  content: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
}

export interface StaticPage {
  slug: string;
  title: string;
  content: string;
}
