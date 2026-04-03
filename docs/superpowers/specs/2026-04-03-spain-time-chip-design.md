---
title: Spain Time Chip
date: 2026-04-03
status: approved
---

## Goal

Show the current local time in Spain (Europe/Madrid) as a non-interactive chip inside the Hero's social links row.

## Placement

Inside `src/components/Hero.astro`, appended to the `.social-links` flex container, after the GitHub link.

## Component

A `<span>` element (not `<a>` — it is not clickable) styled identically to `.social-link`:

- `data-animate` attribute so it participates in the GSAP stagger entrance animation
- `mdi:clock-outline` icon (via `astro-icon`) at `size={16}`
- A `<span id="spain-time">` inside for the time text, updated by JS
- `cursor: default` to signal it is not interactive

```html
<span data-animate class="social-link time-chip">
  <Icon name="mdi:clock-outline" size={16} />
  <span id="spain-time">--:--:--</span>
</span>
```

## Styles

No new CSS rules needed beyond adding `cursor: default` scoped to `.time-chip`. All other visual properties inherit from `.social-link`.

## JavaScript

Added to the existing `<script>` block in Hero.astro:

```js
function updateTime() {
  const el = document.getElementById('spain-time');
  if (el) {
    el.textContent = new Date().toLocaleTimeString('es-ES', {
      timeZone: 'Europe/Madrid',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
}
updateTime();
setInterval(updateTime, 1000);
```

- Uses `Intl.DateTimeFormat` via `toLocaleTimeString` — no external dependencies
- Initial call runs immediately so the chip never shows a blank state on load
- Updates every 1000ms

## Constraints

- No new npm packages
- No new component files — change is confined to `Hero.astro`
- Respects `data-animate` / GSAP entrance animation already in place
