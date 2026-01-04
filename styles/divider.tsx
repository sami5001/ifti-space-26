import { css, styled } from 'stitches.config';

export const divider = css({
  boxSizing: 'border-box',
  border: 0,
  margin: 0,
  bc: '$border',
  height: 1,

  variants: {
    size: {
      1: { maxWidth: '32px' },
      2: { maxWidth: '64px' },
      3: { maxWidth: '128px' },
      full: { maxWidth: '100%' },
    },
  },
  defaultVariants: {
    size: 'full',
  },
});

export const Divider = styled('hr', divider);
