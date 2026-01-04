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

interface BioPageProps {
  mdxSource: MDXRemoteSerializeResult;
  title: string;
}

export default function BioPage({ mdxSource, title }: BioPageProps) {
  return (
    <PageWrapper>
      <TitleAndMetaTags
        title={`Bio - ${siteConfig.name}`}
        description="Biography of Hassan Saad Ifti - DPhil candidate at the University of Oxford researching hypersonic vehicle cooling systems."
        image="/images/hero/hero-bio.jpg"
      />
      <NavBar />

      <HeroSection
        imageSrc="/images/hero/hero-bio.jpg"
        imageAlt="Hassan Saad Ifti - Biography"
        title="Biography"
        subtitle="DPhil candidate at the University of Oxford, specializing in hypersonic vehicle cooling systems and high-speed aerothermodynamics."
        tagline="About Me"
        focalPoint={heroFocalPoints['/images/hero/hero-bio.jpg']}
        textAlign="left"
      />

      <ContentContainer>
        <ContentWrapper>
          <MDXRemote {...mdxSource} components={MdxComponents} />
        </ContentWrapper>
      </ContentContainer>
    </PageWrapper>
  );
}

export async function getStaticProps() {
  const page = getPageBySlug('bio');

  if (!page) {
    return {
      notFound: true,
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
