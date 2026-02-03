"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { TrendingUp, Phone, Users, Star, Quote } from "lucide-react";
import { getColorsFromPath, getColorsRGBFromPath } from "@/lib/colors";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { openCalendlyPopup } from "@/lib/calendly";

const ACHIEVEMENTS = [
    {
        icon: TrendingUp,
        metric: "2x Revenue",
        description: "Doubled annual revenue through AI-powered operations",
    },
    {
        icon: Phone,
        metric: "+40% Clients",
        description: "AI Receptionist captured leads 24/7",
    },
    {
        icon: Users,
        metric: "Mobile App",
        description: "Field technicians with offline capabilities",
    },
    {
        icon: Star,
        metric: "95% Satisfaction",
        description: "Improved communication and transparency",
    },
] as const;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
};

export default function AICaseStudySection() {
    const pathname = usePathname();
    const colors = getColorsFromPath(pathname);
    const colorsRGB = getColorsRGBFromPath(pathname);

    return (
        <section className="bg-background py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <span
                        className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wide"
                        style={{
                            background: `rgba(${colorsRGB.primaryRGB}, 0.1)`,
                            color: colors.primary,
                        }}
                    >
                        Case Study
                    </span>
                    <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                        Vancouver Hood Doctors
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                        How AI automation transformed a commercial kitchen
                        service company
                    </p>
                </motion.div>

                {/* Achievements Grid */}
                <motion.div
                    className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {ACHIEVEMENTS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.metric}
                                variants={itemVariants}
                                className="rounded-2xl border p-6 text-center"
                                style={{
                                    borderColor: `rgba(${colorsRGB.primaryRGB}, 0.2)`,
                                    background: `linear-gradient(135deg, rgba(${colorsRGB.primaryRGB}, 0.05), rgba(${colorsRGB.secondaryRGB}, 0.03))`,
                                }}
                            >
                                <div
                                    className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl"
                                    style={{
                                        background: `linear-gradient(135deg, rgba(${colorsRGB.primaryRGB}, 0.15), rgba(${colorsRGB.secondaryRGB}, 0.1))`,
                                    }}
                                >
                                    <Icon
                                        className="h-6 w-6"
                                        style={{ color: colors.primary }}
                                    />
                                </div>
                                <div
                                    className="text-2xl font-bold"
                                    style={{ color: colors.primary }}
                                >
                                    {item.metric}
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {item.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Testimonial */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative mx-auto max-w-3xl rounded-2xl border p-8 text-center"
                    style={{
                        borderColor: `rgba(${colorsRGB.primaryRGB}, 0.2)`,
                        background: `linear-gradient(135deg, rgba(${colorsRGB.primaryRGB}, 0.03), rgba(${colorsRGB.secondaryRGB}, 0.02))`,
                    }}
                >
                    <Quote
                        className="mx-auto mb-4 h-8 w-8"
                        style={{ color: colors.primary, opacity: 0.5 }}
                    />
                    <blockquote className="text-lg italic text-foreground">
                        &quot;The AI receptionist alone has increased our client
                        base by 40%. We never miss a call now, even at 2am.
                        SwiftWare transformed how we operate.&quot;
                    </blockquote>
                    <div className="mt-6">
                        <p className="font-semibold text-foreground">Adam</p>
                        <p className="text-sm text-muted-foreground">
                            Operations Manager, Vancouver Hood Doctors
                        </p>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <InteractiveHoverButton
                        onClick={() => openCalendlyPopup()}
                        text="Get Similar Results"
                    />
                </motion.div>
            </div>
        </section>
    );
}
