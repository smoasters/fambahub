import '@primer/primitives/dist/css/functional/themes/light.css';
import '@primer/primitives/dist/css/primitives.css';
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';
import { GoogleAnalytics } from 'tanstack-router-ga4';
import { ThemeProvider } from '@/components/ui/theme-provider';
import appCss from '@/styles.css?url';
import { metadata } from '@/lib/metadata';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...metadata({
        title: 'FambaHub | Explore the world',
        description:
          'Discover places, experiences, and travel ideas across Zimbabwe and beyond. Plan, explore, and book with ease with FambaHub.',
      }),
    ],

    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'preconnect',
        href: 'https://rsms.me',
      },
      {
        rel: 'stylesheet',
        href: 'https://rsms.me/inter/inter.css',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-96x96.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.svg' },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      data-color-mode='light'
      data-light-theme='light'
      data-dark-theme='dark'
    >
      <head>
        <HeadContent />
      </head>
      <body className='antialiased font-sans!'>
        <GoogleAnalytics measurementId='G-P86CEWRLRM' />
        <ThemeProvider>
          <nav className='h-15 border-b border-b-default'></nav>
          {children}
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
