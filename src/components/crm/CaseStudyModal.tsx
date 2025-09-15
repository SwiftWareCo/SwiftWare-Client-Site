"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, TrendingUp, Smartphone, Users, Star, ArrowRight } from "lucide-react";

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick?: () => void;
}

export default function CaseStudyModal({ isOpen, onClose, onContactClick }: CaseStudyModalProps) {
  const achievements = [
    {
      icon: TrendingUp,
      metric: "2x Revenue Growth",
      description: "Doubled their annual revenue through improved operational efficiency"
    },
    {
      icon: Smartphone,
      metric: "Mobile Service App",
      description: "Custom mobile app for field technicians with offline capabilities"
    },
    {
      icon: Users,
      metric: "Client Portal",
      description: "Self-service portal for clients to schedule, track, and pay for services"
    },
    {
      icon: Star,
      metric: "95% Client Satisfaction",
      description: "Increased client satisfaction through better communication and transparency"
    }
  ];

  const challenges = [
    "Manual scheduling and dispatching",
    "No real-time job tracking",
    "Paper-based invoicing and payment collection",
    "Limited client communication",
    "Inefficient field technician management"
  ];

  const solutions = [
    "Automated scheduling and dispatch system",
    "Real-time job tracking and updates",
    "Digital invoicing with automated payment processing",
    "Client portal for self-service booking and tracking",
    "Mobile app for field technicians with GPS tracking"
  ];

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isOpen && (
        <motion.div
          key="case-study-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Vancouver Hood Doctors Case Study"
          className="fixed inset-0 z-50 grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.button
            aria-hidden
            className="fixed inset-0 bg-black/70"
            onClick={onClose}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ backdropFilter: "blur(12px)" }}
          />

          {/* Main modal */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1,
            }}
            className="relative w-[min(1000px,95vw)] max-h-[90vh] overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-950/95 backdrop-blur-xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]"
          >
            {/* Top accent */}
            <motion.div
              className="h-1 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            {/* Header */}
            <motion.header
              className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/40"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                  Vancouver Hood Doctors
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Commercial Kitchen Exhaust & Ventilation Services
                </p>
              </div>
              <motion.button
                onClick={onClose}
                className="group relative cursor-pointer p-2 rounded-lg border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700/50 transition-all duration-200"
                aria-label="Close case study"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="size-5 text-zinc-400 group-hover:text-white transition-colors" />
              </motion.button>
            </motion.header>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Left Column - Company Overview */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-white mb-4">About Vancouver Hood Doctors</h3>
                  <p className="text-zinc-300 mb-6 leading-relaxed">
                    Vancouver Hood Doctors is a leading provider of commercial kitchen exhaust cleaning,
                    maintenance, and repair services in the Greater Vancouver area. They serve restaurants,
                    hotels, and commercial kitchens with critical ventilation system maintenance.
                  </p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">The Challenge</h4>
                    <ul className="space-y-2 text-zinc-400">
                      {challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Right Column - Achievements */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-white mb-4">Our Solution</h3>
                  <p className="text-zinc-300 mb-6 leading-relaxed">
                    We built a comprehensive CRM system with mobile app and client portal that transformed
                    their operations and doubled their revenue within 12 months.
                  </p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Key Features Implemented</h4>
                    <ul className="space-y-2 text-zinc-400">
                      {solutions.map((solution, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Achievements Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-8"
              >
                <h3 className="text-xl font-bold text-white mb-6 text-center">Results & Impact</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {achievements.map((achievement, index) => {
                    const IconComponent = achievement.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                        className="p-6 rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-blue-500/5 via-purple-500/3 to-zinc-900/40 backdrop-blur-sm"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center mb-4">
                          <IconComponent className="w-6 h-6 text-blue-300" />
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-2">{achievement.metric}</h4>
                        <p className="text-sm text-zinc-400">{achievement.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="mt-8 p-6 rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-green-500/5 to-blue-500/5 backdrop-blur-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-full flex items-center justify-center">
                    <span className="text-green-300 font-bold text-lg">JD</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-zinc-300 italic mb-3">
                      &quot;The CRM system transformed our business. We&apos;ve doubled our revenue, our clients are happier,
                      and our technicians are more efficient than ever. The mobile app and client portal have been
                      game-changers for our operations.&quot;
                    </p>
                    <div className="text-sm text-zinc-400">
                      <strong className="text-white">Adam</strong> - Operations Manager, Vancouver Hood Doctors
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 }}
                className="mt-8 text-center"
              >
                <button
                  onClick={() => {
                    onClose();
                    onContactClick?.();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Get Similar Results
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute size-1 bg-blue-400/30 rounded-full"
                  initial={{
                    x: Math.random() * 1000,
                    y: Math.random() * 800,
                    opacity: 0,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
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
