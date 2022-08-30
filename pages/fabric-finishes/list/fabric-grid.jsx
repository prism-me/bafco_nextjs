import React, { useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { actions as wishlistAction } from "~/store/wishlist";
import { actions as cartAction } from "~/store/cart";
import { actions as compareAction } from "~/store/compare";
import { actions as demoAction } from "~/store/demo";
import FabricModal from "~/components/features/modals/fabric-modal";

function FabricGrid(props) {
  const router = useRouter();
  const { product } = props;

  const [isOpen, setIsOpen] = useState(false);

  // function onQuickView(e) {
  //   e.preventDefault();
  //   props?.showFabric(product.slug);
  // }
  return (
    <div className="product product-7 text-center w-100">
      <figure className="product-media">
        <LazyLoadImage
          alt="product"
          src={"images/fabric/fabric.png"}
          threshold={500}
          effect="black and white"
          wrapperClassName="product-image"
          onClick={() => {
            setIsOpen(true);
            console.log("opennnn");
          }}
        />
        {product.sm_pictures.length >= 2 ? (
          <LazyLoadImage
            alt="product"
            src={process.env.NEXT_PUBLIC_ASSET_URI + product.sm_pictures[1].url}
            threshold={500}
            effect="black and white"
            wrapperClassName="product-image-hover"
          />
        ) : (
          ""
        )}
      </figure>

      <div className="product-body">
        <h3 className="product-title">{product.name}</h3>
      </div>
      <FabricModal show={isOpen} onHide={() => setIsOpen(false)} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    wishlist: state.wishlist.data,
    comparelist: state.comparelist.data,
  };
};

export default connect(mapStateToProps, {
  ...wishlistAction,
  ...cartAction,
  ...compareAction,
  ...demoAction,
})(FabricGrid);
