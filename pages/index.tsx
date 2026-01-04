import React, { useState } from 'react';
import TitleAndMetaTags from '@components/TitleAndMetaTags';
import { BlogCard } from '@components/BlogCard';
import { ResearchCard } from '@components/ResearchCard';
import { PublicationCard } from '@components/PublicationCard';
import { HeroSection } from '@components/HeroSection';
import { NavBar, Container, Section, Card, CardTitle, CardContent } from '@components/ui';
import { styled, keyframes } from 'stitches.config';
import NextLink from 'next/link';
import {
  ArrowRightIcon,
  PersonIcon,
  RocketIcon,
  FileTextIcon,
  Pencil1Icon,
} from '@radix-ui/react-icons';

import type { BlogPost } from '@lib/types';
import type { ResearchProject, Publication } from '@lib/types';
import { getAllPosts } from '@lib/posts';
import { getResearchProjects } from '@lib/research';
import { getPublications } from '@lib/publications';
import { ResearchDetailModal } from '@components/ResearchDetailModal';
import { siteConfig } from '@config/site';
import { getPersonProfile } from '@lib/person';
import type { PersonProfile } from '@lib/types';

const fadeUp = keyframes({
  from: { opacity: 0, transform: 'translateY(20px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const BioText = styled('p', {
  fontSize: '$4',
  color: '$foregroundMuted',
  lineHeight: '$6',
  marginBottom: '$5',

  '&:last-child': {
    marginBottom: 0,
  },
});

const HighlightLink = styled('a', {
  fontWeight: '$semibold',
  color: '$accent',
  textDecoration: 'none',
  transition: 'color 0.2s ease',

  '&:hover': {
    color: '$accentHover',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  },
});

const SectionTitle = styled('h2', {
  fontSize: '$7',
  fontWeight: '$bold',
  color: '$foreground',
  marginBottom: '$3',
  display: 'flex',
  alignItems: 'center',
  gap: '$3',

  '@bp2': {
    fontSize: '$8',
  },

  '& svg': {
    width: '24px',
    height: '24px',
    color: '$accent',
  },
});

const SectionDescription = styled('p', {
  fontSize: '$4',
  color: '$foregroundMuted',
  marginBottom: '$8',
  maxWidth: '600px',
});

const ResearchGrid = styled('div', {
  display: 'grid',
  gap: '$6',
  gridTemplateColumns: '1fr',

  '@bp2': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

const PublicationsList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
});

const BlogGrid = styled('div', {
  display: 'grid',
  gap: '$6',
  gridTemplateColumns: '1fr',

  '@bp2': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

const ViewAllLink = styled('a', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '$2',
  fontSize: '$4',
  fontWeight: '$medium',
  color: '$accent',
  textDecoration: 'none',
  marginTop: '$8',
  transition: 'gap 0.2s ease',

  '&:hover': {
    gap: '$3',
  },

  '& svg': {
    width: '16px',
    height: '16px',
  },
});

const SectionHeader = styled('div', {
  marginBottom: '$8',
});

const SocialLinksWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$3',
  marginTop: '$6',
});

const SocialLink = styled('a', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '$round',
  backgroundColor: '$backgroundSubtle',
  color: '$foregroundMuted',
  transition: 'all 0.2s ease',

  '&:hover': {
    backgroundColor: '$accent',
    color: 'white',
    transform: 'translateY(-2px)',
  },

  '& svg': {
    width: '20px',
    height: '20px',
  },
});

interface HomeProps {
  posts: BlogPost[];
  featuredResearch: ResearchProject[];
  recentPublications: Publication[];
  profile: PersonProfile | null;
}

