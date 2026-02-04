"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    AnimatePresence,
    motion,
    useScroll,
    useTransform,
    useSpring,
} from "motion/react";
import { Menu, X, Home } from "lucide-react";
import { openCalendlyPopup } from "@/lib/calendly";
import { RoundedSlideButton } from "./RoundedSlideButton";

// Dentist site colors
const colors = {
    primary: "#0ea5e9", // sky-500
    secondary: "#14b8a6", // teal-500
};

const colorsRGB = {
    primaryRGB: "14, 165, 233",
    secondaryRGB: "20, 184, 166",
};

const navLinks = [
    { label: "Home", href: "#", icon: Home },
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
];

const headerContainerVariants = {
    hidden: {
        y: -24,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as const,
            when: "beforeChildren",
        },
    },
};

const navCardVariants = {
    rest: {
        borderRadius: "1.5rem",
    },
    scrolled: {
        borderRadius: "1.25rem",
        transition: {
            duration: 0.35,
            ease: [0.25, 0.8, 0.25, 1] as const,
        },
    },
};

const hoverHaloVariants = {
    rest: {
        opacity: 0,
    },
    hover: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut" as const,
        },
    },
};

const dividerVariants = {
    hidden: {
        scaleX: 0,
    },
    visible: {
        scaleX: 1,
        transition: {
            duration: 0.9,
            delay: 0.4,
            ease: [0.33, 1, 0.68, 1] as const,
        },
    },
};

const mobileMenuVariants = {
    hidden: {
        opacity: 0,
        scaleY: 0.85,
        transition: {
            duration: 0.2,
            ease: [0.45, 0, 0.55, 1] as const,
        },
    },
    visible: {
        opacity: 1,
        scaleY: 1,
        transition: {
            duration: 0.3,
            ease: [0.33, 1, 0.68, 1] as const,
            staggerChildren: 0.05,
        },
    },
};

