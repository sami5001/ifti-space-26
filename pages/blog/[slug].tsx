import React from 'react';
import NextLink from 'next/link';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXComponents } from 'mdx/types';
import { parseISO, format } from 'date-fns';
import TitleAndMetaTags from '@components/TitleAndMetaTags';
import { components } from '@components/MdxComponents';
import { NavBar, Container } from '@components/ui';
import { TwoColumnLayout, SidebarNav, SidebarSection, SidebarLink } from '@components/layouts';
import { styled } from 'stitches.config';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import { ArrowLeftIcon, Share1Icon } from '@radix-ui/react-icons';

import type { BlogPost } from '@lib/types';
import { getAllPosts, getPostBySlug } from '@lib/posts';
import { siteConfig } from '@config/site';

const PageWrapper = styled('div', {
  minHeight: '100vh',
  backgroundColor: '$background',
});

const ContentContainer = styled(Container, {
  paddingTop: '$6',
  paddingBottom: '$12',

  '@bp2': {
    paddingTop: '$8',
  },
});

const BackLink = styled('a', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '$2',
  fontSize: '$2',
  fontWeight: '$medium',
  color: '$foregroundMuted',
  textDecoration: 'none',
  marginBottom: '$6',
  transition: 'color 0.15s ease',

  '&:hover': {
    color: '$accent',
  },

  '& svg': {
    width: '14px',
    height: '14px',
  },
});

const ArticleHeader = styled('header', {
  marginBottom: '$8',
});

const Title = styled('h1', {
  fontSize: '$8',
  fontWeight: '$bold',
  color: '$foreground',
  letterSpacing: '$tight',
  lineHeight: '$2',
  marginBottom: '$4',

  '@bp2': {
    fontSize: '$9',
  },
});

const DraftBadge = styled('span', {
  display: 'inline-block',
  fontSize: '$2',
  fontWeight: '$medium',
  color: '$foregroundMuted',
  backgroundColor: '$backgroundSubtle',
  padding: '$2 $4',
  borderRadius: '$round',
  marginLeft: '$3',
  verticalAlign: 'middle',
});

const MetaRow = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  fontSize: '$3',
  color: '$foregroundMuted',
});

const DateText = styled('time', {
  fontFamily: '$mono',
});

const ReadingTime = styled('span', {
  color: '$foregroundSubtle',
});

const ArticleContent = styled('article', {
  '& > *': {
    marginBottom: '$5',
  },

  '& > *:last-child': {
    marginBottom: 0,
  },
});

const Divider = styled('hr', {
  border: 'none',
  height: '1px',
  backgroundColor: '$borderSubtle',
  margin: '$8 0',
});

const ShareSection = styled('div', {
  padding: '$6',
  backgroundColor: '$backgroundSubtle',
  borderRadius: '$3',
});

const ShareTitle = styled('h3', {
  fontSize: '$4',
  fontWeight: '$semibold',
  color: '$foreground',
  margin: '0 0 $3',
});

const ShareText = styled('p', {
  fontSize: '$3',
  color: '$foregroundMuted',
  margin: 0,
});

const ShareLink = styled('a', {
  color: '$accent',
  fontWeight: '$medium',
  textDecoration: 'none',
  transition: 'color 0.15s ease',

  '&:hover': {
    color: '$accentHover',
    textDecoration: 'underline',
  },
});

const SidebarTitle = styled('p', {
  fontSize: '$1',
  fontWeight: '$semibold',
  color: '$foregroundSubtle',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '$3',
  paddingLeft: '$3',
});

const QuickLink = styled('a', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
  padding: '$2 $3',
  fontSize: '$2',
  color: '$foregroundMuted',
  textDecoration: 'none',
  borderRadius: '$2',
  transition: 'all 0.15s ease',

  '&:hover': {
    color: '$accent',
    backgroundColor: '$backgroundSubtle',
  },

  '& svg': {
    width: '14px',
    height: '14px',
  },
});

interface PostPageProps {
  post: BlogPost;
  mdxSource: MDXRemoteSerializeResult;
  recentPosts: BlogPost[];
}

export default function PostPage({ post, mdxSource, recentPosts }: PostPageProps) {
  const twitterHandle = siteConfig.social.twitter ? `@${siteConfig.social.twitter}` : '';
  const twitterShare = `https://twitter.com/intent/tweet?text="${encodeURIComponent(post.title)}"${twitterHandle ? ` by ${twitterHandle}` : ''}&url=${siteConfig.url}/blog/${post.slug}`;

  const sidebar = (
    <SidebarNav>
      <NextLink href="/blog" passHref legacyBehavior>
        <QuickLink>
          <ArrowLeftIcon />
          Back to Blog
        </QuickLink>
      </NextLink>

      <div style={{ marginTop: '24px' }}>
        <SidebarTitle>On this page</SidebarTitle>
        <QuickLink href={twitterShare} target="_blank" rel="noopener noreferrer">
          <Share1Icon />
          Share on Twitter
        </QuickLink>
      </div>

      {recentPosts.length > 0 && (
        <SidebarSection title="More Posts" defaultOpen>
          {recentPosts.slice(0, 4).map((p) => (
            <SidebarLink key={p.slug} href={`/blog/${p.slug}`} indent={1}>
              {p.title}
            </SidebarLink>
          ))}
        </SidebarSection>
      )}
    </SidebarNav>
  );

  return (
    <PageWrapper>
      <TitleAndMetaTags
        title={`${post.title} - ${siteConfig.name}`}
        description={post.title}
        image={post.ogImage || '/images/hero/hero-writing.jpg'}
      />
      <NavBar />

      <ContentContainer>
        <TwoColumnLayout sidebar={sidebar}>
          <NextLink href="/blog" passHref legacyBehavior>
            <BackLink className="mobile-back-link">
              <ArrowLeftIcon />
              Back to Blog
            </BackLink>
          </NextLink>

          <ArticleHeader>
            <Title>
              {post.title}
              {post.draft && <DraftBadge>Draft</DraftBadge>}
            </Title>
            <MetaRow>
              <DateText dateTime={post.publishedAt}>
                {format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
              </DateText>
              {post.readingTime && (
                <>
                  <span>·</span>
                  <ReadingTime>{post.readingTime.text}</ReadingTime>
                </>
              )}
            </MetaRow>
          </ArticleHeader>

          <ArticleContent>
            <MDXRemote {...mdxSource} components={components satisfies MDXComponents} />
          </ArticleContent>

          <Divider />

          <ShareSection>
            <ShareTitle>Share this article</ShareTitle>
            <ShareText>
              Found this interesting?{' '}
              <ShareLink href={twitterShare} target="_blank" rel="noopener noreferrer">
                Share on Twitter
              </ShareLink>
            </ShareText>
          </ShareSection>
        </TwoColumnLayout>
      </ContentContainer>
    </PageWrapper>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps(context: { params: { slug: string } }) {
  const post = getPostBySlug(context.params.slug);
  const allPosts = getAllPosts();

  if (!post) {
    return {
      notFound: true,
    };
  }

  // Get recent posts excluding current one
  const recentPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 5);

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, [rehypePrism, { ignoreMissing: true }]],
    },
  });

  return { props: { post, mdxSource, recentPosts } };
}
