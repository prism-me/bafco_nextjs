import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <base href={process.env.PUBLIC_URL} />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Jost:400,500,600,700,800,900" />
                    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
                    <link rel="stylesheet" type="text/css" href="css/fonts-molla.min.css" />
                    <link rel="stylesheet" type="text/css" href="vendor/line-awesome/css/line-awesome.min.css" />
                    <script type="text/javascript" src="https://cdn1.stamped.io/files/widget.min.js"></script>
                    <script type="text/javascript">
                        {/* <![CDATA[
                        StampedFn.init({apiKey: 'pubkey-80v41xE947ABC418d1g8LH7ER871GP', storeUrl: 'www.bafco.com' }); 
                     ]]> */}
                    </script>
                </Head>
                <body>
                    <Main />
                    <script src="js/jquery.min.js"></script>
                    <NextScript />
                </body>
            </Html>
        )
    }
}