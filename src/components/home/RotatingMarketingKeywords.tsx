"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getColorsFromPath } from "@/lib/colors";

/**
 * RotatingMarketingKeywords
 *
 * Typewriter-style rotating text for marketing-focused hero sections.
 * Similar to RotatingServiceKeywords but with marketing-specific terms.
 * Uses gradient colors matching the hero headline gradients.
 *
 * Used in: HeroMarketingGeneral variant
 */

// Marketing-focused keywords
const MARKETING_KEYWORDS = ["leads", "customers", "revenue", "growth"];

export function RotatingMarketingKeywords() {
    const pathname = usePathname();
    const colors = getColorsFromPath(pathname);

    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentKeyword = MARKETING_KEYWORDS[currentIndex];
        const typingSpeed = isDeleting ? 50 : 100;
        const delayBeforeDelete = 2000;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (displayedText.length < currentKeyword.length) {
                    setDisplayedText(
                        currentKeyword.slice(0, displayedText.length + 1),
                    );
                } else {
                    setTimeout(() => setIsDeleting(true), delayBeforeDelete);
                }
            } else {
                if (displayedText.length > 0) {
                    setDisplayedText(displayedText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setCurrentIndex(
                        (prev) => (prev + 1) % MARKETING_KEYWORDS.length,
                    );
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentIndex]);

    return (
        <span
            className="font-semibold inline-block bg-clip-text text-transparent"
            style={{
                backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
            }}
        >
            {displayedText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="ml-0.5 text-foreground/60"
                style={{ WebkitTextFillColor: "currentColor" }}
            >
                |
            </motion.span>
        </span>
    );
}
