import Footer from "@/components/Footer";
import TopHeader from "@/components/TopHeader";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <TopHeader />
          <Component {...pageProps} />
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  );
}
