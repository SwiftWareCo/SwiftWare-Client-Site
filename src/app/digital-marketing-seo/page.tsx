import { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { MarketingCaseStudy } from '@/components/digital-marketing/MarketingCaseStudy';

export const metadata: Metadata = {
  title: 'SEO Agency & Digital Marketing Services | SwiftWare',
  description:
    'Professional SEO and digital marketing services for local, e-commerce, and SaaS businesses. Drive visibility and qualified leads.',
};

const services = [
  {
    title: 'Search Engine Optimization (SEO)',
    description:
      'Technical SEO, on-page optimization, and link building to improve your search visibility.',
    iconName: 'Search',
  },
  {
    title: 'Social Media Marketing (SMMA)',
    description:
      'Content creation, community management, and paid social campaigns on TikTok, Instagram, LinkedIn, and more.',
    iconName: 'Share2',
  },
  {
    title: 'Content Marketing & Strategy',
    description:
      'Compelling content that attracts, engages, and converts your target audience.',
    iconName: 'TrendingUp',
  },
  {
    title: 'Analytics & Performance Tracking',
    description:
      'Data-driven insights with custom dashboards showing ROI and key metrics.',
    iconName: 'BarChart3',
  },
  {
    title: 'Paid Advertising (PPC & Social)',
    description:
      'Strategic paid campaigns designed to maximize your ROI and customer acquisition.',
    iconName: 'Zap',
  },
  {
    title: 'Local, E-commerce & SaaS SEO',
    description:
      'Specialized optimization for your industry vertical and target market.',
    iconName: 'Globe',
  },
] as const;

const processSteps = [
  {
    number: 1,
    title: 'Audit & Analysis',
    description:
      'Comprehensive assessment of your current digital presence, competitors, and opportunities.',
  },
  {
    number: 2,
    title: 'Strategy Development',
    description:
      'Data-driven strategy targeting high-intent keywords and untapped market segments.',
  },
  {
    number: 3,
    title: 'Implementation',
    description:
      'Content creation, technical optimization, paid campaign setup, and content distribution.',
  },
  {
    number: 4,
    title: 'Monitoring & Optimization',
    description:
      'Continuous testing and refinement based on performance data and market changes.',
  },
];

const faqs = [
  {
    question: 'How long before I see results from SEO?',
    answer:
      'Most campaigns see initial improvements within 3-6 months, with significant results by 6-12 months. The timeline depends on competition, current domain authority, and your industry.',
  },
  {
    question: 'What is your approach to content creation?',
    answer:
      'We create high-quality, SEO-optimized content that ranks well and converts visitors into customers. This includes blogs, guides, case studies, and multimedia content.',
  },
  {
    question: 'Do you manage paid advertising as well?',
    answer:
      'Yes! We manage Google Ads, Facebook, Instagram, LinkedIn, and TikTok campaigns with a focus on maximizing ROI and reducing customer acquisition costs.',
  },
  {
    question: 'How do you measure success?',
    answer:
      'We track metrics that matter: organic traffic growth, keyword rankings, conversion rates, lead quality, and revenue generated. You get monthly reports with transparent data.',
  },
  {
    question: 'Can you work with businesses in competitive industries?',
    answer:
      'Absolutely. We specialize in competitive niches by finding untapped keyword opportunities and creating content that outranks competitors through quality and authority.',
  },
];

export default function DigitalMarketingPage() {
  return (
    <ServicePageTemplate
      title='Visibility. Traffic. Qualified Leads.'
      subtitle='Digital marketing that drives real business results for North American companies'
      heroDescription='We combine SEO, social media marketing, content strategy, and paid advertising to help businesses attract qualified customers and grow revenue.'
      ctaText='Get More Leads'
      ctaSecondary='View Our Work'
    >
      <FeaturesSection
        title='Digital Marketing Services'
        description='Comprehensive marketing solutions designed for your business goals.'
        features={services}
      />

      <MarketingCaseStudy />

      <ProcessSection
        title='Our Digital Marketing Process'
        description='A proven methodology to attract and convert your ideal customers.'
        steps={processSteps}
      />

      <FAQSection
        title='Digital Marketing FAQs'
        description='Common questions about our SEO and digital marketing services.'
        items={faqs}
      />
    </ServicePageTemplate>
  );
}
