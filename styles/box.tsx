import { styled, css, CSS } from 'stitches.config';

// Styled Box component for direct use as a React component
export const Box = styled('div', {
  boxSizing: 'border-box',
});

// Base box style generator
const baseBoxStyle = css({
  boxSizing: 'border-box',
});

// Backwards-compatible className generator for existing code
// Creates a new css class with merged styles
export const box = (styles?: CSS): string => {
  if (!styles) return baseBoxStyle();
  // Create a new css function with merged base + custom styles
  return css({
    boxSizing: 'border-box',
    ...styles,
  })();
};
