'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useColorScheme } from '@/context/ColorSchemeContext';
import {
  siFacebook,
  siInstagram,
  siYoutube,
  siPinterest,
  siGooglemaps,
} from 'simple-icons';

interface LogoItem {
  id: string;
  imagePath?: string;
  simpleIcon?: typeof siFacebook;
  icon?: React.ReactNode;
  scatterTop: number;
  scatterLeft: number;
  platformName?: string;
  stat?: string;
  parentLogoId?: string;
}

const logoItems: LogoItem[] = [
  // Company logos
  {
    id: 'vhd-logo',
    imagePath: '/images/vhdlogo.webp',
    scatterTop: 40, // Adjusted up
    scatterLeft: 18, // Adjusted left
  },
  {
    id: 'beacon-logo',
    imagePath: '/images/beacon-logo.webp',
    scatterTop: 25,
    scatterLeft: 80,
  },
  {
    id: 'cjs-logo',
    imagePath: '/images/cjslogo.png',
    scatterTop: 75,
    scatterLeft: 70,
  },
  // VHD social media icons (adjusted positions to match logo movement)
  {
    id: 'vhd-instagram',
    simpleIcon: siInstagram,
    scatterTop: 75, // Adjusted down from 88
    scatterLeft: 8, // Adjusted left from 16
    platformName: 'Instagram',
    stat: '15K+ followers',
    parentLogoId: 'vhd-logo',
  },
  {
    id: 'vhd-youtube',
    simpleIcon: siYoutube,
    scatterTop: 20, // Adjusted up from 25
    scatterLeft: 8, // Adjusted left from 18
    platformName: 'YouTube',
    stat: '100+ educational videos',
    parentLogoId: 'vhd-logo',
  },
  {
    id: 'vhd-googlemaps',
    simpleIcon: siGooglemaps,
    scatterTop: 48, // Adjusted down from 65
    scatterLeft: 3, // Adjusted left from 10
    platformName: 'Google Business',
    stat: '4.9/5 rating',
    parentLogoId: 'vhd-logo',
  },
  // Beacon social media icons
  {
    id: 'beacon-facebook',
    simpleIcon: siFacebook,
    scatterTop: 12,
    scatterLeft: 90,
    platformName: 'Facebook',
    stat: '8K+ followers',
    parentLogoId: 'beacon-logo',
  },
  {
    id: 'beacon-googlemaps',
    simpleIcon: siGooglemaps,
    scatterTop: 30,
    scatterLeft: 92,
    platformName: 'Google Business',
    stat: '4.8/5 rating',
    parentLogoId: 'beacon-logo',
  },
  // CJS social media icons
  {
    id: 'cjs-pinterest',
    simpleIcon: siPinterest,
    scatterTop: 62,
    scatterLeft: 82,
    platformName: 'Pinterest',
    stat: '25K+ followers',
    parentLogoId: 'cjs-logo',
  },
  {
    id: 'cjs-instagram',
    simpleIcon: siInstagram,
    scatterTop: 85,
    scatterLeft: 58,
    platformName: 'Instagram',
    stat: '12K+ followers',
    parentLogoId: 'cjs-logo',
  },
  {
    id: 'cjs-youtube',
    simpleIcon: siYoutube,
    scatterTop: 88,
    scatterLeft: 82,
    platformName: 'YouTube',
    stat: '50+ design videos',
    parentLogoId: 'cjs-logo',
  },
];

const stats = [
  {
    id: 'growth-stat',
    text: 'Average 150% revenue growth for clients',
  },
  {
    id: 'automation-stat',
    text: '2,000+ processes automated & streamlined',
  },
  {
    id: 'scaling-stat',
    text: 'Scaled client revenue from $10k to $30k per month',
  },
];

interface SocialMediaIconProps {
  item: LogoItem;
}

