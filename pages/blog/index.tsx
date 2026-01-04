import React from 'react';
import TitleAndMetaTags from '@components/TitleAndMetaTags';
import { BlogCard } from '@components/BlogCard';
import { NavBar, Container } from '@components/ui';
import { TwoColumnLayout, SidebarNav, SidebarSection, SidebarLink } from '@components/layouts';
import { HeroSection } from '@components/HeroSection';
import { styled } from 'stitches.config';
import { ReaderIcon } from '@radix-ui/react-icons';

import type { BlogPost } from '@lib/types';
import { getAllPosts } from '@lib/posts';
import { siteConfig } from '@config/site';

const PageWrapper = styled('div', {
  minHeight: '100vh',
  backgroundColor: '$background',
});

const ContentContainer = styled(Container, {
  paddingTop: '$6',
  paddingBottom: '$12',

  '@bp2': {
    paddingTop: '$8',
  },
});

const BlogGrid = styled('div', {
  display: 'grid',
  gap: '$6',
  gridTemplateColumns: '1fr',

  '@bp1': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  '@bp3': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

const EmptyState = styled('div', {
  textAlign: 'center',
  padding: '$12 $6',
  backgroundColor: '$backgroundSubtle',
  borderRadius: '$4',
  border: '1px dashed $borderSubtle',
});

const EmptyStateText = styled('p', {
  fontSize: '$4',
  color: '$foregroundMuted',
  margin: 0,
});

export default function Blog({ posts }: { posts: BlogPost[] }) {
  // Get recent posts (last 5)
  const recentPosts = posts.slice(0, 5);

  // Group posts by year for the sidebar
  const postsByYear = posts.reduce(
    (acc, post) => {
      const year = new Date(post.publishedAt).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, BlogPost[]>
  );

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  const sidebar = (
    <SidebarNav title="Navigation">
      <SidebarLink href="/blog" icon={<ReaderIcon />}>
        All Posts
      </SidebarLink>

      {recentPosts.length > 0 && (
        <SidebarSection title="Recent Posts" defaultOpen>
          {recentPosts.map((post) => (
            <SidebarLink key={post.slug} href={`/blog/${post.slug}`} indent={1}>
              {post.title}
            </SidebarLink>
          ))}
        </SidebarSection>
      )}

      {years.length > 0 && (
        <SidebarSection title="Archive" defaultOpen={false}>
          {years.map((year) => (
            <SidebarLink
              key={year}
              href={`/blog#${year}`}
              indent={1}
              badge={postsByYear[Number(year)].length}
            >
              {year}
            </SidebarLink>
          ))}
        </SidebarSection>
      )}
    </SidebarNav>
  );

  return (
    <PageWrapper>
      <TitleAndMetaTags
        title={`Writing - ${siteConfig.name}`}
        description="Articles, thoughts, and reflections on research and academia."
        image="/images/hero/hero-writing.jpg"
      />
      <NavBar />

      <HeroSection
        imageSrc="/images/hero/hero-writing.jpg"
        imageAlt="Writing"
        title="Writing"
        subtitle="Thoughts on research, academia, and professional development."
        tagline="Personal Blog"
        focalPoint={{ x: 50, y: 70 }}
        textAlign="left"
      />

      <ContentContainer>
        <TwoColumnLayout sidebar={sidebar}>
          {posts.length > 0 ? (
            <BlogGrid>
              {posts.map((post, index) => (
                <div key={post.slug} style={{ animationDelay: `${index * 0.05}s` }}>
                  <BlogCard post={post} />
                </div>
              ))}
            </BlogGrid>
          ) : (
            <EmptyState>
              <EmptyStateText>No posts yet. Add blog MDX files to contents/blog/ to get started!</EmptyStateText>
            </EmptyState>
          )}
        </TwoColumnLayout>
      </ContentContainer>
    </PageWrapper>
  );
}

export function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}
