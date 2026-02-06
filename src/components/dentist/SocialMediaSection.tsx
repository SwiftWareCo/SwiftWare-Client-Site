"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
    Instagram,
    Facebook,
    Linkedin,
    Share2,
    Heart,
    MessageCircle,
    Eye,
    TrendingUp,
    Sparkles,
    CheckCircle2,
    Smile,
    Sparkle,
    Shield,
    Moon,
} from "lucide-react";
import { openCalendlyPopup } from "@/lib/calendly";
import { DentistHoverButton } from "./DentistHoverButton";

// Platform icons and data
const platforms = [
    {
        name: "Instagram",
        icon: Instagram,
        color: "from-pink-500 to-purple-600",
        bgColor: "bg-gradient-to-br from-pink-50 to-purple-50",
        borderColor: "border-pink-200",
        textColor: "text-pink-600",
        reach: "2.1M",
        engagement: "8.4%",
    },
    {
        name: "TikTok",
        icon: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
            </svg>
        ),
        color: "from-slate-900 to-slate-700",
        bgColor: "bg-gradient-to-br from-slate-50 to-slate-100",
        borderColor: "border-slate-200",
        textColor: "text-slate-900",
        reach: "5.8M",
        engagement: "12.1%",
    },
    {
        name: "Facebook",
        icon: Facebook,
        color: "from-blue-600 to-blue-700",
        bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
        borderColor: "border-blue-200",
        textColor: "text-blue-600",
        reach: "3.4M",
        engagement: "5.2%",
    },
    {
        name: "LinkedIn",
        icon: Linkedin,
        color: "from-sky-600 to-blue-700",
        bgColor: "bg-gradient-to-br from-sky-50 to-blue-50",
        borderColor: "border-sky-200",
        textColor: "text-sky-700",
        reach: "890K",
        engagement: "4.8%",
    },
    {
        name: "X",
        icon: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d="M18.244 2H21l-6.402 7.327L22 22h-6.172l-4.83-6.302L5.44 22H2.68l6.85-7.84L2 2h6.326l4.368 5.686L18.244 2zm-1.082 18h1.716L7.01 4H5.148l12.014 16z" />
            </svg>
        ),
        color: "from-slate-900 to-slate-700",
        bgColor: "bg-gradient-to-br from-slate-50 to-slate-100",
        borderColor: "border-slate-200",
        textColor: "text-slate-900",
        reach: "1.2M",
        engagement: "6.3%",
    },
];

const socialPosts = [
    {
        platform: "Instagram",
        badgeClassName: "bg-pink-50 text-pink-600 border border-pink-200",
        avatarClassName: "bg-gradient-to-br from-pink-400 to-purple-500",
        postClassName: "bg-gradient-to-br from-pink-50 to-purple-50",
        textClassName: "text-slate-600",
        subTextClassName: "text-slate-400",
        title: "Before & After",
        subtitle: "Professional Whitening",
        views: "4.2K views",
        handle: "dentalsmile",
        caption: "Transform your smile! Book your free consultation today ✨",
        initialLikes: 247,
        mediaLabel: "Reel",
        isVideo: false,
        // Visual content for before/after
        visualContent: {
            type: "before-after" as const,
            imageSrc: "/images/dentist/instagram-photo.png",
            beforeLabel: "Before",
            afterLabel: "After",
            beforeGradient: "from-slate-200 to-slate-300",
            afterGradient: "from-pink-200 to-purple-200",
            beforeIcon: Smile,
            afterIcon: Sparkle,
        },
    },
    {
        platform: "TikTok",
        badgeClassName: "bg-slate-900 text-white border border-slate-900",
        avatarClassName: "bg-gradient-to-br from-slate-900 to-slate-700",
        postClassName: "bg-gradient-to-br from-slate-900 to-slate-700",
        textClassName: "text-white/90",
        subTextClassName: "text-white/70",
        title: "30-Second Tip",
        subtitle: "Protect Your Teeth",
        views: "12.8K views",
        handle: "brightsmiledental",
        caption:
            "Quick tip: protect your teeth at night and wake up pain-free.",
        initialLikes: 512,
        mediaLabel: "Video",
        isVideo: true,
        // Visual content for tip
        visualContent: {
            type: "tip" as const,
            imageSrc: "/images/dentist/tiktok-photo.png",
            tipNumber: "Tip #1",
            tipTitle: "Night Guards",
            tipDesc: "Prevent grinding",
            gradient: "from-slate-700 via-slate-800 to-slate-900",
            icon: Shield,
            accentIcon: Moon,
        },
    },
];