function SocialMediaIconWithTooltip({ item }: SocialMediaIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      const tooltipWidth = 160;
      const tooltipHeight = 48;
      const gap = 16;

      let top = rect.top - tooltipHeight - gap;
      let left = rect.left + rect.width / 2 - tooltipWidth / 2;

      left = Math.max(
        10,
        Math.min(window.innerWidth - tooltipWidth - 10, left)
      );
      if (top < 0) {
        top = rect.bottom + gap;
      }

      setTooltipPosition({ top, left });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTooltipPosition(null);
  };

  return (
    <>
      <motion.div
        ref={iconRef}
        className='flex items-center justify-center cursor-pointer group'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.15 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div
          className='flex items-center justify-center w-16 h-16 rounded-lg border transition-colors'
          dangerouslySetInnerHTML={{
            __html: item.simpleIcon!.svg.replace(
              '<svg',
              `<svg width="32" height="32" fill="currentColor"`
            ),
          }}
          style={{
            backgroundColor: 'var(--gray-a3)',
            borderColor: 'var(--gray-a6)',
            color: `${item.id.includes('vhd') ? '#0891B2' : item.id.includes('beacon') ? '#7C3AED' : '#3B82F6'}`,
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gray-a8)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--gray-a6)'}
        />
      </motion.div>

      {isHovered &&
        tooltipPosition &&
        createPortal(
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -5 }}
            transition={{ duration: 0.15 }}
            className='fixed px-3 py-2 backdrop-blur-sm rounded-md shadow-lg pointer-events-none z-50 border'
            style={{
              top: tooltipPosition.top,
              left: tooltipPosition.left,
              transform: 'translateX(-50%)',
              width: 'auto',
              whiteSpace: 'nowrap',
              borderColor: 'var(--gray-a6)',
              backgroundColor: 'var(--color-panel-solid)',
            }}
          >
            <p className='text-xs font-semibold' style={{ color: 'var(--gray-12)' }}>
              {item.platformName}
            </p>
            {item.stat && (
              <p className='text-xs font-medium' style={{ color: 'var(--gray-11)' }}>{item.stat}</p>
            )}
          </motion.div>,
          document.body
        )}
    </>
  );
}

interface LogoBoxProps {
  item: LogoItem;
  index: number;
}

