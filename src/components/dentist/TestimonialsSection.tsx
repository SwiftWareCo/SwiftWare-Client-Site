"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
    Star,
    Quote,
    ChevronLeft,
    ChevronRight,
    TrendingUp,
    Users,
    Calendar,
} from "lucide-react";

const testimonials = [
    {
        quote: "SwiftWare transformed our online presence. We went from page 3 on Google to position #1 for 'dentist near me' in just 4 months. New patient calls have doubled!",
        author: "Dr. Michael Chen",
        practice: "Smile Care Dental",
        location: "Vancouver, BC",
        image: "MC",
        stats: { metric: "+127%", label: "New Patients" },
    },
    {
        quote: "The automated booking system is a game-changer. Patients can book 24/7, and our no-show rate dropped from 15% to just 3%. The reminder emails are beautiful!",
        author: "Dr. Sarah Thompson",
        practice: "Bright Smile Family Dentistry",
        location: "Richmond, BC",
        image: "ST",
        stats: { metric: "-80%", label: "No-Shows" },
    },
    {
        quote: "Their social media marketing reached audiences we never could before. TikTok and Instagram are now bringing us younger patients who want cosmetic procedures.",
        author: "Dr. James Park",
        practice: "Modern Dental Studio",
        location: "Burnaby, BC",
        image: "JP",
        stats: { metric: "3x", label: "Social Reach" },
    },
    {
        quote: "I was skeptical about 'automated' blogs, but the content they generate is incredible. Every week there's fresh, relevant content that's bringing organic traffic.",
        author: "Dr. Emily Roberts",
        practice: "Westside Dental Care",
        location: "Vancouver, BC",
        image: "ER",
        stats: { metric: "+340%", label: "Organic Traffic" },
    },
    {
        quote: "As a new practice, I needed everything—website, SEO, social media. SwiftWare delivered it all, and I was fully booked within 6 months of opening.",
        author: "Dr. David Kim",
        practice: "Fresh Dental",
        location: "Surrey, BC",
        image: "DK",
        stats: { metric: "6 mo", label: "To Full Bookings" },
    },
];

const stats = [
    { icon: TrendingUp, value: "127%", label: "Avg. Patient Growth" },
    { icon: Users, value: "50+", label: "Dental Practices" },
    { icon: Calendar, value: "10K+", label: "Appointments Booked" },
    { icon: Star, value: "4.9", label: "Client Rating" },
];

// Individual testimonial card
function TestimonialCard({
    testimonial,
    isActive,
}: {
    testimonial: (typeof testimonials)[0];
    isActive: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
                opacity: isActive ? 1 : 0.5,
                scale: isActive ? 1 : 0.95,
            }}
            transition={{ duration: 0.4 }}
            className={`bg-white rounded-3xl border shadow-xl p-8 ${
                isActive
                    ? "border-sky-200 shadow-sky-200/50"
                    : "border-slate-200 shadow-slate-200/50"
            }`}
        >
            {/* Quote icon */}
            <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-sky-50 to-teal-50">
                    <Quote className="h-6 w-6 text-sky-500" />
                </div>
            </div>

            {/* Quote text */}
            <p className="font-lora text-lg text-slate-700 leading-relaxed mb-8">
                &quot;{testimonial.quote}&quot;
            </p>

            {/* Author info */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-sky-200/50">
                        {testimonial.image}
                    </div>
                    <div>
                        <div className="font-semibold text-slate-900">
                            {testimonial.author}
                        </div>
                        <div className="text-sm text-slate-500">
                            {testimonial.practice}
                        </div>
                        <div className="text-xs text-slate-400">
                            {testimonial.location}
                        </div>
                    </div>
                </div>

                {/* Stats badge */}
                <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent">
                        {testimonial.stats.metric}
                    </div>
                    <div className="text-xs text-slate-500">
                        {testimonial.stats.label}
                    </div>
                </div>
            </div>

            {/* Rating */}
            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                ))}
                <span className="ml-2 text-sm text-slate-500">
                    Verified Client
                </span>
            </div>
        </motion.div>
    );
}

export function TestimonialsSection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-rotate testimonials
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToPrev = () => {
        setIsAutoPlaying(false);
        setCurrentIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length,
        );
    };

    const goToNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    return (
        <section
            id="results"
            ref={ref}
            className="relative py-24 overflow-hidden bg-gradient-to-b from-sky-300 via-teal-100 to-sky-300"
        >
            {/* Background elements */}
            <div className="absolute inset-0 -z-10">
                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(to right, #0ea5e9 1px, transparent 1px),
                  linear-gradient(to bottom, #f59e0b 1px, transparent 1px)`,
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
                    <div className="inline-flex items-center gap-2 rounded-full bg-white border border-amber-200 px-4 py-2 mb-6 shadow-sm">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-medium text-amber-700">
                            Trusted by 50+ Practices
                        </span>
                    </div>
                    <h2 className="font-outfit text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                        Real Results From{" "}
                        <span className="bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent">
                            Real Dentists
                        </span>
                    </h2>
                    <p className="font-lora text-xl text-slate-600 leading-relaxed">
                        Don&apos;t just take our word for it. See what dental
                        practices across BC are saying about their growth with
                        SwiftWare.
                    </p>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-lg shadow-slate-100/50"
                        >
                            <stat.icon className="h-6 w-6 text-sky-500 mx-auto mb-3" />
                            <div className="text-3xl font-bold text-slate-900 mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-slate-500">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Testimonials carousel */}
                <div className="relative">
                    {/* Navigation buttons */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden md:block">
                        <button
                            onClick={goToPrev}
                            className="cursor-pointer w-12 h-12 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-sky-600 hover:border-sky-200 transition-colors"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden md:block">
                        <button
                            onClick={goToNext}
                            className="cursor-pointer w-12 h-12 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-sky-600 hover:border-sky-200 transition-colors"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Testimonial cards */}
                    <div className="overflow-hidden">
                        <motion.div
                            animate={{ x: `-${currentIndex * 100}%` }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                            className="flex"
                        >
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="w-full flex-shrink-0 px-4"
                                >
                                    <div className="max-w-2xl mx-auto">
                                        <TestimonialCard
                                            testimonial={testimonial}
                                            isActive={index === currentIndex}
                                        />
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Dots indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setIsAutoPlaying(false);
                                    setCurrentIndex(index);
                                }}
                                className={`cursor-pointer w-3 h-3 rounded-full ${
                                    index === currentIndex
                                        ? "bg-gradient-to-r from-sky-500 to-teal-500 w-8"
                                        : "bg-slate-200 hover:bg-slate-300"
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile navigation */}
                <div className="flex justify-center gap-4 mt-6 md:hidden">
                    <button
                        onClick={goToPrev}
                        className="cursor-pointer w-12 h-12 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="cursor-pointer w-12 h-12 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </div>

                {/* Trust logos placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <p className="text-sm text-slate-500 mb-6">
                        Trusted by dental practices across BC
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 opacity-50">
                        {[
                            "Vancouver",
                            "Richmond",
                            "Burnaby",
                            "Surrey",
                            "Coquitlam",
                            "Delta",
                        ].map((city) => (
                            <div
                                key={city}
                                className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-600 shadow-sm"
                            >
                                {city}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
