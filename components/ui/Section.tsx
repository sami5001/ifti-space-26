import { styled } from 'stitches.config';

export const Section = styled('section', {
  width: '100%',

  variants: {
    padding: {
      none: {},
      sm: {
        paddingTop: '$8',
        paddingBottom: '$8',
        '@bp2': {
          paddingTop: '$10',
          paddingBottom: '$10',
        },
      },
      md: {
        paddingTop: '$10',
        paddingBottom: '$10',
        '@bp2': {
          paddingTop: '$12',
          paddingBottom: '$12',
        },
      },
      lg: {
        paddingTop: '$12',
        paddingBottom: '$12',
        '@bp2': {
          paddingTop: '$14',
          paddingBottom: '$14',
        },
      },
      hero: {
        paddingTop: '$14',
        paddingBottom: '$14',
        '@bp2': {
          paddingTop: '$15',
          paddingBottom: '$15',
        },
      },
    },
    background: {
      default: {
        backgroundColor: '$background',
      },
      subtle: {
        backgroundColor: '$backgroundSubtle',
      },
      elevated: {
        backgroundColor: '$backgroundElevated',
      },
      accent: {
        backgroundColor: '$accent',
        color: '$white',
      },
    },
  },

  defaultVariants: {
    padding: 'md',
    background: 'default',
  },
});

export const SectionHeader = styled('div', {
  textAlign: 'center',
  marginBottom: '$8',

  '@bp2': {
    marginBottom: '$10',
  },
});

export const SectionTitle = styled('h2', {
  fontSize: '$7',
  fontWeight: '$bold',
  color: '$foreground',
  letterSpacing: '$tight',
  margin: 0,

  '@bp2': {
    fontSize: '$8',
  },
});

export const SectionDescription = styled('p', {
  fontSize: '$4',
  color: '$foregroundMuted',
  maxWidth: '600px',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '$4',
});
