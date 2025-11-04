'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';
import { ColorSchemeKey, colorSchemes } from '@/constants/colorSchemes';

interface ColorSchemeContextValue {
  scheme: ColorSchemeKey;
  setScheme: (scheme: ColorSchemeKey) => void;
  colors: typeof colorSchemes['default'];
}

const ColorSchemeContext = createContext<ColorSchemeContextValue | undefined>(
  undefined
);

export function ColorSchemeProvider({ children }: { children: ReactNode }) {
  const [scheme, setSchemeState] = useState<ColorSchemeKey>('default');

  const setScheme = useCallback((newScheme: ColorSchemeKey) => {
    setSchemeState(newScheme);
  }, []);

  const value: ColorSchemeContextValue = {
    scheme,
    setScheme,
    colors: colorSchemes[scheme],
  };

  return (
    <ColorSchemeContext.Provider value={value}>
      {children}
    </ColorSchemeContext.Provider>
  );
}

export function useColorScheme(): ColorSchemeContextValue {
  const ctx = useContext(ColorSchemeContext);
  if (!ctx) {
    throw new Error(
      'useColorScheme must be used within a ColorSchemeProvider'
    );
  }
  return ctx;
}
