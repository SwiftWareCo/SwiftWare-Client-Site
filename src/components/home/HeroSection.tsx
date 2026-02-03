"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import {
    Sparkles,
    TrendingUp,
    Search,
    Users,
    BarChart3,
    Target,
    Megaphone,
    Rocket,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BackgroundLines } from "@/components/ui/background-lines";
import { RotatingServiceKeywords } from "./RotatingServiceKeywords";
import { RotatingMarketingKeywords } from "./RotatingMarketingKeywords";
import { openCalendlyPopup } from "@/lib/calendly";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { getColorsFromPath, getColorsRGBFromPath } from "@/lib/colors";

/* =============================================================================
   HERO SECTION VARIANTS
   =============================================================================

   This component contains 5 different hero section designs that can be swapped
   by changing the ACTIVE_VARIANT constant below.

   VARIANTS:
   - 'original'          : Generic agency messaging ("One Partner. Four Services.")
   - 'marketing-general' : General marketing focus (not industry-specific)
   - 'dentist-marketing' : Direct dentist marketing focus with patient growth messaging
   - 'seo-rankings'      : SEO and search rankings focus (Google visibility emphasis)
   - 'patient-growth'    : Patient acquisition and practice growth messaging

   TO SWITCH VARIANTS:
   Simply change the ACTIVE_VARIANT value to one of the variant names above.

   USAGE FOR ADS:
   - For general marketing campaigns → use 'marketing-general'
   - For dentist-targeted ads → use 'dentist-marketing' or 'patient-growth'
   - For SEO-focused campaigns → use 'seo-rankings'
   - For general agency positioning → use 'original'

============================================================================= */

type HeroVariant =
    | "original"
    | "marketing-general"
    | "dentist-marketing"
    | "seo-rankings"
    | "patient-growth";

// ⚡ CHANGE THIS TO SWITCH HERO VARIANTS
const ACTIVE_VARIANT: HeroVariant = "marketing-general";

/* =============================================================================
   SHARED COMPONENTS & UTILITIES
============================================================================= */

interface HeroWrapperProps {
    children: React.ReactNode;
    colorsRGB: { primaryRGB: string; secondaryRGB: string };
}

/**
 * Shared wrapper component for all hero variants
 * Provides consistent background gradients and layout
 */
function HeroWrapper({ children, colorsRGB }: HeroWrapperProps) {
    return (
        <section className="relative min-h-[80vh] overflow-hidden pt-28 sm:pt-40 pb-16 sm:pb-24 bg-background">
            {/* Background gradient orbs */}
            <div className="absolute inset-0 -z-20">
                <div
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(circle at 16% 22%, rgba(${colorsRGB.primaryRGB}, 0.16), transparent 68%)`,
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(circle at 82% 30%, rgba(${colorsRGB.secondaryRGB}, 0.14), transparent 72%)`,
                    }}
                />
            </div>

            {/* Animated background lines */}
            <BackgroundLines
                className="absolute inset-0 z-10 bg-transparent pointer-events-none"
                svgOptions={{ duration: 14 }}
            />

            <div className="mx-auto max-w-7xl px-6">{children}</div>
        </section>
    );
}

/* =============================================================================
   VARIANT 1: ORIGINAL
   =============================================================================
   Generic agency positioning - "One Partner. Four Services."
   Best for: General marketing, broad audience targeting
============================================================================= */

