const fs = require('fs');
const path = require('path');
const RSS = require('rss');
const matter = require('gray-matter');

// Only generate RSS at build time on server
if (typeof window === 'undefined') {
  generateRSS();
}

function generateRSS() {
  const postsDirectory = path.join(process.cwd(), 'contents', 'blog');
  const publicDirectory = path.join(process.cwd(), 'public');

  // Check if posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.log('No blog posts directory found, skipping RSS generation');
    return;
  }

  // Read site config if available
  let siteConfig = {
    name: 'Academic Portfolio',
    url: 'https://example.com',
    description: 'Academic portfolio and blog',
  };

  try {
    // Try to load site config
    const configPath = path.join(process.cwd(), 'config', 'site.ts');
    if (fs.existsSync(configPath)) {
      // Note: This is a simplified approach. In production, you might want to
      // use a JSON config or environment variables for RSS generation
    }
  } catch (e) {
    // Use defaults
  }

  const feed = new RSS({
    title: siteConfig.name,
    site_url: siteConfig.url,
    feed_url: `${siteConfig.url}/feed.xml`,
    description: siteConfig.description,
    language: 'en',
    pubDate: new Date(),
  });

  // Get all blog posts
  const files = fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));

  const posts = files
    .map((file) => {
      const filePath = path.join(postsDirectory, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(content);
      const slug = file.replace(/\.mdx$/, '');

      return {
        slug,
        title: data.title || slug,
        publishedAt: data.publishedAt,
        draft: data.draft || false,
        excerpt: data.excerpt || '',
      };
    })
    .filter((post) => !post.draft && post.publishedAt)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Add posts to feed
  posts.forEach((post) => {
    feed.item({
      title: post.title,
      url: `${siteConfig.url}/blog/${post.slug}`,
      date: new Date(post.publishedAt),
      description: post.excerpt,
    });
  });

  // Write RSS feed
  const rssPath = path.join(publicDirectory, 'feed.xml');
  fs.writeFileSync(rssPath, feed.xml({ indent: true }));
  console.log('RSS feed generated at public/feed.xml');
}

module.exports = generateRSS;
