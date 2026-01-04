import React from 'react';
import NextLink from 'next/link';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import TitleAndMetaTags from '@components/TitleAndMetaTags';
import { NavBar, Container } from '@components/ui';
import { styled } from 'stitches.config';

const PageWrapper = styled('div', {
  minHeight: '100vh',
  backgroundColor: '$background',
});

const ContentContainer = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 200px)',
  textAlign: 'center',
  paddingTop: '$10',
  paddingBottom: '$12',
});

const ErrorCode = styled('h1', {
  fontSize: '120px',
  fontWeight: '$bold',
  color: '$foreground',
  letterSpacing: '$tight',
  lineHeight: 1,
  margin: 0,
  opacity: 0.1,

  '@bp2': {
    fontSize: '180px',
  },
});

const ErrorTitle = styled('h2', {
  fontSize: '$7',
  fontWeight: '$bold',
  color: '$foreground',
  marginTop: '-$8',
  marginBottom: '$4',

  '@bp2': {
    fontSize: '$8',
    marginTop: '-$10',
  },
});

const ErrorDescription = styled('p', {
  fontSize: '$4',
  color: '$foregroundMuted',
  lineHeight: '$5',
  maxWidth: '400px',
  margin: '0 auto $6',
});

const BackLink = styled('a', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '$2',
  fontSize: '$3',
  fontWeight: '$medium',
  color: '$accent',
  textDecoration: 'none',
  padding: '$3 $5',
  borderRadius: '$3',
  backgroundColor: '$backgroundSubtle',
  transition: 'all 0.15s ease',

  '&:hover': {
    backgroundColor: '$accent',
    color: '$white',
  },

  '& svg': {
    width: '16px',
    height: '16px',
  },
});

export default function Custom404() {
  return (
    <PageWrapper>
      <TitleAndMetaTags title="404 - Page Not Found" />
      <NavBar />

      <ContentContainer>
        <ErrorCode>404</ErrorCode>
        <ErrorTitle>Page Not Found</ErrorTitle>
        <ErrorDescription>
          The page you're looking for doesn't exist or has been moved.
        </ErrorDescription>
        <NextLink href="/" passHref legacyBehavior>
          <BackLink>
            <ArrowLeftIcon />
            Back to Home
          </BackLink>
        </NextLink>
      </ContentContainer>
    </PageWrapper>
  );
}
