# Terra Arc homepage recreation

Standalone React/Vite source export. The live Lovable project retains its existing TanStack Start router. Homepage only. GSAP ScrollTrigger drives the film and chapter progression; browser scrolling remains native.

## Run locally
Requires Node.js 22 or newer.

```sh
npm install
npm run dev
```

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
