import React, { useState } from 'react';
import TitleAndMetaTags from '@components/TitleAndMetaTags';
import { NavBar, Container } from '@components/ui';
import { TwoColumnLayout, SidebarNav, SidebarSection, SidebarLink } from '@components/layouts';
import { HeroSection } from '@components/HeroSection';
import { ResearchCard } from '@components/ResearchCard';
import { ResearchDetailModal } from '@components/ResearchDetailModal';
import { styled } from 'stitches.config';
import { getResearchProjects } from '@lib/research';
import type { ResearchProject } from '@lib/types';
import { FileTextIcon, RocketIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import { siteConfig } from '@config/site';

const PageWrapper = styled('div', {
  minHeight: '100vh',
  backgroundColor: '$background',
});

const ContentContainer = styled(Container, {
  paddingTop: '$6',
  paddingBottom: '$12',

  '@bp2': {
    paddingTop: '$8',
  },
});

const SectionHeader = styled('div', {
  marginBottom: '$6',
  paddingBottom: '$4',
  borderBottom: '1px solid $borderSubtle',
});

const SectionTitle = styled('h2', {
  fontSize: '$7',
  fontWeight: '$bold',
  color: '$foreground',
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '$3',

  '& svg': {
    width: '24px',
    height: '24px',
    color: '$accent',
  },
});

const SectionDescription = styled('p', {
  fontSize: '$3',
  color: '$foregroundMuted',
  marginTop: '$2',
});

const ProjectsGrid = styled('div', {
  display: 'grid',
  gap: '$6',
  gridTemplateColumns: '1fr',

  '@bp3': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

const SectionDivider = styled('div', {
  height: '$14',

  '@bp2': {
    height: '80px',
  },
});

const EmptyState = styled('div', {
  textAlign: 'center',
  padding: '$12 $6',
  backgroundColor: '$backgroundSubtle',
  borderRadius: '$4',
  border: '1px dashed $borderSubtle',
});

const EmptyStateText = styled('p', {
  fontSize: '$4',
  color: '$foregroundMuted',
  margin: 0,
});

interface ResearchPageProps {
  ongoingProjects: ResearchProject[];
  completedProjects: ResearchProject[];
}

export default function ResearchPage({ ongoingProjects, completedProjects }: ResearchPageProps) {
  const [selectedProject, setSelectedProject] = useState<ResearchProject | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = (project: ResearchProject) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const sidebar = (
    <SidebarNav title="Navigation">
      <SidebarLink href="/research" icon={<FileTextIcon />}>
        Overview
      </SidebarLink>

      {ongoingProjects.length > 0 && (
        <SidebarSection title="Ongoing Projects" defaultOpen>
          {ongoingProjects.map((project) => (
            <SidebarLink key={project.id} href={`/research#${project.id}`} indent={1}>
              {project.shortTitle || project.title}
            </SidebarLink>
          ))}
        </SidebarSection>
      )}

      {completedProjects.length > 0 && (
        <SidebarSection title="Completed Projects" defaultOpen>
          {completedProjects.map((project) => (
            <SidebarLink key={project.id} href={`/research#${project.id}`} indent={1}>
              {project.shortTitle || project.title}
            </SidebarLink>
          ))}
        </SidebarSection>
      )}
    </SidebarNav>
  );

  return (
    <PageWrapper>
      <TitleAndMetaTags
        title={`Research - ${siteConfig.name}`}
        description="Research projects, academic work, and areas of scholarly focus."
        image="/images/hero/hero-research.jpg"
      />
      <NavBar />

      <HeroSection
        imageSrc="/images/hero/hero-research.jpg"
        imageAlt="Research"
        title="Research"
        subtitle="Exploring new frontiers of knowledge through rigorous academic inquiry and collaborative scholarship."
        tagline="Academic Research"
        imagePosition="center"
        textAlign="left"
      />

      <ContentContainer>
        <TwoColumnLayout sidebar={sidebar}>
          {/* Ongoing Projects Section */}
          <section id="ongoing">
            <SectionHeader>
              <SectionTitle>
                <RocketIcon />
                Ongoing Projects
              </SectionTitle>
              <SectionDescription>Current research initiatives and active projects</SectionDescription>
            </SectionHeader>

            {ongoingProjects.length > 0 ? (
              <ProjectsGrid>
                {ongoingProjects.map((project, index) => (
                  <div key={project.id} id={project.id}>
                    <ResearchCard
                      project={project}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => handleCardClick(project)}
                    />
                  </div>
                ))}
              </ProjectsGrid>
            ) : (
              <EmptyState>
                <EmptyStateText>No ongoing projects. Add research MDX files to get started.</EmptyStateText>
              </EmptyState>
            )}
          </section>

          {completedProjects.length > 0 && (
            <>
              <SectionDivider />

              {/* Completed Projects Section */}
              <section id="completed">
                <SectionHeader>
                  <SectionTitle>
                    <CheckCircledIcon />
                    Completed Projects
                  </SectionTitle>
                  <SectionDescription>Past research projects and their outcomes</SectionDescription>
                </SectionHeader>

                <ProjectsGrid>
                  {completedProjects.map((project, index) => (
                    <div key={project.id} id={project.id}>
                      <ResearchCard
                        project={project}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => handleCardClick(project)}
                      />
                    </div>
                  ))}
                </ProjectsGrid>
              </section>
            </>
          )}
        </TwoColumnLayout>
      </ContentContainer>

      <ResearchDetailModal project={selectedProject} open={modalOpen} onOpenChange={setModalOpen} />
    </PageWrapper>
  );
}

export async function getStaticProps() {
  const allProjects = await getResearchProjects();

  const ongoingProjects = allProjects.filter((p) => p.status === 'ongoing');
  const completedProjects = allProjects.filter((p) => p.status === 'completed');

  return {
    props: {
      ongoingProjects,
      completedProjects,
    },
  };
}
