'use client';

import React from 'react';
import { styled, keyframes } from 'stitches.config';
import type { ResearchProject } from '@lib/types';

const fadeUp = keyframes({
  from: { opacity: 0, transform: 'translateY(12px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const CardWrapper = styled('article', {
  backgroundColor: '$backgroundElevated',
  borderRadius: '$4',
  border: '1px solid $borderSubtle',
  padding: '$6',
  transition: 'all 0.25s ease',
  animation: `${fadeUp} 0.4s ease backwards`,
  cursor: 'pointer',

  '&:hover': {
    borderColor: '$border',
    boxShadow: '$card',
    transform: 'translateY(-2px)',
  },

  variants: {
    featured: {
      true: {
        borderColor: '$accent',
        borderWidth: '2px',
        background: 'linear-gradient(135deg, rgba(0, 113, 227, 0.03) 0%, transparent 100%)',

        '.dark &': {
          background: 'linear-gradient(135deg, rgba(41, 151, 255, 0.05) 0%, transparent 100%)',
        },
      },
    },
    variant: {
      default: {},
      compact: {
        padding: '$4',
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },
});

const CardHeader = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '$3',
  marginBottom: '$3',
});

const StatusBadge = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 10px',
  fontSize: '$1',
  fontWeight: '$semibold',
  borderRadius: '$round',
  textTransform: 'uppercase',
  letterSpacing: '0.02em',
  flexShrink: 0,

  variants: {
    status: {
      ongoing: {
        color: '$success',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',

        '.dark &': {
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
        },
      },
      completed: {
        color: '$foregroundMuted',
        backgroundColor: '$backgroundSubtle',
      },
    },
  },
});

const Title = styled('h3', {
  fontSize: '$5',
  fontWeight: '$semibold',
  color: '$foreground',
  lineHeight: '$3',
  margin: 0,
  flex: 1,

  variants: {
    variant: {
      default: {},
      compact: {
        fontSize: '$4',
      },
    },
  },
});

const Institution = styled('p', {
  fontSize: '$2',
  color: '$accent',
  fontWeight: '$medium',
  margin: '0 0 $1 0',
});

const Department = styled('p', {
  fontSize: '$2',
  color: '$foregroundMuted',
  margin: '0 0 $2 0',
});

const DateRange = styled('p', {
  fontSize: '$2',
  color: '$foregroundSubtle',
  margin: 0,
});

const Description = styled('p', {
  fontSize: '$3',
  color: '$foregroundMuted',
  lineHeight: '$5',
  margin: '$4 0 0',

  // Truncate to 3 lines
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',

  variants: {
    variant: {
      default: {},
      compact: {
        WebkitLineClamp: 2,
        fontSize: '$2',
      },
    },
  },
});

const TagsWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$2',
  marginTop: '$4',
});

const Tag = styled('span', {
  fontSize: '$1',
  color: '$foregroundMuted',
  backgroundColor: '$backgroundSubtle',
  padding: '4px 8px',
  borderRadius: '$2',
});

const LinksWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$3',
  marginTop: '$4',
  paddingTop: '$4',
  borderTop: '1px solid $borderSubtle',
});

const LinkButton = styled('a', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '$1',
  fontSize: '$2',
  fontWeight: '$medium',
  color: '$accent',
  textDecoration: 'none',
  transition: 'color 0.15s ease',

  '&:hover': {
    color: '$accentHover',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  },

  '& svg': {
    width: '14px',
    height: '14px',
  },
});

const Supervisors = styled('p', {
  fontSize: '$2',
  color: '$foregroundSubtle',
  marginTop: '$3',
  fontStyle: 'italic',
});

interface ResearchCardProps {
  project: ResearchProject;
  variant?: 'default' | 'compact';
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function ResearchCard({ project, variant = 'default', style, onClick }: ResearchCardProps) {
  return (
    <CardWrapper featured={project.featured} variant={variant} style={style} onClick={onClick}>
      <CardHeader>
        <Title variant={variant}>{project.shortTitle || project.title}</Title>
        <StatusBadge status={project.status}>
          {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
        </StatusBadge>
      </CardHeader>

      {project.institution && <Institution>{project.institution}</Institution>}
      {project.department && <Department>{project.department}</Department>}
      {project.dateRange && <DateRange>{project.dateRange}</DateRange>}

      {project.description && <Description variant={variant}>{project.description}</Description>}

      {project.supervisors && variant === 'default' && (
        <Supervisors>Supervisors: {project.supervisors}</Supervisors>
      )}

      {project.tags && project.tags.length > 0 && variant === 'default' && (
        <TagsWrapper>
          {project.tags.slice(0, 4).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagsWrapper>
      )}

      {project.links && project.links.length > 0 && variant === 'default' && (
        <LinksWrapper>
          {project.links.map((link) => (
            <LinkButton
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {link.label}
              <ExternalLinkIcon />
            </LinkButton>
          ))}
        </LinksWrapper>
      )}
    </CardWrapper>
  );
}

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

export default ResearchCard;
