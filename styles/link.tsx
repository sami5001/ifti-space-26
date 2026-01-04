import { css } from 'stitches.config';

export const link = css({
  boxSizing: 'border-box',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  boxShadow: '0px 1px 0px 0px $colors$accent',
  color: 'inherit',
  fontFamily: '$sans',
  textDecoration: 'none',
  transition: 'all 100ms linear 0ms',

  '&:hover': {
    color: '$accent',
    transition: 'all 100ms linear 0ms',
  },

  '&:focus': {
    outline: 'none',
    boxShadow: '0px 0px 0px 2px $colors$accent',
    color: '$accent',
  },

  variants: {
    variant: {
      ghost: {
        boxShadow: 'none',
        '&:focus': {
          boxShadow: 'none',
        },
      },
    },
  },
});
