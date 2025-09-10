"use client";
import UnifiedHeader from "./UnifiedHeader";
import Footer from "./Footer";
import { motion } from "motion/react";
import { FocusProvider } from "@/context/FocusContext";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getSavedFocus } from "@/lib/useFocus";

const SplashScreen = dynamic(() => import("./SplashScreen"), { ssr: false });

interface ClientAppProps {
  children: React.ReactNode;
}

export default function ClientApp({ children }: ClientAppProps) {
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    const saved = getSavedFocus();
    if (saved) setSplashDone(true);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
        className="min-h-screen"
      >
        <FocusProvider>
          {!splashDone && (
            <SplashScreen requireChoice onDone={() => setSplashDone(true)} />
          )}
          {splashDone && (
            <>
              <UnifiedHeader />
              {children}
              <Footer />
            </>
          )}
        </FocusProvider>
      </motion.div>
    </>
  );
}
