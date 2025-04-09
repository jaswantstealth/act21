import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
const gtmId = 'GTM-MQQ53XVJ';
  return (
    <Html lang="en">
      <Head>
       {/* Google Tag Manager Head */}
          <script
            async
            src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
          />
          {/* End Google Tag Manager Head */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        <meta name="google-site-verification" content="E2eB2kqRy-1W8GzjyzZP5v1OyIm_I4a7W6pzi5YE_98" />
      </Head>
      <body>
        {/* Google Tag Manager Body */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          {/* End Google Tag Manager Body */}
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
