"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress - slower and more controlled
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Much slower progress: 2-4% every 100ms
        return prev + Math.random() * 2 + 2;
      });
    }, 100);

    // Auto-hide after 3 seconds regardless of progress
    const autoHideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(autoHideTimer);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950"
        >
          {/* Animated background */}
          <div className="absolute inset-0">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
            
            {/* Animated gradient overlay */}
            <motion.div 
              className="absolute inset-0"
              animate={{
                background: [
                  "radial-gradient(600px 300px at 30% 40%, rgba(59, 130, 246, 0.1), transparent 50%)",
                  "radial-gradient(800px 400px at 70% 60%, rgba(168, 85, 247, 0.12), transparent 50%)",
                  "radial-gradient(600px 300px at 40% 30%, rgba(59, 130, 246, 0.1), transparent 50%)"
                ]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
            
            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute size-1 bg-blue-400/20 rounded-full"
                initial={{
                  x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
                  y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
                  opacity: 0,
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo with pulsing animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Animated logo background */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="size-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-brand-intense"
              />
              
              {/* Logo icon */}
              <div className="absolute inset-0 m-auto size-12 flex items-center justify-center">
                <Image
                  src="/images/swiftware-logo.png"
                  alt="SwiftWare software development company logo"
                  width={150}
                  height={150}
                  className="mix-blend-screen"
                  priority
                  unoptimized={process.env.NODE_ENV === 'development'}
                />
              </div>
              
              {/* Pulsing rings */}
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-2xl border-2 border-blue-400"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.8, 1],
                  opacity: [0.2, 0, 0.2]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute inset-0 rounded-2xl border border-purple-400"
              />
            </motion.div>

            {/* Brand name with stagger animation */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold tracking-wide mb-2">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Swiftware
                </span>
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-zinc-400 text-sm tracking-wider uppercase"
              >
                Crafting Digital Excellence
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "200px", opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="relative h-1 bg-zinc-800 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-32px", "200px"] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 0.5
                }}
              />
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-zinc-500 text-sm"
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {progress < 30 && "Initializing systems..."}
                {progress >= 30 && progress < 60 && "Loading components..."}
                {progress >= 60 && progress < 90 && "Preparing experience..."}
                {progress >= 90 && "Almost ready..."}
              </motion.span>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-20 -left-20 size-40 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 size-40 bg-purple-500/5 rounded-full blur-3xl" />
          </div>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32">
            <div className="absolute top-4 left-4 w-1 h-8 bg-gradient-to-b from-blue-500 to-transparent rounded-full" />
            <div className="absolute top-4 left-4 w-8 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 rotate-180">
            <div className="absolute top-4 left-4 w-1 h-8 bg-gradient-to-b from-purple-500 to-transparent rounded-full" />
            <div className="absolute top-4 left-4 w-8 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


