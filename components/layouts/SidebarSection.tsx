'use client';

import React, { useState, useRef, useEffect } from 'react';
import { styled } from 'stitches.config';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const SectionWrapper = styled('div', {
  marginBottom: '$1',
});

const SectionHeader = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '$2 $3',
  fontSize: '$2',
  fontWeight: '$semibold',
  color: '$foreground',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '$2',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  textAlign: 'left',

  '&:hover': {
    backgroundColor: '$backgroundSubtle',
  },

  '&:focus-visible': {
    outline: '2px solid $accent',
    outlineOffset: '-2px',
  },
});

const ChevronWrapper = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '16px',
  color: '$foregroundSubtle',
  transition: 'transform 0.2s ease',

  variants: {
    open: {
      true: {
        transform: 'rotate(180deg)',
      },
      false: {
        transform: 'rotate(0deg)',
      },
    },
  },
});

const SectionContent = styled('div', {
  overflow: 'hidden',
  transition: 'height 0.2s ease, opacity 0.2s ease',

  variants: {
    open: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0,
        height: 0,
      },
    },
  },
});

const ContentInner = styled('div', {
  paddingTop: '$1',
  paddingLeft: '$3',
});

interface SidebarSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function SidebarSection({
  title,
  defaultOpen = true,
  children,
  className,
}: SidebarSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SectionWrapper className={className}>
      <SectionHeader
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <span>{title}</span>
        <ChevronWrapper open={isOpen}>
          <ChevronDownIcon />
        </ChevronWrapper>
      </SectionHeader>
      <SectionContent
        open={isOpen}
        id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
        style={{
          height: isOpen ? contentHeight : 0,
        }}
      >
        <ContentInner ref={contentRef}>{children}</ContentInner>
      </SectionContent>
    </SectionWrapper>
  );
}

export default SidebarSection;
