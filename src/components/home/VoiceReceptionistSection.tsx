'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Volume2, MessageSquare, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Orb } from '@/components/ui/orb';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { openCalendlyPopup } from '@/lib/calendly';

// ============================================================================
// Constants
// ============================================================================

const QUICK_ASK_PRESETS = [
  { label: 'What services do you offer?', icon: Sparkles },
  { label: 'How much does a project cost?', icon: MessageSquare },
  { label: "What's your typical timeline?", icon: MessageSquare },
  { label: 'Can you help with AI automation?', icon: Sparkles },
] as const;

// ============================================================================
// Types
// ============================================================================

type AgentState = 'idle' | 'connecting' | 'listening' | 'thinking' | 'speaking';

// ============================================================================
// Component
// ============================================================================

export function VoiceReceptionistSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // UI State (no actual API calls - just UI demonstration)
  const [agentState, setAgentState] = useState<AgentState>('idle');
  const [response, setResponse] = useState<string | null>(null);

  // Handle quick-ask preset click
  const handleQuickAsk = useCallback(async (preset: string) => {
    setAgentState('connecting');
    setResponse(null);

    // Simulate connection
    await new Promise((resolve) => setTimeout(resolve, 500));
    setAgentState('thinking');

    // Simulate thinking
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setAgentState('speaking');

    // Simulate response
    setResponse(
      "Thanks for reaching out! I'm SwiftWare's AI assistant. A team member will get back to you shortly with personalized information about your inquiry."
    );

    // Reset after "speaking"
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setAgentState('idle');
  }, []);

  // Map agent state to orb state
  const getOrbState = () => {
    switch (agentState) {
      case 'listening':
        return 'listening';
      case 'thinking':
        return 'thinking';
      case 'speaking':
        return 'talking';
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      className='relative py-16 sm:py-24 bg-background overflow-hidden'
      aria-labelledby='voice-receptionist-heading'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        {/* Header */}
        <motion.div
          className='text-center mb-10 sm:mb-14'
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            id='voice-receptionist-heading'
            className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground'
          >
            Ask Our{' '}
            <span className='bg-gradient-to-r from-service-ai to-service-ai-dark bg-clip-text text-transparent'>
              AI Assistant
            </span>
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Experience one of our AI models in action. Click a question below to see how it responds.
          </p>

          {/* Sound indicator */}
          <motion.div
            className='inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-card border border-border'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Volume2 className='w-4 h-4 text-service-ai' />
            <span className='text-sm text-muted-foreground'>
              Turn on your sound for the full experience
            </span>
          </motion.div>
        </motion.div>

        {/* Two Column Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start'>
          {/* Left Column: Orb and Quick Ask */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className='overflow-hidden border-border/50 shadow-xl'>
              <CardHeader className='text-center border-b border-border/50 pb-6'>
                {/* Orb Container */}
                <div className='flex flex-col items-center'>
                  <div className='w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden ring-2 ring-border/50 shadow-lg'>
                    <Orb
                      className='w-full h-full'
                      colors={['#A855F7', '#7C3AED']}
                      agentState={getOrbState()}
                    />
                  </div>

                  {/* Status indicator - positioned below orb */}
                  <div
                    className={cn(
                      'mt-4 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300',
                      agentState === 'idle' && 'bg-muted text-muted-foreground',
                      agentState === 'connecting' &&
                        'bg-yellow-500/20 text-yellow-500 animate-pulse',
                      agentState === 'thinking' &&
                        'bg-service-ai/20 text-service-ai animate-pulse',
                      agentState === 'speaking' &&
                        'bg-green-500/20 text-green-500',
                      agentState === 'listening' && 'bg-blue-500/20 text-blue-500'
                    )}
                  >
                    {agentState === 'idle' && 'Ready to help'}
                    {agentState === 'connecting' && 'Connecting...'}
                    {agentState === 'thinking' && 'Thinking...'}
                    {agentState === 'speaking' && 'Speaking'}
                    {agentState === 'listening' && 'Listening...'}
                  </div>
                </div>

                <CardTitle className='text-lg sm:text-xl mt-4'>
                  SwiftWare AI
                </CardTitle>
                <CardDescription>
                  One of our AI models
                </CardDescription>
              </CardHeader>

              <CardContent className='pt-6 space-y-6'>
                {/* Response area */}
                {response && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='p-4 rounded-lg bg-muted/50 border border-border/50'
                  >
                    <p className='text-foreground text-sm sm:text-base leading-relaxed'>
                      {response}
                    </p>
                  </motion.div>
                )}

                {/* Quick Ask Presets - Centered */}
                <div className='space-y-3'>
                  <div className='flex flex-wrap justify-center gap-2'>
                    {QUICK_ASK_PRESETS.map((preset) => (
                      <Button
                        key={preset.label}
                        variant='outline'
                        size='sm'
                        className='text-xs sm:text-sm cursor-pointer hover:bg-service-ai/10 hover:border-service-ai/50 hover:text-service-ai transition-all'
                        onClick={() => handleQuickAsk(preset.label)}
                        disabled={agentState !== 'idle'}
                      >
                        <preset.icon className='w-3 h-3 mr-1.5' />
                        {preset.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column: Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className='flex flex-col justify-between h-full'
          >
            <div className='space-y-4'>
              <h3 className='text-2xl sm:text-3xl font-bold text-foreground'>
                AI Receptionist
              </h3>
              <p className='text-base sm:text-lg text-muted-foreground leading-relaxed'>
                This is <span className='font-semibold text-foreground'>one of our AI models</span>—an AI receptionist trained on SwiftWare&apos;s services and knowledge base. It can answer questions, handle inquiries, and provide instant responses 24/7.
              </p>
              <p className='text-base sm:text-lg text-muted-foreground leading-relaxed'>
                For a <span className='font-semibold text-foreground'>full demo</span>, book a call to see your AI receptionist trained on <span className='font-semibold text-foreground'>your business</span>. We&apos;ll customize it with your company knowledge, processes, and brand voice.
              </p>
            </div>

            <div className='flex justify-center mt-6'>
              <InteractiveHoverButton
                onClick={() => openCalendlyPopup()}
                text='Book a Call for Full Demo'
                className='w-auto px-10 py-4 text-base'
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
