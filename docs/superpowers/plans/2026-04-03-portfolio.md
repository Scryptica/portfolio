# Scryptica Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a retro Windows 98 + glassmorphism portfolio site with GSAP animations, pastel blue grid background, and floating particles.

**Architecture:** Single-page Astro static site with two glassmorphism windows (Hero + About Me) over a pastel blue grid background. GSAP handles particle animations and the waving hand. Astro Icon provides the GitHub icon via Iconify.

**Tech Stack:** Astro, GSAP, astro-icon, @iconify-json/mdi

---

## File Map

| File | Responsibility |
|------|---------------|
| `src/styles/global.css` | CSS variables, grid background, base reset, glassmorphism tokens |
| `src/layouts/Layout.astro` | HTML shell, meta tags, imports global.css |
| `src/components/Window.astro` | Reusable Win98 window (title bar + glassmorphism body), accepts `title` prop and a default slot |
| `src/components/Particles.astro` | Renders particle DOM elements + inline `<script>` that imports GSAP and animates them |
| `src/components/Hero.astro` | Hero section: avatar, username + wave emoji, subtitle, GitHub link |
| `src/components/AboutMe.astro` | About Me section with bio text |
| `src/pages/index.astro` | Composes Particles + Hero + AboutMe inside Layout |
| `public/favicon.svg` | Simple star favicon |
| `astro.config.mjs` | Astro config with site URL |

---

### Task 1: Scaffold Astro Project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`

- [ ] **Step 1: Initialize Astro project**

Run inside `d:\Scryptica's Portfolio`:

```bash
npm create astro@latest . -- --template minimal --no-install --typescript strict
```

Select "Empty" if prompted. This creates the base Astro structure.

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install gsap astro-icon @iconify-json/mdi
```

- [ ] **Step 3: Configure Astro**

Replace `astro.config.mjs` with:

```js
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  integrations: [icon()],
});
```

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Expected: Astro dev server running at `http://localhost:4321` with the default empty page.

- [ ] **Step 5: Commit**

```bash
git init
echo "node_modules\ndist\n.astro\n.superpowers" > .gitignore
git add .
git commit -m "chore: scaffold Astro project with GSAP and astro-icon"
```

---

### Task 2: Global Styles + Grid Background

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create global.css with CSS variables and grid background**

```css
:root {
  /* Colors */
  --color-bg: #c0d4ed;
  --color-grid: rgba(150, 180, 220, 0.35);
  --color-primary: #3a5a8a;
  --color-secondary: #5a7a9a;
  --color-body: #4a6a8a;
  --color-title-bar-start: #7aa8d4;
  --color-title-bar-end: #a8c8e8;
  --color-glass-bg: rgba(255, 255, 255, 0.55);
  --color-glass-border: rgba(140, 170, 210, 0.5);
  --color-glass-shadow: rgba(100, 140, 200, 0.2);
  --color-glass-inner: rgba(255, 255, 255, 0.4);

  /* Spacing */
  --grid-size: 32px;
  --window-max-width: 680px;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Tahoma, 'Segoe UI', sans-serif;
  background-color: var(--color-bg);
  background-image:
    linear-gradient(var(--color-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-grid) 1px, transparent 1px);
  background-size: var(--grid-size) var(--grid-size);
  min-height: 100vh;
  overflow-x: hidden;
  color: var(--color-primary);
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse at 30% 20%, rgba(210, 225, 245, 0.4) 0%, transparent 60%),
    radial-gradient(ellipse at 70% 80%, rgba(190, 210, 240, 0.3) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}
```

- [ ] **Step 2: Verify background renders**

Open `http://localhost:4321`. You should see a pastel blue grid background with a soft gradient overlay.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add global styles with pastel blue grid background"
```

---

### Task 3: Layout Component

**Files:**
- Create: `src/layouts/Layout.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Layout.astro**

```astro
---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Scryptica's Portfolio" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>

<style>
  @import '../styles/global.css';
</style>
```

