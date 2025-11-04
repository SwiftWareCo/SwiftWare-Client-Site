'use client';

import { ReactNode, useEffect } from 'react';
import { useColorScheme } from '@/context/ColorSchemeContext';
import { ColorSchemeKey, getColorSchemeForPath } from '@/constants/colorSchemes';
import { usePathname } from 'next/navigation';

interface ColorSchemeWrapperProps {
  children: ReactNode;
  scheme?: ColorSchemeKey;
}

export function ColorSchemeWrapper({
  children,
  scheme: overrideScheme,
}: ColorSchemeWrapperProps) {
  const { setScheme } = useColorScheme();
  const pathname = usePathname();

  useEffect(() => {
    // Determine scheme from path or override
    const schemeToUse = overrideScheme || getColorSchemeForPath(pathname);
    setScheme(schemeToUse);
  }, [pathname, overrideScheme, setScheme]);

  return <>{children}</>;
}
