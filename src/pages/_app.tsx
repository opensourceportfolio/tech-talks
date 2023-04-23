import '@/styles/globals.css';
import 'reveal.js/dist/theme/league.css';
import '@/styles/theme.css';
import '@highlightjs/cdn-assets/styles/base16/railscasts.min.css';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
