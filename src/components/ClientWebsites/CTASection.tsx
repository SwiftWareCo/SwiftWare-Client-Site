"use client";

import { motion, useReducedMotion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      className="relative w-full pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20"
    >

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.h2
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight tracking-tight"
        >
          Ready to bring your{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            vision to life?
          </span>
        </motion.h2>

        <motion.p
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Contact us today and we'll get back to you within 24 hours.
        </motion.p>

        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/ClientWebsites?contact=open"
            className="relative inline-flex items-center gap-3 overflow-hidden rounded-xl px-8 py-4 text-lg font-medium text-white ring-1 ring-zinc-800 transition-all duration-300"
            style={{ 
              background: "linear-gradient(90deg, rgb(59 130 246), rgb(168 85 247))"
            }}
            aria-label="Start your project"
          >
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-purple-600/0 via-white/20 to-blue-500/0"
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            
            <span className="relative z-10">Start Your Project</span>
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <ArrowRight className="size-5" />
            </motion.div>
          </Link>
        </motion.div>

        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 flex items-center justify-center gap-2 text-sm text-zinc-400"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Free consultation • No commitment required</span>
        </motion.div>
      </div>
    </section>
  );
}