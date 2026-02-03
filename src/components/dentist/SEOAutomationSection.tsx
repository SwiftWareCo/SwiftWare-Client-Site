"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
    Search,
    FileText,
    RefreshCw,
    Target,
    Zap,
    TrendingUp,
    Moon,
    BarChart3,
    Globe,
    CheckCircle2,
} from "lucide-react";
import { openCalendlyPopup } from "@/lib/calendly";
import { DentistHoverButton } from "./DentistHoverButton";
import { useCountUp } from "@/hooks/useCountUp";

// Simulated keywords that patients search for
const patientKeywords = [
    "dentist near me",
    "teeth whitening vancouver",
    "emergency dental care",
    "dental implants cost",
    "best dentist richmond bc",
    "root canal treatment",
    "invisalign dentist",
    "pediatric dentist",
    "dental cleaning near me",
    "wisdom teeth removal",
];

// Sample blog posts that cycle through
const sampleBlogPosts = [
    {
        title: "5 Signs You Need a Dental Checkup",
        tags: ["dental health", "prevention", "oral care"],
    },
    {
        title: "Teeth Whitening: Professional vs At-Home",
        tags: ["cosmetic", "whitening", "smile"],
    },
    {
        title: "Why Dental Implants Are Worth It",
        tags: ["implants", "restoration", "investment"],
    },
    {
        title: "Pediatric Dentistry: When to Start",
        tags: ["children", "prevention", "family"],
    },
    {
        title: "Invisalign vs Traditional Braces",
        tags: ["orthodontics", "invisalign", "alignment"],
    },
];

