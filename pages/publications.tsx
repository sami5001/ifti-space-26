import React from 'react';
import TitleAndMetaTags from '@components/TitleAndMetaTags';
import { NavBar, Container } from '@components/ui';
import { TwoColumnLayout, SidebarNav, SidebarSection, SidebarLink } from '@components/layouts';
import { HeroSection } from '@components/HeroSection';
import { PublicationCard } from '@components/PublicationCard';
import { TalkCard } from '@components/TalkCard';
import { PosterCard } from '@components/PosterCard';
import { styled } from 'stitches.config';
import { getPublications, getTalks, getPosters } from '@lib/publications';
import type { Publication, Talk, Poster } from '@lib/types';
import { FileTextIcon, ChatBubbleIcon, ImageIcon, ReaderIcon } from '@radix-ui/react-icons';
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

const SectionHeader = styled('div', {
  marginBottom: '$6',
  paddingBottom: '$4',
  borderBottom: '1px solid $borderSubtle',
});

const SectionTitle = styled('h2', {
  fontSize: '$7',
  fontWeight: '$bold',
  color: '$foreground',
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '$3',

  '& svg': {
    width: '24px',
    height: '24px',
    color: '$accent',
  },
});

const SectionDescription = styled('p', {
  fontSize: '$3',
  color: '$foregroundMuted',
  marginTop: '$2',
});

const PublicationsList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
});

const TalksGrid = styled('div', {
  display: 'grid',
  gap: '$4',
  gridTemplateColumns: '1fr',

  '@bp2': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

const PostersGrid = styled('div', {
  display: 'grid',
  gap: '$4',
  gridTemplateColumns: '1fr',

  '@bp1': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  '@bp3': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
});

const SectionDivider = styled('div', {
  height: '$14',

  '@bp2': {
    height: '80px',
  },
});

const StatsBadge = styled('span', {
  fontSize: '$1',
  fontWeight: '$medium',
  color: '$foregroundSubtle',
  backgroundColor: '$backgroundSubtle',
  padding: '4px 8px',
  borderRadius: '$round',
  marginLeft: '$2',
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

interface PublicationsPageProps {
  publications: Publication[];
  talks: Talk[];
  posters: Poster[];
}

export default function PublicationsPage({ publications, talks, posters }: PublicationsPageProps) {
  const sortedPublications = [...publications].sort((a, b) => b.year - a.year);
  const sortedTalks = [...talks].sort((a, b) => b.year - a.year);
  const sortedPosters = [...posters].sort((a, b) => b.year - a.year);

  const sidebar = (
    <SidebarNav title="Navigation">
      <SidebarLink href="/publications" icon={<ReaderIcon />}>
        Overview
      </SidebarLink>

      <SidebarSection title="Publications" defaultOpen>
        <SidebarLink href="/publications#papers" indent={1} badge={publications.length}>
          Papers
        </SidebarLink>
        <SidebarLink href="/publications#talks" indent={1} badge={talks.length}>
          Talks
        </SidebarLink>
        <SidebarLink href="/publications#posters" indent={1} badge={posters.length}>
          Posters
        </SidebarLink>
      </SidebarSection>
    </SidebarNav>
  );

  return (
    <PageWrapper>
      <TitleAndMetaTags
        title={`Publications - ${siteConfig.name}`}
        description="Academic publications, conference talks, and poster presentations."
        image="/images/hero/hero-publications.jpg"
      />
      <NavBar />

      <HeroSection
        imageSrc="/images/hero/hero-publications.jpg"
        imageAlt="Academic Publications"
        title="Publications"
        subtitle="A collection of academic publications, conference presentations, and poster sessions."
        tagline="Academic Work"
        imagePosition="center"
        textAlign="left"
      />

      <ContentContainer>
        <TwoColumnLayout sidebar={sidebar}>
          {/* Papers Section */}
          <section id="papers">
            <SectionHeader>
              <SectionTitle>
                <FileTextIcon />
                Papers
                {publications.length > 0 && <StatsBadge>{publications.length}</StatsBadge>}
              </SectionTitle>
              <SectionDescription>Peer-reviewed journal articles, preprints, and theses</SectionDescription>
            </SectionHeader>

            {sortedPublications.length > 0 ? (
              <PublicationsList>
                {sortedPublications.map((publication, index) => (
                  <PublicationCard
                    key={publication.id}
                    publication={publication}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  />
                ))}
              </PublicationsList>
            ) : (
              <EmptyState>
                <EmptyStateText>No publications yet. Add publication MDX files to get started.</EmptyStateText>
              </EmptyState>
            )}
          </section>

          <SectionDivider />

          {/* Talks Section */}
          <section id="talks">
            <SectionHeader>
              <SectionTitle>
                <ChatBubbleIcon />
                Talks & Presentations
                {talks.length > 0 && <StatsBadge>{talks.length}</StatsBadge>}
              </SectionTitle>
              <SectionDescription>Conference talks, oral presentations, and workshops</SectionDescription>
            </SectionHeader>

            {sortedTalks.length > 0 ? (
              <TalksGrid>
                {sortedTalks.map((talk, index) => (
                  <TalkCard key={talk.id} talk={talk} style={{ animationDelay: `${index * 0.05}s` }} />
                ))}
              </TalksGrid>
            ) : (
              <EmptyState>
                <EmptyStateText>No talks yet. Add talk MDX files to get started.</EmptyStateText>
              </EmptyState>
            )}
          </section>

          <SectionDivider />

          {/* Posters Section */}
          <section id="posters">
            <SectionHeader>
              <SectionTitle>
                <ImageIcon />
                Conference Posters
                {posters.length > 0 && <StatsBadge>{posters.length}</StatsBadge>}
              </SectionTitle>
              <SectionDescription>Poster presentations at conferences</SectionDescription>
            </SectionHeader>

            {sortedPosters.length > 0 ? (
              <PostersGrid>
                {sortedPosters.map((poster, index) => (
                  <PosterCard key={poster.id} poster={poster} style={{ animationDelay: `${index * 0.05}s` }} />
                ))}
              </PostersGrid>
            ) : (
              <EmptyState>
                <EmptyStateText>No posters yet. Add poster MDX files to get started.</EmptyStateText>
              </EmptyState>
            )}
          </section>
        </TwoColumnLayout>
      </ContentContainer>
    </PageWrapper>
  );
}

export async function getStaticProps() {
  const publications = await getPublications();
  const talks = await getTalks();
  const posters = await getPosters();

  return {
    props: {
      publications,
      talks,
      posters,
    },
  };
}
