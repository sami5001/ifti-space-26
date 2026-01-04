'use client';

import React from 'react';
import { styled, keyframes } from 'stitches.config';
import type { Talk } from '@lib/types';

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
  width: '36px',
  height: '36px',
  backgroundColor: '$backgroundSubtle',
  borderRadius: '$2',
  color: '$accent',
  flexShrink: 0,

  '& svg': {
    width: '18px',
    height: '18px',
  },
});

const Content = styled('div', {
  flex: 1,
  minWidth: 0,
});

const Title = styled('h3', {
  fontSize: '$3',
  fontWeight: '$semibold',
  color: '$foreground',
  lineHeight: '$4',
  margin: 0,
});

const Event = styled('p', {
  fontSize: '$2',
  color: '$accent',
  fontWeight: '$medium',
  margin: '4px 0 0',
});

const Meta = styled('p', {
  fontSize: '$2',
  color: '$foregroundMuted',
  margin: '4px 0 0',
});

const Link = styled('a', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '$2',
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
    width: '12px',
    height: '12px',
  },
});

interface TalkCardProps {
  talk: Talk;
  style?: React.CSSProperties;
}

export function TalkCard({ talk, style }: TalkCardProps) {
  return (
    <CardWrapper style={style}>
      <Header>
        <IconWrapper>
          <MicrophoneIcon />
        </IconWrapper>
        <Content>
          <Title>{talk.title}</Title>
          <Event>{talk.event}</Event>
          <Meta>
            {talk.location} &middot; {talk.date}
          </Meta>
          {talk.url && (
            <Link href={talk.url} target="_blank" rel="noopener noreferrer">
              View details
              <ExternalLinkIcon />
            </Link>
          )}
        </Content>
      </Header>
    </CardWrapper>
  );
}

const MicrophoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
    <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

export default TalkCard;
