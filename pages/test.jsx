import React from "react";
import Helmet from "react-helmet";

const Test = () => {
  return (
    <>
      <Helmet>
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
      </Helmet>
      <div className="new" style={{ padding: "20px" }}>
        <div
          id="stamped-main-widget"
          data-product-id="429"
          data-name="Yoto Midback in White"
          data-url="https://bafco-next.herokuapp.com/collections/chairs/tasks-&-ergonomic-chairs/yoto-midback-in-white/"
          data-image-url="https://bafco.b-cdn.net/images/yotomb-166479327465.jpg"
          data-description="This is the Yoto Task Chair. It's a beautiful, ergonomic chair that can be customized to fit your needs and style. The frame is made of black or white PP"
          data-product-sku="2"
        ></div>
      </div>
    </>
  );
};
export default Test;
