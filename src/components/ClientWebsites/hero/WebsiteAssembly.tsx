"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export default function WebsiteAssembly() {
  const reduce = useReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setHasAnimated(true);
  }, []);

  if (reduce) {
    // Show static version for reduced motion
    return <StaticWebsite />;
  }

  return (
    <div className="relative w-full max-w-[680px] mx-auto">
      {/* Container with device frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur p-2 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]"
      >
        <div className="relative aspect-[16/10] rounded-xl border border-zinc-800/80 bg-zinc-900/60 overflow-hidden">
          {/* Background gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(600px 260px at 50% -10%, rgba(59,130,246,.08), transparent 60%)",
            }}
          />

          {/* Website Assembly Container */}
          <div className="relative h-full p-4">
            {/* Navigation Bar */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={hasAnimated ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-4"
            >
              <div className="flex items-center justify-between rounded-lg border border-zinc-800/60 bg-zinc-900/80 px-3 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-purple-600" />
                  <div className="flex gap-3">
                    <div className="h-2 w-12 rounded-full bg-zinc-700" />
                    <div className="h-2 w-14 rounded-full bg-zinc-700" />
                    <div className="h-2 w-10 rounded-full bg-zinc-700" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-6 rounded-md border border-zinc-700 bg-zinc-800/60" />
                </div>
              </div>
            </motion.div>

            {/* Hero Section */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={hasAnimated ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6"
            >
              <div className="rounded-xl border border-zinc-800/60 bg-gradient-to-br from-blue-500/10 to-purple-600/10 p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-3 w-24 rounded-full bg-zinc-600" />
                    <div className="h-2 w-32 rounded-full bg-zinc-700" />
                    <div className="mt-3 flex gap-2">
                      <div className="h-6 w-16 rounded-md bg-gradient-to-r from-blue-500 to-purple-600" />
                      <div className="h-6 w-16 rounded-md border border-zinc-700 bg-zinc-800" />
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 border border-zinc-700/50"
                  />
                </div>
              </div>
            </motion.div>

            {/* Content Cards Grid */}
            <motion.div className="grid grid-cols-3 gap-3">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <motion.div
                  key={index}
                  initial={{ 
                    scale: 0, 
                    opacity: 0,
                    x: index % 3 === 0 ? -50 : index % 3 === 2 ? 50 : 0,
                    y: index < 3 ? -30 : 30
                  }}
                  animate={hasAnimated ? { 
                    scale: 1, 
                    opacity: 1,
                    x: 0,
                    y: 0
                  } : {}}
                  transition={{ 
                    delay: 1.5 + index * 0.2, 
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <div className="aspect-square rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-2 shadow-md hover:shadow-lg transition-shadow">
                    <div className="h-full rounded-md bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.7 + index * 0.2, duration: 0.4 }}
                        className="w-3 h-3 rounded-full"
                        style={{
                          background: index % 2 === 0 
                            ? "linear-gradient(135deg, rgba(59,130,246,.6), rgba(168,85,247,.6))"
                            : "linear-gradient(135deg, rgba(16,185,129,.6), rgba(59,130,246,.6))"
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Floating indicators showing assembly */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={hasAnimated ? { opacity: [0, 1, 1, 0] } : {}}
              transition={{ delay: 3.0, duration: 2.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-300 font-medium">Assembly Complete</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Performance metrics badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 0.6 }}
        className="absolute -bottom-2 right-4 text-xs text-zinc-400 font-mono"
      >
        <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-zinc-900/80 border border-zinc-800">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Built in 3.9s</span>
        </div>
      </motion.div>
    </div>
  );
}

// Static version for reduced motion preference
function StaticWebsite() {
  return (
    <div className="relative w-full max-w-[680px] mx-auto">
      <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur p-2 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
        <div className="relative aspect-[16/10] rounded-xl border border-zinc-800/80 bg-zinc-900/60 overflow-hidden p-4">
          {/* Static navigation */}
          <div className="mb-3 rounded-lg border border-zinc-800/60 bg-zinc-900/80 px-3 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-purple-600" />
                <div className="flex gap-3">
                  <div className="h-2 w-12 rounded-full bg-zinc-700" />
                  <div className="h-2 w-14 rounded-full bg-zinc-700" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Static hero */}
          <div className="mb-4 rounded-xl border border-zinc-800/60 bg-gradient-to-br from-blue-500/10 to-purple-600/10 p-4">
            <div className="h-3 w-24 rounded-full bg-zinc-600 mb-2" />
            <div className="h-2 w-32 rounded-full bg-zinc-700" />
          </div>
          
          {/* Static grid */}
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="aspect-square rounded-lg border border-zinc-800/60 bg-zinc-900/60" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}