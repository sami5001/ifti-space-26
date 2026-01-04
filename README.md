# Academic Portfolio Theme

A modern, professional academic portfolio website built with Next.js. Designed for researchers, academics, and professionals who want to showcase their work with minimal technical configuration.

> Developed by [Sami Adnan](https://sami.cloud)

## Features

- **Content-First Design**: All content managed through simple MDX files
- **Modern Stack**: Next.js 15, React 19, TypeScript
- **Beautiful Styling**: Stitches CSS-in-JS with dark/light theme support
- **Accessible**: Built with Radix UI primitives
- **SEO Ready**: Meta tags, Open Graph images, sitemap support
- **Responsive**: Mobile-first design that works on all devices

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your site.

### 3. Customize Your Content

Edit the files in the `contents/` folder to add your information:

```
contents/
├── person/
│   └── profile.mdx      # Your bio, social links, institutions
├── research/
│   └── *.mdx            # Research projects
├── publications/
│   └── *.mdx            # Journal articles, papers
├── talks/
│   └── *.mdx            # Conference talks
├── posters/
│   └── *.mdx            # Poster presentations
├── blog/
│   └── *.mdx            # Blog posts
└── pages/
    └── *.mdx            # Static pages (imprint, etc.)
```

## Content Guide

### Profile (`contents/person/profile.mdx`)

Your personal information and bio:

```yaml
---
name: "Your Name"
tagline: "Your Title"
institution: "Your Institution"
bio: |
  Your bio text here. Supports markdown.
social:
  linkedin: "https://linkedin.com/in/yourprofile"
  github: "https://github.com/yourusername"
  twitter: "yourusername"
  googleScholar: "https://scholar.google.com/citations?user=YOUR_ID"
---
```

### Research Projects (`contents/research/*.mdx`)

```yaml
---
id: "project-id"
title: "Project Title"
shortTitle: "Short Title"  # For sidebar navigation
status: "ongoing"           # or "completed"
featured: true              # Show on homepage
institution: "Your Institution"
dateRange: "2023 - Present"
supervisors: "Prof. Name"
description: |
  Project description here.
tags:
  - "Machine Learning"
  - "Healthcare"
links:
  - label: "GitHub"
    url: "https://github.com/example"
---

Additional content in markdown...
```

### Publications (`contents/publications/*.mdx`)

```yaml
---
id: "publication-2024"
type: "journal"           # journal, preprint, thesis, report, book, conference
title: "Paper Title"
authors: "Author A, Author B"
venue: "Journal Name"
year: 2024
doi: "10.1000/example"
url: "https://doi.org/10.1000/example"
status: "published"       # or "under review"
---
```

### Talks (`contents/talks/*.mdx`)

```yaml
---
id: "talk-2024"
title: "Talk Title"
event: "Conference Name 2024"
date: "March 2024"
year: 2024
location: "City, Country"
type: "oral"              # oral, workshop, keynote
url: "https://example.com/talk"
---
```

### Posters (`contents/posters/*.mdx`)

```yaml
---
id: "poster-2024"
title: "Poster Title"
event: "Conference 2024"
date: "June 2024"
year: 2024
location: "City, Country"
coAuthors: "Co-Author A, Co-Author B"
url: "https://example.com/poster.pdf"
---
```

### Blog Posts (`contents/blog/*.mdx`)

```yaml
---
title: "Blog Post Title"
publishedAt: "2024-01-15"
author: "Your Name"
tags:
  - "Research"
  - "Tutorial"
draft: false              # Set true to hide from listings
---

Blog content in markdown...
```

## Configuration

### Site Configuration (`config/site.ts`)

```typescript
export const siteConfig = {
  name: 'Your Name',
  url: 'https://your-site.com',
  description: 'Your tagline',

  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Research', href: '/research' },
    // ...
  ],

  social: {
    linkedin: 'https://linkedin.com/in/you',
    github: 'https://github.com/you',
    twitter: 'yourusername',
  },
};
```

### Contact Form

To enable the contact form, set up a [Web3Forms](https://web3forms.com/) account and add your access key:

1. Create a `.env.local` file
2. Add: `NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key`

## Adding Images

Place images in the `public/images/` folder:

```
public/images/
├── hero/
│   ├── hero-home.jpg
│   ├── hero-research.jpg
│   ├── hero-publications.jpg
│   ├── hero-writing.jpg
│   └── hero-contact.jpg
└── logos/
    └── your-logos.svg
```

Recommended hero image size: 1920x1080 pixels or larger.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

Build for production:

```bash
npm run build
```

The output will be in the `.next` folder, ready for deployment to any Node.js hosting platform.

## Tech Stack

- **Framework**: Next.js 15 with Pages Router
- **UI**: React 19, TypeScript
- **Styling**: Stitches CSS-in-JS
- **Components**: Radix UI primitives
- **Content**: MDX with gray-matter frontmatter
- **Icons**: Radix Icons

## File Structure

```
├── components/           # React components
│   ├── ui/              # Core UI components
│   └── layouts/         # Layout components
├── config/              # Site configuration
├── contents/            # YOUR CONTENT (edit these!)
├── contexts/            # React contexts (theme)
├── lib/                 # Content loaders and utilities
├── pages/               # Next.js pages
├── public/              # Static assets
├── styles/              # Style utilities
└── stitches.config.ts   # Design system tokens
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Customization

### Colors

Edit `stitches.config.ts` to change the color palette:

```typescript
colors: {
  accent: '#0071e3',      // Primary accent color
  accentHover: '#0077ED',
  // ...
}
```

### Typography

Font settings are in `pages/_document.tsx` and can be changed to any Google Fonts.

### Theme

The site supports light, dark, and system themes. Users can toggle via the theme button in the navbar.

## Support

For issues and feature requests, please create an issue on the repository.

## License

MIT License - feel free to use this theme for your own portfolio!
