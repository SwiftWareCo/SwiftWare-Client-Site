"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

const LINKS = [
  { href: "/#work", label: "Work", id: "work", icon: Sparkles },
  { href: "/#process", label: "Process", id: "process", icon: Zap },
];

export default function NavBar() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });


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

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="mx-auto flex w-full justify-center px-6">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Main navigation"
        className="relative group"
        onMouseMove={handleMouseMove}
        style={{ maxWidth: 920 }}
      >
        {/* Floating container with enhanced glassmorphism */}
        <motion.div
          animate={{
            borderColor: scrolled ? "rgb(63 63 70 / 0.8)" : "rgb(63 63 70 / 0.4)",
            backgroundColor: scrolled ? "rgb(9 9 11 / 0.9)" : "rgb(9 9 11 / 0.7)",
            boxShadow: scrolled
              ? "0 16px 40px rgba(167, 39, 118, 0.4), 0 0 0 1px rgba(202, 35, 119, 0.1)"
              : "0 8px 32px rgba(119, 33, 177, 0.2), 0 0 0 1px rgba(230, 52, 52, 0.05)",
            scale: scrolled ? 0.98 : 1,
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
          className=" mt-4 flex items-center gap-1 rounded-2xl border backdrop-blur-xl px-6 py-2"
        >
          {/* Dynamic gradient overlay that follows mouse */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: `radial-gradient(300px circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.03), transparent 50%)`,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Brand accent line */}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="absolute inset-x-4 -bottom-px h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent origin-center"
            style={{ opacity: scrolled ? 0.8 : 0.5 }}
          />

          {/* Navigation links */}
          <ul className="relative flex items-center gap-1 px-1">
            {/* Animated background bubble */}
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  layoutId="nav-bubble"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute inset-y-1 z-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10"
                  style={{
                    left: `${LINKS.findIndex(l => l.id === active) * 100 + 4}px`,
                    width: "100px",
                  }}
                />
              )}
            </AnimatePresence>

            {LINKS.map((link, index) => {
              const isActive = active === link.id;
              const Icon = link.icon;
              
              return (
                <motion.li 
                  key={link.id} 
                  className="relative z-10"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    prefetch={false}
                    className={`relative group/link flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                      isActive 
                        ? "text-white" 
                        : "text-zinc-400 hover:text-white hover:scale-105"
                    }`}
                  >
                    <Icon 
                      className={`size-4 transition-all duration-300 ${
                        isActive ? "text-blue-400" : "text-zinc-500 group-hover/link:text-blue-400"
                      }`} 
                    />
                    {link.label}
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover/link:opacity-100 pointer-events-none"
                      initial={false}
                      animate={{ 
                        background: isActive 
                          ? "radial-gradient(circle, rgba(59, 130, 246, 0.1), transparent)" 
                          : "radial-gradient(circle, rgba(59, 130, 246, 0.05), transparent)"
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          {/* Animated divider */}
          <motion.div 
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mx-2 h-8 w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent" 
          />

          {/* Enhanced CTA button */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/?contact=open"
              prefetch={false}
              className="btn-primary shadow-brand-glow group/cta relative overflow-hidden"
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover/cta:opacity-100"
                initial={false}
                animate={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              
              <span className="relative flex items-center gap-2">
                Start your project 
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <ArrowRight className="size-4" />
                </motion.div>
              </span>

              {/* Sparkle effects */}
              <motion.div
                className="absolute -top-1 -right-1 size-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover/cta:opacity-100"
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              />
              <motion.div
                className="absolute -bottom-1 -left-1 size-1.5 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-0 group-hover/cta:opacity-100"
                animate={{
                  scale: [0, 1, 0],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: 0.8,
                }}
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating particles effect */}
        {/* <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute size-1 bg-blue-400 rounded-full opacity-20"
              initial={{
                x: Math.random() * 300,
                y: Math.random() * 60,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div> */}
      </motion.nav>
    </div>
  );
}