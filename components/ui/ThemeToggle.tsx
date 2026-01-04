'use client';

import React from 'react';
import { styled } from 'stitches.config';
import { useTheme } from '../../contexts/ThemeContext';
import { SunIcon, MoonIcon, DesktopIcon } from '@radix-ui/react-icons';

const ToggleButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  padding: 0,
  border: 'none',
  borderRadius: '$round',
  backgroundColor: 'transparent',
  color: '$foreground',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, color 0.2s ease',

  '&:hover': {
    backgroundColor: '$backgroundSubtle',
  },

  '&:focus-visible': {
    outline: '2px solid $accent',
    outlineOffset: '2px',
  },

  '& svg': {
    width: '20px',
    height: '20px',
  },
});

const IconWrapper = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.3s ease, opacity 0.3s ease',
});

const getIcon = (theme: string) => {
  switch (theme) {
    case 'light':
      return <SunIcon />;
    case 'dark':
      return <MoonIcon />;
    default:
      return <DesktopIcon />;
  }
};

const getNextMode = (theme: string) => {
  switch (theme) {
    case 'light':
      return 'dark';
    case 'dark':
      return 'auto';
    default:
      return 'light';
  }
};

const getModeLabel = (theme: string) => {
  switch (theme) {
    case 'light':
      return 'Light';
    case 'dark':
      return 'Dark';
    default:
      return 'Auto';
  }
};

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleButton
      onClick={toggleTheme}
      aria-label={`${getModeLabel(theme)} mode, switch to ${getNextMode(theme)}`}
      title={`${getModeLabel(theme)} mode, switch to ${getNextMode(theme)}`}
    >
      <IconWrapper>{getIcon(theme)}</IconWrapper>
    </ToggleButton>
  );
}
