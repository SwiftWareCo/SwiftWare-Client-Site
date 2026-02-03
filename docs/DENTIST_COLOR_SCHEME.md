# Dentist Page Color Scheme

This document defines the current color palette and usage guidelines for the Dentist page and its components.

## Core Palette (Brand)
- Primary (Sky): `#0ea5e9` (`sky-500`)
  - Used for primary gradients, highlights, and icon accents.
  - Source: `src/components/dentist/DentistHeader.tsx`, `src/components/dentist/DentistHoverButton.tsx`
- Secondary (Teal): `#14b8a6` (`teal-500`)
  - Used as the secondary gradient stop and supporting accents.
  - Source: `src/components/dentist/DentistHeader.tsx`, `src/components/dentist/DentistHoverButton.tsx`

## Primary Gradient Combos
- Brand gradient (buttons, CTA fills, dividers):
  - Tailwind: `bg-gradient-to-r from-sky-500 to-teal-500`
  - Used in: `src/components/dentist/DentistHoverButton.tsx`, `src/components/dentist/DentistCTASection.tsx`
- CTA background gradient:
  - Tailwind: `bg-gradient-to-br from-sky-600 via-sky-500 to-teal-500`
  - Used in: `src/components/dentist/DentistCTASection.tsx`
- Hero background gradient:
  - Tailwind: `bg-gradient-to-b from-sky-300 via-teal-200 to-emerald-100`
  - Used in: `src/components/dentist/DentistHero.tsx`

## Supporting Accents (Section-Specific)
These are intentionally used for variety while keeping the core brand consistent.
- Emerald (growth/success cues):
  - `emerald-400`, `emerald-500`
  - Used in: `src/components/dentist/DentistHero.tsx` (trust indicators, gradients)
- Violet/Indigo (contrast in floating elements):
  - `violet-400`, `purple-500`, `indigo-500`
  - Used in: `src/components/dentist/DentistHero.tsx` (floating cards, particles)
- Amber/Orange (rating/energy):
  - `amber-400`, `orange-500`
  - Used in: `src/components/dentist/DentistHero.tsx` (floating cards)
- Pink/Purple (social/media emphasis):
  - `pink-500`, `pink-50`, `purple-600`, `purple-50`
  - Used in: `src/components/dentist/SocialMediaSection.tsx`

## Neutrals
- White and soft slates are used for contrast and readability:
  - `bg-white`, `text-slate-600`, `text-slate-700`, `border-slate-200`
  - Used in: Dentist hero content, badges, cards, and buttons

## Wavy Dividers (Dentist CTA)
- Use gradient fill to match brand tone:
  - Gradient stops: `#0ea5e9` → `#14b8a6`
  - Used in: `src/components/dentist/DentistCTASection.tsx`

## Quick Notes
- “Sky” is the brand primary and reads as the Dentist page’s main blue.
- Teal is the secondary anchor for gradients and hover fills.
- Pink is intentionally reserved for Social Media marketing visuals to add contrast.
