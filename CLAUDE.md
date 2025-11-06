# SwiftWare Client Site - Architecture Overview

## Application Overview

SwiftWare Client Site is a comprehensive agency marketing website for SwiftWare, a Canadian software development company based in Richmond, BC. The site positions SwiftWare as a one-stop-shop for brand design, digital marketing & SEO, AI & process automation, and custom software development.

The site features a **multi-page, SEO-optimized architecture** with dedicated service pages, each with distinct color schemes, and a featured case study (Vancouver Hood Doctors) showcasing real results.

## Technology Stack

### Core Framework
- **Next.js 15.3.5** (App Router) with TypeScript
- **React 19.0.0** with server-side rendering and static generation
- **Turbopack** for development builds

### Styling & UI
- **Tailwind CSS v4.1.12** for utility-first styling
- **Motion (Framer Motion) v12.23.12** for sophisticated animations
- **Lucide React** for consistent iconography
- Custom color scheme system with per-service themes

### Additional Libraries
- **clsx** for conditional CSS classes
- **Resend** for email functionality
- **PostCSS** with **Autoprefixer** for CSS processing

## Project Structure

```
src/
   app/                              # Next.js App Router - Multi-page structure
      page.tsx                       # Home/landing page
      layout.tsx                     # Root layout with SEO, analytics, providers
      brand-design/page.tsx          # Brand Design & Identity service page
      digital-marketing-seo/page.tsx # Digital Marketing & SEO service page
      ai-automation/page.tsx         # AI & Process Automation service page
      custom-software/
         page.tsx                    # Custom Software hub page
         [solution]/page.tsx         # Dynamic routes for CRM, AI/RAG, Golf, Web
      case-studies/page.tsx          # Portfolio & case studies page
      about/page.tsx                 # About page with company story
      api/contact/route.ts           # Contact form API endpoint
      not-found.tsx                  # 404 page

   components/
      ServicePageTemplate.tsx        # Reusable template for all service pages
      ColorSchemeWrapper.tsx         # Context-aware color scheme wrapper
      SplashScreen.tsx               # Branded splash animation (auto-dismiss)
      UnifiedHeader.tsx              # Navigation header
      Footer.tsx                     # Footer
      ClientApp.tsx                  # Main app wrapper

      sections/                      # Reusable page sections
         FeaturesSection.tsx         # Features/capabilities grid
         ProcessSection.tsx          # Process steps visualization
         FAQSection.tsx              # Collapsible FAQ

      crm/                           # CRM solution components (repurposed)
      ai-ml/                         # AI/ML solution components (repurposed)
      tee-sheet/                     # Golf management components (repurposed)
      web/                           # Web portal components (repurposed)
      hero/                          # Shared hero components

   context/
      ColorSchemeContext.tsx         # Color scheme state management

   constants/
      colorSchemes.ts                # Color theme definitions

   lib/                              # Utility functions
   types/                            # TypeScript type definitions
   content/                          # JSON-based content (legacy, for migration)
       crm.json
       ai-ml.json
       tee-sheet.json
       web.json
```

## New Architecture: Multi-Service Agency Site

### Routing Structure
```
/ - Home (landing page with service overview)
/brand-design - Brand Design service page
/digital-marketing-seo - Digital Marketing & SEO service page
/ai-automation - AI & Process Automation service page
/custom-software - Custom Software hub
   /custom-software/crm - CRM solution
   /custom-software/ai-rag - AI/RAG solution
   /custom-software/golf - Golf management solution
   /custom-software/web-portals - Web & Portals solution
/case-studies - Portfolio & case studies
/about - Company story & team
```

### Service Pages

Each service page follows the **ServicePageTemplate** structure:
1. **Hero Section** - Service title, subtitle, description, CTAs
2. **Features/Capabilities Section** - Key offerings with icons
3. **Process Section** - Step-by-step methodology visualization
4. **Case Study Section** (where applicable) - Real results from clients
5. **FAQ Section** - Common questions and answers
6. **Bottom CTA** - Call to action for consultation

### Color Scheme System

