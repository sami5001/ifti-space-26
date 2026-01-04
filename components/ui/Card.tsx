import { styled } from 'stitches.config';

export const Card = styled('div', {
  backgroundColor: '$backgroundElevated',
  borderRadius: '$3',
  border: '1px solid $borderSubtle',
  boxShadow: '$card',
  transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease',

  variants: {
    padding: {
      none: { padding: 0 },
      sm: { padding: '$4' },
      md: { padding: '$6' },
      lg: { padding: '$8' },
    },
    interactive: {
      true: {
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '$cardHover',
          transform: 'translateY(-2px)',
          borderColor: '$border',
        },
      },
    },
    variant: {
      default: {},
      subtle: {
        backgroundColor: '$backgroundSubtle',
        border: 'none',
        boxShadow: 'none',
      },
      outline: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
    },
  },

  defaultVariants: {
    padding: 'md',
    variant: 'default',
  },
});

export const CardHeader = styled('div', {
  marginBottom: '$4',
});

export const CardTitle = styled('h3', {
  fontSize: '$5',
  fontWeight: '$semibold',
  color: '$foreground',
  margin: 0,
});

export const CardDescription = styled('p', {
  fontSize: '$3',
  color: '$foregroundMuted',
  margin: 0,
  marginTop: '$2',
});

export const CardContent = styled('div', {});

export const CardFooter = styled('div', {
  marginTop: '$4',
  paddingTop: '$4',
  borderTop: '1px solid $borderSubtle',
});
