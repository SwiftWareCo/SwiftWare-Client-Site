'use client';

import { motion } from 'motion/react';
import { useState, useRef } from 'react';

const BLOCKS = [
  'Expansion & Growth',
  'Payroll',
  'Social Media',
  'SEO & Content',
  'Email Management',
  'Brand Design',
  'Website Updates',
  'Customer Support',
  'Analytics Tracking',
  'Staff Training',
];

export default function BlockFallAnimation() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate landing positions for left and right piles
  const getLandingPosition = (index: number) => {
    const isLeftPile = index < 5;
    const positionInPile = index % 5;

    return {
      x: isLeftPile ? -110 : 110,
      y: positionInPile * 35,
      rotation: Math.random() * 8 - 4, // Random rotation between -4 to 4 degrees
    };
  };

  const handleAnimationStart = () => {
    if (!hasAnimated) {
      setHasAnimated(true);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-[500px] bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 rounded-xl border border-zinc-700/50 overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      onAnimationStart={handleAnimationStart}
    >
      {/* Central Bobbing Head */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 shadow-lg flex items-center justify-center z-10"
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Simple emoji-like face */}
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Eyes */}
          <div className="flex gap-6 mb-2">
            <div className="w-3 h-4 bg-black rounded-full" />
            <div className="w-3 h-4 bg-black rounded-full" />
          </div>
          {/* Smile */}
          <motion.div
            className="w-8 h-4 border-4 border-black rounded-b-full"
            style={{ borderTop: 'none' }}
          />
        </div>
      </motion.div>

      {/* Falling Blocks */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {BLOCKS.map((task, index) => {
          const landing = getLandingPosition(index);

          return (
            <motion.div
              key={index}
              className="absolute w-24 h-16 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg shadow-lg flex items-center justify-center p-2 cursor-pointer hover:shadow-xl transition-shadow"
              initial={{
                y: -500,
                x: 0,
                opacity: 0,
                rotate: 0,
              }}
              whileInView={{
                y: landing.y,
                x: landing.x,
                opacity: 1,
                rotate: landing.rotation,
              }}
              transition={{
                delay: index * 0.15, // 150ms stagger between blocks
                duration: 0.8,
                type: 'spring',
                stiffness: 180,
                damping: 15,
                mass: 1,
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-xs font-bold text-white text-center leading-tight">
                {task}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
