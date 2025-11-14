'use client'
import { motion } from 'motion/react';
import {
  Search,
  Code,
  TestTube,
  Rocket,
  Users,
  GitBranch,
  Zap,
} from 'lucide-react';

const WORKFLOW_STEPS = [
  {
    phase: 'Discovery',
    icon: Search,
    title: 'Understand Your Business',
    description:
      'We dive deep into your operations, workflows, and pain points. No assumptions, just thorough analysis.',
    activities: [
      'Process mapping and analysis',
      'Stakeholder interviews',
      'Requirements gathering',
      'Technical assessment',
    ],
  },
  {
    phase: 'Design',
    icon: GitBranch,
    title: 'Architect the Solution',
    description:
      'We design a system that fits your business like a glove, not the other way around.',
    activities: [
      'System architecture design',
      'User experience planning',
      'Integration strategy',
      'Security considerations',
    ],
  },
  {
    phase: 'Build',
    icon: Code,
    title: 'Develop & Iterate',
    description:
      'We build in sprints, showing progress weekly and adapting based on your feedback.',
    activities: [
      'Agile development cycles',
      'Weekly demos and feedback',
      'Continuous integration',
      'Quality assurance',
    ],
  },
  {
    phase: 'Test',
    icon: TestTube,
    title: 'Rigorous Testing',
    description:
      'Every feature is tested thoroughly to ensure reliability and performance.',
    activities: [
      'Unit and integration testing',
      'User acceptance testing',
      'Performance optimization',
      'Security testing',
    ],
  },
  {
    phase: 'Deploy',
    icon: Rocket,
    title: 'Launch & Train',
    description:
      'We handle the deployment and ensure your team is fully trained and confident.',
    activities: [
      'Production deployment',
      'Team training sessions',
      'Documentation delivery',
      'Go-live support',
    ],
  },
  {
    phase: 'Support',
    icon: Users,
    title: 'Ongoing Partnership',
    description:
      "We're here for the long haul, providing support, enhancements, and optimization.",
    activities: [
      '24/7 technical support',
      'Feature enhancements',
      'Performance monitoring',
      'Regular maintenance',
    ],
  },
];

export default function HowWeWork() {
  return (
    <section className='py-20 relative overflow-hidden'>
      {/* Background effects */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-1/4 right-1/4 size-96 bg-blue-500/3 rounded-full blur-3xl' />
        <div className='absolute bottom-1/4 left-1/4 size-80 bg-purple-500/4 rounded-full blur-3xl' />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent'>
            How We Work Together
          </h2>
          <p className='text-xl text-zinc-300 max-w-3xl mx-auto'>
            Our proven process ensures we deliver exactly what your business
            needs, built to fit perfectly.
          </p>
        </motion.div>

        {/* Workflow Timeline */}
        <div className='relative'>
          {/* Connection Line */}
          <div className='absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/20 via-purple-500/30 to-blue-500/20 hidden md:block' />

          <div className='space-y-12 md:space-y-16'>
            {WORKFLOW_STEPS.map((step, index) => {
              const IconComponent = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node */}
                  <div className='flex-shrink-0 relative'>
                    <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center backdrop-blur-sm'>
                      <IconComponent className='w-8 h-8 text-blue-300' />
                    </div>
                    {/* Phase indicator */}
                    <div className='absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white'>
                      {index + 1}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`flex-1 ${isEven ? 'md:text-left' : 'md:text-right'}`}
                  >
                    <div className='p-8 rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-blue-500/5 via-purple-500/3 to-zinc-900/40 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10'>
                      <div className='flex items-center gap-3 mb-4'>
                        <h3 className='text-2xl font-bold text-white'>
                          {step.title}
                        </h3>
                        <div className='px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-200 rounded-full text-sm font-medium'>
                          {step.phase}
                        </div>
                      </div>

                      <p className='text-zinc-300 mb-6 leading-relaxed'>
                        {step.description}
                      </p>

                      {/* Activities */}
                      <div className='grid sm:grid-cols-2 gap-3'>
                        {step.activities.map((activity, activityIndex) => (
                          <motion.div
                            key={activityIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.4,
                              delay: index * 0.1 + activityIndex * 0.05,
                            }}
                            className='flex items-center gap-3 text-sm text-zinc-400'
                          >
                            <Zap className='w-4 h-4 text-blue-400 flex-shrink-0' />
                            <span>{activity}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