- [ ] **Step 2: Update index.astro to use Layout**

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Scryptica ☆">
  <p>Hello world</p>
</Layout>
```

- [ ] **Step 3: Verify layout renders**

Open `http://localhost:4321`. Should see "Hello world" on the grid background with the page title "Scryptica ☆".

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Layout.astro src/pages/index.astro
git commit -m "feat: add Layout component with meta tags"
```

---

### Task 4: Window Component

**Files:**
- Create: `src/components/Window.astro`

- [ ] **Step 1: Create the reusable Win98 window component**

```astro
---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<div class="window">
  <div class="title-bar">
    <span class="title-bar-text">{title}</span>
    <div class="title-buttons">
      <div class="title-btn" aria-hidden="true">&#8722;</div>
      <div class="title-btn" aria-hidden="true">&#9633;</div>
      <div class="title-btn" aria-hidden="true">&#215;</div>
    </div>
  </div>
  <div class="window-body">
    <slot />
  </div>
</div>

<style>
  .window {
    background: var(--color-glass-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 2px solid var(--color-glass-border);
    box-shadow:
      4px 4px 16px var(--color-glass-shadow),
      inset 0 0 0 1px var(--color-glass-inner);
    max-width: var(--window-max-width);
    margin: 0 auto;
  }

  .title-bar {
    background: linear-gradient(90deg, var(--color-title-bar-start), var(--color-title-bar-end));
    padding: 4px 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title-bar-text {
    color: white;
    font-size: 12px;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
  }

  .title-buttons {
    display: flex;
    gap: 3px;
  }

  .title-btn {
    background: rgba(255, 255, 255, 0.65);
    border: 1px solid rgba(140, 170, 210, 0.5);
    width: 18px;
    height: 16px;
    text-align: center;
    font-size: 11px;
    line-height: 16px;
    border-radius: 1px;
    color: var(--color-body);
  }

  .window-body {
    padding: 24px;
  }
</style>
```

- [ ] **Step 2: Test window in index.astro**

Temporarily update `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Window from '../components/Window.astro';
---

<Layout title="Scryptica ☆">
  <div style="padding: 60px 24px;">
    <Window title="☆ Test Window">
      <p>Glassmorphism works!</p>
    </Window>
  </div>
</Layout>
```

- [ ] **Step 3: Verify window renders**

Open `http://localhost:4321`. You should see a translucent window with a blue gradient title bar, min/max/close buttons, and "Glassmorphism works!" inside. The grid should be visible through the window body.

- [ ] **Step 4: Commit**

```bash
git add src/components/Window.astro src/pages/index.astro
git commit -m "feat: add reusable Win98 glassmorphism Window component"
```

---

### Task 5: Hero Component

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Create Hero.astro**

```astro
---
import { Icon } from 'astro-icon/components';
import Window from './Window.astro';
---

<section class="hero">
  <Window title="☆ Scryptica's Portfolio">
    <div class="hero-content">
      <img
        class="avatar"
        src="https://avatars.githubusercontent.com/u/198969065?v=4"
        alt="Scryptica's avatar"
        width="80"
        height="80"
      />
      <div class="hero-text">
        <h1>
          Scryptica ☆ <span class="wave" aria-label="waving hand">👋</span>
        </h1>
        <p class="subtitle">Welcome to my corner of the internet</p>
        <div class="social-links">
          <a href="https://github.com/Scryptica" target="_blank" rel="noopener noreferrer" class="social-link">
            <Icon name="mdi:github" size={16} />
            GitHub
          </a>
        </div>
      </div>
    </div>
  </Window>
</section>

<script>
  import { gsap } from 'gsap';

  const wave = document.querySelector('.wave');
  if (wave) {
    gsap.to(wave, {
      rotation: 20,
      duration: 0.3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      repeatDelay: 1.5,
      transformOrigin: '70% 70%',
      keyframes: [
        { rotation: 14, duration: 0.15 },
        { rotation: -8, duration: 0.15 },
        { rotation: 14, duration: 0.15 },
        { rotation: -4, duration: 0.15 },
        { rotation: 10, duration: 0.15 },
        { rotation: 0, duration: 0.3 },
      ],
    });
  }
</script>

<style>
  .hero {
    padding: 80px 24px 40px;
    position: relative;
    z-index: 2;
  }

  .hero-content {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid rgba(122, 168, 212, 0.4);
    box-shadow: 0 4px 14px rgba(100, 150, 200, 0.25);
    object-fit: cover;
    flex-shrink: 0;
  }

  h1 {
    font-size: 22px;
    color: var(--color-primary);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .wave {
    display: inline-block;
    font-size: 24px;
  }

  .subtitle {
    font-size: 13px;
    color: var(--color-secondary);
    margin-top: 4px;
  }

  .social-links {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }

  .social-link {
    background: rgba(122, 168, 212, 0.15);
    border: 1px solid rgba(122, 168, 212, 0.3);
    padding: 4px 10px;
    font-size: 11px;
    color: var(--color-secondary);
    text-decoration: none;
    border-radius: 2px;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: background 0.2s;
  }

  .social-link:hover {
    background: rgba(122, 168, 212, 0.3);
  }

  @media (max-width: 640px) {
    .hero {
      padding: 40px 16px 24px;
    }
    .avatar {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 18px;
    }
  }
</style>
```

- [ ] **Step 2: Add Hero to index.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
---

<Layout title="Scryptica ☆">
  <Hero />
</Layout>
```

- [ ] **Step 3: Verify hero renders**

Open `http://localhost:4321`. You should see:
- GitHub avatar loading correctly (circular, with blue border)
- "Scryptica ☆ 👋" with the hand animating via GSAP
- "Welcome to my corner of the internet" subtitle
- GitHub link with the MDI icon

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add Hero component with avatar, GSAP wave animation, and GitHub link"
```

---

### Task 6: About Me Component

**Files:**
- Create: `src/components/AboutMe.astro`

- [ ] **Step 1: Create AboutMe.astro**

```astro
---
import Window from './Window.astro';
---

<section class="about">
  <Window title="About Me">
    <div class="section-label">// about_me.txt</div>
    <p>
      Hey there! I'm Scryptica — a self-taught developer who loves tinkering
      with web technologies, backend systems, and AI. I build stuff for fun,
      learn by doing, and enjoy turning random ideas into real projects. Quality
      and design are always my top priorities. Always exploring something new.
    </p>
  </Window>
</section>

<style>
  .about {
    padding: 20px 24px 80px;
    position: relative;
    z-index: 2;
  }

  .section-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--color-title-bar-start);
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(122, 168, 212, 0.2);
    font-family: 'Courier New', monospace;
  }

  p {
    font-size: 13px;
    line-height: 1.7;
    color: var(--color-body);
  }

  @media (max-width: 640px) {
    .about {
      padding: 12px 16px 60px;
    }
  }
