/**
 * Color helper - uses colorSchemes.ts as single source of truth
 * All components use this for consistent color access
 */
import { colorSchemes, getColorSchemeForPath } from '@/constants/colorSchemes';

export function getColorsFromPath(pathname: string) {
  const schemeKey = getColorSchemeForPath(pathname);
  const scheme = colorSchemes[schemeKey];
  
  return {
    primary: scheme.primary,
    secondary: scheme.secondary,
  };
}

// Helper to get RGB values for rgba() usage
export function getColorsRGBFromPath(pathname: string) {
  const schemeKey = getColorSchemeForPath(pathname);
  const scheme = colorSchemes[schemeKey];
  
  // Convert hex to RGB
  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '59, 130, 246'; // fallback to default blue
  };
  
  return {
    primaryRGB: hexToRgb(scheme.primary),
    secondaryRGB: hexToRgb(scheme.secondary),
  };
}
