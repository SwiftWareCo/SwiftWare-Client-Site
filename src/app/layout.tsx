import "./global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

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

        <ClientLayoutWrapper>
          <main id="main" tabIndex={-1} className="relative">
            {children}
          </main>
        </ClientLayoutWrapper>


      </body>
    </html>
  );
}