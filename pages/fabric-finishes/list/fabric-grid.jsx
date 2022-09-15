import React, { useState } from "react";
// import { useRouter } from "next/router";
// import { connect } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

// import { actions as wishlistAction } from "~/store/wishlist";
// import { actions as cartAction } from "~/store/cart";
// import { actions as compareAction } from "~/store/compare";
// import { actions as demoAction } from "~/store/demo";

function FabricGrid(props) {
  // const router = useRouter();
  const { product, setIsOpen, setProductId } = props;

  return (
    <div className="product product-7 text-center w-100">
      <figure className="product-media">
        <LazyLoadImage
          alt="product"
          src={product?.value?.featured_img}
          threshold={500}
          effect="black and white"
          wrapperClassName="product-image"
          onClick={() => {
            setIsOpen(true);
            setProductId(product?.id);
          }}
        />
        {/* {product?.featured_img ? (
          <LazyLoadImage
            alt="product"
            src={product?.featured_img}
            threshold={500}
            effect="black and white"
            wrapperClassName="product-image-hover"
          />
        ) : (
          ""
        )} */}
      </figure>

      <div className="product-body">
        <h3 className="product-title">{product?.name}</h3>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     wishlist: state.wishlist.data,
//     comparelist: state.comparelist.data,
//   };
// };

export default // connect(mapStateToProps, {
//   ...wishlistAction,
//   ...cartAction,
//   ...compareAction,
//   ...demoAction,
// })(
FabricGrid;
// );
