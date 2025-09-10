"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import ThemedFocusDropdown from "./focus/ThemedFocusDropdown";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function update() {
      if (!active) return;
      const el = linkRefs.current[active];
      const container = el?.parentElement?.parentElement;
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
    <header
      className="fixed top-0 left-0 right-0 z-50"
      ref={headerRef}
      onMouseMove={handleMouseMove}
    >
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-x-0 -top-28 h-60 opacity-60"
          style={{
            background: `radial-gradient(80% 50% at 50% 0%,
              rgba(59, 130, 246, 0.15),
              rgba(168, 85, 247, 0.1),
              transparent 70%)`,
          }}
        />

        <motion.div
          style={{ y: headerY }}
          className="relative mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4"
        >
          <motion.div
            initial={{ y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
          >
            <motion.div
              animate={{
                borderColor: scrolled ? "rgb(63 63 70 / 0.8)" : "rgb(63 63 70 / 0.4)",
                backgroundColor: scrolled ? "rgb(9 9 11 / 0.9)" : "rgb(9 9 11 / 0.7)",
                boxShadow: scrolled
                  ? "0 16px 40px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(168, 85, 247, 0.1)"
                  : "0 8px 32px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(168, 85, 247, 0.05)",
                scale: scrolled ? 0.985 : 1,
              }}
              transition={{ duration: 0.25, ease: [0.25, 0.8, 0.25, 1] }}
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

              <div className="relative px-4 sm:px-6 py-2.5 sm:py-3">
                {/* Mobile: Simple layout - Logo + CTA */}
                <div className="flex items-center justify-between sm:hidden">
                  <Link
                    href="/"
                    className="group/logo relative flex items-center gap-2 text-base font-bold tracking-wide text-white"
                  >
                    <div className="relative">
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="size-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600
                                   shadow-brand-glow group-hover/logo:shadow-brand-intense transition-all duration-300
                                   flex items-center justify-center p-1"
                      >
                        <Image
                          src="/images/swiftware-logo.png"
                          alt="Swiftware Logo"
                          width={20}
                          height={20}
                          className="mix-blend-screen"
                          unoptimized={process.env.NODE_ENV === "development"}
                        />
                      </motion.div>
                    </div>
                    <div className="leading-tight">
                      <span className="bg-gradient-to-r from-white to-zinc-200 bg-clip-text text-transparent text-sm">
                        Swiftware
                      </span>
                      <div className="text-[10px] text-zinc-400">Digital Excellence</div>
                    </div>
                  </Link>

                  <Link
                    href="/?contact=open"
                    className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-lg border border-blue-400/20 bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    <span>Start project</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>

                {/* Desktop: Full layout */}
                <div className="hidden sm:block">
                  {/* Row 1 */}
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
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
                            width={22}
                            height={22}
                            className="mix-blend-screen"
                            unoptimized={process.env.NODE_ENV === "development"}
                          />
                        </motion.div>
                      </div>

                      <div className="leading-tight">
                        <span className="bg-gradient-to-r from-white to-zinc-200 bg-clip-text text-transparent text-base">
                          Swiftware
                        </span>
                        <div className="text-xs text-zinc-400">Digital Excellence</div>
                      </div>
                    </Link>

                    {/* status removed per request */}
                  </div>

                  {/* Row 2 */}
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
                            initial={{ opacity: 0, x: -14 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35, delay: index * 0.08 }}
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
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Focus dropdown + CTA */}
                    <motion.div
                      initial={{ x: 16, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="ml-2 flex items-center gap-3"
                    >
                      <div className="hidden md:block">
                        <ThemedFocusDropdown />
                      </div>
                      <motion.div
                        initial="rest"
                        animate="rest"
                        whileHover="hover"
                        className="relative inline-flex items-center gap-2 overflow-hidden rounded-lg border border-blue-400/20 bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white"
                      >
                        <Link href="/?contact=open" className="relative z-10 flex items-center gap-2">
                          <motion.span
                            aria-hidden
                            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-purple-600/0 via-purple-600/30 to-blue-500/0"
                            variants={{ rest: { x: "-100%", opacity: 0 }, hover: { x: "100%", opacity: 1 } }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                          />
                          <span>Start your project</span>
                          <motion.span variants={{ rest: { x: 0 }, hover: { x: 4 } }} transition={{ type: "spring", stiffness: 400 }}>
                            <ArrowRight className="size-4" />
                          </motion.span>
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
                className="absolute bottom-0 inset-x-4 sm:inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                style={{ opacity: scrolled ? 0.8 : 0.5 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
