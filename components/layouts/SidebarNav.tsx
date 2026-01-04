'use client';

import React from 'react';
import { styled } from 'stitches.config';

const NavWrapper = styled('nav', {
  padding: '$3 0',

  // Subtle top border to separate from navbar
  '&::before': {
    content: '""',
    display: 'block',
    height: '1px',
    background: 'linear-gradient(to right, $borderSubtle, transparent)',
    marginBottom: '$4',
  },
});

const NavTitle = styled('h2', {
  fontSize: '$1',
  fontWeight: '$semibold',
  color: '$foregroundSubtle',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '$4',
  paddingLeft: '$3',
});

const NavContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$1',
});

interface SidebarNavProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function SidebarNav({ title, children, className }: SidebarNavProps) {
  return (
    <NavWrapper className={className} role="navigation" aria-label={title || 'Page navigation'}>
      {title && <NavTitle>{title}</NavTitle>}
      <NavContent>{children}</NavContent>
    </NavWrapper>
  );
}

export default SidebarNav;