function HeroOriginal() {
    const pathname = usePathname();
    const colors = getColorsFromPath(pathname);
    const colorsRGB = getColorsRGBFromPath(pathname);

    return (
        <HeroWrapper colorsRGB={colorsRGB}>
            <div className="text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0 }}
                    className="mb-6"
                >
                    <Badge
                        variant="secondary"
                        className="inline-flex items-center bg-secondary gap-2"
                    >
                        <motion.div
                            animate={{ rotate: [0, 20, -20, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Sparkles
                                className="h-4 w-4"
                                style={{ color: colors.primary }}
                            />
                        </motion.div>
                        <span>Your all-in-one growth partner</span>
                    </Badge>
                </motion.div>

                {/* Main Headlines */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                >
                    <motion.span
                        className="bg-clip-text text-transparent inline-block"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.primary})`,
                        }}
                    >
                        One Partner.
                    </motion.span>
                </motion.h1>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                >
                    <motion.span
                        className="bg-clip-text text-transparent inline-block"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                        }}
                    >
                        Four Services.
                    </motion.span>
                </motion.h1>

                {/* Subtext with rotating keywords */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="mb-8 max-w-3xl mx-auto"
                >
                    <p className="text-lg sm:text-xl mb-4 text-foreground/80">
                        We specialize in <RotatingServiceKeywords />
                    </p>

                    <p className="text-xl sm:text-2xl md:text-3xl text-foreground/70 leading-relaxed">
                        Marketing that ranks. Automation that saves hours.
                        Processes that scale.
                    </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                    className="flex justify-center"
                >
                    <InteractiveHoverButton
                        onClick={() => openCalendlyPopup()}
                        text="Schedule a Consultation"
                        className="w-auto px-10 py-4 text-base"
                    />
                </motion.div>
            </div>
        </HeroWrapper>
    );
}

/* =============================================================================
   VARIANT 2: MARKETING GENERAL
   =============================================================================
   General marketing focus - not industry-specific
   Best for: Broad marketing campaigns, general business audience

   Features animated stats row for visual variety + feature pills
============================================================================= */

function HeroMarketingGeneral() {
    const pathname = usePathname();
    const colors = getColorsFromPath(pathname);
    const colorsRGB = getColorsRGBFromPath(pathname);

    // Animated stats - adds visual interest and social proof
    const stats = [
        { value: "2x", label: "More Leads" },
        { value: "85%", label: "ROI Increase" },
        { value: "3x", label: "Faster Growth" },
    ];

    return (
        <HeroWrapper colorsRGB={colorsRGB}>
            <div className="text-center">
                {/* Badge - Marketing focused */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0 }}
                    className="mb-6"
                >
                    <Badge
                        variant="secondary"
                        className="inline-flex items-center bg-secondary gap-2"
                    >
                        <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <Rocket
                                className="h-4 w-4"
                                style={{ color: colors.primary }}
                            />
                        </motion.div>
                        <span>Marketing That Actually Works</span>
                    </Badge>
                </motion.div>

                {/* Main Headline - Results focused */}
                {/* Note: pr-1 prevents gradient text clipping on letters like G */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
                >
                    <span className="text-foreground">Stop </span>
                    <motion.span
                        className="bg-clip-text text-transparent inline-block pr-1"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                        }}
                    >
                        Guessing.
                    </motion.span>
                </motion.h1>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8"
                >
                    <span className="text-foreground">Start </span>
                    <motion.span
                        className="bg-clip-text text-transparent inline-block pr-1"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${colors.secondary}, ${colors.primary})`,
                        }}
                    >
                        Growing.
                    </motion.span>
                </motion.h1>

                {/* Animated Stats Row - visual variety element */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="mb-6 sm:mb-8 flex justify-center gap-6 sm:gap-10 md:gap-16"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.5,
                                delay: 1.1 + index * 0.15,
                            }}
                            className="text-center"
                        >
                            {/* Animated counter effect on the value */}
                            <motion.div
                                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1"
                                style={{ color: colors.primary }}
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    delay: 1.2 + index * 0.15,
                                }}
                            >
                                {stat.value}
                            </motion.div>
                            <div className="text-xs sm:text-sm text-foreground/60">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Value proposition with rotating keywords */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="mb-8 sm:mb-10 max-w-3xl mx-auto"
                >
                    <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 px-2">
                        Data-driven marketing that turns clicks into{" "}
                        <RotatingMarketingKeywords />
                    </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                    className="flex flex-col items-center gap-3"
                >
                    <InteractiveHoverButton
                        onClick={() => openCalendlyPopup()}
                        text="Get Your Free Marketing Strategy"
                        className="w-auto px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base"
                    />
                    <span className="text-xs sm:text-sm text-foreground/50">
                        No commitment • Custom strategy for your business
                    </span>
                </motion.div>
            </div>
        </HeroWrapper>
    );
}

/* =============================================================================
   VARIANT 3: DENTIST MARKETING FOCUS
   =============================================================================
   Direct dentist marketing messaging with patient-focused value props
   Best for: Facebook/Instagram ads targeting dental practices
============================================================================= */

