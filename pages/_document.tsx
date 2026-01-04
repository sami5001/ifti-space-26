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
        <link rel="icon" href="/favicon.ico" />

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
