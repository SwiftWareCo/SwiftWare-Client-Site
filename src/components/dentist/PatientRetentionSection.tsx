"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
    Calendar,
    Bell,
    Mail,
    MessageSquare,
    Users,
    Heart,
    CheckCircle2,
    Clock,
    Star,
    Send,
    Smartphone,
} from "lucide-react";
import { openCalendlyPopup } from "@/lib/calendly";
import { DentistHoverButton } from "./DentistHoverButton";
import { useCountUp } from "@/hooks/useCountUp";

// Animated cursor component
function AnimatedCursor({
    x,
    y,
    clicking,
}: {
    x: number;
    y: number;
    clicking: boolean;
}) {
    return (
        <motion.div
            className="absolute z-20 pointer-events-none"
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            {/* Cursor */}
            <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                animate={{ scale: clicking ? 0.8 : 1 }}
                transition={{ duration: 0.1 }}
            >
                <path
                    d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36Z"
                    fill="#1e293b"
                    stroke="white"
                    strokeWidth="1.5"
                />
            </motion.svg>
            {/* Click ripple */}
            {clicking && (
                <motion.div
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-0 left-0 w-6 h-6 rounded-full bg-sky-400"
                />
            )}
        </motion.div>
    );
}

// Animated booking interface
function BookingInterface() {
    const containerRef = useRef<HTMLDivElement>(null);
    const dateRef = useRef<HTMLDivElement>(null);
    const timeRef = useRef<HTMLDivElement>(null);
    const confirmRef = useRef<HTMLDivElement>(null);

    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isBooked, setIsBooked] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 150, y: 100 });
    const [isClicking, setIsClicking] = useState(false);

    const dates = [12, 13, 14, 15, 16];
    const times = ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"];

    // Helper to get center position of an element relative to container
    const getElementCenter = (
        elementRef: React.RefObject<HTMLDivElement | null>,
    ) => {
        if (!elementRef.current || !containerRef.current) return null;
        const containerRect = containerRef.current.getBoundingClientRect();
        const elementRect = elementRef.current.getBoundingClientRect();
        return {
            x: elementRect.left - containerRect.left + elementRect.width / 2,
            y: elementRect.top - containerRect.top + elementRect.height / 2,
        };
    };

    useEffect(() => {
        // Auto-animate booking flow with cursor
        const sequence = async () => {
            // Reset state
            setIsBooked(false);
            setSelectedDate(null);
            setSelectedTime(null);
            setCursorPos({ x: 150, y: 100 });

            await new Promise((r) => setTimeout(r, 1000));

            // Move to date (Jan 14 - middle button)
            const datePos = getElementCenter(dateRef);
            if (datePos) setCursorPos(datePos);
            await new Promise((r) => setTimeout(r, 600));

            // Click date
            setIsClicking(true);
            await new Promise((r) => setTimeout(r, 150));
            setSelectedDate(14);
            setIsClicking(false);
            await new Promise((r) => setTimeout(r, 500));

            // Move to time (2:00 PM - third slot)
            const timePos = getElementCenter(timeRef);
            if (timePos) setCursorPos(timePos);
            await new Promise((r) => setTimeout(r, 600));

            // Click time
            setIsClicking(true);
            await new Promise((r) => setTimeout(r, 150));
            setSelectedTime("2:00 PM");
            setIsClicking(false);
            await new Promise((r) => setTimeout(r, 500));

            // Move to confirm button
            const confirmPos = getElementCenter(confirmRef);
            if (confirmPos) setCursorPos(confirmPos);
            await new Promise((r) => setTimeout(r, 600));

            // Click confirm
            setIsClicking(true);
            await new Promise((r) => setTimeout(r, 150));
            setIsClicking(false);
            await new Promise((r) => setTimeout(r, 300));
            setIsBooked(true);

            // Wait and restart
            await new Promise((r) => setTimeout(r, 3500));
        };

        sequence();
        const interval = setInterval(sequence, 9000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            ref={containerRef}
            className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden relative"
        >
            {/* Animated cursor */}
            <AnimatedCursor
                x={cursorPos.x}
                y={cursorPos.y}
                clicking={isClicking}
            />

            {/* Header */}
            <div className="bg-gradient-to-r from-sky-500 to-teal-500 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white">
                        <Calendar className="h-5 w-5" />
                        <span className="font-semibold">Quick Book</span>
                    </div>
                    <div className="text-xs text-white/80">Available 24/7</div>
                </div>
            </div>

            {/* Fixed height container to prevent layout shift */}
            <div className="p-5 min-h-[320px] max-h-[320px] relative overflow-hidden">
                <motion.div
                    initial={false}
                    animate={{
                        opacity: isBooked ? 0 : 1,
                        scale: isBooked ? 0.95 : 1,
                        y: isBooked ? -20 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className={
                        isBooked ? "pointer-events-none absolute inset-5" : ""
                    }
                >
                    {/* Date picker */}
                    <div className="mb-4">
                        <div className="text-sm font-medium text-slate-700 mb-2">
                            Select Date
                        </div>
                        <div className="flex gap-2">
                            {dates.map((date) => (
                                <motion.div
                                    key={date}
                                    ref={date === 14 ? dateRef : undefined}
                                    animate={{
                                        scale: selectedDate === date ? 1.1 : 1,
                                        backgroundColor:
                                            selectedDate === date
                                                ? "#0ea5e9"
                                                : "#f8fafc",
                                    }}
                                    className={`flex-1 py-3 rounded-lg text-center transition-colors ${
                                        selectedDate === date
                                            ? "text-white"
                                            : "text-slate-600"
                                    }`}
                                >
                                    <div className="text-xs">Jan</div>
                                    <div className="font-semibold">{date}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Time picker */}
                    <div className="mb-4">
                        <div className="text-sm font-medium text-slate-700 mb-2">
                            Select Time
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {times.map((time) => (
                                <motion.div
                                    key={time}
                                    ref={
                                        time === "2:00 PM" ? timeRef : undefined
                                    }
                                    animate={{
                                        scale: selectedTime === time ? 1.05 : 1,
                                        backgroundColor:
                                            selectedTime === time
                                                ? "#0ea5e9"
                                                : "#f8fafc",
                                    }}
                                    className={`py-2 rounded-lg text-sm font-medium text-center transition-colors ${
                                        selectedTime === time
                                            ? "text-white"
                                            : "text-slate-600"
                                    }`}
                                >
                                    {time}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Book button */}
                    <div
                        ref={confirmRef}
                        className={`w-full py-3 rounded-xl text-white font-semibold text-center ${
                            selectedDate && selectedTime
                                ? "bg-gradient-to-r from-sky-500 to-teal-500 shadow-lg shadow-sky-200/50"
                                : "bg-slate-200 text-slate-400"
                        }`}
                    >
                        {selectedDate && selectedTime
                            ? "Confirm Booking"
                            : "Select Date & Time"}
                    </div>
                </motion.div>

                {/* Success state */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{
                        opacity: isBooked ? 1 : 0,
                        scale: isBooked ? 1 : 0.8,
                        y: isBooked ? 0 : 20,
                    }}
                    transition={{
                        duration: 0.4,
                        type: "spring",
                        stiffness: 200,
                    }}
                    className="absolute inset-5 flex flex-col items-center justify-center"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{
                            scale: isBooked ? 1 : 0,
                            rotate: isBooked ? 0 : -180,
                        }}
                        transition={{
                            type: "spring",
                            delay: 0.1,
                            stiffness: 200,
                        }}
                        className="w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center shadow-lg shadow-emerald-100"
                    >
                        <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                            opacity: isBooked ? 1 : 0,
                            y: isBooked ? 0 : 10,
                        }}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                    >
                        <div className="text-lg font-semibold text-slate-900 mb-1">
                            Appointment Booked!
                        </div>
                        <div className="text-sm text-slate-500">
                            Jan 14, 2024 at 2:00 PM
                        </div>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: isBooked ? "100%" : 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="mt-3 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-auto max-w-[120px]"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

// Email reminder preview with enhanced padding
function EmailPreview() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            whileHover={{ y: -5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden"
        >
            {/* Email header */}
            <div className="p-5 border-b border-slate-100">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center">
                            <Mail className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-medium text-slate-900 text-sm">
                            Dental Smile Clinic
                        </span>
                    </div>
                    <span className="text-xs text-slate-400">Just now</span>
                </div>
                <div className="text-base font-semibold text-slate-900 pl-1">
                    ⏰ Your Checkup is Tomorrow!
                </div>
            </div>

            {/* Email body preview with more padding */}
            <div className="p-5">
                <div className="text-sm text-slate-600 mb-5 leading-relaxed">
                    Hi Sarah, just a friendly reminder that your dental checkup
                    is scheduled for tomorrow at 2:00 PM. We can&apos;t wait to
                    see you! 😊
                </div>

                {/* CTA button in email */}
                <motion.div
                    animate={{ scale: isHovered ? 1.02 : 1 }}
                    className="bg-gradient-to-r from-sky-500 to-teal-500 text-white text-center py-3.5 rounded-xl text-sm font-semibold"
                >
                    Confirm Appointment
                </motion.div>

                {/* Open rate badge with more spacing */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-5 flex items-center justify-center gap-2 text-xs text-emerald-600 bg-emerald-50 rounded-full py-2.5"
                >
                    <TrendingUpIcon className="h-3.5 w-3.5" />
                    <span>92% Open Rate • 78% Click Rate</span>
                </motion.div>
            </div>
        </motion.div>
    );
}

function TrendingUpIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
        </svg>
    );
}

// SMS notification
function SMSNotification() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(true);
            setTimeout(() => setIsVisible(false), 4000);
        }, 6000);

        setTimeout(() => setIsVisible(true), 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                x: isVisible ? 0 : 50,
                scale: isVisible ? 1 : 0.9,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/50 p-4 max-w-xs"
        >
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500">
                    <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-slate-900 text-sm">
                            Dental Smile
                        </span>
                        <span className="text-xs text-slate-400">Now</span>
                    </div>
                    <p className="text-sm text-slate-600">
                        Hi Sarah! 👋 Your 6-month checkup is due. Tap here to
                        book at your convenience!
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

// Feature card component
function FeatureCard({
    icon: Icon,
    title,
    desc,
    stat,
    index,
    isInView,
}: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    desc: string;
    stat: string;
    index: number;
    isInView: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.1,
            }}
            className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-100/50 hover:shadow-xl transition-shadow"
        >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
                <Icon className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
                <div className="font-semibold text-slate-900 mb-1">{title}</div>
                <div className="text-sm text-slate-600 mb-2">{desc}</div>
                <div className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <Star className="h-3 w-3" />
                    {stat}
                </div>
            </div>
        </motion.div>
    );
}

// Stat card with count up
function StatCard({
    icon: Icon,
    value,
    label,
    index,
    isInView,
    suffix = "",
}: {
    icon: React.ComponentType<{ className?: string }>;
    value: number;
    label: string;
    index: number;
    isInView: boolean;
    suffix?: string;
}) {
    const countValue = useCountUp(isInView, {
        end: value,
        duration: 3.5,
        delay: 0.5 + index * 0.1,
        suffix,
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-100/50"
        >
            <Icon className="h-6 w-6 text-emerald-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-slate-900 mb-1">
                {countValue}
            </div>
            <div className="text-sm text-slate-500">{label}</div>
        </motion.div>
    );
}

export function PatientRetentionSection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Feature cards for Booking (Online Booking + Smart Reminders)
    const bookingFeatures = [
        {
            icon: Calendar,
            title: "24/7 Online Booking",
            desc: "Patients book appointments anytime—even at 2 AM. No phone calls, no waiting.",
            stat: "67% of bookings happen after hours",
        },
        {
            icon: Bell,
            title: "Smart Reminders",
            desc: "Automated email and SMS reminders at the perfect intervals to reduce no-shows.",
            stat: "90% reduction in missed appointments",
        },
    ];

    // Feature cards for Email/SMS (Email Templates + Recall Campaigns)
    const emailFeatures = [
        {
            icon: Mail,
            title: "Beautiful Email Templates",
            desc: "Professional, on-brand emails that patients actually want to open and click.",
            stat: "92% average open rate",
        },
        {
            icon: Users,
            title: "Recall Campaigns",
            desc: "Automatic follow-ups for 6-month checkups, cleanings, and treatment reminders.",
            stat: "3x more repeat visits",
        },
    ];

    return (
        <section
            id="how-it-works"
            ref={ref}
            className="relative py-24 overflow-hidden bg-gradient-to-b from-pink-200 via-pink-50 to-pink-200"
        >
            {/* Background elements */}
            <div className="absolute inset-0 -z-10">
                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px),
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
                    <div className="inline-flex items-center gap-2 rounded-full bg-white border border-emerald-200 px-4 py-2 mb-6 shadow-sm">
                        <Heart className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm font-medium text-emerald-700">
                            Patient Loyalty System
                        </span>
                    </div>
                    <h2 className="font-outfit text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                        We Don&apos;t Just Get Patients—
                        <br />
                        <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                            We Keep Them
                        </span>
                    </h2>
                    <p className="font-lora text-xl text-slate-600 leading-relaxed">
                        Automated booking, beautiful email reminders, and SMS
                        follow-ups ensure your patients never miss an
                        appointment and always feel valued.
                    </p>
                </motion.div>

                {/* Row 1: BookingInterface (Left) + Feature Cards (Right) */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* Left: QuickBook Component */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="rounded-3xl p-6 border shadow-lg"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(224, 242, 254, 0.8) 0%, rgba(204, 251, 241, 0.8) 100%)",
                            borderColor: "rgba(14, 165, 233, 0.2)",
                        }}
                    >
                        <BookingInterface />
                    </motion.div>

                    {/* Right: Feature Cards for Booking */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-6 flex flex-col justify-center"
                    >
                        {bookingFeatures.map((feature, index) => (
                            <FeatureCard
                                key={feature.title}
                                icon={feature.icon}
                                title={feature.title}
                                desc={feature.desc}
                                stat={feature.stat}
                                index={index}
                                isInView={isInView}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Row 2: Feature Cards (Left) + Email Preview (Right) */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {/* Left: Feature Cards for Email */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="space-y-6 flex flex-col justify-center order-2 lg:order-1"
                    >
                        {emailFeatures.map((feature, index) => (
                            <FeatureCard
                                key={feature.title}
                                icon={feature.icon}
                                title={feature.title}
                                desc={feature.desc}
                                stat={feature.stat}
                                index={index}
                                isInView={isInView}
                            />
                        ))}
                    </motion.div>

                    {/* Right: Email Preview Component */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="rounded-3xl p-6 border shadow-lg order-1 lg:order-2"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(236, 253, 245, 0.8) 0%, rgba(204, 251, 241, 0.8) 100%)",
                            borderColor: "rgba(16, 185, 129, 0.2)",
                        }}
                    >
                        <EmailPreview />
                        {/* Floating SMS notification */}
                        <div className="relative h-20 flex items-center justify-end mt-4">
                            <SMSNotification />
                        </div>
                    </motion.div>
                </div>

                {/* Stats bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
                >
                    <StatCard
                        icon={Clock}
                        value={24}
                        suffix="/7"
                        label="Booking Availability"
                        index={0}
                        isInView={isInView}
                    />
                    <StatCard
                        icon={Send}
                        value={50}
                        suffix="K+"
                        label="Reminders Sent Monthly"
                        index={1}
                        isInView={isInView}
                    />
                    <StatCard
                        icon={Smartphone}
                        value={92}
                        suffix="%"
                        label="Open Rate"
                        index={2}
                        isInView={isInView}
                    />
                    <StatCard
                        icon={Heart}
                        value={3}
                        suffix="x"
                        label="Patient Retention"
                        index={3}
                        isInView={isInView}
                    />
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center"
                >
                    <DentistHoverButton
                        text="See How It Works For Your Practice"
                        onClick={() => openCalendlyPopup()}
                        variant="pink"
                        className="px-8 py-4 text-lg"
                    />
                </motion.div>
            </div>
        </section>
    );
}
