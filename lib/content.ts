import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { glob } from 'glob';

const contentsDir = path.join(process.cwd(), 'contents');

/**
 * Generic function to load all MDX files from a content type directory
 */
export async function getContentByType<T>(
  type: string
): Promise<(T & { content: string })[]> {
  const typeDir = path.join(contentsDir, type);

  if (!fs.existsSync(typeDir)) {
    return [];
  }

  const files = await glob(`${typeDir}/*.mdx`);

  return files.map((file) => {
    const fileContents = fs.readFileSync(file, 'utf8');
    const { data, content } = matter(fileContents);
    const slug = path.basename(file, '.mdx');

    return {
      ...data,
      id: data.id || slug,
      slug,
      content,
    } as unknown as T & { content: string };
  });
}

/**
 * Get a single content item by slug
 */
export function getContentBySlug<T>(
  type: string,
  slug: string
): (T & { content: string }) | null {
  const filePath = path.join(contentsDir, type, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    ...data,
    id: data.id || slug,
    slug,
    content,
  } as unknown as T & { content: string };
}

/**
 * Get all slugs for a content type (for getStaticPaths)
 */
export async function getContentSlugs(type: string): Promise<string[]> {
  const typeDir = path.join(contentsDir, type);

  if (!fs.existsSync(typeDir)) {
    return [];
  }

  const files = await glob(`${typeDir}/*.mdx`);
  return files.map((file) => path.basename(file, '.mdx'));
}

/**
 * Check if contents directory exists for a type
 */
export function contentTypeExists(type: string): boolean {
  return fs.existsSync(path.join(contentsDir, type));
}
