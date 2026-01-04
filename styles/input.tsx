import { css, styled } from 'stitches.config';

export const input = css({
  boxSizing: 'border-box',
  appearance: 'none',
  border: '1px solid $border',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  margin: 0,
  py: '0',
  px: '$3',
  height: '$4',
  backgroundColor: '$background',
  color: '$foreground',
  fontFamily: '$sans',
  fontSize: '$3',
  lineHeight: 1,
  width: '100%',
  borderRadius: '$2',
  transition: '$fast',

  '&:focus': {
    outline: 'none',
    borderColor: '$accent',
  },

  '&::placeholder': {
    color: '$foregroundSubtle',
  },
});

export const Input = styled('input', input);

export const TextArea = styled('textarea', {
  ...input,
  minHeight: '120px',
  py: '$3',
  lineHeight: '$4',
  resize: 'vertical',
});
