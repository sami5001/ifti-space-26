import { css } from 'stitches.config';

export const button = css({
  boxSizing: 'border-box',
  appearance: 'none',

  border: '1px solid $border',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  margin: 0,
  py: '0',
  px: '$2',
  height: '$4',
  backgroundColor: 'transparent',
  color: '$foreground',
  fontFamily: '$sans',
  fontSize: '$3',
  lineHeight: 1,
  borderRadius: '$2',
  cursor: 'pointer',
  transition: '$fast',

  '&:hover': {
    bc: '$foreground',
    color: '$background',
  },

  '&:focus': {
    outline: 'none',
    bc: '$foreground',
    color: '$background',
  },

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});
