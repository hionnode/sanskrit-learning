import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  integrations: [preact(), tailwind(), mdx()],
  i18n: {
    defaultLocale: 'hi',
    locales: ['hi', 'en'],
    routing: { prefixDefaultLocale: true },
  },
});
