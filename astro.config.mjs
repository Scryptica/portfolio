import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  integrations: [icon()],
  devToolbar: { enabled: false },
});
