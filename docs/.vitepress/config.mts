import { defineConfig } from 'vitepress';
import { Metadata } from './metadata';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'EverREST',
  description: 'Build real CRUD applications with EverREST API',
  lang: 'en-US',
  head: [...Metadata],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/getting-started' },
      { text: 'Swagger', link: 'https://api.everrest.educata.dev/swagger' },
    ],
    sidebar: [
      {
        text: 'API Docs',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Authentication', link: '/authentication' },
          {
            text: 'Shop',
            link: '/shop',
            items: [
              { text: 'Product', link: '/product'},
              { text: 'Cart', link: '/cart'},
            ]
          },
          { text: 'QR', link: '/qr' },
          { text: 'Errors', link: '/errors' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/educata/everrest' },
    ],
    logo: './logo-circle.png',
    search: {
      provider: 'local',
    },
  },
});
