import React, { useEffect, useState, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { styled, keyframes } from 'stitches.config';

// Focal point types for responsive image positioning
interface FocalPointValue {
  x: number; // 0-100 percentage
  y: number; // 0-100 percentage
}

interface ResponsiveFocalPoint {
  /** Default/mobile focal point (< 750px) */
  default: FocalPointValue;
  /** Tablet focal point (750px+), optional - falls back to default */
  bp2?: FocalPointValue;
  /** Desktop focal point (1000px+), optional - falls back to bp2 or default */
  bp3?: FocalPointValue;
}

type FocalPointProp = FocalPointValue | ResponsiveFocalPoint;

// Type guard to check if focalPoint is responsive
function isResponsiveFocalPoint(fp: FocalPointProp): fp is ResponsiveFocalPoint {
  return 'default' in fp;
}

const fallbackFocalPoints: Record<string, FocalPointValue> = {
  center: { x: 50, y: 50 },
  left: { x: 0, y: 50 },
  right: { x: 100, y: 50 },
  top: { x: 50, y: 0 },
  bottom: { x: 50, y: 100 },
};

function getFallbackFocalPoint(imagePosition: string): FocalPointValue {
  return fallbackFocalPoints[imagePosition] || fallbackFocalPoints.center;
}

function getActiveFocalPoint(
  focalPoint: FocalPointProp | undefined,
  imagePosition: string,
  viewportWidth: number
): FocalPointValue {
  if (!focalPoint) {
    return getFallbackFocalPoint(imagePosition);
  }

  if (!isResponsiveFocalPoint(focalPoint)) {
    return focalPoint;
  }

  if (viewportWidth >= 1000) {
    return focalPoint.bp3 || focalPoint.bp2 || focalPoint.default;
  }

  if (viewportWidth >= 750) {
    return focalPoint.bp2 || focalPoint.default;
  }

  return focalPoint.default;
}

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

  '&[data-debug="true"]': {
    cursor: 'crosshair',
  },
});

const HeroImageWrapper = styled('div', {
  position: 'absolute',
  inset: '-15%', // Extra space for parallax movement
  zIndex: 0,
  willChange: 'transform',

  // Responsive focal point using CSS custom properties
  '& img': {
    objectFit: 'cover',
    objectPosition: 'var(--focal-x-default, 50%) var(--focal-y-default, 50%)',
  },

  '@bp2': {
    '& img': {
      objectPosition:
        'var(--focal-x-bp2, var(--focal-x-default, 50%)) var(--focal-y-bp2, var(--focal-y-default, 50%))',
    },
  },

  '@bp3': {
    '& img': {
      objectPosition:
        'var(--focal-x-bp3, var(--focal-x-bp2, var(--focal-x-default, 50%))) var(--focal-y-bp3, var(--focal-y-bp2, var(--focal-y-default, 50%)))',
    },
  },
});

const DebugOverlay = styled('div', {
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  pointerEvents: 'none',
});

const DebugCrosshair = styled('div', {
  position: 'absolute',
  width: '16px',
  height: '16px',
  borderRadius: '9999px',
  border: '2px solid rgba(0, 229, 255, 0.95)',
  transform: 'translate(-50%, -50%)',
  boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.35)',

  '&::before': {
    content: '""',
    position: 'absolute',
    left: '50%',
    top: '-10px',
    width: '2px',
    height: '36px',
    background: 'rgba(0, 229, 255, 0.9)',
    transform: 'translateX(-50%)',
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    left: '-10px',
    top: '50%',
    width: '36px',
    height: '2px',
    background: 'rgba(0, 229, 255, 0.9)',
    transform: 'translateY(-50%)',
  },
});

