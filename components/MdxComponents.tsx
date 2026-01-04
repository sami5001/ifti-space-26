import React from 'react';
import NextLink from 'next/link';
import NextImage from 'next/image';
import * as Collapsible from '@radix-ui/react-collapsible';
import { styled, css } from 'stitches.config';

// Styled components for MDX content with clean academic typography

const Heading1 = styled('h1', {
  fontSize: '$8',
  fontWeight: '$bold',
  color: '$foreground',
  letterSpacing: '$tight',
  lineHeight: '$2',
  marginBottom: '$6',
  marginTop: '$8',

  '@bp2': {
    fontSize: '$9',
  },
});

const Heading2 = styled('h2', {
  fontSize: '$6',
  fontWeight: '$semibold',
  color: '$foreground',
  letterSpacing: '$tight',
  lineHeight: '$3',
  marginTop: '$8',
  marginBottom: '$4',
});

const Heading3 = styled('h3', {
  fontSize: '$5',
  fontWeight: '$semibold',
  color: '$foreground',
  lineHeight: '$4',
  marginTop: '$6',
  marginBottom: '$3',
});

const Heading4 = styled('h4', {
  fontSize: '$4',
  fontWeight: '$semibold',
  color: '$foreground',
  textTransform: 'uppercase',
  letterSpacing: '$wide',
  marginTop: '$5',
  marginBottom: '$3',
});

const Paragraph = styled('p', {
  fontSize: '$4',
  color: '$foregroundMuted',
  lineHeight: '$6',
  marginBottom: '$5',
});

const StyledLink = styled('a', {
  color: '$accent',
  textDecoration: 'none',
  transition: 'color 0.2s ease',

  '&:hover': {
    color: '$accentHover',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  },
});

const Divider = styled('hr', {
  border: 'none',
  height: '1px',
  backgroundColor: '$borderSubtle',
  margin: '$6 0',
});

const UnorderedList = styled('ul', {
  marginBottom: '$5',
  paddingLeft: '$6',
});

const OrderedList = styled('ol', {
  marginBottom: '$5',
  paddingLeft: '$6',
});

const ListItem = styled('li', {
  fontSize: '$4',
  color: '$foregroundMuted',
  lineHeight: '$6',
  marginBottom: '$2',

  '&::marker': {
    color: '$foregroundSubtle',
  },
});

const Strong = styled('strong', {
  fontWeight: '$semibold',
  color: '$foreground',
});

const Figure = styled('figure', {
  margin: '$6 0',

  '@bp1': {
    margin: '$8 -$4',
  },
});

const FigCaption = styled('figcaption', {
  textAlign: 'center',
  fontSize: '$2',
  lineHeight: '$5',
  fontFamily: '$mono',
  color: '$foregroundSubtle',
  marginTop: '$3',
});

const ImageWrapper = styled('div', {
  margin: '$6 0',
  borderRadius: '$3',
  overflow: 'hidden',

  '@bp1': {
    margin: '$6 -$4',
  },
});

const VideoWrapper = styled('div', {
  margin: '$6 0',
  borderRadius: '$3',
  overflow: 'hidden',

  '@bp1': {
    margin: '$6 -$4',
  },

  '& video': {
    width: '100%',
    display: 'block',
  },
});

const IframeWrapper = styled('div', {
  marginBottom: '$5',
});

const Blockquote = styled('blockquote', {
  margin: '$6 0',
  paddingLeft: '$5',
  borderLeft: '3px solid $accent',
  color: '$foregroundMuted',
  fontStyle: 'italic',

  '& p': {
    marginBottom: 0,
  },
});

const Pre = styled('pre', {
  margin: '$5 0',
  padding: '$5',
  backgroundColor: '$backgroundSubtle',
  borderRadius: '$3',
  overflow: 'auto',
  fontSize: '$3',
  lineHeight: '$5',
  fontFamily: '$mono',

  '@bp1': {
    margin: '$5 -$4',
    borderRadius: '$3',
  },

  '& code': {
    backgroundColor: 'transparent',
    padding: 0,
    borderRadius: 0,
  },

  // Syntax highlighting tokens
  '& .token.comment, & .token.prolog, & .token.doctype, & .token.cdata': {
    color: '$foregroundSubtle',
  },

  '& .token.punctuation': {
    color: '$foregroundMuted',
  },

  '& .token.property, & .token.tag, & .token.boolean, & .token.number, & .token.constant, & .token.symbol, & .token.deleted': {
    color: '$accent',
  },

  '& .token.selector, & .token.attr-name, & .token.string, & .token.char, & .token.builtin, & .token.inserted': {
    color: '$green',
  },

  '& .token.operator, & .token.entity, & .token.url': {
    color: '$foreground',
  },

  '& .token.atrule, & .token.attr-value, & .token.keyword': {
    color: '$purple',
  },

  '& .token.function, & .token.class-name': {
    color: '$blue',
  },

  '& .token.regex, & .token.important, & .token.variable': {
    color: '$orange',
  },

  // Line highlighting
  '& .highlight-line': {
    backgroundColor: 'rgba(0, 113, 227, 0.1)',
    margin: '0 -$5',
    padding: '0 $5',
    borderLeft: '3px solid $accent',
  },
});

