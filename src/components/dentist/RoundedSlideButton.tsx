"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

interface RoundedSlideButtonProps {
    shouldAnimate?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
}

export function RoundedSlideButton({
    shouldAnimate = false,
    onClick,
    children = "Book a Call",
    className = "",
}: RoundedSlideButtonProps) {
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (shouldAnimate && !hasAnimated) {
            setHasAnimated(true);
        }
    }, [shouldAnimate, hasAnimated]);

    return (
        <button
            className={`
                group/button relative z-0 flex items-center gap-2 overflow-hidden rounded-xl border-[1.5px]
                border-sky-500 px-5 py-2.5 font-semibold text-sm
                uppercase tracking-wider duration-500
                bg-white text-sky-600

                before:absolute before:inset-0
                before:-z-10 before:translate-x-[150%]
                before:translate-y-[150%] before:scale-[2.5]
                before:rounded-[100%] before:bg-gradient-to-r before:from-sky-500 before:to-teal-500
                before:transition-transform before:duration-1000
                before:content-[""]

                hover:scale-105 hover:text-white hover:border-sky-500
                hover:before:translate-x-[0%]
                hover:before:translate-y-[0%]
                active:scale-95
                hover:cursor-pointer

                ${hasAnimated ? "animate-buttonSequence" : ""}
                ${className}
            `}
            onClick={onClick}
        >
            <span
                className={`button-text flex items-center gap-2 transition-colors duration-700 ease-out group-hover/button:!text-white ${
                    hasAnimated ? "" : ""
                }`}
            >
                <ArrowRight className="h-4 w-4" />
                <span>{children}</span>
            </span>
        </button>
    );
}
