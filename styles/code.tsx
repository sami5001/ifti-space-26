import { css, styled } from 'stitches.config';

export const code = css({
  boxSizing: 'border-box',
  bc: '$backgroundSubtle',
  borderRadius: '$1',
  color: '$foreground',
  lineHeight: 1,
  fontFamily: '$mono',
  fontSize: '0.875em',
  letterSpacing: '-0.5px',
  py: '2px',
  px: '6px',
});

export const Code = styled('code', code);

export const pre = css({
  boxSizing: 'border-box',
  bc: '$backgroundSubtle',
  borderRadius: '$2',
  fontFamily: '$mono',
  fontSize: '$2',
  lineHeight: '$5',
  overflow: 'auto',
  p: '$4',
  whiteSpace: 'pre',

  '& code': {
    bc: 'transparent',
    p: 0,
    borderRadius: 0,
  },
});

export const Pre = styled('pre', pre);
