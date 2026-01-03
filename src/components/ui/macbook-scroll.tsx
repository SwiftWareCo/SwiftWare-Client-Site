'use client';

import React, { useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';
import { getColorsRGBFromPath } from '@/lib/colors';
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretDownFilled,
  IconCaretLeftFilled,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconCommand,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconSearch,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconWorld,
} from '@tabler/icons-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

// Chart data for mobile/tablet view
const trafficData = [
  { month: 'Jan', organic: 1200, paid: 400 },
  { month: 'Feb', organic: 1400, paid: 380 },
  { month: 'Mar', organic: 1800, paid: 420 },
  { month: 'Apr', organic: 2200, paid: 450 },
  { month: 'May', organic: 2800, paid: 480 },
  { month: 'Jun', organic: 3100, paid: 500 },
];

const keywordData = [
  { position: 'Top 3', count: 45 },
  { position: 'Top 10', count: 89 },
  { position: 'Top 20', count: 156 },
  { position: 'Page 1', count: 234 },
];

export interface MacbookScrollProps {
  src?: string;
  showGradient?: boolean;
  title?: string | React.ReactNode;
  badge?: React.ReactNode;
}

export const MacbookScroll = ({
  src,
  showGradient,
  title,
  badge,
}: MacbookScrollProps) => {
  const pathname = usePathname();
  const colorsRGB = getColorsRGBFromPath(pathname);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Lid opening animation
  const lidRotate = useTransform(scrollYProgress, [0, 0.5], [-90, 0]);
  const lidOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const screenSrc = src ?? '/images/SEOResults.png';

  return (
    <div ref={containerRef} className='relative min-h-[200vh]'>
      {/* Sticky container */}
      <div className='sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden py-8 md:py-16'>
        {/* Title */}
        <motion.h2
          style={{ opacity: lidOpacity }}
          className='mb-6 text-center text-xl font-bold text-foreground sm:text-2xl md:mb-10 md:text-3xl max-w-3xl px-4'
        >
          {title || (
            <span>Track the leads you earn—and the revenue you close.</span>
          )}
        </motion.h2>

        {/* MacBook container - scales based on screen */}
        <div className='relative w-full max-w-[90vw] md:max-w-[700px] lg:max-w-[900px] px-4'>
          {/* Desktop/Large screens: Full MacBook with image */}
          <div className='hidden md:block'>
            <MacbookWithLid
              screenSrc={screenSrc}
              lidRotate={lidRotate}
              colorsRGB={colorsRGB}
              showGradient={showGradient}
              badge={badge}
            />
          </div>

          {/* Tablet/Mobile: Charts instead of MacBook */}
          <motion.div className='md:hidden' style={{ opacity: lidOpacity }}>
            <SEODashboardCharts />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// SEO Dashboard Charts for mobile/tablet
function SEODashboardCharts() {
  return (
    <div className='space-y-6 p-4'>
      {/* Traffic Growth Chart */}
      <div className='rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-4 shadow-lg'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-sm font-semibold text-foreground'>
            Organic Traffic Growth
          </h3>
          <span className='text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-medium'>
            +163%
          </span>
        </div>
        <div className='h-40'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient
                  id='organicGradient'
                  x1='0'
                  y1='0'
                  x2='0'
                  y2='1'
                >
                  <stop offset='5%' stopColor='#10b981' stopOpacity={0.3} />
                  <stop offset='95%' stopColor='#10b981' stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey='month'
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#71717a', fontSize: 10 }}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Area
                type='monotone'
                dataKey='organic'
                stroke='#10b981'
                strokeWidth={2}
                fill='url(#organicGradient)'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Keyword Rankings Chart */}
      <div className='rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-4 shadow-lg'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-sm font-semibold text-foreground'>
            Keyword Rankings
          </h3>
          <span className='text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 font-medium'>
            234 on Page 1
          </span>
        </div>
        <div className='h-32'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={keywordData} layout='vertical'>
              <XAxis type='number' hide />
              <YAxis
                type='category'
                dataKey='position'
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#71717a', fontSize: 10 }}
                width={50}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey='count' fill='#3b82f6' radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className='grid grid-cols-2 gap-3'>
        <div className='rounded-xl border border-border bg-card/80 backdrop-blur-sm p-3 text-center'>
          <div className='text-2xl font-bold text-foreground'>12.4%</div>
          <div className='text-xs text-muted-foreground'>Conversion Rate</div>
          <div className='text-xs text-emerald-400 mt-1'>+3.2%</div>
        </div>
        <div className='rounded-xl border border-border bg-card/80 backdrop-blur-sm p-3 text-center'>
          <div className='text-2xl font-bold text-foreground'>$47K</div>
          <div className='text-xs text-muted-foreground'>Monthly Revenue</div>
          <div className='text-xs text-emerald-400 mt-1'>+28%</div>
        </div>
      </div>
    </div>
  );
}

// MacBook with animated lid
interface MacbookWithLidProps {
  screenSrc: string;
  lidRotate: ReturnType<typeof useTransform<number, number>>;
  colorsRGB: { primaryRGB: string; secondaryRGB: string };
  showGradient?: boolean;
  badge?: React.ReactNode;
}

function MacbookWithLid({
  screenSrc,
  lidRotate,
  colorsRGB,
  showGradient,
  badge,
}: MacbookWithLidProps) {
  return (
    <div className='flex flex-col items-center'>
      {/* Lid (screen) */}
      <motion.div
        style={{
          rotateX: lidRotate,
          transformStyle: 'preserve-3d',
          transformOrigin: 'bottom',
        }}
        className='relative w-[32rem] h-80 md:h-96 rounded-2xl bg-[color:var(--macbook-shell)] p-2'
      >
        <div className='absolute inset-0 rounded-xl bg-[color:var(--macbook-screen)]' />
        <Image
          src={screenSrc}
          alt='analytics dashboard mockup'
          fill
          sizes='(max-width: 768px) 0px, 1152px'
          quality={100}
          className='absolute inset-0 rounded-xl object-cover object-left-top'
          priority
          fetchPriority='high'
        />
      </motion.div>

      {/* Base */}
      <div
        className='relative -mt-1 h-[18rem] w-[32rem] overflow-hidden rounded-2xl bg-[color:var(--macbook-base)] md:h-[22rem]'
        style={{
          boxShadow: `0 24px 70px rgba(${colorsRGB.primaryRGB}, 0.24)`,
        }}
      >
        <div className='relative h-10 w-full'>
          <div className='absolute inset-x-0 mx-auto h-4 w-[80%] rounded-b-full bg-[color:var(--macbook-shell)]' />
        </div>
        <div className='relative flex'>
          <div className='mx-auto h-full w-[10%] overflow-hidden'>
            <SpeakerGrid />
          </div>
          <div className='mx-auto h-full w-[80%]'>
            <Keypad />
          </div>
          <div className='mx-auto h-full w-[10%] overflow-hidden'>
            <SpeakerGrid />
          </div>
        </div>
        <Trackpad />
        <div className='absolute inset-x-0 bottom-0 mx-auto h-2 w-24 rounded-t-3xl bg-[color:var(--macbook-shell)]' />
        {showGradient && (
          <div className='absolute inset-x-0 bottom-0 z-50 h-40 w-full bg-gradient-to-t from-background via-background to-transparent' />
        )}
        {badge && <div className='absolute bottom-4 left-4'>{badge}</div>}
      </div>
    </div>
  );
}

export const Trackpad = () => {
  return (
    <div
      className='mx-auto my-2 h-28 w-[40%] rounded-xl'
      style={{
        backgroundColor: 'var(--macbook-trackpad)',
        boxShadow: '0px 0px 1px 1px var(--macbook-trackpad) inset',
      }}
    />
  );
};

export const Keypad = () => {
  return (
    <div className='mx-1 h-full [transform:translateZ(0)] rounded-md bg-[color:var(--macbook-shell)] p-1 [will-change:transform]'>
      <div className='mb-[2px] flex w-full shrink-0 gap-[2px]'>
        <KBtn
          className='w-10 items-end justify-start pb-[2px] pl-[4px]'
          childrenClassName='items-start'
        >
          esc
        </KBtn>
        <KBtn>
          <IconBrightnessDown className='h-[6px] w-[6px]' />
          <span className='mt-1 inline-block'>F1</span>
        </KBtn>
        <KBtn>
          <IconBrightnessUp className='h-[6px] w-[6px]' />
          <span className='mt-1 inline-block'>F2</span>
        </KBtn>
        <KBtn>
          <IconTable className='h-[6px] w-[6px]' />
          <span className='mt-1 inline-block'>F3</span>
        </KBtn>
        <KBtn>
          <IconSearch className='h-[6px] w-[6px]' />
          <span className='mt-1 inline-block'>F4</span>
        </KBtn>
        <KBtn>
          <IconMicrophone className='h-[6px] w-[6px]' />
          <span className='mt-1 inline-block'>F5</span>
        </KBtn>
        <KBtn>
          <IconMoon className='h-[6px] w-[6px]' />
          <span className='mt-1 inline-block'>F6</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackPrev className='h-[6px] w-[6px]' />
          <span className='mt-1 inline-block'>F7</span>
        </KBtn>
        <KBtn>
          <IconPlayerSkipForward className='h-[6px] w-[6px]' />
          <span className='mt-1 inline-block'>F8</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackNext className='h-[6px] w-[6px]' />
          <span className='mt-1 inline-block'>F9</span>
        </KBtn>
        <KBtn>
          <IconVolume3 className='h-[6px] w-[6px]' />
          <span className='mt-1 inline-block'>F10</span>
        </KBtn>
        <KBtn>
          <IconVolume2 className='h-[6px] w-[6px]' />
          <span className='mt-1 inline-block'>F11</span>
        </KBtn>
        <KBtn>
          <IconVolume className='h-[6px] w-[6px]' />
          <span className='mt-1 inline-block'>F12</span>
        </KBtn>
        <KBtn>
          <div className='h-4 w-4 rounded-full bg-[color:var(--macbook-key-highlight)] p-px'>
            <div className='h-full w-full rounded-full bg-[color:var(--macbook-key)]' />
          </div>
        </KBtn>
      </div>

      <div className='mb-[2px] flex w-full shrink-0 gap-[2px]'>
        <KBtn>
          <span className='block'>~</span>
          <span className='mt-1 block'>`</span>
        </KBtn>
        <KBtn>
          <span className='block'>!</span>
          <span className='block'>1</span>
        </KBtn>
        <KBtn>
          <span className='block'>@</span>
          <span className='block'>2</span>
        </KBtn>
        <KBtn>
          <span className='block'>#</span>
          <span className='block'>3</span>
        </KBtn>
        <KBtn>
          <span className='block'>$</span>
          <span className='block'>4</span>
        </KBtn>
        <KBtn>
          <span className='block'>%</span>
          <span className='block'>5</span>
        </KBtn>
        <KBtn>
          <span className='block'>^</span>
          <span className='block'>6</span>
        </KBtn>
        <KBtn>
          <span className='block'>&amp;</span>
          <span className='block'>7</span>
        </KBtn>
        <KBtn>
          <span className='block'>*</span>
          <span className='block'>8</span>
        </KBtn>
        <KBtn>
          <span className='block'>(</span>
          <span className='block'>9</span>
        </KBtn>
        <KBtn>
          <span className='block'>)</span>
          <span className='block'>0</span>
        </KBtn>
        <KBtn>
          <span className='block'>—</span>
          <span className='block'>_</span>
        </KBtn>
        <KBtn>
          <span className='block'>+</span>
          <span className='block'>=</span>
        </KBtn>
        <KBtn
          className='w-10 items-end justify-end pb-[2px] pr-[4px]'
          childrenClassName='items-end'
        >
          delete
        </KBtn>
      </div>

      <div className='mb-[2px] flex w-full shrink-0 gap-[2px]'>
        <KBtn
          className='w-10 items-end justify-start pb-[2px] pl-[4px]'
          childrenClassName='items-start'
        >
          tab
        </KBtn>
        <KBtn>Q</KBtn>
        <KBtn>W</KBtn>
        <KBtn>E</KBtn>
        <KBtn>R</KBtn>
        <KBtn>T</KBtn>
        <KBtn>Y</KBtn>
        <KBtn>U</KBtn>
        <KBtn>I</KBtn>
        <KBtn>O</KBtn>
        <KBtn>P</KBtn>
        <KBtn>
          <span className='block'>{'{'}</span>
          <span className='block'>{'['}</span>
        </KBtn>
        <KBtn>
          <span className='block'>{'}'}</span>
          <span className='block'>{']'}</span>
        </KBtn>
        <KBtn>
          <span className='block'>|</span>
          <span className='block'>\</span>
        </KBtn>
      </div>

      <div className='mb-[2px] flex w-full shrink-0 gap-[2px]'>
        <KBtn
          className='w-[2.8rem] items-end justify-start pb-[2px] pl-[4px]'
          childrenClassName='items-start'
        >
          caps lock
        </KBtn>
        <KBtn>A</KBtn>
        <KBtn>S</KBtn>
        <KBtn>D</KBtn>
        <KBtn>F</KBtn>
        <KBtn>G</KBtn>
        <KBtn>H</KBtn>
        <KBtn>J</KBtn>
        <KBtn>K</KBtn>
        <KBtn>L</KBtn>
        <KBtn>
          <span className='block'>:</span>
          <span className='block'>;</span>
        </KBtn>
        <KBtn>
          <span className='block'>&quot;</span>
          <span className='block'>&#39;</span>
        </KBtn>
        <KBtn
          className='w-[2.85rem] items-end justify-end pb-[2px] pr-[4px]'
          childrenClassName='items-end'
        >
          return
        </KBtn>
      </div>

      <div className='mb-[2px] flex w-full shrink-0 gap-[2px]'>
        <KBtn
          className='w-[3.65rem] items-end justify-start pb-[2px] pl-[4px]'
          childrenClassName='items-start'
        >
          shift
        </KBtn>
        <KBtn>Z</KBtn>
        <KBtn>X</KBtn>
        <KBtn>C</KBtn>
        <KBtn>V</KBtn>
        <KBtn>B</KBtn>
        <KBtn>N</KBtn>
        <KBtn>M</KBtn>
        <KBtn>
          <span className='block'>&lt;</span>
          <span className='block'>,</span>
        </KBtn>
        <KBtn>
          <span className='block'>&gt;</span>
          <span className='block'>.</span>
        </KBtn>
        <KBtn>
          <span className='block'>?</span>
          <span className='block'>/</span>
        </KBtn>
        <KBtn
          className='w-[3.65rem] items-end justify-end pb-[2px] pr-[4px]'
          childrenClassName='items-end'
        >
          shift
        </KBtn>
      </div>

      <div className='mb-[2px] flex w-full shrink-0 gap-[2px]'>
        <KBtn childrenClassName='h-full justify-between py-[4px]'>
          <div className='flex w-full justify-end pr-1'>
            <span className='block'>fn</span>
          </div>
          <div className='flex w-full justify-start pl-1'>
            <IconWorld className='h-[6px] w-[6px]' />
          </div>
        </KBtn>
        <KBtn childrenClassName='h-full justify-between py-[4px]'>
          <div className='flex w-full justify-end pr-1'>
            <IconChevronUp className='h-[6px] w-[6px]' />
          </div>
          <div className='flex w-full justify-start pl-1'>
            <span className='block'>control</span>
          </div>
        </KBtn>
        <KBtn childrenClassName='h-full justify-between py-[4px]'>
          <div className='flex w-full justify-end pr-1'>
            <OptionKey className='h-[6px] w-[6px]' />
          </div>
          <div className='flex w-full justify-start pl-1'>
            <span className='block'>option</span>
          </div>
        </KBtn>
        <KBtn
          className='w-8'
          childrenClassName='h-full justify-between py-[4px]'
        >
          <div className='flex w-full justify-end pr-1'>
            <IconCommand className='h-[6px] w-[6px]' />
          </div>
          <div className='flex w-full justify-start pl-1'>
            <span className='block'>command</span>
          </div>
        </KBtn>
        <KBtn className='w-[8.2rem]' backlit={false} />
        <KBtn
          className='w-8'
          childrenClassName='h-full justify-between py-[4px]'
        >
          <div className='flex w-full justify-start pl-1'>
            <IconCommand className='h-[6px] w-[6px]' />
          </div>
          <div className='flex w-full justify-start pl-1'>
            <span className='block'>command</span>
          </div>
        </KBtn>
        <KBtn childrenClassName='h-full justify-between py-[4px]'>
          <div className='flex w-full justify-start pl-1'>
            <OptionKey className='h-[6px] w-[6px]' />
          </div>
          <div className='flex w-full justify-start pl-1'>
            <span className='block'>option</span>
          </div>
        </KBtn>
        <div className='mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end rounded-[4px] p-[0.5px]'>
          <KBtn className='h-3 w-6' backlit={false}>
            <IconCaretUpFilled className='h-[6px] w-[6px]' />
          </KBtn>
          <div className='flex'>
            <KBtn className='h-3 w-6' backlit={false}>
              <IconCaretLeftFilled className='h-[6px] w-[6px]' />
            </KBtn>
            <KBtn className='h-3 w-6' backlit={false}>
              <IconCaretDownFilled className='h-[6px] w-[6px]' />
            </KBtn>
            <KBtn className='h-3 w-6' backlit={false}>
              <IconCaretRightFilled className='h-[6px] w-[6px]' />
            </KBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SpeakerGrid = () => {
  return (
    <div
      className='mt-2 flex h-40 gap-[2px] px-[0.5px]'
      style={{
        backgroundImage:
          'radial-gradient(circle, var(--macbook-speaker-dot) 0.5px, transparent 0.5px)',
        backgroundSize: '3px 3px',
      }}
    />
  );
};

export const KBtn = ({
  className,
  children,
  childrenClassName,
  backlit = true,
}: {
  className?: string;
  children?: React.ReactNode;
  childrenClassName?: string;
  backlit?: boolean;
}) => {
  return (
    <div
      className='[transform:translateZ(0)] rounded-[4px] p-[0.5px] [will-change:transform]'
      style={
        backlit
          ? {
              background:
                'var(--macbook-key-backlight, rgba(255,255,255,0.18))',
              boxShadow: '0 10px 18px rgba(255,255,255,0.12)',
            }
          : undefined
      }
    >
      <div
        className={cn(
          'flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-[color:var(--macbook-key)]',
          className
        )}
        style={{
          boxShadow:
            '0px -0.5px 2px 0 var(--macbook-key-shadow, #0d0d0f) inset, -0.5px 0px 2px 0 var(--macbook-key-shadow, #0d0d0f) inset',
        }}
      >
        <div
          className={cn(
            'flex w-full flex-col items-center justify-center text-[5px] text-[color:var(--macbook-key-text,rgba(255,255,255,0.82))]',
            childrenClassName,
            backlit &&
              'text-[color:var(--macbook-key-text-active,rgba(255,255,255,0.92))]'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const OptionKey = ({ className }: { className: string }) => {
  return (
    <svg
      fill='none'
      version='1.1'
      id='icon'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 32 32'
      className={className}
    >
      <rect
        stroke='currentColor'
        strokeWidth={2}
        x='18'
        y='5'
        width='10'
        height='2'
      />
      <polygon
        stroke='currentColor'
        strokeWidth={2}
        points='10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 '
      />
      <rect id='_Transparent_Rectangle_' width='32' height='32' stroke='none' />
    </svg>
  );
};
