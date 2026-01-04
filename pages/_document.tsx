import { Html, Head, Main, NextScript } from 'next/document';
import { getCssText, darkTheme } from 'stitches.config';

const FONT_INTER = 'https://fonts.googleapis.com/css?family=Inter:400,500,600,700&display=swap';
const FONT_FIRA_CODE = 'https://fonts.googleapis.com/css?family=Fira+Mono&display=swap';

// Script to prevent flash of wrong theme on page load
const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme-preference');
    var isDark = theme === 'dark' ||
      (theme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('${darkTheme.className}');
    }
  } catch (e) {}
})();
`;

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />

        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0071e3" />

        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={FONT_INTER} rel="preload" as="style" />
        <link href={FONT_INTER} rel="stylesheet" media="all" />
        <link href={FONT_FIRA_CODE} rel="preload" as="style" />
        <link href={FONT_FIRA_CODE} rel="stylesheet" media="all" />
        <noscript>
          <link href={FONT_INTER} rel="stylesheet" />
          <link href={FONT_FIRA_CODE} rel="stylesheet" />
        </noscript>
      </Head>
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
