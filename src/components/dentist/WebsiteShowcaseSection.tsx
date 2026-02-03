"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
    Monitor,
    Smartphone,
    Zap,
    Shield,
    Search,
    Palette,
    CheckCircle2,
    Star,
} from "lucide-react";
import { openCalendlyPopup } from "@/lib/calendly";
import { DentistHoverButton } from "./DentistHoverButton";

// Mock website preview
function WebsitePreview() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <motion.div ref={containerRef} style={{ y }} className="relative">
            {/* Browser frame */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
                {/* Browser header */}
                <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 mx-4">
                        <div className="bg-white rounded-lg border border-slate-200 px-4 py-1.5 flex items-center gap-2">
                            <Shield className="h-3 w-3 text-emerald-500" />
                            <span className="text-xs text-slate-600">
                                yourdentalclinic.com
                            </span>
                        </div>
                    </div>
                </div>

                {/* Website content */}
                <div className="relative aspect-[16/10] bg-gradient-to-br from-sky-50 to-white overflow-hidden">
                    {/* Hero section mock */}
                    <div className="absolute inset-0 p-6">
                        {/* Nav mock */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-24 h-6 rounded bg-gradient-to-r from-sky-200 to-teal-200" />
                            <div className="flex gap-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-12 h-3 rounded bg-slate-200"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Hero content */}
                        <div className="flex gap-8">
                            <div className="flex-1 space-y-4">
                                <div className="w-3/4 h-8 rounded bg-slate-200" />
                                <div className="w-full h-6 rounded bg-gradient-to-r from-sky-200 to-teal-200" />
                                <div className="w-2/3 h-4 rounded bg-slate-100" />
                                <div className="w-1/2 h-4 rounded bg-slate-100" />
                                <div className="flex gap-3 pt-4">
                                    <div className="w-28 h-10 rounded-lg bg-gradient-to-r from-sky-400 to-teal-400" />
                                    <div className="w-28 h-10 rounded-lg border-2 border-sky-200" />
                                </div>
                            </div>
                            <div className="w-1/3 aspect-square rounded-2xl bg-gradient-to-br from-sky-100 to-teal-50 flex items-center justify-center">
                                <div className="text-4xl">😁</div>
                            </div>
                        </div>

                        {/* Services section mock */}
                        <div className="mt-8 grid grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-100 to-teal-50 mb-3" />
                                    <div className="w-3/4 h-3 rounded bg-slate-200 mb-2" />
                                    <div className="w-full h-2 rounded bg-slate-100" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Performance badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="absolute top-4 right-4 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2"
                    >
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                            <span className="text-xs font-bold text-emerald-600">
                                100
                            </span>
                        </div>
                        <div className="text-xs">
                            <div className="font-medium text-slate-900">
                                PageSpeed
                            </div>
                            <div className="text-slate-500">Score</div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Mobile preview overlay */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-10 -right-6 w-32"
            >
                <div className="bg-slate-900 rounded-3xl p-1.5 shadow-2xl">
                    <div className="bg-white rounded-2xl overflow-hidden aspect-[9/16]">
                        <div className="bg-gradient-to-br from-sky-50 to-white h-full p-2">
                            <div className="w-full h-3 rounded bg-sky-200 mb-2" />
                            <div className="w-3/4 h-2 rounded bg-slate-100 mb-4" />
                            <div className="aspect-video rounded-lg bg-gradient-to-br from-sky-100 to-teal-50 mb-3 flex items-center justify-center">
                                <span className="text-lg">😁</span>
                            </div>
                            <div className="w-full h-6 rounded bg-gradient-to-r from-sky-400 to-teal-400" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// Feature card component
function FeatureCard({
    icon: Icon,
    title,
    description,
    delay,
}: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    delay: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg shadow-slate-100/50 hover:shadow-xl transition-shadow"
        >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-50 to-teal-50 border border-sky-100 mb-4">
                <Icon className="h-6 w-6 text-sky-600" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">{title}</h4>
            <p className="text-sm text-slate-600">{description}</p>
        </motion.div>
    );
}

