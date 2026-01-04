import { styled } from 'stitches.config';

export const Container = styled('div', {
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '$4',
  paddingRight: '$4',

  '@bp1': {
    paddingLeft: '$6',
    paddingRight: '$6',
  },

  '@bp2': {
    paddingLeft: '$8',
    paddingRight: '$8',
  },

  variants: {
    size: {
      narrow: {
        maxWidth: '$containerNarrow',
      },
      default: {
        maxWidth: '$container',
      },
      wide: {
        maxWidth: '1400px',
      },
      full: {
        maxWidth: 'none',
      },
    },
  },

  defaultVariants: {
    size: 'default',
  },
});
