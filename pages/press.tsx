import React from 'react';
import TitleAndMetaTags from '@components/TitleAndMetaTags';
import { NavBar, Container } from '@components/ui';
import { HeroSection } from '@components/HeroSection';
import { styled } from 'stitches.config';
import { siteConfig } from '@config/site';
import { heroFocalPoints } from '@config/heroFocalPoints';
import { getPageBySlug } from '@lib/pages';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { components as MdxComponents } from '@components/MdxComponents';

const PageWrapper = styled('div', {
  minHeight: '100vh',
  backgroundColor: '$background',
});

const ContentContainer = styled(Container, {
  paddingTop: '$8',
  paddingBottom: '$12',

  '@bp2': {
    paddingTop: '$10',
  },
});

const ContentWrapper = styled('article', {
  maxWidth: '720px',
  margin: '0 auto',

  '& h2': {
    fontSize: '$7',
    fontWeight: '$bold',
    color: '$foreground',
    marginTop: '$10',
    marginBottom: '$4',
    paddingBottom: '$3',
    borderBottom: '1px solid $borderSubtle',
  },

  '& h3': {
    fontSize: '$5',
    fontWeight: '$semibold',
    color: '$foreground',
    marginTop: '$8',
    marginBottom: '$3',
  },

  '& p': {
    fontSize: '$4',
    color: '$foregroundMuted',
    lineHeight: '$5',
    marginBottom: '$4',
  },

  '& ul, & ol': {
    paddingLeft: '$6',
    marginBottom: '$4',

    '& li': {
      fontSize: '$4',
      color: '$foregroundMuted',
      lineHeight: '$5',
      marginBottom: '$2',
    },
  },

  '& strong': {
    color: '$foreground',
    fontWeight: '$semibold',
  },

  '& a': {
    color: '$accent',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

const EmptyState = styled('div', {
  textAlign: 'center',
  padding: '$12 $6',
  backgroundColor: '$backgroundSubtle',
  borderRadius: '$4',
  border: '1px dashed $borderSubtle',
  maxWidth: '720px',
  margin: '0 auto',
});

const EmptyStateTitle = styled('h3', {
  fontSize: '$5',
  fontWeight: '$semibold',
  color: '$foreground',
  margin: '0 0 $3',
});

const EmptyStateText = styled('p', {
  fontSize: '$4',
  color: '$foregroundMuted',
  margin: 0,
});

interface PressPageProps {
  mdxSource: MDXRemoteSerializeResult | null;
  title: string;
}

export default function PressPage({ mdxSource, title }: PressPageProps) {
  return (
    <PageWrapper>
      <TitleAndMetaTags
        title={`Press - ${siteConfig.name}`}
        description="Media coverage, news mentions, and press features about Hassan Saad Ifti's research in hypersonics and aerospace engineering."
        image="/images/hero/hero-press.jpg"
      />
      <NavBar />

      <HeroSection
        imageSrc="/images/hero/hero-press.jpg"
        imageAlt="Hassan Saad Ifti - Press & Media"
        title="Press & Media"
        subtitle="News coverage, media appearances, and featured articles about research in hypersonic vehicle technology."
        tagline="In the News"
        focalPoint={heroFocalPoints['/images/hero/hero-press.jpg']}
        textAlign="left"
      />

      <ContentContainer>
        {mdxSource ? (
          <ContentWrapper>
            <MDXRemote {...mdxSource} components={MdxComponents} />
          </ContentWrapper>
        ) : (
          <EmptyState>
            <EmptyStateTitle>Press Coverage Coming Soon</EmptyStateTitle>
            <EmptyStateText>
              Media mentions and press features will be added here as they become available.
            </EmptyStateText>
          </EmptyState>
        )}
      </ContentContainer>
    </PageWrapper>
  );
}

export async function getStaticProps() {
  const page = getPageBySlug('press');

  if (!page) {
    return {
      props: {
        mdxSource: null,
        title: 'Press',
      },
    };
  }

  const mdxSource = await serialize(page.content);

  return {
    props: {
      mdxSource,
      title: page.title,
    },
  };
}
