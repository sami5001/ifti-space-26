import React, { Component, ErrorInfo, ReactNode } from 'react';
import { styled } from 'stitches.config';

const ErrorWrapper = styled('div', {
  backgroundColor: '$background',
  color: '$foreground',
  padding: '$6',
  minHeight: '50vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ErrorContent = styled('div', {
  textAlign: 'center',
  maxWidth: '500px',
});

const ErrorTitle = styled('h1', {
  fontSize: '$6',
  fontWeight: '$bold',
  color: '$foreground',
  marginBottom: '$3',
});

const ErrorMessage = styled('p', {
  fontSize: '$3',
  color: '$foregroundMuted',
  marginBottom: '$4',
  lineHeight: '$5',
});

const RetryButton = styled('button', {
  fontSize: '$3',
  color: '$accent',
  backgroundColor: 'transparent',
  border: '1px solid $accent',
  borderRadius: '$2',
  padding: '$2 $4',
  cursor: 'pointer',
  transition: 'all 0.15s ease',

  '&:hover': {
    backgroundColor: '$accent',
    color: 'white',
  },
});

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorWrapper>
          <ErrorContent>
            <ErrorTitle>Something went wrong</ErrorTitle>
            <ErrorMessage>
              {this.state.error?.message || 'An unexpected error occurred'}
            </ErrorMessage>
            <RetryButton onClick={this.handleRetry}>Try again</RetryButton>
          </ErrorContent>
        </ErrorWrapper>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
