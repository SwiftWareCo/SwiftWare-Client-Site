"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { Phone, FileSearch, Zap } from "lucide-react";
import { Orb } from "@/components/ui/orb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { openCalendlyPopup } from "@/lib/calendly";
import { getColorsFromPath, getColorsRGBFromPath } from "@/lib/colors";

type AgentState = "idle" | "connecting" | "listening" | "thinking" | "speaking";

const HERO_SERVICES = [
    { icon: Phone, label: "AI Receptionist" },
    { icon: FileSearch, label: "Document Intelligence" },
    { icon: Zap, label: "Process Automation" },
] as const;

const heroEase = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { ease: heroEase, duration: 0.5, staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: heroEase },
    },
};

export default function AIHeroWithDemo() {
    const pathname = usePathname();
    const colors = getColorsFromPath(pathname);
    const colorsRGB = getColorsRGBFromPath(pathname);

    const [agentState, setAgentState] = useState<AgentState>("idle");
    const [isConnecting, setIsConnecting] = useState(false);
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Vapi AI Integration
    type VapiClient = InstanceType<(typeof import("@vapi-ai/web"))["default"]>;

    const [vapi, setVapi] = useState<VapiClient | null>(null);

    useEffect(() => {
        // Initialize Vapi instance on mount
        import("@vapi-ai/web").then((module) => {
            const Vapi = module.default;
            // The Public Key is safe to expose in the browser (like Stripe or Firebase)
            // It allows the browser to connect to Vapi servers for audio streaming
            const vapiInstance = new Vapi(
                process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "",
            );
            setVapi(vapiInstance);
        });
    }, []);

    useEffect(() => {
        if (!vapi) return;

        const onCallStart = () => {
            setAgentState("listening");
            setIsConnecting(false);
            console.log("Call started");
        };

        const onSpeechStart = () => {
            setAgentState("speaking");
            console.log("User speaking");
        };

        const onSpeechEnd = () => {
            setAgentState("listening");
            console.log("User stopped speaking");
        };

        const onCallEnd = () => {
            setAgentState("idle");
            setIsConnecting(false);
            console.log("Call ended");
        };

        const onError = (e: unknown) => {
            console.error("Vapi Error:", e);
            setAgentState("idle");
            setIsConnecting(false);
        };

        // Attach listeners
        vapi.on("call-start", onCallStart);
        vapi.on("speech-start", onSpeechStart);
        vapi.on("speech-end", onSpeechEnd);
        vapi.on("call-end", onCallEnd);
        vapi.on("error", onError);

        return () => {
            vapi.off("call-start", onCallStart);
            vapi.off("speech-start", onSpeechStart);
            vapi.off("speech-end", onSpeechEnd);
            vapi.off("call-end", onCallEnd);
            vapi.off("error", onError);
        };
    }, [vapi]);

    const handleStartConversation = useCallback(async () => {
        if (agentState !== "idle") {
            if (vapi) vapi.stop();
            return;
        }

        setIsConnecting(true);
        setAgentState("connecting");

        try {
            if (vapi) {
                // Provided by user
                await vapi.start("aa2f70ea-1c38-4a89-934d-a2b81d17fed4");
            } else {
                console.error("Vapi not initialized");
                setIsConnecting(false);
                setAgentState("idle");
            }
        } catch (error) {
            console.error("Failed to start Vapi:", error);
            setIsConnecting(false);
            setAgentState("idle");
        }
    }, [agentState, vapi]);

    // Map agent state to Orb state
    const orbState =
        agentState === "speaking"
            ? "talking"
            : agentState === "listening"
              ? "listening"
              : agentState === "thinking" || agentState === "connecting"
                ? "thinking"
                : null;

    return (
        <section
            id="hero"
            className="relative min-h-[85vh] overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24"
        >
            {/* Background gradient */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(${colorsRGB.primaryRGB}, 0.15) 0%, transparent 70%)`,
                }}
            />

            <motion.div
                className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* LEFT — Text Content */}
                <motion.div
                    className="flex flex-col justify-center text-center"
                    variants={itemVariants}
                >
                    {/* Badge */}
                    <motion.p
                        variants={itemVariants}
                        className="mb-4 inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground"
                    >
                        <span
                            className="inline-block h-1.5 w-1.5 rounded-full"
                            style={{
                                backgroundColor: colors.primary,
                                boxShadow: `0 0 10px rgba(${colorsRGB.primaryRGB}, 0.8)`,
                            }}
                        />
                        SwiftMind AI Platform
                    </motion.p>

                    {/* Headline - Animated "AI That Works/Evolves/Improves" */}
                    <motion.div className="mb-6" variants={itemVariants}>
                        <h1 className="flex flex-wrap items-center justify-center text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                            <span
                                className="mr-3 bg-clip-text text-transparent"
                                style={{
                                    backgroundImage: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                                }}
                            >
                                AI That
                            </span>
                            <div className="relative inline-flex flex-col items-center">
                                <div className="h-[1.3em] overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={
                                                [
                                                    "Works",
                                                    "Evolves",
                                                    "Improves",
                                                ][textIndex]
                                            }
                                            initial={{
                                                y: 40,
                                                opacity: 0,
                                                rotateX: -90,
                                            }}
                                            animate={{
                                                y: 0,
                                                opacity: 1,
                                                rotateX: 0,
                                            }}
                                            exit={{
                                                y: -40,
                                                opacity: 0,
                                                rotateX: 90,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                ease: "backOut",
                                            }}
                                            className="inline-block font-serif italic bg-clip-text text-transparent"
                                            style={{
                                                backgroundImage: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                                            }}
                                        >
                                            {
                                                [
                                                    "Works",
                                                    "Evolves",
                                                    "Improves",
                                                ][textIndex]
                                            }
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                                {/* Underline Animation - Thinner and Center Out */}
                                <motion.div
                                    key={textIndex}
                                    initial={{
                                        width: "0%",
                                        left: "50%",
                                        x: "-50%",
                                    }}
                                    animate={{
                                        width: "100%",
                                        left: "50%",
                                        x: "-50%",
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        ease: "circOut",
                                        delay: 0.1,
                                    }}
                                    className="absolute bottom-1 h-0.5 rounded-full"
                                    style={{ background: colors.primary }}
                                />
                            </div>
                        </h1>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="mx-auto mb-8 max-w-xl text-base text-muted-foreground sm:text-lg"
                    >
                        Deploy AI agents that handle calls, answer questions
                        from your documents, and automate repetitive
                        workflows—24/7.
                    </motion.p>

                    {/* Service bullets */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.0, duration: 0.6 }}
                        className="mt-4 flex flex-wrap justify-center gap-4"
                    >
                        {HERO_SERVICES.map(({ icon: Icon, label }) => (
                            <div
                                key={label}
                                className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
                                style={{
                                    borderColor: `rgba(${colorsRGB.primaryRGB}, 0.3)`,
                                    background: `rgba(${colorsRGB.primaryRGB}, 0.08)`,
                                }}
                            >
                                <Icon
                                    className="h-4 w-4"
                                    style={{ color: colors.primary }}
                                />
                                <span className="text-foreground">{label}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        className="mt-10 flex flex-col items-center gap-4 sm:flex-row justify-center"
                    >
                        <InteractiveHoverButton
                            onClick={() => openCalendlyPopup()}
                            text="Book a Call"
                            className="w-full sm:w-auto"
                        />
                    </motion.div>
                </motion.div>

                {/* RIGHT — Orb Demo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: 1.2, // Quicker entry
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-center justify-center"
                >
                    <Card
                        className="relative w-full max-w-md overflow-hidden border-0 bg-transparent"
                        style={{
                            background: `linear-gradient(135deg, rgba(${colorsRGB.primaryRGB}, 0.08), rgba(${colorsRGB.secondaryRGB}, 0.05))`,
                            borderColor: `rgba(${colorsRGB.primaryRGB}, 0.2)`,
                        }}
                    >
                        <CardContent className="flex justify-center flex-col items-center p-8">
                            {/* Orb Container */}
                            <div className="relative h-64 w-64 sm:h-80 sm:w-80">
                                <Orb
                                    colors={[colors.primary, colors.secondary]}
                                    agentState={orbState}
                                />

                                {/* Status Badge */}
                                <div
                                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-medium backdrop-blur-sm"
                                    style={{
                                        background: `rgba(${colorsRGB.primaryRGB}, 0.15)`,
                                        border: `1px solid rgba(${colorsRGB.primaryRGB}, 0.3)`,
                                        color: colors.primary,
                                    }}
                                >
                                    {agentState === "idle" && "Ready to help"}
                                    {agentState === "connecting" &&
                                        "Connecting..."}
                                    {agentState === "listening" &&
                                        "Listening..."}
                                    {agentState === "thinking" && "Thinking..."}
                                    {agentState === "speaking" && "Speaking..."}
                                </div>
                            </div>

                            {/* Start Button */}
                            <Button
                                onClick={handleStartConversation}
                                disabled={
                                    isConnecting ||
                                    (agentState !== "idle" &&
                                        agentState !== "listening" &&
                                        agentState !== "speaking" &&
                                        agentState !== "thinking")
                                } // Allow stopping
                                className="mt-8 cursor-pointer"
                                size="lg"
                                style={{
                                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                                }}
                            >
                                {agentState === "idle"
                                    ? isConnecting
                                        ? "Connecting..."
                                        : "Start Conversation"
                                    : "End Conversation"}
                            </Button>

                            <p className="mt-4 text-center text-sm text-muted-foreground">
                                Try our AI receptionist demo
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </section>
    );
}
