import { DentistHero } from "@/components/dentist/DentistHero";
import { ServicesSection } from "@/components/dentist/ServicesSection";
import { SEOAutomationSection } from "@/components/dentist/SEOAutomationSection";
import { SocialMediaSection } from "@/components/dentist/SocialMediaSection";
import { PatientRetentionSection } from "@/components/dentist/PatientRetentionSection";
import { WebsiteShowcaseSection } from "@/components/dentist/WebsiteShowcaseSection";
import { DentistFAQSection } from "@/components/dentist/DentistFAQSection";
import { DentistCTASection } from "@/components/dentist/DentistCTASection";

export default function DentistPage() {
    return (
        <>
            {/* Hero Section - Fill Your Schedule While You Sleep */}
            <DentistHero />

            {/* Services Overview - All services at a glance */}
            <ServicesSection />

            <div
                aria-hidden="true"
                className="h-12 sm:h-16 bg-gradient-to-b from-sky-300 via-teal-100 to-sky-300"
            />

            {/* SEO & Automated Blog Generation - Our AI system that works 24/7 */}
            <SEOAutomationSection />

            <div
                aria-hidden="true"
                className="h-12 sm:h-16 bg-gradient-to-b from-sky-300 via-fuchsia-100 to-pink-200"
            />

            {/* Multi-Platform Social Media Marketing - Every algorithm targeted */}
            <SocialMediaSection />

            {/* Patient Retention System - Booking, reminders, loyalty */}
            <PatientRetentionSection />

            <div
                aria-hidden="true"
                className="h-12 sm:h-16 bg-gradient-to-b from-pink-200 via-teal-100 to-sky-300"
            />

            {/* Professional Website Design - Converting visitors to patients */}
            <WebsiteShowcaseSection />

            {/* FAQ Section */}
            <DentistFAQSection />

            {/* Final CTA - Book a Strategy Call */}
            <DentistCTASection />
        </>
    );
}
