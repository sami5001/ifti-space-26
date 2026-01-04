'use client';

import React, { useState } from 'react';
import { styled, keyframes } from 'stitches.config';
import { PaperPlaneIcon, CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';

const fadeUp = keyframes({
  from: { opacity: 0, transform: 'translateY(10px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const FormWrapper = styled('div', {
  maxWidth: '560px',
  margin: '0 auto',
});

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$5',
});

const FormGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
});

const Label = styled('label', {
  fontSize: '$3',
  fontWeight: '$medium',
  color: '$foreground',
});

const Input = styled('input', {
  padding: '$3 $4',
  fontSize: '$3',
  color: '$foreground',
  backgroundColor: '$backgroundSubtle',
  border: '1px solid $borderSubtle',
  borderRadius: '$2',
  transition: 'all 0.15s ease',
  outline: 'none',

  '&:focus': {
    borderColor: '$accent',
    boxShadow: '0 0 0 3px rgba(0, 113, 227, 0.15)',
  },

  '&::placeholder': {
    color: '$foregroundSubtle',
  },

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

const TextArea = styled('textarea', {
  padding: '$3 $4',
  fontSize: '$3',
  color: '$foreground',
  backgroundColor: '$backgroundSubtle',
  border: '1px solid $borderSubtle',
  borderRadius: '$2',
  transition: 'all 0.15s ease',
  outline: 'none',
  resize: 'vertical',
  minHeight: '160px',
  fontFamily: '$sans',

  '&:focus': {
    borderColor: '$accent',
    boxShadow: '0 0 0 3px rgba(0, 113, 227, 0.15)',
  },

  '&::placeholder': {
    color: '$foregroundSubtle',
  },

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

const SubmitButton = styled('button', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',
  padding: '$3 $6',
  fontSize: '$3',
  fontWeight: '$medium',
  color: 'white',
  backgroundColor: '$accent',
  border: 'none',
  borderRadius: '$round',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  alignSelf: 'flex-start',

  '&:hover:not(:disabled)': {
    backgroundColor: '$accentHover',
    transform: 'translateY(-1px)',
  },

  '&:disabled': {
    opacity: 0.7,
    cursor: 'not-allowed',
  },

  '& svg': {
    width: '16px',
    height: '16px',
  },
});

const StatusMessage = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
  padding: '$4',
  borderRadius: '$2',
  fontSize: '$3',
  animation: `${fadeUp} 0.3s ease`,

  '& svg': {
    width: '20px',
    height: '20px',
    flexShrink: 0,
  },

  variants: {
    type: {
      success: {
        backgroundColor: 'rgba(52, 199, 89, 0.1)',
        color: '#34c759',
        border: '1px solid rgba(52, 199, 89, 0.2)',
      },
      error: {
        backgroundColor: 'rgba(255, 59, 48, 0.1)',
        color: '#ff3b30',
        border: '1px solid rgba(255, 59, 48, 0.2)',
      },
    },
  },
});

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface ContactFormProps {
  accessKey?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ accessKey }) => {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accessKey) {
      setStatus('error');
      setErrorMessage('Contact form is not configured. Please add a Web3Forms access key.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    formData.append('access_key', accessKey);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  if (status === 'success') {
    return (
      <FormWrapper>
        <StatusMessage type="success">
          <CheckCircledIcon />
          <span>Thank you for your message! I will get back to you soon.</span>
        </StatusMessage>
      </FormWrapper>
    );
  }

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        {/* Honeypot field for spam protection */}
        <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            required
            disabled={status === 'submitting'}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="your@email.com"
            required
            disabled={status === 'submitting'}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">Message</Label>
          <TextArea
            id="message"
            name="message"
            placeholder="Your message..."
            required
            disabled={status === 'submitting'}
          />
        </FormGroup>

        {status === 'error' && (
          <StatusMessage type="error">
            <CrossCircledIcon />
            <span>{errorMessage}</span>
          </StatusMessage>
        )}

        <SubmitButton type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            'Sending...'
          ) : (
            <>
              Send Message
              <PaperPlaneIcon />
            </>
          )}
        </SubmitButton>
      </Form>
    </FormWrapper>
  );
};

export default ContactForm;
