// components/ContactDialog.tsx
"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function ContactDialog() {
  const router = useRouter();
  const params = useSearchParams();
  const open = params.get("contact") === "open";

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  const focusables = useMemo(() => {
    if (!open || !dialogRef.current) return [] as HTMLElement[];
    const sel = [
      "a[href]","button:not([disabled])","textarea","input","select",
      "[tabindex]:not([tabindex='-1'])",
    ].join(",");
    return Array.from(dialogRef.current.querySelectorAll<HTMLElement>(sel));
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstFieldRef.current?.focus(), 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.replace("/", { scroll: false });
      if (e.key === "Tab" && focusables.length) {
        const first = focusables[0], last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; clearTimeout(t); };
  }, [open, router, focusables]);

  if (!open) return null;

  const close = () => router.replace("/", { scroll: false });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      (e.target as HTMLFormElement).reset();
      close();
      alert("Thanks! We'll be in touch shortly.");
    } else {
      alert("Something went wrong. Please email hello@swiftware.dev");
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Contact Swiftware"
      className="fixed inset-0 z-50 grid place-items-center p-4"
      ref={dialogRef}
    >
      {/* Backdrop with soft blur */}
      <button aria-hidden className="fixed inset-0 bg-black/60 backdrop-blur-[2px]" onClick={close} />

      {/* Brand ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 360px at 50% 10%, color-mix(in oklab, rgb(var(--brand)) 22%, transparent), transparent 60%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.985 }}
        transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative w-[min(760px,92vw)] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)]"
      >
        {/* Brand top accent */}
        <div
          aria-hidden
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, rgb(var(--brand)) 85%, black), transparent)",
          }}
        />

        <header className="flex items-center justify-between px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-zinc-100">Tell us about your project</h2>
            <p className="mt-0.5 text-xs text-zinc-500">We usually respond in under 4 hours.</p>
          </div>
          <button onClick={close} className="btn-ghost px-4 py-1 text-sm" aria-label="Close contact form">
            Close
          </button>
        </header>

        <form onSubmit={onSubmit} className="grid gap-4 p-5">
          <Field label="Name"><input ref={firstFieldRef} required name="name" className="input" placeholder="Your name" /></Field>
          <Field label="Email"><input required type="email" name="email" className="input" placeholder="you@company.com" /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Company"><input name="company" className="input" placeholder="Org name" /></Field>
            <Field label="Project type">
              <select name="type" className="input">
                <option>Custom CRM</option>
                <option>Member/Tee Management</option>
                <option>AI/ML (RAG)</option>
                <option>Mobile App</option>
                <option>Other</option>
              </select>
            </Field>
          </div>
          <Field label="Timeline"><input name="timeline" className="input" placeholder="e.g., 6–8 weeks" /></Field>
          <Field label="Message"><textarea required name="message" rows={5} className="input resize-none" placeholder="What are we building?" /></Field>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <button className="btn-primary shadow-brand-glow">Send message</button>
            <a href="tel:+16045551234" className="btn-ghost">Or call us</a>
          </div>

          <p className="text-xs text-zinc-500">By submitting, you agree to our privacy policy.</p>
        </form>
      </motion.div>
    </div>
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
