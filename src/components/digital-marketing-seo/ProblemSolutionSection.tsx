'use client';

import { motion } from 'motion/react';
import {
  BarChart3,
  CheckCircle,
  Compass,
  PieChart,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProblemSolutionSectionProps {
  className?: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6, // Gives the hero copy enough glide time to feel considered.
      ease: [0.22, 1, 0.36, 1] as const, // Eases the entire section into view smoothly.
      staggerChildren: 0.16, // Cascades children for a layered entrance.
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5, // Snaps cards into position before attention drifts.
      ease: 'easeOut' as const, // Lets each element decelerate with a premium feel.
    },
  },
} as const;

const listItemVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4, // Keeps executive signal bullets tight and punchy.
      ease: 'easeOut' as const, // Slides signals in for emphasis.
    },
  },
} as const;

const stepVariants = {
  hidden: { opacity: 0, x: 18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45, // Spaces each playbook move so the sequence reads clearly.
      ease: 'easeOut' as const, // Aligns solution steps with forward momentum.
    },
  },
} as const;

const statVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5, // Lets the KPI tiles breathe as they scale into view.
      ease: [0.16, 1, 0.3, 1] as const, // Gently scales KPIs to draw focus without jolting.
    },
  },
} as const;

const executiveSignals = [
  'Lead flow surges and vanishes with no pattern.',
  'Your brand shows up after competitors on every comparison.',
  'Inbound calls focus on price instead of value.',
];

const playbookSteps = [
  {
    title: 'Market Intelligence Sprint',
    body: 'We benchmark competitors, content velocity, and share of voice to define where you must win.',
    icon: Compass,
  },
  {
    title: 'Demand Engine Build',
    body: 'SEO, paid search, and dark social campaigns are orchestrated around one operating calendar.',
    icon: BarChart3,
  },
  {
    title: 'Revenue Signal Loop',
    body: 'Live dashboards translate traffic, calls, and booked work into a forecast the board trusts.',
    icon: PieChart,
  },
];

const kpiTiles = [
  { metric: '+187%', label: 'Lift in qualified pipeline (6 months)' },
  { metric: '4.6x', label: 'Return on media efficiency' },
  { metric: '<21 days', label: 'Average time-to-first Page 1 ranking' },
];

export const ProblemSolutionSection = ({
  className,
}: ProblemSolutionSectionProps) => {
  return (
    <motion.section
      className={cn('relative overflow-hidden py-20 sm:py-28', className)}
      variants={sectionVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
    >
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--color-primary-service-rgb),0.12),transparent_60%)]' />
      <motion.div
        className='relative mx-auto max-w-6xl px-6 lg:px-8'
        variants={cardVariants}
      >
        <motion.span
          variants={cardVariants}
          className='inline-flex items-center rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-service-marketing'
        >
          Why your marketing is stalled
        </motion.span>
        <motion.h2
          variants={cardVariants}
          className='mt-6 text-3xl font-bold leading-tight text-foreground sm:text-4xl'
        >
          Remove the friction between demand, trust, and booked work.
        </motion.h2>
        <motion.p
          variants={cardVariants}
          className='mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg'
        >
          We audit every touchpoint from search query to booked engagement, then
          orchestrate the digital moves that make your brand the inevitable
          choice in-market.
        </motion.p>

        <div className='mt-14 grid gap-10 lg:grid-cols-[1.05fr_1fr]'>
          <motion.article
            variants={cardVariants}
            className='relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-[0_18px_48px_rgba(var(--color-primary-service-rgb),0.1)]'
          >
            <div className='flex items-center gap-3'>
              <XCircle className='h-8 w-8 text-destructive' />
              <h3 className='text-2xl font-semibold text-destructive'>
                Patterns that signal risk
              </h3>
            </div>
            <p className='mt-3 text-base text-muted-foreground'>
              Your growth plateaus long before revenue does. These are the red
              flags we watch for during onboarding.
            </p>
            <ul className='mt-6 space-y-4'>
              {executiveSignals.map((signal) => (
                <motion.li
                  key={signal}
                  variants={listItemVariants}
                  className='flex items-start gap-3 rounded-xl bg-destructive/5 p-4'
                >
                  <span className='mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive/20'>
                    <XCircle className='h-4 w-4 text-destructive' />
                  </span>
                  <p className='text-sm text-muted-foreground'>{signal}</p>
                </motion.li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            variants={cardVariants}
            className='relative overflow-hidden rounded-2xl border border-service-marketing/40 bg-card p-8 shadow-[0_20px_54px_rgba(var(--color-secondary-service-rgb),0.16)]'
          >
            <div className='flex items-center gap-3'>
              <CheckCircle className='h-8 w-8 text-service-marketing-dark' />
              <h3 className='text-2xl font-semibold text-service-marketing-dark'>
                How we rebuild momentum
              </h3>
            </div>
            <p className='mt-3 text-base text-muted-foreground'>
              A full-demand operating system, tuned for service brands that need
              predictability over flash-in-the-pan wins.
            </p>
            <div className='mt-6 space-y-5'>
              {playbookSteps.map((step) => (
                <motion.div
                  key={step.title}
                  variants={stepVariants}
                  className='flex gap-4 rounded-xl border border-border/60 bg-background/70 p-4 backdrop-blur'
                >
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-service-marketing/10 text-service-marketing-dark'>
                    <step.icon className='h-5 w-5' />
                  </div>
                  <div>
                    <h4 className='text-base font-semibold text-foreground'>
                      {step.title}
                    </h4>
                    <p className='mt-1 text-sm text-muted-foreground'>
                      {step.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.article>
        </div>

        <motion.div
          variants={cardVariants}
          className='mt-14 rounded-2xl border border-border bg-background/80 p-6 md:p-8'
        >
          <div className='grid gap-6 md:grid-cols-3'>
            {kpiTiles.map((kpi) => (
              <motion.div
                key={kpi.metric}
                variants={statVariants}
                className='rounded-xl bg-card p-5 text-center shadow-[0_12px_30px_rgba(var(--color-primary-service-rgb),0.12)]'
              >
                <p className='text-3xl font-bold text-service-marketing-dark'>
                  {kpi.metric}
                </p>
                <p className='mt-2 text-sm text-muted-foreground'>
                  {kpi.label}
                </p>
              </motion.div>
            ))}
          </div>
          <p className='mt-6 text-center text-sm text-muted-foreground'>
            Every engagement is paired with executive-ready reporting, so you
            have the confidence to act decisively each quarter.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
