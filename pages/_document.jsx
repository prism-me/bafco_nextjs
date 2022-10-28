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

          {/* <!-- Google Tag Manager --> //*/}
          <script
            data-partytown-config
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5P3QZ4C');
            `,
            }}
          />

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

          <script type="text/javascript" src="https://cdn1.stamped.io/files/widget.min.js"></script>
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
          <Main />
          <script src="js/jquery.min.js"></script>
          <NextScript />
        </body>
      </Html>
    );
  }
}
