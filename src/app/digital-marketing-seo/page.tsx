'use client';

import { motion } from 'motion/react';
import { DigitalMarketingHero } from '@/components/digital-marketing-seo/DigitalMarketingHero';
import { ProblemSolutionSection } from '@/components/digital-marketing-seo/ProblemSolutionSection';
import { WhatsIncludedSection } from '@/components/digital-marketing-seo/WhatsIncludedSection';
import { CaseStudySection } from '@/components/digital-marketing-seo/CaseStudySection';
import { UnifiedSystemConnector } from '@/components/digital-marketing-seo/UnifiedSystemConnector';
import { ServiceSpecificFAQ } from '@/components/digital-marketing-seo/ServiceSpecificFAQ';
import { FinalCTASection } from '@/components/digital-marketing-seo/FinalCTASection';

const sectionEase = [0.25, 0.1, 0.25, 1] as const; // Consistent curve for all section reveals.

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8, // Controls how quickly sections fade/slide into view.
      ease: sectionEase, // Smooths the finish so sections settle gently.
    },
  },
};

const gradientBackgroundStyle = {
  backgroundImage: `linear-gradient(135deg, var(--color-primary-service), var(--color-secondary-service))`,
};

export default function DigitalMarketingPage() {
  return (
    <>
      <DigitalMarketingHero />

      <ProblemSolutionSection />

      <motion.section
        variants={sectionVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        className='bg-background'
      >
        <WhatsIncludedSection />
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        style={gradientBackgroundStyle}
      >
        <CaseStudySection />
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        className='bg-background'
      >
        <UnifiedSystemConnector />
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
      >
        <ServiceSpecificFAQ />
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        className='bg-background'
      >
        <FinalCTASection />
      </motion.section>
    </>
  );
}