export default function Home({
  posts,
  featuredResearch,
  recentPublications,
  profile,
}: HomeProps) {
  const [selectedProject, setSelectedProject] = useState<ResearchProject | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = (project: ResearchProject) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const name = profile?.name || siteConfig.name;
  const tagline = profile?.tagline || siteConfig.description;

  return (
    <>
      <TitleAndMetaTags image="/images/hero/hero-home.jpg" />
      <NavBar />

      {/* Hero Section */}
      <HeroSection
        imageSrc="/images/hero/hero-home.jpg"
        imageAlt={name}
        title={name}
        subtitle={tagline}
        tagline={profile?.institution || 'Academic Researcher'}
        focalPoint={{ x: 50, y: 30 }}
        textAlign="left"
      />

      {/* About Section */}
      <Section padding="lg">
        <Container>
          <SectionHeader>
            <SectionTitle>
              <PersonIcon />
              About
            </SectionTitle>
            <SectionDescription>
              {profile?.institution || 'Academic researcher and educator.'}
            </SectionDescription>
          </SectionHeader>

          {profile?.bio ? (
            <BioText dangerouslySetInnerHTML={{ __html: profile.bio }} />
          ) : (
            <>
              <BioText>
                Welcome to my academic portfolio. I am a researcher dedicated to advancing
                knowledge in my field through rigorous study and collaboration.
              </BioText>
              <BioText>
                My research interests span multiple disciplines, and I am committed to
                contributing meaningful insights to the academic community.
              </BioText>
            </>
          )}

          {profile?.social && (
            <SocialLinksWrapper>
              {profile.social.linkedin && (
                <SocialLink
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </SocialLink>
              )}
              {profile.social.github && (
                <SocialLink
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </SocialLink>
              )}
              {profile.social.twitter && (
                <SocialLink
                  href={`https://x.com/${profile.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </SocialLink>
              )}
              {profile.social.googleScholar && (
                <SocialLink
                  href={profile.social.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Scholar"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
                  </svg>
                </SocialLink>
              )}
            </SocialLinksWrapper>
          )}
        </Container>
      </Section>

      {/* Research Highlights Section */}
      {featuredResearch.length > 0 && (
        <Section padding="lg">
          <Container>
            <SectionHeader>
              <SectionTitle>
                <RocketIcon />
                Research Highlights
              </SectionTitle>
              <SectionDescription>
                Current research projects and areas of focus.
              </SectionDescription>
            </SectionHeader>

            <ResearchGrid>
              {featuredResearch.slice(0, 2).map((project, index) => (
                <ResearchCard
                  key={project.id}
                  project={project}
                  variant="compact"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleCardClick(project)}
                />
              ))}
            </ResearchGrid>

            <div style={{ textAlign: 'center' }}>
              <NextLink href="/research" passHref legacyBehavior>
                <ViewAllLink>
                  View all research
                  <ArrowRightIcon />
                </ViewAllLink>
              </NextLink>
            </div>
          </Container>
        </Section>
      )}

      {/* Recent Publications Section */}
      {recentPublications.length > 0 && (
        <Section padding="lg">
          <Container>
            <SectionHeader>
              <SectionTitle>
                <FileTextIcon />
                Recent Publications
              </SectionTitle>
              <SectionDescription>Latest academic publications and preprints.</SectionDescription>
            </SectionHeader>

            <PublicationsList>
              {recentPublications.map((publication, index) => (
                <PublicationCard
                  key={publication.id}
                  publication={publication}
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </PublicationsList>

            <div style={{ textAlign: 'center' }}>
              <NextLink href="/publications" passHref legacyBehavior>
                <ViewAllLink>
                  View all publications
                  <ArrowRightIcon />
                </ViewAllLink>
              </NextLink>
            </div>
          </Container>
        </Section>
      )}

      {/* Blog Section */}
      {posts.length > 0 && (
        <Section padding="lg">
          <Container>
            <SectionHeader>
              <SectionTitle>
                <Pencil1Icon />
                Research Writing
              </SectionTitle>
              <SectionDescription>
                Thoughts on research, academia, and professional development.
              </SectionDescription>
            </SectionHeader>

            <BlogGrid>
              {posts.slice(0, 4).map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </BlogGrid>
            <div style={{ textAlign: 'center' }}>
              <NextLink href="/blog" passHref legacyBehavior>
                <ViewAllLink>
                  View all posts
                  <ArrowRightIcon />
                </ViewAllLink>
              </NextLink>
            </div>
          </Container>
        </Section>
      )}

      <ResearchDetailModal
        project={selectedProject}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  const allResearch = await getResearchProjects();
  const allPublications = await getPublications();
  const profile = await getPersonProfile();

  // Get featured/ongoing research
  const featuredResearch = allResearch
    .filter((p) => p.featured || p.status === 'ongoing')
    .slice(0, 2);

  // Get recent publications (sorted by year)
  const recentPublications = [...allPublications].sort((a, b) => b.year - a.year).slice(0, 3);

  return {
    props: {
      posts,
      featuredResearch,
      recentPublications,
      profile,
    },
  };
}
