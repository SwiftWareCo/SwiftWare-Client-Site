import { DigitalMarketingHero } from '@/components/digital-marketing-seo/DigitalMarketingHero';
import { ProblemSolutionSection } from '@/components/digital-marketing-seo/ProblemSolutionSection';
import { WhatsIncludedSection } from '@/components/digital-marketing-seo/WhatsIncludedSection';
import { UnifiedSystemConnector } from '@/components/digital-marketing-seo/UnifiedSystemConnector';
import { ServiceSpecificFAQ } from '@/components/digital-marketing-seo/ServiceSpecificFAQ';
import CTASection from '@/components/CTASection';
import { SpikeDivider } from '@/components/sections/SpikeDivider';
import ChartAssembly from '@/components/home/hero/ChartAssembly';

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

      <section className='bg-background text-secondary-foreground py-16 sm:py-24'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='text-center mb-10'>
            <h2 className='text-2xl sm:text-3xl font-bold text-foreground mb-3'>
              Track the leads you earn and the revenue you close
            </h2>
            <p className='text-muted-foreground max-w-2xl mx-auto'>
              Real-time analytics that show exactly how your marketing
              investment translates to business growth.
            </p>
          </div>
          <div className='flex justify-center'>
            <ChartAssembly />
          </div>
        </div>
      </section>

      <section className='bg-background'>
        <UnifiedSystemConnector className='bg-secondary' />
      </section>

      <section className='bg-secondary text-secondary-foreground'>
        <ServiceSpecificFAQ className='bg-background' />
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
