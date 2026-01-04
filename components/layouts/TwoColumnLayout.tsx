'use client';

import React from 'react';
import { styled, keyframes } from 'stitches.config';

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const LayoutWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'calc(100vh - 56px)',
  width: '100%',

  '@bp2': {
    flexDirection: 'row',
    gap: '$8',
  },

  '@bp3': {
    gap: '$10',
  },
});

const SidebarWrapper = styled('aside', {
  display: 'none',

  '@bp2': {
    display: 'block',
    width: '240px',
    flexShrink: 0,
    position: 'sticky',
    top: '72px',
    height: 'fit-content',
    maxHeight: 'calc(100vh - 96px)',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingRight: '$2',
    paddingBottom: '$8',
    animation: `${fadeIn} 0.3s ease`,

    // Custom scrollbar styling
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '$borderSubtle',
      borderRadius: '$round',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '$border',
    },
  },

  '@bp3': {
    width: '260px',
  },

  '@bp4': {
    width: '280px',
  },
});

const MainContent = styled('main', {
  flex: 1,
  minWidth: 0,
  paddingBottom: '$12',
  animation: `${fadeIn} 0.4s ease`,

  '@bp2': {
    paddingTop: '$2',
  },
});

interface TwoColumnLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function TwoColumnLayout({ sidebar, children, className }: TwoColumnLayoutProps) {
  return (
    <LayoutWrapper className={className}>
      <SidebarWrapper>{sidebar}</SidebarWrapper>
      <MainContent>{children}</MainContent>
    </LayoutWrapper>
  );
}

export default TwoColumnLayout;
