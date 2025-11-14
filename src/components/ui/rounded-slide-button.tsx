'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';

interface RoundedSlideButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  autoAnimate?: boolean;
}

const buttonVariants = {
  idle: {
    scale: 1, // baseline scale keeps the button stable when untouched
    transition: {
      duration: 0.35, // quick response to feel snappy
      ease: [0.16, 1, 0.3, 1] as const, // matches the brand's energetic easing curve
    },
  },
  hover: {
    scale: 1.03, // subtle growth to imply depth on hover
    transition: {
      duration: 0.3, // slightly longer so the movement feels fluid
      ease: [0.22, 1, 0.36, 1] as const, // elastic ease keeps the motion playful
    },
  },
  pulse: {
    scale: [1, 1.05, 1], // gentle pulse loop to draw attention when auto animating
    transition: {
      duration: 0.85, // brisk attention tap without overstaying its welcome
      ease: 'easeInOut' as const, // mirrored ease for symmetric pulsing
    },
  },
  tap: {
    scale: 0.96, // quick compress on press for tactile feedback
    transition: {
      duration: 0.2, // short press response keeps the button lively
      ease: [0.16, 1, 0.3, 1] as const, // same energy curve for consistency
    },
  },
};

const gradientVariants = {
  idle: {
    opacity: 1, // solid gradient fill when resting
    scale: 1, // cover the button surface edge-to-edge
  },
  hover: {
    opacity: 0, // fade gradient to reveal the elevated surface colour
    scale: 1.02, // expand a touch to create a glowing halo
    transition: {
      duration: 0.35, // quick expansion so hover feels responsive
      ease: 'easeOut' as const, // soft ease that drifts outward
    },
  },
};

const borderVariants = {
  idle: {
    opacity: 0, // keep border invisible until hover
    borderColor: 'rgba(0,0,0,0)', // transparent border when resting
  },
  hover: {
    opacity: 1, // fade border in to outline the button
    borderColor: 'var(--color-primary-service)', // use primary accent for the frame
    transition: {
      duration: 0.35, // match gradient timing for a cohesive reveal
      ease: 'easeOut' as const, // soft fade for the outline
    },
  },
};

const sheenVariants = {
  rest: {
    x: '-120%', // park the sheen off-screen until interaction
    opacity: 0, // keep the sheen hidden until it animates across
  },
  sweep: {
    x: '220%', // travel across the button surface for a shimmer
    opacity: 1, // briefly reveal the sheen while it sweeps across
    transition: {
      duration: 0.8, // slow sweep to feel premium rather than flashy
      ease: [0.33, 1, 0.68, 1] as const, // graceful ease for the highlight pass
    },
  },
};

const contentVariants = {
  idle: {
    color: 'var(--foreground)', // match the page's foreground colour by default
  },
  hover: {
    color: 'var(--color-primary-service)', // switch to primary accent when gradient fades back
    transition: {
      duration: 0.35, // sync with gradient fade so the shift feels intentional
      ease: 'easeOut' as const, // smooth hand-off between colors
    },
  },
};

const iconVariants = {
  idle: {
    x: 0, // keep icon aligned with label at rest
  },
  hover: {
    x: 6, // slide the icon forward to suggest movement
    transition: {
      duration: 0.4, // match hover timing for cohesive effect
      ease: [0.22, 1, 0.36, 1] as const, // lively ease that complements the tilt
    },
  },
};

export function RoundedSlideButton({
  onClick,
  children = 'Get in touch',
  className = '',
  autoAnimate = false,
}: RoundedSlideButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverOrFocus = () => setIsHovered(true);
  const relax = () => setIsHovered(false);

  const animationState = useMemo(() => {
    if (isHovered) {
      return 'hover';
    }
    return autoAnimate ? 'pulse' : 'idle';
  }, [autoAnimate, isHovered]);

  const surfaceState = isHovered || autoAnimate ? 'hover' : 'idle';
  const shouldSweep = isHovered || autoAnimate;

  return (
    <motion.button
      className={`relative flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-background px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-foreground transition-colors duration-300 cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-service)] ${className}`}
      onClick={onClick}
      onMouseEnter={hoverOrFocus}
      onMouseLeave={relax}
      onFocus={hoverOrFocus}
      onBlur={relax}
      variants={buttonVariants}
      initial='idle'
      animate={animationState}
      whileTap='tap'
      type='button'
    >
      <motion.span
        className='absolute inset-0 rounded-[inherit]'
        style={{
          backgroundImage: `linear-gradient(135deg, var(--color-primary-service), var(--color-secondary-service))`,
        }}
        variants={gradientVariants}
        initial='idle'
        animate={surfaceState}
      />

      <motion.span
        className='absolute inset-[1px] rounded-[inherit] border-[1.5px]'
        variants={borderVariants}
        initial='idle'
        animate={surfaceState}
      />

      <motion.span
        className='pointer-events-none absolute -inset-1 opacity-0'
        variants={sheenVariants}
        initial='rest'
        animate={shouldSweep ? 'sweep' : 'rest'}
        style={{
          background:
            'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
      />

      <motion.span
        className='relative z-10 flex items-center gap-2'
        variants={contentVariants}
        initial='idle'
        animate={surfaceState}
      >
        <motion.span
          variants={iconVariants}
          initial='idle'
          animate={surfaceState}
        >
          <ArrowRight className='size-4' />
        </motion.span>
        <span>{children}</span>
      </motion.span>
    </motion.button>
  );
}
