"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState, useEffect } from "react";

interface DentistSlideButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
    autoAnimate?: boolean;
}

// Dentist brand colors
const colors = {
    primary: "#0ea5e9", // sky-500
    secondary: "#14b8a6", // teal-500
};

const buttonVariants = {
    idle: {
        scale: 1,
        transition: {
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
    hover: {
        scale: 1.03,
        transition: {
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
    pulse: {
        scale: [1, 1.05, 1],
        transition: {
            duration: 0.85,
            ease: "easeInOut" as const,
        },
    },
    tap: {
        scale: 0.96,
        transition: {
            duration: 0.2,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
};

const gradientVariants = {
    idle: {
        opacity: 0,
        scale: 1,
    },
    hover: {
        opacity: 1,
        scale: 1.02,
        transition: {
            duration: 0.35,
            ease: "easeOut" as const,
        },
    },
};

const sheenVariants = {
    rest: {
        x: "-120%",
        opacity: 0,
    },
    sweep: {
        x: "220%",
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.33, 1, 0.68, 1] as const,
        },
    },
};

const iconVariants = {
    idle: {
        x: 0,
    },
    hover: {
        x: 6,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};

export function DentistSlideButton({
    onClick,
    children = "Get in touch",
    className = "",
    autoAnimate = false,
}: DentistSlideButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [shouldAutoAnimate, setShouldAutoAnimate] = useState(false);

    const hoverOrFocus = () => setIsHovered(true);
    const relax = () => setIsHovered(false);

    // Trigger auto-animate on mount
    useEffect(() => {
        if (autoAnimate) {
            const timer = setTimeout(() => {
                setShouldAutoAnimate(true);
                setTimeout(() => setShouldAutoAnimate(false), 900);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [autoAnimate]);

    const animationState = useMemo(() => {
        if (isHovered) {
            return "hover";
        }
        return shouldAutoAnimate ? "pulse" : "idle";
    }, [shouldAutoAnimate, isHovered]);

    const surfaceState = isHovered || shouldAutoAnimate ? "hover" : "idle";
    const shouldSweep = isHovered || shouldAutoAnimate;

    const borderVariants = useMemo(
        () => ({
            idle: {
                opacity: 1,
                borderColor: colors.primary,
            },
            hover: {
                opacity: 0,
                borderColor: "rgba(0,0,0,0)",
                transition: {
                    duration: 0.35,
                    ease: "easeOut" as const,
                },
            },
        }),
        [],
    );

    const contentVariants = useMemo(
        () => ({
            idle: {
                color: colors.primary,
            },
            hover: {
                color: "#ffffff",
                transition: {
                    duration: 0.35,
                    ease: "easeOut" as const,
                },
            },
        }),
        [],
    );

    return (
        <motion.button
            className={`relative flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-colors duration-300 cursor-pointer overflow-hidden shadow-lg ${className}`}
            style={{ boxShadow: `0 4px 14px rgba(14, 165, 233, 0.3)` }}
            onClick={onClick}
            onMouseEnter={hoverOrFocus}
            onMouseLeave={relax}
            onFocus={(e) => {
                hoverOrFocus();
                e.currentTarget.style.outline = `2px solid ${colors.primary}`;
                e.currentTarget.style.outlineOffset = "2px";
            }}
            onBlur={(e) => {
                relax();
                e.currentTarget.style.outline = "";
                e.currentTarget.style.outlineOffset = "";
            }}
            variants={buttonVariants}
            initial="idle"
            animate={animationState}
            whileTap="tap"
            type="button"
        >
            <motion.span
                className="absolute inset-0 rounded-[inherit]"
                style={{
                    backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                }}
                variants={gradientVariants}
                initial="idle"
                animate={surfaceState}
            />

            <motion.span
                className="absolute inset-[1px] rounded-[inherit] border-[1.5px]"
                variants={borderVariants}
                initial="idle"
                animate={surfaceState}
            />

            <motion.span
                className="pointer-events-none absolute -inset-1 opacity-0"
                variants={sheenVariants}
                initial="rest"
                animate={shouldSweep ? "sweep" : "rest"}
                style={{
                    background:
                        "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
                    mixBlendMode: "screen",
                }}
            />

            <motion.span
                className="relative z-10 flex items-center gap-2"
                variants={contentVariants}
                initial="idle"
                animate={surfaceState}
            >
                <motion.span
                    variants={iconVariants}
                    initial="idle"
                    animate={surfaceState}
                >
                    <ArrowRight className="size-4" />
                </motion.span>
                <span>{children}</span>
            </motion.span>
        </motion.button>
    );
}
