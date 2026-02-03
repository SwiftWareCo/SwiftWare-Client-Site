"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type DividerTone = "background" | "secondary";

interface WavyDividerProps {
    direction?: "down" | "up";
    fromColor?: DividerTone;
    toColor?: DividerTone;
    backgroundClassName?: string;
    fillClassName?: string;
    useGradient?: boolean;
    gradientFromClassName?: string;
    gradientToClassName?: string;
    className?: string;
}

const backgroundClassMap: Record<DividerTone, string> = {
    background: "bg-background",
    secondary: "bg-secondary",
};

const fillClassMap: Record<DividerTone, string> = {
    background: "text-background",
    secondary: "text-secondary",
};

export function WavyDivider({
    direction = "down",
    fromColor = "background",
    toColor = "background",
    backgroundClassName = "",
    fillClassName = "",
    useGradient = false,
    gradientFromClassName = "",
    gradientToClassName = "",
    className = "",
}: WavyDividerProps) {
    const gradientId = useId();
    const resolvedGradientId = `wavy-divider-gradient-${gradientId}`;

    return (
        <div
            className={cn(
                "relative h-12 sm:h-16 md:h-24 w-full overflow-hidden",
                backgroundClassMap[fromColor],
                backgroundClassName,
                className,
            )}
            aria-hidden="true"
        >
            <svg
                className={cn(
                    "absolute inset-0 h-full w-full pointer-events-none",
                    !useGradient && (fillClassName || fillClassMap[toColor]),
                    useGradient && `fill-[url(#${resolvedGradientId})]`,
                )}
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                focusable="false"
                role="presentation"
            >
                {useGradient ? (
                    <defs>
                        <linearGradient
                            id={resolvedGradientId}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop
                                offset="0%"
                                className={gradientFromClassName}
                            />
                            <stop
                                offset="100%"
                                className={gradientToClassName}
                            />
                        </linearGradient>
                    </defs>
                ) : null}
                {direction === "down" ? (
                    <path
                        d="M0,40 Q300,-10 600,40 T1200,40 L1200,120 L0,120 Z"
                        fill={
                            useGradient
                                ? `url(#${resolvedGradientId})`
                                : "currentColor"
                        }
                    />
                ) : (
                    <path
                        d="M0,80 Q300,130 600,80 T1200,80 L1200,0 L0,0 Z"
                        fill={
                            useGradient
                                ? `url(#${resolvedGradientId})`
                                : "currentColor"
                        }
                    />
                )}
            </svg>
        </div>
    );
}
