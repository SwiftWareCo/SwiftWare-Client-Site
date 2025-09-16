"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useVideoShowcase } from "@/components/web/VideoShowcaseContext";

export default function WebVideoShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const { activeProject, projects } = useVideoShowcase();

  useEffect(() => {
    // Auto-play videos when project changes
    const playVideo = (video: HTMLVideoElement) => {
      video.currentTime = 0;
      video.play().catch(() => {
        console.log('Video autoplay failed, user interaction required');
      });
    };

    if (desktopVideoRef.current) {
      const video = desktopVideoRef.current;
      video.addEventListener('loadeddata', () => playVideo(video));
      if (video.readyState >= 3) {
        playVideo(video);
      }
    }
    
    if (mobileVideoRef.current) {
      const video = mobileVideoRef.current;
      video.addEventListener('loadeddata', () => playVideo(video));
      if (video.readyState >= 3) {
        playVideo(video);
      }
    }
  }, [activeProject]);

  const currentProject = projects[activeProject];

  return (
    <section
      id="video-showcase"
      aria-labelledby="video-showcase-heading"
      className="relative mx-auto max-w-[92rem] px-4 sm:px-6 py-8 sm:py-12 overflow-hidden"
    >
      <motion.div
        ref={ref}
        initial={{ y: 20, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Video Showcase */}
        <div className="relative">
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl border border-zinc-800 bg-zinc-950/80 backdrop-blur p-6 sm:p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]"
          >
            {/* Project Header */}
            <div className="text-center mb-6">
              <motion.h3
                key={`title-${activeProject}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-xl sm:text-2xl font-bold text-white mb-2 min-h-[2rem] flex items-center justify-center"
              >
                {currentProject.name}
              </motion.h3>
              <motion.div
                key={`meta-${activeProject}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap min-h-[2.5rem]"
              >
                <span className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-full bg-zinc-900/80 text-zinc-300 border border-zinc-700/50">
                  {currentProject.industry}
                </span>
                <div className="flex gap-1 sm:gap-2">
                  {currentProject.techStack.map((tech, idx) => (
                    <span
                      key={tech}
                      className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="relative rounded-2xl border border-zinc-800/80 bg-zinc-900/60 overflow-hidden">
              {/* Mobile: Vertical Stack */}
              <div className="md:hidden p-4 sm:p-6">
                <div className="flex flex-col items-center gap-6">
                  {/* Desktop Monitor (top on mobile) */}
                  <div className="w-full max-w-[400px]">
                    <MonitorFrame>
                      <video
                        ref={desktopVideoRef}
                        className="w-full h-full object-cover rounded-md"
                        src={currentProject.desktopVideo}
                        poster={currentProject.poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                      >
                        <source src={currentProject.desktopVideo.replace('.mp4', '.webm')} type="video/webm" />
                        <source src={currentProject.desktopVideo} type="video/mp4" />
                      </video>
                      
                      {/* Client logo watermark */}
                      <div className="absolute bottom-1 right-1 opacity-20">
                        <Image
                          src="/images/swiftware-logo-text.png"
                          alt=""
                          width={80}
                          height={24}
                          className="w-auto h-3"
                        />
                      </div>
                    </MonitorFrame>
                  </div>

                  {/* Mobile Phone (bottom on mobile) */}
                  <div className="w-full max-w-[180px]">
                    <PhoneFrame>
                      <video
                        ref={mobileVideoRef}
                        className="w-full h-full object-contain"
                        src={currentProject.mobileVideo}
                        poster={currentProject.mobilePoster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                      >
                        <source src={currentProject.mobileVideo.replace('.mp4', '.webm')} type="video/webm" />
                        <source src={currentProject.mobileVideo} type="video/mp4" />
                      </video>
                    </PhoneFrame>
                  </div>
                </div>
              </div>

              {/* Desktop: Side by Side */}
              <div className="hidden md:block relative aspect-[16/9] lg:aspect-[5/3] min-h-[450px] lg:min-h-[550px]">
                {/* Desktop Monitor (left on desktop) */}
                <div className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-[clamp(400px,65%,650px)] lg:w-[clamp(500px,70%,750px)]">
                  <MonitorFrame>
                    <video
                      ref={desktopVideoRef}
                      className="w-full h-full object-cover rounded-md"
                      src={currentProject.desktopVideo}
                      poster={currentProject.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                    >
                      <source src={currentProject.desktopVideo.replace('.mp4', '.webm')} type="video/webm" />
                      <source src={currentProject.desktopVideo} type="video/mp4" />
                    </video>
                    
                    {/* Client logo watermark */}
                    <div className="absolute bottom-3 right-3 opacity-20">
                      <Image
                        src="/images/swiftware-logo-text.png"
                        alt=""
                        width={80}
                        height={24}
                        className="w-auto h-6"
                      />
                    </div>
                  </MonitorFrame>
                </div>

                {/* Mobile Phone (right on desktop) */}
                <div className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-[clamp(160px,22%,220px)] lg:w-[clamp(200px,25%,280px)]">
                  <PhoneFrame>
                    <video
                      ref={mobileVideoRef}
                      className="w-full h-full object-contain"
                      src={currentProject.mobileVideo}
                      poster={currentProject.mobilePoster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                    >
                      <source src={currentProject.mobileVideo.replace('.mp4', '.webm')} type="video/webm" />
                      <source src={currentProject.mobileVideo} type="video/mp4" />
                    </video>
                  </PhoneFrame>
                </div>
              </div>

              {/* Live Status Indicator - Top left */}
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 lg:top-6 lg:left-6 z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                  className="flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-full bg-zinc-900/90 border border-zinc-700/50 backdrop-blur-sm shadow-lg"
                >
                  <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs sm:text-sm text-zinc-300 font-mono">Live Site</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Monitor Frame ---------- */
function MonitorFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="rounded-[1.2rem] sm:rounded-[1.8rem] border border-zinc-700 bg-zinc-950 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] p-2 sm:p-4">
        <div className="rounded-lg sm:rounded-xl border border-zinc-800 bg-zinc-900/80 p-1.5 sm:p-3">
          <div className="relative rounded-md sm:rounded-lg border border-zinc-800/70 bg-zinc-950/80 overflow-hidden">
            <div className="aspect-video">
              {children}
            </div>
          </div>
        </div>
      </div>
      {/* Stand - Hidden on mobile for space */}
      <div className="hidden sm:block absolute left-1/2 -bottom-6 h-6 w-3 -translate-x-1/2 rounded bg-zinc-700" />
      <div className="hidden sm:block absolute left-1/2 -bottom-10 h-4 w-32 -translate-x-1/2 rounded-lg bg-zinc-800 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]" />
    </div>
  );
}

/* ---------- Phone Frame ---------- */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[1.5rem] sm:rounded-[2.2rem] border border-zinc-700 bg-zinc-900 p-1.5 sm:p-3 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
      <div className="h-2 w-12 sm:h-3 sm:w-16 mx-auto mb-1 sm:mb-2 rounded-full bg-zinc-700" />
      <div className="relative">
        <div className="aspect-[9/19.5] rounded-[1rem] sm:rounded-[1.5rem] border border-zinc-800/60 bg-zinc-950/70 overflow-hidden">
          <div className="absolute inset-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
