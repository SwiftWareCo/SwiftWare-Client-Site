/**
 * Color Scheme Token Definitions
 * Define color palettes for each service area
 */

export const colorSchemes = {
  brand: {
    primary: '#06B6D4',      // Cyan
    secondary: '#0891B2',    // Teal
    accent: '#F0F9FF',       // Light background
    dark: '#082F46',         // Dark variant
    gradient: 'from-cyan-500 to-teal-500',
  },
  marketing: {
    primary: '#10B981',      // Emerald Green
    secondary: '#059669',    // Deep Green
    accent: '#84CC16',       // Lime
    dark: '#064E3B',         // Dark variant
    gradient: 'from-emerald-500 to-green-600',
  },
  automation: {
    primary: '#A855F7',      // Electric Purple
    secondary: '#7C3AED',    // Violet
    accent: '#EC4899',       // Pink
    dark: '#581C87',         // Dark variant
    gradient: 'from-purple-500 to-violet-600',
  },
  software: {
    primary: '#4F46E5',      // Indigo
    secondary: '#3B82F6',    // Blue
    accent: '#60A5FA',       // Sky
    dark: '#1E3A8A',         // Dark variant
    gradient: 'from-indigo-600 to-blue-600',
  },
  default: {
    primary: '#3B82F6',      // Blue
    secondary: '#8B5CF6',    // Purple
    accent: '#60A5FA',       // Sky
    dark: '#1E40AF',         // Dark variant
    gradient: 'from-blue-600 to-purple-600',
  }
};

export type ColorSchemeKey = keyof typeof colorSchemes;

export const serviceColorMap: Record<string, ColorSchemeKey> = {
  'brand-design': 'brand',
  'digital-marketing-seo': 'marketing',
  'ai-automation': 'automation',
  'custom-software': 'software',
  'crm': 'software',
  'ai-rag': 'software',  // Part of custom-software, uses software colors
  'golf': 'software',
  'web-portals': 'software',  // Part of custom-software, uses software colors
  'home': 'default',
  'case-studies': 'default',
  'about': 'default',
};

export function getColorSchemeForPath(path: string): ColorSchemeKey {
  // Extract the service from the path
  const segments = path.split('/').filter(Boolean);
  const service = segments[0] || 'home';

  return serviceColorMap[service] || 'default';
}
