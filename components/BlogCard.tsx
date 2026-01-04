import React, { FC } from 'react';
import NextLink from 'next/link';
import { parseISO, format } from 'date-fns';
import type { BlogPost } from '@lib/types';
import { styled } from 'stitches.config';
import { Card } from './ui/Card';

const CardLink = styled('a', {
  display: 'block',
  textDecoration: 'none',
  height: '100%',
});

const StyledCard = styled(Card, {
  height: '100%',
  transition: 'all 0.3s ease',

  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '$cardHover',
    borderColor: '$border',
  },
});

const Title = styled('h3', {
  fontSize: '$5',
  fontWeight: '$semibold',
  color: '$foreground',
  marginBottom: '$2',
  lineHeight: '$4',
});

const DraftBadge = styled('span', {
  display: 'inline-block',
  fontSize: '$1',
  fontWeight: '$medium',
  color: '$foregroundMuted',
  backgroundColor: '$backgroundSubtle',
  padding: '$1 $2',
  borderRadius: '$round',
  marginLeft: '$2',
  verticalAlign: 'middle',
});

const DateText = styled('time', {
  fontSize: '$2',
  color: '$foregroundMuted',
  fontFamily: '$mono',
});

const ReadingTime = styled('span', {
  fontSize: '$2',
  color: '$foregroundSubtle',
  marginLeft: '$3',
});

export const BlogCard: FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <NextLink href={`/blog/${post.slug}`} passHref legacyBehavior>
      <CardLink aria-label={`Read ${post.title}`}>
        <StyledCard padding="md" interactive>
          <Title>
            {post.title}
            {post.draft && <DraftBadge>Draft</DraftBadge>}
          </Title>
          <DateText dateTime={post.publishedAt}>
            {format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
            {post.readingTime && <ReadingTime>{post.readingTime.text}</ReadingTime>}
          </DateText>
        </StyledCard>
      </CardLink>
    </NextLink>
  );
};

export default BlogCard;
