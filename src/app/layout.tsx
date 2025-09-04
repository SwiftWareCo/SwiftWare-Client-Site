import "./global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientApp from "@/components/ClientApp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swiftware — Custom Software, Meticulously Made",
  description:
    "Swiftware crafts bespoke software: CRMs with mobile apps, private-club tee management, and AI/ML (RAG) automations.",
  metadataBase: new URL("https://swiftware.example"),
  openGraph: {
    title: "Swiftware",
    description: "Meticulous software. Built fast — and built to last.",
    url: "https://swiftware.example",
    siteName: "Swiftware",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Swiftware" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swiftware",
    description: "Meticulous software. Built fast — and built to last.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 antialiased overflow-x-hidden`}>
        {/* Enhanced background with animated elements - always present */}
        <div className="fixed inset-0 -z-10">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
          
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-animated-gradient" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid opacity-40" />
          
          {/* Floating orbs */}
          <div className="absolute top-20 left-1/4 size-96 bg-blue-500/5 rounded-full blur-3xl float-slow" />
          <div className="absolute bottom-20 right-1/4 size-80 bg-purple-500/5 rounded-full blur-3xl float-medium" />
          <div className="absolute top-1/2 left-1/3 size-64 bg-emerald-500/3 rounded-full blur-3xl float-slow" style={{ animationDelay: '2s' }} />
        </div>

        {/* Skip link */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 
                   rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 
                   text-white z-50 shadow-brand-glow font-medium"
        >
          Skip to main content
        </a>

        <ClientApp>
          <main id="main" tabIndex={-1} className="relative">
            {children}
          </main>
        </ClientApp>
      </body>
    </html>
  );
}