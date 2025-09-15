'use client';

import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { useEffect } from 'react';
import { openCalendlyPopup, initCalendlyScripts } from '@/lib/calendly';

interface SchedulingWidgetProps {
  calendlyUrl?: string;
  className?: string;
  onEventScheduled?: () => void;
}

export default function SchedulingWidget({
  calendlyUrl = 'https://calendly.com/swiftwareco/30min',
  className = '',
  onEventScheduled,
}: SchedulingWidgetProps) {
  useEffect(() => {
    initCalendlyScripts();
  }, []);

  const handleScheduleClick = () => {
    openCalendlyPopup(calendlyUrl);
    onEventScheduled?.();
  };

  return (
    <div className={`w-full ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='bg-zinc-900/40 border border-zinc-800 rounded-xl p-12 text-center'
      >
        <div className='mb-6'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4'>
            <Calendar className='w-8 h-8 text-white' />
          </div>
          <h3 className='text-2xl font-semibold text-white mb-3'>
            Ready to Get Started?
          </h3>
          <p className='text-zinc-400 mb-8 max-w-md mx-auto leading-relaxed'>
            Schedule a 30-minute discovery call via Google Meet to discuss your
            project needs and explore how we can help.
          </p>
        </div>

        <motion.button
          onClick={handleScheduleClick}
          className='inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-lg rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300'
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Calendar className='w-5 h-5' />
          Schedule Discovery Call
        </motion.button>

        <p className='text-xs text-zinc-500 mt-6'>
          Available Mon-Fri, 9 AM - 6 PM PST
        </p>
      </motion.div>
    </div>
  );
}
