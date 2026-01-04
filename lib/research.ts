import { getContentByType, getContentBySlug, getContentSlugs } from './content';
import type { ResearchProject } from './types';

/**
 * Get all research projects
 */
export async function getAllResearch(): Promise<ResearchProject[]> {
  const projects = await getContentByType<ResearchProject>('research');

  // Sort by status (ongoing first) then by date
  return projects.sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === 'ongoing' ? -1 : 1;
    }
    // Sort by year in dateRange if available
    const yearA = extractYear(a.dateRange);
    const yearB = extractYear(b.dateRange);
    return yearB - yearA;
  });
}

/**
 * Get ongoing research projects
 */
export async function getOngoingProjects(): Promise<ResearchProject[]> {
  const all = await getAllResearch();
  return all.filter((p) => p.status === 'ongoing');
}

/**
 * Get completed research projects
 */
export async function getCompletedProjects(): Promise<ResearchProject[]> {
  const all = await getAllResearch();
  return all.filter((p) => p.status === 'completed');
}

/**
 * Get featured research projects (for homepage)
 */
export async function getFeaturedProjects(): Promise<ResearchProject[]> {
  const all = await getAllResearch();
  return all.filter((p) => p.featured);
}

/**
 * Get a single research project by slug
 */
export function getProjectBySlug(slug: string): ResearchProject | null {
  return getContentBySlug<ResearchProject>('research', slug);
}

/**
 * Get all research slugs for static paths
 */
export async function getResearchSlugs(): Promise<string[]> {
  return getContentSlugs('research');
}

// Helper to extract year from dateRange string
function extractYear(dateRange?: string): number {
  if (!dateRange) return 0;
  const match = dateRange.match(/(\d{4})/);
  return match ? parseInt(match[1], 10) : 0;
}

// Alias for convenience
export { getAllResearch as getResearchProjects };
