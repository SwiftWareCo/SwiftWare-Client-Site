"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
    Search,
    Share2,
    Heart,
    Monitor,
    ArrowRight,
    Sparkles,
    TrendingUp,
    Users,
    Zap,
    CheckCircle2,
} from "lucide-react";
import { openCalendlyPopup } from "@/lib/calendly";
import { DentistHoverButton } from "./DentistHoverButton";

// Services data based on all existing components
const services = [
    {
        id: "seo",
        icon: Search,
        title: "SEO & Automated Blogs",
        shortTitle: "SEO Automation",
        description:
            "AI-powered system that scans what patients search for and generates SEO-optimized blog content automatically.",
        benefits: [
            "Weekly keyword scanning",
            "Auto-generated blog posts",
            "Continuous site optimization",
            "340% average traffic increase",
        ],
        color: "from-sky-500 to-teal-500",
        bgColor: "from-sky-50 to-teal-50",
        borderColor: "border-sky-200",
        iconColor: "text-sky-600",
        href: "#services",
        stats: { value: "340%", label: "Traffic Increase" },
    },
    {
        id: "social",
        icon: Share2,
        title: "Multi-Platform Social Media",
        shortTitle: "Social Marketing",
        description:
            "Scroll-stopping content for Instagram, TikTok, Facebook, LinkedIn, and Pinterest—every algorithm targeted.",
        benefits: [
            "Instagram & TikTok content",
            "Facebook & LinkedIn posts",
            "Pinterest optimization",
            "10x patient reach potential",
        ],
        color: "from-pink-500 to-purple-600",
        bgColor: "from-pink-50 to-purple-50",
        borderColor: "border-pink-200",
        iconColor: "text-pink-600",
        href: "#social-media",
        stats: { value: "10x", label: "More Reach" },
    },
    {
        id: "retention",
        icon: Heart,
        title: "Patient Retention System",
        shortTitle: "Patient Retention",
        description:
            "Automated booking, email reminders, and SMS follow-ups that keep patients coming back.",
        benefits: [
            "24/7 online booking system",
            "Smart email reminders",
            "SMS recall campaigns",
            "90% reduction in no-shows",
        ],
        color: "from-emerald-500 to-teal-500",
        bgColor: "from-emerald-50 to-teal-50",
        borderColor: "border-emerald-200",
        iconColor: "text-emerald-600",
        href: "#how-it-works",
        stats: { value: "3x", label: "Retention Rate" },
    },
    {
        id: "website",
        icon: Monitor,
        title: "Professional Website Design",
        shortTitle: "Website Design",
        description:
            "Conversion-focused websites that rank on Google and turn visitors into booked appointments.",
        benefits: [
            "100 PageSpeed score",
            "Mobile-perfect design",
            "HIPAA-compliant forms",
            "Built-in SEO optimization",
        ],
        color: "from-violet-500 to-purple-600",
        bgColor: "from-violet-50 to-purple-50",
        borderColor: "border-violet-200",
        iconColor: "text-violet-600",
        href: "#website",
        stats: { value: "40%", label: "More Inquiries" },
    },
];

