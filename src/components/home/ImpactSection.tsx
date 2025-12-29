'use client';

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion, useInView } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getColorsFromPath } from '@/lib/colors';
import { siInstagram, siGooglemaps } from 'simple-icons';
import { Globe, Bot, Database, Calendar, Play, Smartphone } from 'lucide-react';

// ============================================================================
// Element Position Tracking Types
// ============================================================================

interface ElementPosition {
  id: string;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
}

// ============================================================================
// Types
// ============================================================================

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

interface ResponsivePosition {
  sm: { x: number; y: number }; // < 640px (mobile)
  md: { x: number; y: number }; // 640-1023px (tablet)
  lg: { x: number; y: number }; // 1024-1279px (laptop)
  xl: { x: number; y: number }; // 1280px+ (desktop)
}

interface Achievement {
  id: string;
  icon: 'crm' | 'ai' | 'googlemaps' | 'website' | 'booking' | 'views' | 'app';
  label: string;
  stat: string;
  numericValue?: number;
  suffix?: string;
  prefix?: string;
  // Which edge of the logo this connector starts from
  logoEdge: 'top' | 'right' | 'bottom' | 'left';
  // Which edge of the achievement box the connector enters
  boxEdge: 'top' | 'right' | 'bottom' | 'left';
}

interface CaseStudy {
  id: string;
  name: string;
  logo: string;
  websiteUrl: string;
  achievements: Achievement[];
  // Responsive positions for the logo (percentage-based)
  positions: ResponsivePosition;
  // Responsive positions for achievement boxes
  achievementPositions: ResponsivePosition[];
}

// ============================================================================
// Data
// ============================================================================