Each service has a distinct color palette defined in `src/constants/colorSchemes.ts`:
- **Brand Design**: Cyan (#06B6D4) → Teal (#0891B2)
- **Digital Marketing & SEO**: Emerald Green (#10B981) → Deep Green (#059669)
- **AI & Automation**: Electric Purple (#A855F7) → Violet (#7C3AED)
- **Custom Software**: Indigo (#4F46E5) → Blue (#3B82F6)
- **Default**: Blue → Purple

The **ColorSchemeContext** provides current scheme based on route, and **ColorSchemeWrapper** applies it throughout the page.

## State Management

### Context-Based Architecture
- **ColorSchemeContext** - Manages current color scheme based on route
- **Local state** via React hooks for component-specific interactions
- No external state management libraries - relies on React patterns

### Removed
- **FocusContext** - No longer needed (removed in Phase 1)
- **localStorage focus persistence** - Replaced with URL-based routing

## Splash Screen

- Shows animated logo and branding on first visit
- Auto-dismisses after 3 seconds
- No user interaction required
- Provides brand impression without blocking site access

## SEO & Accessibility

### SEO Optimization
- Dedicated pages for each service (one per primary keyword)
- Proper heading hierarchy (H1-H6)
- Meta descriptions and og:image per page
- Schema markup for LocalBusiness, Service, Organization
- Internal linking strategy connecting related services

### Accessibility
- WCAG AA compliance target
- Semantic HTML (nav, main, article, section)
- Alt text on all images
- Keyboard navigation support
- Color contrast verification
- ARIA labels where needed

### Text-to-HTML Ratio
Target 40-50% text content on each page for SEO optimization

## Key Architectural Decisions

### Multi-Page vs Single-Page
- **Decision**: Multi-page app (Next.js App Router)
- **Reason**: Better SEO, clearer information architecture, distinct context per service

### Color Schemes
- **Decision**: Context-based color system applied per route
- **Reason**: Visual differentiation between services while maintaining brand coherence

### Reusable Components
- **ServicePageTemplate**: Ensures consistency across service pages
- **FeaturesSection, ProcessSection, FAQSection**: Modular page sections
- **ColorSchemeWrapper**: Automatically applies theme based on route

### Content Organization
- Service pages are code-driven (structured data in components)
- Legacy JSON content files kept for migration/reference
- Homepage features hardcoded data for flexibility

## Company Story

**"We Built SwiftWare Because We Got Tired of Band-Aids"**

Most businesses need multiple services but work with disconnected agencies. SwiftWare brings everything together: brand design, digital marketing, AI automation, and custom software—all working as one unified strategy.

**Team**: 3 specialists across brand, marketing, development, and AI
**Status**: Young but proven—helping North American businesses transform operations
**Location**: Richmond, BC, Canada (serving US & Canada)

## Key Features

### Homepage
- Hero section with value proposition
- 4-service grid (Brand, Marketing, AI, Software)
- Featured case study (Vancouver Hood Doctors)
- Company story section
- Service packages (Build & Launch, Growth Engine, Automate & Scale, Complete Transformation)
- FAQ section
- Final CTA

### Service Pages
- Hero with service-specific value prop
- Features/capabilities grid
- Process visualization (typically 4 steps)
- Case study highlight
- FAQ section
- Schedule consultation CTA

### Featured Case Study: Vancouver Hood Doctors
- Local dental practice in Vancouver, BC
- Challenge: Low visibility, need for patient acquisition
- Solution: SEO optimization + content strategy + custom web portal
- Results:
  - +150% organic traffic
  - Ranked #1 for local keywords
  - +45% lead increase

## Development Guidelines

### Running the Project
- `npm run dev` - Start development server with Turbopack
- `npm run lint` - Check for linting errors
- `npm run lint:types` - Check TypeScript errors
- `npm run start` - Start production server

### Code Quality
- Run `npm run lint` and `npm run lint:types` before building
- Fix all linting and type errors before deployment
- Use TypeScript for type safety
- Follow established component patterns (ServicePageTemplate, sections)

### Coding Standards
- **All buttons must have `cursor-pointer` class** for better UX (don't rely only on hover states)
- **Section separators use subtle gradients**: Replace `border-t border-zinc-800` with `bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent`
- **Client components**: Use `'use client'` directive for components with animations (motion), state, or event handlers
- **Server components**: Pages remain as server components for better SEO when they don't require client interactivity

### Adding New Service Pages
1. Create route folder (e.g., `/new-service`)
2. Create `page.tsx` using **ServicePageTemplate**
3. Add color scheme to `colorSchemes.ts`
4. Update `serviceColorMap` in `colorSchemes.ts`
5. Link from homepage and navigation
6. Add FAQ and process data
7. Run linting and type checks

## Performance Considerations

- Dynamic imports for code splitting
- Image optimization with Next.js Image component
- Turbopack for faster development builds
- Animations use Motion/Framer Motion (optimized)
- Lazy loading of below-fold content

## Removed Features

The following were removed in Phase 1 transformation:
- **FocusContext.tsx** - Focus state management system
- **useFocus.ts** - Focus persistence utilities
- **FocusHero.tsx** - Focus-based hero routing
- **FocusAwareHome.tsx** - Focus-based content switching
- **ThemedFocusDropdown.tsx** - Focus selector UI
- **focusContent.ts** - Focus-based content loader
- **Splash screen choices** - User selection UI
- **localStorage focus key** - `swiftware.focus.v1`

---

**Last Updated**: November 2025
**Architecture Version**: 2.0 (Multi-Service Agency Site)
**Status**: Phase 2 Complete - Homepage & Core Services Built
