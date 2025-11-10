'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  href: string;
  color: string;
  colorAccent: string;
}

interface ServicesGridProps {
  services: Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section className='relative py-16 sm:py-24 bg-purple-100 dark:bg-zinc-700'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='text-center mb-12 sm:mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-purple-900 dark:text-zinc-100'>
            Our Services
          </h2>
          <p className='text-lg max-w-2xl mx-auto text-purple-700 dark:text-zinc-300'>
            Each service is powerful on its own. Together, they transform your business.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Link href={service.href} className='cursor-pointer block h-full'>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className='group relative p-8 rounded-xl border border-purple-300 dark:border-zinc-700 bg-white/40 dark:bg-zinc-900/40 hover:bg-white/60 dark:hover:bg-zinc-900/60 transition-all cursor-pointer h-full'
                >
                  <motion.div
                    whileHover={{ scale: 1.05, rotateZ: -1 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-br ${service.color}`}
                    style={{ opacity: 0.02 }}
                  />

                  <div className='relative'>
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 bg-gradient-to-br ${service.color}`}
                      style={{ opacity: 0.1 }}
                    >
                      <div className={`w-6 h-6 rounded-full ${service.colorAccent}`} />
                    </div>

                    <h3 className='text-xl font-semibold mb-3 text-purple-900 dark:text-zinc-100'>
                      {service.title}
                    </h3>
                    <p className='mb-6 leading-relaxed text-purple-700 dark:text-zinc-300'>
                      {service.description}
                    </p>

                    <div className='flex items-center gap-2 group-hover:gap-3 transition-all text-purple-600 dark:text-blue-400'>
                      <span className='font-medium'>Learn more</span>
                      <ArrowRight className='h-4 w-4' />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
