import React, { useEffect, useState, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { styled, keyframes } from 'stitches.config';

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeUp = keyframes({
  from: { opacity: 0, transform: 'translateY(20px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const HeroWrapper = styled('section', {
  position: 'relative',
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
  height: '50vh',
  minHeight: '400px',
  overflow: 'hidden',
  animation: `${fadeIn} 0.6s ease`,

  '@bp2': {
    height: '60vh',
    minHeight: '500px',
  },
});

const HeroImageWrapper = styled('div', {
  position: 'absolute',
  inset: '-15%', // Extra space for parallax movement
  zIndex: 0,
  willChange: 'transform',
});

const HeroOverlay = styled('div', {
  position: 'absolute',
  inset: 0,
  zIndex: 1,

  // Default gradient (text on right)
  background:
    'linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.85) 100%)',

  variants: {
    gradient: {
      right: {
        background:
          'linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.85) 100%)',
      },
      left: {
        background:
          'linear-gradient(to left, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.85) 100%)',
      },
      center: {
        background:
          'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%)',
      },
    },
  },

  defaultVariants: {
    gradient: 'right',
  },
});

const HeroContent = styled('div', {
  position: 'relative',
  zIndex: 2,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '$6',
  maxWidth: '1400px',
  margin: '0 auto',
  width: '100%',

  '@bp2': {
    padding: '$8 $10',
  },

  variants: {
    align: {
      right: {
        justifyContent: 'flex-end',
      },
      left: {
        justifyContent: 'flex-start',
      },
      center: {
        justifyContent: 'center',
      },
    },
  },

  defaultVariants: {
    align: 'right',
  },
});

const HeroText = styled('div', {
  maxWidth: '500px',
  textAlign: 'left',
  animation: `${fadeUp} 0.8s ease 0.2s both`,

  '@bp2': {
    maxWidth: '550px',
  },
});

const HeroTitle = styled('h1', {
  fontSize: '$8',
  fontWeight: '$bold',
  color: 'white',
  letterSpacing: '$tight',
  lineHeight: 1.1,
  marginBottom: '$3',
  textShadow: '0 2px 10px rgba(0,0,0,0.3)',

  '@bp2': {
    fontSize: '$10',
    marginBottom: '$4',
  },
});

const HeroSubtitle = styled('p', {
  fontSize: '$3',
  color: 'rgba(255,255,255,0.9)',
  lineHeight: '$5',
  textShadow: '0 1px 4px rgba(0,0,0,0.3)',

  '@bp2': {
    fontSize: '$4',
  },
});

const HeroTagline = styled('span', {
  display: 'block',
  fontSize: '$2',
  fontWeight: '$medium',
  color: 'rgba(255,255,255,0.7)',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: '$3',

  '@bp2': {
    fontSize: '$3',
    marginBottom: '$4',
  },
});

export interface HeroSectionProps {
  imageSrc: StaticImageData | string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  imagePosition?: 'center' | 'left' | 'right' | 'top' | 'bottom';
  focalPoint?: { x: number; y: number }; // Percentage-based (0-100) for precise positioning
  textAlign?: 'left' | 'right' | 'center';
  priority?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  tagline,
  imagePosition = 'center',
  focalPoint,
  textAlign = 'right',
  priority = true,
}) => {
  const wrapperRef = useRef<HTMLElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference and set up parallax
  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Parallax scroll handler
    let ticking = false;
    const handleScroll = () => {
      if (!ticking && !mediaQuery.matches) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Subtle parallax: 15% of scroll position, capped at reasonable bounds
          const offset = Math.min(scrollY * 0.15, 100);
          setParallaxOffset(offset);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Map text alignment to gradient direction
  const gradientDirection =
    textAlign === 'left' ? 'left' : textAlign === 'center' ? 'center' : 'right';

  // Determine object position: focalPoint takes precedence, then imagePosition
  const objectPosition = focalPoint
    ? `${focalPoint.x}% ${focalPoint.y}%`
    : {
        center: 'center center',
        left: 'left center',
        right: 'right center',
        top: 'center top',
        bottom: 'center bottom',
      }[imagePosition];

  return (
    <HeroWrapper ref={wrapperRef}>
      <HeroImageWrapper
        style={{
          transform: prefersReducedMotion ? 'none' : `translateY(${parallaxOffset}px)`,
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          quality={85}
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition,
          }}
        />
      </HeroImageWrapper>

      <HeroOverlay gradient={gradientDirection} />

      <HeroContent align={textAlign}>
        <HeroText>
          {tagline && <HeroTagline>{tagline}</HeroTagline>}
          <HeroTitle>{title}</HeroTitle>
          {subtitle && <HeroSubtitle>{subtitle}</HeroSubtitle>}
        </HeroText>
      </HeroContent>
    </HeroWrapper>
  );
};

export default HeroSection;
