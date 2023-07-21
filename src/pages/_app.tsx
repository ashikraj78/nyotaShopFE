import Footer from '@/components/Footer';
import TopHeader from '@/components/TopHeader';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import {store} from "../redux/store"


export default function App({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />
  return (
       <Provider store={store}>

        <div>
          <TopHeader />
          <Component {...pageProps} />
          <Footer />
        </div>
       </Provider>
     
   
  );
}
