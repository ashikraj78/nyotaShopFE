import Footer from '@/components/Footer';
import TopHeader from '@/components/TopHeader';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />
  return (
    <div>
      <TopHeader />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
