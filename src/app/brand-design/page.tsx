import { Metadata } from 'next';
import { DiagonalDivider } from '@/components/sections/DiagonalDivider';
import { BrandDesignHero } from '@/components/brand-design/BrandDesignHero';
import { StickyCardsWrapper } from '@/components/brand-design/StickyCardsWrapper';
import { UnifiedSystemConnector } from '@/components/brand-design/UnifiedSystemConnector';
import { BrandDesignFAQs } from '@/components/brand-design/BrandDesignFAQs';
import { ScheduleButton } from '@/components/ui/ScheduleButton';

export const metadata: Metadata = {
  title: 'Brand Identity & Logo Design Agency | SwiftWare',
  description:
    'Professional brand identity design services. Logo design, brand guidelines, and visual identity that builds trust and credibility.',
};

const faqs = [
  {
    question: 'How long does a brand design project typically take?',
    answer:
      'Most brand design projects take 4-8 weeks depending on complexity and scope. We provide a detailed timeline during the discovery phase.',
  },
  {
    question: 'What is included in your brand design service?',
    answer:
      'Logo design, brand guidelines, color palette, typography, messaging strategy, and deliverables in multiple formats for digital and print use.',
  },
  {
    question: 'Can you work with existing brands needing a refresh?',
    answer:
      'Absolutely! We specialize in brand refreshes that maintain brand equity while modernizing visual identity and messaging.',
  },
  {
    question: 'Do you provide files I can use independently?',
    answer:
      'Yes. You receive all logo files (vector, raster), brand guidelines, and marketing assets in formats ready for your team or other agencies to use.',
  },
  {
    question: 'What if I need to make changes after launch?',
    answer:
      'We provide a revision period after delivery. Beyond that, we offer maintenance packages for ongoing brand management.',
  },
];

export default function BrandDesignPage() {
  return (
    <main className='relative pt-20 min-h-screen'>
      {/* Custom Hero */}
      <BrandDesignHero />

      {/* Sticky Cards Section - Problem/Solution, Deliverables, Features */}
      <StickyCardsWrapper />

      {/* Unified System Connector with CJS Logo Showcase */}
      <div className='mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24'>
        <UnifiedSystemConnector />
      </div>

      {/* Bottom CTA Section - with diagonal skew */}
      <DiagonalDivider skewAngle={3} color='var(--background)'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
          <div className='text-center'>
            <h2 className='text-3xl sm:text-4xl font-bold mb-6 text-white'>
              Ready to Build Your Unforgettable Brand?
            </h2>
            <p className='text-lg text-zinc-400 mb-8 max-w-2xl mx-auto'>
              Schedule your free, no-obligation consultation today and
              let&apos;s discuss your vision.
            </p>
            <ScheduleButton text='Schedule a Consultation' />
          </div>
        </div>
      </DiagonalDivider>

      {/* FAQ Section - already has bg-background internally */}
      <BrandDesignFAQs items={faqs} />
    </main>
  );
}
