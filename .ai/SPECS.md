# Feature Flags

Goal: Enable safe testing of UI changes.

Constraints:

- Frontend-only
- No real auth

Acceptance:

- Flags stored in localStorage
- /admin route toggles flags
- Route is hidden from UI

# Icon Navigation Redesign

Goal: Replace hamburger nav with floating icon nav.

Constraints:

- Desktop + mobile
- No borders
- Feature-flagged

Acceptance:

- Collapsed and expanded states
- Keyboard support
- Mobile tap interaction

# New Icons

Goal: Create a new set of circular icons that match existing patterns that we can use for our site

Constraints:

- End resulting icons should be circular-ish - a 3d cube (such as what is used for the products nav link, or a fingerprint, like we use for the artists nav link are close enough and will do. we dont want everything looking exactly the same)

Acceptance:

- Evaluate all icons and render them in the experiments pane (right now we only)

# Remove Deprecated Code

Goal: read through the entire repo to create clean up tasks and then clean them up

Constraints:

- This is a complex task, so we should create a plan with an outline of what needs to happen

Acceptance:

- we should clean up any exports, variables, components, and functions that we do not use
- we should audit and clean up the .ai folder to remove any duplicate or old prompts. There may be nuggets that we lost in the LEGACY-SYSTEM directory
- we need to update our npm dependencies
- we need to clean up our style system. i bet there are many redundant styles
- we need to clean up any feature flags that we dont currently use that dont describe any ongoing work in our .ai folder
