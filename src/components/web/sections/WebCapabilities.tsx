"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useVideoShowcase } from "@/components/web/VideoShowcaseContext";
import type { FocusContent } from "@/types/content";

interface WebCapabilitiesProps {
  capabilities: FocusContent['capabilities'];
}

export default function WebCapabilities({ capabilities }: WebCapabilitiesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);
  const { activeProject, setActiveProject, projects } = useVideoShowcase();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="relative mx-auto max-w-[92rem] px-4 sm:px-6 py-12 sm:py-16 overflow-hidden"
    >
      <motion.div
        ref={ref}
        initial={{ y: 10, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <header className="text-center mb-8 sm:mb-10">
          <h2 id="clients-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
            Transforming Businesses Through Web Excellence
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-300">
            Delivering excellence to businesses across every sector
          </p>
        </header>

        {/* Logos row */}
        {!isMobile && (
          <ul className="flex items-center justify-center gap-4 md:gap-6">
            {projects.map((project, idx) => (
              <li key={`${project.name}-desktop-${idx}`} className="group flex flex-col items-center">
                <button
                  onClick={() => setActiveProject(idx)}
                  onMouseEnter={() => setActiveProject(idx)}
                  className={`relative p-2 rounded-xl transition-all duration-300 ${
                    activeProject === idx 
                      ? 'bg-blue-500/10 border border-blue-500/30' 
                      : 'hover:bg-zinc-800/50'
                  }`}
                >
                    <Image
                      src={project.logo}
                      alt={`${project.name} logo`}
                      width={96}
                      height={96}
                      className={`h-12 sm:h-14 md:h-16 w-auto transition duration-300 ease-out transform hover:scale-105 ${
                        activeProject === idx 
                          ? 'grayscale-0 drop-shadow-[0_6px_22px_rgba(59,130,246,0.4)]' 
                          : 'grayscale hover:grayscale-0 hover:drop-shadow-[0_6px_22px_rgba(59,130,246,0.25)]'
                      }`}
                    />
                  {activeProject === idx && (
                    <motion.div
                      layoutId="active-project-indicator"
                      className="absolute inset-0 rounded-xl border-2 border-blue-500/50 bg-blue-500/5"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
                <span className={`mt-3 text-sm sm:text-base transition-colors duration-300 ${
                  activeProject === idx ? 'text-blue-300' : 'text-zinc-400'
                }`}>
                  {project.name}
                </span>
              </li>
            ))}
          </ul>
        )}

        {isMobile && (
          <div className="w-full overflow-hidden px-1">
            <ul className="flex items-center justify-between gap-2">
              {projects.map((project, idx) => (
                <li key={`${project.name}-mobile-${idx}`} className="group flex flex-col items-center flex-1 min-w-0">
                  <button
                    onClick={() => setActiveProject(idx)}
                    onTouchStart={() => setActiveProject(idx)}
                    className={`relative p-1 rounded-lg transition-all duration-300 ${
                      activeProject === idx
                        ? 'bg-blue-500/10 border border-blue-500/30' 
                        : 'hover:bg-zinc-800/50'
                    }`}
                  >
                    <Image
                      src={project.logo}
                      alt={`${project.name} logo`}
                      width={64}
                      height={64}
                      className={`h-7 w-auto transition duration-300 ease-out transform hover:scale-105 ${
                        activeProject === idx
                          ? 'grayscale-0 drop-shadow-[0_6px_22px_rgba(59,130,246,0.4)]' 
                          : 'grayscale hover:grayscale-0 hover:drop-shadow-[0_6px_22px_rgba(59,130,246,0.25)]'
                      }`}
                    />
                  </button>
                  <span className={`mt-1 text-xs transition-colors duration-300 text-center leading-tight ${
                    activeProject === idx ? 'text-blue-300' : 'text-zinc-400'
                  }`}>
                    {project.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </section>
  );
}
