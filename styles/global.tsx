import { globalCss } from 'stitches.config';

export const globalStyles = globalCss({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },

  html: {
    colorScheme: 'light dark',
  },

  body: {
    backgroundColor: '$background',
    color: '$foreground',
    fontFamily: '$sans',
    fontSize: '$4',
    lineHeight: '$5',
    margin: 0,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },

  ul: {
    paddingLeft: '$6',
  },

  figure: { margin: 0 },

  'pre, code': { margin: 0, fontFamily: '$mono' },

  svg: { display: 'inline-block', verticalAlign: 'middle' },

  a: {
    color: '$accent',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: '$accentHover',
    },
  },

  'h1, h2, h3, h4, h5, h6': {
    fontFamily: '$display',
    fontWeight: '$semibold',
    letterSpacing: '$tight',
    color: '$foreground',
    margin: 0,
  },

  '::selection': {
    backgroundColor: '$accent',
    color: '$white',
  },
});
