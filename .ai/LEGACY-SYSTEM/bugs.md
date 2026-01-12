    # code quality / technical debt

    - unused imports: Footer.js imports Question component but no longer uses it
    - removed react-virtualized lists but package still in dependencies - could remove to reduce bundle size
    - random color generation in Releases.js happens on every render, colors should be memoized/stable
    - inconsistent styling: mix of inline styles, SCSS, and styled-components (should standardize)
    - magic numbers in App.js (texture count hardcoded as 7)
    - no loading states for images - could add blur-up placeholders or shimmer effects
    - no error boundaries - if page crashes, whole app crashes
    - no code splitting - all pages load upfront, could use React.lazy() for better performance
    - Home.js has TODO comments for calculating song counts that could be implemented
    - no 404 page - wildcard route just goes to Home

    # accessibility

    - many links lack proper aria labels
    - no focus visible states defined
    - animations could be jarring on slower devices - should add prefers-reduced-motion support

    # things claude found

    Code Quality & Technical Debt Issues:
    Unused imports causing warnings:

    Footer.js imports Question but doesn't use it anymore (after we simplified the footer)
    Several TypeScript warnings about missing type declarations for react-router-dom
    Removed React Virtualized but still importing:

    We removed the virtualized lists from Artists and Releases pages but the package is still in dependencies
    Could remove react-virtualized from package.json to reduce bundle size
    Random color generation on every render:

    In Releases.js line 12, colors are randomly generated each time, which means they change on re-renders
    Should memoize or generate once to keep colors stable
    Inconsistent styling approaches:

    Mix of inline styles, SCSS files, and styled-components (Home.js uses styled-components)
    Would be cleaner to pick one approach
    Magic numbers in code:

    App.js line 74: Math.floor(Math.random() \* 7) + 1 - hardcoded texture count
    Should be a constant at the top
    UX/Design Observations:
    App.js routing logic for viewMain:

    Lines 18-42 have a huge list of hardcoded paths to bypass the "enter" screen
    This means returning users always have to click "enter" - might want localStorage to remember preference
    No loading states:

    Images load without skeletons/placeholders
    Could add blur-up technique or loading shimmer
    Accessibility concerns:

    Hamburger button needs aria-label (we added it, good!)
    But many links lack proper aria labels
    No focus visible states defined
    Home page has TODOs in comments:

    Lines 19-20, 39: "TODO: put current count of songs"
    Could calculate this from releaseData
    No error boundaries:

    If a page crashes, whole app crashes
    Should add React error boundaries
    Performance Observations:
    Large images from bugs.md:

    You mentioned images are too large - could add image optimization build step
    Consider using WebP with fallbacks
    No code splitting:

    All pages load upfront
    Could use React.lazy() for route-based code splitting
    Animations on all grid items:

    We added animations to 40+ items
    On slower devices this might be janky
    Could use prefers-reduced-motion media query
    Missing Features I Noticed:
    No 404 page:

    Routes.js line 111: wildcard route goes to Home
    Should have a proper 404 page
    No breadcrumbs:

    On deep pages like /release/some-release, no way to navigate back except sidebar
    TopLogo component:

    Not sure what this is, but it's rendered on every page - might want to check if it needs styling updates
