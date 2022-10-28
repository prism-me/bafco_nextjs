import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function FabricGrid(props) {
  const { product, setIsOpen, setProductId, query } = props;

  return (
    <div className="product product-7 text-center w-100">
      <figure className="product-media">
        <LazyLoadImage
          alt="product"
          src={
            query && query[0] == "color"
              ? product?.featured_img
              : product?.value?.featured_img
          }
          threshold={500}
          effect="black and white"
          wrapperClassName="product-image"
          onClick={() => {
            setIsOpen(true);
            setProductId(
              query && query[0] == "color" ? product?.finishes_id : product?.id
            );
          }}
        />
      </figure>
      <div className="product-body">
        <h3 className="product-title">
          {query && query[0] == "color"
            ? product?.finishes?.name
            : product?.name}
        </h3>
      </div>
    </div>
  );
}

export default FabricGrid;
