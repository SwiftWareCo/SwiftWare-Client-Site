'use client';

import { motion } from 'motion/react';
import { AlertCircle, Search, Code, Zap } from 'lucide-react';
import BlockFallAnimation from './BlockFallAnimation';

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

  const swiftwareSteps = [
    {
      number: 1,
      title: 'Foundation: Brand Identity',
      description:
        "This isn't just a logo. It's the blueprint for everything that follows. Your brand strategy dictates the language for your marketing, the design of your software, and the voice of your AI chatbot. We build it once and enforce it everywhere.",
      icon: null,
      colorVar: '--color-service-brand',
      colorDarkVar: '--color-service-brand-dark',
    },
    {
      number: 2,
      title: 'Engine: Digital Marketing & SEO',
      description:
        "This is your engine. We don't just \"run ads.\" We build marketing funnels that plug directly into your custom software. Your SEO strategy informs your website build from day one, not as an afterthought.",
      icon: Search,
      colorVar: '--color-service-marketing',
      colorDarkVar: '--color-service-marketing-dark',
    },
    {
      number: 3,
      title: 'Framework: Custom Software',
      description:
        'This is the framework that holds it all together. Your website or app is built to serve your brand, execute your marketing, and run your automations. It\'s the "glue" that stops leads from falling through the cracks.',
      icon: Code,
      colorVar: '--color-service-software',
      colorDarkVar: '--color-service-software-dark',
    },
    {
      number: 4,
      title: 'Flywheel: AI & Process Automation',
      description:
        'This is your flywheel. When Marketing captures a lead, our Automation instantly responds. We connect your web forms, CRM, and calendars so you can close deals instead of chasing data. It makes your entire system work for you 24/7.',
      icon: Zap,
      colorVar: '--color-service-ai',
      colorDarkVar: '--color-service-ai-dark',
    },
  ];

  return (
    <section className='relative py-16 sm:py-24'>
      <div className='mx-auto max-w-7xl px-6'>
        {/* THE OLD WAY SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className='mb-24'
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
                  The old way: <span className='text-destructive'>JUGGLING DISCONNECTED PARTNERS</span>
                </h2>
                <p className='text-muted-foreground text-sm sm:text-base'>
                  Most businesses need multiple services but work with disconnected agencies. Here&apos;s the chaos that creates:
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

        {/* SOLUTION DIVIDER */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, amount: 0.2 }}
          className='my-24 h-px'
          style={{
            backgroundImage: 'linear-gradient(to right, transparent, var(--color-service-marketing), transparent)',
            opacity: 0.3,
          }}
        />

        {/* THE SWIFTWARE WAY SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Title Section */}
          <div className='text-center mb-12'>
            <span className='text-xs uppercase tracking-widest text-muted-foreground'>The Solution</span>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mt-2'>
              The <span className='text-service-marketing'>SwiftWare Way</span>
            </h2>
            <p className='text-muted-foreground max-w-3xl mx-auto mt-4 text-sm sm:text-base'>
              Instead of juggling disconnected teams, imagine your entire operation flowing as one integrated system. Here&apos;s how we connect the dots:
            </p>
          </div>

          {/* 2-COLUMN LAYOUT (reversed - visual on LEFT, cards on RIGHT) */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-start'>
            {/* LEFT: SERVICE FLOW DIAGRAM IN CARD */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              className='relative h-full flex items-center justify-center rounded-xl border border-border bg-zinc-900/50 p-8'
            >
              {/* Circular flow diagram showing 4 services connecting */}
              <svg className='w-full h-full' viewBox='0 0 300 300' preserveAspectRatio='xMidYMid meet'>
                {/* Center circle */}
                <motion.circle
                  cx='150'
                  cy='150'
                  r='80'
                  fill='none'
                  stroke='var(--color-service-marketing)'
                  strokeWidth='1'
                  opacity='0.2'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                />

                {/* Service nodes positioned around circle */}
                {[
                  { name: 'Brand', angle: 0, color: 'var(--color-service-brand)' },
                  { name: 'Marketing', angle: 90, color: 'var(--color-service-marketing)' },
                  { name: 'Software', angle: 180, color: 'var(--color-service-software)' },
                  { name: 'AI', angle: 270, color: 'var(--color-service-ai)' },
                ].map((service, idx) => {
                  const radius = 70;
                  const x = 150 + Math.cos((service.angle * Math.PI) / 180) * radius;
                  const y = 150 + Math.sin((service.angle * Math.PI) / 180) * radius;

                  return (
                    <g key={service.name}>
                      {/* Connection line to center */}
                      <motion.line
                        x1={150}
                        y1={150}
                        x2={x}
                        y2={y}
                        stroke={service.color}
                        strokeWidth='1.5'
                        opacity='0.3'
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 + idx * 0.1 }}
                        viewport={{ once: true }}
                      />

                      {/* Node circle */}
                      <motion.circle
                        cx={x}
                        cy={y}
                        r='18'
                        fill={service.color}
                        opacity='0.2'
                        initial={{ opacity: 0, r: 0 }}
                        whileInView={{ opacity: 0.2, r: 18 }}
                        transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                        viewport={{ once: true }}
                      />

                      {/* Node border */}
                      <motion.circle
                        cx={x}
                        cy={y}
                        r='18'
                        fill='none'
                        stroke={service.color}
                        strokeWidth='1.5'
                        opacity='0.5'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.5 }}
                        transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
                        viewport={{ once: true }}
                      />

                      {/* Node label */}
                      <text
                        x={x}
                        y={y}
                        textAnchor='middle'
                        dy='0.3em'
                        fontSize='10'
                        fontWeight='600'
                        fill={service.color}
                        opacity='0.8'
                      >
                        {service.name.substring(0, 3)}
                      </text>
                    </g>
                  );
                })}

                {/* Center text */}
                <motion.text
                  x='150'
                  y='155'
                  textAnchor='middle'
                  fontSize='12'
                  fontWeight='600'
                  fill='var(--foreground)'
                  opacity='0.6'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.6 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  Unified
                </motion.text>
                <motion.text
                  x='150'
                  y='168'
                  textAnchor='middle'
                  fontSize='12'
                  fontWeight='600'
                  fill='var(--foreground)'
                  opacity='0.6'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.6 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  Growth
                </motion.text>
              </svg>
            </motion.div>

            {/* RIGHT: 4 STEP CARDS STACKED */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              className='space-y-4'
            >
              {swiftwareSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                      className='relative p-5 rounded-lg border border-border bg-card hover:border-border transition-colors h-full'
                    >
                      {/* Step Number Badge */}
                      <motion.div
                        className='inline-flex items-center justify-center w-10 h-10 rounded-full mb-3 text-white font-bold text-sm'
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          backgroundImage: `linear-gradient(to bottom right, var(${step.colorVar}), var(${step.colorDarkVar}))`,
                        }}
                      >
                        {step.number}
                      </motion.div>

                      {/* Title */}
                      <h3 className='text-base font-semibold mb-2 text-foreground pr-8'>{step.title}</h3>

                      {/* Description */}
                      <p className='text-sm leading-relaxed text-muted-foreground mb-3'>{step.description}</p>

                      {/* Icon at bottom right */}
                      {Icon && (
                        <motion.div
                          className='absolute bottom-4 right-4'
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Icon
                            className='w-5 h-5'
                            style={{ color: `var(${step.colorVar})` }}
                          />
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* SUMMARY BOX - Dark Mode Friendly */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className='mt-16 p-8 rounded-xl border border-service-marketing/30 bg-card'
          >
            <h3 className='text-2xl sm:text-3xl font-bold text-center mb-4 text-service-marketing'>
              Stop paying for friction. Start investing in flow.
            </h3>
            <p className='text-center max-w-3xl mx-auto leading-relaxed text-foreground mb-4'>
              When your brand, marketing, and technology all speak the same language, you don&apos;t just look more professional. You become more efficient. You close more deals. You build a scalable asset, not just a collection of parts.
            </p>
            <p className='text-center font-semibold text-service-marketing'>
              That is the SwiftWare difference.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
