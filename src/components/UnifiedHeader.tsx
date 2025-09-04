"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ArrowRight, Sparkles, Zap, Activity } from "lucide-react";

const LINKS = [
  { href: "/#work", label: "Work", id: "work", icon: Sparkles },
  { href: "/#process", label: "Process", id: "process", icon: Zap },
];

export default function UnifiedHeader() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const headerRef = useRef<HTMLDivElement>(null);

  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 100], [0, -5]);

  // Observe sections for "active"
  useEffect(() => {
    const ids = ["work", "process"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.intersectionRatio > b.intersectionRatio ? -1 : 1));
        if (visible[0]) setActive((visible[0].target as HTMLElement).id);
      },
      { threshold: [0.25, 0.5, 0.75] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Header scrolled state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Measure active link for bubble
  useEffect(() => {
    function update() {
      if (!active) return;
      const el = linkRefs.current[active];
      const container = el?.parentElement?.parentElement; // relative wrapper
      if (!el || !container) return;
      const cr = el.getBoundingClientRect();
      const pr = container.getBoundingClientRect();
      setIndicator({ left: cr.left - pr.left, width: cr.width });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <header className="sticky top-0 z-50" ref={headerRef} onMouseMove={handleMouseMove}>
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-x-0 -top-32 h-64 opacity-60"
          style={{
            background: `radial-gradient(80% 50% at 50% 0%,
              rgba(59, 130, 246, 0.15),
              rgba(168, 85, 247, 0.1),
              transparent 70%)`,
          }}
        />

        <motion.div style={{ y: headerY }} className="relative mx-auto max-w-7xl px-6 py-6">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
          >
            <motion.div
              animate={{
                borderColor: scrolled ? "rgb(63 63 70 / 0.8)" : "rgb(63 63 70 / 0.4)",
                backgroundColor: scrolled ? "rgb(9 9 11 / 0.9)" : "rgb(9 9 11 / 0.7)",
                boxShadow: scrolled
                  ? "0 16px 40px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(168, 85, 247, 0.1)"
                  : "0 8px 32px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(168, 85, 247, 0.05)",
                scale: scrolled ? 0.98 : 1,
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
              className="rounded-2xl border backdrop-blur-xl overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  background: `radial-gradient(300px circle at ${mousePos.x}% ${mousePos.y}%,
                    rgba(59,130,246,0.03), transparent 50%)`,
                }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative px-6 py-3">
                <div className="flex items-center justify-between mb-3">
                  <Link
                    href="/"
                    className="group/logo relative flex items-center gap-3 text-lg font-bold tracking-wide text-white"
                  >
                    <div className="relative">
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="size-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600
                                   shadow-brand-glow group-hover/logo:shadow-brand-intense transition-all duration-300
                                   flex items-center justify-center p-1"
                      >
                        <Image
                          src="/images/swiftware-logo.png"
                          alt="Swiftware Logo"
                          width={24}
                          height={24}
                          className="mix-blend-screen"
                          unoptimized={process.env.NODE_ENV === "development"}
                        />
                      </motion.div>

                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0, 0.3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 size-8 rounded-lg border border-blue-400"
                      />
                    </div>

                    <div>
                      <span className="bg-gradient-to-r from-white to-zinc-200 bg-clip-text text-transparent
                                       group-hover/logo:from-blue-100 group-hover/logo:to-purple-100 transition-all duration-300 text-base">
                        Swiftware
                      </span>
                      <div className="text-xs text-zinc-400">Digital Excellence</div>
                    </div>

                    <div
                      className="absolute -inset-2 rounded-xl opacity-0 group-hover/logo:opacity-100
                                 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl
                                 transition-all duration-500 -z-10"
                    />
                  </Link>

                  <div className="hidden sm:flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="size-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                      />
                      <span className="text-sm text-zinc-400">Online</span>
                    </div>
                    <div className="h-3 w-px bg-zinc-700" />
                    <div className="flex items-center gap-2">
                      <Activity className="size-3 text-blue-400" />
                      <span className="text-sm text-zinc-400">Response &lt;100ms</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="relative flex items-center gap-2">
                    <AnimatePresence mode="wait" initial={false}>
                      {indicator && (
                        <motion.div
                          key={`bubble-${active}`}
                          layoutId="unified-nav-bubble"
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          className="absolute inset-y-0 z-0 rounded-xl bg-gradient-to-r
                                     from-blue-500/10 via-purple-500/10 to-blue-500/10
                                     border border-blue-500/20"
                          style={{ left: indicator.left, width: indicator.width }}
                        />
                      )}
                    </AnimatePresence>

                    {LINKS.map((link, index) => {
                      const isActive = active === link.id;
                      const Icon = link.icon;
                      return (
                        <motion.div
                          key={link.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                                                     <Link
                             ref={(el) => {
                               linkRefs.current[link.id] = el;
                             }}
                             href={link.href}
                            className={`relative group/link flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 z-10 ${
                              isActive ? "text-white" : "text-zinc-400 hover:text-white hover:scale-105"
                            }`}
                          >
                            <Icon
                              className={`size-4 transition-all duration-300 ${
                                isActive ? "text-blue-400" : "text-zinc-500 group-hover/link:text-blue-400"
                              }`}
                            />
                            {link.label}

                            {isActive && (
                              <motion.span
                                layoutId="unified-nav-indicator"
                                className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                              />
                            )}

                            <motion.div
                              className="absolute inset-0 rounded-xl opacity-0 group-hover/link:opacity-100 pointer-events-none"
                              initial={false}
                              animate={{
                                background: isActive
                                  ? "radial-gradient(circle, rgba(59,130,246,0.1), transparent)"
                                  : "radial-gradient(circle, rgba(59,130,246,0.05), transparent)",
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                                     {/* CTA Button */}
                   <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                     <motion.div
                       initial="rest"
                       animate="rest"
                       whileHover="hover"
                       className="relative inline-flex items-center gap-2 overflow-hidden rounded-lg border border-blue-400/20 bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white"
                     >
                       <Link href="/?contact=open" className="relative z-10 flex items-center gap-2">
                         {/* Sheen effect */}
                         <motion.span
                           aria-hidden
                           className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-purple-600/0 via-purple-600/30 to-blue-500/0"
                           variants={{
                             rest: { x: "-100%", opacity: 0 },
                             hover: { x: "100%", opacity: 1 },
                           }}
                           transition={{ duration: 0.6, ease: "easeInOut" }}
                         />

                         <span>Start your project</span>
                         <motion.span
                           variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                           transition={{ type: "spring", stiffness: 400 }}
                         >
                           <ArrowRight className="size-4" />
                         </motion.span>

                         {/* Sparkle effect */}
                         <motion.span
                           aria-hidden
                           className="pointer-events-none absolute top-1 right-1 size-1.5 rounded-full bg-yellow-400"
                           variants={{ rest: { opacity: 0, scale: 0.9 }, hover: { opacity: 1, scale: 1.2 } }}
                           transition={{ duration: 0.3 }}
                         />
                       </Link>
                     </motion.div>
                   </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="absolute bottom-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                style={{ opacity: scrolled ? 0.8 : 0.5 }}
              />
            </motion.div>

            {/* Optional: tiny ambient dots WITHOUT randomness */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute size-1 bg-blue-400/30 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${20 + i * 10}%`,
                  }}
                  initial={{ y: 0, opacity: 0.2 }}
                  animate={{ y: [-8, 8, -8], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
