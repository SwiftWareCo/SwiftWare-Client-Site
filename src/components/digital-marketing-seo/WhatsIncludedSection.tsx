'use client';
import { motion } from 'motion/react';
import Icon from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

const features = [
  {
    name: 'Local SEO',
    description: 'Getting you found on Google Maps and in local searches.',
    iconName: 'MapPin',
  },
  {
    name: 'Content Marketing',
    description: 'Blog posts and videos that prove your expertise.',
    iconName: 'FileText',
  },
  {
    name: 'Social Media (SMMA)',
    description: 'Building your brand and trust on Instagram & Facebook.',
    iconName: 'ThumbsUp',
  },
  {
    name: 'Paid Ads (PPC)',
    description: 'Running targeted Google & Facebook ads for immediate leads.',
    iconName: 'Target',
  },
  {
    name: 'Reputation Management',
    description: 'Helping you get and showcase 5-star reviews.',
    iconName: 'Star',
  },
  {
    name: 'Analytics & Reporting',
    description: "Transparent reports showing what's working and why.",
    iconName: 'BarChart2',
  },
] as const;

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6, // Keeps the overall reveal smooth without lingering.
      ease: [0.25, 0.1, 0.25, 1] as const, // Governs section reveal pacing.
      staggerChildren: 0.12, // Cascades heading and cards in quick succession.
    },
  },
} as const;

const headingVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45, // Nudges headings on-screen before the audience scrolls past.
      ease: [0.22, 1, 0.36, 1] as const, // Gives the copy a polished deceleration.
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, // Pops cards into place briskly.
      ease: 'easeOut' as const, // Smooths the final few pixels of travel.
    },
  },
} as const;

interface WhatsIncludedSectionProps {
  className?: string;
  tone?: 'default' | 'contrast';
}

export const WhatsIncludedSection = ({
  className,
  tone = 'default',
}: WhatsIncludedSectionProps) => {
  const headingColor =
    tone === 'contrast' ? 'text-secondary-foreground' : 'text-foreground';
  const bodyColor =
    tone === 'contrast'
      ? 'text-secondary-foreground opacity-80'
      : 'text-foreground opacity-80';
  const cardClasses =
    tone === 'contrast'
      ? 'flex flex-col rounded-2xl border p-6 shadow-lg'
      : 'flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm';
  const cardStyle =
    tone === 'contrast'
      ? {
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
        }
      : undefined;
  const iconClasses = cn(
    'h-9 w-9 flex-none rounded-xl p-2 text-secondary-foreground',
    tone === 'default' && 'bg-service-marketing-dark'
  );
  const iconStyle =
    tone === 'contrast'
      ? { backgroundColor: 'rgba(255, 255, 255, 0.15)' }
      : undefined;

  return (
    <motion.section
      className={cn('py-16 sm:py-24', className)}
      variants={sectionVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
    >
      <motion.div
        className='mx-auto max-w-7xl px-6 lg:px-8'
        variants={headingVariants}
      >
        <motion.div
          className='mx-auto max-w-2xl lg:text-center'
          variants={headingVariants}
        >
          <motion.h2
            className={cn(
              'text-sm font-semibold uppercase tracking-wide',
              headingColor
            )}
            variants={headingVariants}
          >
            The Engine Parts
          </motion.h2>
          <motion.p
            className={cn(
              'mt-2 text-3xl font-bold tracking-tight sm:text-4xl',
              headingColor
            )}
            variants={headingVariants}
          >
            What&apos;s Included in Your Marketing Engine
          </motion.p>
          <motion.p
            className={cn('mt-6 text-lg leading-8', bodyColor)}
            variants={headingVariants}
          >
            We provide a comprehensive suite of services designed to work
            together, creating a powerful, lead-generating system for your
            business.
          </motion.p>
        </motion.div>
        <motion.div
          className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'
          variants={headingVariants}
        >
          <motion.dl
            className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'
            variants={headingVariants}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                className={cardClasses}
                style={cardStyle}
                variants={cardVariants}
              >
                <dt
                  className={cn(
                    'flex items-center gap-x-3 text-base font-semibold leading-7',
                    headingColor
                  )}
                >
                  <span className={iconClasses} style={iconStyle}>
                    <Icon
                      name={feature.iconName}
                      className='h-full w-full'
                      aria-hidden
                    />
                  </span>
                  {feature.name}
                </dt>
                <dd
                  className={cn(
                    'mt-4 flex flex-auto flex-col text-base leading-7',
                    bodyColor
                  )}
                >
                  <p className='flex-auto'>{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
