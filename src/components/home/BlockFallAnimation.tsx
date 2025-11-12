'use client';

import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

const BLOCKS = [
  'Expansion & Growth',
  'Payroll',
  'Social Media',
  'SEO & Content',
  'Email Management',
  'Brand Design',
  'Website Updates',
  'Customer Support',
  'Analytics Tracking',
  'Staff Training',
];

// Pre-calculate random values to prevent recalculation on every render
const BLOCK_RANDOM_OFFSETS = Array.from({ length: 10 }, () => ({
  x: (Math.random() - 0.5) * 30,
  rotation: (Math.random() - 0.5) * 16,
}));

export default function BlockFallAnimation() {
  const [isInView, setIsInView] = useState(false);
  const [currentlyFallingIndex, setCurrentlyFallingIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRefsRef = useRef<NodeJS.Timeout[]>([]);

  // Calculate landing positions for left and right piles
  const getLandingPosition = (index: number) => {
    const isLeftPile = index < 5;
    const positionInPile = index % 5;

    return {
      // Add slight random x offset within each pile for organic look
      x: (isLeftPile ? -120 : 120) + BLOCK_RANDOM_OFFSETS[index].x,
      y: 200 - positionInPile * 50, // Stack higher: 200, 150, 100, 50, 0
      rotation: BLOCK_RANDOM_OFFSETS[index].rotation, // Random rotation between -8 to +8 degrees (symmetrical)
    };
  };


  // Use IntersectionObserver to detect when component enters viewport
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          console.log('[BlockFallAnimation] Section came into view, starting animations...');
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isInView]);

  // Detect mobile and cleanup timeouts on unmount
  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      timeoutRefsRef.current.forEach((timeout) => clearTimeout(timeout));
      timeoutRefsRef.current = [];
    };
  }, []);

  // Mobile: Show text list only
  if (isMobile) {
    return (
      <motion.div
        ref={containerRef}
        className="relative w-full bg-gradient-to-br from-red-950/50 via-zinc-900/70 to-red-900/50 rounded-xl border border-zinc-700/50 p-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">Business Tasks you have to handle</h3>
          <ul className="grid grid-cols-1 gap-3">
            {BLOCKS.map((block, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-sm text-foreground/80"
              >
                <span className="inline-block w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                {block}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    );
  }

  // Desktop: Show falling blocks animation
  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-[600px] bg-gradient-to-br from-red-950/50 via-zinc-900/70 to-red-900/50 rounded-xl border border-zinc-700/50 overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Central Bobbing Head */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 shadow-lg flex items-center justify-center z-10"
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Simple emoji-like face */}
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Eyes - Get wider as blocks fall (panic effect) */}
          <div className="flex gap-6 mb-2">
            <motion.div
              className="w-3 h-4 bg-black rounded-full"
              animate={{
                scaleY: currentlyFallingIndex >= 2 ? 1.8 : 1,
                scaleX: currentlyFallingIndex >= 5 ? 1.5 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-3 h-4 bg-black rounded-full"
              animate={{
                scaleY: currentlyFallingIndex >= 2 ? 1.8 : 1,
                scaleX: currentlyFallingIndex >= 5 ? 1.5 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          {/* Mouth - Changes progressively as blocks fall */}
          <div className="relative w-8 h-6 flex items-center justify-center">
            {currentlyFallingIndex < 4 ? (
              // Smile (happy) - blocks 0-3
              <div className="w-8 h-4 border-4 border-b-black border-t-transparent border-l-transparent border-r-transparent rounded-b-full" />
            ) : currentlyFallingIndex < 8 ? (
              // O shape - surprised (blocks 4-7)
              <motion.div
                className="w-7 h-7 border-4 border-black rounded-full"
                animate={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
            ) : (
              // O shape - very shocked (blocks 8-9)
              <motion.div
                className="w-8 h-8 border-4 border-black rounded-full"
                animate={{ scale: 1.3 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </div>
        </div>
      </motion.div>

      {/* Falling Blocks */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {BLOCKS.map((task, index) => {
          const landing = getLandingPosition(index);
          const isLeftPile = index < 5;
          const positionInPile = index % 5;
          // Alternating pattern: left first at 0s, right at 1.2s, then left at 2.4s, right at 3.6s, etc.
          const delayTime = positionInPile * 2.4 + (isLeftPile ? 0 : 1.2);

          if (isInView && index === 0) {
            console.log(`[Block ${index}] Animation initialized with delayTime: ${delayTime}s`);
          }

          return (
            <motion.div
              key={index}
              className="absolute w-32 h-20 bg-gradient-to-r from-red-900 to-red-700 rounded-lg shadow-lg flex items-center justify-center p-3 cursor-pointer hover:shadow-xl transition-shadow"
              initial={{
                y: -500,
                x: 0,
                opacity: 0,
                rotate: 0,
                boxShadow: '0 0 0 2px rgba(239,68,68,0)',
              }}
              animate={
                isInView
                  ? {
                      y: Math.max(landing.y - 28, -100), // Prevent falling below ground (constrained at y=-220)
                      x: landing.x,
                      opacity: 1,
                      rotate: landing.rotation,
                      boxShadow: [
                        '0 0 0 2px rgba(239,68,68,0.5)',
                        '0 0 12px 2px rgba(239,68,68,0.8)',
                        '0 0 0 2px rgba(239,68,68,0.5)',
                      ],
                    }
                  : undefined
              }
              transition={{
                y: {
                  type: 'spring',
                  stiffness: 10, // High stiffness for bounce/collision effect
                  damping: 12, // Lower damping allows more bounce
                  mass: 5, // Heavy mass for slower descent
                  delay: isInView ? delayTime : 0,
                },
                x: {
                  type: 'spring',
                  stiffness: 50, // Medium stiffness to ensure blocks reach left/right positions
                  damping: 12,
                  mass: 5,
                  delay: isInView ? delayTime : 0,
                },
                rotate: {
                  type: 'spring',
                  stiffness: 5, // Very low stiffness for gentle rotation settle
                  damping: 12,
                  mass: 5,
                  delay: isInView ? delayTime : 0,
                },
                opacity: {
                  duration: 0.3,
                  delay: isInView ? delayTime - 0.3 : 0,
                },
                boxShadow: {
                  duration: 1,
                  delay: isInView ? delayTime + 0.5 : 0,
                  repeat: Infinity,
                  times: [0, 0.5, 1],
                  ease: 'easeInOut',
                },
              }}
              onAnimationStart={() => {
                console.log(`[Block ${index}] Animation starting with delay: ${isInView ? delayTime : 0}s`);
                // Schedule face expression update when this block lands
                // Y animation takes ~2 seconds, plus the delay
                if (isInView) {
                  const landingTimeMs = (delayTime + 2) * 1000;
                  const timeoutId = setTimeout(() => {
                    console.log(`[Face] Block ${index} landed, updating face expression...`);
                    // Only update if this index is greater than current (progression effect)
                    setCurrentlyFallingIndex((prev) => Math.max(prev, index));
                  }, landingTimeMs);
                  timeoutRefsRef.current.push(timeoutId);
                }
              }}
            >
              <p className="text-xs font-bold text-center leading-tight text-red-50">
                {task}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Ground element - visual ground line */}
      <div className="absolute bottom-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
    </motion.div>
  );
}
