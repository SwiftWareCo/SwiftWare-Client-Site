'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Database, TrendingUp, Globe, Calendar, Bot, Zap } from 'lucide-react';
import Link from 'next/link';

interface SolutionCard {
  id: string;
  title: string;
  description: string;
  features: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
  }[];
  href: string;
  gradient: string;
}

const solutions: SolutionCard[] = [
  {
    id: 'crm',
    title: 'CRM Solutions',
    description: 'Manage customers, track sales, and grow revenue with a CRM built for your team.',
    href: '#crm',
    gradient: 'from-blue-500 to-cyan-500',
    features: [
      {
        icon: Database,
        title: 'Customer Management',
        description: 'Centralize customer data, track interactions, and manage relationships from one powerful platform.',
      },
      {
        icon: TrendingUp,
        title: 'Sales Pipeline',
        description: 'Visualize your sales process, forecast revenue, and close deals faster with intelligent tracking.',
      },
      {
        icon: Bot,
        title: 'Automation & Workflows',
        description: 'Automate repetitive tasks, trigger actions based on events, and free up your team to focus on selling.',
      },
    ],
  },
  {
    id: 'golf',
    title: 'Golf Management',
    description: 'Modern tee sheets, bookings, and membership tools for golf courses and clubs.',
    href: '#golf',
    gradient: 'from-emerald-500 to-teal-500',
    features: [
      {
        icon: Calendar,
        title: 'Tee Sheet Management',
        description: 'Modern booking system with real-time availability, online reservations, and automated confirmations.',
      },
      {
        icon: Database,
        title: 'Member Management',
        description: 'Track memberships, handicaps, tournaments, and member communications in one place.',
      },
      {
        icon: TrendingUp,
        title: 'Revenue Optimization',
        description: 'Dynamic pricing, utilization reports, and analytics to maximize course revenue.',
      },
    ],
  },
  {
    id: 'web',
    title: 'Web & Client Portals',
    description: 'Secure portals that connect customers, partners, and staff with real-time data.',
    href: '#web',
    gradient: 'from-purple-500 to-pink-500',
    features: [
      {
        icon: Globe,
        title: 'Client Portals',
        description: 'Secure, branded portals where clients can access documents, track progress, and communicate with your team.',
      },
      {
        icon: Database,
        title: 'Data Integration',
        description: 'Connect your portal to existing systems—CRM, ERP, databases—for seamless data flow.',
      },
      {
        icon: Zap,
        title: 'Custom Workflows',
        description: 'Build workflows tailored to your business processes, from onboarding to reporting.',
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  },
};

export function SolutionsCards() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className='py-16 sm:py-24 bg-background'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6'>
        <motion.div
          ref={ref}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          {solutions.map((solution) => (
            <motion.div
              key={solution.id}
              variants={cardVariants}
              className='group relative'
            >
              <Link
                href={solution.href}
                className='block h-full'
              >
                <div className='relative h-full bg-card/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-border hover:-translate-y-1 overflow-hidden'>
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Header */}
                  <div className='relative z-10 mb-6'>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${solution.gradient} mb-4 shadow-lg`}>
                      {(() => {
                        const IconComponent = solution.features[0].icon;
                        return IconComponent ? (
                          <IconComponent className='w-6 h-6 text-white' />
                        ) : null;
                      })()}
                    </div>
                    <h3 className='text-2xl font-bold text-foreground mb-2'>
                      {solution.title}
                    </h3>
                    <p className='text-muted-foreground text-sm sm:text-base'>
                      {solution.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className='relative z-10 space-y-4'>
                    {solution.features.map((feature, index) => (
                      <div key={index} className='flex gap-3'>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${solution.gradient} opacity-20 flex items-center justify-center`}>
                          <feature.icon className='w-4 h-4 text-foreground' />
                        </div>
                        <div className='flex-1'>
                          <h4 className='text-sm font-semibold text-foreground mb-1'>
                            {feature.title}
                          </h4>
                          <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Arrow Indicator */}
                  <div className='relative z-10 mt-6 flex items-center text-sm font-medium text-foreground/60 group-hover:text-foreground transition-colors'>
                    <span>Learn more</span>
                    <svg
                      className='w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