const caseStudies: CaseStudy[] = [
  {
    id: 'vhd',
    name: 'Vancouver Hood Doctors',
    logo: '/images/vhd-logo.webp',
    websiteUrl: 'https://vancouverventcleaning.ca/',
    positions: {
      sm: { x: 55, y: 15 }, // Mobile - moved up and right
      md: { x: 20, y: 28 }, // Tablet - moved up
      lg: { x: 5, y: 50 }, // Laptop - moved a bit right
      xl: { x: 25, y: 55 }, // Desktop
    },
    achievementPositions: [
      {
        // CRM - above logo on mobile
        sm: { x: 42, y: 8 }, // Mobile - aligned with logo
        md: { x: 2, y: 12 }, // Tablet - moved up a bit
        lg: { x: 25, y: 18 }, // Laptop - moved a bit more right
        xl: { x: 5, y: 15 },
      },
      {
        // AI - left of logo on mobile
        sm: { x: 0, y: 15 }, // Mobile - moved more up and left
        md: { x: 0, y: 65 }, // Tablet - moved WAY down
        lg: { x: 2, y: 22 }, // Laptop - moved a bit more up
        xl: { x: -5, y: 50 },
      },
      {
        // Google - below logo on mobile
        sm: { x: 60, y: 25 }, // Mobile - moved much more left
        md: { x: 30, y: 70 }, // Tablet - moved more right
        lg: { x: 8, y: 82 }, // Laptop - moved right
        xl: { x: 5, y: 85 },
      },
    ],
    achievements: [
      {
        id: 'vhd-crm',
        icon: 'crm',
        label: 'Custom CRM',
        stat: '2x Revenue',
        numericValue: 2,
        suffix: 'x Revenue',
        logoEdge: 'top',
        boxEdge: 'bottom',
      },
      {
        id: 'vhd-ai',
        icon: 'ai',
        label: 'AI Receptionist',
        stat: '+40% Clients',
        numericValue: 40,
        suffix: '% Clients',
        prefix: '+',
        logoEdge: 'left',
        boxEdge: 'right',
      },
      {
        id: 'vhd-googlemaps',
        icon: 'googlemaps',
        label: 'Google Business',
        stat: '4.9★ Rating',
        numericValue: 4.9,
        suffix: '★',
        logoEdge: 'bottom',
        boxEdge: 'top',
      },
    ],
  },
  {
    id: 'finny',
    name: 'Finny Cooks',
    logo: '',
    websiteUrl: 'https://www.instagram.com/finny_cooks/',
    positions: {
      sm: { x: 40, y: 75 }, // Mobile - moved left then down
      md: { x: 70, y: 28 }, // Tablet - moved up and left
      lg: { x: 65, y: 20 }, // Laptop - moved slightly left
      xl: { x: 50, y: 18 }, // Desktop - moved slightly up
    },
    achievementPositions: [
      {
        // Views
        sm: { x: -6, y: 73 }, // Mobile - moved down
        md: { x: 75, y: 15 }, // Tablet - moved much more left
        lg: { x: 80, y: 8 }, // Laptop - moved more left and up
        xl: { x: 65, y: 3 }, // Desktop - moved more right and a bit up
      },
      {
        // App
        sm: { x: 55, y: 68 }, // Mobile - moved to where Finny logo was
        md: { x: 75, y: 55 }, // Tablet - moved down and left
        lg: { x: 80, y: 32 }, // Laptop - moved more left and up
        xl: { x: 80, y: 28 }, // Desktop - moved way more right and a bit up
      },
    ],
    achievements: [
      {
        id: 'finny-views',
        icon: 'views',
        label: 'Viral Growth',
        stat: '15M Views',
        numericValue: 15,
        suffix: 'M Views',
        logoEdge: 'top',
        boxEdge: 'bottom',
      },
      {
        id: 'finny-app',
        icon: 'app',
        label: 'Multi-Platform App',
        stat: '4 Platforms',
        numericValue: 4,
        suffix: ' Platforms',
        logoEdge: 'right',
        boxEdge: 'left',
      },
    ],
  },
  {
    id: 'cjs',
    name: 'CJS Golf Academy',
    logo: '/images/cjslogo.png',
    websiteUrl: 'https://cjsgolfacademy.ca/',
    positions: {
      sm: { x: 45, y: 85 }, // Mobile - moved lower
      md: { x: 50, y: 82 }, // Tablet - moved more down
      lg: { x: 50, y: 75 }, // Laptop - moved more left
      xl: { x: 50, y: 78 }, // Desktop - moved WAY left
    },
    achievementPositions: [
      {
        // Website
        sm: { x: -6, y: 90 }, // Mobile - moved lower
        md: { x: 65, y: 72 }, // Tablet - moved more down
        lg: { x: 75, y: 62 }, // Laptop - moved a bit more right
        xl: { x: 85, y: 65 }, // Desktop - moved much more right
      },
      {
        // Booking
        sm: { x: 55, y: 95 }, // Mobile - moved lower
        md: { x: 65, y: 92 }, // Tablet - moved more down
        lg: { x: 75, y: 88 }, // Laptop - moved a bit more right
        xl: { x: 85, y: 92 }, // Desktop - moved much more right
      },
    ],
    achievements: [
      {
        id: 'cjs-website',
        icon: 'website',
        label: 'Custom Website',
        stat: '2x Leads',
        numericValue: 2,
        suffix: 'x Leads',
        logoEdge: 'right',
        boxEdge: 'left',
      },
      {
        id: 'cjs-booking',
        icon: 'booking',
        label: 'Booking Software',
        stat: 'Integrated',
        logoEdge: 'bottom',
        boxEdge: 'top',
      },
    ],
  },
];

// ============================================================================
// Animation Timing Constants
// ============================================================================

const TIMING = {
  // Phase 1: Logos scatter (staggered) - slower animation
  logoScatterStart: 0,
  logoScatterDuration: 1.2, // Slower scatter (was 0.8)
  logoStaggerDelay: 0.15, // Tighter stagger (was 0.2)

  // Phase 2: Center content appears (after logos settle)
  centerContentDelay: 1.6, // Adjusted for slower scatter
  centerTitleDuration: 0.7,
  centerStatsStagger: 0.15,

  // Phase 3: Connectors draw (after scatter completes)
  connectorDrawDelay: 1.8, // Adjusted timing
  connectorDrawDuration: 1.2,
  connectorStagger: 0.15,
};

// ============================================================================
// Hooks
// ============================================================================

