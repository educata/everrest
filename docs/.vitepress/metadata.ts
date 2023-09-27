import { HeadConfig } from 'vitepress';

export const Metadata: HeadConfig[] = [
  ['link', { rel: 'icon', href: '/favicon.ico' }],
  ['meta', { property: 'og:type', content: 'website' }],
  ['meta', { property: 'og:url', content: 'https://everrest.educata.dev/' }],
  [
    'meta',
    {
      property: 'og:title',
      content: 'EverREST - Build real CRUD applications',
    },
  ],
  [
    'meta',
    {
      property: 'og:description',
      content:
        'EverREST helps you to practice development using a full-featured easy-to-use API',
    },
  ],
  [
    'meta',
    {
      property: 'og:image',
      content: 'https://everrest.educata.dev/logo.png',
    },
  ],
  ['meta', { property: 'fb:app_id', content: '1717539238757544' }],
  ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
  ['meta', { property: 'twitter:type', content: 'website' }],
  [
    'meta',
    { property: 'twitter:url', content: 'https://everrest.educata.dev/' },
  ],
  [
    'meta',
    {
      property: 'twitter:title',
      content: 'EverREST - Build real CRUD applications',
    },
  ],
  [
    'meta',
    {
      property: 'twitter:description',
      content:
        'EverREST helps you to practice development using a full-featured easy-to-use API',
    },
  ],
  [
    'meta',
    {
      property: 'twitter:image',
      content: 'https://everrest.educata.dev/logo.png',
    },
  ],
]