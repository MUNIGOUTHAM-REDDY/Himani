# Himani Sharma, Portfolio

A modern, highly visual, **mobile-first** redesign of Himani Sharma's product
design portfolio. Colours and imagery are sourced from her live site.

## What's inside
- **`index.html`** — single page: Hero · Work · About · Contact
- **`css/styles.css`** — mobile-first responsive styling
- **`js/main.js`** — momentum smooth scroll, scroll reveals, count-up stats, hero parallax, nav
- **`assets/`** — optimised portrait and project cover images

## Design direction
- Palette pulled from the live site: navy `#141324`, teal `#4a8fa8`, blue `#0099ff`
- Image-forward hero featuring Himani's portrait, with word-by-word text animation
- Real project cover images (Booking.com, Swiggy EatRight, Fashion Rental)
- Momentum smooth scrolling on desktop; native smooth scroll on touch
- Reveal-on-scroll animations with `prefers-reduced-motion` support
- Fully responsive from 320px up; works without JS

## Run locally
Open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

No build step, no dependencies.