const InlineCode = styled('code', {
  fontSize: '0.9em',
  fontFamily: '$mono',
  backgroundColor: '$backgroundSubtle',
  padding: '2px 6px',
  borderRadius: '$1',
  color: '$foreground',
});

const CollapsibleTrigger = styled('button', {
  display: 'block',
  marginLeft: 'auto',
  padding: '$2 $4',
  fontSize: '$2',
  fontFamily: '$mono',
  backgroundColor: 'transparent',
  border: '1px solid $border',
  borderRadius: '$2',
  color: '$foregroundMuted',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  '&:hover': {
    borderColor: '$foreground',
    color: '$foreground',
  },
});

const Table = styled('table', {
  width: '100%',
  marginBottom: '$5',
  borderCollapse: 'collapse',
  fontSize: '$3',
});

const TableHead = styled('thead', {
  '& th': {
    textAlign: 'left',
    padding: '$3 $4',
    fontWeight: '$semibold',
    color: '$foreground',
    borderBottom: '2px solid $border',
  },
});

const TableBody = styled('tbody', {
  '& td': {
    padding: '$3 $4',
    color: '$foregroundMuted',
    borderBottom: '1px solid $borderSubtle',
  },

  '& tr:last-child td': {
    borderBottom: 'none',
  },
});

// Box component for custom layouts
const boxCss = css({
  boxSizing: 'border-box',
});

type BoxProps = {
  css?: any;
  as?: keyof React.JSX.IntrinsicElements;
  [key: string]: any;
};

export const components = {
  Box: ({ css: customCss, as: Comp = 'div', ...props }: BoxProps) => {
    const Component = Comp as any;
    return <Component className={boxCss({ css: customCss })} {...props} />;
  },
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Heading1 {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Heading2 {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Heading3 {...props} />,
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Heading4 {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <Paragraph {...props} />,
  a: ({ href = '', ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href.startsWith('http')) {
      return <StyledLink href={href} target="_blank" rel="noopener" {...props} />;
    }
    return (
      <NextLink href={href} passHref legacyBehavior>
        <StyledLink {...props} />
      </NextLink>
    );
  },
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => <Divider {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <UnorderedList {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <OrderedList {...props} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <ListItem {...props} />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => <Strong {...props} />,
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => <Table {...props} />,
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <TableHead {...props} />,
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <TableBody {...props} />,
  Image: ({ children, width, height, ...props }: any) => {
    const hasValidDimensions = typeof width === 'number' && typeof height === 'number';
    return (
      <Figure>
        {hasValidDimensions ? (
          <NextImage width={width} height={height} {...props} />
        ) : (
          <img style={{ width: '100%', height: 'auto' }} {...props} alt={props.alt || ''} />
        )}
        {children && <FigCaption>{children}</FigCaption>}
      </Figure>
    );
  },
  img: ({ width, height, ...props }: any) => {
    const hasValidDimensions = typeof width === 'number' && typeof height === 'number';
    return (
      <ImageWrapper>
        {hasValidDimensions ? (
          <NextImage width={width} height={height} {...props} />
        ) : (
          <img style={{ width: '100%', height: 'auto' }} {...props} alt={props.alt || ''} />
        )}
      </ImageWrapper>
    );
  },
  Video: (props: React.VideoHTMLAttributes<HTMLVideoElement>) => (
    <VideoWrapper>
      <video {...props} autoPlay playsInline muted loop />
    </VideoWrapper>
  ),
  iframe: (props: React.IframeHTMLAttributes<HTMLIFrameElement>) => (
    <IframeWrapper>
      <iframe {...props} />
    </IframeWrapper>
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <Blockquote {...props} />
  ),
  pre: ({ children, ...props }: any) => <Pre {...props}>{children}</Pre>,
  code: Code,
};

// Code component extracted to satisfy React hooks rules
function Code({ children, id, collapsible, className }: any) {
  const isCollapsible = typeof collapsible !== 'undefined';
  const [isOpen, setIsOpen] = React.useState(!isCollapsible);
  const isInline = typeof children === 'string';

  const content = isInline ? (
    <InlineCode className={className}>{children}</InlineCode>
  ) : (
    <code className={className} id={id}>
      {children}
    </code>
  );

  return isCollapsible ? (
    <Collapsible.Root defaultOpen={isOpen} onOpenChange={(newOpen) => setIsOpen(newOpen)}>
      <Collapsible.Trigger asChild>
        <CollapsibleTrigger>{isOpen ? 'Hide' : 'Show'} code</CollapsibleTrigger>
      </Collapsible.Trigger>
      <Collapsible.Content>{content}</Collapsible.Content>
    </Collapsible.Root>
  ) : (
    content
  );
}

export default components;
