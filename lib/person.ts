import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { PersonProfile } from './types';

const contentsDir = path.join(process.cwd(), 'contents');

/**
 * Load the person profile from /contents/person/profile.mdx
 */
export function getProfile(): PersonProfile | null {
  const profilePath = path.join(contentsDir, 'person', 'profile.mdx');

  if (!fs.existsSync(profilePath)) {
    // Return default profile if file doesn't exist
    return {
      name: 'Your Name',
      tagline: 'Your Title',
      content: '',
    };
  }

  const fileContents = fs.readFileSync(profilePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    name: data.name || 'Your Name',
    tagline: data.tagline || 'Your Title',
    institution: data.institution || null,
    department: data.department || null,
    bio: data.bio || content || null, // Use frontmatter bio or fallback to content
    heroImage: data.heroImage || null,
    heroTitle: data.heroTitle || null,
    heroSubtitle: data.heroSubtitle || null,
    heroTagline: data.heroTagline || null,
    email: data.email || null,
    social: data.social || {},
    profileUrls: data.profileUrls || [],
    employers: data.employers || [],
    memberships: data.memberships || [],
    content,
  };
}

/**
 * Get profile data for homepage
 */
export function getHomePageData() {
  const profile = getProfile();
  return {
    profile,
  };
}

// Async wrapper for consistency with other loaders
export async function getPersonProfile(): Promise<PersonProfile | null> {
  return getProfile();
}
