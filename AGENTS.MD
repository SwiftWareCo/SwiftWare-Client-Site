

1. **Use `motion/react` everywhere**  
   - Import `motion`, `AnimatePresence`, and hooks (e.g. `useScroll`) from `motion/react`.  
   - Do **not** import anything from `framer-motion`; both libraries expose the same API, but we standardize on `motion`.

2. **Centralize animation settings via variants**  
   - Define `containerVariants`, `itemVariants`, etc. whenever multiple elements share animation values.  
   - Add concise comments for each variant property (`staggerChildren`, `duration`, etc.) to explain what visual timing or motion it controls.

3. **Keep variants easy to tweak**  
   - Export or colocate variants near the components they animate.  
   - Favor semantic names (`fadeUpVariant`, `sectionRevealVariant`) so future edits are obvious.

Following these rules keeps every animation editable from a single place and documents the intent directly in code.


### Core Framework
- **Next.js 15.3.5** (App Router) with TypeScript
- **React 19.0.0** with server-side rendering and static generation
- **Turbopack** for development builds

### Styling & UI
- **Tailwind CSS v4.1.12** for utility-first styling
- **Lucide React** for consistent iconography
- Custom color scheme system with per-service themes

### Styling Guidelines
- **Use CSS Variables from global.css**: All styles must use CSS variables defined in `src/app/global.css` instead of hardcoded colors
- **Never use inline color classes**: Don't use `bg-white dark:bg-zinc-900` or similar inline color utilities
- **Prefer Tailwind classes over inline styles**: Use `className` with Tailwind utilities instead of `style` attribute when possible
  - ✅ `className="text-service-marketing bg-card border-destructive"`
  - ❌ `style={{ color: 'var(--color-service-marketing)', backgroundColor: 'var(--card)' }}`
  - Exception: Use inline styles only for dynamic values or complex gradients that can't be expressed in Tailwind
- **Available CSS Variables & Tailwind Classes**:
  - `bg-background` / `text-foreground` - Main colors (auto-switch for light/dark)
  - `bg-card` / `text-card-foreground` - Card styling
  - `text-muted` / `text-muted-foreground` - Secondary text
  - `border-border` - Border colors
  - `text-destructive` / `bg-destructive` - Destructive actions (red)
  - Service colors (enable full Tailwind support):
    - `text-service-brand` / `bg-service-brand` / `border-service-brand` (Cyan)
    - `text-service-marketing` / `bg-service-marketing` (Emerald)
    - `text-service-ai` / `bg-service-ai` (Purple)
    - `text-service-software` / `bg-service-software` (Indigo)
    - Dark variants: `text-service-brand-dark`, `bg-service-marketing-dark`, etc.
  - Route-scoped service colors: `--color-primary-service`, `--color-secondary-service` (change per route via color scheme)
- **Why**: This approach ensures all colors automatically adapt to:
  - Light/dark theme switching
  - Service-specific color schemes (via `[data-scheme]` in global.css)
  - Consistent theming across the application
  - Cleaner, more maintainable code
### Code Quality
- Run `npm run lint` and `npm run lint:types`
- Fix all linting and type errors before deployment
- Use TypeScript for type safety

DO NOT RUN npm run dev or npm run build