'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, type Variants } from 'motion/react';
import { AlertCircle } from 'lucide-react';
import BlockFallAnimation from './BlockFallAnimation';
import { getColorsFromPath } from '@/lib/colors';

const easingCurve: [number, number, number, number] = [0.16, 1, 0.3, 1];

function useIsMobile(maxWidth = 1024) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${maxWidth - 1}px)`);

    const updateMatches = (matches: boolean) => {
      setIsMobile(matches);
    };

    updateMatches(query.matches);

    function handleChange(event: MediaQueryListEvent) {
      updateMatches(event.matches);
    }

    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', handleChange);
      return () => query.removeEventListener('change', handleChange);
    }

    query.addListener(handleChange);
    return () => query.removeListener(handleChange);
  }, [maxWidth]);

  return isMobile;
}

export function ServicesGrid() {
  const pathname = usePathname();
  const colors = getColorsFromPath(pathname);

  const painPoints = [
    {
      icon: AlertCircle,
      title: 'Wasted Time',
      description:
        "You're stuck playing project manager, trying to get your designer and your ad guy on the same page.",
    },
    {
      icon: AlertCircle,
      title: 'Lost Leads',
      description:
        'Your website form  doesn\'t "talk" to your marketing campaign , so leads go cold before you even see them.',
    },
    {
      icon: AlertCircle,
      title: 'Broken Brand',
      description:
        'Your brand looks great on the website but is totally different in your email blasts, confusing customers.',
    },
    {
      icon: AlertCircle,
      title: 'Wasted Money',
      description:
        "You're paying four different teams who are all blaming each other when things don't work.",
    },
  ];

  const isMobile = useIsMobile();

  const sectionVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: 24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6, // Controls how quickly the entire section fades upward
          ease: easingCurve, // Keeps easing consistent with desktop animations
          staggerChildren: 0.08, // Offsets child animations to avoid simultaneous motion
        },
      },
    }),
    []
  );

  const leftColumnVariants = useMemo<Variants>(
    () => ({
      hidden: isMobile ? { opacity: 0, y: 16 } : { opacity: 0 },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.6, // Matches the section reveal speed for cohesion
          ease: easingCurve, // Smooths the entrance without overshooting
        },
      },
    }),
    [isMobile]
  );

  const headingVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: 16 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: easingCurve,
        },
      },
    }),
    []
  );

  const rightColumnVariants = useMemo<Variants>(
    () => ({
      hidden: isMobile ? { opacity: 0, y: 16 } : { opacity: 0 },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.6, // Keeps timing aligned with left column reveal
          ease: easingCurve, // Provides a gentle entrance for the text column
        },
      },
    }),
    [isMobile]
  );

  const painPointListVariants = useMemo<Variants>(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: isMobile ? 0.08 : 0.12, // Tunes the cascade so mobile reveals stay brisk
          delayChildren: isMobile ? 0.06 : 0.1, // Slightly trims the initial pause on mobile to avoid sluggish starts
        },
      },
    }),
    [isMobile]
  );

  const painPointItemVariants = useMemo<Variants>(
    () => ({
      hidden: isMobile ? { opacity: 0, y: 12 } : { opacity: 0, x: 16 },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.45, // Keeps each bullet snappy for readability
          ease: easingCurve, // Maintains the same easing profile across motions
        },
      },
    }),
    [isMobile]
  );

  return (
    <>
      <section className='relative py-16 bg-secondary sm:py-24'>
        <div className='mx-auto max-w-7xl px-6'>
          {/* THE OLD WAY SECTION */}
          <motion.div
            variants={sectionVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            className='mb-8'
          >
            {/* HEADING - CENTERED SECTION TITLE */}
            <motion.h2
              variants={headingVariants}
              className='text-3xl sm:text-4xl lg:text-5xl font-bold text-destructive-bright mb-8 lg:mb-12 text-center'
            >
              Wearing too many hats
            </motion.h2>

            {/* 2-COLUMN LAYOUT - VISUAL LEFT, PAIN POINTS RIGHT */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start'>
              {/* LEFT: OVERWHELM ANIMATION IN CARD */}
              <motion.div
                variants={leftColumnVariants}
                className='relative h-full min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] rounded-xl border border-border bg-card/80 p-8 overflow-hidden backdrop-blur-sm'
              >
                <BlockFallAnimation />
              </motion.div>

              {/* RIGHT: INTRO PARAGRAPH + PAIN POINTS */}
              <motion.div variants={rightColumnVariants} className='space-y-6'>
                {/* Introductory Paragraph */}
                <p className='text-base sm:text-lg text-muted-foreground leading-relaxed'>
                  As a business owner, you&apos;re <span className='font-bold text-foreground'>stretched thin</span>—managing
                  your brand, marketing, technology, and operations. When each
                  service is <span className='font-bold text-foreground'>disconnected</span>, you become the <span className='font-bold text-foreground'>bottleneck</span>:
                </p>

                {/* PAIN POINTS */}
                <motion.div
                  variants={painPointListVariants}
                  className='space-y-3'
                >
                  {painPoints.map((point, index) => {
                    const Icon = point.icon;
                    return (
                      <motion.div
                        key={point.title}
                        variants={painPointItemVariants}
                        className='flex gap-4 p-4 rounded-lg bg-card/50 border border-border/50 hover:border-border transition-colors'
                      >
                        <motion.div
                          animate={{
                            scale: isMobile ? [1, 1.04, 1] : [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: 'loop',
                            delay: index * (isMobile ? 0.08 : 0.2),
                            ease: 'easeInOut',
                          }}
                          className='flex-shrink-0 mt-0.5'
                        >
                          <Icon className='w-5 h-5 text-destructive-bright' />
                        </motion.div>
                        <div className='flex-1 min-w-0'>
                          <h3 className='font-semibold text-foreground mb-1.5 text-base'>
                            {point.title}
                          </h3>
                          <p className='text-sm sm:text-base text-muted-foreground leading-relaxed'>
                            {point.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* FINAL MESSAGE BOX - FULL WIDTH */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
            className='rounded-xl border p-6 sm:p-8 mb-24'
            style={{
              borderColor: 'var(--border)',
              backgroundColor: 'var(--secondary)',
            }}
          >
            <h3 className='text-xl sm:text-2xl font-bold text-foreground mb-4'>
              Stop paying for friction.{' '}
              <span
                className='text-transparent bg-clip-text'
                style={{
                  backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                }}
              >
                Start investing in flow.
              </span>
            </h3>
            <p className='text-foreground/80 text-sm sm:text-base leading-relaxed mb-4'>
              When your brand, marketing, and technology all speak the same
              language, you don&apos;t just look more professional. You become
              more efficient. You close more deals. You build a scalable asset,
              not just a collection of parts.
            </p>
            <p
              className='text-lg font-semibold'
              style={{ color: colors.primary }}
            >
              That is the SwiftWare difference.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
