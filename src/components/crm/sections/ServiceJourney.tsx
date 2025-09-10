"use client";
import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import clsx from "clsx";

type Step = {
  id: string;
  title: string;
  blurb: string;
};

const STEPS: Step[] = [
  { id: "s1", title: "Create estimate", blurb: "Scope and price the job." },
  { id: "s2", title: "Get approval", blurb: "Client approves the estimate." },
  { id: "s3", title: "Schedule cleaning", blurb: "Book crew and time window." },
  { id: "s4", title: "Complete cleaning", blurb: "Technician completes on site." },
  { id: "s5", title: "Upload photos & report", blurb: "Before/after and PDF report." },
  { id: "s6", title: "Payment reminders", blurb: "Auto nudges until paid." }
];

export default function ServiceJourney() {
  const sectionId = "fieldops-timeline";
  const reduce = useReducedMotion() ?? false;
  const stable = useId();

  const sectionRef = useRef<HTMLElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const inView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" });

  const [activeIdx, setActiveIdx] = useState(0);
  const [dotPosition, setDotPosition] = useState(0);

  // Analytics stubs
  const track = useCallback((name: string) => {
    // Analytics tracking would go here in production
    return name;
  }, []);

  // Fire seen once
  useEffect(() => {
    if (inView) track("timeline_seen");
  }, [inView, track]);

  // Window scroll: set active step and dot position aligned with active card
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const mid = window.innerHeight / 2;
        let bestIdx = 0;
        let bestDist = Number.POSITIVE_INFINITY;
        
        // Calculate which step is closest to viewport center
        stepRefs.current.forEach((el, i) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const c = r.top + r.height / 2;
          const d = Math.abs(c - mid);
          if (d < bestDist) {
            bestDist = d;
            bestIdx = i;
          }
        });
        
        // Calculate exact dot position relative to the active step
        const activeStep = stepRefs.current[bestIdx];
        if (activeStep && sectionRef.current) {
          const stepRect = activeStep.getBoundingClientRect();
          
          // Calculate position relative to the timeline container
          const timelineContainer = sectionRef.current.querySelector('.ml-12, .ml-20');
          if (timelineContainer) {
            const containerRect = timelineContainer.getBoundingClientRect();
            const stepCenter = stepRect.top + stepRect.height / 2;
            const containerTop = containerRect.top;
            const relativePosition = stepCenter - containerTop;
            
            setDotPosition(relativePosition);
          }
        }
        
        // Only update active index if it changed
        if (bestIdx !== activeIdx) {
          setActiveIdx(bestIdx);
        }
        
        ticking = false;
      });
    };
    
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [activeIdx]);

  const ariaLabelId = `${stable}-heading`;

  return (
    <section id={sectionId} aria-labelledby={ariaLabelId} ref={sectionRef} className="py-20 relative overflow-hidden w-full">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 size-80 bg-blue-500/6 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 size-96 bg-purple-500/8 rounded-full blur-3xl" />
        
        {/* Orbital path visualization */}
        {!reduce && inView && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="600" height="400" className="opacity-30">
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="rgb(147, 51, 234)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path
                ref={pathRef}
                d="M100,200 Q200,100 300,200 T500,200"
                stroke="url(#pathGradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="8,4"
                className="drop-shadow-sm"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-0 md:px-4 lg:px-6 relative w-full">
        <JourneyHeader headingId={ariaLabelId} />

        <div className="mt-12 md:mt-16 relative px-4 md:px-0">
          {/* Orbital Flow Path - Mobile responsive */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-blue-500/20 via-purple-500/30 to-blue-500/20 rounded-full">
            {/* Precisely aligned orbital indicator */}
            <motion.div
              className="absolute -left-2 md:-left-3 size-5 md:size-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/20"
              animate={{
                y: dotPosition,
                boxShadow: !reduce ? [
                  "0 0 15px rgba(59, 130, 246, 0.5)",
                  "0 0 25px rgba(147, 51, 234, 0.5)", 
                  "0 0 15px rgba(59, 130, 246, 0.5)"
                ] : "0 0 15px rgba(59, 130, 246, 0.5)"
              }}
              transition={{ 
                y: { type: "spring", stiffness: 200, damping: 30, mass: 0.5 },
                boxShadow: { duration: 2, repeat: Infinity }
              }}
              style={{ transform: "translateY(-50%)" }}
            >
              <div className="absolute inset-0.5 md:inset-1 rounded-full bg-white/20 backdrop-blur-sm" />
            </motion.div>
          </div>

          {/* Enhanced Steps - Mobile responsive */}
          <ul role="list" aria-label="Service journey" className="space-y-6 md:space-y-8 ml-12 md:ml-20">
            {STEPS.map((step, i) => (
              <li key={step.id}>
                <OrbitalStepCard
                  refFn={(el) => (stepRefs.current[i] = el)}
                  step={step}
                  index={i}
                  active={i === activeIdx}
                  activeIndex={activeIdx}
                  reduce={reduce}
                  totalSteps={STEPS.length}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function JourneyHeader({ headingId }: { headingId: string }) {
  return (
    <header className="text-center mb-16">
      <div className="relative">
        <h2 id={headingId} className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
          Service Journey
        </h2>
        <p className="text-lg text-zinc-300 max-w-2xl mx-auto mb-6">
          From estimate to payment — a seamless workflow that adapts to your business
        </p>
        
        {/* Enhanced metadata - Mobile responsive */}
        <div className="flex items-center justify-center gap-2 md:gap-4 text-xs md:text-sm flex-wrap px-4">
          <div className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
            <div className="size-1.5 md:size-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-zinc-300">Interactive Demo</span>
          </div>
          
          <div className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
            <span className="font-medium text-white">6 Steps</span>
            <span className="text-zinc-400">•</span>
            <span className="text-zinc-300">Automated</span>
          </div>
          
          <div className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
            <span className="text-zinc-300">End-to-End</span>
            <span className="text-zinc-400 ml-1">Process</span>
          </div>
        </div>
      </div>
    </header>
  );
}
function OrbitalStepCard({ refFn, step, index, active, activeIndex, reduce, totalSteps }: { 
  refFn: (el: HTMLDivElement | null) => void; 
  step: Step; 
  index: number; 
  active: boolean;
  activeIndex: number; 
  reduce: boolean;
  totalSteps: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const progressPercentage = ((index + 1) / totalSteps) * 100;

  // Properly calculate step status based on current active index
  const isCompleted = index < activeIndex; // Steps before the currently active step
  const isInProgress = index === activeIndex; // Currently active step

  return (
    <motion.article
      ref={refFn}
      initial={reduce ? false : { opacity: 0, x: -20, scale: 0.98 }}
      whileInView={reduce ? {} : { opacity: 1, x: 0, scale: 1 }}
      viewport={{ amount: 0.4, margin: "-100px", once: true }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: index * 0.08 }}
      whileHover={reduce ? {} : { x: 2, scale: 1.005 }}
      layout
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={clsx(
        "group relative rounded-2xl border backdrop-blur-sm shadow-2xl shadow-black/10 p-4 md:p-8",
        "outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        "transition-all duration-300 will-change-transform overflow-hidden",
        isInProgress 
          ? "border-blue-400/40 bg-gradient-to-br from-blue-500/[0.15] via-purple-500/[0.10] to-blue-500/[0.08]"
          : isCompleted
            ? "border-green-400/30 bg-gradient-to-br from-green-500/[0.12] via-blue-500/[0.08] to-green-500/[0.05]"
            : "border-white/15 bg-gradient-to-br from-white/[0.06] via-white/[0.04] to-white/[0.02]"
      )}
      role="group"
      aria-label={`${index + 1}. ${step.title}`}
    >
      {/* Dynamic glow effect */}
      <motion.div
        className={clsx(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          active ? "opacity-30" : "opacity-0"
        )}
        style={{
          background: active 
            ? "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.2), transparent 40%)"
            : "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.1), transparent 40%)"
        }}
      />

      {/* Progress indicator */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-blue-500/30 to-purple-500/30 rounded-r-full">
        <motion.div
          className={clsx(
            "absolute inset-0 rounded-r-full transition-all duration-500",
            isCompleted 
              ? "bg-gradient-to-b from-green-500 to-blue-500"
              : isInProgress
                ? "bg-gradient-to-b from-blue-500 to-purple-500"
                : "bg-gradient-to-b from-zinc-500 to-zinc-600"
          )}
          initial={{ scaleY: 0 }}
          whileInView={{ 
            scaleY: isCompleted ? 1 : isInProgress ? 0.8 : 0.2 
          }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          style={{ transformOrigin: "top" }}
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-start gap-6">
        {/* Enhanced step indicator - Mobile responsive */}
        <motion.div 
          className={clsx(
            "shrink-0 rounded-2xl p-2 md:p-4 border backdrop-blur-sm relative overflow-hidden flex items-center justify-center",
            isInProgress 
              ? "bg-gradient-to-br from-blue-500/25 to-purple-500/25 border-blue-400/40" 
              : isCompleted
                ? "bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-400/30"
                : "bg-gradient-to-br from-white/10 to-white/5 border-white/20"
          )}
          whileHover={reduce ? {} : { rotate: [0, -3, 3, 0], scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <span className={clsx(
            "text-sm md:text-lg font-bold relative z-10",
            isInProgress ? "text-white" 
            : isCompleted ? "text-green-200" 
            : "text-zinc-400"
          )}>
            {isCompleted ? "✓" : String(index + 1).padStart(2, "0")}
          </span>
          
          {/* Step glow */}
          {isInProgress && !reduce && (
            <motion.div
              className="absolute inset-0 rounded-2xl bg-blue-400/20"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          
          {/* Completed glow */}
          {isCompleted && !reduce && (
            <motion.div
              className="absolute inset-0 rounded-2xl bg-green-400/15"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>
          
          <div className="min-w-0 flex-1">
            {/* Enhanced title with progress - Mobile responsive */}
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              <h3 className={clsx(
                "text-lg md:text-xl font-bold leading-tight",
                isInProgress 
                  ? "bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent"
                  : isCompleted
                    ? "bg-gradient-to-r from-green-200 to-blue-200 bg-clip-text text-transparent"
                    : "text-white"
              )}>
                {step.title}
              </h3>
              
              <div className={clsx(
                "rounded-full px-2 md:px-3 py-0.5 md:py-1 text-xs font-medium border backdrop-blur-sm shrink-0",
                isInProgress
                  ? "bg-blue-500/20 border-blue-400/40 text-blue-200"
                  : isCompleted
                    ? "bg-green-500/20 border-green-400/40 text-green-200"
                    : "bg-white/5 border-white/15 text-zinc-400"
              )}>
                {Math.round(progressPercentage)}%
              </div>
            </div>
            
            <p className={clsx(
              "text-sm md:text-base leading-relaxed",
              isInProgress ? "text-blue-100" 
              : isCompleted ? "text-green-100"
              : "text-zinc-300"
            )}>
              {step.blurb}
            </p>

            {/* Status indicator */}
            <div className="flex items-center gap-2 md:gap-3 mt-3 md:mt-4">
              <div className={clsx(
                "size-2 md:size-3 rounded-full border-2 transition-all duration-300",
                isInProgress 
                  ? "bg-blue-400 border-blue-300 shadow-lg shadow-blue-400/50" 
                  : isCompleted 
                    ? "bg-green-400 border-green-300 shadow-lg shadow-green-400/30"
                    : "bg-zinc-500 border-zinc-400"
              )} />
              
              <span className={clsx(
                "text-xs md:text-sm font-medium",
                isInProgress ? "text-blue-200" 
                : isCompleted ? "text-green-200"
                : "text-zinc-400"
              )}>
                {isInProgress ? "In Progress" : isCompleted ? "Completed" : "Pending"}
              </span>
              
              {/* Animated progress indicator */}
              {isInProgress && !reduce && (
                <motion.div
                  className="text-blue-300 ml-auto"
                  animate={isHovered ? { x: [0, 4, 0] } : { x: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}