function HeroDentistMarketing() {
    const pathname = usePathname();
    const colors = getColorsFromPath(pathname);
    const colorsRGB = getColorsRGBFromPath(pathname);

    return (
        <HeroWrapper colorsRGB={colorsRGB}>
            <div className="text-center">
                {/* Badge - Dentist specific */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0 }}
                    className="mb-6"
                >
                    <Badge
                        variant="secondary"
                        className="inline-flex items-center bg-secondary gap-2"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Megaphone
                                className="h-4 w-4"
                                style={{ color: colors.primary }}
                            />
                        </motion.div>
                        <span>Marketing Built for Dental Practices</span>
                    </Badge>
                </motion.div>

                {/* Main Headline - Direct dentist focus */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
                >
                    <span className="text-foreground">Get More </span>
                    <motion.span
                        className="bg-clip-text text-transparent inline-block"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                        }}
                    >
                        Patients
                    </motion.span>
                </motion.h1>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8"
                >
                    <span className="text-foreground">Without the </span>
                    <motion.span
                        className="bg-clip-text text-transparent inline-block"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${colors.secondary}, ${colors.primary})`,
                        }}
                    >
                        Guesswork
                    </motion.span>
                </motion.h1>

                {/* Value proposition list */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="mb-10 max-w-3xl mx-auto"
                >
                    <p className="text-xl sm:text-2xl text-foreground/80 mb-6">
                        We help dental practices dominate local search, attract
                        high-value patients, and grow predictably.
                    </p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            { icon: Search, text: "Local SEO" },
                            { icon: Target, text: "Targeted Ads" },
                            { icon: BarChart3, text: "ROI Tracking" },
                        ].map((item, index) => (
                            <motion.div
                                key={item.text}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 1.4 + index * 0.1,
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border"
                            >
                                <item.icon
                                    className="h-4 w-4"
                                    style={{ color: colors.primary }}
                                />
                                <span className="text-sm font-medium text-foreground/80">
                                    {item.text}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                    className="flex flex-col items-center gap-3"
                >
                    <InteractiveHoverButton
                        onClick={() => openCalendlyPopup()}
                        text="Get Your Free Marketing Audit"
                        className="w-auto px-10 py-4 text-base"
                    />
                    <span className="text-sm text-foreground/50">
                        No commitment • See exactly how to grow
                    </span>
                </motion.div>
            </div>
        </HeroWrapper>
    );
}

/* =============================================================================
   VARIANT 4: SEO RANKINGS FOCUS
   =============================================================================
   Emphasizes Google rankings, search visibility, and being found online
   Best for: Campaigns targeting practices struggling with online visibility
============================================================================= */

function HeroSEORankings() {
    const pathname = usePathname();
    const colors = getColorsFromPath(pathname);
    const colorsRGB = getColorsRGBFromPath(pathname);

    // Stats that rotate to show different metrics
    const stats = [
        { value: "#1", label: "Google Rankings" },
        { value: "3x", label: "More Visibility" },
        { value: "40%", label: "More Calls" },
    ];

    return (
        <HeroWrapper colorsRGB={colorsRGB}>
            <div className="text-center">
                {/* Badge - SEO focused */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0 }}
                    className="mb-6"
                >
                    <Badge
                        variant="secondary"
                        className="inline-flex items-center bg-secondary gap-2"
                    >
                        <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <TrendingUp
                                className="h-4 w-4"
                                style={{ color: colors.primary }}
                            />
                        </motion.div>
                        <span>Rank Higher. Get Found. Grow Faster.</span>
                    </Badge>
                </motion.div>

                {/* Main Headline - SEO focus */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
                >
                    <span className="text-foreground">Show Up </span>
                    <motion.span
                        className="bg-clip-text text-transparent inline-block"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                        }}
                    >
                        First
                    </motion.span>
                </motion.h1>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8"
                >
                    <span className="text-foreground">
                        When Patients Search
                    </span>
                </motion.h1>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="mb-8 flex justify-center gap-8 sm:gap-16"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.5,
                                delay: 1.2 + index * 0.15,
                            }}
                            className="text-center"
                        >
                            <div
                                className="text-3xl sm:text-4xl font-bold mb-1"
                                style={{ color: colors.primary }}
                            >
                                {stat.value}
                            </div>
                            <div className="text-sm text-foreground/60">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="mb-10 max-w-2xl mx-auto"
                >
                    <p className="text-xl sm:text-2xl text-foreground/70 leading-relaxed">
                        SEO & marketing strategies that put your dental practice
                        at the top of Google—where patients are searching.
                    </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                    className="flex flex-col items-center gap-3"
                >
                    <InteractiveHoverButton
                        onClick={() => openCalendlyPopup()}
                        text="Check Your Rankings Free"
                        className="w-auto px-10 py-4 text-base"
                    />
                    <span className="text-sm text-foreground/50">
                        See where you rank vs. competitors
                    </span>
                </motion.div>
            </div>
        </HeroWrapper>
    );
}

/* =============================================================================
   VARIANT 5: PATIENT GROWTH FOCUS
   =============================================================================
   Focuses on patient acquisition, practice growth, and business results
   Best for: Targeting ambitious practice owners focused on expansion
============================================================================= */

function HeroPatientGrowth() {
    const pathname = usePathname();
    const colors = getColorsFromPath(pathname);
    const colorsRGB = getColorsRGBFromPath(pathname);

    return (
        <HeroWrapper colorsRGB={colorsRGB}>
            <div className="text-center">
                {/* Badge - Growth focused */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0 }}
                    className="mb-6"
                >
                    <Badge
                        variant="secondary"
                        className="inline-flex items-center bg-secondary gap-2"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Users
                                className="h-4 w-4"
                                style={{ color: colors.primary }}
                            />
                        </motion.div>
                        <span>Trusted by Growing Dental Practices</span>
                    </Badge>
                </motion.div>

                {/* Main Headline - Growth & Results */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
                >
                    <span className="text-foreground">Fill Your </span>
                    <motion.span
                        className="bg-clip-text text-transparent inline-block"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                        }}
                    >
                        Schedule
                    </motion.span>
                </motion.h1>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8"
                >
                    <span className="text-foreground">With </span>
                    <motion.span
                        className="bg-clip-text text-transparent inline-block"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${colors.secondary}, ${colors.primary})`,
                        }}
                    >
                        Ideal Patients
                    </motion.span>
                </motion.h1>

                {/* Social proof / results statement */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="mb-8"
                >
                    <p className="text-xl sm:text-2xl text-foreground/80 mb-4">
                        Stop chasing leads. Start attracting patients who value
                        your care.
                    </p>
                    <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                        Our proven dental marketing system combines SEO,
                        targeted ads, and reputation management to drive
                        predictable practice growth.
                    </p>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="mb-10 flex flex-wrap justify-center gap-6 text-sm text-foreground/50"
                >
                    <span className="flex items-center gap-2">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: colors.primary }}
                        />
                        Local SEO Experts
                    </span>
                    <span className="flex items-center gap-2">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: colors.primary }}
                        />
                        Dental-Focused Strategies
                    </span>
                    <span className="flex items-center gap-2">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: colors.primary }}
                        />
                        Transparent Reporting
                    </span>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                    className="flex flex-col items-center gap-3"
                >
                    <InteractiveHoverButton
                        onClick={() => openCalendlyPopup()}
                        text="Start Growing Your Practice"
                        className="w-auto px-10 py-4 text-base"
                    />
                    <span className="text-sm text-foreground/50">
                        Free strategy call • No obligation
                    </span>
                </motion.div>
            </div>
        </HeroWrapper>
    );
}

/* =============================================================================
   MAIN EXPORT - VARIANT SWITCHER
   =============================================================================
   This is the main exported component that renders the active variant.
   Change ACTIVE_VARIANT at the top of this file to switch between designs.
============================================================================= */

export function HeroSection() {
    switch (ACTIVE_VARIANT) {
        case "original":
            return <HeroOriginal />;
        case "marketing-general":
            return <HeroMarketingGeneral />;
        case "dentist-marketing":
            return <HeroDentistMarketing />;
        case "seo-rankings":
            return <HeroSEORankings />;
        case "patient-growth":
            return <HeroPatientGrowth />;
        default:
            // TypeScript exhaustive check - ensures all variants are handled
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const _exhaustiveCheck: never = ACTIVE_VARIANT;
            return <HeroOriginal />;
    }
}

/* =============================================================================
   INDIVIDUAL EXPORTS (for direct import if needed)
   =============================================================================
   These can be imported directly if you want to use a specific variant
   without going through the switcher:

   import { HeroDentistMarketing } from '@/components/home/HeroSection';
============================================================================= */

export {
    HeroOriginal,
    HeroMarketingGeneral,
    HeroDentistMarketing,
    HeroSEORankings,
    HeroPatientGrowth,
};
