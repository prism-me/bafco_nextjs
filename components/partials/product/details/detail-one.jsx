import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
// import SlideToggle from 'react-slide-toggle';
import ALink from "~/components/features/alink";
import Qty from "~/components/features/qty";
import { actions as globalAction } from "~/store/global";
import { actions as wishlistAction } from "~/store/wishlist";
import { actions as cartAction } from "~/store/cart";
import { canAddToCart, isInWishlist } from "~/utils";
import Tooltip from "react-simple-tooltip";
import Helmet from "react-helmet";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(77,77,77,0.6)",
    zIndex: "9000",
  },
};
function DetailOne(props) {
  const router = useRouter();
  const ref = useRef(null);
  const { product, subCategory, wishlist } = props;
  const [qty, setQty] = useState(1);
  const [qty2, setQty2] = useState(1);
  const [variationGroup, setVariationGroup] = useState([]);
  const [variationTypeGroup, setVariationTypeGroup] = useState([]);
  const [authtoken, setAuthtoken] = useState("");
  const [selectedVariant, setSelectedVariant] = useState();
  const [variantCombGroup, setvariantCombGroup] = useState();
  const [variationValues, setVariationValues] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [variationPopupeOpen, setVariationPopupeOpen] = useState(false);
  let timer;

  // const numberFormat = value =>
  //     new Intl.NumberFormat("en-IN", {
  //         style: "currency",
  //         currency: "AED"
  //     }).format(value);

  // const numberFormat = (value) => {
  //     new Intl.NumberFormat('en-IN', {
  //         style: 'currency',
  //         currency: 'AED'
  //     }).format(value);
  // }
  //     props//

  useEffect(() => {
    setVariationTypeGroup(
      product?.dropDown?.reduce(
        (acc, curr) =>
          acc.find((v) => v?.variant?.name === curr?.variant?.name)
            ? acc
            : [...acc, curr],
        []
      )
    );

    // console.log("setVariationTypeGroup :: ", variationTypeGroup);

    setVariationGroup(
      product?.dropDown?.reduce(
        (acc, curr) =>
          acc.find((v) => v.name === curr.name) ? acc : [...acc, curr],
        []
      )
    );

    // console.log("setVariationGroup :: ", variationGroup);

    let currentProductVariation =
      product?.product_single_variation?.variation_value_details.map((item) => {
        let productVariation = {
          name: item.variation_values.name,
          variation_value_id: item.variation_values.id,
          type: item.variation_values.variant.name,
          product_variation_id: item.product_variation_id,
        };
        return productVariation;
      });

    // let newObj = {}
    // currentProductVariation?.forEach((item) => {
    //     newObj[item.type] = item.name
    // });
    // setSelectedValues(newObj)
    // console.log(newObj,"==== newObj ====");

    setSelectedVariant(currentProductVariation);

    // console.log("setSelectedVariant 10 :: ", currentProductVariation);

    let newvaria1 = product?.dropDown?.reduce(
      (acc, curr) =>
        acc.find((v) => v?.variant?.name === curr?.variant?.name)
          ? acc
          : [...acc, curr],
      []
    );

    let colorsNew1 = currentProductVariation?.find((v) => v?.type === "Color");

    // console.log("colorsNew1 :: ", colorsNew1);

    // console.log("variation product :: ", product?.product_all_varitaions);

    // let newobjecom = product?.product_all_varitaions?.filter(
    //   (v) => v?.product_details?.variation_value_details?.name == colorsNew1?.name
    // );
    // console.log(newobjecom, "newobjecom====== 87");

    let newvaria = product?.dropDown?.reduce(
      (acc, curr) =>
        acc.find((v) => v.name === curr.name) ? acc : [...acc, curr],
      []
    );

    // console.log("newvaria :: ", newvaria);
    let newarray = [];
    let colorObj = {};

    // let colorsNew = currentProductVariation?.find((v) => v.type === "Color")

    // let variationnew = newvaria.filter((item) => colorsNew.name == item.name )

    // console.log("variationnew :: ", variationnew)

    newvaria1?.forEach((item) => {
      let arr = newvaria?.filter(
        (v) => v?.variant?.name === item?.variant?.name
      );

      let newName = item?.variant?.name;
      let type = item?.type;
      let newlist = {
        arrs: arr,
        type: type,
        newName: newName,
      };

      if (newName == "Color") {
        colorObj = newlist;
      } else {
        newarray.push(newlist);
      }
    });

    if (colorObj.newName) {
      newarray.unshift(colorObj);
    }

    // console.log("newarray :: 83 ", newarray);

    // console.log("colorGroup :: ", colorGroup);

    setVariationValues(newarray);

    let comb = [];

    product?.dropDown.reduce((acc, item) => {
      let ifExist = comb.find(
        (f) => f.variation_id === item.product_variation_id
      );
      if (ifExist) {
        ifExist[item.variant.name] = item.name;
      } else {
        comb.push({
          [item.variant.name]: item.name,
          variation_id: item.product_variation_id,
        });
      }
      return item.product_variation_id;
    }, 0);
    setvariantCombGroup(comb);

    // console.log("setvariantCombGroup :: ", variantCombGroup);
  }, [product]);

  useEffect(() => {
    setAuthtoken(localStorage.getItem("authtoken"));

    // window.addEventListener('scroll', scrollHandler, { passive: true });

    // return () => { window.removeEventListener('scroll', scrollHandler); }
  }, []);

  function onWishlistClick(e) {
    e.preventDefault();
    if (!isInWishlist(props.wishlist, product)) {
      if (authtoken === "" || authtoken === null || authtoken === undefined) {
        props.showPopup(true);
      } else {
        let data = {
          product_id: product?.single_product_details?.product?.id,
          product_variation_id:
            product?.product_single_variation?.variation_value_details[0]
              ?.product_variation_id,
        };
        props.addToWishlist(data);
      }
    } else {
      router.push("/wishlist");
    }
  }

  function onChangeQty(current) {
    setQty(current);
  }

  function onCartClick(e) {
    e.preventDefault();

    let data = {
      product_id: product?.single_product_details?.product?.id,
      product_variation_id:
        product?.product_single_variation?.product_variation_details?.id,
    };

    props.addToCart(data);
  }

  // function onCartClick(e, index = 0) {
  //     e.preventDefault();
  //     if (e.currentTarget.classList.contains('btn-disabled')) return;

  //     let newProduct = { ...product };
  //     if (product?.variations?.length > 0) {
  //         newProduct = {
  //             ...product,
  //             name: product.name + ' - ' + selectedColorVariant.colorName + ', ' + selectedColorVariant.size,
  //             price: selectedColorVariant.price
  //         };
  //     }
  //     props.addToCart(
  //         newProduct,
  //         index == 0 ? qty : qty2
  //     );
  // }

  function handelSelectVariantChange(e, item) {
    e.preventDefault();

    // console.log(item, e.target.value);
    // if (e.target.value == "") {

    //  } else
    if (!e.target.value) {
      const newState = selectedVariant.map((obj) => {
        if (obj?.type === item?.variant?.name) {
          return {
            name: item?.name,
            type: item?.variant?.name,
            variation_value_id: item?.id,
            product_variation_id: item?.product_variation_id,
          };
        }
        return obj;
      });

      setSelectedVariant(newState);

      let comb = [];

      newState.map((acc) => {
        comb.push({ [acc.type]: acc.name });
        return acc;
      });

      let resultNewComb = comb.reduce(function (result, item) {
        var key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
      }, {});

      let getVariationId = variantCombGroup.filter(function (entry) {
        return Object.keys(resultNewComb).every(function (key) {
          return entry[key] === resultNewComb[key];
        });
      });

      if (getVariationId.length !== 0) {
        props.handelselectedVariation(getVariationId[0].variation_id);
      } else {
        setVariationPopupeOpen(true);
      }
    } else {
      const found = item?.find((v) => v.id == e.target.value);

      if (selectedVariant.find((v) => v.type == found.variant.name)) {
        // console.log("selected");
      } else {
        selectedVariant.push({
          name: found.name,
          variation_value_id: found.variation_id,
          type: found.variant.name,
          product_variation_id: found.product_variation_id,
        });
      }

      // console.log("selected :: ", selectedVariant);

      const newState = selectedVariant.map((obj) => {
        if (obj.type === found.variant.name) {
          return {
            name: found.name,
            type: found.variant.name,
            variation_value_id: found.id,
            product_variation_id: found.product_variation_id,
          };
        }
        return obj;
      });
      setSelectedVariant(newState);

      let comb = [];

      newState.map((acc) => {
        comb.push({ [acc.type]: acc.name });
        return acc;
      });

      let resultNewComb = comb.reduce(function (result, item) {
        var key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
      }, {});

      let getVariationId = variantCombGroup.filter(function (entry) {
        return Object.keys(resultNewComb).every(function (key) {
          return entry[key] === resultNewComb[key];
        });
      });

      if (getVariationId.length !== 0) {
        props.handelselectedVariation(getVariationId[0].variation_id);
      } else {
        setVariationPopupeOpen(true);
      }
    }
  }

  const closeVariationPopupe = () => {
    document
      .getElementById("success-modal")
      .classList.remove("ReactModal__Content--after-open");

    if (document.querySelector(".ReactModal__Overlay")) {
      document.querySelector(".ReactModal__Overlay").style.opaarea = "0";
    }

    timer = setTimeout(() => {
      setVariationPopupeOpen(false);
    }, 350);
  };

  if (!product) {
    return <div></div>;
  }

  return (
    <>
      <div className="product-details" ref={ref}>
        <Helmet>
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
        </Helmet>
        <h1 className="product-title">
          {product?.single_product_details?.product?.name}
        </h1>

        <div className="ratings-container">
          <div className="ratings">
            <div
              className="ratings-val"
              style={{ width: 3.4 * 20 + "%" }}
            ></div>
            <span className="tooltip-text">{3.4}</span>
          </div>
          <span className="ratings-text">( {3.4} Reviews )</span>
        </div>

        {
          // product?.product_single_variation?.product_variation_details
          //   ?.in_stock === 0 ? (
          //   <div className="product-price">
          //     <span className="out-price">
          //       {product?.product_single_variation?.product_variation_details
          //         ?.limit >= qty ? (
          //         <>
          //           <span>
          //             AED{" "}
          //             {product?.product_single_variation?.product_variation_details?.upper_price
          //               ?.toString()
          //               .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          //           </span>
          //           <div
          //             className="postpay-widget mb-1"
          //             data-type="product"
          //             data-amount={
          //               product?.product_single_variation
          //                 ?.product_variation_details?.upper_price
          //             }
          //             data-currency="AED"
          //             data-num-instalments="3"
          //             data-locale="en"
          //           ></div>
          //         </>
          //       ) : (
          //         <>
          //           <span>
          //             AED{" "}
          //             {product?.product_single_variation?.product_variation_details?.lower_price
          //               ?.toString()
          //               .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          //           </span>
          //           <div
          //             className="postpay-widget mb-1"
          //             data-type="product"
          //             data-amount={
          //               product?.product_single_variation
          //                 ?.product_variation_details?.lower_price
          //             }
          //             data-currency="AED"
          //             data-num-instalments="3"
          //             data-locale="en"
          //           ></div>
          //         </>
          //       )}
          //     </span>
          //   </div>
          // ) :
          product?.product_single_variation?.product_variation_details?.limit >=
          qty ? (
            <>
              <div className="product-price">
                AED{" "}{product?.product_single_variation?.product_variation_details?.upper_price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
              <div
                className="postpay-widget mb-1"
                data-type="product"
                data-amount={
                  product?.product_single_variation?.product_variation_details
                    ?.upper_price * 100
                }
                data-currency="AED"
                data-num-instalments="3"
                data-locale="en"
              ></div>
            </>
          ) : (
            <>
              <div className="product-price">
                AED{" "}
                {product?.product_single_variation?.product_variation_details?.lower_price
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
              <div
                className="postpay-widget mb-1"
                data-type="product"
                data-amount={
                  product?.product_single_variation?.product_variation_details
                    ?.lower_price * 100
                }
                data-currency="AED"
                data-num-instalments="3"
                data-locale="en"
              ></div>
            </>
          )
        }

        <div
          className="product-content"
          dangerouslySetInnerHTML={{
            __html:
              product?.product_single_variation?.product_variation_details
                ?.description,
          }}
        />

        {/* <div className="row">
        {variationTypeGroup !== null &&
          variationTypeGroup?.map((item, index) => (
            <div className="col-md-6" key={index}>
              <div className="details-filter-row details-row-size">
                <label htmlFor={`${item?.variant?.name}`}>
                  {item?.variant?.name}:{" "}
                </label>
                {item?.type === "1" ? (
                  <div className="select-custom">
                    <select
                      name={`${item?.variant?.name}`}
                      className="form-control"
                      value={selectedVariant[index]?.variation_value_id}
                      onChange={(e) => handelSelectVariantChange(e, item)}
                    >
                      <option value="">Select a {item?.variant?.name}</option>
                      {variationGroup &&
                        variationGroup.map(
                          (item2, index2) =>
                            item?.variant?.name === item2?.variant?.name && (
                              <option value={item2?.id} key={index2}>
                                {item2?.type_value}
                              </option>
                            )
                        )}
                    </select>
                  </div>
                ) : (
                  <div
                    className="product-nav product-nav-dots"
                    style={{ display: "block" }}
                  >
                    {variationGroup &&
                      variantCombGroup.map((variantcom) => (
                        <>
                          {variantcom[selectedVariant[index - 1]?.type] ===
                            selectedVariant[index - 1]?.name &&
                            variationGroup.map(
                              (item2, index2) =>
                                variantcom[item2?.variant?.name] ===
                                item2.name &&
                                item?.variant?.name ===
                                item2?.variant?.name && (
                                  <span
                                    className={`${(item2?.id ==
                                      selectedVariant[index]?.variation_value_id
                                      ? "active "
                                      : "") +
                                      (item2?.disabled ? "disabled" : "")
                                      }`}
                                    style={{
                                      backgroundImage: `url(${item2?.type_value})`,
                                    }}
                                    key={index2}
                                    onClick={(e) =>
                                      handelSelectVariantChange(e, item2)
                                    }
                                  ></span>
                                )
                            )}
                        </>
                      ))}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div> */}
        <div className="row">
          {/* {console.log("variationValues :: ", variationValues)}
          {console.log("selectedVariant :: ", selectedVariant)} */}
          {variationValues !== null &&
            variationValues?.map((item, index) => (
              <div className="col-md-6" key={index}>
                <div className="details-filter-row details-row-size">
                  <label htmlFor={`${item?.newName}`}>{item?.newName}: </label>
                  {item?.type === "1" || item?.type === "4" ? (
                    <div className="select-custom">
                      {/* {console.log("selectedVariant :: ", (item?.arrs?.find(v => v?.name === (selectedVariant?.find(x => x.type === item?.newName)?.['name'])))?.['name'])} */}
                      <select
                        name={`${item?.newName}`}
                        className="form-control"
                        value={
                          item?.arrs?.find(
                            (v) =>
                              v?.name ===
                              selectedVariant?.find(
                                (x) => x.type === item?.newName
                              )?.["name"]
                          )?.["id"] === ""
                            ? ""
                            : item?.arrs?.find(
                                (v) =>
                                  v?.name ===
                                  selectedVariant?.find(
                                    (x) => x.type === item?.newName
                                  )?.["name"]
                              )?.["id"]
                        }
                        onChange={(e) =>
                          handelSelectVariantChange(e, item?.arrs)
                        }
                      >
                        <option value="">Select a {item?.newName}</option>
                        {item?.arrs?.map((item2, index2) => (
                          <option value={item2?.id} key={index2}>
                            {item2?.type_value}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div
                      className="product-nav product-nav-dots"
                      style={{ display: "block" }}
                    >
                      {item?.arrs?.map((item2, index2) => (
                        <Tooltip
                          className="stocking_massage"
                          content={item2?.name}
                        >
                          <span
                            className={`${
                              (item2?.id ===
                              selectedVariant?.find(
                                (v) => v.variation_value_id === item2.id
                              )?.["variation_value_id"]
                                ? "active "
                                : "") + (item2?.disabled ? "disabled" : "")
                            }`}
                            style={{
                              backgroundImage: `url(${item2?.type_value})`,
                            }}
                            key={index2}
                            onClick={(e) => handelSelectVariantChange(e, item2)}
                          ></span>
                        </Tooltip>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* <div className="product product-7 text-center w-100">
                <figure className="product-media">
                    <span className="product-label label-out">Stocking</span>
                </figure>
            </div> */}

        {/* {product?.product_single_variation?.product_variation_details
        ?.in_stock !== 0 ? ( */}
        <div className="details-filter-row details-row-size">
          <label htmlFor="qty">Quantity: </label>
          <Qty changeQty={onChangeQty} max={100} value={qty}></Qty>
          {/* <Qty changeQty={onChangeQty} max={product?.product_single_variation?.product_variation_details?.in_stock} value={qty}></Qty> */}
        </div>
        {/* ) : (
        <div className="details-filter-row details-row-size">
          <span className="product-label-out">Stocking</span>
        </div>
      )} */}

        {
          product?.product_single_variation?.product_variation_details
            ?.in_stock === 0 && (
            // <Tooltip className="stocking_massage" content="Available to ship in 6-8 weeks.">
            <p style={{ fontSize: "16px" }}>
              Available to ship in{" "}
              <span style={{ fontWeight: "bold" }}>6-8 weeks</span>.
            </p>
          )
          // </Tooltip>
        }

        <div className="product-details-action">
          {/* <a
          href="#"
          className={`btn-product btn-cart 
          ${product?.product_single_variation?.product_variation_details?.in_stock !== 1 ? "btn-disabled" : ""}
          `}
          onClick={(e) => onCartClick(e, 0)}
        >
          <span>add to cart</span>
        </a> */}

          <a
            href="#"
            className={`btn-product btn-cart`}
            onClick={(e) => onCartClick(e, 0)}
          >
            <span>add to cart</span>
          </a>

          <div className="details-action-wrapper">
            {isInWishlist(wishlist, product) ? (
              <ALink
                href="/wishlist"
                className="btn-product btn-wishlist added-to-wishlist"
              >
                <span>Go to Wishlist</span>
              </ALink>
            ) : (
              <a
                href="#"
                className="btn-product btn-wishlist"
                onClick={onWishlistClick}
              >
                <span>Save to Wishlist</span>
              </a>
            )}
          </div>
        </div>

        <div className="product-details-footer">
          <div className="product-cat text-truncate">
            <span>Brand:</span>
            <span>{product?.single_product_details?.product?.brand}</span>
          </div>

          <div className="product-cat text-truncate">
            <span>Type : </span>
            <ALink
              href={`/collections/${router?.query?.category}/${router?.query?.sub_category}`}
            >
              <span style={{ textTransform: "capitalize" }}>{subCategory}</span>
            </ALink>
          </div>
        </div>
        <div className="product-details-adv">
          <ul>
            {product?.single_product_details?.product?.promotional_images.map(
              (item, index) => (
                <li key={index}>
                  {/* <Tooltip className="stocking_massage" content={item?.url?.split('.')[0]}> */}
                  <img src={item.avatar} />
                  {/* </Tooltip> */}
                </li>
              )
            )}
            {product?.product_single_variation?.product_variation_details
              ?.lead_img && (
              <li>
                <img
                  src={
                    product?.product_single_variation?.product_variation_details
                      ?.lead_img
                  }
                />
              </li>
            )}
          </ul>
        </div>
        <div className="sticky-bar d-none">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <figure className="product-media">
                  <ALink
                    href={`/product/default/${product?.single_product_details?.product?.route}`}
                  >
                    <img
                      src={
                        product?.product_single_variation
                          ?.product_variation_details?.images[0]?.avatar
                      }
                      alt="product"
                    />
                  </ALink>
                </figure>
                <h3 className="product-title">
                  <ALink
                    href={`/product/default/${product?.single_product_details?.product?.route}`}
                  >
                    {product?.single_product_details?.product?.name}
                  </ALink>
                </h3>
              </div>
              {/* <div className="col-6 justify-content-end">
                            {
                                (selectedColorVariant.color && selectedColorVariant.size != "") ?
                                    <div className="product-price">
                                        ${selectedColorVariant.price ? selectedColorVariant.price : 0}
                                    </div>
                                    :
                                    product.stock == 0 ?
                                        <div className="product-price">
                                            <span className="out-price">AED {product.price}</span>
                                        </div>
                                        :
                                        product?.product_single_variation?.product_variation_details.lower_price == product?.product_single_variation?.product_variation_details.upper_price ?
                                            <div className="product-price">AED {product?.product_single_variation?.product_variation_details.lower_price}</div>
                                            :
                                            product?.variations?.length == 0 ?
                                                <div className="product-price">
                                                    <span className="new-price">AED {product?.product_single_variation?.product_variation_details.lower_price}</span>
                                                    <span className="old-price">AED {product?.product_single_variation?.product_variation_details.upper_price}</span>
                                                </div>
                                                :
                                                <div className="product-price">AED {product?.product_single_variation?.product_variation_details.lower_price} &ndash; AED {product?.product_single_variation?.product_variation_details.upper_price}</div>
                            }
                            <Qty changeQty={onChangeQty2} max={product.stock} value={qty2}></Qty>
                            <div className="product-details-action">
                                <a
                                    href="#"
                                    className={`btn-product btn-cart ${(!canAddToCart(props.cartlist, product, qty) || (product?.variations?.length > 0 && !showVariationPrice)) ? 'btn-disabled' : ''}`}
                                    onClick={e => onCartClick(e, 1)}
                                >
                                    <span>add to cart</span>
                                </a>
                                {
                                    isInWishlist(props.wishlist, product) ?
                                        <ALink href="/wishlist" className="btn-product btn-wishlist added-to-wishlist"><span>Go to Wishlist</span></ALink>
                                        :
                                        <a href="#" className="btn-product btn-wishlist" onClick={onWishlistClick}><span>Save to Wishlist</span></a>

                                }
                            </div >
                        </div > */}
            </div>
          </div>
        </div>
      </div>
      {variationPopupeOpen && (
        <Modal
          isOpen={variationPopupeOpen}
          style={customStyles}
          contentLabel="order Modal"
          className="modal-dialog"
          overlayClassName="d-flex align-items-center justify-content-center"
          id="success-modal"
          onRequestClose={closeVariationPopupe}
          closeTimeoutMS={10}
        >
          <div className="modal-content">
            <div className="orderdetailModelheader modal-header mb-2">
              {/* <div className="modal-title h4" id="contained-modal-title-vcenter">Cart List</div> */}
              <button
                type="button"
                className="close"
                onClick={closeVariationPopupe}
              >
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="orderdetailbody text-center mb-6">
                <img
                  className="mb-3"
                  src="images/icons/symbol-christian-cross.png"
                  width="100px"
                  style={{ margin: "0 auto" }}
                  alt="Success"
                />
                {/* <h2>Please try again later!</h2> */}
                <h6>This combination is not available.</h6>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cartlist: state.cartlist.data,
    wishlist: state.wishlist.data,
  };
};

export default connect(mapStateToProps, {
  ...wishlistAction,
  ...cartAction,
  ...globalAction,
})(DetailOne);