function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xl');

  useEffect(() => {
    const getBreakpoint = (): Breakpoint => {
      const width = window.innerWidth;
      if (width < 640) return 'sm';
      if (width < 1024) return 'md';
      if (width < 1280) return 'lg';
      return 'xl';
    };

    setBreakpoint(getBreakpoint());
    const handleResize = () => setBreakpoint(getBreakpoint());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}

// ============================================================================
// Components
// ============================================================================

function AchievementIcon({
  iconType,
  className = 'w-4 h-4',
}: {
  iconType: Achievement['icon'];
  className?: string;
}) {
  switch (iconType) {
    case 'crm':
      return <Database className={className} />;
    case 'ai':
      return <Bot className={className} />;
    case 'googlemaps':
      return (
        <div
          className={className}
          dangerouslySetInnerHTML={{
            __html: siGooglemaps.svg.replace(
              '<svg',
              '<svg width="100%" height="100%" fill="currentColor"'
            ),
          }}
        />
      );
    case 'website':
      return <Globe className={className} />;
    case 'booking':
      return <Calendar className={className} />;
    case 'views':
      return <Play className={className} />;
    case 'app':
      return <Smartphone className={className} />;
    default:
      return <Globe className={className} />;
  }
}

// Count-up hook - returns a string state value (not a MotionValue)
function useCountUp(
  end: number,
  duration: number = 2,
  delay: number = 0,
  isInView: boolean = true
): string {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      const startTime = performance.now();
      const startValue = 0;

      const updateValue = () => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        // Ease out cubic
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (end - startValue) * easedProgress;

        if (end < 10) {
          setDisplayValue(currentValue.toFixed(1));
        } else {
          setDisplayValue(Math.round(currentValue).toString());
        }

        if (progress < 1) {
          requestAnimationFrame(updateValue);
        }
      };

      requestAnimationFrame(updateValue);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [end, duration, delay, isInView]);

  return displayValue;
}

// Calculate edge point on a box
function getEdgePoint(
  centerX: number,
  centerY: number,
  edge: 'top' | 'right' | 'bottom' | 'left',
  boxWidth: number,
  boxHeight: number
): { x: number; y: number } {
  switch (edge) {
    case 'top':
      return { x: centerX, y: centerY - boxHeight / 2 };
    case 'right':
      return { x: centerX + boxWidth / 2, y: centerY };
    case 'bottom':
      return { x: centerX, y: centerY + boxHeight / 2 };
    case 'left':
      return { x: centerX - boxWidth / 2, y: centerY };
  }
}

