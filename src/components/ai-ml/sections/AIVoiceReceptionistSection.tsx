'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { VoiceReceptionistSection } from '@/components/home/VoiceReceptionistSection';
import { getColorsRGBFromPath } from '@/lib/colors';

const withAlpha = (rgb: string, alpha: number) => `rgba(${rgb}, ${alpha})`;

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function AIVoiceReceptionistSection() {
  const pathname = usePathname();
  const colorsRGB = getColorsRGBFromPath(pathname);

  return (
    <div
      id='voice-receptionist'
      className='py-20'
      style={{
        background: `linear-gradient(180deg, transparent 0%, ${withAlpha(
          colorsRGB.primaryRGB,
          0.08
        )} 45%, transparent 100%)`,
      }}
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6'>
        <div className='mb-16 text-center'>
          <motion.h2
            variants={sectionVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            className='mb-6 text-4xl font-bold text-transparent'
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(255,255,255,1) 0%, ${withAlpha(
                colorsRGB.primaryRGB,
                0.75
              )} 50%, ${withAlpha(colorsRGB.secondaryRGB, 0.6)} 100%)`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            Experience Our AI Receptionist
          </motion.h2>
          <motion.p
            variants={sectionVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='mx-auto max-w-3xl text-xl text-muted-foreground'
          >
            Interact with one of our AI models trained on SwiftWare&apos;s
            knowledge base. Ask questions and hear instant, natural responses.
          </motion.p>
        </div>

        {/* Voice Receptionist Content */}
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ delay: 0.2 }}
          className='overflow-hidden rounded-2xl'
          style={{
            border: `1px solid ${withAlpha(colorsRGB.primaryRGB, 0.18)}`,
            background: `linear-gradient(135deg, rgba(255,255,255,0.04), ${withAlpha(
              colorsRGB.primaryRGB,
              0.08
            )})`,
          }}
        >
          <VoiceReceptionistSection />
        </motion.div>
      </div>
    </div>
  );
}

