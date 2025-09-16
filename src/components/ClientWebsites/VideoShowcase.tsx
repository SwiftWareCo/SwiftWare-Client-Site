"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useVideoShowcase } from "./VideoShowcaseContext";

export default function VideoShowcase() {
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
      className="relative mx-auto max-w-[92rem] px-4 sm:px-6 py-8 sm:py-12"
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
            <div className="text-center mb-8">
              <motion.h3
                key={`title-${activeProject}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-xl sm:text-2xl font-bold text-white mb-2"
              >
                {currentProject.name}
              </motion.h3>
              <motion.div
                key={`meta-${activeProject}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex items-center justify-center gap-3 flex-wrap"
              >
                <span className="px-3 py-1.5 text-sm font-medium rounded-full bg-zinc-900/80 text-zinc-300 border border-zinc-700/50">
                  {currentProject.industry}
                </span>
                <div className="flex gap-2">
                  {currentProject.techStack.map((tech, idx) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="relative min-h-[400px] sm:min-h-[480px] lg:min-h-[560px] flex items-center justify-center">
              {/* Desktop Screen (left/center) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative w-full max-w-[900px] lg:max-w-[650px] xl:max-w-[700px] mr-0 lg:mr-16 xl:mr-20 lg:-ml-8 xl:-ml-12"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] ring-1 ring-zinc-800/50">
                  <div 
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1))",
                      filter: "blur(20px)",
                      transform: "scale(1.1)",
                    }}
                  />
                  <div className="relative aspect-video bg-zinc-950/90 backdrop-blur">
                    <video
                      ref={desktopVideoRef}
                      className="w-full h-full object-cover"
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
                    <div className="absolute bottom-4 right-4 opacity-20">
                      <Image
                        src="/images/swiftware-logo-text.png"
                        alt=""
                        width={80}
                        height={24}
                        className="w-auto h-6"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Mobile Screen (right, with proper separation) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute right-8 lg:right-12 xl:right-16 top-1/2 -translate-y-1/2 w-[180px] sm:w-[200px] lg:w-[240px] xl:w-[280px]"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-[0_50px_120px_-30px_rgba(0,0,0,0.6)] ring-1 ring-zinc-700/50">
                  <div 
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(59,130,246,0.15))",
                      filter: "blur(15px)",
                      transform: "scale(1.05)",
                    }}
                  />
                  <div className="relative aspect-[9/19.5] bg-zinc-950/95 backdrop-blur overflow-hidden">
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
                  </div>
                </div>
              </motion.div>

              {/* Live Status Indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                className="absolute top-6 left-6 z-10"
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-700/50 backdrop-blur-sm shadow-lg">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm text-zinc-300 font-mono">Live Site</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}