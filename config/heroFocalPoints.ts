import type { HeroSectionProps } from '@components/HeroSection';

type HeroFocalPoint = NonNullable<HeroSectionProps['focalPoint']>;

export const heroFocalPoints: Record<string, HeroFocalPoint> = {
  '/images/hero/hero-home.jpg': {
    default: { x: 50, y: 55 },
    bp2: { x: 50, y: 50 },
    bp3: { x: 50, y: 45 },
  },
  '/images/hero/hero-bio.jpg': {
    default: { x: 60, y: 35 },
    bp2: { x: 60, y: 32 },
    bp3: { x: 60, y: 28 },
  },
  '/images/hero/hero-contact.jpg': {
    default: { x: 32, y: 42 },
    bp2: { x: 32, y: 38 },
    bp3: { x: 32, y: 34 },
  },
  '/images/hero/hero-press.jpg': {
    default: { x: 24, y: 18 },
    bp2: { x: 24, y: 18 },
    bp3: { x: 24, y: 18 },
  },
  '/images/hero/hero-research.jpg': {
    default: { x: 42, y: 55 },
    bp2: { x: 42, y: 50 },
    bp3: { x: 42, y: 45 },
  },
  '/images/hero/hero-writing.jpg': {
    default: { x: 50, y: 40 },
    bp2: { x: 50, y: 36 },
    bp3: { x: 50, y: 32 },
  },
};
