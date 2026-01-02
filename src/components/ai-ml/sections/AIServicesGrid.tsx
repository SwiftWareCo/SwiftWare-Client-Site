'use client';

import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Search,
  Zap,
  MessageSquare,
  TrendingUp,
  Brain,
} from 'lucide-react';
import { getColorsFromPath, getColorsRGBFromPath } from '@/lib/colors';

const SERVICES = [
  {
    icon: Phone,
    title: 'AI Receptionist',
    description:
      '24/7 voice agents that answer calls, book appointments, and never miss a lead.',
  },
  {
    icon: Search,
    title: 'Document Intelligence',
    description:
      'Ask questions, get instant answers from your files, contracts, and databases.',
  },
  {
    icon: Zap,
    title: 'Process Automation',
    description:
      'Automate repetitive workflows—data entry, invoicing, scheduling, and more.',
  },
  {
    icon: MessageSquare,
    title: 'AI Chatbots',
    description:
      'Custom chatbots for your website that handle support and capture leads.',
  },
  {
    icon: TrendingUp,
    title: 'Predictive Analytics',
    description:
      'AI-powered insights that surface patterns and predict trends automatically.',
  },
  {
    icon: Brain,
    title: 'Custom AI Solutions',
    description:
      'Bespoke AI models trained on your data for your specific business needs.',
  },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function AIServicesGrid() {
  const pathname = usePathname();
  const colors = getColorsFromPath(pathname);
  const colorsRGB = getColorsRGBFromPath(pathname);

  return (
    <section className='bg-secondary py-20'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-12 text-center'
        >
          <h2 className='text-2xl font-bold text-foreground sm:text-3xl'>
            What We Build
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-muted-foreground'>
            AI solutions designed for real business problems—not just demos.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
        >
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className='group relative rounded-2xl border p-6'
                style={{
                  borderColor: `rgba(${colorsRGB.primaryRGB}, 0.2)`,
                  background: `linear-gradient(135deg, rgba(${colorsRGB.primaryRGB}, 0.05), rgba(${colorsRGB.secondaryRGB}, 0.03))`,
                }}
              >
                {/* Icon */}
                <div
                  className='mb-4 flex h-12 w-12 items-center justify-center rounded-xl'
                  style={{
                    background: `linear-gradient(135deg, rgba(${colorsRGB.primaryRGB}, 0.15), rgba(${colorsRGB.secondaryRGB}, 0.1))`,
                  }}
                >
                  <Icon className='h-6 w-6' style={{ color: colors.primary }} />
                </div>

                {/* Title */}
                <h3 className='mb-2 text-lg font-semibold text-foreground'>
                  {service.title}
                </h3>

                {/* Description */}
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  {service.description}
                </p>

                {/* Hover accent line */}
                <div
                  className='absolute bottom-0 left-0 h-1 w-0 rounded-b-2xl opacity-0 group-hover:w-full group-hover:opacity-100'
                  style={{
                    background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                    transition: 'width 0.3s ease, opacity 0.3s ease',
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