</style>
```

- [ ] **Step 2: Add AboutMe to index.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import AboutMe from '../components/AboutMe.astro';
---

<Layout title="Scryptica ☆">
  <Hero />
  <AboutMe />
</Layout>
```

- [ ] **Step 3: Verify about section renders**

Open `http://localhost:4321`. Below the hero, you should see the About Me window with the `// about_me.txt` label and the bio text.

- [ ] **Step 4: Commit**

```bash
git add src/components/AboutMe.astro src/pages/index.astro
git commit -m "feat: add About Me component with bio"
```

---

### Task 7: Floating Particles with GSAP

**Files:**
- Create: `src/components/Particles.astro`

- [ ] **Step 1: Create Particles.astro**

```astro
<div class="particles" aria-hidden="true">
  {Array.from({ length: 12 }).map((_, i) => (
    <div class={`particle ${i % 2 === 0 ? 'star' : 'bubble'}`} />
  ))}
</div>

<script>
  import { gsap } from 'gsap';

  const particles = document.querySelectorAll('.particle');

  particles.forEach((particle) => {
    const size = gsap.utils.random(3, 12);
    const startX = gsap.utils.random(0, 100);
    const el = particle as HTMLElement;

    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.left = `${startX}%`;

    gsap.set(el, { y: window.innerHeight + 20, opacity: 0 });

    const animate = () => {
      gsap.set(el, {
        y: window.innerHeight + 20,
        x: gsap.utils.random(-30, 30),
        opacity: 0,
      });

      gsap.to(el, {
        y: -50,
        x: `+=${gsap.utils.random(-40, 40)}`,
        rotation: gsap.utils.random(0, 360),
        opacity: gsap.utils.random(0.3, 0.6),
        duration: gsap.utils.random(15, 24),
        ease: 'none',
        onComplete: animate,
        onUpdate: function () {
          const progress = this.progress();
          if (progress < 0.1) {
            el.style.opacity = String(progress * 6);
          } else if (progress > 0.9) {
            el.style.opacity = String((1 - progress) * 6);
          }
        },
      });
    };

    gsap.delayedCall(gsap.utils.random(0, 10), animate);
  });
</script>

<style>
  .particles {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
  }

  .particle {
    position: absolute;
    border-radius: 50%;
  }

  .particle.star {
    background: radial-gradient(circle, rgba(255, 255, 255, 0.7), rgba(168, 200, 232, 0.3));
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.3);
  }

  .particle.bubble {
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5), rgba(168, 200, 232, 0.15));
    border: 1px solid rgba(255, 255, 255, 0.35);
  }
</style>
```

