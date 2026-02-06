# How To Go Back To Old Website

This document explains how to restore the original (pre-dentist) homepage and legal pages.

## Restore The Old Homepage
1. Open `src/app/(main)/page.tsx`.
2. Uncomment the old homepage content in that file.
3. Delete or rename `src/app/(dentist)/page.tsx` so it no longer serves `/`.

## Restore Old Privacy + Terms Styling
1. Delete or rename `src/app/(dentist)/privacy/page.tsx`.
2. Delete or rename `src/app/(dentist)/terms/page.tsx`.
3. Restore the old pages in `src/app/(main)/privacy/page.tsx` and `src/app/(main)/terms/page.tsx` (from Git or backups).

## Restore The Original Layout
1. Delete or rename `src/app/(dentist)/layout.tsx`.
2. Restore the previous dentist layout at `src/app/(dentist)/dentist/layout.tsx` if needed.
3. Ensure `src/app/(main)/layout.tsx` remains unchanged.

## Confirm Routes
- `/` should render the old homepage.
- `/dentist` should render the dentist experience.
- `/privacy` and `/terms` should match the old site styling.
