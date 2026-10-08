# Terra Arc homepage recreation

Standalone React/Vite source export. The live Lovable project retains its existing TanStack Start router. Homepage only. GSAP ScrollTrigger drives the film and chapter progression; browser scrolling remains native.

## Run locally
Requires Node.js 22 or newer.

```sh
npm install
npm install --prefix sevn-cafe-bakehaus
npm run dev
```

The ZIP project is extracted into [`sevn-cafe-bakehaus/`](./sevn-cafe-bakehaus/),
and its standalone app is served at `/cafe-bakehaus/`. The root `dev` and
`build` scripts build that app before starting or building the main site.
The ZIP contains image asset descriptors but not all of the original image
files. The standalone build uses local image fallbacks and locally bundled
stock photos for the café, story, journal, and mood carousel imagery.

### Café photo sources
The stock photos below are bundled locally so they remain available without a
network connection. Unsplash's [license](https://unsplash.com/license) and
Pexels' [license](https://www.pexels.com/license/) allow free commercial and
non-commercial use; attribution is appreciated.

| Use | Photo |
| --- | --- |
| Morning latte | [Unsplash photo](https://images.unsplash.com/photo-1511920170033-f8396924c348) |
| Coffee to share | [Unsplash photo](https://images.unsplash.com/photo-1495474472287-4d71bcdd2085) |
| Coffee and grounds | [Unsplash photo](https://images.unsplash.com/photo-1509785307050-d4066910ec1e) |
| Croissants | [Unsplash photo](https://images.unsplash.com/photo-1555507036-ab1f4038808a) |
| Savory toast | [Unsplash photo](https://images.unsplash.com/photo-1484723091739-30a097e8f929) |
| French toast | [Unsplash photo](https://images.unsplash.com/photo-1525351484163-7529414344d8) |
| Chocolate cake | [Unsplash photo](https://images.unsplash.com/photo-1558961363-fa8fdf82db35) |
| Cookies | [Unsplash photo](https://images.unsplash.com/photo-1578985545062-69928b1d9587) |
| Café interior | [Unsplash photo](https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb) |
| Café gathering | [Unsplash photo](https://images.unsplash.com/photo-1554118811-1e0d58224f24) |
| Coffee ready to take away | [Pexels photo by Tima Miroshnichenko](https://www.pexels.com/photo/a-person-holding-a-cup-6612350/) |

## Reference findings and deliberate differences
- Reference: https://terra-arc-coffee.netlify.app/
- Six 100vh sections: introduction, Origin, Fracture, Pressure, Pour, Arrival.
- Fixed 1664×936, 9.933-second coffee film, object-fit cover. Scroll maps to duration minus 0.025 seconds.
- Film seeking uses exponential damping 13 and an 18ms threshold, with one pending seek.
- Loader: “Preparing the brew…”; dots blink every 1.2 seconds with 0.2-second stagger. Scrim transition: 0.65 seconds.
- Tour: 20 seconds at 1× and 10 seconds at 2×, proportionally shortened when resumed. Wheel, touch, and keyboard interrupt it.
- Public source has no custom cursor, mouse-following, split text animation, animated SVG paths, masks, pinned content, or page-transition choreography. These are not invented.
- Native scrolling intentionally replaces the reference's Lenis dependency. Font sizes use explicit responsive breakpoints; letter spacing is zero under workspace constraints.
- Contact and reservation controls are visually retained but disabled: other pages and booking are out of scope.
- Original MP4 recovered; a content-identical VP9/WebM conversion supports browsers without H.264 decoding. Original fonts and first-frame poster included.
- Reduced motion disables continuous film scrubbing and simplifies loader transition.

## Source layout
- src/components/terra: homepage UI and controls.
- src/animations/film.ts: reference film timing and scroll scheduler.
- src/styles/experience.css: homepage composition and responsive styles.
- src/lib/chapters.ts: chapter content and timing boundaries.

The downloadable archive materializes media and fonts locally. No backend, database, authentication, or other content pages. Assets are for development recreation; confirm reuse rights before public deployment.
