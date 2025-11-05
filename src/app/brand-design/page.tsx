import { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { FAQSection } from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: 'Brand Identity & Logo Design Agency | SwiftWare',
  description:
    'Professional brand identity design services. Logo design, brand guidelines, and visual identity that builds trust and credibility.',
};

const features = [
  {
    title: 'Logo Design & Visual Identity',
    description:
      'Memorable, scalable logos that represent your brand across all mediums.',
    iconName: 'Palette',
  },
  {
    title: 'Brand Guidelines',
    description:
      'Comprehensive brand systems that ensure consistency across all touchpoints.',
    iconName: 'Layout',
  },
  {
    title: 'Color & Typography Strategy',
    description:
      'Thoughtfully selected palettes and typefaces that convey your brand personality.',
    iconName: 'Type',
  },
  {
    title: 'Brand Messaging',
    description:
      'Clear, compelling messaging that communicates your unique value proposition.',
    iconName: 'Zap',
  },
  {
    title: 'Brand Positioning',
    description:
      'Strategic positioning that differentiates you from competitors in your market.',
    iconName: 'Shield',
  },
  {
    title: 'Stakeholder Collaboration',
    description:
      'We work closely with your team to ensure your brand vision is fully realized.',
    iconName: 'Users',
  },
] as const;

const processSteps = [
  {
    number: 1,
    title: 'Discovery & Strategy',
    description:
      'We dive deep into understanding your business, values, target audience, and competitive landscape.',
  },
  {
    number: 2,
    title: 'Concept Development',
    description:
      'Multiple design directions explored to find the perfect visual representation of your brand.',
  },
  {
    number: 3,
    title: 'Refinement & Selection',
    description:
      'Collaborative feedback sessions to refine designs and select the strongest direction.',
  },
  {
    number: 4,
    title: 'Brand Guidelines',
    description:
      'Comprehensive documentation ensuring consistent implementation across all applications.',
  },
];

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
    <ServicePageTemplate
      title='Build the Brand That Stands Out'
      subtitle='Professional brand identity design that builds trust and wins customers'
      heroDescription='Your brand is your first impression. We create visual identities that are memorable, scalable, and perfectly aligned with your business goals.'
      ctaText='Start Your Brand'
      ctaSecondary='View Our Process'
    >
      <FeaturesSection
        title='What We Create For You'
        description='A complete brand identity system that works across all platforms and mediums.'
        features={features}
      />

      <ProcessSection
        title='Our Brand Design Process'
        description='We follow a proven methodology to deliver brands that actually work.'
        steps={processSteps}
      />

      <FAQSection
        title='Brand Design FAQs'
        description='Common questions about our brand design services and process.'
        items={faqs}
      />
    </ServicePageTemplate>
  );
}
