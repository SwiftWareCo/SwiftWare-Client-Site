'use client';
import { useRef, useMemo, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  MotionValue,
  useSpring,
  useMotionValueEvent,
  type Variants,
} from 'motion/react';
import { SwiftwareWayVisuals } from './SwiftwareWayVisuals';
import { Zap, Code, Search, LucideIcon } from 'lucide-react';

// New: Floating Dots Background Component
const FloatingDotsBackground = () => {
  const dots = useMemo(
    () =>
      Array.from({ length: 42 }, () => {
        const duration = Math.random() * 20 + 10;
        return {
          size: Math.random() * 3 + 1,
          duration,
          delay: Math.random() * -duration,
          xStart: Math.random() * 100,
          yStart: Math.random() * 100,
        };
      }),
    []
  );

  return (
    <div className='absolute inset-0 overflow-hidden'>
      {dots.map((dot, index) => (
        <motion.div
          key={`floating-dot-${index}`}
          className='absolute rounded-full bg-foreground opacity-20'
          style={{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            left: `${dot.xStart}%`,
            top: `${dot.yStart}%`,
            animation: `float ${dot.duration}s ${dot.delay}s infinite linear`,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0);
            opacity: 0.1;
          }
          50% {
            transform: translate(10px, 20px);
            opacity: 0.7;
          }
          100% {
            transform: translate(0, 0);
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  );
};

interface SwiftwareStep {
  number: number;
  title: string;
  description: string;
  colorVar: string;
  icon?: LucideIcon;
}

const swiftwareSteps: SwiftwareStep[] = [
  {
    number: 1,
    title: 'Foundation: Brand Identity',
    description:
      "This isn't just a logo. It's the blueprint for everything that follows, dictating the language for your marketing, the design of your software, and the voice of your AI chatbot.",
    colorVar: '--color-service-brand',
  },
  {
    number: 2,
    title: 'Engine: Digital Marketing & SEO',
    description:
      'This is your engine. We build marketing funnels that plug directly into your custom software, informing your website build from day one, not as an afterthought.',
    icon: Search,
    colorVar: '--color-service-marketing',
  },
  {
    number: 3,
    title: 'Framework: Custom Software',
    description:
      'This is the framework holding it all together. Your website or app is built to serve your brand, execute your marketing, and run your automations.',
    icon: Code,
    colorVar: '--color-service-software',
  },
  {
    number: 4,
    title: 'Flywheel: AI & Process Automation',
    description:
      'This is your flywheel. When Marketing captures a lead, our Automation instantly responds, making your entire system work for you 24/7.',
    icon: Zap,
    colorVar: '--color-service-ai',
  },
];

const useSequentialReveal = (
  progress: MotionValue<number>,
  delay: number
) => {
  const appearStart = Math.min(0.08 + delay, 0.92);
  const appearPeak = Math.min(appearStart + 0.18, 0.96);
  const exitStart = 0.92;

  const opacity = useTransform(
    progress,
    [0, appearStart, appearPeak, exitStart, 1],
    [0, 0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [0, appearStart, appearPeak, 1],
    [20, 20, 0, 0]
  );
  const scale = useTransform(
    progress,
    [0, appearStart, appearPeak],
    [0.96, 0.96, 1]
  );

  return { opacity, y, scale };
};

const Scene = ({
  step,
  progress,
  isActive,
}: {
  step: SwiftwareStep;
  progress: MotionValue<number>;
  isActive: boolean;
}) => {
  const opacity = useTransform(progress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const y = useTransform(progress, [0, 0.25, 0.75, 1], [24, 0, 0, -24]);
  const blur = useTransform(
    progress,
    [0, 0.25, 0.75, 1],
    ['blur(12px)', 'blur(0px)', 'blur(0px)', 'blur(12px)']
  );

  const badgeMotion = useSequentialReveal(progress, 0);
  const titleMotion = useSequentialReveal(progress, 0.07);
  const bodyMotion = useSequentialReveal(progress, 0.14);

  return (
    <motion.div
      style={{
        opacity,
        y,
        filter: blur,
        pointerEvents: isActive ? 'auto' : 'none',
      }}
      className='absolute inset-0 flex flex-col justify-center p-8 lg:p-12'
    >
      <motion.div
        className='inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 font-bold text-lg text-background'
        style={{ background: `var(${step.colorVar})` }}
        {...badgeMotion}
      >
        {step.number}
      </motion.div>
      <motion.h3
        className='text-2xl sm:text-3xl font-bold mb-3'
        style={{ color: `var(${step.colorVar})` }}
        {...titleMotion}
      >
        {step.title}
      </motion.h3>
      <motion.p
        className='text-base sm:text-lg leading-relaxed text-muted-foreground'
        {...bodyMotion}
      >
        {step.description}
      </motion.p>
    </motion.div>
  );
};

const TextScene = ({
  step,
  scrollYProgress,
  start,
  end,
}: {
  step: SwiftwareStep;
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
}) => {
  const rawProgress = useTransform(scrollYProgress, [start, end], [0, 1]);
  const progress = useSpring(rawProgress, {
    stiffness: 120, // Sets responsiveness for the scroll-driven transition.
    damping: 32, // Softens the handoff between steps to avoid snapping.
    restDelta: 0.0005, // Prevents subtle jitter once motion settles.
  });

  const [isActiveBool, setIsActiveBool] = useState(false);

  useMotionValueEvent(progress, 'change', (value) => {
    // Treat the scene as interactive only while the spring is mid-flight.
    const isActive = value > 0.02 && value < 0.98;
    setIsActiveBool((prev) => (prev === isActive ? prev : isActive));
  });

  return <Scene step={step} progress={progress} isActive={isActiveBool} />;
};

const titleWords = 'The Swiftware Way'.split(' ');

const titleContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.08, // Gives the underline glow a head start.
      staggerChildren: 0.14, // Spaces out word reveals for readability.
    },
  },
};

const titleWordVariants: Variants = {
  hidden: { opacity: 0, y: 36, rotateX: -70, filter: 'blur(14px)' },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring', // Adds a lively ease to each word entrance.
      damping: 18, // Dampens bounce to avoid overshoot.
      stiffness: 150, // Keeps the reveal punchy and quick.
    },
  },
};

const titleUnderlineVariants: Variants = {
  hidden: { scaleX: 0.6, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 0.4,
    transition: {
      duration: 0.7, // Controls how fast the glow stretches across.
      ease: 'easeOut', // Keeps the underline expansion smooth.
    },
  },
};

const AnimatedTitle = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div className='relative  flex flex-col items-center'>
      <motion.h2
        ref={ref}
        className='text-balance text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-center tracking-tight bg-clip-text text-service-brand drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]'
        style={{
          backgroundImage:
            'linear-gradient(90deg, var(--color-primary-service, var(--color-service-brand)), var(--color-secondary-service, var(--color-service-ai)))',
        }}
        variants={titleContainerVariants}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        {titleWords.map((word) => (
          <motion.span
            key={word}
            variants={titleWordVariants}
            className='inline-block px-3'
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>
      <motion.span
        aria-hidden
        className='pointer-events-none absolute inset-x-12 -bottom-2 h-2 rounded-full blur-xl'
        style={{
          background:
            'radial-gradient(circle, var(--color-secondary-service, var(--color-service-ai)) 0%, transparent 70%)',
        }}
        variants={titleUnderlineVariants}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      />
    </div>
  );
};

export const TheSwiftwareWay = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const numScenes = swiftwareSteps.length;
  // Allocate first 15% of scroll to title, rest to scenes
  const sceneBreakpoints = Array.from(
    { length: numScenes },
    (_, i) => 0.15 + (i / numScenes) * 0.85
  );
  const visualsProgress = useTransform(scrollYProgress, [0.15, 1], [0, 1]);

  return (
    <section
      ref={targetRef}
      className='relative z-10 h-[800vh]'
      style={{ position: 'relative' }}
    >
      <div className='sticky top-0 flex h-screen w-full items-center overflow-hidden'>
        <motion.div
          className='absolute w-full top-0 left-0 h-full'
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
            y: useTransform(scrollYProgress, [0.1, 0.15], ['0%', '-100%']),
          }}
        >
          <div className='relative h-full w-full'>
            <FloatingDotsBackground />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <AnimatedTitle />
            </div>
          </div>
        </motion.div>

        <div className='relative grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl mx-auto px-6'>
          {/* Left Side: Visuals */}
          <motion.div
            className='h-full w-full flex items-center justify-center'
            style={{
              opacity: useTransform(scrollYProgress, [0.1, 0.15], [0, 1]),
            }}
          >
            <SwiftwareWayVisuals scrollYProgress={visualsProgress} />
          </motion.div>

          {/* Right Side: Text Content */}
          <div className='relative h-[50vh] lg:h-auto flex items-center justify-center'>
            {swiftwareSteps.map((step, i) => {
              const start = sceneBreakpoints[i];
              const end = sceneBreakpoints[i + 1] ?? 1.0;
              return (
                <TextScene
                  key={step.number}
                  step={step}
                  scrollYProgress={scrollYProgress}
                  start={start}
                  end={end}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheSwiftwareWay;