const HeroOverlay = styled('div', {
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  pointerEvents: 'none',

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
  focalPoint?: FocalPointProp; // Percentage-based (0-100), supports responsive values
  textAlign?: 'left' | 'right' | 'center';
  priority?: boolean;
}

// Helper to get CSS custom properties for responsive focal points
function getFocalPointStyles(
  focalPoint?: FocalPointProp,
  imagePosition: string = 'center'
): React.CSSProperties {
  // No focalPoint - use imagePosition fallback
  if (!focalPoint) {
    const pos = getFallbackFocalPoint(imagePosition);
    return {
      '--focal-x-default': `${pos.x}%`,
      '--focal-y-default': `${pos.y}%`,
    } as React.CSSProperties;
  }

  // Simple focal point (backward compatible)
  if (!isResponsiveFocalPoint(focalPoint)) {
    return {
      '--focal-x-default': `${focalPoint.x}%`,
      '--focal-y-default': `${focalPoint.y}%`,
    } as React.CSSProperties;
  }

  // Responsive focal point
  const styles: Record<string, string> = {
    '--focal-x-default': `${focalPoint.default.x}%`,
    '--focal-y-default': `${focalPoint.default.y}%`,
  };

  if (focalPoint.bp2) {
    styles['--focal-x-bp2'] = `${focalPoint.bp2.x}%`;
    styles['--focal-y-bp2'] = `${focalPoint.bp2.y}%`;
  }

  if (focalPoint.bp3) {
    styles['--focal-x-bp3'] = `${focalPoint.bp3.x}%`;
    styles['--focal-y-bp3'] = `${focalPoint.bp3.y}%`;
  }

  return styles as React.CSSProperties;
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
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [debugEnabled, setDebugEnabled] = useState(false);
  const [debugFocalPoint, setDebugFocalPoint] = useState<FocalPointValue | null>(null);
  const [debugManualPoint, setDebugManualPoint] = useState(false);

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

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    setDebugEnabled(params.has('focal'));
  }, []);

  useEffect(() => {
    if (!debugEnabled) {
      setDebugFocalPoint(null);
      setDebugManualPoint(false);
      return;
    }

    const viewportWidth = window.innerWidth;
    setDebugFocalPoint(getActiveFocalPoint(focalPoint, imagePosition, viewportWidth));
    setDebugManualPoint(false);
  }, [debugEnabled, focalPoint, imagePosition]);

  useEffect(() => {
    if (!debugEnabled) {
      return;
    }

    const handleResize = () => {
      if (debugManualPoint) {
        return;
      }

      setDebugFocalPoint(getActiveFocalPoint(focalPoint, imagePosition, window.innerWidth));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [debugEnabled, debugManualPoint, focalPoint, imagePosition]);

  // Map text alignment to gradient direction
  const gradientDirection =
    textAlign === 'left' ? 'left' : textAlign === 'center' ? 'center' : 'right';

  // Get CSS custom properties for responsive focal point
  const focalPointStyles = getFocalPointStyles(focalPoint, imagePosition);

  const handleDebugClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!debugEnabled) {
      return;
    }

    const rect = imageWrapperRef.current?.getBoundingClientRect();
    if (!rect || !rect.width || !rect.height) {
      return;
    }

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const nextPoint = {
      x: Math.max(0, Math.min(100, Math.round(x * 10) / 10)),
      y: Math.max(0, Math.min(100, Math.round(y * 10) / 10)),
    };

    setDebugFocalPoint(nextPoint);
    setDebugManualPoint(true);
    console.info('[HeroSection] focalPoint', nextPoint);
  };

  return (
    <HeroWrapper
      ref={wrapperRef}
      data-debug={debugEnabled ? 'true' : 'false'}
      onClick={debugEnabled ? handleDebugClick : undefined}
    >
      <HeroImageWrapper
        ref={imageWrapperRef}
        style={{
          transform: prefersReducedMotion ? 'none' : `translateY(${parallaxOffset}px)`,
          ...focalPointStyles,
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          quality={85}
          sizes="100vw"
        />
        {debugEnabled && debugFocalPoint && (
          <DebugOverlay aria-hidden="true">
            <DebugCrosshair
              style={{ left: `${debugFocalPoint.x}%`, top: `${debugFocalPoint.y}%` }}
            />
          </DebugOverlay>
        )}
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
