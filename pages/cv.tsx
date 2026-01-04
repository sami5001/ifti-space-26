import React from 'react';
import TitleAndMetaTags from '@components/TitleAndMetaTags';
import { NavBar, Container } from '@components/ui';
import { HeroSection } from '@components/HeroSection';
import { styled } from 'stitches.config';
import { siteConfig } from '@config/site';
import { getPageBySlug } from '@lib/pages';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { components as MdxComponents } from '@components/MdxComponents';
import { ExternalLinkIcon } from '@radix-ui/react-icons';

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

  '& h4': {
    fontSize: '$4',
    fontWeight: '$medium',
    color: '$foreground',
    marginTop: '$6',
    marginBottom: '$2',
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

const ActionButtons = styled('div', {
  display: 'flex',
  gap: '$4',
  flexWrap: 'wrap',
  marginBottom: '$8',
  maxWidth: '720px',
  margin: '0 auto $8',
});

const ActionButton = styled('a', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '$2',
  padding: '$3 $5',
  fontSize: '$3',
  fontWeight: '$medium',
  color: '$foreground',
  backgroundColor: '$backgroundSubtle',
  border: '1px solid $borderSubtle',
  borderRadius: '$3',
  textDecoration: 'none',
  transition: 'all 150ms ease',

  '&:hover': {
    backgroundColor: '$backgroundElevated',
    borderColor: '$accent',
  },

  '& svg': {
    width: '16px',
    height: '16px',
  },
});

interface CVPageProps {
  mdxSource: MDXRemoteSerializeResult;
  title: string;
}

export default function CVPage({ mdxSource, title }: CVPageProps) {
  return (
    <PageWrapper>
      <TitleAndMetaTags
        title={`CV - ${siteConfig.name}`}
        description="Curriculum Vitae of Hassan Saad Ifti - Education, research experience, publications, and professional background."
        image="/images/hero/hero-cv.jpg"
      />
      <NavBar />

      <HeroSection
        imageSrc="/images/hero/hero-cv.jpg"
        imageAlt="Hassan Saad Ifti - Curriculum Vitae"
        title="Curriculum Vitae"
        subtitle="Education, research experience, and academic achievements in aerospace engineering and hypersonics research."
        tagline="Academic Profile"
        imagePosition="center"
        textAlign="left"
      />

      <ContentContainer>
        <ActionButtons>
          <ActionButton href="/publications">
            <ExternalLinkIcon />
            View Publications
          </ActionButton>
          <ActionButton href="/research">
            <ExternalLinkIcon />
            View Research
          </ActionButton>
        </ActionButtons>

        <ContentWrapper>
          <MDXRemote {...mdxSource} components={MdxComponents} />
        </ContentWrapper>
      </ContentContainer>
    </PageWrapper>
  );
}

export async function getStaticProps() {
  const page = getPageBySlug('cv');

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
