import type { Metadata } from 'next';

import AIMLHero from '@/components/ai-ml/AIMLHero';
import AIProcessFlow from '@/components/ai-ml/sections/AIProcessFlow';
import AIDemoSection from '@/components/ai-ml/sections/AIDemoSection';
import AIVoiceReceptionistSection from '@/components/ai-ml/sections/AIVoiceReceptionistSection';
import AIOutcomesSection from '@/components/ai-ml/sections/AIOutcomesSection';
import { FAQSection } from '@/components/sections/FAQSection';
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

const FAQ_ITEMS = [
  {
    question: 'Why do you need this?',
    answer:
      'Most businesses have valuable insights trapped in documents, emails, and databases that are impossible to access quickly. SwiftMind transforms this scattered information into an intelligent, searchable knowledge base that provides instant answers, accelerates decision-making, and eliminates time wasted searching for information.',
  },
  {
    question: 'How secure is our data?',
    answer:
      'Enterprise-grade encryption with multi-tenant isolation, role-based access control, and comprehensive audit logging. Your data never leaves your secure environment.',
  },
  {
    question: 'What file formats are supported?',
    answer:
      'We support PDFs, Word docs, Excel files, CSVs, plain text, and can integrate with your existing document management systems.',
  },
  {
    question: 'How does the hybrid search work?',
    answer:
      'Our system combines semantic vector search for contextual understanding with traditional keyword matching for precision, giving you the best of both approaches.',
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

      <div className='bg-background text-foreground px-4 sm:px-6'>
        <FAQSection items={FAQ_ITEMS} />
      </div>

      <CTASection
        heading='Ready to Launch Your Automation Roadmap?'
        description='Book a free strategy session and we’ll map the highest-impact workflows to automate across your team.'
        buttons={[{ label: 'Book Automation Audit' }]}
      />
    </main>
  );
}
