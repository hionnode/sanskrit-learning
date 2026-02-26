import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sanskritshiksha.com',
  output: 'static',
  trailingSlash: 'never',
  integrations: [preact(), tailwind(), mdx(), sitemap()],
  i18n: {
    defaultLocale: 'hi',
    locales: ['hi', 'en'],
    routing: { prefixDefaultLocale: true },
  },
});
