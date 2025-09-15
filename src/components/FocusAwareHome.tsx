'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useFocusContext } from '@/context/FocusContext';
import { getContentForFocusClient } from '@/lib/focusContent';

// Import CRM components
import CapabilitiesSection from '@/components/crm/sections/CapabilitiesSection';
import ServiceJourney from '@/components/crm/sections/ServiceJourney';
import OutcomeSnapshots from '@/components/crm/sections/OutcomeSnapshots';
import FAQ from '@/components/crm/sections/FAQ';
import HowWeWork from '@/components/crm/sections/HowWeWork';
import ContactDialog from '@/components/ContactDialog';
import CaseStudyModal from '@/components/crm/CaseStudyModal';

// Import AI/ML components
import AIOutcomesSection from '@/components/ai-ml/sections/AIOutcomesSection';
import AIProcessFlow from '@/components/ai-ml/sections/AIProcessFlow';
import AIDemoSection from '@/components/ai-ml/sections/AIDemoSection';
import AIFAQ from '@/components/ai-ml/sections/AIFAQ';

export default function FocusAwareHome() {
  const { focus, showContactModal, setShowContactModal } = useFocusContext();
  const [showCaseStudy, setShowCaseStudy] = useState(false);

  const copy = useMemo(() => {
    switch (focus) {
      case 'crm':
        return 'CRMs that field teams actually use.';
      case 'tee-sheet':
        return 'Operations that run themselves.';
      case 'ai-ml':
        return 'AI-driven business intelligence that transforms your data.';
      case 'web':
        return 'Websites & portals that convert.';
      default:
        return 'Choose a focus to tailor the content.';
    }
  }, [focus]);

  const crmData = useMemo(() => {
    return focus === 'crm' ? getContentForFocusClient('crm') : null;
  }, [focus]);

  const aiMlData = useMemo(() => {
    return focus === 'ai-ml' ? getContentForFocusClient('ai-ml') : null;
  }, [focus]);

  if (focus === 'crm' && crmData) {
    return (
      <section aria-live='polite' className='w-full'>
        {/* Hero Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='mx-auto max-w-5xl px-4 sm:px-6 py-8'
        >
          <div className='rounded-xl border border-zinc-800/50 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-zinc-900/40 p-6 backdrop-blur-sm'>
            <p className='text-lg text-zinc-200 font-medium text-center'>
              {copy}
            </p>
          </div>
        </motion.div>

        {/* CRM Content Sections */}
        <div className='space-y-0'>
          {/* Capabilities Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <CapabilitiesSection tiles={crmData.capabilities} />
          </motion.div>

          {/* Service Journey */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <ServiceJourney />
          </motion.div>

          {/* Outcomes */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className='py-20 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent'
          >
            <div className='max-w-7xl mx-auto px-4 sm:px-6'>
              <div className='text-center mb-16'>
                <h2 className='text-4xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent'>
                  Real Results, Real Businesses
                </h2>
                <p className='text-xl text-zinc-300 max-w-3xl mx-auto'>
                  Measurable improvements that translate to your bottom line.
                </p>
              </div>
              <OutcomeSnapshots items={crmData.outcomes} />
            </div>
          </motion.section>

          {/* How We Work */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <HowWeWork />
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <FAQ />
          </motion.div>

          {/* Contact CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className='py-20 relative overflow-hidden'
          >
            <div className='max-w-4xl mx-auto px-4 sm:px-6 text-center'>
              <h2 className='text-4xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent'>
                Ready to Transform Your Operations?
              </h2>
              <p className='text-xl text-zinc-300 max-w-2xl mx-auto mb-8'>
                Let&apos;s discuss how our CRM solution can help your team work
                more efficiently and deliver better results.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <button
                  onClick={() => setShowContactModal(true)}
                  className='inline-flex cursor-pointer items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300'
                >
                  Schedule Discovery Call
                </button>
                <button
                  onClick={() => setShowCaseStudy(true)}
                  className='inline-flex cursor-pointer items-center justify-center gap-2 px-8 py-4 border border-zinc-600 text-zinc-300 font-medium rounded-xl hover:border-blue-500/50 hover:text-blue-300 transition-all duration-300'
                >
                  See Our Success Story
                </button>
              </div>
            </div>
          </motion.section>

          {/* Contact Dialog */}
          <ContactDialog
            isOpen={showContactModal}
            onClose={() => setShowContactModal(false)}
          />

          {/* Case Study Modal */}
          <CaseStudyModal
            isOpen={showCaseStudy}
            onClose={() => setShowCaseStudy(false)}
            onContactClick={() => setShowContactModal(true)}
          />
        </div>
      </section>
    );
  }

  if (focus === 'ai-ml' && aiMlData) {
    return (
      <section aria-live='polite' className='w-full'>
        {/* Hero Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='mx-auto max-w-5xl px-4 sm:px-6 py-8'
        >
          <div className='rounded-xl border border-teal-800/50 bg-gradient-to-br from-teal-500/10 via-blue-500/5 to-zinc-900/40 p-6 backdrop-blur-sm'>
            <p className='text-lg text-zinc-200 font-medium text-center'>
              {copy}
            </p>
          </div>
        </motion.div>

        {/* AI/ML Content Sections */}
        <div className='space-y-0'>
          {/* AI Process Flow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <AIProcessFlow />
          </motion.div>

          {/* AI Demo Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <AIDemoSection />
          </motion.div>

          {/* AI Outcomes */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className='py-20 bg-gradient-to-b from-transparent via-teal-500/5 to-transparent relative overflow-hidden'
          >
            {/* Full-width background */}
            <div className='absolute inset-0 -z-10'>
              <div className='absolute top-1/4 left-1/4 size-96 bg-teal-500/3 rounded-full blur-3xl' />
              <div className='absolute bottom-1/4 right-1/4 size-80 bg-blue-500/4 rounded-full blur-3xl' />
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6'>
              <div className='text-center mb-16'>
                <h2 className='text-4xl font-bold mb-6 bg-gradient-to-r from-white via-teal-100 to-blue-100 bg-clip-text text-transparent'>
                  Real Results, Measurable Impact
                </h2>
                <p className='text-xl text-zinc-300 max-w-3xl mx-auto'>
                  Measurable improvements that transform how your team works
                  with data.
                </p>
              </div>
              <AIOutcomesSection items={aiMlData.outcomes} />
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <AIFAQ />
          </motion.div>

          {/* Contact CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className='py-20 relative overflow-hidden'
          >
            <div className='max-w-4xl mx-auto px-4 sm:px-6 text-center'>
              <h2 className='text-4xl font-bold mb-6 bg-gradient-to-r from-white via-teal-100 to-blue-100 bg-clip-text text-transparent'>
                Ready to Transform Your Data into Intelligence?
              </h2>
              <p className='text-xl text-zinc-300 max-w-2xl mx-auto mb-8'>
                Let&apos;s discuss how SwiftMind can unlock the hidden insights
                in your business data.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <button
                  onClick={() => setShowContactModal(true)}
                  className='inline-flex cursor-pointer items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300'
                >
                  Start Your AI Journey
                </button>
              </div>
            </div>
          </motion.section>

          {/* Contact Dialog */}
          <ContactDialog
            isOpen={showContactModal}
            onClose={() => setShowContactModal(false)}
          />

          {/* Case Study Modal */}
          <CaseStudyModal
            isOpen={showCaseStudy}
            onClose={() => setShowCaseStudy(false)}
            onContactClick={() => setShowContactModal(true)}
          />
        </div>
      </section>
    );
  }

  // Default layout for other focuses
  return (
    <section aria-live='polite' className='mx-auto max-w-5xl px-0 sm:px-6 py-6'>
      <div className='rounded-xl border border-zinc-800 bg-zinc-900/40 p-4'>
        <p className='text-sm text-zinc-300'>{copy}</p>
      </div>
    </section>
  );
}
