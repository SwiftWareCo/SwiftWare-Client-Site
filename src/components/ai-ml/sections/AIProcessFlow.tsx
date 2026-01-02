'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useInView } from 'motion/react';
import { Upload, Brain, Search, BarChart3 } from 'lucide-react';
import { getColorsFromPath, getColorsRGBFromPath } from '@/lib/colors';

const PROCESS_STEPS = [
  {
    id: 'connect',
    icon: Upload,
    title: 'Connect Your Data',
    description: 'Upload documents or plug into your existing systems',
    side: 'left',
  },
  {
    id: 'learn',
    icon: Brain,
    title: 'AI Learns Your Business',
    description: 'Our AI understands context, not just keywords',
    side: 'right',
  },
  {
    id: 'search',
    icon: Search,
    title: 'Get Answers Instantly',
    description: 'Natural language queries with precise results',
    side: 'left',
  },
  {
    id: 'automate',
    icon: BarChart3,
    title: 'Automate & Scale',
    description: 'Build workflows that run on autopilot',
    side: 'right',
  },
] as const;

interface FlowPath {
  lineD: string;
  arrowD: string;
}

export default function AIProcessFlow() {
  const pathname = usePathname();
  const colors = getColorsFromPath(pathname);
  const colorsRGB = getColorsRGBFromPath(pathname);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<FlowPath[]>([]);
  const [animationStep, setAnimationStep] = useState(-1);

  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const calculatePaths = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const newPaths: FlowPath[] = [];

    for (let i = 0; i < cardRefs.current.length - 1; i++) {
      const startCard = cardRefs.current[i];
      const endCard = cardRefs.current[i + 1];

      if (!startCard || !endCard) continue;

      const startRect = startCard.getBoundingClientRect();
      const endRect = endCard.getBoundingClientRect();

      // Coords relative to container (Exact match 0,0)
      const startRelTop = startRect.top - containerRect.top;
      const startRelLeft = startRect.left - containerRect.left;
      const endRelTop = endRect.top - containerRect.top;
      const endRelLeft = endRect.left - containerRect.left;

      const isStartLeft = i % 2 === 0;

      let startPoint: { x: number; y: number };
      let endPoint: { x: number; y: number };
      let controlPoint1: { x: number; y: number };
      let controlPoint2: { x: number; y: number };

      const gap = 30; // 30px gap from card edge

      if (isStartLeft) {
        // Flow: Left Card (Right Edge) -> Right Card (Left Edge)
        startPoint = {
          x: startRelLeft + startRect.width + gap,
          y: startRelTop + startRect.height / 2,
        };
        endPoint = { x: endRelLeft - gap, y: endRelTop + endRect.height / 2 };

        // Midpoint control
        const midX = (startPoint.x + endPoint.x) / 2;
        controlPoint1 = { x: midX, y: startPoint.y };
        controlPoint2 = { x: midX, y: endPoint.y };
      } else {
        // Flow: Right Card (Left Edge) -> Next Left Card (Right Edge)
        startPoint = {
          x: startRelLeft - gap,
          y: startRelTop + startRect.height / 2,
        };
        endPoint = {
          x: endRelLeft + endRect.width + gap,
          y: endRelTop + endRect.height / 2,
        };

        // S-curve back across
        controlPoint1 = { x: startPoint.x - 150, y: startPoint.y + 50 };
        controlPoint2 = { x: endPoint.x + 150, y: endPoint.y - 50 };
      }

      // 1. Line Path
      const lineD = `M ${startPoint.x} ${startPoint.y} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${endPoint.x} ${endPoint.y}`;

      // 2. Arrow Head Path
      const dx = endPoint.x - controlPoint2.x;
      const dy = endPoint.y - controlPoint2.y;
      const angle = Math.atan2(dy, dx);
      const arrowLength = 16;
      const arrowAngle = Math.PI / 6;

      const wing1X = endPoint.x - arrowLength * Math.cos(angle - arrowAngle);
      const wing1Y = endPoint.y - arrowLength * Math.sin(angle - arrowAngle);
      const wing2X = endPoint.x - arrowLength * Math.cos(angle + arrowAngle);
      const wing2Y = endPoint.y - arrowLength * Math.sin(angle + arrowAngle);

      // Arrow path: Wing1 -> Tip -> Wing2
      // Drawing it as M wing1 L tip L wing2
      const arrowD = `M ${wing1X} ${wing1Y} L ${endPoint.x} ${endPoint.y} L ${wing2X} ${wing2Y}`;

      newPaths.push({ lineD, arrowD });
    }

    setPaths(newPaths);
  }, []);

  useEffect(() => {
    const timer = setTimeout(calculatePaths, 100);
    window.addEventListener('resize', calculatePaths);
    return () => {
      window.removeEventListener('resize', calculatePaths);
      clearTimeout(timer);
    };
  }, [calculatePaths]);

  useEffect(() => {
    if (!isInView) return;
    setAnimationStep(-1);

    // Total steps = cards (4) + paths (3) = 7 steps (0 to 6)
    const totalSteps = PROCESS_STEPS.length * 2;
    let step = 0;

    const interval = setInterval(() => {
      setAnimationStep(step);
      step++;
      if (step >= totalSteps) clearInterval(interval);
    }, 600);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section className='py-24 overflow-hidden'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6'>
        <div className='mb-20 text-center'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='mb-6 text-3xl font-bold text-foreground sm:text-4xl'
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='mx-auto max-w-2xl text-lg text-muted-foreground'
          >
            From raw data to intelligent automation in four simple steps
          </motion.p>
        </div>

        {/* Container for Cards + SVG */}
        <div ref={containerRef} className='relative mx-auto max-w-6xl'>
          {/* SVG Layer */}
          <svg
            className='pointer-events-none absolute inset-0 h-full w-full overflow-visible'
            style={{ zIndex: 0 }}
          >
            <defs>
              <linearGradient id='line-gradient' gradientUnits='userSpaceOnUse'>
                <stop offset='0%' stopColor={colors.primary} />
                <stop offset='100%' stopColor={colors.secondary} />
              </linearGradient>
            </defs>
            {paths.map((path, i) => {
              const isActive = animationStep >= i * 2 + 1;
              return (
                <g key={i}>
                  {/* Main Line */}
                  <motion.path
                    d={path.lineD}
                    fill='none'
                    stroke={`url(#line-gradient)`}
                    strokeWidth='4'
                    strokeLinecap='round'
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                      isActive
                        ? { pathLength: 1, opacity: 1 }
                        : { pathLength: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />
                  {/* Arrow Head - Delayed */}
                  <motion.path
                    d={path.arrowD}
                    fill='none'
                    stroke={`url(#line-gradient)`}
                    strokeWidth='4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                      isActive
                        ? { pathLength: 1, opacity: 1 }
                        : { pathLength: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3, ease: 'circOut', delay: 0.6 }} // Start after line finishes
                  />
                </g>
              );
            })}
          </svg>

          {/* Cards Grid */}
          <div className='grid grid-cols-1 gap-y-24 md:grid-cols-2 md:gap-x-64 relative z-10'>
            {PROCESS_STEPS.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={step.id}
                  className={`${isEven ? 'md:col-start-1 md:pr-12' : 'md:col-start-2 md:mt-24 md:pl-12'}`}
                >
                  <motion.div
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={
                      animationStep >= i * 2
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 30, scale: 0.95 }
                    }
                    transition={{ duration: 0.5, ease: 'backOut' }}
                    className='relative rounded-2xl border bg-card/50 p-8 backdrop-blur-sm shadow-xl'
                    style={{
                      borderColor: `rgba(${colorsRGB.primaryRGB}, 0.2)`,
                    }}
                  >
                    <div
                      className='absolute -top-5 -left-5 flex h-10 w-10 items-center justify-center rounded-full text-base font-bold text-white shadow-lg'
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                      }}
                    >
                      {i + 1}
                    </div>

                    <div
                      className='mb-6 inline-flex rounded-xl p-3'
                      style={{
                        background: `rgba(${colorsRGB.primaryRGB}, 0.1)`,
                      }}
                    >
                      <step.icon
                        className='h-8 w-8'
                        style={{ color: colors.primary }}
                      />
                    </div>

                    <h3 className='mb-3 text-xl font-bold'>{step.title}</h3>
                    <p className='text-muted-foreground leading-relaxed'>
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
