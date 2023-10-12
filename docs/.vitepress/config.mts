import { defineConfig } from 'vitepress';
import { Metadata } from './metadata';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'EverREST',
  description: 'Build real CRUD applications with EverREST API',
  lang: 'en-US',
  head: [
    ...Metadata,
    [
      'style',
      {},
      'html { scroll-behavior: smooth; @media (prefers-reduced-motion) { html { scroll-behavior: initial; } }',
    ],
  ],
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
              { text: 'Product', link: '/product' },
              { text: 'Cart', link: '/cart' },
            ],
          },
          { text: 'QR', link: '/qr' },
          { text: 'Quote', link: '/quote' },
          { text: 'Errors', link: '/errors' },
          { text: 'Echo', link: '/echo' },
          { text: 'Team Members', link: '/team' },
          { text: 'Changelog', link: '/CHANGELOG' },
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
    footer: {
      message:
        'Released under the <a href="https://github.com/educata/everrest/blob/main/LICENSE">MIT License</a>.',
      copyright:
        'Copyright © 2023-present <a href="https://github.com/educata">Educata</a>',
    },
  },
});