export function WebsiteShowcaseSection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const features = [
        {
            icon: Zap,
            title: "Lightning Fast",
            description:
                "Optimized for speed with 100 PageSpeed scores that Google loves.",
        },
        {
            icon: Smartphone,
            title: "Mobile Perfect",
            description:
                "Looks stunning on every device—phone, tablet, or desktop.",
        },
        {
            icon: Search,
            title: "SEO Built-In",
            description: "Every page optimized for search from day one.",
        },
        {
            icon: Shield,
            title: "Secure & HIPAA",
            description: "SSL encryption and HIPAA-compliant patient forms.",
        },
        {
            icon: Palette,
            title: "Custom Design",
            description: "Unique design that matches your brand perfectly.",
        },
        {
            icon: Monitor,
            title: "Easy Updates",
            description: "Simple dashboard to update content anytime.",
        },
    ];

    return (
        <section
            ref={ref}
            className="relative py-24 overflow-hidden bg-gradient-to-b from-sky-300 via-teal-100 to-sky-300"
        >
            {/* Background elements */}
            <div className="absolute inset-0 -z-10">
                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(to right, #14b8a6 1px, transparent 1px),
                              linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <div className="mx-auto max-w-7xl px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 rounded-full bg-white border border-sky-200 px-4 py-2 mb-6 shadow-sm">
                        <Monitor className="h-4 w-4 text-sky-500" />
                        <span className="text-sm font-medium text-sky-700">
                            Professional Website Design
                        </span>
                    </div>
                    <h2 className="font-outfit text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                        A Website That{" "}
                        <span className="bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent">
                            Converts Visitors
                        </span>{" "}
                        Into Patients
                    </h2>
                    <p className="font-lora text-xl text-slate-600 leading-relaxed">
                        More than just pretty—our dental websites are conversion
                        machines built to rank on Google and turn visitors into
                        booked appointments.
                    </p>
                </motion.div>

                {/* Main content grid */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Left: Website preview */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <WebsitePreview />
                    </motion.div>

                    {/* Right: Features */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <h3 className="font-outfit text-2xl font-bold text-slate-900 mb-6">
                            Why Our Websites Outperform the Competition
                        </h3>

                        {/* Comparison list */}
                        <div className="space-y-4">
                            {[
                                {
                                    feature:
                                        "Custom, unique design (not templates)",
                                    us: true,
                                    others: false,
                                },
                                {
                                    feature: "Built-in SEO optimization",
                                    us: true,
                                    others: false,
                                },
                                {
                                    feature: "100 PageSpeed score guaranteed",
                                    us: true,
                                    others: false,
                                },
                                {
                                    feature: "HIPAA-compliant forms",
                                    us: true,
                                    others: false,
                                },
                                {
                                    feature: "Integrated with booking system",
                                    us: true,
                                    others: false,
                                },
                                {
                                    feature: "Ongoing optimization included",
                                    us: true,
                                    others: false,
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.feature}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                                    <span className="text-slate-700">
                                        {item.feature}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Testimonial snippet */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="mt-8 p-6 rounded-2xl bg-white border border-sky-200 shadow-lg"
                        >
                            <div className="flex gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="h-4 w-4 fill-amber-400 text-amber-400"
                                    />
                                ))}
                            </div>
                            <p className="text-slate-700 italic mb-3">
                                &quot;Our new website brought in 40% more new
                                patient inquiries in the first month. The design
                                is beautiful and patients love how easy it is to
                                book.&quot;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-sky-200 flex items-center justify-center text-sky-700 font-semibold text-sm">
                                    DS
                                </div>
                                <div>
                                    <div className="font-medium text-slate-900">
                                        Dr. Sarah Miller
                                    </div>
                                    <div className="text-sm text-slate-500">
                                        Bright Smile Dental
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Feature cards grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={feature.title}
                            {...feature}
                            delay={index * 0.1}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center"
                >
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 rounded-2xl bg-white border border-slate-200 shadow-xl px-8 py-6">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-100 to-teal-100 border-2 border-white flex items-center justify-center text-xs font-medium text-sky-700"
                                    >
                                        {["JD", "SK", "MR"][i]}
                                    </div>
                                ))}
                            </div>
                            <span className="text-slate-600">
                                Join{" "}
                                <span className="font-semibold text-slate-900">
                                    50+ dental practices
                                </span>{" "}
                                with stunning websites
                            </span>
                        </div>
                        <DentistHoverButton
                            text="See Website Examples"
                            onClick={() => openCalendlyPopup()}
                            variant="primary"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
