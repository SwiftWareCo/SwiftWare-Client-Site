import type { Metadata } from 'next';
import UnifiedHeader from '@/components/UnifiedHeader';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/SchemaMarkup';
import { ThemeProvider } from '@/components/providers/theme-provider';

export const metadata: Metadata = {
  title: 'Swiftware — Custom Software Development in Canada',
  description:
    'Swiftware crafts bespoke software solutions for Canadian and US businesses. Custom CRMs, tee sheet management, AI/ML automation, and web portals. Based in Richmond, BC.',
  alternates: {
    canonical: 'https://swiftware.ca',
  },
  openGraph: {
    title: 'Swiftware — Custom Software Development in Canada',
    description:
      'Swiftware crafts bespoke software solutions for Canadian and US businesses. Custom CRMs, tee sheet management, AI/ML automation, and web portals. Based in Richmond, BC.',
    url: 'https://swiftware.ca',
    siteName: 'Swiftware',
    locale: 'en_CA',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Swiftware' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swiftware — Custom Software Development in Canada',
    description:
      'Swiftware crafts bespoke software solutions for Canadian and US businesses. Custom CRMs, tee sheet management, AI/ML automation, and web portals. Based in Richmond, BC.',
    images: ['/og.png'],
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='dark font-[family-name:var(--font-inter)]'>
      <SchemaMarkup />

      {/* Skip link */}
      <a
        href='#main'
        className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
                 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2
                 text-white z-50 shadow-brand-glow font-medium'
      >
        Skip to main content
      </a>
      <ThemeProvider
        attribute='class'
        defaultTheme='dark'
        forcedTheme='dark'
        enableSystem={false}
        disableTransitionOnChange
      >
        <main id='main' tabIndex={-1} className='relative'>
          <UnifiedHeader />
          {children}
          <Footer />
        </main>
      </ThemeProvider>
    </div>
  );
}
