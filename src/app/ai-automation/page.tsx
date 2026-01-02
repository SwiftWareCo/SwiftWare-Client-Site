import type { Metadata } from 'next';

import AIHeroWithDemo from '@/components/ai-ml/AIHeroWithDemo';
import AIServicesGrid from '@/components/ai-ml/sections/AIServicesGrid';
import AIProcessFlow from '@/components/ai-ml/sections/AIProcessFlow';
import AIDemoSection from '@/components/ai-ml/sections/AIDemoSection';
import AICaseStudySection from '@/components/ai-ml/sections/AICaseStudySection';
import { FAQSection } from '@/components/sections/FAQSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'AI & Process Automation Platform | SwiftWare',
  description:
    "Deploy AI agents, automate processes, and unlock real-time insight with SwiftMind - SwiftWare's automation stack built for operations teams.",
};

const FAQ_ITEMS = [
  {
    question: 'What AI services do you offer?',
    answer:
      'We offer AI Receptionist (voice agents), Document Intelligence (RAG search), Process Automation, AI Chatbots, Predictive Analytics, and Custom AI Solutions tailored to your business needs.',
  },
  {
    question: 'How secure is our data?',
    answer:
      'Enterprise-grade encryption with multi-tenant isolation, role-based access control, and comprehensive audit logging. Your data never leaves your secure environment.',
  },
  {
    question: 'How long does implementation take?',
    answer:
      'Most AI solutions can be deployed within 4-8 weeks. Simple automations like chatbots can launch in 1-2 weeks. Complex integrations may take longer depending on your systems.',
  },
  {
    question: 'Do I need technical expertise to use this?',
    answer:
      'No. Our AI solutions are designed for business users. We handle all the technical implementation and provide training so your team can use the tools confidently.',
  },
  {
    question: 'What kind of ROI can I expect?',
    answer:
      'Clients typically see 40-75% reduction in time spent on manual tasks, 2-3x improvement in lead capture, and significant cost savings from automation within the first 6 months.',
  },
];

export default function AIAutomationPage() {
  return (
    <main className='flex flex-col'>
      {/* Hero with AI Demo */}
      <AIHeroWithDemo />

      {/* Services We Offer */}
      <AIServicesGrid />

      {/* How It Works (simplified) */}
      <div className='bg-background'>
        <AIProcessFlow />
      </div>

      {/* AI Search Demo */}
      <div className='bg-secondary'>
        <AIDemoSection />
      </div>

      {/* Case Study - VHD */}
      <AICaseStudySection />

      <FAQSection items={FAQ_ITEMS} />

      {/* CTA */}
      <CTASection
        heading='Ready to Automate Your Business?'
        description="Book a free strategy session and we'll show you exactly how AI can transform your operations."
        buttons={[{ label: 'Book Automation Audit' }]}
      />
    </main>
  );
}
