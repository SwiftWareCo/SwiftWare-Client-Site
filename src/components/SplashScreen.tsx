"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Call onComplete after animation finishes
      setTimeout(onComplete, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950"
        >
          {/* Background with animated gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 size-96 bg-blue-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 size-80 bg-purple-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center">
            {/* Logo with animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <div className="relative">
                {/* Main logo */}
                <motion.div
                  className="size-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 size-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 opacity-0"
                  animate={{
                    opacity: [0, 0.3, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>

            {/* Company name */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4"
            >
              Swiftware
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-zinc-400 mb-8"
            >
              Custom Software, Meticulously Made
            </motion.p>

            {/* Loading animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-center justify-center gap-2"
            >
              <motion.div
                className="size-2 bg-blue-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 0,
                }}
              />
              <motion.div
                className="size-2 bg-purple-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 0.2,
                }}
              />
              <motion.div
                className="size-2 bg-blue-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 0.4,
                }}
              />
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-8 w-48 mx-auto"
            >
              <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>

          {/* Floating particles - using fixed positions to avoid hydration mismatch */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[
              { x: 100, y: 200, delay: 0, duration: 3 },
              { x: 300, y: 150, delay: 0.5, duration: 4 },
              { x: 500, y: 300, delay: 1, duration: 3.5 },
              { x: 700, y: 100, delay: 1.5, duration: 4.5 },
              { x: 900, y: 250, delay: 2, duration: 3.2 },
              { x: 200, y: 400, delay: 0.3, duration: 4.2 },
              { x: 400, y: 500, delay: 0.8, duration: 3.8 },
              { x: 600, y: 350, delay: 1.2, duration: 4.1 },
              { x: 800, y: 450, delay: 1.8, duration: 3.6 },
              { x: 1000, y: 180, delay: 2.2, duration: 4.3 },
              { x: 150, y: 300, delay: 0.2, duration: 3.9 },
              { x: 350, y: 450, delay: 0.7, duration: 4.4 },
              { x: 550, y: 200, delay: 1.1, duration: 3.7 },
              { x: 750, y: 380, delay: 1.6, duration: 4.0 },
              { x: 950, y: 320, delay: 2.1, duration: 3.4 },
              { x: 120, y: 480, delay: 0.4, duration: 4.6 },
              { x: 320, y: 120, delay: 0.9, duration: 3.3 },
              { x: 520, y: 420, delay: 1.3, duration: 4.7 },
              { x: 720, y: 280, delay: 1.7, duration: 3.5 },
              { x: 920, y: 380, delay: 2.3, duration: 4.1 },
            ].map((particle, i) => (
              <motion.div
                key={i}
                className="absolute size-1 bg-blue-400/30 rounded-full"
                initial={{
                  x: particle.x,
                  y: particle.y,
                  opacity: 0,
                }}
                animate={{
                  y: [particle.y, particle.y - 100, particle.y],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
