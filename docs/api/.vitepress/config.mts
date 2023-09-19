import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'EverREST',
  description: 'Build real CRUD applications with EverREST API',
  base: '/docs/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/getting-started' },
    ],

    sidebar: [
      {
        text: 'API Docs',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Authentication', link: '/authentication' },
          { text: 'Shop', link: '/shop' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/educata/everrest' },
    ],
  },
});
