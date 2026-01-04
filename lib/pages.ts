import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { StaticPage } from './types';

const pagesDirectory = path.join(process.cwd(), 'contents', 'pages');

/**
 * Get a static page by slug (e.g., 'imprint', 'about')
 */
export function getPageBySlug(slug: string): StaticPage | null {
  const filePath = path.join(pagesDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    content,
  };
}

/**
 * Get all static page slugs
 */
export function getPageSlugs(): string[] {
  if (!fs.existsSync(pagesDirectory)) {
    return [];
  }

  const files = fs.readdirSync(pagesDirectory);
  return files.filter((file) => file.endsWith('.mdx')).map((file) => file.replace(/\.mdx$/, ''));
}
