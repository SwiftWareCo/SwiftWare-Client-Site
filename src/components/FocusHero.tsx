'use client';

import React from 'react';
import { useFocusContext } from '@/context/FocusContext';
import Hero from '@/components/Hero';
import CRMHero from '@/components/crm/CRMHero';
import AIMLHero from '@/components/ai-ml/AIMLHero';
import GolfCourseHero from '@/components/tee-sheet/GolfCourseHero';

export default function FocusHero() {
  const { focus } = useFocusContext();
  if (focus === 'crm') return <CRMHero />;
  if (focus === 'ai-ml') return <AIMLHero />;
  if (focus === 'tee-sheet') return <GolfCourseHero />;
  return <Hero />;
}
