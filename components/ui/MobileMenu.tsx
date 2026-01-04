'use client';

import React from 'react';
import NextLink from 'next/link';
import { styled, keyframes } from 'stitches.config';
import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog';

const slideIn = keyframes({
  from: { transform: 'translateX(100%)' },
  to: { transform: 'translateX(0)' },
});

const slideOut = keyframes({
  from: { transform: 'translateX(0)' },
  to: { transform: 'translateX(100%)' },
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const MenuButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '$2',
  cursor: 'pointer',
  color: '$foreground',
  transition: 'all 0.15s ease',

  '&:hover': {
    backgroundColor: '$backgroundSubtle',
  },

  '&:focus-visible': {
    outline: '2px solid $accent',
    outlineOffset: '2px',
  },

  '& svg': {
    width: '20px',
    height: '20px',
  },

  '@bp2': {
    display: 'none',
  },
});

const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(4px)',
  zIndex: 998,

  '&[data-state="open"]': {
    animation: `${fadeIn} 0.2s ease`,
  },

  '&[data-state="closed"]': {
    animation: `${fadeOut} 0.2s ease`,
  },
});

const Content = styled(Dialog.Content, {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  maxWidth: '320px',
  backgroundColor: '$background',
  boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.1)',
  zIndex: 999,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',

  '&[data-state="open"]': {
    animation: `${slideIn} 0.3s ease`,
  },

  '&[data-state="closed"]': {
    animation: `${slideOut} 0.2s ease`,
  },

  '.dark &': {
    boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.4)',
  },
});

const Header = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$4 $5',
  borderBottom: '1px solid $borderSubtle',
});

const Title = styled(Dialog.Title, {
  fontSize: '$5',
  fontWeight: '$semibold',
  color: '$foreground',
  margin: 0,
});

const CloseButton = styled(Dialog.Close, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '$2',
  cursor: 'pointer',
  color: '$foregroundMuted',
  transition: 'all 0.15s ease',

  '&:hover': {
    backgroundColor: '$backgroundSubtle',
    color: '$foreground',
  },

  '& svg': {
    width: '16px',
    height: '16px',
  },
});

const NavSection = styled('div', {
  padding: '$4 $5',
  borderBottom: '1px solid $borderSubtle',

  '&:last-child': {
    borderBottom: 'none',
  },
});

const NavSectionTitle = styled('h3', {
  fontSize: '$1',
  fontWeight: '$semibold',
  color: '$foregroundSubtle',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '$3',
});

const NavLink = styled('a', {
  display: 'block',
  padding: '$3 0',
  fontSize: '$4',
  fontWeight: '$medium',
  color: '$foreground',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
  borderBottom: '1px solid $borderSubtle',

  '&:last-child': {
    borderBottom: 'none',
  },

  '&:hover': {
    color: '$accent',
  },
});

const SubNavLink = styled('a', {
  display: 'block',
  padding: '$2 0 $2 $4',
  fontSize: '$3',
  color: '$foregroundMuted',
  textDecoration: 'none',
  transition: 'color 0.15s ease',

  '&:hover': {
    color: '$accent',
  },
});

interface MobileMenuProps {
  className?: string;
}

export function MobileMenu({ className }: MobileMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Close menu on route change (handled by clicking links)
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <MenuButton className={className} aria-label="Open navigation menu">
          <HamburgerMenuIcon />
        </MenuButton>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Overlay />
        <Content>
          <Header>
            <Title>Menu</Title>
            <CloseButton aria-label="Close navigation menu">
              <Cross1Icon />
            </CloseButton>
          </Header>

          <NavSection>
            <NextLink href="/" passHref legacyBehavior>
              <NavLink onClick={handleLinkClick}>Home</NavLink>
            </NextLink>
          </NavSection>

          <NavSection>
            <NavSectionTitle>Research</NavSectionTitle>
            <NextLink href="/research" passHref legacyBehavior>
              <NavLink onClick={handleLinkClick}>All Research</NavLink>
            </NextLink>
            <NextLink href="/research#ongoing" passHref legacyBehavior>
              <SubNavLink onClick={handleLinkClick}>Ongoing Projects</SubNavLink>
            </NextLink>
            <NextLink href="/research#completed" passHref legacyBehavior>
              <SubNavLink onClick={handleLinkClick}>Completed Projects</SubNavLink>
            </NextLink>
          </NavSection>

          <NavSection>
            <NavSectionTitle>Publications</NavSectionTitle>
            <NextLink href="/publications" passHref legacyBehavior>
              <NavLink onClick={handleLinkClick}>All Publications</NavLink>
            </NextLink>
            <NextLink href="/publications#papers" passHref legacyBehavior>
              <SubNavLink onClick={handleLinkClick}>Papers</SubNavLink>
            </NextLink>
            <NextLink href="/publications#talks" passHref legacyBehavior>
              <SubNavLink onClick={handleLinkClick}>Talks</SubNavLink>
            </NextLink>
            <NextLink href="/publications#posters" passHref legacyBehavior>
              <SubNavLink onClick={handleLinkClick}>Posters</SubNavLink>
            </NextLink>
          </NavSection>

          <NavSection>
            <NextLink href="/blog" passHref legacyBehavior>
              <NavLink onClick={handleLinkClick}>Writing</NavLink>
            </NextLink>
            <NextLink href="/contact" passHref legacyBehavior>
              <NavLink onClick={handleLinkClick}>Contact</NavLink>
            </NextLink>
            <NextLink href="/imprint" passHref legacyBehavior>
              <NavLink onClick={handleLinkClick}>Imprint</NavLink>
            </NextLink>
          </NavSection>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default MobileMenu;