function LogoBox({ item, index }: LogoBoxProps) {
  const isSocialMediaIcon = !!item.platformName;
  const boxRef = useRef<HTMLDivElement>(null);

  // Floating animation constraints
  const maxFloatDistanceY = 24;
  const maxFloatDistanceX = 32;
  const safeFloatY = Math.min(
    maxFloatDistanceY,
    Math.min(item.scatterTop, 100 - item.scatterTop) * 0.25
  );
  const safeFloatX = Math.min(
    maxFloatDistanceX,
    Math.min(item.scatterLeft, 100 - item.scatterLeft) * 0.4
  );

  const floatY = Math.cos(item.scatterTop) * safeFloatY;
  const floatX = Math.sin(item.scatterLeft) * safeFloatX;

  // Stagger delay for scatter animation
  const scatterDelay = isSocialMediaIcon ? index * 0.08 : Math.floor(index / 3) * 0.15;

  if (isSocialMediaIcon) {
    return (
      <motion.div
        ref={boxRef}
        className='absolute'
        initial={{
          left: '50%',
          top: '50%',
          opacity: 0,
        }}
        whileInView={{
          left: `${item.scatterLeft}%`,
          top: `${item.scatterTop}%`,
          opacity: 1,
        }}
        animate={{
          y: [0, floatY, 0],
          x: [0, floatX, 0],
        }}
        transition={{
          default: { duration: 0.8, ease: 'easeOut', delay: scatterDelay },
          y: {
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          x: {
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        viewport={{ once: true }}
        style={{
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <SocialMediaIconWithTooltip item={item} />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={boxRef}
      className='absolute'
      initial={{
        left: '50%',
        top: '50%',
        opacity: 0,
      }}
      whileInView={{
        left: `${item.scatterLeft}%`,
        top: `${item.scatterTop}%`,
        opacity: 1,
      }}
      animate={{
        y: [0, floatY, 0],
        x: [0, floatX, 0],
      }}
      transition={{
        default: { duration: 0.8, ease: 'easeOut', delay: scatterDelay },
        y: {
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        x: {
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      viewport={{ once: true }}
      style={{
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <div
        className='relative shrink-0 rounded-2xl overflow-hidden shadow-lg w-28 h-28 flex items-center justify-center border'
        style={{
          borderColor: 'var(--gray-a6)',
          backgroundColor: 'var(--gray-a3)',
        }}
      >
        {item.imagePath && (
          <Image
            src={item.imagePath}
            alt={item.id}
            fill
            className='object-contain'
            sizes='112px'
            unoptimized
          />
        )}
      </div>
    </motion.div>
  );
}

export function ScrollTriggeredImpactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { colors } = useColorScheme();
  const companyLogos = logoItems.filter((item) => !item.platformName);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  // Stats reveal - each stat appears at different scroll point
  const stat1Opacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const stat1Y = useTransform(scrollYProgress, [0.35, 0.5], [50, 0]);

  const stat2Opacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
  const stat2Y = useTransform(scrollYProgress, [0.5, 0.65], [50, 0]);

  const stat3Opacity = useTransform(scrollYProgress, [0.65, 0.8], [0, 1]);
  const stat3Y = useTransform(scrollYProgress, [0.65, 0.8], [50, 0]);

  const statOpacities = [stat1Opacity, stat2Opacity, stat3Opacity];
  const statYs = [stat1Y, stat2Y, stat3Y];

  return (
    <section ref={containerRef} className='relative w-full bg-blue-100 dark:bg-zinc-900'>
      {/* Desktop: Full version with particles */}
      <div className='hidden md:block h-[250vh]'>
        <div className='sticky top-0 h-screen w-full overflow-hidden bg-blue-100 dark:bg-zinc-900'>


          {/* Logo scatter container */}
          <div className='absolute inset-0'>
            {logoItems.map((item, index) => (
              <LogoBox key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* Center content - "Our Impact" title */}
          <motion.h2
            className='absolute left-1/2 top-1/4 -translate-x-1/2 text-5xl md:text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent z-10'
            style={{
              backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.primary}dd)`,
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Impact
          </motion.h2>

          {/* Stats - centered in middle */}
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center px-6'>
            <div className='space-y-6 max-w-3xl'>
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.id}
                  style={{
                    opacity: statOpacities[idx],
                    y: statYs[idx],
                  }}
                  className='flex items-center justify-center'
                >
                  <p className='text-2xl md:text-3xl font-bold text-blue-900 dark:text-zinc-100'>
                    {stat.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Simplified version */}
      <div className='md:hidden py-24'>
        <div className='mx-auto max-w-7xl px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold mb-4 text-blue-900 dark:text-zinc-100'>Our Impact</h2>
            <p className='text-blue-700 dark:text-zinc-300'>See the results we deliver</p>
          </div>

          {/* Logo grid for mobile */}
          <div className='grid grid-cols-3 gap-4 mb-16'>
            {companyLogos.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className='relative rounded-lg overflow-hidden aspect-square flex items-center justify-center border'
                style={{
                  borderColor: 'var(--gray-a6)',
                  backgroundColor: 'var(--gray-a3)',
                }}
              >
                {item.imagePath && (
                  <Image
                    src={item.imagePath}
                    alt={item.id}
                    fill
                    className='object-contain'
                    sizes='80px'
                    unoptimized
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Stats for mobile */}
          <div className='space-y-4'>
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className='flex items-start gap-3 p-4 rounded-lg border'
                style={{
                  borderColor: 'var(--gray-a6)',
                  backgroundColor: 'var(--gray-a2)',
                }}
              >
                <div
                  className='w-2 h-2 rounded-full flex-shrink-0 mt-2'
                  style={{ backgroundColor: colors.primary }}
                />
                <p className='text-sm text-blue-800 dark:text-zinc-300'>{stat.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
