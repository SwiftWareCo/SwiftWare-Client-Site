"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Instagram, Linkedin } from "lucide-react";
import { openCalendlyPopup } from "@/lib/calendly";

export function DentistFooter() {
    return (
        <footer className="relative bg-gradient-to-b from-sky-300 via-teal-100 to-sky-300">
            {/* Gradient separator */}
            <div className="mx-auto max-w-7xl px-6">
                <div className="relative h-px w-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-500/20 to-transparent blur-sm" />
                </div>
            </div>

            {/* Footer content */}
            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="py-8 md:py-16"
                >
                    <div className="grid gap-8 md:gap-12 md:grid-cols-1 lg:grid-cols-2">
                        {/* Brand section */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="relative">
                                    <div
                                        className="size-8 md:size-10 rounded-xl shadow-lg flex items-center justify-center p-1 md:p-1.5"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(135deg, #0ea5e9, #14b8a6)",
                                            boxShadow:
                                                "0 4px 14px rgba(14, 165, 233, 0.3)",
                                        }}
                                    >
                                        <Image
                                            src="/images/swiftware-logo-small-transparent.webp"
                                            alt="SwiftWare Dental Marketing logo"
                                            width={32}
                                            height={32}
                                            className="w-6 h-6 md:w-8 md:h-8 mix-blend-screen"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent">
                                        SwiftWare
                                    </h3>
                                    <div className="text-xs font-medium text-sky-500">
                                        Dental Marketing
                                    </div>
                                </div>
                            </div>
                            <p className="max-w-md leading-relaxed text-slate-600">
                                We help dental practices grow with automated
                                marketing systems that bring patients to your
                                door while you focus on what matters—providing
                                exceptional care.
                            </p>
                        </div>

                        {/* Contact info */}
                        <div>
                            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-slate-900">
                                Contact
                            </h4>
                            <div className="space-y-3 text-slate-600">
                                <p className="hover:text-sky-600 transition-colors cursor-pointer">
                                    support@swiftware.ca
                                </p>
                                <p className="text-sm">Richmond, BC, Canada</p>
                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                    <Link
                                        href="https://www.instagram.com/swiftwareco/"
                                        className="group inline-flex items-center gap-2 transition-colors hover:text-sky-600"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-100"
                                            aria-hidden="true"
                                        >
                                            <Instagram className="h-4 w-4" />
                                        </span>
                                        Instagram
                                    </Link>
                                    <Link
                                        href="https://www.linkedin.com/company/swiftwareco"
                                        className="group inline-flex items-center gap-2 transition-colors hover:text-sky-600"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-100"
                                            aria-hidden="true"
                                        >
                                            <Linkedin className="h-4 w-4" />
                                        </span>
                                        LinkedIn
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-slate-200">
                        <div className="flex flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
                            <p>
                                © {new Date().getFullYear()} SwiftWare. All
                                rights reserved.
                            </p>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                                <div className="flex items-center gap-6">
                                    <Link
                                        href="/privacy"
                                        className="hover:text-sky-600 transition-colors"
                                    >
                                        Privacy
                                    </Link>
                                    <Link
                                        href="/terms"
                                        className="hover:text-sky-600 transition-colors"
                                    >
                                        Terms
                                    </Link>
                                </div>
                                <button
                                    onClick={() => openCalendlyPopup()}
                                    className="cursor-pointer rounded-xl px-4 py-2 text-xs text-center font-semibold text-white hover:shadow-lg"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(to right, #0ea5e9, #14b8a6)",
                                        boxShadow:
                                            "0 4px 14px rgba(14, 165, 233, 0.3)",
                                    }}
                                >
                                    Let&apos;s grow your practice
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
