'use client';

import { motion } from 'motion/react';
import {
  Database,
  Brain,
  Users,
  Calendar,
  FileText,
  ShoppingCart,
  BarChart3,
  Globe,
  Lock,
  Workflow,
  MessageSquare,
} from 'lucide-react';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { openCalendlyPopup } from '@/lib/calendly';

interface Solution {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  examples: string[];
  gradient: string;
}

const SOLUTIONS: Solution[] = [
  {
    icon: Brain,
    title: 'AI & Machine Learning Integration',
    description:
      'Embed intelligent automation and insights directly into your operations.',
    examples: [
      'RAG systems for instant document search',
      'AI chatbots trained on your business data',
      'Predictive analytics for sales forecasting',
      'Automated document classification',
    ],
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    icon: Database,
    title: 'Customer Relationship Management',
    description:
      'Custom CRM systems that match your sales process, not the other way around.',
    examples: [
      'Contact management & interaction tracking',
      'Sales pipeline visualization',
      'Automated follow-ups & workflows',
      'Custom reporting dashboards',
    ],
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Calendar,
    title: 'Booking & Scheduling Systems',
    description:
      'Tailored reservation platforms for any service-based business.',
    examples: [
      'Patient scheduling & clinic management',
      'Golf tee sheet management',
      'Healthcare appointment automation',
      'Restaurant & event booking systems',
    ],
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Globe,
    title: 'Client Portals & Dashboards',
    description:
      'Secure, branded portals where clients access data and track progress.',
    examples: [
      'Real-time project tracking',
      'Document sharing & e-signatures',
      'Custom client dashboards',
      'Integrated communication tools',
    ],
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Workflow,
    title: 'Process Automation',
    description:
      'Eliminate manual work with intelligent workflows and integrations.',
    examples: [
      'Automated invoice generation',
      'Email & SMS notification systems',
      'Data sync between platforms',
      'Custom approval workflows',
    ],
    gradient: 'from-orange-500 to-red-600',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce & Payments',
    description:
      'Custom online stores and payment systems tailored to your products.',
    examples: [
      'Custom product catalogs',
      'Subscription management',
      'Inventory tracking',
      'Multi-vendor marketplaces',
    ],
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description:
      'Turn your data into actionable insights with custom dashboards.',
    examples: [
      'Real-time performance metrics',
      'Custom KPI tracking',
      'Automated report generation',
      'Data visualization & trends',
    ],
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Users,
    title: 'Team Collaboration Tools',
    description: 'Internal platforms that help your team work better together.',
    examples: [
      'Project management systems',
      'Knowledge bases & wikis',
      'Task tracking & assignments',
      'Internal communication hubs',
    ],
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: FileText,
    title: 'Document Management',
    description:
      'Organize, search, and collaborate on documents with intelligent systems.',
    examples: [
      'Version control & tracking',
      'Automated document generation',
      'OCR & text extraction',
      'Compliance & audit trails',
    ],
    gradient: 'from-lime-500 to-green-600',
  },
  {
    icon: Lock,
    title: 'Custom Security Solutions',
    description:
      'Role-based access, authentication, and compliance for sensitive data.',
    examples: [
      'Multi-factor authentication',
      'Role-based permissions',
      'Audit logging & compliance',
      'Data encryption & security',
    ],
    gradient: 'from-red-500 to-pink-600',
  },
  {
    icon: MessageSquare,
    title: 'Communication Platforms',
    description: 'Custom messaging, notification, and engagement systems.',
    examples: [
      'In-app messaging & chat',
      'SMS & email automation',
      'Push notifications',
      'Customer feedback systems',
    ],
    gradient: 'from-teal-500 to-cyan-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function SolutionsShowcase() {
  return (
    <section className='relative bg-background py-16 sm:py-20 md:py-24 overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0 bg-gradient-to-b from-background via-background to-background' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.08),transparent_50%)]' />

      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className='text-center mb-12 sm:mb-16'
        >
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6'>
            <span className='bg-gradient-to-r from-service-software via-service-ai to-service-software-dark bg-clip-text text-transparent'>
              What We Can Build for You
            </span>
          </h2>
          <p className='mx-auto max-w-3xl text-base sm:text-lg text-muted-foreground'>
            From AI-powered automation to custom CRMs, we&apos;ve built software
            solutions across every industry. Here&apos;s what&apos;s possible
            when you work with SwiftWare.
          </p>
        </motion.div>

        {/* Solutions Grid - Flexbox with centered last row */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6'
        >
          {SOLUTIONS.map((solution) => (
            <motion.div
              key={solution.title}
              variants={itemVariants}
              className='group relative bg-card/50 backdrop-blur-sm rounded-xl p-3 sm:p-5 md:p-6 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-border hover:-translate-y-1 basis-[calc(50%-6px)] md:basis-[calc(50%-12px)] xl:basis-[calc(33.333%-16px)] text-center sm:text-left'
            >
              {/* Icon */}
              <div
                className={`relative inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 rounded-lg sm:rounded-xl bg-gradient-to-br ${solution.gradient} p-2 sm:p-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <solution.icon className='w-full h-full text-white' />
              </div>

              {/* Title */}
              <h3 className='text-sm sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-foreground group-hover:to-muted-foreground transition-all duration-300'>
                {solution.title}
              </h3>

              {/* Description - hidden on mobile */}
              <p className='hidden sm:block text-sm md:text-base text-muted-foreground mb-3 md:mb-4 leading-relaxed'>
                {solution.description}
              </p>

              {/* Examples - hidden on mobile */}
              <ul className='hidden sm:block space-y-1.5 md:space-y-2'>
                {solution.examples.map((example, i) => (
                  <li
                    key={i}
                    className='flex items-start gap-2 text-xs md:text-sm text-muted-foreground'
                  >
                    <span
                      className={`mt-1.5 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gradient-to-br ${solution.gradient} flex-shrink-0`}
                    />
                    <span className='leading-relaxed'>{example}</span>
                  </li>
                ))}
              </ul>

              {/* Hover Gradient Effect */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className='mt-12 sm:mt-16 flex flex-col items-center text-center'
        >
          <p className='text-base sm:text-lg text-muted-foreground mb-6'>
            Don&apos;t see your use case? We&apos;ve likely built something
            similar.
          </p>
          <InteractiveHoverButton
            onClick={() => openCalendlyPopup()}
            text='Tell Us What You Need'
            className='w-auto px-10 py-4 text-base'
          />
        </motion.div>
      </div>
    </section>
  );
}
