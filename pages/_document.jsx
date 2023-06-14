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
          <title>BAFCO | Office Furniture Dubai and Abu Dhabi since 1991</title>
          <meta
            name="description"
            content="BAFCO | Office Furniture in Dubai | Abu Dhabi | Sharjah | UAE — Leading the way in the Office Furniture industry since 1991. Dealer of KANO & Vantione."
            data-react-helmet="true"
          />
          <meta
            name="facebook-domain-verification"
            content="nb70ua69x3coo6ctouracnqbi3v980"
          />
          <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
          <link
            rel="stylesheet"
            type="text/css"
            href="css/fonts-molla.min.css"
          />

          <script
            data-partytown-config
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-WK7BJT8');`,
            }}
          />

          {/******  Google tag (gtag.js)  *******/}
          {/* <script
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
          /> */}

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
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WK7BJT8" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />

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
