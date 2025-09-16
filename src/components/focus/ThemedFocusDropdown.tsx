'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useFocusContext } from '@/context/FocusContext';
import type { FocusKey } from '@/lib/useFocus';
import { createPortal } from 'react-dom';

const LABELS: Record<FocusKey, string> = {
  crm: 'Service CRM',
  'tee-sheet': 'Tee Sheet',
  'ai-ml': 'AI & RAG',
  web: 'Web & Portals',
  'all-solutions': 'All Solutions',
};

export default function ThemedFocusDropdown() {
  const { focus, setFocus, clearFocus } = useFocusContext();
  const [open, setOpen] = useState(false);
  const options = useMemo(
    () => ['all-solutions', 'crm', 'tee-sheet', 'ai-ml', 'web'] as FocusKey[],
    []
  );
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(
    null
  );

  const currentLabel = focus ? `Focus: ${LABELS[focus]}` : 'Choose Focus';

  useEffect(() => {
    if (!open) return;
    function updatePosition() {
      const el = buttonRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setMenuPos({
        top: Math.round(rect.bottom + 8),
        left: Math.round(rect.right),
      });
    }
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, { passive: true });
    const onDocClick = (e: MouseEvent) => {
      const el = buttonRef.current;
      if (!el) return;
      const target = e.target as Node;
      if (!el.contains(target)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className=' hover:cursor-pointer relative'>
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        className='inline-flex hover:cursor-pointer items-center gap-2 rounded-lg border border-zinc-700/60 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-900'
      >
        <Sparkles className='size-4 text-blue-400' />
        <span>{currentLabel}</span>
        <ChevronDown className='size-4 text-zinc-500' />
      </button>

      {open &&
        menuPos &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className='fixed z-[1000] w-56 rounded-lg border border-zinc-700/60 bg-zinc-950/90 backdrop-blur p-1 shadow-xl'
            style={{
              top: menuPos.top,
              left: menuPos.left,
              transform: 'translateX(-100%)',
            }}
          >
            {options.map((key) => (
              <button
                key={key}
                onClick={() => {
                  setFocus(key);
                  setOpen(false);
                }}
                className={`w-full hover:cursor-pointer text-left rounded-md px-3 py-2 text-sm ${focus === key ? 'bg-zinc-800/50 text-white' : 'text-zinc-300 hover:bg-zinc-900'}`}
              >
                {`Focus: ${LABELS[key]}`}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
