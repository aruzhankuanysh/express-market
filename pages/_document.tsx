/* eslint-disable react/display-name */
import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="stylesheet" href="/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/css/bootstrap-icons.css" />
          <Script
            src="/js/react.production.min.js"
            crossOrigin="anonymous"
          ></Script>

          <Script
            src="/js/react-dom.production.min.js"
            crossOrigin="anonymous"
          ></Script>

          <Script
            src="/js/react-bootstrap.min.js"
            crossOrigin="anonymous"
          ></Script>
          <Script
            src="https://telegram.org/js/telegram-web-app.js"
            strategy="beforeInteractive"
          />
        </Head>
        <body className="w-100 h-100 m-0 p-0">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
