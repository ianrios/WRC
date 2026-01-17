im noticing a couple things that we may need to fix

1. running out of space to run deploy.
---
$(kube_ps1)ianrios@Ians-MBP WRC % npm run deploy

> wrc@0.1.1 deploy
> npm run build && npm run firebase


> wrc@0.1.1 prebuild
> node scripts/generate-version.js && node scripts/generate-sitemap.js

✓ Version info generated: {
  commit: 'e2b599faac9296910a85032e0f30decc148b9434',
  shortCommit: 'e2b599f',
  commitDate: '2026-01-15 20:30:39 -0500',
  branch: 'spec-1',
  buildTime: '2026-01-16T03:32:30.482Z',
  version: '0.1.1'
}
✓ Generated sitemap.xml with 172 URLs
✓ Generated routes.json with 172 routes

> wrc@0.1.1 build
> react-scripts build

Failed to compile.

ENOSPC: no space left on device, copyfile '/Users/ianrios/Sites/WRC/public/images/releases/bl019.png' -> '/Users/ianrios/Sites/WRC/build/images/releases/bl019.png'

$(kube_ps1)ianrios@Ians-MBP WRC %

---

I think we need to delete previous versions or clean the npm cache or something idk

2. I tried a couple links in the facebook sharing debugger and some worked, others did not. take a look
---
    nferred Property
    The 'og:image' property should be explicitly provided, even if a value can be inferred from other tags.

When and how we last scraped the URL
Time Scraped
3 minutes ago
Response Code	200
Fetched URL	https://whyrecord.com/release/the-waveshape-of-dubstep-to-come
Canonical URL
https://whyrecord.com/the-waveshape-of-dubstep-to-come
0 likes, shares and comments (More Info)
Redirect Path
Input URL
arrow-right
	https://whyrecord.com/release/the-waveshape-of-dubstep-to-come
og:url Meta Tag
arrow-right
	https://whyrecord.com/the-waveshape-of-dubstep-to-come
Link Preview
Based on the raw tags, we constructed the following Open Graph properties
fb:pages	108517283862837
og:url	https://whyrecord.com/the-waveshape-of-dubstep-to-come
og:title	WHY? Record Company
og:description

- ^ this one had no image, and the url came back without release/, also the title was incorrect, should be "release name - WRC"

---
caution-solid
Warnings That Should Be Fixed

    Inferred Property
    The 'og:image' property should be explicitly provided, even if a value can be inferred from other tags.

When and how we last scraped the URL
Time Scraped
3 seconds ago
Response Code	200
Fetched URL	https://whyrecord.com/release/WHYCOMP001
Canonical URL
https://whyrecord.com/WHYCOMP001

    (See History)

0 likes, shares and comments (More Info)
Redirect Path
Input URL
arrow-right
	https://whyrecord.com/release/WHYCOMP001
og:url Meta Tag
arrow-right
	https://whyrecord.com/WHYCOMP001
Link Preview
Based on the raw tags, we constructed the following Open Graph properties
fb:pages	108517283862837
og:url	https://whyrecord.com/WHYCOMP001
og:title	WHY? Record Company
og:description

- ^ this one had no image and the title was WHY? Record Company - it should be WHYCOMP001 - WRC
- Also, the url came back without release/
---

When and how we last scraped the URL
Time Scraped
4 seconds ago
Response Code	200
Fetched URL	https://whyrecord.com/artist/dyl_pykl
Canonical URL
https://whyrecord.com/dyl_pykl

    (See History)

0 likes, shares and comments (More Info)
Redirect Path
Input URL
arrow-right
	https://whyrecord.com/artist/dyl_pykl
og:url Meta Tag
arrow-right
	https://whyrecord.com/dyl_pykl
Link Preview
Based on the raw tags, we constructed the following Open Graph properties
fb:pages	108517283862837
og:url	https://whyrecord.com/dyl_pykl
og:title	WHY? Record Company
og:description

- ^ this one had no image and the title was WHY? Record Company - it should be dyl_pykl - WRC
- Also, the url came back without artist/
---

When and how we last scraped the URL
Time Scraped
3 seconds ago
Response Code	200
Fetched URL	https://whyrecord.com/artist/StratosFear
Canonical URL
https://whyrecord.com/artist/StratosFear
0 likes, shares and comments (More Info)
Link Preview
Based on the raw tags, we constructed the following Open Graph properties
og:url	https://whyrecord.com/artist/StratosFear
og:title	WHY? Record Company
og:description	Currently based in Lincoln, Nebraska, StratosFear is a chillout and ambient musician who focuses on meditative soundscapes and melodic journeys.
og:image	https://whyrecord.com/images/artists/profiles/stratosfear_4x6.jpg
og:image:alt	StratosFear


- ^ this one had an image but the title was WHY? Record Company - it should be StratosFear - WRC

--
Warnings That Should Be Fixed

    Inferred Property
    The 'og:image' property should be explicitly provided, even if a value can be inferred from other tags.

When and how we last scraped the URL
Time Scraped
2 seconds ago
Response Code	200
Fetched URL	https://whyrecord.com/contest/WHYCOMP010
Canonical URL
https://whyrecord.com/WHYCOMP010

    (See History)

0 likes, shares and comments (More Info)
Redirect Path
Input URL
arrow-right
	https://whyrecord.com/contest/WHYCOMP010
og:url Meta Tag
arrow-right
	https://whyrecord.com/WHYCOMP010
Link Preview
Based on the raw tags, we constructed the following Open Graph properties
fb:pages	108517283862837
og:url	https://whyrecord.com/WHYCOMP010
og:title	WHY? Record Company
og:description

- missing image
- title was	WHY? Record Company instead of WHYCOMP010 - WRC
- Also, the url came back without contest/

--

Warnings That Should Be Fixed

    Inferred Property
    The 'og:image' property should be explicitly provided, even if a value can be inferred from other tags.

When and how we last scraped the URL
Time Scraped
6 seconds ago
Response Code	200
Fetched URL	https://whyrecord.com/collection/SET
Canonical URL
https://whyrecord.com/SET
0 likes, shares and comments (More Info)
Redirect Path
Input URL
arrow-right
	https://whyrecord.com/collection/SET
og:url Meta Tag
arrow-right
	https://whyrecord.com/SET
Link Preview
Based on the raw tags, we constructed the following Open Graph properties
fb:pages	108517283862837
og:url	https://whyrecord.com/SET
og:title	WHY? Record Company
og:description

- missing collection/
- missing correct title
- missing image

--

similar issues are happening with almost every route

I tried updating some of the seo code but im not sure how successful i was.

3. Question: should we be running some kind of compression algorithm to make the images smaller for the meta tags? maybe even on build for the site itself to load the images faster? right now it takes a few seconds per image for the site to load, they look like they are loading in one line of pixels at a time


I tried running a line of code `npx imagemin public/images/**/*.{jpg,png} --out-dir=public/images --plugin=mozjpeg --plugin=pngquant` but it seems to have duplicated the images..., i might need some help
