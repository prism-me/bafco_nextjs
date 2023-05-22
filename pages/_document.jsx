import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <base href={process.env.PUBLIC_URL} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Jost:400,500,600,700,800,900"
          />
          <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
          <link
            rel="stylesheet"
            type="text/css"
            href="css/fonts-molla.min.css"
          />
          {/******  Google tag (gtag.js)  *******/}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-333577971"
          ></script>
          <script
            data-partytown-config
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'AW-333577971');`,
            }}
          />

          {/****** Event snippet for Purchase conversion page ******/}
          <script
            data-partytown-config
            dangerouslySetInnerHTML={{
              __html: ` gtag('event', 'conversion', {
                'send_to': 'AW-333577971/XUf4CMm9uIkYEPP9h58B',
                'transaction_id': ''
            });`,
            }}
          />

          {/* <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-1644415-3"
          ></script>
          <script
            data-partytown-config
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'UA-1644415-3');
            `,
            }}
          /> */}

          <script
            data-partytown-config
            dangerouslySetInnerHTML={{
              __html: `
            window.postpayAsyncInit = function()
            {postpay.init({
              merchantId: "id_40ac05065d574a72b8485a6d521626b8",
              sandbox: true,
              theme: "light",
              locale: "en",
            })}
            `,
            }}
          />
          <script async src="https://cdn.postpay.io/v1/js/postpay.js"></script>

          <script
            type="text/javascript"
            src="https://cdn1.stamped.io/files/widget.min.js"
          ></script>
          <script
            type="text/javascript"
            data-partytown-config
            dangerouslySetInnerHTML={{
              __html: `StampedFn.init({
              apiKey: 'pubkey-80v41xE947ABC418d1g8LH7ER871GP', 
              storeUrl: 'www.bafco.com' 
            });`,
            }}
          />
        </Head>
        <body>
          {/* <script
            data-partytown-config
            dangerouslySetInnerHTML={{
              __html: `
            window.postpayAsyncInit = function()
            {postpay.init({
              merchantId: "id_40ac05065d574a72b8485a6d521626b8",
              sandbox: true,
              theme: "light",
              locale: "en",
            })}
            `,
            }}
          /> */}

          {/* <noscript dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WK7BJT8"
           height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript> */}

          <Main />
          <script src="js/jquery.min.js"></script>
          <NextScript />
        </body>
      </Html>
    );
  }
}
