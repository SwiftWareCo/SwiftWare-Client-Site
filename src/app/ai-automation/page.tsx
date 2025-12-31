import type { Metadata } from 'next';

import AIMLHero from '@/components/ai-ml/AIMLHero';
import AIProcessFlow from '@/components/ai-ml/sections/AIProcessFlow';
import AIDemoSection from '@/components/ai-ml/sections/AIDemoSection';
import AIVoiceReceptionistSection from '@/components/ai-ml/sections/AIVoiceReceptionistSection';
import AIOutcomesSection from '@/components/ai-ml/sections/AIOutcomesSection';
import AIFAQ from '@/components/ai-ml/sections/AIFAQ';
import CTASection from '@/components/CTASection';
import type { Outcome } from '@/types/content';

export const metadata: Metadata = {
  title: 'AI & Process Automation Platform | SwiftWare',
  description:
    'Deploy AI agents, automate processes, and unlock real-time insight with SwiftMind—SwiftWare’s automation stack built for operations teams.',
};

const OUTCOMES: Outcome[] = [
  {
    metric: '-75%',
    unit: 'search time',
    blurb: 'Instant answers from enterprise knowledge bases and workflows.',
  },
  {
    metric: '+3.2×',
    unit: 'data insights',
    blurb:
      'AI-powered analytics that surface actionable patterns automatically.',
  },
  {
    metric: '-60%',
    unit: 'manual processing',
    blurb: 'Automated document ingestion, classification, and alerting.',
  },
];

export default function AIAutomationPage() {
  return (
    <main className='flex flex-col gap-0'>
      <AIMLHero />

      <div className='bg-background text-foreground'>
        <AIProcessFlow />
      </div>

      <div className='bg-secondary text-secondary-foreground'>
        <AIDemoSection />
      </div>

      <div className='bg-background text-foreground'>
        <AIVoiceReceptionistSection />
      </div>

      <div className='bg-secondary text-secondary-foreground'>
        <AIOutcomesSection items={OUTCOMES} />
      </div>

      <div className='bg-secondary text-secondary-foreground'>
        <AIFAQ />
      </div>

      <CTASection
        heading='Ready to Launch Your Automation Roadmap?'
        description='Book a free strategy session and we’ll map the highest-impact workflows to automate across your team.'
        buttons={[{ label: 'Book Automation Audit' }]}
      />
    </main>
  );
}
