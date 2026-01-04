'use client';

import React from 'react';
import { styled, keyframes } from 'stitches.config';
import { Modal } from '@components/ui/Modal';
import type { ResearchProject } from '@lib/types';

const fadeUp = keyframes({
  from: { opacity: 0, transform: 'translateY(8px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const ModalHeader = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '$4',
  marginBottom: '$4',
  paddingRight: '$8',
});

const Title = styled('h2', {
  fontSize: '$6',
  fontWeight: '$bold',
  color: '$foreground',
  lineHeight: '$3',
  margin: 0,

  '@bp1': {
    fontSize: '$7',
  },
});

const StatusBadge = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 12px',
  fontSize: '$1',
  fontWeight: '$semibold',
  borderRadius: '$round',
  textTransform: 'uppercase',
  letterSpacing: '0.02em',
  flexShrink: 0,

  variants: {
    status: {
      ongoing: {
        color: '$green',
        backgroundColor: 'rgba(52, 199, 89, 0.1)',
      },
      completed: {
        color: '$foregroundMuted',
        backgroundColor: '$backgroundSubtle',
      },
    },
  },
});

const MetaSection = styled('div', {
  marginBottom: '$5',
  animation: `${fadeUp} 0.3s ease backwards`,
  animationDelay: '0.05s',
});

const Institution = styled('p', {
  fontSize: '$3',
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

const DescriptionSection = styled('div', {
  marginBottom: '$5',
  animation: `${fadeUp} 0.3s ease backwards`,
  animationDelay: '0.1s',
});

const SectionLabel = styled('h3', {
  fontSize: '$2',
  fontWeight: '$semibold',
  color: '$foregroundMuted',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '$2',
});

const Description = styled('div', {
  fontSize: '$3',
  color: '$foreground',
  lineHeight: '$5',
  margin: 0,

  '& p': {
    margin: '0 0 $3 0',
    '&:last-child': {
      marginBottom: 0,
    },
  },
});

const Supervisors = styled('p', {
  fontSize: '$3',
  color: '$foregroundMuted',
  lineHeight: '$5',
  margin: 0,
  fontStyle: 'italic',
});

const TagsSection = styled('div', {
  marginBottom: '$5',
  animation: `${fadeUp} 0.3s ease backwards`,
  animationDelay: '0.15s',
});

const TagsWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$2',
});

const Tag = styled('span', {
  fontSize: '$2',
  color: '$foregroundMuted',
  backgroundColor: '$backgroundSubtle',
  padding: '6px 12px',
  borderRadius: '$2',
});

const LinksSection = styled('div', {
  paddingTop: '$5',
  borderTop: '1px solid $borderSubtle',
  animation: `${fadeUp} 0.3s ease backwards`,
  animationDelay: '0.2s',
});

const LinksWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$3',
});

const LinkButton = styled('a', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '$2',
  fontSize: '$3',
  fontWeight: '$medium',
  color: '$accent',
  textDecoration: 'none',
  padding: '$2 $4',
  borderRadius: '$2',
  border: '1px solid $borderSubtle',
  backgroundColor: '$background',
  transition: 'all 0.15s ease',

  '&:hover': {
    borderColor: '$accent',
    backgroundColor: '$backgroundSubtle',
  },

  '& svg': {
    width: '14px',
    height: '14px',
  },
});

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

interface ResearchDetailModalProps {
  project: ResearchProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResearchDetailModal({ project, open, onOpenChange }: ResearchDetailModalProps) {
  if (!project) return null;

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalHeader>
        <Title>{project.title}</Title>
        <StatusBadge status={project.status}>
          {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
        </StatusBadge>
      </ModalHeader>

      <MetaSection>
        {project.institution && <Institution>{project.institution}</Institution>}
        {project.department && <Department>{project.department}</Department>}
        {project.dateRange && <DateRange>{project.dateRange}</DateRange>}
      </MetaSection>

      {project.description && (
        <DescriptionSection>
          <SectionLabel>Description</SectionLabel>
          <Description dangerouslySetInnerHTML={{ __html: project.description }} />
        </DescriptionSection>
      )}

      {project.supervisors && (
        <DescriptionSection>
          <SectionLabel>Supervisors</SectionLabel>
          <Supervisors>{project.supervisors}</Supervisors>
        </DescriptionSection>
      )}

      {project.tags && project.tags.length > 0 && (
        <TagsSection>
          <SectionLabel>Topics</SectionLabel>
          <TagsWrapper>
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagsWrapper>
        </TagsSection>
      )}

      {project.links && project.links.length > 0 && (
        <LinksSection>
          <SectionLabel>Resources</SectionLabel>
          <LinksWrapper>
            {project.links.map((link) => (
              <LinkButton
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
                <ExternalLinkIcon />
              </LinkButton>
            ))}
          </LinksWrapper>
        </LinksSection>
      )}
    </Modal>
  );
}

export default ResearchDetailModal;
