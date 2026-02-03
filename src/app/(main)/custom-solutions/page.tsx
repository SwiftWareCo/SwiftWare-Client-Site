'use client';

import CTASection from '@/components/CTASection';
import { FAQSection } from '@/components/sections/FAQSection';
import { HeroGeometric } from '@/components/ui/shadcn-io/shape-landing-hero';
import { SolutionsCards } from '@/components/custom-solutions/SolutionsCards';
import { SolutionsShowcase } from '@/components/custom-solutions/SolutionsShowcase';
import { WavyDivider } from '@/components/WavyDivider';

const FAQ_ITEMS = [
  {
    question: 'Do you only build these three types of solutions?',
    answer:
      "Not at all! Clinic Management, CRM, and Golf Management are examples of solutions we've built. We work with businesses across all industries to build custom software tailored to their unique needs - from healthcare and medical practices to property management to e-commerce.",
  },
  {
    question: 'How long does a custom software project take?',
    answer:
      'Most projects take 8-16 weeks depending on complexity and scope. We provide a detailed timeline and milestones during the discovery phase.',
  },
  {
    question: 'Can you integrate with our existing systems?',
    answer:
      "Yes! We specialize in integrating with existing systems—CRMs, ERPs, databases, APIs, and third-party tools. We'll ensure your new software works seamlessly with your current tech stack.",
  },
  {
    question: 'What if we need changes after launch?',
    answer:
      "We provide ongoing support and maintenance packages. Whether you need bug fixes, feature enhancements, or performance optimization, we're here to help your software evolve with your business.",
  },
  {
    question: 'How do you ensure the software fits our workflow?',
    answer:
      'We start with a deep discovery phase where we map your current processes, pain points, and goals. We build iteratively with regular check-ins and demos, ensuring the final product aligns perfectly with how your team works.',
  },
];

export default function CustomSolutionsPage() {
  return (
    <main className='relative min-h-screen'>
      {/* Hero Section with secondary background and gradient */}
      <div className='relative bg-secondary'>
        <div
          className='absolute inset-0 pointer-events-none'
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(99,102,241,0.15), transparent 70%)',
          }}
        />
        <HeroGeometric
          badge='SwiftWare Custom Solutions'
          title1='Software Built for'
          title2='Your Unique Workflow'
          description='From clinic management systems to CRM platforms to golf course scheduling—we build custom software tailored to your industry. Whatever your challenge, we create the tools your team needs to thrive.'
          className='min-h-screen'
        />
      </div>



      {/* Comprehensive Solutions Showcase - bg-background */}
      <SolutionsShowcase />

      {/* Wavy transition from showcase (background) to cards (secondary) */}
      <WavyDivider
        direction='down'
        fromColor='background'
        toColor='secondary'
      />

      {/* Solutions Cards */}
      <SolutionsCards />

      {/* FAQ Section */}
      <div className='bg-secondary'>
        <FAQSection items={FAQ_ITEMS} />
      </div>

      {/* CTA Section */}
      <CTASection
        heading='Ready to Build Your Custom Solution?'
        description="Schedule a free consultation and we'll map out exactly what you need—no cookie-cutter solutions, just software built for how you work."
        buttons={[{ label: 'Book Strategy Call' }]}
        tone='secondary'
      />
    </main>
  );
}
