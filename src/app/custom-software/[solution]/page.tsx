import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import CRMHero from '@/components/crm/CRMHero';
import CapabilitiesSection from '@/components/crm/sections/CapabilitiesSection';
import FAQ from '@/components/crm/sections/FAQ';
import HowWeWork from '@/components/crm/sections/HowWeWork';
import OutcomeSnapshots from '@/components/crm/sections/OutcomeSnapshots';
import ServiceJourney from '@/components/crm/sections/ServiceJourney';
import GolfCourseHero from '@/components/tee-sheet/GolfCourseHero';
import GolfCapabilitiesSection from '@/components/tee-sheet/sections/GolfCapabilitiesSection';
import GolfFAQ from '@/components/tee-sheet/sections/GolfFAQ';
import GolfOutcomes from '@/components/tee-sheet/sections/GolfOutcomes';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { VideoShowcaseProvider } from '@/components/web/VideoShowcaseContext';
import WebHero from '@/components/web/WebHero';
import WebCapabilities from '@/components/web/sections/WebCapabilities';
import WebFeatures from '@/components/web/sections/WebFeatures';
import WebProcess from '@/components/web/sections/WebProcess';
import WebVideoShowcase from '@/components/web/sections/WebVideoShowcase';
import { openCalendlyPopup } from '@/lib/calendly';
import { loadFocusContent } from '@/lib/content';
import type { FocusContent } from '@/types/content';
import CTASection from '@/components/CTASection';
interface SolutionPageProps {
  params: {
    solution: string;
  };
}

const SUPPORTED_SOLUTIONS = ['crm', 'golf', 'web-portals'] as const;
type SupportedSolution = (typeof SUPPORTED_SOLUTIONS)[number];

const FALLBACK_METADATA: Record<
  Exclude<SupportedSolution, 'crm'>,
  { title: string; description: string }
> = {
  golf: {
    title: 'Golf Course Management Software | SwiftWare',
    description:
      'Tee sheets, bookings, and membership tools built for modern golf operations.',
  },
  'web-portals': {
    title: 'Web & Client Portals | SwiftWare',
    description:
      'Secure portals and web platforms that connect customers, partners, and staff.',
  },
};

export function generateStaticParams() {
  return SUPPORTED_SOLUTIONS.map((solution) => ({ solution }));
}

export async function generateMetadata({
  params,
}: SolutionPageProps): Promise<Metadata> {
  const { solution } = params;

  if (solution === 'crm') {
    const content = loadFocusContent('crm');
    return {
      title: content.seo.title,
      description: content.seo.description,
      openGraph: {
        title: content.seo.title,
        description: content.seo.description,
        images: content.seo.ogImage
          ? [{ url: content.seo.ogImage }]
          : undefined,
      },
    } satisfies Metadata;
  }

  if (solution === 'golf') {
    const content = loadFocusContent('tee-sheet');
    return {
      title: content.seo.title,
      description: content.seo.description,
      openGraph: {
        title: content.seo.title,
        description: content.seo.description,
        images: content.seo.ogImage
          ? [{ url: content.seo.ogImage }]
          : undefined,
      },
    } satisfies Metadata;
  }

  if (solution === 'web-portals') {
    const content = loadFocusContent('web');
    return {
      title: content.seo.title,
      description: content.seo.description,
      openGraph: {
        title: content.seo.title,
        description: content.seo.description,
        images: content.seo.ogImage
          ? [{ url: content.seo.ogImage }]
          : undefined,
      },
    } satisfies Metadata;
  }

  if ((SUPPORTED_SOLUTIONS as readonly string[]).includes(solution)) {
    const fallback =
      FALLBACK_METADATA[solution as Exclude<SupportedSolution, 'crm'>];
    return {
      title: fallback.title,
      description: fallback.description,
    } satisfies Metadata;
  }

  return {
    title: 'Custom Software Solution | SwiftWare',
    description: 'Custom software solution tailored to your business needs.',
  } satisfies Metadata;
}

