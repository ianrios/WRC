<!-- ai-hint: you can add new lines to this file, but once they are added you cannot update or delete them -->
<!-- ai-hint: inform the user what changes you made that can allow them to delete or update specific exisitng lines as need -->

# end goals

- the goal of the site is to have a minimal, modern, sleek website that its primary focus is on its graphic design. see the inspiration links below:
- - https://davidrudnick.org/ - probably number 1 inspiration
- - https://a24films.com/
- - https://momotaro.design/index.html
- - https://www.wayside.studio/
- - https://the-goonies.webflow.io/
- - https://www.chiaraluzzana.com/
- this site should be pleasing to use for all who interact with it and work seamlessly on mobile and on desktop too
- slick, non-linear site, fresh fonts, glassmorphism, minimal, people should love to use it.
- the site should have an organic feel

# ideas we should focus on now

- it would be nice to be able to click anywhere not a link button in the nav when its open to close it, and also hit escape
- it would be cool to hit the enter button when on the lock page to get to the home page
- is the hamburger button even the right approach for the sidebar? lets brainstorm
- could we update the page headers to be more minimal and fall in line with our design updates? maybe add glassmorphism effect, but not force it down the throat. subtle, to keep it minimal
- the current animated text (mainly all the page headers) always load in as if it drops down from the top. what if we did a more creative css load visual, like a noisy to clean transition, or a fade in with blur effect to match glass theme
- remember user preference for "enter" screen using localStorage - returning users shouldn't have to click enter every time
- everything in the website is so rigid with perfect grids. can we brainstorm out of the box ideas? maybe rotated elements, overlapping cards, asymmetric layouts inspired by davidrudnick.org, staggered grid items, or organic spacing
- id like a way to filter and sort on the artists page and the releases page. we have lots of data, so we could come up with some fun sort and filter options. needs to work well on both mobile and desktop
- add easy way to switch the livestream page for who is live streaming. users who have access should be able to edit this data. maybe a shared google sheet too? maybe a url param. no backend, i cannot afford to support an api.
- we need to clean up all these .ai files. the markdown is getting outta hand.

# things ive always wanted to try to incorporate

- Anime.js
- konva js
- snap.svg
- Paper.js
- p5.js
- pts.js
- pixi.js
- Three.js
- raphael
- fabric.js
- GraphicsJS
- Tone.js for sounds

# Features I would like

- the artist/artist-name page is messy, needs to be modernized
- the release/release-name page is messy, needs to be modernized
- the website isnt really as useful as setting up a personal linktree. it would be really cool to have this automatically set up on each artist and release page so that our artists could quickly share the link to their upcoming release with like /link at the end for super fast access to the most important data like spotify pre save or other things that people use linktree for
- missing pages: team to give some info about the team who runs the label. services to list services we offer as a label
- it would be nice to have multiple artist pictures on the profile pages, instead of having to click through each one
- it would be cool to have a default square photo of all the artists, like a close up of their face or something
- eugene made a synth vst, I need to add it to the products page
- ability for the artists to self update their artist profile/epk pages and create/update new release pages (perhaps using a shared google sheet with access to the google sheets api, so that I dont need to support a backend and just host data from a free google sheet)
- maybe if artists have logos, i can add them too somewhere?
- would be neat to have the release and artist pages have toggleable column sizes, but maybe this is an artifact of being mobile first?
- it would be so nice to host our own store page, something like https://shop.a24films.com/collections/all?page=2 - however, I dont want to have to support a backend including user logins and purchase info so idk if ill ever get around to dos
- manual data entry is kinda painful but I do not want to
- create a CLAUDE.md file that helps start working in a new session quicker
- get correct icons for the nav for any new elements - should be black outline icons
- custom cursor

## Nexus goals:

- the release nexus is really clunky and ugly. lets update it.
- it doesnt match the rest of the website even though its cool.
- maybe we could do something better with it.
- also, it doesnt really add any value other than looking neat.
- maybe we need it to be several different directional graph to say who remixed who, vs who collabed with who, vs who featured with who, or other neat data visualizations.
- maybe we could also use it as fun background visuals because of the cool thin lines
- maybe we could use it on each artist page or release page or something
- maybe we could use it on the loading page where we can lazy load some stuff in the back while people play with the nexus.
- also, it could be more 3d instead of simple 2d

# crazy ideas

- is bootstrap even the best solution?
- would i be able to actually afford a backend? like a firebase serverless option like cloud firestore or firebase auth or something? I dont know enough to know for sure.
- use chatgpt to help write spec docs
