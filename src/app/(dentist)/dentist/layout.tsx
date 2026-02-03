import type { Metadata } from "next";
import { DentistHeader } from "@/components/dentist/DentistHeader";
import { DentistFooter } from "@/components/dentist/DentistFooter";

export const metadata: Metadata = {
    title: "SwiftWare Dental Marketing — Fill Your Schedule While You Sleep",
    description:
        "Automated dental marketing that brings patients to your door. SEO, multi-platform social media, automated booking, and patient retention systems designed exclusively for dental practices.",
    alternates: {
        canonical: "https://swiftware.ca/dentist",
    },
    openGraph: {
        title: "SwiftWare Dental Marketing — Fill Your Schedule While You Sleep",
        description:
            "Automated dental marketing that brings patients to your door. SEO, multi-platform social media, automated booking, and patient retention systems.",
        url: "https://swiftware.ca/dentist",
        siteName: "SwiftWare Dental",
        locale: "en_CA",
        images: [
            {
                url: "/og-dentist.png",
                width: 1200,
                height: 630,
                alt: "SwiftWare Dental Marketing",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "SwiftWare Dental Marketing — Fill Your Schedule While You Sleep",
        description:
            "Automated dental marketing that brings patients to your door. SEO, multi-platform social media, automated booking, and patient retention systems.",
        images: ["/og-dentist.png"],
    },
};

export default function DentistLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className=" text-slate-900 font-[family-name:var(--font-outfit)]">
         
            <DentistHeader />
            <main id="main" tabIndex={-1} className="relative">
                {children}
            </main>
            <DentistFooter />
        </div>
    );
}