// Generate cubic bezier path that exits horizontally and enters vertically
function generateConnectorPath(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  startEdge: 'top' | 'right' | 'bottom' | 'left',
  endEdge: 'top' | 'right' | 'bottom' | 'left'
): string {
  // Control point offsets based on distance
  const dx = Math.abs(endX - startX);
  const dy = Math.abs(endY - startY);
  const controlOffset = Math.max(dx, dy) * 0.5;

  // Calculate control points based on exit/entry directions
  let cp1x = startX;
  let cp1y = startY;
  let cp2x = endX;
  let cp2y = endY;

  // First control point: extend in direction of startEdge
  switch (startEdge) {
    case 'top':
      cp1y = startY - controlOffset;
      break;
    case 'right':
      cp1x = startX + controlOffset;
      break;
    case 'bottom':
      cp1y = startY + controlOffset;
      break;
    case 'left':
      cp1x = startX - controlOffset;
      break;
  }

  // Second control point: extend from endEdge direction
  switch (endEdge) {
    case 'top':
      cp2y = endY - controlOffset;
      break;
    case 'right':
      cp2x = endX + controlOffset;
      break;
    case 'bottom':
      cp2y = endY + controlOffset;
      break;
    case 'left':
      cp2x = endX - controlOffset;
      break;
  }

  return `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
}

// Curved connector with motion path animation
function CurvedConnector({
  pathD,
  delay,
  isInView,
  accentColor,
}: {
  pathD: string;
  delay: number;
  isInView: boolean;
  accentColor: string;
}) {
  return (
    <g>
      {/* Background path (subtle) */}
      <motion.path
        d={pathD}
        fill='none'
        stroke={accentColor}
        strokeWidth='2'
        strokeOpacity='0.15'
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{
          duration: TIMING.connectorDrawDuration,
          delay: delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      {/* Main animated path */}
      <motion.path
        d={pathD}
        fill='none'
        stroke={accentColor}
        strokeWidth='2'
        strokeOpacity='0.6'
        strokeLinecap='round'
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{
          duration: TIMING.connectorDrawDuration,
          delay: delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </g>
  );
}

// Logo Box Component
function LogoBox({
  study,
  isInView,
  index,
  breakpoint,
  accentColor,
  onPositionReady,
  containerRef,
}: {
  study: CaseStudy;
  isInView: boolean;
  index: number;
  breakpoint: Breakpoint;
  accentColor: string;
  onPositionReady?: (id: string, position: ElementPosition) => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const delay = TIMING.logoScatterStart + index * TIMING.logoStaggerDelay;
  // Rotation for stacked effect: -15°, 0°, 15° for 3 logos
  const initialRotation = (index - 1) * 15;

  // Use responsive position based on breakpoint
  const targetPosition = study.positions[breakpoint];
  const isMobile = breakpoint === 'sm';

  // Report position after scatter animation completes
  useEffect(() => {
    if (
      !isInView ||
      !onPositionReady ||
      !elementRef.current ||
      !containerRef?.current
    )
      return;

    const timeoutId = setTimeout(
      () => {
        const elementRect = elementRef.current?.getBoundingClientRect();
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!elementRect || !containerRect) return;

        onPositionReady(study.id, {
          id: study.id,
          centerX:
            elementRect.left - containerRect.left + elementRect.width / 2,
          centerY: elementRect.top - containerRect.top + elementRect.height / 2,
          width: elementRect.width,
          height: elementRect.height,
        });
      },
      (delay + TIMING.logoScatterDuration) * 1000 + 100
    ); // Wait for animation + buffer

    return () => clearTimeout(timeoutId);
  }, [isInView, study.id, delay, onPositionReady, containerRef]);

  // Mobile floating animation config
  const floatAnimation = isMobile
    ? {
        y: [0, -4, 0], // Gentle 4px float
      }
    : {};

  const floatTransition = isMobile
    ? {
        y: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut' as const,
          delay: index * 0.5,
        },
      }
    : {};

  return (
    <motion.div
      ref={elementRef}
      className='absolute z-20'
      initial={{
        left: '50%',
        top: '50%',
        opacity: 1, // Visible from start
        scale: 0.8, // Slightly smaller
        rotate: initialRotation, // Stacked rotation
      }}
      animate={
        isInView
          ? {
              left: `${targetPosition.x}%`,
              top: `${targetPosition.y}%`,
              opacity: 1,
              scale: 1,
              rotate: 0, // Unrotate when scattered
              ...floatAnimation,
            }
          : {
              left: '50%',
              top: '50%',
              opacity: 1,
              scale: 0.8,
              rotate: initialRotation,
            }
      }
      transition={{
        duration: TIMING.logoScatterDuration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
        ...floatTransition,
      }}
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <Link
        href={study.websiteUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='block group'
      >
        <motion.div
          className={`relative w-14 h-14 md:w-24 md:h-24 rounded-lg md:rounded-xl overflow-hidden flex items-center justify-center border-2 cursor-pointer shadow-lg ${
            study.id === 'cjs' ? 'bg-white' : 'bg-card'
          }`}
          style={{
            borderColor: accentColor,
          }}
          whileHover={{ scale: 1.1, borderColor: accentColor }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {study.logo ? (
            <Image
              src={study.logo}
              alt={study.name}
              fill
              className={
                study.id === 'cjs'
                  ? 'object-cover'
                  : 'object-contain p-1.5 md:p-2'
              }
              sizes='96px'
              unoptimized
            />
          ) : (
            <div
              className='w-7 h-7 md:w-10 md:h-10 text-pink-500'
              dangerouslySetInnerHTML={{
                __html: siInstagram.svg.replace(
                  '<svg',
                  '<svg width="100%" height="100%" fill="currentColor"'
                ),
              }}
            />
          )}
        </motion.div>
        <motion.p
          className='text-[10px] md:text-xs text-center mt-1 md:mt-2 text-muted-foreground group-hover:text-foreground max-w-16 md:max-w-24 truncate'
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay + 0.3 }}
        >
          {study.name}
        </motion.p>
      </Link>
    </motion.div>
  );
}

// Achievement Box Component
function AchievementBox({
  achievement,
  positions,
  isInView,
  delay,
  websiteUrl,
  accentColor,
  rotationIndex,
  breakpoint,
  onPositionReady,
  containerRef,
}: {
  achievement: Achievement;
  positions: ResponsivePosition;
  isInView: boolean;
  delay: number;
  websiteUrl: string;
  accentColor: string;
  rotationIndex: number;
  breakpoint: Breakpoint;
  onPositionReady?: (id: string, position: ElementPosition) => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const countValue = useCountUp(
    achievement.numericValue || 0,
    1.5,
    delay + 0.3,
    isInView
  );

  // Slight random-ish rotation based on index for stacked effect
  const initialRotation = ((rotationIndex % 5) - 2) * 8; // -16°, -8°, 0°, 8°, 16°

  // Use responsive position based on breakpoint
  const targetPosition = positions[breakpoint];
  const isMobile = breakpoint === 'sm';

  // Report position after scatter animation completes
  useEffect(() => {
    if (
      !isInView ||
      !onPositionReady ||
      !elementRef.current ||
      !containerRef?.current
    )
      return;

    const timeoutId = setTimeout(
      () => {
        const elementRect = elementRef.current?.getBoundingClientRect();
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!elementRect || !containerRect) return;

        onPositionReady(achievement.id, {
          id: achievement.id,
          centerX:
            elementRect.left - containerRect.left + elementRect.width / 2,
          centerY: elementRect.top - containerRect.top + elementRect.height / 2,
          width: elementRect.width,
          height: elementRect.height,
        });
      },
      (delay + TIMING.logoScatterDuration) * 1000 + 100
    ); // Wait for animation + buffer

    return () => clearTimeout(timeoutId);
  }, [isInView, achievement.id, delay, onPositionReady, containerRef]);

  // Mobile floating animation config
  const floatAnimation = isMobile
    ? {
        y: [0, -4, 0], // Gentle 4px float
      }
    : {};

  const floatTransition = isMobile
    ? {
        y: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut' as const,
          delay: rotationIndex * 0.4,
        },
      }
    : {};

  return (
    <motion.div
      ref={elementRef}
      className='absolute z-10'
      initial={{
        left: '50%',
        top: '50%',
        opacity: 1, // Visible from start
        scale: 0.6, // Smaller for stacked effect
        rotate: initialRotation,
      }}
      animate={
        isInView
          ? {
              left: `${targetPosition.x}%`,
              top: `${targetPosition.y}%`,
              opacity: 1,
              scale: 1,
              rotate: 0,
              ...floatAnimation,
            }
          : {
              left: '50%',
              top: '50%',
              opacity: 1,
              scale: 0.6,
              rotate: initialRotation,
            }
      }
      transition={{
        duration: TIMING.logoScatterDuration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
        ...floatTransition,
      }}
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <Link
        href={websiteUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='block group'
      >
        <motion.div
          className='flex items-center gap-1.5 md:gap-3 px-2 py-1.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border-2 cursor-pointer whitespace-nowrap shadow-lg backdrop-blur-sm'
          style={{
            borderColor: `${accentColor}40`,
            backgroundColor: 'var(--card)',
          }}
          whileHover={{
            scale: 1.05,
            borderColor: accentColor,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div
            className='p-1 md:p-2 rounded-md md:rounded-lg'
            style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
          >
            <AchievementIcon
              iconType={achievement.icon}
              className='w-3.5 h-3.5 md:w-5 md:h-5'
            />
          </div>
          <div className='text-xs md:text-sm'>
            <p className='text-muted-foreground leading-tight text-[10px] md:text-xs'>
              {achievement.label}
            </p>
            <p className='font-bold text-foreground leading-tight text-xs md:text-sm'>
              {achievement.numericValue ? (
                <>
                  {achievement.prefix}
                  <span>{countValue}</span>
                  {achievement.suffix}
                </>
              ) : (
                achievement.stat
              )}
            </p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// Center Stats Component
function CenterStats({
  isInView,
  colors,
}: {
  isInView: boolean;
  colors: { primary: string; secondary: string };
}) {
  const hoursSaved = useCountUp(
    1000,
    2,
    TIMING.centerContentDelay + 0.3,
    isInView
  );
  const revenueGenerated = useCountUp(
    500,
    2,
    TIMING.centerContentDelay + 0.45,
    isInView
  );
  const leadsGenerated = useCountUp(
    10000,
    2.5,
    TIMING.centerContentDelay + 0.6,
    isInView
  );

  return (
    <motion.div
      className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-30 pointer-events-none'
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{
        duration: TIMING.centerTitleDuration,
        delay: TIMING.centerContentDelay,
      }}
    >
      {/* Subtle dot grid background */}
      <motion.div
        className='absolute -inset-48 md:-inset-64 rounded-3xl overflow-hidden'
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: TIMING.centerContentDelay }}
      >
        <svg className='w-full h-full text-muted-foreground/20'>
          <defs>
            <pattern
              id='centerDotGrid'
              width='20'
              height='20'
              patternUnits='userSpaceOnUse'
            >
              <circle cx='2' cy='2' r='1' fill='currentColor' />
            </pattern>
            <radialGradient id='centerFade' cx='50%' cy='50%' r='50%'>
              <stop offset='0%' stopColor='white' stopOpacity='1' />
              <stop offset='100%' stopColor='white' stopOpacity='0' />
            </radialGradient>
            <mask id='centerMask'>
              <rect width='100%' height='100%' fill='url(#centerFade)' />
            </mask>
          </defs>
          <rect
            width='100%'
            height='100%'
            fill='url(#centerDotGrid)'
            mask='url(#centerMask)'
          />
        </svg>
      </motion.div>

      <motion.h2
        className='relative text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r bg-clip-text text-transparent'
        style={{
          backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: TIMING.centerContentDelay }}
      >
        Our Impact
      </motion.h2>

      {/* Stats grid - mobile: stacked, md+: 2+1 layout */}
      <div className='relative grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-3'>
        {/* Hours Saved */}
        <motion.div
          className='flex flex-col items-center justify-center gap-1 px-3 py-2 lg:px-4 lg:py-2.5 rounded-xl border bg-card/80 backdrop-blur-sm shadow-lg w-[240px] md:w-[260px] lg:w-[300px] xl:w-[320px] justify-self-center md:justify-self-end overflow-hidden'
          style={{ borderColor: `${colors.primary}40` }}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{
            delay: TIMING.centerContentDelay + TIMING.centerStatsStagger,
          }}
        >
          <span
            className='text-xl md:text-2xl lg:text-3xl font-bold tabular-nums'
            style={{ color: colors.primary }}
          >
            {hoursSaved}+
          </span>
          <span className='text-xs md:text-sm lg:text-base text-muted-foreground whitespace-nowrap'>
            Hours Saved
          </span>
        </motion.div>

        {/* Revenue Generated */}
        <motion.div
          className='flex flex-col items-center justify-center gap-1 px-3 py-2 lg:px-4 lg:py-2.5 rounded-xl border bg-card/80 backdrop-blur-sm shadow-lg w-[240px] md:w-[260px] lg:w-[300px] xl:w-[320px] justify-self-center md:justify-self-start overflow-hidden'
          style={{ borderColor: `${colors.secondary}40` }}
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{
            delay: TIMING.centerContentDelay + TIMING.centerStatsStagger * 2,
          }}
        >
          <span
            className='text-xl md:text-2xl lg:text-3xl font-bold tabular-nums'
            style={{ color: colors.secondary }}
          >
            ${revenueGenerated}K+
          </span>
          <span className='text-xs md:text-sm lg:text-base text-muted-foreground whitespace-nowrap'>
            Revenue Generated
          </span>
        </motion.div>

        {/* Leads Generated - spans 2 cols on md+, centered */}
        <motion.div
          className='flex flex-col items-center justify-center gap-1 px-3 py-2 lg:px-4 lg:py-2.5 rounded-xl border bg-card/80 backdrop-blur-sm shadow-lg w-[240px] md:w-[260px] lg:w-[300px] xl:w-[320px] md:col-span-2 justify-self-center overflow-hidden'
          style={{ borderColor: `${colors.primary}40` }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            delay: TIMING.centerContentDelay + TIMING.centerStatsStagger * 3,
          }}
        >
          <span
            className='text-xl md:text-2xl lg:text-3xl font-bold tabular-nums'
            style={{ color: colors.primary }}
          >
            {leadsGenerated}+
          </span>
          <span className='text-xs md:text-sm lg:text-base text-muted-foreground whitespace-nowrap'>
            Leads Generated
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const pathname = usePathname();
  const colors = getColorsFromPath(pathname);
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoint = useBreakpoint();

  // Track measured element positions using refs
  const [elementPositions, setElementPositions] = useState<
    Record<string, ElementPosition>
  >({});

  // Mobile detection for hiding connectors on mobile
  const isMobile = breakpoint === 'sm';

  const getAccentColor = useCallback(
    (studyId: string) => {
      switch (studyId) {
        case 'vhd':
          return '#06B6D4';
        case 'finny':
          return '#EC4899';
        case 'cjs':
          return '#3B82F6';
        default:
          return colors.primary;
      }
    },
    [colors.primary]
  );

  // Callback for elements to report their positions after animation
  const handlePositionReady = useCallback(
    (id: string, position: ElementPosition) => {
      setElementPositions((prev) => ({ ...prev, [id]: position }));
    },
    []
  );

  // Calculate connector paths based on measured element positions
  const connectorPaths = useMemo(() => {
    // Need all element positions before we can draw connectors
    const totalElements = caseStudies.reduce(
      (sum, study) => sum + 1 + study.achievements.length,
      0
    );

    if (Object.keys(elementPositions).length < totalElements) {
      return []; // Wait until all elements have reported positions
    }

    const paths: Array<{
      pathD: string;
      delay: number;
      accentColor: string;
      key: string;
    }> = [];

    caseStudies.forEach((study) => {
      const logoPos = elementPositions[study.id];
      if (!logoPos) return;

      study.achievements.forEach((ach) => {
        const boxPos = elementPositions[ach.id];
        if (!boxPos) return;

        // Get edge points based on actual measured positions
        const startPoint = getEdgePoint(
          logoPos.centerX,
          logoPos.centerY,
          ach.logoEdge,
          logoPos.width,
          logoPos.height
        );
        const endPoint = getEdgePoint(
          boxPos.centerX,
          boxPos.centerY,
          ach.boxEdge,
          boxPos.width,
          boxPos.height
        );

        const pathD = generateConnectorPath(
          startPoint.x,
          startPoint.y,
          endPoint.x,
          endPoint.y,
          ach.logoEdge,
          ach.boxEdge
        );

        paths.push({
          pathD,
          delay: 0, // No delay since elements are already in place
          accentColor: getAccentColor(study.id),
          key: ach.id,
        });
      });
    });

    return paths;
  }, [elementPositions, getAccentColor]);

  return (
    <section
      ref={sectionRef}
      className='relative w-full py-24 bg-secondary overflow-hidden'
    >
      <div className='mx-auto max-w-7xl px-6'>
        <div ref={containerRef} className='relative h-[850px] md:h-[750px]'>
          {/* SVG layer for connectors - hidden on mobile */}
          {!isMobile && (
            <svg
              className='absolute inset-0 w-full h-full pointer-events-none z-0'
              style={{ overflow: 'visible' }}
            >
              {/* Glow filter for particles */}
              <defs>
                <filter id='glow' x='-50%' y='-50%' width='200%' height='200%'>
                  <feGaussianBlur stdDeviation='3' result='coloredBlur' />
                  <feMerge>
                    <feMergeNode in='coloredBlur' />
                    <feMergeNode in='SourceGraphic' />
                  </feMerge>
                </filter>
              </defs>

              {connectorPaths.map((connector) => (
                <CurvedConnector
                  key={connector.key}
                  pathD={connector.pathD}
                  delay={connector.delay}
                  isInView={isInView}
                  accentColor={connector.accentColor}
                />
              ))}
            </svg>
          )}

          {/* Center Stats */}
          <CenterStats isInView={isInView} colors={colors} />

          {/* Logo Boxes */}
          {caseStudies.map((study, index) => (
            <LogoBox
              key={study.id}
              study={study}
              isInView={isInView}
              index={index}
              breakpoint={breakpoint}
              accentColor={getAccentColor(study.id)}
              onPositionReady={handlePositionReady}
              containerRef={containerRef}
            />
          ))}

          {/* Achievement Boxes - scatter with their logos */}
          {caseStudies.map((study, studyIndex) =>
            study.achievements.map((achievement, achIndex) => (
              <AchievementBox
                key={achievement.id}
                achievement={achievement}
                positions={study.achievementPositions[achIndex]}
                isInView={isInView}
                delay={
                  TIMING.logoScatterStart +
                  studyIndex * TIMING.logoStaggerDelay +
                  (achIndex + 1) * 0.1
                }
                websiteUrl={study.websiteUrl}
                accentColor={getAccentColor(study.id)}
                rotationIndex={studyIndex * 3 + achIndex}
                breakpoint={breakpoint}
                onPositionReady={handlePositionReady}
                containerRef={containerRef}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
