# Releases Page – Crate View (Visual Depth System)

## Summary

Introduce an alternative Releases page layout that mimics flipping through a physical record crate.
This replaces the flat grid with a **depth-based, scroll-driven crate interaction** on both desktop and mobile.

This feature is **opt-in via the admin portal** and controlled by a **new feature flag**.


---

## Feature Flag

- Create a new feature flag in the **admin portal**
- When enabled:
  - Crate view becomes available
  - Existing grid remains the fallback
- Admin toggle behavior is already implemented and should just work

---

## Core Concept

- Releases exist inside a virtual crate
- Navigation is **front → back**, not top → bottom
- Page scrolling is disabled while the crate is rendered
- All scroll input is consumed by the crate interaction

The crate should feel **anchored and heavy**, not floating.

---

## Scroll / Depth Behavior

- Scroll moves the user deeper into the crate
- Start with ~10 visible releases to establish density
- Visual treatment:
  - Current release: primary focus
  - Upcoming releases (not yet scrolled to):
    - Slight opacity reduction
    - Positioned tightly toward the top-right
  - Previously scrolled releases:
    - Very thin border
    - Near-full opacity
    - Positioned tightly toward the bottom-left
- Layout should suggest a milk crate:
  - Dense
  - Overlapping
  - Not filling the entire screen diagonally

---

## Release Card States

### Default State
- Artwork only
- No visible release number
- Cards stacked with depth overlap

---

### Hover State (Desktop Only)
- Card pops out slightly from the crate
- **Only the release number is visible**
- Release number:
  - Centered above the crate
  - Subtle and minimal
- A link icon appears on the card:
  - Top-right corner of the artwork
  - Icon-only (no text)
  - Clearly communicates navigation to a new page
  - Follows repo hover color pattern (grey → blue → yellow → red)

---

### Active State (Click / Tap)
- Card pulls fully out and becomes the focus
- Crate shifts down slightly to reinforce separation
- Release number:
  - Shrinks
  - Moves to top-left of the screen
  - Remains above the crate
- Metadata presentation:
  - Artist name (primary focus)
  - Release name
  - Release type (EP, album, single, set, etc.)
  - Left-justified
  - Centered relative to the crate
- Link icon remains visible and interactive

Future metadata expansion is intentionally out of scope.

---

## Navigation

- Clicking the link icon navigates to the existing release page
- Does not open a new tab
- No “go to release” text is shown
- Clicking the active card again closes it and returns it to the crate
- Clicking a different card:
  - Switches focus
  - Automatically scrolls the crate to that release index

---

## Mobile Behavior

- No hover state
- Tap immediately enters the active state
- Consideration:
  - As the user scrolls, the focused release may subtly pop out (hover-like)
  - If successful on mobile, this behavior may later be shared with desktop
- Page scrolling remains disabled

---

## Keyboard Interaction (Optional / Nice-to-Have)

- Left / Right arrows: scroll through depth
- Up arrow: open focused release
- Down arrow: close active release
- Accessibility and screen reader support are not a priority

---

## Technical Notes

- Custom JS + SCSS preferred
- External CSS / JS libraries may be used if they meaningfully simplify the interaction
- No backend, data, or API changes required
