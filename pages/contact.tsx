import React from 'react';
import TitleAndMetaTags from '@components/TitleAndMetaTags';
import { NavBar, Container } from '@components/ui';
import { HeroSection } from '@components/HeroSection';
import { ContactForm } from '@components/ContactForm';
import { styled } from 'stitches.config';
import { siteConfig } from '@config/site';

const PageWrapper = styled('div', {
  minHeight: '100vh',
  backgroundColor: '$background',
});

const ContentContainer = styled(Container, {
  paddingTop: '$8',
  paddingBottom: '$12',

  '@bp2': {
    paddingTop: '$10',
  },
});

const PageHeader = styled('div', {
  textAlign: 'center',
  maxWidth: '640px',
  margin: '0 auto $10',

  '@bp2': {
    marginBottom: '$12',
  },
});

const PageTitle = styled('h1', {
  fontSize: '$9',
  fontWeight: '$bold',
  color: '$foreground',
  letterSpacing: '$tight',
  margin: 0,

  '@bp2': {
    fontSize: '$10',
  },
});

const PageDescription = styled('p', {
  fontSize: '$4',
  color: '$foregroundMuted',
  lineHeight: '$5',
  marginTop: '$4',
});

// Access key can be configured in environment variables or site config
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '';

export default function ContactPage() {
  return (
    <PageWrapper>
      <TitleAndMetaTags
        title={`Contact - ${siteConfig.name}`}
        description="Get in touch for research collaborations, speaking opportunities, or general inquiries."
        image="/images/hero/hero-contact.jpg"
      />
      <NavBar />

      <HeroSection
        imageSrc="/images/hero/hero-contact.jpg"
        imageAlt="Contact"
        title="Contact"
        subtitle="I would love to hear from you. Whether you have a question about my research, a collaboration opportunity, or just want to say hello."
        tagline="Get in Touch"
        imagePosition="center"
        textAlign="left"
      />

      <ContentContainer>
        <PageHeader>
          <PageTitle>Send a Message</PageTitle>
          <PageDescription>
            Fill out the form below and I will get back to you as soon as possible.
          </PageDescription>
        </PageHeader>

        <ContactForm accessKey={WEB3FORMS_ACCESS_KEY} />
      </ContentContainer>
    </PageWrapper>
  );
}
