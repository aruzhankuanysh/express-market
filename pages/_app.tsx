import "@/styles/globals.css";
import { AppType } from 'next/app';
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from "react-bootstrap";
import dynamic from 'next/dynamic';

const CustomApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Express-dark-store</title>
      </Head>
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minBreakpoint="xxs"
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default dynamic(() => Promise.resolve(CustomApp), {
  ssr: false,
});
