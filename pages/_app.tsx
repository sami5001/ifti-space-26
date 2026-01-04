import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useAnalytics } from '@lib/analytics';
import { Footer } from '@components/Footer';
import { ErrorBoundary } from '@components/ErrorBoundary';
import { ThemeProvider } from '../contexts/ThemeContext';
import { globalStyles } from '@styles/global';
import { styled } from 'stitches.config';
import { siteConfig } from '@config/site';

const AppContainer = styled('div', {
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
});

const MainContent = styled('div', {
  flex: 1,
});

function App({ Component, pageProps }: AppProps) {
  globalStyles();
  useAnalytics();

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Head>
          <title>{siteConfig.name}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <AppContainer>
          <MainContent>
            <Component {...pageProps} />
          </MainContent>

          <Footer />
        </AppContainer>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
