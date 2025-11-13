'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Gravity, GravityRef, MatterBody } from '@/components/ui/gravity';

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

type BlockConfig = {
  id: string;
  label: string;
  x: string;
  y: number;
  angle: number;
  faceDelay: number;
  isLeft: boolean;
};

const MOBILE_BREAKPOINT = 768;

// Waterfall controls: tune these constants without touching the component body
const FALL_GRAVITY = 0.48; // Controls how quickly blocks sink downward
const AIR_DRAG = 0.085; // Adds watery resistance to falling blocks
const BLOCK_BASE_Y = -240; // Starting Y offset for the first block
const BLOCK_VERTICAL_STEP = 56; // Vertical offset between staggered blocks

export default function BlockFallAnimation() {
  const [faceStage, setFaceStage] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gravityRef = useRef<GravityRef>(null);
  const faceTimeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const hasActiveRunRef = useRef(false);

  const blockConfigs = useMemo<BlockConfig[]>(() => {
    const horizontalWobble = () => (Math.random() - 0.5) * 4;

    return BLOCKS.map((label, index) => {
      const isLeft = index % 2 === 0;
      const stackIndex = Math.floor(index / 2);
      const baseX = isLeft ? 24 : 68;
      const lateralSpread = stackIndex * (isLeft ? 5.5 : -5.5);
      const xValue = baseX + lateralSpread + horizontalWobble();

      return {
        id: `block-${index}`,
        label,
        x: `${xValue}%`,
        y: BLOCK_BASE_Y - stackIndex * BLOCK_VERTICAL_STEP,
        angle: (isLeft ? -1 : 1) * (6 + Math.random() * 6),
        faceDelay: 420 + index * 260,
        isLeft,
      };
    });
  }, []);

  const blockMatterOptions = useMemo(
    () => ({
      friction: 0.24,
      restitution: 0.16,
      density: 0.0016,
      frictionAir: AIR_DRAG,
    }),
    []
  );

  const renderedBlocks = useMemo(
    () =>
      blockConfigs.map((config) => ({
        config,
        node: (
          <div
            className='relative flex h-20 w-36 items-center justify-center rounded-3xl border border-destructive/70 px-5 py-4 text-center text-sm font-semibold text-destructive-foreground shadow-[0_10px_26px_rgba(0,0,0,0.25)] backdrop-blur-sm'
            style={{
              background:
                'linear-gradient(145deg, rgba(var(--color-destructive-rgb),0.95), rgba(var(--color-destructive-rgb),0.75))',
              boxShadow:
                '0 18px 36px rgba(var(--color-destructive-rgb),0.4), 0 0 20px rgba(var(--color-destructive-rgb),0.6)',
            }}
          >
            <span className='leading-tight'>{config.label}</span>
          </div>
        ),
      })),
    [blockConfigs]
  );

  const clearFaceTimeouts = useCallback(() => {
    faceTimeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    faceTimeoutRefs.current = [];
  }, []);

  const scheduleFaceUpdates = useCallback(() => {
    clearFaceTimeouts();

    blockConfigs.forEach((config, index) => {
      const timeoutId = setTimeout(() => {
        setFaceStage((prev) => Math.max(prev, index));
      }, config.faceDelay);
      faceTimeoutRefs.current.push(timeoutId);
    });
  }, [blockConfigs, clearFaceTimeouts]);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const target = containerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting && entry.intersectionRatio > 0.2;

        if (isVisible) {
          gravityRef.current?.stop();
          clearFaceTimeouts();
          setFaceStage(-1);
          scheduleFaceUpdates();
          gravityRef.current?.reset();
          gravityRef.current?.start();
          hasActiveRunRef.current = true;
        } else if (hasActiveRunRef.current && entry.intersectionRatio <= 0.05) {
          gravityRef.current?.stop();
          clearFaceTimeouts();
          hasActiveRunRef.current = false;
        }
      },
      { threshold: [0, 0.2, 0.4], rootMargin: '-10% 0px' }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
      clearFaceTimeouts();
    };
  }, [clearFaceTimeouts, scheduleFaceUpdates]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearFaceTimeouts();
    };
  }, [clearFaceTimeouts]);

  if (isMobile) {
    return (
      <motion.div
        ref={containerRef}
        className='relative w-full rounded-xl border border-border bg-card/80 p-8'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className='mx-auto max-w-2xl'>
          <h3 className='mb-6 text-center text-xl font-bold text-foreground'>
            Business Tasks you have to handle
          </h3>
          <ul className='grid grid-cols-1 gap-3'>
            {BLOCKS.map((block, index) => (
              <motion.li
                key={block}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className='flex items-center gap-3 rounded-lg border border-border bg-card/90 p-3 text-sm text-muted-foreground'
              >
                <span className='inline-block h-2 w-2 flex-shrink-0 rounded-full bg-service-brand' />
                {block}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className='relative flex h-[600px] w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-card shadow-lg backdrop-blur-sm'
      style={{
        background:
          'radial-gradient(circle at 18% 20%, rgba(var(--color-destructive-rgb),0.24), transparent 60%), radial-gradient(circle at 80% 70%, rgba(var(--color-destructive-rgb),0.18), transparent 68%), var(--card)',
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <Gravity
        ref={gravityRef}
        autoStart={false}
        gravity={{ x: 0, y: FALL_GRAVITY }}
        addTopWall={false}
        debug={process.env.NEXT_PUBLIC_GRAVITY_DEBUG === 'true'}
        className='pointer-events-none'
      >
        {renderedBlocks.map(({ config, node }) => (
          <MatterBody
            key={config.id}
            x={config.x}
            y={config.y}
            angle={config.angle}
            matterBodyOptions={blockMatterOptions}
          >
            {node}
          </MatterBody>
        ))}
      </Gravity>

      <motion.div
        className='absolute z-10 flex h-36 w-36 items-center justify-center overflow-visible rounded-full border border-destructive/30 backdrop-blur'
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(255,214,102,0.96), rgba(255,149,0,0.88))',
          boxShadow:
            '0 22px 48px rgba(255,149,0,0.35), 0 0 28px rgba(255,149,0,0.45)',
        }}
        animate={{
          y: [0, -18, 0],
          rotate: faceStage >= 6 ? [-2.2, 2.6, -2.2] : 0,
          scale: faceStage >= 7 ? [1, 1.04, 0.98, 1] : 1,
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          rotate: {
            duration: 1,
            repeat: faceStage >= 6 ? Infinity : 0,
            ease: 'easeInOut',
          },
          scale: {
            duration: 1.2,
            repeat: faceStage >= 7 ? Infinity : 0,
            ease: 'easeInOut',
          },
        }}
      >
        <div className='relative flex h-full w-full flex-col items-center justify-center'>
          <div className='absolute top-6 flex w-full items-center justify-center gap-7'>
            <motion.div
              className='h-2 w-6 rounded-full bg-foreground/80'
              style={{ transformOrigin: 'right center' }}
              animate={{
                rotate: faceStage >= 5 ? -18 : -10,
                y: faceStage >= 6 ? -2 : 0,
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
            <motion.div
              className='h-2 w-6 rounded-full bg-foreground/80'
              style={{ transformOrigin: 'left center' }}
              animate={{
                rotate: faceStage >= 5 ? 18 : 10,
                y: faceStage >= 6 ? -2 : 0,
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
          <div className='relative mb-3 flex w-full items-center justify-center gap-7'>
            <motion.div
              className='h-5 w-4 rounded-full bg-foreground'
              animate={{
                scaleY: faceStage >= 3 ? 1.9 : 1.4,
                scaleX: faceStage >= 6 ? 0.6 : 0.85,
              }}
              transition={{ duration: 0.35 }}
            />
            <motion.div
              className='h-5 w-4 rounded-full bg-foreground'
              animate={{
                scaleY: faceStage >= 3 ? 1.8 : 1.3,
                scaleX: faceStage >= 6 ? 0.7 : 1,
              }}
              transition={{ duration: 0.35 }}
            />
            <AnimatePresence>
              {faceStage >= 4 && (
                <motion.div
                  key='sweat'
                  className='absolute right-5 -top-3 h-6 w-3 rounded-full bg-service-brand/80 shadow-[0_0_12px_rgba(16,185,129,0.35)]'
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    y: [0, 6, 0],
                    x: [0, 1, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </AnimatePresence>
          </div>
          <div className='relative flex h-10 w-16 items-center justify-center'>
            {faceStage < 2 && (
              <motion.div
                className='h-3 w-12 rounded-full bg-foreground/80'
                animate={{ scaleX: [0.9, 1, 0.9] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
            {faceStage >= 2 && faceStage < 5 && (
              <motion.div
                className='h-3 w-12 rounded-full bg-foreground/70'
                animate={{ scaleX: [1, 0.75, 1], y: [0, -1, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
            {faceStage >= 5 && faceStage < 7 && (
              <motion.div
                className='h-8 w-8 rounded-full border-4 border-foreground bg-background'
                animate={{ scale: [1, 1.05, 1], y: [0, 3, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
            {faceStage >= 7 && (
              <motion.div
                className='h-9 w-12 rounded-t-[60%] border-4 border-foreground bg-background'
                animate={{
                  scaleX: [1, 0.9, 1],
                  y: [0, 4, 0],
                }}
                transition={{
                  duration: 0.45,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
