import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { BlogPost } from './types';

const postsDirectory = path.join(process.cwd(), 'contents', 'blog');

/**
 * Extract the first image from MDX content for OG image
 */
function extractFirstImage(content: string): string | undefined {
  // Match <Image src="..." /> or <Image src='...' /> or ![alt](src)
  const imageTagMatch = content.match(/<Image\s+[^>]*src=["']([^"']+)["']/i);
  if (imageTagMatch) {
    return imageTagMatch[1];
  }

  // Match markdown image syntax ![alt](src)
  const markdownImageMatch = content.match(/!\[[^\]]*\]\(([^)]+)\)/);
  if (markdownImageMatch) {
    return markdownImageMatch[1];
  }

  return undefined;
}

/**
 * Get all post slugs
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const files = fs.readdirSync(postsDirectory);
  return files.filter((file) => file.endsWith('.mdx')).map((file) => file.replace(/\.mdx$/, ''));
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const readingTimeResult = readingTime(content);

    return {
      slug,
      title: data.title || '',
      publishedAt: data.publishedAt || '',
      author: data.author || null,
      draft: data.draft || false,
      tags: data.tags || [],
      excerpt: data.excerpt || null,
      ogImage: data.ogImage || extractFirstImage(content) || null,
      content,
      readingTime: readingTimeResult,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all posts (including drafts)
 */
export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return dateB - dateA; // Most recent first
    });

  return posts;
}

/**
 * Get published posts only (excludes drafts)
 */
export function getPublishedPosts(): BlogPost[] {
  return getAllPosts().filter((post) => !post.draft);
}

/**
 * Get posts grouped by year
 */
export function getPostsByYear(): Record<number, BlogPost[]> {
  const posts = getPublishedPosts();
  return posts.reduce(
    (acc, post) => {
      const year = new Date(post.publishedAt).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, BlogPost[]>
  );
}

/**
 * Get recent posts
 */
export function getRecentPosts(count: number = 5): BlogPost[] {
  return getPublishedPosts().slice(0, count);
}

/**
 * Get related posts (by tags)
 */
export function getRelatedPosts(currentSlug: string, count: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  const currentTags = new Set(currentPost.tags || []);
  const otherPosts = getPublishedPosts().filter((p) => p.slug !== currentSlug);

  // Score posts by number of matching tags
  const scored = otherPosts.map((post) => {
    const matchingTags = (post.tags || []).filter((tag) => currentTags.has(tag)).length;
    return { post, score: matchingTags };
  });

  // Sort by score (descending) and return top N
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.post);
}
