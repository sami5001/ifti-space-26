import Head from 'next/head';
import { useRouter } from 'next/router';
import { siteConfig } from '@config/site';

type TitleAndMetaTagsProps = {
  url?: string;
  pathname?: string;
  title?: string;
  description?: string;
  image?: string;
};

export default function TitleAndMetaTags({
  url = siteConfig.url,
  pathname,
  title = siteConfig.name,
  description = siteConfig.description,
  image,
}: TitleAndMetaTagsProps) {
  const router = useRouter();

  const path = pathname || router.asPath;
  const domain = `${url}${path}`;

  // Build OG image URL using our API route
  const ogImageParams = new URLSearchParams({
    title,
    description,
    ...(image && { image }),
  });
  const ogImage = `${url}/api/og?${ogImageParams.toString()}`;

  return (
    <Head>
      <title>
        {title} — {description}
      </title>
      <meta name="description" content={description} />

      <meta property="og:url" content={domain} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />

      <meta name="twitter:url" content={domain} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {siteConfig.social.twitter && (
        <meta name="twitter:site" content={`@${siteConfig.social.twitter}`} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      {siteConfig.social.twitter && (
        <meta name="twitter:creator" content={`@${siteConfig.social.twitter}`} />
      )}
    </Head>
  );
}
