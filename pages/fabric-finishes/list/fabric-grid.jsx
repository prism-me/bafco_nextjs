import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function FabricGrid(props) {
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
      </figure>
      <div className="product-body">
        <h3 className="product-title">{product?.name}</h3>
      </div>
    </div>
  );
}

export default FabricGrid;
