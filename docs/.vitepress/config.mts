import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'EverREST',
  description: 'Build real CRUD applications with EverREST API',
  lang: 'en-US',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { property: 'og:type', content: 'website'}],
    ['meta', { property: 'og:url', content: 'https://everrest.educata.dev/'}],
    ['meta', { property: 'og:title', content: 'EverREST - Build real CRUD applications'}],
    ['meta', { property: 'og:description', content: 'EverREST helps you to practice development using a full-featured easy-to-use API'}],
    ['meta', { property: 'og:image', content: 'https://everrest.educata.dev/logo.png'}],
    ['meta', { property: 'fb:app_id', content: '1717539238757544'}],
    ['meta', { property: 'twitter:card', content: 'summary_large_image'}],
    ['meta', { property: 'twitter:type', content: 'website'}],
    ['meta', { property: 'twitter:url', content: 'https://everrest.educata.dev/'}],
    ['meta', { property: 'twitter:title', content: 'EverREST - Build real CRUD applications'}],
    ['meta', { property: 'twitter:description', content: 'EverREST helps you to practice development using a full-featured easy-to-use API'}],
    ['meta', { property: 'twitter:image', content: 'https://everrest.educata.dev/logo.png'}],
  ],
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
          { text: 'Errors', link: '/errors' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/educata/everrest' },
    ],
    logo: './logo-circle.png'
  },
});
