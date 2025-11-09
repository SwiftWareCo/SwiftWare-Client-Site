"use client";
import UnifiedHeader from "./UnifiedHeader";
import Footer from "./Footer";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { initCalendlyScripts } from "@/lib/calendly";

const SplashScreen = dynamic(() => import("./SplashScreen"), { ssr: false });

interface ClientAppProps {
  children: React.ReactNode;
}

export default function ClientApp({ children }: ClientAppProps) {
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    initCalendlyScripts();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
        className="min-h-screen"
      >
        {!splashDone && (
          <SplashScreen onDone={() => setSplashDone(true)} />
        )}
        {splashDone && (
          <>
            <UnifiedHeader />
            {children}
            <Footer />
          </>
        )}
      </motion.div>
    </>
  );
}
