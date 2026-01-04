import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { styled } from 'stitches.config';
import { Container } from './ui/Container';
import { siteConfig } from '@config/site';

const FooterWrapper = styled('footer', {
  borderTop: '1px solid $borderSubtle',
  backgroundColor: '$background',
  paddingTop: '$6',
  paddingBottom: '$6',
});

const FooterContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$3',

  '@bp1': {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const FooterLinks = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
});

const FooterLink = styled('a', {
  fontSize: '$2',
  color: '$foregroundMuted',
  textDecoration: 'none',
  transition: 'color 0.15s ease',

  '&:hover': {
    color: '$accent',
  },
});

const Separator = styled('span', {
  color: '$borderSubtle',
  fontSize: '$2',
});

const Copyright = styled('p', {
  fontSize: '$2',
  color: '$foregroundSubtle',
  margin: 0,
});

export const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    // Set year only on client side to prevent hydration mismatch
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <FooterWrapper>
      <Container>
        <FooterContent>
          <Copyright>
            Copyright &copy; {currentYear ?? new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </Copyright>

          <FooterLinks>
            {siteConfig.footerLinks.map((link, index) => (
              <React.Fragment key={link.href}>
                {index > 0 && <Separator>/</Separator>}
                {link.href.startsWith('/') ? (
                  <NextLink href={link.href} passHref legacyBehavior>
                    <FooterLink>{link.label}</FooterLink>
                  </NextLink>
                ) : (
                  <FooterLink href={link.href} target="_blank" rel="noopener">
                    {link.label}
                  </FooterLink>
                )}
              </React.Fragment>
            ))}
            {siteConfig.social.github && (
              <>
                <Separator>/</Separator>
                <FooterLink href={siteConfig.social.github} target="_blank" rel="noopener">
                  GitHub
                </FooterLink>
              </>
            )}
          </FooterLinks>
        </FooterContent>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
