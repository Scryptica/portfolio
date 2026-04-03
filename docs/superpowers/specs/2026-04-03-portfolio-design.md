# Scryptica Portfolio — Design Spec

## Context

Scryptica needs a personal portfolio website. The goal is to showcase their identity and personality through a retro-styled site with modern visual touches. The site will be simple (2 sections), focused, and hosted publicly on GitHub.

## Visual Style

**Theme:** Windows 98 + Glassmorphism

- Window chrome mimics Win98 (title bar with gradient, minimize/maximize/close buttons)
- Window bodies use glassmorphism: `background: rgba(255,255,255,0.55)`, `backdrop-filter: blur(12px)`, subtle borders `rgba(140,170,210,0.5)`
- Background: pastel blue grid pattern (inspired by profile picture) — base color `#c0d4ed` with `rgba(150,180,220,0.35)` grid lines at 32px spacing, plus a subtle radial gradient overlay for depth
- Text colors: `#3a5a8a` (primary), `#5a7a9a` (secondary), `#4a6a8a` (body)
- Title bars: `linear-gradient(90deg, #7aa8d4, #a8c8e8)` with white bold text

## Sections

### 1. Hero Window
- Title bar: "☆ Scryptica's Portfolio"
- Profile picture: fetched from GitHub avatar (`https://avatars.githubusercontent.com/u/198969065?v=4`)
- Avatar: circular, 80px, with pastel blue border and shadow
- Username: "Scryptica ☆" with a waving hand emoji (👋) animated via GSAP timeline
- Subtitle: "Welcome to my corner of the internet"
- GitHub link with icon (Iconify)

### 2. About Me Window
- Title bar: "About Me"
- Section label styled as `// about_me.txt` (retro file reference)
- Body: "Hey there! I'm Scryptica -- a self-taught developer who loves tinkering with web technologies, backend systems, and AI. I build stuff for fun, learn by doing, and enjoy turning random ideas into real projects. Quality and design are always my top priorities. Always exploring something new."
- Same glassmorphism window treatment

### No Taskbar
No bottom navigation bar. The page is simple enough without it.

## Animations (GSAP)

- **Floating particles:** Stars and bubbles animated with GSAP — organic upward drift with randomized positions, sizes (3-12px), durations (15-24s), and delays. GSAP's easing functions give movement more natural than CSS keyframes.
- **Waving hand:** GSAP timeline with rotation keyframes on the 👋 emoji. Loops with a pause between waves.
- No scroll-triggered animations (page is short enough that everything is visible).

## Icons

- **Library:** Astro Icon with Iconify provider
- **Icons needed:** Waving hand (emoji with GSAP animation), GitHub icon (`mdi:github`)

## Tech Stack

- **Framework:** Astro (static site generator)
- **Animations:** GSAP (free for non-commercial use)
- **Icons:** `astro-icon` package with `@iconify-json/mdi`
- **Styling:** Scoped CSS in Astro components
- **No JS frameworks** (React, Vue, etc.) — pure Astro components

## Project Structure

```
/
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # Base HTML layout, meta tags, global styles
│   ├── components/
│   │   ├── Window.astro           # Reusable Win98 window component
│   │   ├── Hero.astro             # Hero section with avatar + name
│   │   ├── AboutMe.astro          # About Me section
│   │   └── Particles.astro        # Floating particles background + GSAP script
│   ├── styles/
│   │   └── global.css             # Global styles, CSS variables, fonts
│   └── pages/
│       └── index.astro            # Single page composing all sections
├── public/
│   └── favicon.svg
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Responsive Design

- Max-width on windows: `680px`, centered
- On mobile (<640px): reduce avatar size, font sizes, padding
- Particles stay as-is (CSS fixed positioning works across viewports)

## Repository & Deployment

- **Repository:** Public on GitHub
- **Deployment:** GitHub Pages (via Astro's `@astrojs/github-pages` or static output)

## Verification

1. Run `npm create astro@latest` and verify project scaffolds correctly
2. Run `npm run dev` and verify the site loads at localhost
3. Verify glassmorphism renders correctly (backdrop-filter support)
4. Verify GSAP particles animate smoothly
5. Verify GitHub avatar loads from the URL
6. Verify waving hand animation loops correctly
7. Test responsive layout on mobile viewport (Chrome DevTools)
8. Run `npm run build` and verify static output generates without errors
