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
          <script
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
          />

          {/* <!-- Google Tag Manager --> */}
          {/* <script
            data-partytown-config
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WK7BJT8');
            `,
            }}
          /> */}

          {/* <link
            rel="stylesheet"
            type="text/css"
            href="vendor/line-awesome/css/line-awesome.min.css"
          /> */}
          {/* <script
            type="text/javascript"
            src="https://cdn1.stamped.io/files/widget.min.js"
          ></script> */}
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

          <script
            type="text/javascript"
            src="https://bafc-cmpzourl.maillist-manage.com/js/optin.min.js"
            onLoad="setupSF('sf3z8febd0b22be43b8e6e9b7815f99efab7b93169edfdb9cd68cfe97046d57a569d','ZCFORMVIEW',false,'light',false,'0')"
          ></script>
          <script
            data-partytown-config
            dangerouslySetInnerHTML={{
              __html: `
              function
              runOnFormSubmit_sf3z8febd0b22be43b8e6e9b7815f99efab7b93169edfdb9cd68cfe97046d57a569d(
              th )
            `,
            }}
          />
        </Head>
        <body>
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
