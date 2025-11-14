'use client';

import React, {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number;
}

export function ContainerTextFlip({
  words = ['better', 'modern', 'beautiful', 'awesome'],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const animationSeconds = animationDuration / 1000;
  const formattedWords = useMemo(
    () => words.map((word) => word.replace(/\s/g, '\u00A0')),
    [words]
  );

  useLayoutEffect(() => {
    if (!textRef.current) {
      return;
    }

    let isCancelled = false;

    const measure = () => {
      const element = textRef.current;
      if (!element) {
        return;
      }

      const computed = window.getComputedStyle(element);
      const font = `${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        return;
      }

      context.font = font;
      const letterSpacingRaw = computed.letterSpacing;
      const letterSpacing =
        letterSpacingRaw === 'normal' ? 0 : parseFloat(letterSpacingRaw || '0');

      const widestWord = formattedWords.reduce((acc, word) => {
        const metrics = context.measureText(word);
        const spacingTotal = letterSpacing * Math.max(word.length - 1, 0);
        return Math.max(acc, metrics.width + spacingTotal);
      }, 0);

      if (!isCancelled) {
        setContainerWidth(Math.ceil(widestWord) + 40); // 40px matches the inline padding applied to the container.
      }
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!isCancelled) {
          measure();
        }
      });
    } else {
      measure();
    }

    return () => {
      isCancelled = true;
    };
  }, [formattedWords, textClassName]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => window.clearInterval(intervalId);
  }, [interval, formattedWords.length, words.length]);

  const displayWord = formattedWords[currentWordIndex];

  return (
    <motion.span
      layout
      layoutId={`words-here-${id}`}
      animate={containerWidth ? { width: containerWidth } : undefined}
      style={containerWidth ? { width: containerWidth } : undefined}
      transition={{ duration: animationSeconds / 2 }}
      className={cn(
        'relative inline-block max-w-full whitespace-nowrap rounded-2xl px-6 py-4 text-center text-3xl font-bold md:text-6xl',
        'bg-card text-card-foreground shadow-[0_18px_48px_rgba(var(--color-primary-service-rgb),0.18)]',
        className
      )}
      key={displayWord}
    >
      <motion.span
        transition={{
          duration: animationSeconds,
          ease: 'easeInOut',
        }}
        className={cn('inline-block whitespace-nowrap', textClassName)}
        ref={textRef}
        layoutId={`word-div-${displayWord}-${id}`}
      >
        <motion.span className='inline-block'>
          {displayWord.split('').map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: 'blur(6px)', scale: 0.95 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              transition={{
                delay: index * 0.05,
                duration: animationSeconds * 0.75,
                ease: 'easeOut',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      </motion.span>
    </motion.span>
  );
}
