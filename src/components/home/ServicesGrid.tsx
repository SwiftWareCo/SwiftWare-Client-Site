'use client';

import { motion } from 'motion/react';
import { AlertCircle} from 'lucide-react';
import TheSwiftwareWay from './swiftware-way/TheSwiftwareWay';
import  BlockFallAnimation from './BlockFallAnimation';

export function ServicesGrid() {
  const painPoints = [
    {
      icon: AlertCircle,
      title: 'Wasted Time',
      description: "You're stuck playing project manager, trying to get your designer and your ad guy on the same page.",
    },
    {
      icon: AlertCircle,
      title: 'Lost Leads',
      description: 'Your website form  doesn\'t "talk" to your marketing campaign , so leads go cold before you even see them.',
    },
    {
      icon: AlertCircle,
      title: 'Broken Brand',
      description: 'Your brand looks great on the website but is totally different in your email blasts, confusing customers.',
    },
    {
      icon: AlertCircle,
      title: 'Wasted Money',
      description: 'You\'re paying four different teams who are all blaming each other when things don\'t work.',
    },
  ];

  return (
    <>
      <section className='relative py-16 sm:py-24'>
        <div className='mx-auto max-w-7xl px-6'>
          {/* THE OLD WAY SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className='mb-8'
          >
            {/* 2-COLUMN LAYOUT - VISUAL LEFT, TEXT+PAIN POINTS RIGHT */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-start'>
              {/* LEFT: OVERWHELM ANIMATION IN CARD */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
                className='relative h-full rounded-xl border border-border bg-zinc-900/50 p-8 overflow-hidden'
              >
                <BlockFallAnimation />
              </motion.div>

              {/* RIGHT: TITLE + PAIN POINTS (NO BOXES) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
                className='space-y-8'
              >
                {/* Title Section */}
                <div>
                  <span className='text-xs uppercase tracking-widest text-muted-foreground'>The Problem</span>
                  <h2 className='text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4'>
                    The old way: <span className='text-destructive'>WEARING TOO MANY HATS</span>
                  </h2>
                  <p className='text-muted-foreground text-sm sm:text-base'>
                    As a business owner, you&apos;re stretched thin—managing your brand, marketing, technology, and operations. When each service is disconnected, you become the bottleneck:
                  </p>
                </div>

                {/* PAIN POINTS - SIMPLE LIST (NO BOXES) */}
                <div className='space-y-4'>
                  {painPoints.map((point, index) => {
                    const Icon = point.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        className='flex gap-3'
                      >
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                          className='flex-shrink-0 pt-0.5'
                        >
                          <Icon className='w-5 h-5 text-destructive' />
                        </motion.div>
                        <div>
                          <h3 className='font-semibold text-destructive'>{point.title}</h3>
                          <p className='text-sm text-muted-foreground leading-relaxed'>{point.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* FINAL MESSAGE BOX - FULL WIDTH */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
            className='rounded-xl border-2 p-6 sm:p-8 mb-24'
            style={{
              borderColor: 'var(--color-primary-service)',
              backgroundColor: 'var(--gray-a2)',
            }}
          >
            <h3 className='text-xl sm:text-2xl font-bold text-foreground mb-4'>
              Stop paying for friction. <span className='text-transparent bg-clip-text' style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary-service), var(--color-secondary-service))' }}>Start investing in flow.</span>
            </h3>
            <p className='text-foreground/80 text-sm sm:text-base leading-relaxed mb-4'>
              When your brand, marketing, and technology all speak the same language, you don&apos;t just look more professional. You become more efficient. You close more deals. You build a scalable asset, not just a collection of parts.
            </p>
            <p className='text-lg font-semibold' style={{ color: 'var(--color-primary-service)' }}>
              That is the SwiftWare difference.
            </p>
          </motion.div>
        </div>
      </section>
      <TheSwiftwareWay />
    </>
  );
}