- [ ] **Step 2: Add Particles to index.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import Particles from '../components/Particles.astro';
import Hero from '../components/Hero.astro';
import AboutMe from '../components/AboutMe.astro';
---

<Layout title="Scryptica ☆">
  <Particles />
  <Hero />
  <AboutMe />
</Layout>
```

- [ ] **Step 3: Verify particles animate**

Open `http://localhost:4321`. You should see 12 small stars and bubbles drifting upward across the grid background at varying speeds and positions. They should fade in near the bottom and fade out near the top.

- [ ] **Step 4: Commit**

```bash
git add src/components/Particles.astro src/pages/index.astro
git commit -m "feat: add floating particles animated with GSAP"
```

---

### Task 8: Favicon + Final Polish

**Files:**
- Create: `public/favicon.svg`

- [ ] **Step 1: Create a star favicon**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="28">☆</text>
</svg>
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Build completes without errors, output in `dist/`.

- [ ] **Step 3: Preview production build**

```bash
npm run preview
```

Open `http://localhost:4321`. Verify everything works in the production build:
- Grid background visible
- Both windows render with glassmorphism
- GitHub avatar loads
- GSAP wave animation plays
- Particles float
- Responsive on mobile (Chrome DevTools toggle device toolbar, try 375px width)

- [ ] **Step 4: Commit**

```bash
git add public/favicon.svg
git commit -m "feat: add star favicon and verify production build"
```

---

### Task 9: Responsive Final Check

No new files — this task verifies responsive behavior already built into Tasks 5-6.

- [ ] **Step 1: Test mobile viewport**

Open Chrome DevTools → Toggle Device Toolbar → Set to 375px width (iPhone SE).

Verify:
- Hero avatar shrinks to 60px
- Font sizes reduce
- Windows don't overflow horizontally
- Particles still animate correctly

- [ ] **Step 2: Test tablet viewport**

Set DevTools to 768px width.

Verify: Windows stay centered at max-width 680px with proper padding.

- [ ] **Step 3: Final commit if any fixes needed**

If responsive fixes were needed:

```bash
git add -A
git commit -m "fix: responsive layout adjustments"
```
