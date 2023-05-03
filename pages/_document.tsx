/* eslint-disable react/display-name */
import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          
          
          <meta name="description" content="Yaxshisushi - Доставка Японской еды!" />
          <meta name="keywords" content="доставка, японской, еды, суши, роллы, сеты, супы, салаты" />

          <meta name="robots" content="index,follow,noodp" />
          <meta name="googlebot" content="index,follow" />

          <link rel="apple-touch-icon" href="/image/apple-touch-icon.png" />
          <link rel="icon" href="/image/favicon.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="/image/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/image/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="48x48" href="/image/favicon-48x48.png" />
          <link rel="icon" type="image/png" sizes="48x48" href="/image/favicon-48x48.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/image/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="72x72" href="/image/android-chrome-72x72.png" />
          <link rel="mask-icon" href="/image/safari-pinned-tab.svg" color="#5bbad5" />
          <link
            rel="stylesheet"
            href="/css/bootstrap.min.css"
          />
          <link
            rel="stylesheet"
            href="/css/bootstrap-icons.css"
          />
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
        <body className='w-100 h-100 m-0 p-0'>

            <Main />

          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            
                ym(93285473, "init", {
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true
                });
              `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '581693597256755'); 
              fbq('track', 'PageView');
              `,
            }}
          />
          <noscript><div><img src="https://mc.yandex.ru/watch/93285473" style={{position:"absolute", left:"-9999px"}} alt="" /></div><img height="1" width="1" src="https://www.facebook.com/tr?id=581693597256755&ev=PageView&noscript=1"/></noscript>
        </body>
      </Html>
    );
  }
}
