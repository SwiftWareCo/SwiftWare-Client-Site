# Codex Animation Guidelines

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
