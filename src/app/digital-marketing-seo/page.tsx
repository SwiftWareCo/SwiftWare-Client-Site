'use client';

import { DigitalMarketingHero } from '@/components/digital-marketing-seo/DigitalMarketingHero';
import { ProblemSolutionSection } from '@/components/digital-marketing-seo/ProblemSolutionSection';
import { WhatsIncludedSection } from '@/components/digital-marketing-seo/WhatsIncludedSection';
import { UnifiedSystemConnector } from '@/components/digital-marketing-seo/UnifiedSystemConnector';
import { ServiceSpecificFAQ } from '@/components/digital-marketing-seo/ServiceSpecificFAQ';
import { FinalCTASection } from '@/components/digital-marketing-seo/FinalCTASection';
import { SpikeDivider } from '@/components/sections/SpikeDivider';
import { MacbookScroll } from '@/components/ui/macbook-scroll';

export default function DigitalMarketingPage() {
  return (
    <>
      <DigitalMarketingHero />

      <section className='bg-background'>
        <ProblemSolutionSection className='bg-background' />
      </section>

      <section className='bg-secondary text-secondary-foreground'>
        <SpikeDivider
          top
          bottom
          spikeColor='bg-background'
          paddingClassName='py-0'
        >
          <WhatsIncludedSection className='bg-transparent' />
        </SpikeDivider>
      </section>

      <section className='bg-background text-secondary-foreground'>
        <MacbookScroll
          src='/images/SEOResults.png'
          showGradient={false}
          title={
            <span className='text-secondary-foreground'>
              Track the leads you earn—and the revenue you close.
            </span>
          }
        />
      </section>

      <section className='bg-background'>
        <SpikeDivider
          top
          bottom
          spikeColor='bg-background'
          paddingClassName='py-0'
        >
          <UnifiedSystemConnector className='bg-secondary' />
        </SpikeDivider>
      </section>

      <section className='bg-secondary text-secondary-foreground'>
        <SpikeDivider
          top
          bottom
          spikeColor='bg-background'
          paddingClassName='py-0'
        >
          <ServiceSpecificFAQ className='bg-background' />
        </SpikeDivider>
      </section>

      <section className='bg-secondary'>
        <FinalCTASection tone='default' />
      </section>
    </>
  );
}