// Service Card Component
function ServiceCard({
    service,
    index,
}: {
    service: (typeof services)[0];
    index: number;
}) {
    const Icon = service.icon;

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="group relative"
        >
            <div
                className={`relative h-full rounded-3xl border ${service.borderColor} bg-white p-6 lg:p-8 shadow-lg shadow-slate-100/50 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden`}
            >
                <motion.div
                    className="absolute inset-0 rounded-3xl -z-10"
                    animate={{
                        opacity: [0.25, 0.7, 0.25],
                        scale: [0.97, 1.05, 0.97],
                    }}
                    transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        delay: 0.1 + index * 0.15,
                        ease: "easeInOut",
                    }}
                    style={{
                        background:
                            "radial-gradient(circle at 30% 30%, rgba(236,72,153,0.6), rgba(236,72,153,0.25) 55%, transparent 75%)",
                        boxShadow:
                            "0 0 26px rgba(236,72,153,0.45), 0 0 80px rgba(236,72,153,0.35)",
                    }}
                />
                {/* Background gradient on hover */}
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative z-10">
                    {/* Icon & Stats Row */}
                    <div className="flex items-start justify-between mb-6">
                        <div
                            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} shadow-lg`}
                        >
                            <Icon className="h-7 w-7 text-white" />
                        </div>
                        <div className="text-right">
                            <div
                                className={`text-2xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
                            >
                                {service.stats.value}
                            </div>
                            <div className="text-xs text-slate-500">
                                {service.stats.label}
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-outfit text-xl lg:text-2xl font-bold text-slate-900 mb-3">
                        {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        {service.description}
                    </p>

                    {/* Benefits */}
                    <ul className="space-y-3 mb-8">
                        {service.benefits.map((benefit, i) => (
                            <motion.li
                                key={benefit}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: 0.3 + index * 0.1 + i * 0.05,
                                }}
                                className="flex items-center gap-3"
                            >
                                <CheckCircle2
                                    className={`h-5 w-5 ${service.iconColor} shrink-0`}
                                />
                                <span className="text-sm text-slate-700">
                                    {benefit}
                                </span>
                            </motion.li>
                        ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                        onClick={() => scrollToSection(service.href)}
                        className={`flex items-center gap-2 text-sm font-semibold ${service.iconColor} group/btn transition-colors hover:opacity-80`}
                    >
                        Learn More
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                </div>

                {/* Decorative corner accent */}
                <div
                    className={`absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br ${service.color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`}
                />
            </div>
        </motion.div>
    );
}

// Quick stat pill
function StatPill({
    icon: Icon,
    value,
    label,
    delay,
}: {
    icon: React.ComponentType<{ className?: string }>;
    value: string;
    label: string;
    delay: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2.5 border border-slate-200 shadow-sm"
        >
            <Icon className="h-5 w-5 text-sky-600" />
            <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-slate-900">{value}</span>
                <span className="text-sm text-slate-600">{label}</span>
            </div>
        </motion.div>
    );
}

export function ServicesSection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            id="services"
            className="relative py-24 overflow-hidden bg-gradient-to-b from-sky-300 via-teal-100 to-sky-300"
        >
            {/* Background elements */}
            <div className="absolute inset-0 -z-10">
                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(to right, #0ea5e9 1px, transparent 1px),
                              linear-gradient(to bottom, #14b8a6 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
                {/* Subtle radial gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(14,165,233,0.1)_0%,_transparent_50%)]" />
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
                        <Sparkles className="h-4 w-4 text-sky-500" />
                        <span className="text-sm font-medium text-sky-700">
                            Complete Marketing Solution
                        </span>
                    </div>
                    <h2 className="font-outfit text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                        Everything Your Practice Needs to{" "}
                        <span className="bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent">
                            Grow & Thrive
                        </span>
                    </h2>
                    <p className="font-lora text-xl text-slate-600 leading-relaxed">
                        From attracting new patients to keeping them loyal, our
                        comprehensive marketing suite handles it
                        all—automatically.
                    </p>
                </motion.div>

                {/* Stats pills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mb-16"
                >
                    <StatPill
                        icon={TrendingUp}
                        value="127%"
                        label="Avg. Patient Growth"
                        delay={0.3}
                    />
                    <StatPill
                        icon={Users}
                        value="50+"
                        label="Dental Practices"
                        delay={0.4}
                    />
                    <StatPill
                        icon={Zap}
                        value="24/7"
                        label="Automated Marketing"
                        delay={0.5}
                    />
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 mb-16">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            index={index}
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
                    <div className="inline-flex flex-col sm:flex-row items-center gap-6 rounded-3xl bg-white border border-sky-200 px-8 py-6 shadow-xl">
                        <div className="text-left">
                            <div className="font-semibold text-slate-900 text-lg mb-1">
                                Not sure which service you need?
                            </div>
                            <div className="text-slate-600">
                                Get a free audit and we&apos;ll recommend the
                                best strategy for your practice.
                            </div>
                        </div>
                        <DentistHoverButton
                            text="Get Free Audit"
                            onClick={() => openCalendlyPopup()}
                            variant="primary"
                            className="whitespace-nowrap px-6 py-3"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
