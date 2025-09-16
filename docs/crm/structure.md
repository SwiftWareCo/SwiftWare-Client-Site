# CRM Focus Area Structure

## Overview

The CRM focus area is designed for service-based businesses that need field operations management. It provides a comprehensive solution for dispatch, mobile field apps, photo proof, and invoicing. The capabilities are presented through an interactive neural network visualization that adapts responsively - showing all interconnected features on desktop and organized category tabs on mobile.

## Content Structure

### Content Source

- **File**: `content/crm.json`
- **Type**: FocusContent (defined in `src/types/focus-content.ts`)
- **Focus Key**: "crm"

### Content Sections

#### Hero Section

- **Subline**: "Field teams move faster with a CRM they actually use."
- **Primary CTA**: "Start a project" → `/#contact`
- **Secondary CTA**: "See capabilities" → `#capabilities`

#### Key Value Propositions (Bullets)

1. **Dispatch in minutes** - Reduce back-and-forth with live scheduling
2. **Mobile-first field app** - Photos, notes, signatures—even offline
3. **Proof & invoicing** - Before/after, signed work orders, PDF/email

#### Capabilities

All capabilities are displayed in an interactive neural network visualization:

- **Desktop**: All capabilities from all categories displayed together in one interconnected network
- **Mobile**: Category-based tabs for organized browsing

**Essentials:**

- Work Orders (ClipboardList icon)
- Scheduling (CalendarClock icon) - includes Load view badge
- Mobile App (Smartphone icon) - includes Offline badge
- Photo Logs (Images icon)

**Advanced:**

- Invoicing (FileText icon)
- Permissions (Shield icon) - includes RBAC badge
- Reporting (BarChart3 icon)
- Build on request (Sparkles icon) - highlighted

#### Outcomes

- **-42% dispatch time** - Fewer touchpoints to assign jobs
- **-29% rework** - Photo proof and checklists reduce errors
- **+3.1× doc speed** - One-tap exports speed invoicing

#### FAQ

- Data ownership
- Offline functionality
- Payment integration capabilities

#### Engagement Options

- Fixed Scope
- Sprint Retainer
- Support

## Component Structure

### Main Components

- **CRMHero.tsx** - Main hero section with typing headline and CTAs
- **sections/** - All section components

### Section Components

#### Core Sections

1. **CapabilitiesSection.tsx** - Interactive neural network visualization of all capabilities with responsive behavior: desktop shows all interconnected nodes, mobile uses category tabs
2. **OutcomeSnapshots.tsx** - Shows key metrics and outcomes
3. **ServiceJourney.tsx** - Illustrates the service workflow
4. **HowWeWork.tsx** - Explains the development process
5. **EngagementOptions.tsx** - Shows different engagement models
6. **FAQ.tsx** - Frequently asked questions
7. **StartProjectForm.tsx** - Contact/project initiation form
8. **FitFirstBullets.tsx** - Key value propositions

### Dependencies

#### External Libraries

- **motion/react** - Animations and transitions
- **lucide-react** - Icons
- **next/link** - Navigation

#### Internal Dependencies

- **@/components/hero/TypingHeadline** - Animated typing effect
- **@/components/hero/DesktopBridgeShowcase** - Desktop hero visual
- **@/components/hero/LaptopSyncTile** - Mobile hero visual
- **@/lib/focusContent** - Content management
- **@/types/focus-content** - TypeScript definitions

## File Organization

```
src/
├── components/crm/
│   ├── CRMHero.tsx                 # Main hero component
│   └── sections/
│       ├── CapabilitiesSection.tsx # Capability tiles
│       ├── EngagementOptions.tsx   # Engagement models
│       ├── FAQ.tsx                 # FAQ section
│       ├── HowWeWork.tsx          # Process explanation
│       ├── OutcomeSnapshots.tsx   # Key metrics
│       ├── ServiceJourney.tsx     # Workflow illustration
├── content/
│   └── crm.json                   # Content data
└── types/
    └── focus-content.ts           # TypeScript definitions
```

## Key Features

### Responsive Design

- Mobile-first approach
- Desktop bridge showcase for larger screens
- Laptop sync tile for mobile/tablet

### Animations

- Typing headline effect
- Animated backdrop lines
- Neural network visualization with animated connections
- Interactive capability nodes with hover effects
- Responsive tooltips with smooth transitions
- Hover effects on CTAs
- Reduced motion support

### Content Management

- Centralized content in JSON
- Type-safe content access
- Easy content updates without code changes

### Interactive Features

- Neural network capability visualization
- Click-to-view tooltips on mobile
- Hover-to-reveal tooltips on desktop
- Category-based filtering on mobile
- Animated connection lines between related capabilities
- Progressive disclosure of information

### Accessibility

- ARIA labels and roles
- Semantic HTML structure
- Touch-friendly mobile interactions
- Keyboard navigation support
- Reduced motion preferences respected

## SEO Configuration

- **Title**: "Service CRM & Field App — Swiftware"
- **Description**: "A made-to-fit CRM field teams actually use: dispatch, mobile app, photo proof, signatures, and invoicing."

## Integration Points

- Contact form integration
- Focus context system
- Theme system compatibility
- Responsive breakpoint system
