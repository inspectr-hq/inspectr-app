// @ts-check
// import node from '@astrojs/node'
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import relativeLinks from 'astro-relative-links';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), relativeLinks()],
  output: "static",
  // output: "server",
  // adapter: node({
  //   mode: 'standalone'
  // }),
  vite: {
    plugins: [tailwindcss()]
  }
});