export default function SolutionPage({ params }: SolutionPageProps) {
  const { solution } = params;
  const isSupported = (SUPPORTED_SOLUTIONS as readonly string[]).includes(
    solution
  );

  if (!isSupported) {
    notFound();
  }

  if (solution === 'crm') {
    const content = loadFocusContent('crm');
    return <CRMSolution content={content} />;
  }

  if (solution === 'golf') {
    const content = loadFocusContent('tee-sheet');
    return <GolfSolution content={content} />;
  }

  if (solution === 'web-portals') {
    const content = loadFocusContent('web');
    return <WebSolution content={content} />;
  }

  return (
    <ComingSoon solution={solution as Exclude<SupportedSolution, 'crm'>} />
  );
}

function CRMSolution({ content }: { content: FocusContent }) {
  return (
    <main className='bg-background text-foreground'>
      <CRMHero />
      <CapabilitiesSection tiles={content.capabilities} />
      <OutcomeSnapshots items={content.outcomes} />
      <ServiceJourney />
      <HowWeWork />
      <FAQ />
      <CTASection
        heading='Ready to ship a CRM your technicians will actually use?'
        description='Book a 30-minute working session. We will map your process, highlight automation wins, and scope the first sprint.'
        buttons={[
          { label: 'Start a project' },
          { label: 'Share requirements', variant: 'secondary' },
        ]}
      />
    </main>
  );
}

function GolfSolution({ content }: { content: FocusContent }) {
  return (
    <main className='bg-background text-foreground'>
      <GolfCourseHero />
      <GolfCapabilitiesSection tiles={content.capabilities} />
      <section className='bg-background py-20'>
        <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <GolfOutcomes items={content.outcomes} />
        </div>
      </section>
      <GolfFAQ items={content.faq} />
      <CTASection
        heading='Ready to modernize your tee sheet?'
        description='Book a 30-minute planning session. We will audit your current setup, outline quick wins, and chart the rollout for your course.'
        buttons={[
          { label: 'Schedule demo' },
          { label: 'Plan your rollout', variant: 'secondary' },
        ]}
        tone='secondary'
        backgroundClassName='bg-secondary'
      />
    </main>
  );
}

function WebSolution({ content }: { content: FocusContent }) {
  return (
    <VideoShowcaseProvider>
      <main className='bg-background text-foreground'>
        <WebHero />
        {content.features?.length ? (
          <WebFeatures features={content.features} />
        ) : null}
        <WebCapabilities capabilities={content.capabilities} />
        <WebVideoShowcase />

        <WebProcess />

        <section className='py-20'>
          <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
            <OutcomeSnapshots items={content.outcomes} />
          </div>
        </section>
        <CTASection
          heading='Ready to bring your next portal to life?'
          description='Spin up a 30-minute roadmap session. We will uncover the must-haves, assess integrations, and share a rollout plan.'
          buttons={[
            { label: 'Start your project' },
            { label: 'Review requirements', variant: 'secondary' },
          ]}
        />
      </main>
    </VideoShowcaseProvider>
  );
}

function ComingSoon({
  solution,
}: {
  solution: Exclude<SupportedSolution, 'crm'>;
}) {
  const readable = solution.replace(/-/g, ' ');
  return (
    <main className='min-h-screen bg-background pt-28 text-foreground'>
      <div className='mx-auto max-w-5xl px-4 py-24 sm:px-6'>
        <h1 className='text-4xl font-semibold capitalize sm:text-5xl'>
          {readable}
        </h1>
        <p className='mt-6 text-lg text-muted-foreground'>
          We&apos;re building this experience right now. Check back soon or
          reach out to start a tailored build.
        </p>
        <div className='mt-10'>
          <CTASection
            heading='Need a tailored solution sooner?'
            description='Book a build planning call and we’ll scope your custom platform while this experience ships.'
            buttons={[{ label: 'Plan your project' }]}
            backgroundClassName='bg-transparent'
          />
        </div>
        <div className='mt-8'>
          <InteractiveHoverButton
            type='button'
            text='Talk to our team'
            onClick={() => openCalendlyPopup()}
            className='w-full sm:w-auto px-8 py-3 text-sm font-semibold bg-service-software text-background border-transparent transition-transform duration-300 hover:-translate-y-0.5'
          />
        </div>
      </div>
    </main>
  );
}
