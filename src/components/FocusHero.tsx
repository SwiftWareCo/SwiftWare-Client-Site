'use client';

import React from 'react';
import { useFocusContext } from '@/context/FocusContext';
import Hero from '@/components/Hero';
import CRMHero from '@/components/crm/CRMHero';
import AIMLHero from '@/components/ai-ml/AIMLHero';

export default function FocusHero() {
  const { focus } = useFocusContext();
  if (focus === 'crm') return <CRMHero />;
  if (focus === 'ai-ml') return <AIMLHero />;
  return <Hero />;
}
