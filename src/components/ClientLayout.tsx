"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import SplashScreen from "./SplashScreen";

// Dynamically import the enhanced NavBar
const EnhancedNavBar = dynamic(() => import("./NavBar"), {
  ssr: false,
});

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Preload the enhanced components in the background
    const preloadComponents = async () => {
      // Import the enhanced NavBar to preload it
      await import("./NavBar");
      setIsLoaded(true);
    };

    preloadComponents();
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      <SplashScreen onComplete={handleSplashComplete} />
      
      {/* Main content - only show after splash */}
      {!showSplash && (
        <div className="min-h-screen">
          {/* Enhanced navigation - only render after preloading */}
          {isLoaded && <EnhancedNavBar />}
          
          {/* Fallback navigation during loading */}
          {!isLoaded && (
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
          )}
          
          {/* Page content */}
          {children}
        </div>
      )}
    </>
  );
}
