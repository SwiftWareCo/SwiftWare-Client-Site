import "./global.css";
import type { Metadata } from "next";
import { Inter, Outfit, Lora } from "next/font/google";
import Script from "next/script";

// Main site font
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

// Dentist site fonts
const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
});

const lora = Lora({
    subsets: ["latin"],
    variable: "--font-lora",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://swiftware.ca"),
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${outfit.variable} ${lora.variable}`}
            suppressHydrationWarning
        >
            <head>
                <link
                    rel="stylesheet"
                    href="https://assets.calendly.com/assets/external/widget.css"
                />
                <link
                    rel="preconnect"
                    href="https://www.google-analytics.com"
                />
                <link
                    rel="preconnect"
                    href="https://www.googletagmanager.com"
                />
            </head>
            <body className="antialiased overflow-x-hidden">
                {children}

                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-CDYGKBBPDC"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CDYGKBBPDC');
          `}
                </Script>
                <Script
                    src="https://assets.calendly.com/assets/external/widget.js"
                    strategy="lazyOnload"
                />
            </body>
        </html>
    );
}
