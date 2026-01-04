'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { styled, keyframes } from 'stitches.config';
import { Cross2Icon } from '@radix-ui/react-icons';

const overlayShow = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const contentShow = keyframes({
  from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
  to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const Overlay = styled(Dialog.Overlay, {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  backdropFilter: 'blur(4px)',
  zIndex: 1000,
});

const Content = styled(Dialog.Content, {
  backgroundColor: '$backgroundElevated',
  borderRadius: '$4',
  boxShadow: '$lg',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '640px',
  maxHeight: '85vh',
  overflow: 'auto',
  padding: '$6',
  animation: `${contentShow} 200ms cubic-bezier(0.16, 1, 0.3, 1)`,
  zIndex: 1001,

  '&:focus': {
    outline: 'none',
  },

  '@bp1': {
    padding: '$7',
  },
});

const CloseButton = styled(Dialog.Close, {
  position: 'absolute',
  top: '$4',
  right: '$4',
  width: '32px',
  height: '32px',
  borderRadius: '$round',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$backgroundSubtle',
  border: '1px solid $borderSubtle',
  color: '$foregroundMuted',
  cursor: 'pointer',
  transition: 'all 0.15s ease',

  '&:hover': {
    backgroundColor: '$border',
    color: '$foreground',
  },

  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px $colors$accent',
  },

  '& svg': {
    width: '16px',
    height: '16px',
  },
});

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Modal({ open, onOpenChange, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <CloseButton aria-label="Close">
            <Cross2Icon />
          </CloseButton>
          {children}
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Modal;