// Animated social post card
function SocialPostCard({
    delay,
    post,
}: {
    delay: number;
    post: (typeof socialPosts)[number];
}) {
    const [likes, setLikes] = useState(post.initialLikes);
    const [isLiked, setIsLiked] = useState(false);
    const isTikTok = post.platform === "TikTok";

    useEffect(() => {
        const interval = setInterval(() => {
            setLikes((prev) => prev + Math.floor(Math.random() * 3));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // TikTok-style card
    if (isTikTok) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay }}
                className="rounded-2xl border border-slate-800 bg-slate-900 shadow-xl shadow-slate-900/50 overflow-hidden"
            >
                {/* TikTok Video Container */}
                <div className="relative aspect-[9/16] bg-gradient-to-br from-slate-800 to-slate-900">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${post.visualContent.imageSrc})`,
                        }}
                    />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Right side action buttons - TikTok style */}
                    <div className="absolute right-2 bottom-20 flex flex-col items-center gap-4">
                        {/* Profile picture */}
                        <div className="relative">
                            <div
                                className={`h-10 w-10 rounded-full ${post.avatarClassName} flex items-center justify-center border-2 border-white`}
                            >
                                <span className="text-white font-bold text-xs">
                                    DS
                                </span>
                            </div>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 rounded-full p-0.5">
                                <svg
                                    className="w-2.5 h-2.5 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Like button */}
                        <button
                            onClick={() => {
                                setIsLiked(!isLiked);
                                setLikes((prev) =>
                                    isLiked ? prev - 1 : prev + 1,
                                );
                            }}
                            className="flex flex-col items-center gap-0.5 cursor-pointer"
                        >
                            <div className="flex h-10 w-10 items-center justify-center">
                                <Heart
                                    className={`h-7 w-7 transition-colors ${
                                        isLiked
                                            ? "fill-red-500 text-red-500"
                                            : "text-white"
                                    }`}
                                />
                            </div>
                            <span className="text-white text-xs font-medium">
                                {likes >= 1000
                                    ? (likes / 1000).toFixed(1) + "K"
                                    : likes}
                            </span>
                        </button>

                        {/* Comment button */}
                        <button className="flex flex-col items-center gap-0.5 cursor-pointer">
                            <div className="flex h-10 w-10 items-center justify-center">
                                <MessageCircle className="h-7 w-7 text-white" />
                            </div>
                            <span className="text-white text-xs font-medium">
                                89
                            </span>
                        </button>

                        {/* Share/Save button */}
                        <button className="flex flex-col items-center gap-0.5 cursor-pointer">
                            <div className="flex h-10 w-10 items-center justify-center">
                                <Share2 className="h-7 w-7 text-white" />
                            </div>
                            <span className="text-white text-xs font-medium">
                                Share
                            </span>
                        </button>
                    </div>

                    {/* Bottom section - TikTok style */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 pr-16">
                        {/* Username */}
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-white font-semibold text-sm">
                                @dentalsmile
                            </span>
                            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                                Sponsored
                            </span>
                        </div>

                        {/* Caption */}
                        <p className="text-white text-sm mb-3 leading-relaxed">
                            {post.caption}
                        </p>

                        {/* Music/Sound - TikTok style */}
                        <div className="flex items-center gap-1.5">
                            <svg
                                className="w-4 h-4 text-white flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                            </svg>
                            <div className="overflow-hidden flex-1">
                                <div className="text-white text-xs whitespace-nowrap animate-marquee">
                                    Dental Smile Clinic • Original Sound
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Spinning music disc - positioned at far right */}
                    <div className="absolute right-2 bottom-4">
                        <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center animate-spin-slow">
                            <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center">
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Instagram-style card (original)
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden"
        >
            {/* Post header */}
            <div className="p-4 flex items-center gap-3 border-b border-slate-50">
                <div
                    className={`h-10 w-10 rounded-full ${post.avatarClassName} flex items-center justify-center`}
                >
                    <span className="text-white font-bold text-sm">DS</span>
                </div>
                <div>
                    <div className="font-semibold text-slate-900 text-sm">
                        Dental Smile Clinic
                    </div>
                    <div className="text-xs text-slate-500">Sponsored</div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${post.badgeClassName}`}
                    >
                        {post.platform}
                    </span>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wide">
                        {post.mediaLabel}
                    </span>
                </div>
            </div>

            {/* Post Visual Content - Before/After */}
            <div
                className={`relative aspect-square ${post.postClassName} overflow-hidden`}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${post.visualContent.imageSrc})`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
                {/* Engagement overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + 1 }}
                    className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2"
                >
                    <Eye className="h-3 w-3 text-slate-500" />
                    <span className="text-xs font-medium text-slate-700">
                        {post.views}
                    </span>
                </motion.div>
            </div>

            {/* Engagement bar */}
            <div className="p-4">
                <div className="flex items-center gap-4 mb-3">
                    <button
                        onClick={() => {
                            setIsLiked(!isLiked);
                            setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
                        }}
                        className="cursor-pointer flex items-center gap-1"
                    >
                        <Heart
                            className={`h-5 w-5 transition-colors ${
                                isLiked
                                    ? "fill-red-500 text-red-500"
                                    : "text-slate-400"
                            }`}
                        />
                    </button>
                    <MessageCircle className="h-5 w-5 text-slate-400" />
                    <Share2 className="h-5 w-5 text-slate-400" />
                </div>
                <div className="text-sm">
                    <span className="font-semibold text-slate-900">
                        {likes} likes
                    </span>
                </div>
                <p className="text-sm text-slate-600 mt-1">
                    <span className="font-semibold">{post.handle}</span>{" "}
                    {post.caption}
                </p>
            </div>
        </motion.div>
    );
}

// Platform stats card
function PlatformCard({
    platform,
    index,
}: {
    platform: (typeof platforms)[0];
    index: number;
}) {
    const Icon = platform.icon;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`relative group ${platform.bgColor} ${platform.borderColor} border rounded-2xl p-5 cursor-pointer shadow-sm hover:shadow-md transition-shadow`}
        >
            {/* Platform icon */}
            <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-white mb-4`}
            >
                <Icon />
            </div>

            {/* Platform name */}
            <h4 className="font-semibold text-slate-900 mb-3">
                {platform.name}
            </h4>

            {/* Stats */}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Reach</span>
                    <span className={`text-sm font-bold ${platform.textColor}`}>
                        {platform.reach}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Engagement</span>
                    <span className={`text-sm font-bold ${platform.textColor}`}>
                        {platform.engagement}
                    </span>
                </div>
            </div>

            {/* Checkmark */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg"
            >
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            </motion.div>
        </motion.div>
    );
}

