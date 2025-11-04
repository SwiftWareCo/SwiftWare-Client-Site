import './global.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import ClientApp from '@/components/ClientApp';
import SchemaMarkup from '@/components/SchemaMarkup';
import { ColorSchemeProvider } from '@/context/ColorSchemeContext';
import { ColorSchemeWrapper } from '@/components/ColorSchemeWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Swiftware — Custom Software Development in Canada',
  description:
    'Swiftware crafts bespoke software solutions for Canadian and US businesses. Custom CRMs, tee sheet management, AI/ML automation, and web portals. Based in Richmond, BC.',
  metadataBase: new URL('https://swiftware.ca'),
  alternates: {
    canonical: 'https://swiftware.ca',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='scroll-smooth'>
      <head>
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-CDYGKBBPDC'
          strategy='afterInteractive'
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CDYGKBBPDC');
          `}
        </Script>
      </head>
      <body
        className={`${inter.className} bg-zinc-950 text-zinc-100 antialiased overflow-x-hidden`}
      >
        <SchemaMarkup />
        {/* Enhanced background with animated elements - always present */}
        <div className='fixed inset-0 -z-10'>
          {/* Base gradient */}
          <div className='absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950' />

          {/* Animated gradient overlay */}
          <div className='absolute inset-0 bg-animated-gradient' />

          {/* Grid pattern */}
          <div className='absolute inset-0 bg-grid opacity-40' />

          {/* Floating orbs - hidden on mobile to prevent layout issues */}
          <div className='hidden md:block absolute top-20 left-1/4 size-96 bg-blue-500/5 rounded-full blur-3xl float-slow' />
          <div className='hidden md:block absolute bottom-20 right-1/4 size-80 bg-purple-500/5 rounded-full blur-3xl float-medium' />
          <div
            className='hidden md:block absolute top-1/2 left-1/3 size-64 bg-emerald-500/3 rounded-full blur-3xl float-slow'
            style={{ animationDelay: '2s' }}
          />
        </div>

        {/* Skip link */}
        <a
          href='#main'
          className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 
                   rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 
                   text-white z-50 shadow-brand-glow font-medium'
        >
          Skip to main content
        </a>

        <ColorSchemeProvider>
          <ColorSchemeWrapper>
            <ClientApp>
              <main id='main' tabIndex={-1} className='relative'>
                {children}
              </main>
            </ClientApp>
          </ColorSchemeWrapper>
        </ColorSchemeProvider>
      </body>
    </html>
  );
}
