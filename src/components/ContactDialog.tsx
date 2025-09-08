"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Phone, Mail, MapPin, Sparkles } from "lucide-react";

export default function ContactDialog() {
  const router = useRouter();
  const params = useSearchParams();
  const open = params.get("contact") === "open";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  const focusables = useMemo(() => {
    if (!open || !dialogRef.current) return [] as HTMLElement[];
    const sel = [
      "a[href]",
      "button:not([disabled])",
      "textarea",
      "input",
      "select",
      "[tabindex]:not([tabindex='-1'])",
    ].join(",");
    return Array.from(dialogRef.current.querySelectorAll<HTMLElement>(sel));
  }, [open]);

  // Only run focus/lock logic when open
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstFieldRef.current?.focus(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.replace("/", { scroll: false });
      if (e.key === "Tab" && focusables.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [open, router, focusables]);

  const close = () => router.replace("/", { scroll: false });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = Object.fromEntries(new FormData(e.currentTarget).entries());
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitSuccess(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => {
          setSubmitSuccess(false);
          close();
        }, 2000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      alert("Something went wrong. Please email swiftwareco@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    // Keep mounted always; only toggle the child so exit can run
    <AnimatePresence mode="wait" initial={false}>
      {open && (
        <motion.div
          key="contact-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Contact Swiftware"
          className="fixed inset-0 z-50 grid place-items-center p-4"
          ref={dialogRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.button
            aria-hidden
            className="fixed inset-0 bg-black/70"
            onClick={close}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ backdropFilter: "blur(12px)" }}
          />

          {/* Ambient brand glow */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(600px 400px at 50% 30%, rgba(59,130,246,0.15), rgba(168,85,247,0.1), transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          />

          {/* Main dialog */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1,
            }}
            className="relative w-[min(900px,95vw)] overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-950/95 backdrop-blur-xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]"
          >
            {/* Top accent */}
            <motion.div
              className="h-1 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            {/* Success overlay */}
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-950/95 backdrop-blur-sm"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="mx-auto mb-4 size-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"
                    >
                      <Sparkles className="size-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-zinc-400">We&apos;ll be in touch within 4 hours.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <motion.header
              className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/40"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                  Let&apos;s Build Something Amazing
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Tell us about your project and we&apos;ll get back to you
                  quickly.
                </p>
              </div>
              <motion.button
                onClick={close}
                className="group relative p-2 rounded-lg border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700/50 transition-all duration-200"
                aria-label="Close contact form"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="size-5 text-zinc-400 group-hover:text-white transition-colors" />
              </motion.button>
            </motion.header>

            {/* Content */}
            <div className="p-6">
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Contact info */}
                <motion.div
                  className="lg:col-span-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Get in Touch
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Mail className="size-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-400">Email</p>
                        <p className="text-white">swiftwareco@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                        <Phone className="size-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-400">Phone</p>
                        <p className="text-white">+1 (604) 862-5038</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                        <MapPin className="size-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-400">Location</p>
                        <p className="text-white">Richmond, BC, Canada</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Form */}
                <motion.form
                  onSubmit={onSubmit}
                  className="lg:col-span-2 space-y-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name *">
                      <input
                        ref={firstFieldRef}
                        required
                        name="name"
                        className="input"
                        placeholder="Your name"
                        disabled={isSubmitting}
                      />
                    </Field>
                    <Field label="Email *">
                      <input
                        required
                        type="email"
                        name="email"
                        className="input"
                        placeholder="you@company.com"
                        disabled={isSubmitting}
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Company">
                      <input
                        name="company"
                        className="input"
                        placeholder="Company name"
                        disabled={isSubmitting}
                      />
                    </Field>
                    <Field label="Project type">
                      <select name="type" className="input" disabled={isSubmitting}>
                        <option>Custom CRM</option>
                        <option>Team Management</option>
                        <option>AI/ML (RAG)</option>
                        <option>Mobile App</option>
                        <option>E-commerce</option>
                        <option>Other</option>
                      </select>
                    </Field>
                  </div>

                  <Field label="Timeline">
                    <input
                      name="timeline"
                      className="input"
                      placeholder="e.g., 6–8 weeks"
                      disabled={isSubmitting}
                    />
                  </Field>

                  <Field label="Project Details *">
                    <textarea
                      required
                      name="message"
                      rows={4}
                      className="input resize-none"
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                      disabled={isSubmitting}
                    />
                  </Field>

                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <motion.button
                      type="submit"
                      className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Sheen */}
                      <motion.div
                        aria-hidden
                        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-purple-600/0 via-purple-600/30 to-blue-500/0 opacity-0 group-hover:opacity-100"
                        initial={false}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />

                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="size-4 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="size-4" />
                            Send Message
                          </>
                        )}
                      </span>
                    </motion.button>

                    <a
                      href="tel:+16048625038"
                      className="flex items-center gap-2 px-4 py-3 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Phone className="size-4" />
                      Or call us directly
                    </a>
                  </div>

                  <p className="text-xs text-zinc-500">
                    By submitting this form, you agree to our privacy policy and
                    terms of service.
                  </p>
                </motion.form>
              </div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute size-1 bg-blue-400/30 rounded-full"
                  initial={{
                    x: Math.random() * 800,
                    y: Math.random() * 600,
                    opacity: 0,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1">
      <span className="text-xs text-zinc-400">{label}</span>
      {children}
    </label>
  );
}