export function SocialMediaSection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            id="social-media"
            className="relative py-24 overflow-hidden bg-gradient-to-b from-pink-200 via-pink-50 to-pink-200"
        >
            {/* Background elements */}
            <div className="absolute inset-0 -z-10">
                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(to right, #a855f7 1px, transparent 1px),
                              linear-gradient(to bottom, #ec4899 1px, transparent 1px)`,
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
                    <div className="inline-flex items-center gap-2 rounded-full bg-white border border-purple-200 px-4 py-2 mb-6 shadow-sm">
                        <Share2 className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium text-purple-700">
                            Multi-Platform Marketing
                        </span>
                    </div>
                    <h2 className="font-outfit text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                        We Target{" "}
                        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                            Every Algorithm
                        </span>
                    </h2>
                    <p className="font-lora text-xl text-slate-600 leading-relaxed">
                        Why limit yourself to one platform? We create
                        scroll-stopping content for Instagram, TikTok, Facebook,
                        LinkedIn, and even X—
                        <span className="text-purple-600 font-semibold">
                            leaving no stone unturned
                        </span>
                        .
                    </p>
                </motion.div>

                {/* Main content grid */}
                <div className="grid lg:grid-cols-5 gap-6 mb-12">
                    {/* Platform cards */}
                    {platforms.map((platform, index) => (
                        <PlatformCard
                            key={platform.name}
                            platform={platform}
                            index={index}
                        />
                    ))}
                </div>

                {/* Content showcase */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <SocialPostCard delay={0.2} post={socialPosts[0]} />

                    {/* Center: Key benefits */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col justify-center space-y-6"
                    >
                        <h3 className="font-outfit text-2xl font-bold text-slate-900">
                            What Makes Our Social Marketing Different
                        </h3>
                        {[
                            {
                                icon: Sparkles,
                                title: "Scroll-Stopping Content",
                                desc: "Professional graphics & videos that grab attention",
                            },
                            {
                                icon: TrendingUp,
                                title: "Algorithm Optimized",
                                desc: "We know exactly what each platform wants to see",
                            },
                            {
                                icon: Eye,
                                title: "Targeted Reach",
                                desc: "Your content reaches potential patients in your area",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="flex gap-4"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                                    <item.icon className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <div className="font-medium text-slate-900">
                                        {item.title}
                                    </div>
                                    <div className="text-sm text-slate-500">
                                        {item.desc}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <SocialPostCard delay={0.4} post={socialPosts[1]} />
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center"
                >
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 rounded-2xl bg-white border border-purple-200 px-8 py-6 shadow-lg">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-purple-600" />
                            <span className="font-medium text-slate-700">
                                Reach{" "}
                                <span className="text-purple-600 font-bold">
                                    10x more patients
                                </span>{" "}
                                with multi-platform marketing
                            </span>
                        </div>
                        <DentistHoverButton
                            text="Start Your Social Strategy"
                            onClick={() => openCalendlyPopup()}
                            variant="pink"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
