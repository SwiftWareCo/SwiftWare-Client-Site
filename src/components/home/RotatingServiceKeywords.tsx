'use client';

import { motion } from 'motion/react';
import { useColorScheme } from '@/context/ColorSchemeContext';
import { useEffect, useState } from 'react';

const SERVICES = [
  'Brand Design',
  'Digital Marketing',
  'AI Automation',
  'Custom Software',
];

export function RotatingServiceKeywords() {
  const { colors } = useColorScheme();
  const [displayedText, setDisplayedText] = useState('');
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentService = SERVICES[currentServiceIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const delayBeforeDelete = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentService.length) {
          setDisplayedText(currentService.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), delayBeforeDelete);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentServiceIndex((prev) => (prev + 1) % SERVICES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentServiceIndex]);

  return (
    <span
      style={{
        color: colors.primary,
      }}
      className='font-semibold inline-block'
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        className='ml-0.5'
      >
        |
      </motion.span>
    </span>
  );
}
