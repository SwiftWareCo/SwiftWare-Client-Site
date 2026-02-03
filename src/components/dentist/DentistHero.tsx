"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
    TrendingUp,
    Calendar,
    Users,
    Sparkles,
    Star,
    CheckCircle2,
} from "lucide-react";
import { openCalendlyPopup } from "@/lib/calendly";
import { DentistHoverButton } from "./DentistHoverButton";

// Floating metric cards that orbit around - positioned closer to center
const floatingMetrics = [
    {
        icon: TrendingUp,
        value: "+127%",
        label: "Patient Growth",
        color: "from-emerald-400 to-teal-500",
        delay: 0,
        position: "top-24 left-[12%] xl:left-[15%]",
    },
    {
        icon: Calendar,
        value: "24/7",
        label: "Auto-Booking",
        color: "from-sky-400 to-blue-500",
        delay: 0.2,
        position: "top-36 right-[12%] xl:right-[15%]",
    },
    {
        icon: Users,
        value: "50+",
        label: "New Patients/Mo",
        color: "from-violet-400 to-purple-500",
        delay: 0.4,
        position: "bottom-44 left-[15%] xl:left-[18%]",
    },
    {
        icon: Star,
        value: "4.9★",
        label: "Avg Rating",
        color: "from-amber-400 to-orange-500",
        delay: 0.6,
        position: "bottom-36 right-[12%] xl:right-[15%]",
    },
];

// Floating metric card component
function FloatingCard({
    icon: Icon,
    value,
    label,
    color,
    delay,
    position,
}: (typeof floatingMetrics)[0]) {
    return (
        <motion.div
            className={`absolute ${position} hidden lg:block`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: delay + 0.8 }}
        >
            <motion.div
                className="relative"
                animate={{ y: [0, -10, 0] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: delay,
                    ease: "easeInOut",
                }}
            >
                <div className="flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/60 shadow-xl shadow-slate-200/50 px-4 py-3">
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${color}`}
                    >
                        <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <div className="text-lg font-bold text-slate-900">
                            {value}
                        </div>
                        <div className="text-xs text-slate-500">{label}</div>
                    </div>
                </div>
                {/* Glow effect */}
                <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} opacity-20 blur-xl -z-10`}
                />
            </motion.div>
        </motion.div>
    );
}

export function DentistHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen overflow-hidden pt-32 pb-20 bg-gradient-to-b from-sky-300 via-teal-100 to-sky-300"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                {/* Grid pattern - enhanced visibility */}
                <div className="absolute inset-0 opacity-[0.1] bg-[linear-gradient(to_right,_#dc2626_1px,_transparent_1px),linear-gradient(to_bottom,_#dc2626_1px,_transparent_1px)] bg-[size:60px_60px]" />
                {/* Subtle radial gradient overlay for depth */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(239,68,68,0.18)_0%,_transparent_55%)]" />
            </div>

            {/* Floating Metric Cards */}
            {floatingMetrics.map((metric) => (
                <FloatingCard key={metric.label} {...metric} />
            ))}

            {/* Main Content */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 mx-auto max-w-7xl px-6"
            >
                <div className="text-center max-w-4xl mx-auto">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 rounded-full bg-white border border-sky-200 px-4 py-2 mb-8 shadow-lg shadow-sky-100/50"
                    >
                        <motion.div
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Sparkles className="h-4 w-4 text-sky-500" />
                        </motion.div>
                        <span className="text-sm font-medium text-sky-700">
                            Marketing Built for Dental Practices
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-outfit text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6"
                    >
                        Fill Your Schedule
                        <br />
                        <span className="bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
                            While You Sleep
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-lora text-xl sm:text-2xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed"
                    >
                        Our automated marketing system brings new patients to
                        your door, keeps them loyal, and grows your practice—
                        <span className="text-sky-600 font-semibold">
                            all on autopilot.
                        </span>
                    </motion.p>

                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap justify-center gap-6 mb-10"
                    >
                        {[
                            "SEO That Ranks #1",
                            "Multi-Platform Social",
                            "Automated Booking",
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                <span className="text-sm font-medium text-slate-600">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row justify-center gap-4"
                    >
                        <DentistHoverButton
                            text="Get Your Free Marketing Audit"
                            onClick={() => openCalendlyPopup()}
                            variant="primary"
                            className="px-8 py-4 text-lg"
                        />
                        <DentistHoverButton
                            text="Watch How It Works"
                            variant="secondary"
                            className="px-8 py-4 text-lg"
                        />
                    </motion.div>

                    {/* Social proof */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="mt-12 flex flex-col items-center gap-4"
                    >
                        <div className="flex -space-x-3">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-100 to-teal-100 border-2 border-white flex items-center justify-center text-xs font-medium text-sky-700 shadow-md"
                                >
                                    {["JD", "SK", "MR", "AL", "TW"][i]}
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-slate-500">
                            <span className="font-semibold text-slate-700">
                                50+ dental practices
                            </span>{" "}
                            trust SwiftWare to grow their patient base
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 text-slate-400"
                >
                    <span className="text-xs font-medium">
                        Scroll to explore
                    </span>
                    <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex justify-center pt-2 bg-white/50">
                        <motion.div
                            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1.5 h-3 rounded-full bg-gradient-to-b from-sky-400 to-teal-400"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
