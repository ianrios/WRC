# Future Ideas

Design inspiration:

- davidrudnick.org (primary)
- a24films.com
- momotaro.design
- wayside.studio
- the-goonies.webflow.io
- chiaraluzzana.com

Ideas to explore:

- clean up repo and remove any unused code
- use scroll to top component
- create team page
- create services page
- use small chunks of the nexus when on all artist and release pages. remove the nexus page entirely. reuse the nexus icon for the \_\_\_\_ page.
- recreate the artists page to be a rolodex style vertical contact card list on mobile and horizontal contact card style on desktop (like the releases crate system but slightly different)
  - this means, when you scroll, you should be going from left to right in the stack instead of up and down on the page
  - on hover, the contact image card pops out slightly with an animation
  - on click, the contact image card pulls out and becomes the focus, pushing the whole stack down slightly
  - there should be a link to "go to artist" that brings you to the whole artist epk page
  - get example images
- collections page is a non-scrollable render of the releases crates, one for each collection, showing most recent in the front, fading to black as it goes back in time, each collection page is also a scrollable crate, since its basically a condensed releases page
- artist login page
  - allows artist to enter their username (just their artist url) and see what data is missing from their releases
- Break rigid grid layouts: rotated elements, overlapping cards, asymmetric layouts, staggered items
- add subtle noise filter for texture
- Filter and sort on artists and releases pages
- Linktree-style /link pages for artists and releases
- Artist self-service updates via Google Sheets
- Custom cursor
- Animated text blur-in transitions
- Three.js or d3 background visuals
- Nexus graph improvements: remixes vs collabs vs features, 3D visualization
- Multiple artist photos per profile
- Eugene's synth VST on products page
- Team and services pages
- Store page (if backend becomes viable)

Libraries to consider:

- Anime.js, Three.js, p5.js, pixi.js
- Tone.js for audio


wrc media player
- circular dial showing progress
- pre calculate length of segments based on song length
- if a user starts a different song, the dial smoothly moves to where they are in the album
- if a user scrubs through a song, the dial smoothly moves to that point in the segment
- center image per song
- count down instead of count up
- show song and artist as text around outside
- volume slider changes color from soft blue to yellow to red

wrc experiments
- allow click and drag for nav positions
