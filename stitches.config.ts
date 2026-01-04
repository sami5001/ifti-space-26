import { createStitches, keyframes } from '@stitches/react';
import type * as Stitches from '@stitches/react';

// Animation keyframes
export const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const fadeUp = keyframes({
  from: { opacity: 0, transform: 'translateY(20px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const scaleIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.95)' },
  to: { opacity: 1, transform: 'scale(1)' },
});

const stitchesConfig = createStitches({
  theme: {
    colors: {
      // Semantic tokens (light theme defaults)
      background: '#ffffff',
      backgroundSubtle: '#f5f5f7',
      backgroundElevated: '#ffffff',
      foreground: '#1d1d1f',
      foregroundMuted: '#6e6e73',
      foregroundSubtle: '#86868b',
      border: '#d2d2d7',
      borderSubtle: '#e8e8ed',
      accent: '#0071e3',
      accentHover: '#0077ed',

      // Neutral utility colors
      black: 'rgba(19, 19, 21, 1)',
      white: 'rgba(255, 255, 255, 1)',
      gray: 'rgba(128, 128, 128, 1)',
      blue: 'rgba(3, 136, 252, 1)',
      red: 'rgba(249, 16, 74, 1)',
      yellow: 'rgba(255, 221, 0, 1)',
      pink: 'rgba(232, 141, 163, 1)',
      turq: 'rgba(0, 245, 196, 1)',
      orange: 'rgba(255, 135, 31, 1)',
      copy: 'rgba(170, 170, 175, 1)',
      green: 'rgba(34, 197, 94, 1)',
      purple: 'rgba(139, 92, 246, 1)',

      // Status colors
      success: 'rgba(34, 197, 94, 1)',
      warning: 'rgba(245, 158, 11, 1)',
      error: 'rgba(239, 68, 68, 1)',
      info: 'rgba(59, 130, 246, 1)',
    },
    fonts: {
      sans: '-apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, "Segoe UI", Roboto, sans-serif',
      display:
        '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, "Segoe UI", Roboto, sans-serif',
      mono: '"SF Mono", "Fira Mono", SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    fontSizes: {
      1: '12px',
      2: '14px',
      3: '16px',
      4: '17px', // Apple's default body size
      5: '21px',
      6: '24px',
      7: '28px',
      8: '34px',
      9: '40px',
      10: '48px',
      11: '56px',
      12: '80px',
    },
    fontWeights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    letterSpacings: {
      tight: '-0.022em',
      normal: '0',
      wide: '0.012em',
    },
    space: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '32px',
      8: '40px',
      9: '48px',
      10: '56px',
      11: '64px',
      12: '80px',
      13: '96px',
      14: '120px',
      15: '160px',
    },
    sizes: {
      1: '4px',
      2: '8px',
      3: '16px',
      4: '32px',
      5: '64px',
      6: '128px',
      7: '256px',
      8: '512px',
      container: '1120px',
      containerNarrow: '720px',
    },
    lineHeights: {
      1: '1',
      2: '1.1',
      3: '1.25',
      4: '1.4',
      5: '1.47', // Apple's default body line height
      6: '1.6',
    },
    radii: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      round: '9999px',
    },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
      md: '0 4px 12px rgba(0, 0, 0, 0.08)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
      card: '0 2px 8px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.06)',
      cardHover: '0 4px 16px rgba(0, 0, 0, 0.08), 0 16px 48px rgba(0, 0, 0, 0.12)',
      navbar: '0 1px 0 rgba(0, 0, 0, 0.1)',
    },
    transitions: {
      fast: 'all 0.15s ease',
      normal: 'all 0.3s ease',
      slow: 'all 0.5s ease',
    },
  },
  media: {
    bp1: '(min-width: 575px)',
    bp2: '(min-width: 750px)',
    bp3: '(min-width: 1000px)',
    bp4: '(min-width: 1200px)',
  },
  utils: {
    p:
      () =>
      (value: Stitches.PropertyValue<'padding'>) => ({
        paddingTop: value,
        paddingBottom: value,
        paddingLeft: value,
        paddingRight: value,
      }),
    pt:
      () =>
      (value: Stitches.PropertyValue<'paddingTop'>) => ({
        paddingTop: value,
      }),
    pr:
      () =>
      (value: Stitches.PropertyValue<'paddingRight'>) => ({
        paddingRight: value,
      }),
    pb:
      () =>
      (value: Stitches.PropertyValue<'paddingBottom'>) => ({
        paddingBottom: value,
      }),
    pl:
      () =>
      (value: Stitches.PropertyValue<'paddingLeft'>) => ({
        paddingLeft: value,
      }),
    px:
      () =>
      (value: Stitches.PropertyValue<'paddingLeft'>) => ({
        paddingLeft: value,
        paddingRight: value,
      }),
    py:
      () =>
      (value: Stitches.PropertyValue<'paddingTop'>) => ({
        paddingTop: value,
        paddingBottom: value,
      }),
    m:
      () =>
      (value: Stitches.PropertyValue<'margin'>) => ({
        marginTop: value,
        marginBottom: value,
        marginLeft: value,
        marginRight: value,
      }),
    mt:
      () =>
      (value: Stitches.PropertyValue<'marginTop'>) => ({
        marginTop: value,
      }),
    mr:
      () =>
      (value: Stitches.PropertyValue<'marginRight'>) => ({
        marginRight: value,
      }),
    mb:
      () =>
      (value: Stitches.PropertyValue<'marginBottom'>) => ({
        marginBottom: value,
      }),
    ml:
      () =>
      (value: Stitches.PropertyValue<'marginLeft'>) => ({
        marginLeft: value,
      }),
    mx:
      () =>
      (value: Stitches.PropertyValue<'marginLeft'>) => ({
        marginLeft: value,
        marginRight: value,
      }),
    my:
      () =>
      (value: Stitches.PropertyValue<'marginTop'>) => ({
        marginTop: value,
        marginBottom: value,
      }),
    size:
      () =>
      (value: Stitches.PropertyValue<'width'>) => ({
        width: value,
        height: value,
      }),
    bc:
      () =>
      (value: Stitches.PropertyValue<'backgroundColor'>) => ({
        backgroundColor: value,
      }),
  },
});

export type CSS = Stitches.CSS<typeof stitchesConfig>;

export const {
  css,
  styled,
  globalCss,
  getCssText,
  theme,
  createTheme,
  config,
  keyframes: stitchesKeyframes,
} = stitchesConfig;

// Re-export keyframes for components that import it
export { keyframes } from '@stitches/react';

// Dark theme with inverted semantic tokens
export const darkTheme = createTheme('dark', {
  colors: {
    background: '#000000',
    backgroundSubtle: '#1d1d1f',
    backgroundElevated: '#2d2d2f',
    foreground: '#f5f5f7',
    foregroundMuted: '#a1a1a6',
    foregroundSubtle: '#6e6e73',
    border: '#424245',
    borderSubtle: '#38383d',
    accent: '#2997ff',
    accentHover: '#0077ed',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.2)',
    md: '0 4px 12px rgba(0, 0, 0, 0.3)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.4)',
    card: '0 2px 8px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.25)',
    cardHover: '0 4px 16px rgba(0, 0, 0, 0.3), 0 16px 48px rgba(0, 0, 0, 0.4)',
    navbar: '0 1px 0 rgba(255, 255, 255, 0.1)',
  },
});
