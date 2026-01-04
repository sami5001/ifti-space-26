'use client';

import React from 'react';
import { styled, keyframes } from 'stitches.config';
import type { Publication } from '@lib/types';

const fadeUp = keyframes({
  from: { opacity: 0, transform: 'translateY(8px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const CardWrapper = styled('article', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  padding: '$5',
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
  justifyContent: 'space-between',
  gap: '$3',
});

const TypeBadge = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '3px 8px',
  fontSize: '11px',
  fontWeight: '$semibold',
  borderRadius: '$2',
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
  flexShrink: 0,

  variants: {
    type: {
      journal: {
        color: '$blue',
        backgroundColor: 'rgba(3, 136, 252, 0.1)',
        '.dark &': {
          backgroundColor: 'rgba(3, 136, 252, 0.2)',
        },
      },
      preprint: {
        color: '$yellow',
        backgroundColor: 'rgba(255, 221, 0, 0.15)',
        '.dark &': {
          backgroundColor: 'rgba(255, 221, 0, 0.2)',
        },
      },
      thesis: {
        color: '$purple',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        '.dark &': {
          backgroundColor: 'rgba(139, 92, 246, 0.2)',
        },
      },
      book: {
        color: '$green',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        '.dark &': {
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
        },
      },
      report: {
        color: '$foregroundMuted',
        backgroundColor: '$backgroundSubtle',
      },
      conference: {
        color: '$orange',
        backgroundColor: 'rgba(255, 135, 31, 0.1)',
        '.dark &': {
          backgroundColor: 'rgba(255, 135, 31, 0.2)',
        },
      },
    },
  },
});

const Title = styled('h3', {
  fontSize: '$4',
  fontWeight: '$semibold',
  color: '$foreground',
  lineHeight: '$4',
  margin: 0,
  flex: 1,
});

const Authors = styled('p', {
  fontSize: '$2',
  color: '$foregroundMuted',
  margin: 0,
  lineHeight: '$5',
});

const Venue = styled('p', {
  fontSize: '$2',
  color: '$foregroundSubtle',
  margin: 0,
  fontStyle: 'italic',
});

const Year = styled('span', {
  fontWeight: '$semibold',
  color: '$foreground',
  fontStyle: 'normal',
});

const LinkWrapper = styled('div', {
  display: 'flex',
  gap: '$3',
  marginTop: '$2',
});

const Link = styled('a', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '$2',
  fontWeight: '$medium',
  color: '$accent',
  textDecoration: 'none',
  transition: 'color 0.15s ease',

  '&:hover': {
    color: '$accentHover',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },

  '& svg': {
    width: '12px',
    height: '12px',
  },
});

const StatusLabel = styled('span', {
  fontSize: '$1',
  color: '$foregroundSubtle',
  fontStyle: 'italic',
});

interface PublicationCardProps {
  publication: Publication;
  style?: React.CSSProperties;
}

export function PublicationCard({ publication, style }: PublicationCardProps) {
  const typeLabels: Record<Publication['type'], string> = {
    journal: 'Journal',
    preprint: 'Preprint',
    thesis: 'Thesis',
    book: 'Book',
    report: 'Report',
    conference: 'Conference',
  };

  return (
    <CardWrapper style={style}>
      <Header>
        <Title>{publication.title}</Title>
        <TypeBadge type={publication.type}>{typeLabels[publication.type]}</TypeBadge>
      </Header>

      <Authors>{publication.authors}</Authors>

      <Venue>
        {publication.venue}, <Year>{publication.year}</Year>
        {publication.status === 'in-prep' && <StatusLabel> (In preparation)</StatusLabel>}
        {publication.status === 'preprint' && <StatusLabel> (Preprint)</StatusLabel>}
      </Venue>

      {(publication.doi || publication.url) && (
        <LinkWrapper>
          {publication.doi && (
            <Link
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              DOI
              <ExternalLinkIcon />
            </Link>
          )}
          {publication.url && !publication.doi && (
            <Link href={publication.url} target="_blank" rel="noopener noreferrer">
              View
              <ExternalLinkIcon />
            </Link>
          )}
        </LinkWrapper>
      )}
    </CardWrapper>
  );
}

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

export default PublicationCard;
