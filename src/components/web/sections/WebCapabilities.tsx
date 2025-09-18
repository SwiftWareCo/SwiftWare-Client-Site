"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
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
            Transforming Businesses with Measurable Results
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-300">
            Real clients, real improvements, real growth
          </p>
        </header>

        {/* Client Cards - Desktop */}
        {!isMobile && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projects.map((project, idx) => (
              <div
                key={`${project.name}-desktop-${idx}`}
                className={`group relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  activeProject === idx
                    ? 'bg-blue-500/10 border-blue-500/30'
                    : 'bg-zinc-900/40 border-zinc-800/50 hover:border-blue-500/20 hover:bg-zinc-900/60'
                }`}
                onClick={(e) => {
                  // Don't change active project if clicking on a link
                  if ((e.target as HTMLElement).closest('a')) {
                    return;
                  }
                  setActiveProject(idx);
                }}
                onMouseEnter={() => setActiveProject(idx)}
              >
                {/* Metrics Badge */}
                <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20">
                  {project.metrics}
                </div>

                {/* Logo and Content */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <Image
                      src={project.logo}
                      alt={`${project.name} logo`}
                      width={80}
                      height={80}
                      className={`h-16 w-auto transition duration-300 ease-out transform group-hover:scale-105 ${
                        activeProject === idx
                          ? 'grayscale-0 drop-shadow-[0_6px_22px_rgba(59,130,246,0.4)]'
                          : 'grayscale group-hover:grayscale-0 group-hover:drop-shadow-[0_6px_22px_rgba(59,130,246,0.25)]'
                      } ${
                        project.name === 'CJS Academy' || project.name === 'Beacon'
                          ? 'rounded-lg'
                          : ''
                      }`}
                    />
                  </div>

                  <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                    activeProject === idx ? 'text-blue-300' : 'text-white group-hover:text-blue-100'
                  }`}>
                    {project.name}
                  </h3>

                  <p className="text-sm text-zinc-400 group-hover:text-zinc-300 mb-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Lighthouse Score for VHD */}
                  {project.lighthouseImage && (
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-xs font-medium text-green-400">
                        🚨 Perfect Lighthouse Scores: 100/100
                      </span>
                    </div>
                  )}

                  <div className="text-xs text-zinc-500 mb-4">
                    {project.industry}
                  </div>

                  {/* External Link */}
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200 relative z-30"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    style={{ pointerEvents: 'auto' }}
                  >
                    {project.isApp ? 'View App' : 'Visit Website'}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {/* Active Project Indicator */}
                {activeProject === idx && (
                  <motion.div
                    layoutId="active-project-indicator-desktop"
                    className="absolute inset-0 rounded-2xl border-2 border-blue-500/50 bg-blue-500/5 z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Client Cards - Mobile */}
        {isMobile && (
          <div className="space-y-4">
            {projects.map((project, idx) => (
              <div
                key={`${project.name}-mobile-${idx}`}
                className={`group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                  activeProject === idx
                    ? 'bg-blue-500/10 border-blue-500/30'
                    : 'bg-zinc-900/40 border-zinc-800/50'
                }`}
                onClick={(e) => {
                  // Don't change active project if clicking on a link
                  if ((e.target as HTMLElement).closest('a')) {
                    return;
                  }
                  setActiveProject(idx);
                }}
                onTouchStart={() => setActiveProject(idx)}
              >
                {/* Metrics Badge */}
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-20">
                  {project.metrics}
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <Image
                      src={project.logo}
                      alt={`${project.name} logo`}
                      width={48}
                      height={48}
                      className={`h-12 w-auto transition duration-300 ${
                        activeProject === idx
                          ? 'grayscale-0'
                          : 'grayscale'
                      } ${
                        project.name === 'CJS Academy' || project.name === 'Beacon'
                          ? 'rounded-lg'
                          : ''
                      }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm mb-1 ${
                      activeProject === idx ? 'text-blue-300' : 'text-white'
                    }`}>
                      {project.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mb-2 line-clamp-2">
                      {project.description}
                    </p>
                    {/* Lighthouse Score for VHD - Mobile */}
                    {project.lighthouseImage && (
                      <div className="mb-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/10 border border-green-500/30 rounded-full text-xs font-medium text-green-400">
                          🚨 100/100 Lighthouse
                        </span>
                      </div>
                    )}
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-400 text-xs font-medium relative z-30"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      style={{ pointerEvents: 'auto' }}
                    >
                      {project.isApp ? 'View App' : 'Visit'}
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>
                </div>

                {/* Active Project Indicator */}
                {activeProject === idx && (
                  <motion.div
                    layoutId="active-project-indicator-mobile"
                    className="absolute inset-0 rounded-xl border-2 border-blue-500/50 bg-blue-500/5 z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
