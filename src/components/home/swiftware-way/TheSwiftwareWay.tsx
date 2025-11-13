'use client';
import { useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  MotionValue,
} from 'motion/react';
import { SwiftwareWayVisuals } from './SwiftwareWayVisuals';
import { Zap, Code, Search, LucideIcon } from 'lucide-react';
import React from 'react';

// New: Floating Dots Background Component
const FloatingDotsBackground = () => {
  const dots = Array.from({ length: 50 }); // Create 50 dots

  return (
    <div className='absolute inset-0 overflow-hidden'>
      {dots.map((_, i) => {
        const size = Math.random() * 3 + 1; // Random size between 1px and 4px
        const duration = Math.random() * 20 + 10; // Random duration between 10s and 30s
        const delay = Math.random() * -duration; // Random delay
        const xStart = Math.random() * 100;
        const yStart = Math.random() * 100;

        const animation = `float ${duration}s ${delay}s infinite linear`;

        return (
          <motion.div
            key={i}
            className='absolute rounded-full bg-white/40'
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${xStart}%`,
              top: `${yStart}%`,
              animation,
              x: `${xStart}%`,
              y: `${yStart}%`,
            }}
            initial={{
              '--x-start': `${xStart}%`,
              '--y-start': `${yStart}%`,
            }}
          />
        );
      })}
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

const Scene = ({
  step,
  progress,
  isActive,
}: {
  step: SwiftwareStep;
  progress: MotionValue<number>;
  isActive: boolean;
}) => {
  const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(progress, [0, 0.2, 0.8, 1], [20, 0, 0, -20]);

  return (
    <motion.div
      style={{ opacity, y, pointerEvents: isActive ? 'auto' : 'none' }}
      className='absolute inset-0 flex flex-col justify-center p-8 lg:p-12'
    >
      <div
        className='inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 text-white font-bold text-lg'
        style={{ background: `var(${step.colorVar})` }}
      >
        {step.number}
      </div>
      <h3
        className='text-2xl sm:text-3xl font-bold mb-3'
        style={{ color: `var(${step.colorVar})` }}
      >
        {step.title}
      </h3>
      <p className='text-base sm:text-lg leading-relaxed text-muted-foreground'>
        {step.description}
      </p>
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
  const progress = useTransform(scrollYProgress, [start, end], [0, 1]);
  const isActive = useTransform(progress, (p) => p > 0 && p < 1);

  // We need to subscribe to the motion value to get a boolean
  const [isActiveBool, setIsActiveBool] = React.useState(false);
  useEffect(() => {
    return isActive.on('change', (v) => setIsActiveBool(v));
  }, [isActive]);

  return <Scene step={step} progress={progress} isActive={isActiveBool} />;
};

const titleWords = 'The Swiftware Way'.split(' ');

const titleContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 30, rotateX: -90, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      damping: 15,
      stiffness: 100,
      duration: 0.5,
    },
  },
};

const AnimatedTitle = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.h2
      ref={ref}
      className='text-6xl lg:text-8xl font-bold text-center py-4 from-blue-500 to-purple-700 bg-gradient-to-r bg-clip-text text-blue-500'
      variants={titleContainerVariants}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
    >
      {titleWords.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className='inline-block mr-4'
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
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
            background:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%)',
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