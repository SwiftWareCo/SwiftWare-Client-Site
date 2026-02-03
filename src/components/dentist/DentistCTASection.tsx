"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Rocket, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { openCalendlyPopup } from "@/lib/calendly";

export function DentistCTASection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const benefits = [
        "Free comprehensive marketing audit",
        "Custom growth strategy for your practice",
        "No obligation, no pressure",
        "See exactly how to outrank competitors",
    ];

    return (
        <section ref={ref} className="relative overflow-hidden">
            <div className="relative bg-gradient-to-b from-sky-300 via-teal-100 to-sky-300">
                {/* Main CTA Content */}
                <div className="relative py-24">
                    {/* Background decorations */}
                    <div className="absolute inset-0">
                        {/* Grid pattern */}
                        <div
                            className="absolute inset-0 opacity-[0.03]"
                            style={{
                                backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                                  linear-gradient(to bottom, white 1px, transparent 1px)`,
                                backgroundSize: "60px 60px",
                            }}
                        />
                    </div>

                    <div className="relative z-10 mx-auto max-w-5xl px-6">
                        <div className="text-center">
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-sm border border-sky-200 px-4 py-2 mb-8 shadow-sm"
                            >
                                <motion.div
                                    animate={{ rotate: [0, 15, -15, 0] }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                    }}
                                >
                                    <Sparkles className="h-4 w-4 text-sky-600" />
                                </motion.div>
                                <span className="text-sm font-medium text-sky-700">
                                    Limited Spots Available This Month
                                </span>
                            </motion.div>

                            {/* Main headline */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="font-outfit text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6"
                            >
                                Ready to Fill Your Schedule{" "}
                                <br className="hidden sm:block" />
                                <span className="text-sky-700">
                                    With Dream Patients?
                                </span>
                            </motion.h2>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="font-lora text-xl text-slate-600 max-w-2xl mx-auto mb-10"
                            >
                                Book a free strategy call and get a customized
                                plan to grow your dental practice. No fluff, no
                                pressure—just actionable insights.
                            </motion.p>

                            {/* Benefits list */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="flex flex-wrap justify-center gap-4 mb-10"
                            >
                                {benefits.map((benefit, index) => (
                                    <motion.div
                                        key={benefit}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={
                                            isInView ? { opacity: 1, x: 0 } : {}
                                        }
                                        transition={{
                                            delay: 0.7 + index * 0.1,
                                        }}
                                        className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 border border-sky-100 shadow-sm"
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        <span className="text-sm text-slate-700">
                                            {benefit}
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* CTA Button - Fixed hover effect */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                className="flex justify-center mb-8"
                            >
                                <motion.button
                                    onClick={() => openCalendlyPopup()}
                                    className="group relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-sky-700 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 border border-sky-100"
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Background fill on hover */}
                                    <span className="absolute inset-0 bg-gradient-to-r from-sky-500 to-teal-500 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />

                                    {/* Content */}
                                    <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-white">
                                        <span>
                                            Book Your Free Strategy Call
                                        </span>
                                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </span>
                                </motion.button>
                            </motion.div>

                            {/* Trust indicator */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ duration: 0.8, delay: 1 }}
                                className="flex items-center justify-center gap-4"
                            >
                                <div className="flex -space-x-2">
                                    {["MC", "ST", "JP", "ER", "DK"].map(
                                        (initials, i) => (
                                            <div
                                                key={i}
                                                className="w-10 h-10 rounded-full bg-white/70 border-2 border-sky-100 flex items-center justify-center text-sm font-medium text-sky-700"
                                            >
                                                {initials}
                                            </div>
                                        ),
                                    )}
                                </div>
                                <div className="text-left">
                                    <div className="text-slate-700 font-semibold">
                                        Join 50+ dental practices
                                    </div>
                                    <div className="text-slate-500 text-sm">
                                        Already growing with SwiftWare
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Floating decorative elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute top-10 left-10 w-16 h-16 rounded-2xl bg-white/60 backdrop-blur-sm border border-sky-100 flex items-center justify-center hidden lg:flex"
                        >
                            <Rocket className="h-8 w-8 text-sky-600/80" />
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute bottom-10 right-10 w-20 h-20 rounded-2xl bg-white/60 backdrop-blur-sm border border-sky-100 flex items-center justify-center hidden lg:flex"
                        >
                            <div className="text-center">
                                <div className="text-2xl font-bold text-sky-700">
                                    24/7
                                </div>
                                <div className="text-xs text-sky-600/70">
                                    Booking
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
