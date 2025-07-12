import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SwiftWare | Enterprise Software Solutions for Modern Businesses",
  description: "Streamline your business operations with SwiftWare's comprehensive software solutions. From automation to analytics, we help companies achieve digital transformation.",
  keywords: ["software solutions", "business automation", "enterprise software", "digital transformation", "SaaS", "business intelligence"],
  authors: [{ name: "SwiftWare" }],
  creator: "SwiftWare",
  publisher: "SwiftWare",
  openGraph: {
    title: "SwiftWare | Enterprise Software Solutions for Modern Businesses",
    description: "Streamline your business operations with SwiftWare's comprehensive software solutions. From automation to analytics, we help companies achieve digital transformation.",
    url: "https://swiftware.com",
    siteName: "SwiftWare",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SwiftWare - Enterprise Software Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SwiftWare | Enterprise Software Solutions for Modern Businesses",
    description: "Streamline your business operations with SwiftWare's comprehensive software solutions. From automation to analytics, we help companies achieve digital transformation.",
    images: ["/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
