- Info page links always blue instead of state-based colors
- The information page is missing as a link from the information page. lets add it to the about section. the admin and experiments pages should show up there too if you are logged in as admin
- Artist photos (specifically katie hoffstatters) have inconsistent heights on artists page (perhaps this is a crop issue i need to handle on my own but if we could auto scale the photos to fit in the app that would be awesome)
- Release page overlay text not vertically centered
- Images too large; no compression strategy
- React Helmet always unfurls home metadata
- Question mark icon should look more like times new roman
- the website has really bad lazy loading. it takes a long time for users to load data that should be quick, mainly images. this might be an artifact of images being too high quality and large but also it degrades the experience and probably costs me money

Technical debt:

- Unused dependency: react-virtualized (can be removed)
- Inconsistent styling: mix of inline styles, SCSS, and styled-components
- Magic numbers in App.js (texture count hardcoded as 7)
- No loading states for images
- No error boundaries
- No code splitting (could use React.lazy for routes)
- No 404 page
- Random color generation in Releases.js happens on every render (should memoize)

Accessibility:

- Missing aria-labels on multiple links
- No visible focus styles defined
- Animations ignore prefers-reduced-motion
