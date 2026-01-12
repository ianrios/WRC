<!-- ai-hint: you can add new lines to this file, but once they are added you cannot update or delete them -->
<!-- ai-hint: inform the user what changes you made that can allow them to delete or update specific exisitng lines as need -->

# Navigation Redesign - Icon Menu - force directed graph

## Overview

Moving away from the traditional hamburger menu to a more unique icon navigation inspired by macOS dock behavior, but using a force directed graph strategy

## Design Goals

- Create a more elegant, unique navigation experience
- Match the glassmorphism aesthetic of the site
- do not use borders or outlines.
- Work seamlessly on both desktop and mobile
- Make navigation discoverable without being obtrusive
- should be a more interesting floating nav instead of a strict grid or list

## Interaction Model

- **Location:** Top-left corner (opposite new top-right headers)
- **Default State:** Small icons bunched together
- **Hover State (desktop):** the same icons expand/grow with smooth animation and create an overlay on the page, sort of like a magnifying glass expand in all directions. might need to leverage a css library (possibly not) for these smooth animations
- **Hover away (desktop):** the same icons shrink back with smooth animation once you move your mouse far enough away
- **Click (mobile):** Opens full navigation overlay with all links, similar to the hover on desktop
- **Click (desktop):** persists full navigation overlay open
- **Navigation:** Tap individual icons to navigate
- **Close (mobile & desktop):** Click same corner icon again, click outside, or press ESC

## Technical Implementation

### Components

- `IconNav.js` - New navigation component
- `IconNav.scss` - Styling with animations
- Replace existing `Sidebar.js` functionality using feature flag system for quick compare during testing

### Key Features

1. **Icon Design:** Use existing icon system from `Link.js` if possible. we can always create new ones that will help with the new smooth expand/contract system
2. **Animations:**
   - Smooth scale/grow on hover (desktop)
   - Fluid expand/collapse transitions
   - fade in default closed state on first load of main page for discoverability (after user enters from lock state, OR if user enters site on any other page that does not begin at the locked state)
3. **Glassmorphism:** Backdrop smooth blur, but no borders, transparency when overlaid in front of something
4. **Accessibility:** Keyboard navigation support (Tab, Enter, ESC)

### State Management

```javascript
- isOpen: boolean (nav overlay state)
- hoveredIcon: string | null (for hover effects on desktop)
- onClick: string | null (for on click effects on desktop and mobile)
```

### Animations

- **Expand:** Icons scale and spread out
- **Hover:** Individual icons grow once expanded. label shows up nearby. no label for mobile
- **Collapse:** Icons return to compact state
- **First Load:** Subtle fade in to indicate interactivity
- **idle state:** subtle physics to show the force directed graph. can be used in collapsed or expanded state

## Visual Design

### Icon Strip States

### collapsed

<!--
using ascii as a crude example

|=#?---------|
|*%          |
|@           |
|            |
|            |
|            |
|____________|

-->

### expanded

<!--

|=-----------|
|*     ?     |
|    #   +   |
| @     %    |
|     &      |
| $          |
|____________|

-->

1. **Collapsed:** Small vertical or horizontal strip with minimal icons
2. **Expanded:** Full graph of navigation icons with labels on hover
3. **Active:** Current page icon highlighted using R|Y|B color system (existing in repo)

### Color Scheme

- Background: `rgba(255, 255, 255, 0.02)` with heavy blur
- Hover: `rgba(255, 255, 255, 0.08)` with red accent `#de3c4b`
- Active: Blue highlight `#68a7ff`

## Mobile Considerations

- Minimum tap target: 44x44px for accessibility
- Touch-friendly spacing between icons
- Swipe gestures could be added later, such as long press for text or click then move finger to select icon that we are hovering over instead of instant nav redirect
- Prevent accidental closes with small delay

## Discoverability

- fade in animation on first visit (global state check, as long as we are not on the locked main page)
- Clear visual indicator that it's interactive
- Tooltip or label on hover (initally just desktop)

## Migration Notes

- Maintain existing routing and navigation logic
- Keep same icon system (if possible, not mandatory) and page structure
- Ensure all existing keyboard shortcuts still work (ESC to close)
- Test thoroughly on mobile devices

## Implementation Decisions (Jan 2026)

### Animation Approach: CSS-Only if possible otherwise pivot to css / js animation library (Option B)

- Use pure CSS animations with cubic-bezier easing
- No external physics libraries initially
- Lightweight, performant, no dependencies
- Will "feel" organic via carefully crafted easing curves

### Idle State Animation

- **Collapsed:** No animation (static)
- **Expanded:** Icons gently floating/bobbing in place (subtle movement)
- Initial positions are FIXED - users can learn where each button is
- Random movement is between position A→B, not random starting positions. force directed graph functionality will make sure that icons do not overlap

### Mobile Interaction (Start Simple)

- Tap to expand
- Tap icon to navigate
- Tap outside or same trigger to close
- No drag-to-hover initially

### Icon Arrangement (Organic but Consistent)

- Pseudo-random organic cluster layout
- Positions are deterministic/fixed on our end
- Looks random but is actually the same every page load
- Users can build muscle memory for icon locations

## Stretch Goals

### Phase 2: True Physics

- Upgrade to d3-force library for real physics simulation
- Icons bounce and settle based on actual force calculations
- More organic and unique feel
- Consider mobile performance implications

### Phase 2: Advanced Mobile

- Drag-to-hover: tap and hold, drag finger to icon
- Selection confirmed on release (no navigation until finger lifts)
- Haptic feedback on hover (if supported)

### Phase 2: Gestures

- Swipe gestures to open/close
- Long-press for icon labels on mobile

### Phase 2: Enhancements

- Icon grouping/clustering by category
- Icon grouping/clustering by actual svg shape instead of just assuming the icons are circles OR - update all icons to be circles?
- Spring animations on open/close
- Subtle parallax effect on hover

### Test: deploy feature flag and test on external devices

### Release:

- remove unused code and remove feature flag, releasing the new force nav to all users

### claude TODO:

- document actual current state and true remaining outstanding items in a new document for us to work on in the future
-
