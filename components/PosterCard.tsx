'use client';

import React from 'react';
import { styled, keyframes } from 'stitches.config';
import type { Poster } from '@lib/types';

const fadeUp = keyframes({
  from: { opacity: 0, transform: 'translateY(8px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const CardWrapper = styled('article', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  padding: '$4',
  backgroundColor: '$backgroundElevated',
  borderRadius: '$3',
  border: '1px solid $borderSubtle',
  transition: 'all 0.2s ease',
  animation: `${fadeUp} 0.3s ease backwards`,

  '&:hover': {
    borderColor: '$border',
    boxShadow: '$sm',
  },
});

const Header = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '$3',
});

const IconWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  backgroundColor: '$backgroundSubtle',
  borderRadius: '$2',
  color: '$purple',
  flexShrink: 0,

  '& svg': {
    width: '16px',
    height: '16px',
  },
});

const Content = styled('div', {
  flex: 1,
  minWidth: 0,
});

const Title = styled('h3', {
  fontSize: '$2',
  fontWeight: '$semibold',
  color: '$foreground',
  lineHeight: '$4',
  margin: 0,

  // Truncate to 2 lines
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

const Event = styled('p', {
  fontSize: '$1',
  color: '$accent',
  fontWeight: '$medium',
  margin: '4px 0 0',
});

const Meta = styled('p', {
  fontSize: '$1',
  color: '$foregroundSubtle',
  margin: '2px 0 0',
});

const CoAuthors = styled('p', {
  fontSize: '$1',
  color: '$foregroundMuted',
  margin: '4px 0 0',
});

const Link = styled('a', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '$1',
  fontWeight: '$medium',
  color: '$accent',
  textDecoration: 'none',
  marginTop: '$2',
  transition: 'color 0.15s ease',

  '&:hover': {
    color: '$accentHover',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },

  '& svg': {
    width: '10px',
    height: '10px',
  },
});

interface PosterCardProps {
  poster: Poster;
  style?: React.CSSProperties;
}

export function PosterCard({ poster, style }: PosterCardProps) {
  return (
    <CardWrapper style={style}>
      <Header>
        <IconWrapper>
          <PosterIcon />
        </IconWrapper>
        <Content>
          <Title>{poster.title}</Title>
          <Event>{poster.event}</Event>
          <Meta>
            {poster.location} &middot; {poster.date}
          </Meta>
          {poster.coAuthors && <CoAuthors>with {poster.coAuthors}</CoAuthors>}
          {poster.url && (
            <Link href={poster.url} target="_blank" rel="noopener noreferrer">
              View
              <ExternalLinkIcon />
            </Link>
          )}
        </Content>
      </Header>
    </CardWrapper>
  );
}

const PosterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

export default PosterCard;