// Animated keyword scanner
function KeywordScanner({ isInView }: { isInView: boolean }) {
    const [currentKeywords, setCurrentKeywords] = useState<string[]>([]);
    const scanningIndexRef = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            scanningIndexRef.current =
                (scanningIndexRef.current + 1) % patientKeywords.length;
            const newIndex = scanningIndexRef.current;
            setCurrentKeywords((prevKeywords) => {
                const newKeywords = [
                    ...prevKeywords,
                    patientKeywords[newIndex],
                ];
                return newKeywords.slice(-4);
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const keywordCount = useCountUp(isInView, {
        end: 247,
        duration: 3.5,
        delay: 0.5,
    });

    return (
        <div className="relative">
            {/* Scanner animation */}
            <motion.div
                className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-sky-500/10 to-teal-500/10"
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
            />

            <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100">
                            <Search className="h-4 w-4 text-sky-600" />
                        </div>
                        <span className="font-semibold text-slate-900">
                            Keyword Scanner
                        </span>
                    </div>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        <RefreshCw className="h-4 w-4 text-sky-500" />
                    </motion.div>
                </div>

                {/* Scanning line animation */}
                <motion.div
                    className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent"
                    animate={{ top: ["20%", "80%", "20%"] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Keywords list */}
                <div className="space-y-2 min-h-[160px]">
                    {currentKeywords.map((keyword, index) => (
                        <motion.div
                            key={`${keyword}-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
                        >
                            <span className="text-sm text-slate-700">
                                &quot;{keyword}&quot;
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                    High Intent
                                </span>
                                <Target className="h-3 w-3 text-sky-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats with count up */}
                <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between text-sm">
                    <span className="text-slate-500">Weekly Scan</span>
                    <span className="font-semibold text-sky-600">
                        {keywordCount} keywords tracked
                    </span>
                </div>
            </div>
        </div>
    );
}

// Blog auto-generation visualization with cycling posts
function BlogGenerator({ isInView }: { isInView: boolean }) {
    const [stage, setStage] = useState(0);
    const [currentPostIndex, setCurrentPostIndex] = useState(0);
    const [showNewPost, setShowNewPost] = useState(false);

    const stages = [
        "Analyzing keywords...",
        "Generating content...",
        "Optimizing SEO...",
        "Published!",
    ];

    // Cycle through stages
    useEffect(() => {
        const interval = setInterval(() => {
            setStage((prev) => {
                const nextStage = (prev + 1) % stages.length;
                // When we reach "Published!", trigger the new post animation
                if (nextStage === 3) {
                    setShowNewPost(true);
                    setTimeout(() => {
                        setCurrentPostIndex(
                            (i) => (i + 1) % sampleBlogPosts.length,
                        );
                    }, 500);
                } else {
                    setShowNewPost(false);
                }
                return nextStage;
            });
        }, 2500);
        return () => clearInterval(interval);
    }, [stages.length]);

    const postsCount = useCountUp(isInView, {
        end: 12,
        duration: 3.2,
        delay: 0.3,
    });

    const trafficIncrease = useCountUp(isInView, {
        end: 340,
        duration: 4,
        delay: 0.5,
        suffix: "%",
        prefix: "+",
    });

    const currentPost = sampleBlogPosts[currentPostIndex];

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 flex flex-col h-[280px] sm:h-[300px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
                        <FileText className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="font-semibold text-slate-900">
                        Auto Blog Generator
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-emerald-600">Active</span>
                </div>
            </div>

            {/* Progress indicator */}
            <div className="relative mb-4">
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-sky-400 to-emerald-400"
                        animate={{
                            width: `${((stage + 1) / stages.length) * 100}%`,
                        }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Current stage */}
            <div className="flex items-center gap-3 mb-4">
                <motion.div
                    animate={{ rotate: stage < 3 ? 360 : 0 }}
                    transition={{
                        duration: 1,
                        repeat: stage < 3 ? Infinity : 0,
                        ease: "linear",
                    }}
                >
                    {stage < 3 ? (
                        <RefreshCw className="h-5 w-5 text-sky-500" />
                    ) : (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    )}
                </motion.div>
                <span className="text-sm font-medium text-slate-700">
                    {stages[stage]}
                </span>
            </div>

            {/* Sample blog post with animation */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPostIndex}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{
                        opacity: showNewPost ? 1 : 0.7,
                        y: 0,
                        scale: showNewPost ? 1 : 0.98,
                    }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-lg bg-slate-50 p-4"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xs text-sky-600 font-medium mb-1"
                    >
                        NEW BLOG POST
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm font-semibold text-slate-900 mb-2"
                    >
                        &quot;{currentPost.title}&quot;
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-2"
                    >
                        {currentPost.tags.map((tag, i) => (
                            <motion.span
                                key={tag}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="text-xs bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full"
                            >
                                #{tag}
                            </motion.span>
                        ))}
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* Stats with count up */}
            <div className="mt-auto pt-4 border-t border-slate-200 grid grid-cols-2 gap-4 text-center">
                <div>
                    <div className="text-2xl font-bold text-slate-900">
                        {postsCount}
                    </div>
                    <div className="text-xs text-slate-500">
                        Posts This Month
                    </div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-emerald-600">
                        {trafficIncrease}
                    </div>
                    <div className="text-xs text-slate-500">
                        Organic Traffic
                    </div>
                </div>
            </div>
        </div>
    );
}

// Website optimization card
function WebsiteOptimizer({ isInView }: { isInView: boolean }) {
    const optimizationItems = [
        { label: "Meta Tags", status: "optimized", score: 98 },
        { label: "Page Speed", status: "optimized", score: 95 },
        { label: "Mobile UX", status: "optimized", score: 100 },
        { label: "Schema Markup", status: "optimized", score: 100 },
    ];

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 flex flex-col h-[280px] sm:h-[300px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
                        <Globe className="h-4 w-4 text-violet-600" />
                    </div>
                    <span className="font-semibold text-slate-900">
                        Site Optimizer
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <Moon className="h-4 w-4 text-violet-500" />
                    <span className="text-xs text-violet-600">
                        Auto-runs nightly
                    </span>
                </div>
            </div>

            {/* Optimization items */}
            <div className="space-y-3">
                {optimizationItems.map((item, index) => (
                    <OptimizerItem
                        key={item.label}
                        item={item}
                        index={index}
                        isInView={isInView}
                    />
                ))}
            </div>

            {/* Last update */}
            <div className="mt-auto pt-4 border-t border-slate-200 flex items-center justify-between text-sm">
                <span className="text-slate-500">Last optimization</span>
                <span className="text-violet-600 font-medium">2 hours ago</span>
            </div>
        </div>
    );
}

// Individual optimizer item with count up
function OptimizerItem({
    item,
    index,
    isInView,
}: {
    item: { label: string; status: string; score: number };
    index: number;
    isInView: boolean;
}) {
    const score = useCountUp(isInView, {
        end: item.score,
        duration: 2.8,
        delay: 0.8 + index * 0.15,
    });

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="flex items-center justify-between"
        >
            <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-sm text-slate-700">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${item.score}%` } : {}}
                        transition={{
                            duration: 1,
                            delay: 0.8 + index * 0.15,
                            ease: "easeOut",
                        }}
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-400"
                    />
                </div>
                <span className="text-xs font-medium text-emerald-600 w-6 text-right">
                    {score}
                </span>
            </div>
        </motion.div>
    );
}

// Add AnimatePresence import
import { AnimatePresence } from "motion/react";

export function SEOAutomationSection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id="services"
            ref={ref}
            className="relative py-24 overflow-hidden bg-gradient-to-b from-sky-300 via-teal-100 to-sky-300"
        >
            {/* Background decoration */}
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
                        <Zap className="h-4 w-4 text-sky-500" />
                        <span className="text-sm font-medium text-sky-700">
                            SEO That Works While You Sleep
                        </span>
                    </div>
                    <h2 className="font-outfit text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                        Automated SEO That{" "}
                        <span className="bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent">
                            Never Stops Working
                        </span>
                    </h2>
                    <p className="font-lora text-xl text-slate-600 leading-relaxed">
                        Our AI-powered system scans what your patients are
                        searching for, generates SEO-optimized blog content, and
                        continuously improves your website—
                        <span className="text-sky-600 font-semibold">
                            all automatically
                        </span>
                        .
                    </p>
                </motion.div>

                {/* Main grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {/* Left: Keyword scanner + Blog generator */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <KeywordScanner isInView={isInView} />
                        <BlogGenerator isInView={isInView} />
                    </motion.div>

                    {/* Right: Features + Optimizer */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-6"
                    >
                        {/* How it works steps */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6">
                            <h3 className="font-semibold text-lg text-slate-900 mb-4">
                                How Our SEO Automation Works
                            </h3>
                            <div className="space-y-4">
                                {[
                                    {
                                        icon: Search,
                                        title: "Weekly Keyword Scans",
                                        desc: "We monitor what patients in your area are searching for",
                                    },
                                    {
                                        icon: FileText,
                                        title: "Auto-Generated Blogs",
                                        desc: "AI creates SEO-optimized content targeting those keywords",
                                    },
                                    {
                                        icon: RefreshCw,
                                        title: "Continuous Optimization",
                                        desc: "Your website is constantly updated for better rankings",
                                    },
                                    {
                                        icon: TrendingUp,
                                        title: "Rank Higher Every Week",
                                        desc: "Watch your Google rankings climb month after month",
                                    },
                                ].map((step, index) => (
                                    <motion.div
                                        key={step.title}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={
                                            isInView ? { opacity: 1, x: 0 } : {}
                                        }
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.6 + index * 0.1,
                                        }}
                                        className="flex gap-4"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-50 to-teal-50 border border-sky-100">
                                            <step.icon className="h-5 w-5 text-sky-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">
                                                {step.title}
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                {step.desc}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <WebsiteOptimizer isInView={isInView} />
                    </motion.div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-center"
                >
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 rounded-2xl bg-white border border-sky-200 px-8 py-4 shadow-lg">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-sky-600" />
                            <span className="font-medium text-slate-700">
                                Average client sees{" "}
                                <span className="text-sky-600 font-bold">
                                    340% more traffic
                                </span>{" "}
                                in 6 months
                            </span>
                        </div>
                        <DentistHoverButton
                            text="See Your SEO Potential"
                            onClick={() => openCalendlyPopup()}
                            variant="primary"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
