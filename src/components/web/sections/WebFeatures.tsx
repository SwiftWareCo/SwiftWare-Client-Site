"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  Search,
  Zap,
  Shield,
  Smartphone,
  Eye,
  BarChart3,
  LucideIcon
} from "lucide-react";
import type { Feature } from "@/types/content";

// Icon mapping for the features
const iconMap: Record<string, LucideIcon> = {
  Search,
  Zap,
  Shield,
  Smartphone,
  Eye,
  BarChart3,
};

interface WebFeaturesProps {
  features: Feature[];
}

export default function WebFeatures({ features }: WebFeaturesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduce = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative py-16 px-4 sm:px-6 max-w-7xl mx-auto"
      aria-labelledby="features-heading"
    >
      {/* Section Header */}
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12"
      >
        <h2
          id="features-heading"
          className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
        >
          What Makes Our Websites Exceptional
        </h2>
        <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
          Every website we build comes with enterprise-grade features that ensure your success.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const IconComponent = iconMap[feature.icon];

          return (
            <motion.div
              key={feature.title}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: reduce ? 0 : index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="group relative"
            >
              <div className="h-full p-6 rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900/40 via-zinc-900/20 to-transparent backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-gradient-to-br hover:from-blue-500/5 hover:via-purple-500/5 hover:to-transparent">
                {/* Icon */}
                <div className="mb-4">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 group-hover:border-blue-400/30 transition-colors duration-300">
                    {IconComponent && (
                      <IconComponent
                        className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-100 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Category Badge */}
                {feature.category && (
                  <div className="mt-4">
                    <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-zinc-800/50 text-zinc-400 border border-zinc-700/50">
                      {feature.category}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}