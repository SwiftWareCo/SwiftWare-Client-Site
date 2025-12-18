'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1.2, isMobile ? 1 : 1.5]
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0.6, isMobile ? 1 : 1.5]
  );
  const translate = useTransform(scrollYProgress, [0, 1], [0, 1200]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const screenSrc = src ?? '/images/SEOResults.png';

  return (
    <div
      ref={ref}
      className='flex min-h-[160vh] shrink-0 scale-[0.35] flex-col items-center justify-start overflow-visible py-0 [perspective:800px] sm:scale-50 md:scale-100 md:py-32'
    >
      <motion.h2
        style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
        className='mb-16 text-center text-3xl font-bold text-foreground sm:mb-20'
      >
        {title || (
          <span>
            This Macbook is built with Tailwindcss.
            <br />
            No kidding.
          </span>
        )}
      </motion.h2>
      <Lid
        src={screenSrc}
        scaleX={scaleX}
        scaleY={scaleY}
        rotate={rotate}
        translate={translate}
      />
      <div
        className='relative -z-10 h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-[color:var(--macbook-base)]'
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
};

interface LidProps {
  scaleX: MotionValue<number>;
  scaleY: MotionValue<number>;
  rotate: MotionValue<number>;
  translate: MotionValue<number>;
  src?: string;
}

export const Lid = ({ scaleX, scaleY, rotate, translate, src }: LidProps) => {
  const displaySrc = src ?? '/images/SEOResults.png';

  return (
    <div className='relative [perspective:800px]'>
      <div
        style={{
          transform: 'perspective(800px) rotateX(-25deg) translateZ(0px)',
          transformOrigin: 'bottom',
          transformStyle: 'preserve-3d',
        }}
        className='relative h-[12rem] w-[32rem] rounded-2xl bg-[color:var(--macbook-shell)] p-2'
      >
        <div
          style={{
            boxShadow: '0px 2px 0px 2px var(--macbook-shell-highlight) inset',
          }}
          className='absolute inset-0 flex items-center justify-center rounded-xl bg-[color:var(--macbook-shell)]'
        >
          <span className='text-secondary-foreground'>
            <AceternityLogo />
          </span>
        </div>
      </div>
      <motion.div
        style={{
          scaleX,
          scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: 'preserve-3d',
          transformOrigin: 'top',
        }}
        className='absolute inset-0 h-96 w-[32rem] rounded-2xl bg-[color:var(--macbook-shell)] p-2'
      >
        <div className='absolute inset-0 rounded-xl bg-[color:var(--macbook-screen)]' />
        <Image
          src={displaySrc}
          alt='analytics dashboard mockup'
          fill
          sizes='(max-width: 768px) 100vw, 1152px'
          quality={100}
          className='absolute inset-0 rounded-xl object-cover object-left-top'
          priority
          fetchPriority="high"
        />
      </motion.div>
    </div>
  );
};

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

const AceternityLogo = () => {
  return (
    <svg
      width='66'
      height='65'
      viewBox='0 0 66 65'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='h-3 w-3 text-secondary-foreground'
    >
      <path
        d='M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696'
        stroke='currentColor'
        strokeWidth='15'
        strokeMiterlimit='3.86874'
        strokeLinecap='round'
      />
    </svg>
  );
};
