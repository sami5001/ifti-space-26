import { getContentByType } from './content';
import type { Publication, Talk, Poster } from './types';

/**
 * Get all publications
 */
export async function getAllPublications(): Promise<Publication[]> {
  const pubs = await getContentByType<Publication>('publications');
  return pubs.sort((a, b) => b.year - a.year);
}

/**
 * Get publications grouped by year
 */
export async function getPublicationsByYear(): Promise<Record<number, Publication[]>> {
  const pubs = await getAllPublications();
  return pubs.reduce(
    (acc, pub) => {
      if (!acc[pub.year]) acc[pub.year] = [];
      acc[pub.year].push(pub);
      return acc;
    },
    {} as Record<number, Publication[]>
  );
}

/**
 * Get recent publications
 */
export async function getRecentPublications(count: number = 3): Promise<Publication[]> {
  const pubs = await getAllPublications();
  return pubs.slice(0, count);
}

/**
 * Get all talks
 */
export async function getAllTalks(): Promise<Talk[]> {
  const talks = await getContentByType<Talk>('talks');
  return talks.sort((a, b) => b.year - a.year);
}

/**
 * Get talks grouped by year
 */
export async function getTalksByYear(): Promise<Record<number, Talk[]>> {
  const talks = await getAllTalks();
  return talks.reduce(
    (acc, talk) => {
      if (!acc[talk.year]) acc[talk.year] = [];
      acc[talk.year].push(talk);
      return acc;
    },
    {} as Record<number, Talk[]>
  );
}

/**
 * Get all posters
 */
export async function getAllPosters(): Promise<Poster[]> {
  const posters = await getContentByType<Poster>('posters');
  return posters.sort((a, b) => b.year - a.year);
}

/**
 * Get posters grouped by year
 */
export async function getPostersByYear(): Promise<Record<number, Poster[]>> {
  const posters = await getAllPosters();
  return posters.reduce(
    (acc, poster) => {
      if (!acc[poster.year]) acc[poster.year] = [];
      acc[poster.year].push(poster);
      return acc;
    },
    {} as Record<number, Poster[]>
  );
}

/**
 * Get counts for sidebar display
 */
export async function getPublicationCounts() {
  const [pubs, talks, posters] = await Promise.all([
    getAllPublications(),
    getAllTalks(),
    getAllPosters(),
  ]);

  return {
    publications: pubs.length,
    talks: talks.length,
    posters: posters.length,
    total: pubs.length + talks.length + posters.length,
  };
}

// Aliases for convenience
export { getAllPublications as getPublications };
export { getAllTalks as getTalks };
export { getAllPosters as getPosters };
