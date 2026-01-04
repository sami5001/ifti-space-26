import { css, styled } from 'stitches.config';

export const badge = css({
  boxSizing: 'border-box',
  border: 'none',
  borderRadius: '$round',

  fontFamily: '$mono',
  fontSize: '$1',
  lineHeight: 1,
  fontWeight: '500',
  height: '$3',
  px: '$2',
  display: 'inline-flex',
  alignItems: 'center',

  variants: {
    variant: {
      gray: {
        backgroundColor: '$foregroundSubtle',
        color: '$background',
      },
      accent: {
        backgroundColor: '$accent',
        color: '$white',
      },
      success: {
        backgroundColor: '$success',
        color: '$white',
      },
      warning: {
        backgroundColor: '$warning',
        color: '$white',
      },
      error: {
        backgroundColor: '$error',
        color: '$white',
      },
    },
  },
  defaultVariants: {
    variant: 'gray',
  },
});

export const Badge = styled('span', badge);
