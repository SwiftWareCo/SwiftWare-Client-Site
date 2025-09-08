"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import UnifiedHeader from "./UnifiedHeader";
import Footer from "./Footer";
import { motion } from "motion/react";

// Client-only to avoid SSR random/hydration issues
const SplashScreen = dynamic(() => import("./SplashScreen"), { ssr: false });

interface ClientAppProps {
  children: React.ReactNode;
}

export default function ClientApp({ children }: ClientAppProps) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 3000);


    return () => clearTimeout(splashTimer);
  }, []);

  return (
    <>
      <SplashScreen />

      {!showSplash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="min-h-screen"
        >
          <UnifiedHeader />
          {children}
          <Footer />
        </motion.div>
      )}
    </>
  );
}
