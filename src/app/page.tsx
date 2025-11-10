import { Metadata } from 'next';
import { FAQSection } from '@/components/sections/FAQSection';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { ScrollTriggeredImpactSection } from '@/components/home/ScrollTriggeredImpactSection';
import { PackagesGrid } from '@/components/home/PackagesGrid';
import { CompanyStorySection } from '@/components/home/CompanyStorySection';
import { CTASection } from '@/components/home/CTASection';
import { WavyDivider } from '@/components/WavyDivider';

export const metadata: Metadata = {
  title: 'Swiftware — Software Development & Digital Services',
  description:
    'One partner. Four services. Brand Design, Digital Marketing & SEO, AI & Process Automation, and Custom Software Development.',
};

const services = [
  {
    title: 'Brand Strategy & Design',
    description: 'Logo design, brand guidelines, and visual identity that builds trust.',
    href: '/brand-design',
    color: 'from-cyan-500 to-teal-500',
    colorAccent: 'text-cyan-400',
  },
  {
    title: 'Digital Marketing & SEO',
    description: 'Visibility, traffic, and qualified leads through strategic marketing.',
    href: '/digital-marketing-seo',
    color: 'from-emerald-500 to-green-600',
    colorAccent: 'text-emerald-400',
  },
  {
    title: 'AI & Process Automation',
    description: 'Automate blockers and unlock revenue with intelligent solutions.',
    href: '/ai-automation',
    color: 'from-purple-500 to-violet-600',
    colorAccent: 'text-purple-400',
  },
  {
    title: 'Custom Software Development',
    description: 'CRM, AI solutions, golf management, and web portals built for you.',
    href: '/custom-software',
    color: 'from-indigo-600 to-blue-600',
    colorAccent: 'text-indigo-400',
  },
];

const packages = [
  {
    name: 'Build & Launch',
    services: ['Brand Design', 'Custom Website'],
    description: 'Perfect for new businesses and rebrands',
  },
  {
    name: 'Growth Engine',
    services: ['Digital Marketing & SEO', 'Analytics Dashboard'],
    description: 'Perfect for growing revenue and visibility',
  },
  {
    name: 'Automate & Scale',
    services: ['Custom Software', 'AI Automation'],
    description: 'Perfect for scaling operations',
  },
  {
    name: 'Complete Transformation',
    services: ['All Four Services'],
    description: 'Perfect for complete overhaul',
  },
];

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
      'Absolutely. Whether you\'re a startup or established company, we can help you build your brand, grow visibility, and develop custom solutions. We offer flexible packages for all budgets.',
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
    <main className='relative'>
      <HeroSection />
      <WavyDivider direction="down" />

      <ServicesGrid services={services} />
      <WavyDivider direction="down" fromColor="secondary" toColor="background" />

      <ScrollTriggeredImpactSection />
      <WavyDivider direction="down" fromColor="background" toColor="secondary" />

      <PackagesGrid packages={packages} />
      <WavyDivider direction="down" fromColor="secondary" toColor="background" />

      <CompanyStorySection />
      <WavyDivider direction="down" fromColor="background" toColor="secondary" />

      {/* FAQ */}
      <section className='relative py-16 sm:py-24 bg-purple-100 dark:bg-zinc-800'>
        <div className='mx-auto max-w-7xl px-6'>
          <FAQSection
            title="Frequently Asked Questions"
            description="Got questions? We&apos;ve got answers."
            items={faqs}
          />
        </div>
      </section>
      <WavyDivider direction="down" fromColor="secondary" toColor="background" />

      <CTASection />
      
    </main>
  );
}
