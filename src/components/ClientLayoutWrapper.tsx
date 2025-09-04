"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import ClientLayout with no SSR
const ClientLayout = dynamic(() => import("./ClientLayout"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen">
      {/* Fallback navigation during loading */}
      <div className="mx-auto flex w-full justify-center px-6">
        <nav
          className="relative z-30 mx-auto mt-3 flex items-center gap-1 rounded-2xl border border-zinc-800/90 bg-zinc-950/70 px-2 py-1 shadow-sm ring-1 ring-black/5 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60"
          style={{ maxWidth: 860 }}
          aria-label="Main"
        >
          <div className="relative">
            <Link
              href="/#work"
              className="relative block rounded-xl px-4 py-2 text-sm transition text-zinc-400 hover:text-zinc-200"
            >
              Work
            </Link>
          </div>
          <div className="relative">
            <Link
              href="/#process"
              className="relative block rounded-xl px-4 py-2 text-sm transition text-zinc-400 hover:text-zinc-200"
            >
              Process
            </Link>
          </div>
          <div className="ml-1">
            <Link
              href="/?contact=open"
              className="btn-primary shadow-brand-glow"
            >
              Start your project
            </Link>
          </div>
        </nav>
      </div>
      
      {/* Page content placeholder */}
      <div className="min-h-screen">
        {/* Content will be rendered here */}
      </div>
    </div>
  ),
});

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  return <ClientLayout>{children}</ClientLayout>;
}
