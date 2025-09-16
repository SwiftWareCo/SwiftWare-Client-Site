"use client";

import { motion, useReducedMotion, useInView } from "motion/react";
import { useRef } from "react";
import { Search, Palette, Code, Rocket, Headphones } from "lucide-react";

const timelineSteps = [
  {
    number: 1,
    title: "Discovery",
    description: "We learn your goals and define success.",
    icon: Search,
  },
  {
    number: 2,
    title: "Design",
    description: "Creating a clean, functional solution tailored to you.",
    icon: Palette,
  },
  {
    number: 3,
    title: "Development",
    description: "Built with speed, precision, and scalability.",
    icon: Code,
  },
  {
    number: 4,
    title: "Testing & Launch",
    description: "We refine, test, and deploy your project live.",
    icon: Rocket,
  },
  {
    number: 5,
    title: "Ongoing Support",
    description: "Continuous improvements to help your business grow.",
    icon: Headphones,
  },
];

export default function WebProcess() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Our Process
        </h2>
        <p className="mt-3 text-base sm:text-lg text-zinc-300">
          From concept to launch, we follow a proven process that delivers exceptional results.
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Desktop Timeline (horizontal) */}
        <div className="hidden lg:block">
          <div className="relative flex items-center justify-between">
            {/* Connecting Line Background */}
            <div className="absolute top-1/2 left-16 right-16 h-0.5 bg-zinc-800 -translate-y-1/2 z-0" />
            
            {/* Animated Connecting Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/2 left-16 right-16 h-0.5 -translate-y-1/2 z-10 origin-left"
              style={{
                background: "linear-gradient(90deg, rgba(59,130,246,0.8), rgba(168,85,247,0.8), rgba(59,130,246,0.8))",
                boxShadow: "0 0 20px rgba(59,130,246,0.3)",
              }}
            />

            {/* Timeline Nodes */}
            {timelineSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.7 + index * 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative flex flex-col items-center z-20"
                  style={{ flex: "1" }}
                >
                  {/* Node Circle */}
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 25px rgba(59,130,246,0.4)"
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative mb-6 overflow-hidden rounded-full"
                  >
                    {/* Main Circle */}
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg border border-blue-400/20 overflow-hidden">
                      <Icon className="w-7 h-7 text-white relative z-10" />
                      
                      {/* Shine Sweep Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                        whileHover={{ x: "200%" }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div 
                    className="text-center max-w-[200px] group-hover:scale-105 transition-transform duration-200"
                    whileHover={{ y: -2 }}
                  >
                    <motion.h3 
                      className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-200"
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p 
                      className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-200"
                    >
                      {step.description}
                    </motion.p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile Timeline (vertical) */}
        <div className="lg:hidden space-y-8">
          {timelineSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                className="relative flex items-start gap-4"
              >
                {/* Connecting Line (except for last item) */}
                {index < timelineSteps.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                    className="absolute left-8 top-16 w-0.5 h-16 origin-top"
                    style={{
                      background: "linear-gradient(180deg, rgba(59,130,246,0.8), rgba(168,85,247,0.8))",
                      boxShadow: "0 0 10px rgba(59,130,246,0.3)",
                    }}
                  />
                )}

                {/* Node */}
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(59,130,246,0.4)"
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative flex-shrink-0 overflow-hidden rounded-full"
                >
                  {/* Main Circle */}
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg border border-blue-400/20 overflow-hidden">
                    <Icon className="w-7 h-7 text-white relative z-10" />
                    
                    {/* Shine Sweep Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                      whileHover={{ x: "200%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div 
                  className="flex-1 pt-3 group-hover:translate-x-1 transition-transform duration-200"
                  whileHover={{ x: 4 }}
                >
                  <motion.h3 
                    className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-200"
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p 
                    className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-200"
                  >
                    {step.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
