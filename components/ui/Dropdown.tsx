'use client';

import React, { useState, useRef, useEffect } from 'react';
import NextLink from 'next/link';
import { styled, keyframes } from 'stitches.config';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(-8px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const DropdownRoot = styled('div', {
  position: 'relative',
  display: 'inline-flex',
});

const TriggerWrapper = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '$1',
  padding: '$2 $3',
  borderRadius: '$2',
  transition: 'all 0.15s ease',

  variants: {
    open: {
      true: {
        '& > a, & > span': {
          color: '$foreground',
        },
      },
    },
  },
});

const TriggerLink = styled('a', {
  fontSize: '$3',
  fontWeight: '$medium',
  color: '$foregroundMuted',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
  cursor: 'pointer',

  '&:hover': {
    color: '$foreground',
  },

  '&:focus-visible': {
    outline: '2px solid $accent',
    outlineOffset: '2px',
  },
});

const TriggerText = styled('span', {
  fontSize: '$3',
  fontWeight: '$medium',
  color: '$foregroundMuted',
  transition: 'color 0.15s ease',
});

const ChevronButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '2px',
  borderRadius: '$1',
  color: '$foregroundMuted',
  transition: 'all 0.15s ease',

  '&:hover': {
    color: '$foreground',
    backgroundColor: '$backgroundSubtle',
  },

  '&:focus-visible': {
    outline: '2px solid $accent',
    outlineOffset: '2px',
  },
});

const ChevronWrapper = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '12px',
  height: '12px',
  transition: 'transform 0.2s ease',

  '& svg': {
    width: '100%',
    height: '100%',
  },

  variants: {
    open: {
      true: {
        transform: 'rotate(180deg)',
      },
    },
  },
});

const DropdownContent = styled('div', {
  position: 'absolute',
  top: 'calc(100% + 8px)',
  left: '50%',
  transform: 'translateX(-50%)',
  minWidth: '200px',
  backgroundColor: '$backgroundElevated',
  borderRadius: '$3',
  border: '1px solid $borderSubtle',
  boxShadow: '$lg',
  padding: '$2',
  zIndex: 200,
  animation: `${fadeIn} 0.15s ease`,

  // Arrow
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-6px',
    left: '50%',
    transform: 'translateX(-50%) rotate(45deg)',
    width: '10px',
    height: '10px',
    backgroundColor: '$backgroundElevated',
    border: '1px solid $borderSubtle',
    borderBottom: 'none',
    borderRight: 'none',
  },

  variants: {
    align: {
      left: {
        left: 0,
        transform: 'translateX(0)',
        '&::before': {
          left: '20px',
        },
      },
      center: {},
      right: {
        left: 'auto',
        right: 0,
        transform: 'translateX(0)',
        '&::before': {
          left: 'auto',
          right: '20px',
        },
      },
    },
  },

  defaultVariants: {
    align: 'center',
  },
});

const DropdownItem = styled('a', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
  padding: '$2 $3',
  fontSize: '$2',
  color: '$foregroundMuted',
  textDecoration: 'none',
  borderRadius: '$2',
  transition: 'all 0.15s ease',
  cursor: 'pointer',
  position: 'relative',
  zIndex: 1,

  '&:hover': {
    color: '$foreground',
    backgroundColor: '$backgroundSubtle',
  },

  '&:focus-visible': {
    outline: '2px solid $accent',
    outlineOffset: '-2px',
  },
});

const DropdownDescription = styled('span', {
  display: 'block',
  fontSize: '$1',
  color: '$foregroundSubtle',
  marginTop: '2px',
});

const DropdownDivider = styled('div', {
  height: '1px',
  backgroundColor: '$borderSubtle',
  margin: '$2 $1',
});

interface DropdownItemType {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  trigger: string;
  href?: string;
  items: DropdownItemType[];
  align?: 'left' | 'center' | 'right';
}

export function Dropdown({ trigger, href, items, align = 'center' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle hover with delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    } else if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <DropdownRoot ref={dropdownRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <TriggerWrapper open={isOpen}>
        {href ? (
          <NextLink href={href} passHref legacyBehavior>
            <TriggerLink>{trigger}</TriggerLink>
          </NextLink>
        ) : (
          <TriggerText>{trigger}</TriggerText>
        )}
        <ChevronButton
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label={`Toggle ${trigger} menu`}
        >
          <ChevronWrapper open={isOpen}>
            <ChevronDownIcon />
          </ChevronWrapper>
        </ChevronButton>
      </TriggerWrapper>

      {isOpen && (
        <DropdownContent align={align} role="menu">
          {items.map((item) => (
            <NextLink key={item.href} href={item.href} passHref legacyBehavior>
              <DropdownItem role="menuitem" onClick={() => setIsOpen(false)}>
                {item.icon}
                <div>
                  {item.label}
                  {item.description && <DropdownDescription>{item.description}</DropdownDescription>}
                </div>
              </DropdownItem>
            </NextLink>
          ))}
        </DropdownContent>
      )}
    </DropdownRoot>
  );
}

export { DropdownDivider };
export default Dropdown;
