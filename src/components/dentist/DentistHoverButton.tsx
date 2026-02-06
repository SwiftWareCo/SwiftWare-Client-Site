"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DentistHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    variant?: "primary" | "secondary" | "light" | "pink";
}

// Dentist brand colors
const colors = {
    primary: "#0ea5e9", // sky-500
    secondary: "#14b8a6", // teal-500
};

const colorsRGB = {
    primaryRGB: "14, 165, 233",
    secondaryRGB: "20, 184, 166",
    pinkRGB: "236, 72, 153",
};

const DentistHoverButton = React.forwardRef<
    HTMLButtonElement,
    DentistHoverButtonProps
>(({ text = "Button", className, variant = "primary", ...props }, ref) => {
    const isPrimary = variant === "primary";
    const isSecondary = variant === "secondary";
    const isLight = variant === "light";
    const isPink = variant === "pink";

    const getInitialShadow = () => {
        if (isLight) return `0 14px 40px rgba(0, 0, 0, 0.15)`;
        if (isPink) return `0 14px 40px rgba(${colorsRGB.pinkRGB}, 0.3)`;
        if (isPrimary) return `0 14px 40px rgba(${colorsRGB.primaryRGB}, 0.3)`;
        return `0 8px 24px rgba(0, 0, 0, 0.1)`;
    };

    const getHoverShadow = () => {
        if (isLight) return `0 18px 44px rgba(0, 0, 0, 0.25)`;
        if (isPink) return `0 18px 44px rgba(${colorsRGB.pinkRGB}, 0.45)`;
        if (isPrimary) return `0 18px 44px rgba(${colorsRGB.primaryRGB}, 0.45)`;
        return `0 12px 32px rgba(${colorsRGB.primaryRGB}, 0.25)`;
    };

    return (
        <button
            ref={ref}
            className={cn(
                "group hover:-translate-y-0.5 relative cursor-pointer flex w-full whitespace-nowrap items-center justify-center overflow-hidden rounded-2xl px-8 py-4 text-center font-semibold duration-300",
                // Primary: Gradient background with white text, reverses to white bg with gradient text
                isPrimary &&
                    "bg-gradient-to-r from-sky-500 to-teal-500 text-white border-0",
                // Pink: Gradient background with white text, reverses to white bg with pink text
                isPink &&
                    "bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white border-0",
                // Secondary: White bg with gradient border, reverses to gradient bg with white text
                isSecondary &&
                    "bg-white text-slate-700 border-2 border-slate-200",
                // Light: White bg with subtle shadow, reverses to light sky bg
                isLight && "bg-white text-sky-600 border-0",
                className,
            )}
            style={{
                boxShadow: getInitialShadow(),
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = getHoverShadow();
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = getInitialShadow();
            }}
            onFocus={(e) => {
                const focusColor = isLight
                    ? "#fff"
                    : isPink
                      ? "#ec4899"
                      : colors.primary;
                e.currentTarget.style.outline = `2px solid ${focusColor}`;
                e.currentTarget.style.outlineOffset = "2px";
            }}
            onBlur={(e) => {
                e.currentTarget.style.outline = "";
                e.currentTarget.style.outlineOffset = "";
            }}
            {...props}
        >
            {/* Default text - slides out on hover */}
            <span
                className={cn(
                    "inline-block translate-x-1 duration-300 group-hover:translate-x-12 group-hover:opacity-0",
                    isPrimary && "text-white",
                    isPink && "text-white",
                    isSecondary && "text-slate-700",
                    isLight && "text-sky-600",
                )}
            >
                {text}
            </span>

            {/* Hover text with arrow - slides in on hover */}
            <div
                className={cn(
                    "absolute top-0 z-10 flex h-full w-full translate-x-10 items-center justify-center gap-2 opacity-0 duration-300 group-hover:translate-x-0 group-hover:opacity-100",
                    // Reverse colors on hover
                    isPrimary && "text-sky-600",
                    isPink && "text-pink-600",
                    isSecondary && "text-white",
                    isLight && "text-sky-700",
                )}
            >
                <span className="whitespace-nowrap font-semibold">{text}</span>
                <ArrowRight className="h-5 w-5 flex-shrink-0" />
            </div>

            {/* Background fill that slides in on hover */}
            <div
                className={cn(
                    "absolute left-[7%] top-[42%] h-2 w-2 rounded-full duration-300 group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:rounded-none",
                    isPrimary
                        ? "bg-white" // Primary: white fill on hover (reverses to white bg)
                        : isPink
                          ? "bg-white" // Pink: white fill on hover (reverses to white bg)
                          : isSecondary
                            ? "bg-gradient-to-r from-sky-500 to-teal-500" // Secondary: gradient fill on hover
                            : "bg-gradient-to-r from-sky-50 to-teal-50", // Light: light gradient fill
                )}
            />
        </button>
    );
});

DentistHoverButton.displayName = "DentistHoverButton";

export { DentistHoverButton };
