"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="relative mt-32">
      {/* Gradient separator */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative h-px w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-sm" />
        </div>
      </div>

      {/* Footer content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl px-6 py-16"
      >
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="size-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-brand-glow flex items-center justify-center p-1.5">
                  <Image
                    src="/images/swiftware-logo.png"
                    alt="SwiftWare software development company logo"
                    width={32}
                    height={32}
                    className="mix-blend-screen"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                Swiftware
              </h3>
            </div>
            <p className="text-zinc-400 max-w-md leading-relaxed mb-6">
              Building tomorrow&apos;s software today. We craft bespoke solutions that scale with your vision and exceed your expectations.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-4">
              <a href="#" className="btn-ghost px-3 py-2 hover:text-blue-400 transition-colors">
                Twitter
              </a>
              <a href="#" className="btn-ghost px-3 py-2 hover:text-blue-400 transition-colors">
                LinkedIn
              </a>
              <a href="#" className="btn-ghost px-3 py-2 hover:text-blue-400 transition-colors">
                GitHub
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-300 mb-4 uppercase tracking-wider">Services</h4>
            <nav className="space-y-3">
              <Link href="/ClientWebsites#work" className="block text-zinc-400 hover:text-white transition-colors">
                Our Work
              </Link>
              <Link href="/ClientWebsites#process" className="block text-zinc-400 hover:text-white transition-colors">
                Process
              </Link>
              <Link href="/ClientWebsites?contact=open" className="block text-blue-400 hover:text-blue-300 transition-colors">
                Start Project
              </Link>
            </nav>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-300 mb-4 uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 text-zinc-400">
              <p className="hover:text-white transition-colors cursor-pointer">
                swiftwareco@gmail.com
              </p>
              <p className="hover:text-white transition-colors cursor-pointer">
                +1 (604) 862-5038
              </p>
              <p className="text-sm">
                Richmond, BC, Canada
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800/60">
          <div className="flex flex-col gap-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Swiftware. All rights reserved.</p>
            
            <div className="flex items-center gap-6">
              <Link href="/ClientWebsites/privacy" className="hover:text-zinc-300 transition-colors">
                Privacy
              </Link>
              <Link href="/ClientWebsites/terms" className="hover:text-zinc-300 transition-colors">
                Terms
              </Link>
              <Link href="/ClientWebsites?contact=open" className="btn-primary px-4 py-2 text-xs">
                Let&apos;s build something amazing
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer ambient glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 size-96 
                      bg-gradient-to-t from-blue-500/5 to-transparent rounded-full blur-3xl" />
      </div>
    </footer>
  );
}


