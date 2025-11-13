/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { BrandProblemSolution } from '@/components/brand-design/BrandProblemSolution';
import { BrandDeliverablesShowcase } from '@/components/brand-design/BrandDeliverablesShowcase';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { SpikeDivider } from '@/components/sections/SpikeDivider';

const CARD_HEIGHT = 1200; // fixed height in pixels

interface CardConfig {
  id: number;
  Component: React.ComponentType<any>;
  componentProps?: Record<string, unknown>;
  backgroundColor: string;
}

const CARDS: CardConfig[] = [
  {
    id: 1,
    Component: BrandProblemSolution,
    backgroundColor: 'bg-background',
  },
  {
    id: 2,
    Component: BrandDeliverablesShowcase,
    backgroundColor: 'bg-secondary',
  },
  {
    id: 3,
    Component: FeaturesSection,
    componentProps: {
      title: 'Our Brand Design Capabilities',
      description: "Beyond the deliverables, here's what drives our approach.",
      features: [
        {
          title: 'Strategic Brand Positioning',
          description:
            "We position you to stand out from competitors and own a space in your customer's mind.",
          iconName: 'Shield',
        },
        {
          title: 'Visual Identity System',
          description:
            'Logo, color, typography, and imagery that work seamlessly across all mediums.',
          iconName: 'Palette',
        },
        {
          title: 'Messaging & Tone',
          description:
            'Clear, consistent messaging that communicates your unique value proposition.',
          iconName: 'Zap',
        },
        {
          title: 'Brand Guidelines',
          description:
            'Comprehensive documentation so everyone - internal and external - applies your brand correctly.',
          iconName: 'Layout',
        },
        {
          title: 'Launch & Implementation',
          description:
            "We don't just hand over files. We guide the rollout across web, print, and all channels.",
          iconName: 'Rocket',
        },
        {
          title: 'Ongoing Support',
          description:
            "We're here for updates, refreshes, and brand evolution as your business grows.",
          iconName: 'Users',
        },
      ],
    },
    backgroundColor: 'bg-background',
  },
];

interface CardProps {
  card: CardConfig;
  position: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

function Card({ card, position, scrollYProgress }: CardProps) {
  const scaleFromPct = (position - 1) / CARDS.length;
  const y = useTransform(
    scrollYProgress,
    [scaleFromPct, 1],
    [0, -CARD_HEIGHT]
  );

  return (
    <motion.div
      key={card.id}
      style={{
        height: CARD_HEIGHT,
        y: position === CARDS.length ? undefined : y,
      }}
      className={`sticky top-0 w-full flex flex-col items-center justify-center overflow-hidden ${card.backgroundColor}`}
    >
      {/* Content */}
      <div className='mx-auto max-w-7xl w-full px-4 sm:px-6 overflow-hidden'>
        <card.Component {...(card.componentProps || {})} />
      </div>
    </motion.div>
  );
}

export function StickyCardsWrapper() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  return (
    <>
      <SpikeDivider top bottom paddingClassName='' spikeColor='bg-secondary'>
        <div ref={ref} className='relative'>
          {CARDS.map((card, idx) => (
            <Card
              key={card.id}
              card={card}
              position={idx + 1}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </SpikeDivider>
    </>
  );
}
