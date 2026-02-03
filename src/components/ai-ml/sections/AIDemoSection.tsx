"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { openCalendlyPopup } from "@/lib/calendly";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { getColorsRGBFromPath } from "@/lib/colors";

const withAlpha = (rgb: string, alpha: number) => `rgba(${rgb}, ${alpha})`;

const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
        },
    },
};

export default function AIDemoSection() {
    const pathname = usePathname();
    const colorsRGB = getColorsRGBFromPath(pathname);

    return (
        <section
            id="demo"
            className="py-20"
            style={{
                background: `linear-gradient(180deg, transparent 0%, ${withAlpha(
                    colorsRGB.primaryRGB,
                    0.08,
                )} 45%, transparent 100%)`,
            }}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="mb-16 text-center">
                    <motion.h2
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="mb-6 text-4xl font-bold text-transparent"
                        style={{
                            backgroundImage: `linear-gradient(90deg, rgba(255,255,255,1) 0%, ${withAlpha(
                                colorsRGB.primaryRGB,
                                0.75,
                            )} 50%, ${withAlpha(colorsRGB.secondaryRGB, 0.6)} 100%)`,
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                        }}
                    >
                        Experience Hybrid AI Search
                    </motion.h2>
                    <motion.p
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mx-auto max-w-3xl text-xl text-muted-foreground"
                    >
                        See how our AI combines semantic understanding with
                        keyword precision to deliver accurate results.
                    </motion.p>
                </div>

                {/* Conversational AI Visualizer */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                    transition={{ delay: 0.2 }}
                    className="relative overflow-hidden rounded-2xl p-8 md:p-12"
                    style={{
                        border: `1px solid ${withAlpha(colorsRGB.primaryRGB, 0.18)}`,
                        background: `linear-gradient(135deg, rgba(255,255,255,0.02), ${withAlpha(
                            colorsRGB.primaryRGB,
                            0.05,
                        )})`,
                    }}
                >
                    <div className="flex flex-col items-center justify-center gap-8 text-center">
                        <div
                            className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed"
                            style={{
                                borderColor: withAlpha(
                                    colorsRGB.primaryRGB,
                                    0.3,
                                ),
                            }}
                        >
                            <div
                                className="absolute inset-0 animate-pulse rounded-full opacity-20"
                                style={{
                                    background: `radial-gradient(circle, ${withAlpha(colorsRGB.primaryRGB, 0.5)} 0%, transparent 70%)`,
                                }}
                            />
                            <span className="text-4xl">🎙️</span>
                        </div>

                        <div className="max-w-2xl space-y-4">
                            <h3 className="text-2xl font-bold">
                                Try the Voice Agent Demo Above
                            </h3>
                            <p className="text-muted-foreground">
                                We&apos;ve integrated a live Bland AI persona in
                                the Hero section at the top of this page. Click
                                &quot;Start Conversation&quot; to experience our
                                human-like voice AI capabilities firsthand.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-xl border bg-background/50 p-4 text-left backdrop-blur">
                                <h4 className="mb-2 font-semibold text-foreground">
                                    Natural Conversation
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Interruptible, low-latency responses that
                                    feel human.
                                </p>
                            </div>
                            <div className="rounded-xl border bg-background/50 p-4 text-left backdrop-blur">
                                <h4 className="mb-2 font-semibold text-foreground">
                                    Custom Knowledge
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Trained on your specific business data and
                                    guidelines.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                    transition={{ delay: 0.3 }}
                    className="mt-12 text-center"
                >
                    <p className="mb-6 text-muted-foreground">
                        Ready to see what SwiftMind can do with your data?
                    </p>
                    <InteractiveHoverButton
                        text="Schedule Live Demo"
                        onClick={() =>
                            openCalendlyPopup(
                                "https://calendly.com/swiftwareco/30min",
                            )
                        }
                        className="mx-auto w-64"
                    />
                </motion.div>
            </div>
        </section>
    );
}
