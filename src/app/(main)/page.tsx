import { Metadata } from 'next';
import { FAQSection } from '@/components/sections/FAQSection';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { IterativeProcessSection } from '@/components/home/IterativeProcessSection';
import { VoiceReceptionistSection } from '@/components/home/VoiceReceptionistSection';
import { ImpactSection } from '@/components/home/ImpactSection';
import CTASection from '@/components/CTASection';
import { WavyDivider } from '@/components/WavyDivider';

export const metadata: Metadata = {
  title: 'Swiftware — Software Development & Digital Services',
  description:
    'One partner. Four services. Brand Design, Digital Marketing & SEO, AI & Process Automation, and Custom Software Development.',
};

const faqs = [
  {
    question: 'Why choose SwiftWare instead of hiring multiple agencies?',
    answer:
      'Multiple agencies mean multiple conversations, inconsistent strategies, and high coordination overhead. We bring everything together in one unified partnership, ensuring all services work synergistically.',
  },
  {
    question: 'What industries do you work with?',
    answer:
      'We work with businesses across all industries - from local services to e-commerce to SaaS. Our diverse experience means we understand your unique challenges and can apply proven strategies from various sectors.',
  },
  {
    question: 'Do you work with new companies?',
    answer:
      "Absolutely. Whether you're a startup or established company, we can help you build your brand, grow visibility, and develop custom solutions. We offer flexible packages for all budgets.",
  },
  {
    question: 'What is your typical engagement length?',
    answer:
      'Most engagements are 3-6 months initial implementation, with ongoing support available. We recommend longer terms for SEO (6-12+ months) as search visibility builds over time.',
  },
  {
    question: 'How do you measure success?',
    answer:
      'We track metrics that matter to your business: revenue generated, leads qualified, traffic growth, brand awareness, and process efficiency improvements. You get monthly reports with transparent data.',
  },
];

export default function Home() {
  return (
    <main className='relative' suppressHydrationWarning>
      <HeroSection />
      <WavyDivider direction='up' fromColor='secondary' toColor='background' />

      <ServicesGrid />

      <IterativeProcessSection />

      <WavyDivider
        direction='down'
        fromColor='secondary'
        toColor='background'
      />
      <VoiceReceptionistSection />

      <WavyDivider
        direction='down'
        fromColor='background'
        toColor='secondary'
      />

      <ImpactSection />
      <WavyDivider
        direction='down'
        fromColor='secondary'
        toColor='background'
      />

      <FAQSection
        title='Frequently Asked Questions'
        description="Got questions? We've got answers."
        items={faqs}
      />
      <WavyDivider
        direction='down'
        fromColor='background'
        toColor='secondary'
      />

      <CTASection
        heading='Ready to Launch Your Automation Roadmap?'
        description="Book a free strategy session and we'll map the highest-impact workflows to automate across your team."
        buttons={[{ label: 'Book Automation Audit' }]}
        backgroundClassName='bg-secondary'
      />
    </main>
  );
}