export function DentistHeader() {
    const [scrolled, setScrolled] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [navHovered, setNavHovered] = useState(false);

    const { scrollY } = useScroll();
    const navScale = useTransform(scrollY, [0, 160], [1, 0.95]);
    const navPadding = useTransform(scrollY, [0, 160], [20, 12]);
    const undockOffset = useTransform(scrollY, [0, 160], [0, 24]);
    const floatingTop = useSpring(undockOffset, {
        stiffness: 220,
        damping: 30,
        mass: 0.7,
    });

    const headerShadowScrolled = scrolled
        ? `0 16px 40px rgba(${colorsRGB.primaryRGB}, 0.1), 0 0 0 1px rgba(${colorsRGB.secondaryRGB}, 0.08)`
        : "none";

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    const scrollToSection = (href: string) => {
        if (href === "#") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
        setMobileMenuOpen(false);
    };

    return (
        <motion.header
            className="fixed left-0 right-0 z-50"
            onMouseMove={handleMouseMove}
            variants={headerContainerVariants}
            initial="hidden"
            animate="visible"
            style={{ top: floatingTop }}
        >
            <div className="relative w-full px-4 sm:px-6 lg:px-10">
                {/* Top gradient glow */}
                <div
                    className="pointer-events-none absolute inset-x-0 -top-32 h-64 opacity-40"
                    style={{
                        background: `radial-gradient(80% 50% at 50% 0%,
              rgba(${colorsRGB.primaryRGB}, 0.15),
              rgba(${colorsRGB.secondaryRGB}, 0.1),
              transparent 70%)`,
                    }}
                />

                <motion.div className="relative w-full">
                    <motion.div className="relative w-full group">
                        <motion.div
                            className="relative w-full overflow-visible rounded-3xl border border-transparent backdrop-blur-2xl transition-[background-color,border-color,box-shadow,transform] duration-500"
                            variants={navCardVariants}
                            initial="rest"
                            animate={scrolled ? "scrolled" : "rest"}
                            style={{
                                borderColor: scrolled
                                    ? `rgba(${colorsRGB.primaryRGB}, 0.2)`
                                    : "rgba(255,255,255,0)",
                                boxShadow: headerShadowScrolled,
                                backgroundColor: scrolled
                                    ? "rgba(255, 255, 255, 0.45)"
                                    : "transparent",
                                scale: navScale,
                                paddingTop: navPadding,
                                paddingBottom: navPadding,
                            }}
                            onHoverStart={() => setNavHovered(true)}
                            onHoverEnd={() => setNavHovered(false)}
                        >
                            {/* Hover halo effect */}
                            <motion.div
                                className="absolute inset-0 rounded-[inherit] opacity-0 pointer-events-none"
                                style={{
                                    background: `radial-gradient(340px circle at ${mousePos.x}% ${mousePos.y}%, rgba(${colorsRGB.primaryRGB},0.08), transparent 55%)`,
                                }}
                                variants={hoverHaloVariants}
                                initial="rest"
                                animate={navHovered ? "hover" : "rest"}
                            />

                            <div className="relative mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-6">
                                {/* Mobile: Logo + Menu Button */}
                                <div className="flex items-center justify-between sm:hidden">
                                    <Link
                                        href="/dentist"
                                        className="group/logo relative flex items-center gap-2 text-base font-bold tracking-wide"
                                    >
                                        <div className="relative">
                                            <motion.div
                                                whileHover={{
                                                    scale: 1.05,
                                                    rotate: 2,
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 25,
                                                }}
                                                className="size-7 rounded-lg shadow-lg flex items-center justify-center p-0.5 border border-white/20"
                                                style={{
                                                    backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                                                    boxShadow: `0 4px 14px rgba(${colorsRGB.primaryRGB}, 0.3)`,
                                                }}
                                            >
                                                <Image
                                                    src="/images/swiftware-logo-small-transparent.webp"
                                                    alt="SwiftWare Dental Marketing logo"
                                                    width={32}
                                                    height={32}
                                                    className="w-6 h-6 brightness-110 contrast-110"
                                                />
                                            </motion.div>
                                        </div>
                                        <div className="leading-tight">
                                            <span
                                                className={`text-sm font-bold ${
                                                    scrolled
                                                        ? "bg-clip-text text-transparent"
                                                        : "text-white"
                                                }`}
                                                style={{
                                                    backgroundImage: scrolled
                                                        ? `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
                                                        : "none",
                                                }}
                                            >
                                                SwiftWare
                                            </span>
                                            <div
                                                className={`text-[10px] font-medium ${
                                                    scrolled
                                                        ? "text-slate-600"
                                                        : "text-white/80"
                                                }`}
                                                style={{
                                                    color: scrolled
                                                        ? colors.primary
                                                        : "inherit",
                                                }}
                                            >
                                                Dental Marketing
                                            </div>
                                        </div>
                                    </Link>

                                    <button
                                        onClick={() =>
                                            setMobileMenuOpen(!mobileMenuOpen)
                                        }
                                        className={`cursor-pointer rounded-lg p-2 transition-colors ${
                                            scrolled
                                                ? "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                                : "text-white hover:bg-white/10"
                                        }`}
                                    >
                                        <AnimatePresence
                                            mode="wait"
                                            initial={false}
                                        >
                                            {mobileMenuOpen ? (
                                                <motion.span
                                                    key="close-icon"
                                                    initial={{
                                                        opacity: 0,
                                                        rotate: -45,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        rotate: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        rotate: 45,
                                                    }}
                                                    transition={{
                                                        duration: 0.2,
                                                    }}
                                                    className="inline-flex"
                                                >
                                                    <X className="size-5" />
                                                </motion.span>
                                            ) : (
                                                <motion.span
                                                    key="menu-icon"
                                                    initial={{
                                                        opacity: 0,
                                                        rotate: 45,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        rotate: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        rotate: -45,
                                                    }}
                                                    transition={{
                                                        duration: 0.2,
                                                    }}
                                                    className="inline-flex"
                                                >
                                                    <Menu className="size-5" />
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </button>
                                </div>

                                {/* Mobile menu */}
                                <AnimatePresence initial={false}>
                                    {mobileMenuOpen && (
                                        <motion.div
                                            key="mobile-menu"
                                            variants={mobileMenuVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                            className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4"
                                            style={{
                                                transformOrigin: "top center",
                                            }}
                                        >
                                            {navLinks.map((link) => (
                                                <button
                                                    key={link.href}
                                                    onClick={() =>
                                                        scrollToSection(
                                                            link.href,
                                                        )
                                                    }
                                                    className="cursor-pointer relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-sky-50 hover:text-sky-600"
                                                >
                                                    {link.icon && (
                                                        <link.icon className="h-4 w-4" />
                                                    )}
                                                    {link.label}
                                                </button>
                                            ))}

                                            {/* Mobile CTA Buttons */}
                                            <div className="mt-4 flex flex-col gap-3 pt-4 border-t border-slate-100">
                                                <RoundedSlideButton
                                                    onClick={() => {
                                                        openCalendlyPopup();
                                                        setMobileMenuOpen(
                                                            false,
                                                        );
                                                    }}
                                                    shouldAnimate
                                                >
                                                    Free Strategy Call
                                                </RoundedSlideButton>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Desktop: Full navigation */}
                                <div className="hidden sm:flex sm:items-center sm:justify-between">
                                    <Link
                                        href="/dentist"
                                        className="group/logo relative flex items-center gap-3 text-lg font-bold tracking-wide"
                                    >
                                        <div className="relative">
                                            <motion.div
                                                whileHover={{
                                                    scale: 1.05,
                                                    rotate: 2,
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 25,
                                                }}
                                                className="size-8 rounded-lg shadow-lg flex items-center justify-center p-0.5 border border-white/20"
                                                style={{
                                                    backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                                                    boxShadow: `0 4px 14px rgba(${colorsRGB.primaryRGB}, 0.3)`,
                                                }}
                                            >
                                                <Image
                                                    src="/images/swiftware-logo-small-transparent.webp"
                                                    alt="SwiftWare Dental Marketing logo"
                                                    width={32}
                                                    height={32}
                                                    className="w-6 h-6 brightness-110 contrast-110"
                                                />
                                            </motion.div>
                                        </div>

                                        <div className="leading-tight">
                                            <span
                                                className="text-base font-bold bg-clip-text text-transparent"
                                                style={{
                                                    backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                                                }}
                                            >
                                                SwiftWare
                                            </span>
                                            <div
                                                className={`text-xs font-medium ${
                                                    scrolled
                                                        ? "text-slate-600"
                                                        : "text-white/80"
                                                }`}
                                                style={{
                                                    color: scrolled
                                                        ? colors.primary
                                                        : "inherit",
                                                }}
                                            >
                                                Dental Marketing
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Navigation Links */}
                                    <nav className="hidden lg:flex items-center gap-8 overflow-visible">
                                        {navLinks.map((link) => (
                                            <button
                                                key={link.href}
                                                onClick={() =>
                                                    scrollToSection(link.href)
                                                }
                                                className="cursor-pointer relative text-base font-semibold transition-colors flex items-center gap-1.5 text-slate-900 hover:text-sky-700"
                                            >
                                                {link.icon && (
                                                    <link.icon className="h-4 w-4" />
                                                )}
                                                {link.label}
                                            </button>
                                        ))}
                                    </nav>

                                    {/* CTA Buttons */}
                                    <div className="flex items-center gap-4">
                                        <RoundedSlideButton
                                            onClick={() => openCalendlyPopup()}
                                            shouldAnimate
                                        >
                                            Free Strategy Call
                                        </RoundedSlideButton>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom divider */}
                            <motion.div
                                variants={dividerVariants}
                                initial="hidden"
                                animate="visible"
                                className="absolute bottom-0 inset-x-4 sm:inset-x-6 h-[1px]"
                                style={{
                                    backgroundImage: `linear-gradient(to right, transparent, ${colors.secondary}, transparent)`,
                                    opacity: scrolled ? 0.4 : 0.2,
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.header>
    );
}
