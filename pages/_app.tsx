import { AppType } from 'next/app';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'react-bootstrap';
import '../styles/styles.css';
import '../styles/default.css';
import '../styles/fonts.css';
import { wrapper } from "../store/store";
import {Provider} from 'react-redux';
import dynamic from 'next/dynamic';
// import BackOnTop from '../components/back-on-top';
// import { GoogleAnalytics } from "nextjs-google-analytics";
import { useEffect } from 'react';
import { clarity } from 'react-microsoft-clarity';

const CustomApp: AppType = ({ Component, pageProps }: AppProps) => {
  const {store, props} = wrapper.useWrappedStore(pageProps);

  useEffect(() => {
    clarity.init('gnb85znipm');
  }, []);

  return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Expres Market</title>
        </Head>
        <Provider store={store}>
            <ThemeProvider
              breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
              minBreakpoint="xxs"
            >
              {/* <GoogleAnalytics trackPageViews /> */}
              <Component {...pageProps} />
              {/* <BackOnTop /> */}
            </ThemeProvider>
        </Provider>
      </>
  );
}

export default dynamic(() => Promise.resolve(CustomApp), {
  ssr: false,
});
