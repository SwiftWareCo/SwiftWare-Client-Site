# All Solutions Focus Implementation Plan

## Overview

Create a new "all solutions" focus area that provides a lightweight overview of SwiftWare's offerings. This focus will either direct users to specific focus areas (CRM, tee-sheet, AI/ML, web) or provide easy access to scheduling discovery calls and demos through the contact modal. The implementation will integrate Calendly for scheduling to allow users to book Zoom calls and request specific demos.

## Core Files to Modify

### Type Definitions

- **`src/lib/useFocus.ts`**: Add "all-solutions" to `FocusKey` union type and update `isValidFocus()` function
- **`src/types/content.ts`**: Update `FocusKey` type to include "all-solutions"

### Focus Content Management

- **`src/lib/focusContent.ts`**: Add case for "all-solutions" in `getContentForFocusClient()` function and import new JSON content
- **`content/all-solutions.json`**: Create new content file with simplified structure focusing on overview and CTAs

### Focus-Aware Components

- **`src/components/FocusAwareHome.tsx`**: Add "all-solutions" case in copy computation and main switch statement
- **`src/components/SplashScreen.tsx`**: Add "all-solutions" option to focus selection grid

### New Components to Create

- **`src/components/all-solutions/AllSolutionsHero.tsx`**: Lightweight hero component with overview and navigation CTAs
- **`src/components/all-solutions/sections/SolutionOverview.tsx`**: Grid of solution cards that link to specific focuses
- **`src/components/all-solutions/sections/SchedulingSection.tsx`**: Section with embedded Calendly widget for booking calls

### Scheduling Integration

- **`src/components/SchedulingWidget.tsx`**: Wrapper component for Calendly embed with proper styling and error handling
- **`package.json`**: Add Calendly React integration dependency (`react-calendly`)

## Implementation Algorithm

### Phase 1: Core Focus Infrastructure

1. **Update Type System**:
   - Add "all-solutions" to `FocusKey` union type in both `useFocus.ts` and `content.ts`
   - Update `isValidFocus()` function to include new focus key
   - Verify all TypeScript references compile correctly

2. **Create Content Structure**:
   - Create `content/all-solutions.json` with minimal content structure:
     - Hero subline: "Complete software solutions for growing businesses"
     - Bullets highlighting main service areas
     - Capabilities that are overview cards linking to specific focuses
     - Outcomes showing aggregate results across all service areas
     - Engagement variants focused on discovery calls and demos

3. **Update Content Loading**:
   - Add "all-solutions" case to `getContentForFocusClient()` function
   - Import new JSON content file
   - Test content loading works correctly

### Phase 2: Component Implementation

4. **Update Focus Selection**:
   - Add "all-solutions" button to `SplashScreen.tsx` focus selection grid
   - Position as first option with description "All our solutions"
   - Update motion animations to accommodate 5 focus options

5. **Create All Solutions Hero**:
   - Build `AllSolutionsHero.tsx` with overview messaging
   - Include primary CTA for scheduling discovery call
   - Include secondary CTA for viewing specific solutions
   - Use brand gradient styling consistent with other heroes

6. **Build Solution Overview Section**:
   - Create grid of solution cards (CRM, Tee Sheet, AI/ML, Web)
   - Each card shows key benefits and links to specific focus
   - On click, use `setFocus()` to navigate to specific focus area
   - Include hover animations and visual indicators

### Phase 3: Scheduling Integration

7. **Implement Calendly Integration**:
   - Install `react-calendly` dependency
   - Create `SchedulingWidget.tsx` component
   - Configure Calendly embed with:
   - Event type: "Discovery Call" (30 minutes)
   - Google Meet integration enabled
   - Custom styling to match SwiftWare theme
   - Proper loading states and error handling

8. **Create Scheduling Section**:
   - Build `SchedulingSection.tsx` with embedded Calendly widget
   - Include fallback contact modal if Calendly fails to load
   - Add explanatory text about discovery call process
   - Style container to match site design system

9. **Update FocusAwareHome**:
   - Add "all-solutions" case to main component switch statement
   - Import and render all-solutions specific components
   - Use consistent motion animations and spacing
   - Include contact modal integration

## Calendly vs Nylas Decision

**Recommendation: Use Calendly for initial implementation**

- **Calendly Pros**: Easy setup, built-in Google Meet integration, minimal development overhead, robust scheduling features
- **Calendly Cons**: Less customizable, external dependency
- **Nylas Alternative**: More customizable but requires significant development effort and API management

**Calendly Setup Requirements**:

- Create Calendly account with "Discovery Call" event type
- Configure 30-minute meetings with Google Meet integration
- Set up automated email confirmations and reminders
- Customize booking page branding to match SwiftWare colors

## Content Structure for all-solutions.json

```json
{
  "focus": "all-solutions",
  "hero": {
    "subline": "Complete software solutions for growing businesses.",
    "primaryCta": { "label": "Schedule Discovery Call", "href": "#scheduling" },
    "secondaryCta": { "label": "Explore Solutions", "href": "#solutions" }
  },
  "capabilities": [
    {
      "title": "Service CRM",
      "summary": "Field apps your teams will actually use.",
      "icon": "Smartphone",
      "cta": "Learn More",
      "href": "#focus-crm"
    }
    // ... other solution cards
  ],
  "outcomes": [
    {
      "metric": "50+",
      "unit": "projects delivered",
      "blurb": "Across all service areas."
    }
  ]
}
```

## Implementation Notes

- Keep all-solutions content lightweight - focus on navigation and scheduling
- Ensure smooth transitions when switching from all-solutions to specific focuses
- Test Calendly widget performance and fallback scenarios
- Maintain consistent styling with existing focus areas
- Consider analytics tracking for scheduling widget engagement
