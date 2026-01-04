'use client';

import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';

const StyledLink = styled('a', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
  padding: '$2 $3',
  fontSize: '$2',
  color: '$foregroundMuted',
  textDecoration: 'none',
  borderRadius: '$2',
  transition: 'all 0.15s ease',
  lineHeight: '$4',
  position: 'relative',

  '&:hover': {
    color: '$foreground',
    backgroundColor: '$backgroundSubtle',
  },

  '&:focus-visible': {
    outline: '2px solid $accent',
    outlineOffset: '-2px',
  },

  variants: {
    active: {
      true: {
        color: '$accent',
        backgroundColor: 'rgba(0, 113, 227, 0.08)',
        fontWeight: '$medium',

        '.dark &': {
          backgroundColor: 'rgba(41, 151, 255, 0.12)',
        },

        // Active indicator line
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '3px',
          height: '16px',
          backgroundColor: '$accent',
          borderRadius: '$round',
        },
      },
    },
    indent: {
      1: {
        paddingLeft: '$5',
      },
      2: {
        paddingLeft: '$7',
      },
    },
  },

  defaultVariants: {
    active: false,
  },
});

const IconWrapper = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '16px',
  color: 'inherit',
  opacity: 0.7,

  '& svg': {
    width: '100%',
    height: '100%',
  },
});

const Badge = styled('span', {
  fontSize: '$1',
  fontWeight: '$medium',
  color: '$foregroundSubtle',
  backgroundColor: '$backgroundSubtle',
  padding: '2px 6px',
  borderRadius: '$round',
  marginLeft: 'auto',
});

interface SidebarLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string | number;
  indent?: 1 | 2;
  className?: string;
  onClick?: () => void;
}

export function SidebarLink({
  href,
  children,
  icon,
  badge,
  indent,
  className,
  onClick,
}: SidebarLinkProps) {
  const router = useRouter();

  // Check if link is active (exact match or hash match)
  const isActive =
    router.asPath === href ||
    (href.includes('#') &&
      router.asPath.split('#')[0] === href.split('#')[0] &&
      router.asPath.includes(href.split('#')[1]));

  return (
    <NextLink href={href} passHref legacyBehavior>
      <StyledLink active={isActive} indent={indent} className={className} onClick={onClick}>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <span>{children}</span>
        {badge !== undefined && <Badge>{badge}</Badge>}
      </StyledLink>
    </NextLink>
  );
}

export default SidebarLink;
