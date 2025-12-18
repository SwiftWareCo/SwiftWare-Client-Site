
import { DigitalMarketingHero } from '@/components/digital-marketing-seo/DigitalMarketingHero';
import { ProblemSolutionSection } from '@/components/digital-marketing-seo/ProblemSolutionSection';
import { WhatsIncludedSection } from '@/components/digital-marketing-seo/WhatsIncludedSection';
import { UnifiedSystemConnector } from '@/components/digital-marketing-seo/UnifiedSystemConnector';
import { ServiceSpecificFAQ } from '@/components/digital-marketing-seo/ServiceSpecificFAQ';
import CTASection from '@/components/CTASection';
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

      <CTASection
        heading='Ready to Own Your Local Market?'
        description='Book a free marketing consult and we’ll show you exactly what your competitors are doing—and the plan that puts you back on top.'
        buttons={[{ label: 'Schedule a Consultation' }]}
        backgroundClassName='bg-secondary'
        tone='secondary'
      />
    </>
  );
}
