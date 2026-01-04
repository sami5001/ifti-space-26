'use client';

import React from 'react';
import NextLink from 'next/link';
import { styled } from 'stitches.config';
import { ThemeToggle } from './ThemeToggle';
import { Container } from './Container';
import { Dropdown } from './Dropdown';
import { MobileMenu } from './MobileMenu';
import { siteConfig } from '@config/site';

const NavWrapper = styled('nav', {
  position: 'sticky',
  top: 0,
  zIndex: 100,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'saturate(180%) blur(20px)',
  borderBottom: '1px solid $borderSubtle',
  transition: 'background-color 0.3s ease, border-color 0.3s ease',

  '.dark &': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});

const NavContent = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '52px',

  '@bp2': {
    height: '56px',
  },
});

const NavBrand = styled('a', {
  fontSize: '$4',
  fontWeight: '$semibold',
  color: '$foreground',
  textDecoration: 'none',
  transition: 'color 0.2s ease',

  '&:hover': {
    color: '$accent',
  },
});

const NavLinks = styled('div', {
  display: 'none',
  alignItems: 'center',
  gap: '$1',
  marginLeft: 'auto',

  '@bp2': {
    display: 'flex',
  },
});

const NavLink = styled('a', {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '$2 $3',
  fontSize: '$3',
  fontWeight: '$medium',
  color: '$foregroundMuted',
  textDecoration: 'none',
  borderRadius: '$2',
  transition: 'all 0.15s ease',

  '&:hover': {
    color: '$foreground',
  },

  '&[data-active="true"]': {
    color: '$foreground',
  },
});

const NavActions = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$1',
});

interface NavBarProps {
  showBrand?: boolean;
}

const researchDropdownItems = [
  { label: 'All Research', href: '/research' },
  { label: 'Ongoing Projects', href: '/research#ongoing' },
  { label: 'Completed Projects', href: '/research#completed' },
];

const publicationsDropdownItems = [
  { label: 'All Publications', href: '/publications' },
  { label: 'Papers', href: '/publications#papers' },
  { label: 'Talks & Presentations', href: '/publications#talks' },
  { label: 'Conference Posters', href: '/publications#posters' },
];

export function NavBar({ showBrand = true }: NavBarProps) {
  return (
    <NavWrapper>
      <Container>
        <NavContent>
          {showBrand ? (
            <NextLink href="/" passHref legacyBehavior>
              <NavBrand>{siteConfig.name}</NavBrand>
            </NextLink>
          ) : (
            <div />
          )}

          <NavLinks>
            <NextLink href="/" passHref legacyBehavior>
              <NavLink>Home</NavLink>
            </NextLink>
            <Dropdown trigger="Research" href="/research" items={researchDropdownItems} />
            <Dropdown
              trigger="Publications"
              href="/publications"
              items={publicationsDropdownItems}
            />
            <NextLink href="/blog" passHref legacyBehavior>
              <NavLink>Writing</NavLink>
            </NextLink>
            <NextLink href="/contact" passHref legacyBehavior>
              <NavLink>Contact</NavLink>
            </NextLink>
          </NavLinks>

          <NavActions>
            <ThemeToggle />
            <MobileMenu />
          </NavActions>
        </NavContent>
      </Container>
    </NavWrapper>
  );
}
