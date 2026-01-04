'use client';

import React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
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
    height: '64px',
  },
});

const NavBrand = styled('a', {
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  transition: 'opacity 0.2s ease',

  '&:hover': {
    opacity: 0.8,
  },
});

const LogoImage = styled(Image, {
  height: '28px',
  width: 'auto',
  filter: 'invert(1)',

  '.dark &': {
    filter: 'invert(0)',
  },

  '@bp2': {
    height: '32px',
  },
});

const NavLinks = styled('div', {
  display: 'none',
  alignItems: 'center',
  gap: '2px',
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
  // Use all navigation items from config
  const navItems = siteConfig.navigation;

  return (
    <NavWrapper>
      <Container>
        <NavContent>
          {showBrand ? (
            <NextLink href="/" passHref legacyBehavior>
              <NavBrand>
                <LogoImage
                  src="/images/logos/IFTI_space-WHT-txt.svg"
                  alt={siteConfig.name}
                  width={120}
                  height={32}
                  priority
                />
              </NavBrand>
            </NextLink>
          ) : (
            <div />
          )}

          <NavLinks>
            {navItems.map((item) => {
              // Handle dropdown menus for Research and Publications
              if (item.href === '/research') {
                return (
                  <Dropdown
                    key={item.href}
                    trigger={item.label}
                    href={item.href}
                    items={researchDropdownItems}
                  />
                );
              }
              if (item.href === '/publications') {
                return (
                  <Dropdown
                    key={item.href}
                    trigger={item.label}
                    href={item.href}
                    items={publicationsDropdownItems}
                  />
                );
              }
              // Regular nav links
              return (
                <NextLink key={item.href} href={item.href} passHref legacyBehavior>
                  <NavLink>{item.label}</NavLink>
                </NextLink>
              );
            })}
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
