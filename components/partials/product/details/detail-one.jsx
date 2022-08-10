import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import SlideToggle from 'react-slide-toggle';

import ALink from '~/components/features/alink';
import Qty from '~/components/features/qty';

import { actions as wishlistAction } from '~/store/wishlist';
import { actions as cartAction } from '~/store/cart';

import { canAddToCart, isInWishlist } from '~/utils';

function DetailOne(props) {
    const router = useRouter();
    const ref = useRef(null);
    const { product, subCategory } = props;
    const [qty, setQty] = useState(1);
    const [qty2, setQty2] = useState(1);
    const [colorArray, setColorArray] = useState([]);
    const [sizeArray, setSizeArray] = useState([]);
    const [materialArray, setMaterialArray] = useState([]);
    const [variationGroup, setVariationGroup] = useState([]);
    const [selectedColorVariant, setselectedColorVariant] = useState({ color: null, colorName: null, colorId: null, variationId: null, fabricImage: "" });
    const [selectedMaterialVariant, setselectedMaterialVariant] = useState({ fabric: null, fabricName: null, fabricId: null, variationId: null, fabricImage: "" });
    const [showClear, setShowClear] = useState(false);
    const [showVariationPrice, setShowVariationPrice] = useState(false);
    const [maxPrice, setMaxPrice] = useState(product?.product_single_variation?.product_variation_details?.upper_price);
    const [minPrice, setMinPrice] = useState(product?.product_single_variation?.product_variation_details?.lower_price);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler, { passive: true });

        return () => { window.removeEventListener('scroll', scrollHandler); }

    }, [])

    useEffect(() => {

        let newProductColor = [];
        // newProductColor.push

        product?.product_all_varitaions?.map((acc) => {
            acc?.product_details?.variation_details?.name === "color" &&
                newProductColor.push({
                    color: acc?.product_details?.variation_details?.name,
                    colorName: acc?.product_details?.variation_value_details?.name,
                    colorId: acc?.product_details?.variation_value_details?.id,
                    variationId: acc?.product_variation_id,
                    fabricImage: acc?.product_details?.variation_value_details?.type_value,
                });
        })

        // console.log("newProductColor :: ", newProductColor)

        setColorArray(newProductColor);

        let newProductSize = [];

        product?.product_all_varitaions?.map((acc) => {
            acc?.product_details?.variation_details?.name === "size" &&
                newProductSize.push({
                    color: acc?.product_details?.variation_details?.name,
                    colorName: acc?.product_details?.variation_value_details?.name,
                    colorId: acc?.product_details?.variation_value_details?.id,
                    variationId: acc?.product_variation_id,
                    fabricImage: acc?.product_details?.variation_value_details?.type_value,
                });
        })

        // console.log("newProductSize :: ", newProductSize)

        setSizeArray(newProductSize);

        let newProductMaterial = [];

        product?.product_all_varitaions?.map((acc) => {
            acc?.product_details?.variation_details?.name === "fabric" &&
                newProductMaterial.push({
                    color: acc?.product_details?.variation_details?.name,
                    colorName: acc?.product_details?.variation_value_details?.name,
                    colorId: acc?.product_details?.variation_value_details?.id,
                    variationId: acc?.product_variation_id,
                    fabricImage: acc?.product_details?.variation_value_details?.type_value,
                });
        })

        // console.log("newProductMaterial :: ", newProductMaterial)

        setMaterialArray(newProductMaterial);

        //     let min = 99999;
        //     let max = 0;

        //     setVariationGroup(product?.variations.reduce((acc, cur) => {
        //         cur.variationItems.map(item => {
        //             acc.push({
        //                 color: cur.color,
        //                 colorName: cur.color_name,
        //                 size: item.name,
        //                 price: cur.price
        //             });
        //         });
        //         if (min > cur.price) min = cur.lower_price;
        //         if (max < cur.price) max = cur.upper_price;
        //         return acc;
        //     }, []));

        //     setMinPrice(min);
        //     setMaxPrice(max);
    }, [product])

    useEffect(() => {
        setselectedColorVariant({ color: null, colorName: null, colorId: null, variationId: null, fabricImage: "" });
        setselectedMaterialVariant({ fabric: null, fabricName: null, fabricId: null, variationId: null, fabricImage: "" });
        setQty(1);
        setQty2(1);
    }, [router.query.slug])

    // useEffect(() => {
    //     refreshSelectableGroup();
    // }, [variationGroup, selectedColorVariant])

    useEffect(() => {
        scrollHandler();
    }, [router.pathname])

    // useEffect(() => {
    //     setShowClear((selectedColorVariant.color || selectedColorVariant.size != "") ? true : false);
    //     setShowVariationPrice((selectedColorVariant.color && selectedColorVariant.size != "") ? true : false);
    //     let toggle = ref.current.querySelector('.variation-toggle');

    //     if (toggle) {
    //         if ((selectedColorVariant.color && selectedColorVariant.size != "") && toggle.classList.contains('collapsed')) {
    //             toggle.click();
    //         }

    //         if ((!(selectedColorVariant.color && selectedColorVariant.size != "")) && !toggle.classList.contains('collapsed')) {
    //             toggle.click();
    //         }
    //     }
    // }, [selectedColorVariant])

    function scrollHandler() {
        // if (router.pathname.includes('/product/default')) {
        //     let stickyBar = ref.current.querySelector('.sticky-bar');
        //     if (stickyBar.classList.contains('d-none') && ref.current.getBoundingClientRect().bottom < 0) {
        //         stickyBar.classList.remove('d-none');
        //         return;
        //     }
        //     if (!stickyBar.classList.contains('d-none') && ref.current.getBoundingClientRect().bottom > 0) {
        //         stickyBar.classList.add('d-none');
        //     }
        // }
    }

    function onWishlistClick(e) {
        e.preventDefault();
        if (!isInWishlist(props.wishlist, product)) {
            props.addToWishlist(product);
        } else {
            router.push('/pages/wishlist');
        }
    }

    // function refreshSelectableGroup() {
    //     let tempArray = [...variationGroup];
    //     if (selectedColorVariant.color) {
    //         tempArray = variationGroup.reduce((acc, cur) => {
    //             if (selectedColorVariant.color !== cur.color) {
    //                 return acc;
    //             }
    //             return [...acc, cur];
    //         }, []);
    //     }

    //     setSizeArray(tempArray.reduce((acc, cur) => {
    //         if (acc.findIndex(item => item.size == cur.size) !== -1)
    //             return acc;
    //         return [...acc, cur];
    //     }, []));

    //     tempArray = [...variationGroup];
    //     if (selectedColorVariant.size) {
    //         tempArray = variationGroup.reduce((acc, cur) => {
    //             if (selectedColorVariant.size !== cur.size) {
    //                 return acc;
    //             }
    //             return [...acc, cur];
    //         }, []);
    //     }

    //     setColorArray(product?.variations?.reduce((acc, cur) => {
    //         if (
    //             tempArray.findIndex(item => item.color == cur.color) == -1
    //         ) {
    //             return [
    //                 ...acc,
    //                 {
    //                     color: cur.color,
    //                     colorName: cur.color_name,
    //                     price: cur.price,
    //                     disabled: true
    //                 }
    //             ];
    //         }
    //         return [
    //             ...acc,
    //             {
    //                 color: cur.color,
    //                 colorName: cur.color_name,
    //                 price: cur.price,
    //                 disabled: false
    //             }
    //         ];
    //     }, []));
    // }

    function selectColor(e, item) {
        console.log("selectColor :: ", item)
        e.preventDefault()
        if (item.color === selectedColorVariant.color) {
            setselectedColorVariant({
                ...selectedColorVariant,
                color: item.color,
                colorId: item.colorId,
                colorName: item.colorName,
                variationId: item.variationId,
                fabricImage: item.fabricImage
            });
        } else if (item.fabric === selectedMaterialVariant.fabric) {
            setselectedMaterialVariant({
                ...selectedMaterialVariant,
                fabric: item.fabric,
                fabricName: item.fabricName,
                fabricId: item.fabricId,
                variationId: item.variationId,
                fabricImage: item.fabricImage
            });
        }
        else {
            setselectedColorVariant({
                ...selectedColorVariant,
                color: item.color,
                colorId: item.colorId,
                colorName: item.colorName,
                variationId: item.variationId,
                fabricImage: item.fabricImage
            });
        }
    }

    function selectSize(e) {
        if (e.target.value === "") {
            setselectedColorVariant({ ...selectedColorVariant, size: "" });
        } else {
            setselectedColorVariant({ ...selectedColorVariant, size: e.target.value });
        }
    }

    function onChangeQty(current) {
        setQty(current);
    }

    function onChangeQty2(current) {
        setQty2(current);
    }

    function clearSelection(e) {
        e.preventDefault();
        setselectedMaterialVariant(({
            ...selectedMaterialVariant,
            fabric: null,
            fabricName: null,
            fabricId: null,
            variationId: null,
            fabricImage: ""
        }))
        setselectedColorVariant(({
            ...selectedColorVariant,
            color: null,
            colorName: null,
            size: ""
        }));
        // refreshSelectableGroup();
    }

    function onCartClick(e, index = 0) {
        e.preventDefault();
        if (e.currentTarget.classList.contains('btn-disabled')) return;

        let newProduct = { ...product };
        if (product?.variations?.length > 0) {
            newProduct = {
                ...product,
                name: product.name + ' - ' + selectedColorVariant.colorName + ', ' + selectedColorVariant.size,
                price: selectedColorVariant.price
            };
        }
        props.addToCart(
            newProduct,
            index == 0 ? qty : qty2
        );
    }

    if (!product) {
        return <div></div>;
    }

    return (
        <div className="product-details" ref={ref}>
            <h1 className="product-title">{product?.single_product_details?.product?.name}</h1>

            <div className="ratings-container">
                <div className="ratings">
                    <div className="ratings-val" style={{ width: 3.4 * 20 + '%' }}></div>
                    <span className="tooltip-text">{3.4}</span>
                </div>
                <span className="ratings-text">( {3.4} Reviews )</span>
            </div>

            {product?.product_single_variation?.product_variation_details?.in_stock === 0 ?
                <div className="product-price">
                    <span className="out-price">
                        {minPrice === maxPrice ?
                            <span>AED{minPrice}</span>
                            :
                            <span>AED{minPrice}&ndash;AED{maxPrice}</span>
                        }
                    </span>
                </div>
                :
                minPrice === maxPrice ?
                    <div className="product-price">AED{minPrice}</div>
                    :
                    <div className="product-price">
                        <span className="new-price">AED{minPrice}</span>
                        <span className="old-price">AED{maxPrice}</span>
                    </div>
            }

            <div
                className="product-content"
                dangerouslySetInnerHTML={{ __html: product?.single_product_details?.product?.short_description }}
            />

            <div className="details-filter-row details-row-size">
                <label htmlFor="size">Upholstery: </label>
                <div className="select-custom">
                    <select
                        name="size"
                        className="form-control"
                        value={selectedColorVariant.size}
                        onChange={selectSize}
                    >
                        <option value="">Select a Upholstery</option>
                        {
                            sizeArray.map((item, index) => (
                                <option
                                    value={item.sizeName}
                                    key={index}
                                >{item.sizeName}</option>
                            ))
                        }
                    </select>
                </div>

                {showClear ? <a href="#" onClick={clearSelection}>clear</a> : ""}
            </div >
            {/* <div className="details-filter-row details-row-size">
                <label htmlFor="size">Materials :</label>
                <div className="select-custom">
                    <select
                        name="size"
                        className="form-control"
                        value={selectedColorVariant.size}
                        onChange={selectSize}
                    >
                        <option value="">Select a Materials</option>
                        {
                            materialArray.map((item, index) => (
                                <option
                                    value={item.fabricName}
                                    key={index}
                                >{item.fabricName}</option>
                            ))
                        }
                    </select>
                </div>

                {
                    showClear ?
                        <a href="#" onClick={clearSelection}>clear</a>
                        : ""
                }
            </div > */}
            {/* <SlideToggle collapsed={true}>
                {({ onToggle, setCollapsibleElement, toggleState }) => (
                    <div>
                        <button className={`d-none variation-toggle ${toggleState.toLowerCase()}`} onClick={onToggle}></button>
                        <div ref={setCollapsibleElement} style={{ overflow: 'hidden' }}>
                            <div className="product-price">
                                AED{selectedColorVariant.price ? selectedColorVariant.price : 0}
                            </div>
                        </div>
                    </div>
                )}
            </SlideToggle> */}
            <div className="row">
                <div className="col-md-6">
                    <div className="details-filter-row details-row-size">
                        <label>Color: </label>

                        <div className="product-nav product-nav-dots">
                            {colorArray.map((item, index) => (
                                <a
                                    href="#"
                                    className={`${(item.colorName === selectedColorVariant.colorName ? 'active ' : '') + (item?.disabled ? 'disabled' : '')}`}
                                    style={{ backgroundColor: item.colorName }}
                                    key={index}
                                    onClick={e => selectColor(e, item)}
                                ></a>
                            ))
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="details-filter-row details-row-size">
                        <label>Materials: </label>

                        <div className="product-nav product-nav-dots">
                            {materialArray.map((item, index) => (
                                <a
                                    href="#"
                                    className={`${(item.colorName == selectedColorVariant.colorName ? 'active ' : '') + (item?.disabled ? 'disabled' : '')}`}
                                    style={{ backgroundImage: `url(${item.fabricImage})` }}
                                    key={index}
                                    onClick={e => selectColor(e, item)}
                                ></a>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>



            {/* <div className="product product-7 text-center w-100">
                <figure className="product-media">
                    <span className="product-label label-out">Out of Stock</span>
                </figure>
            </div> */}

            {product?.product_single_variation?.product_variation_details?.in_stock !== 0 ?

                <div className="details-filter-row details-row-size">
                    <label htmlFor="qty">Quantity: </label>
                    <Qty changeQty={onChangeQty} max={5} value={qty}></Qty>
                    {/* <Qty changeQty={onChangeQty} max={product?.product_single_variation?.product_variation_details?.in_stock} value={qty}></Qty> */}
                </div >
                :
                <div className="details-filter-row details-row-size">
                    <span className="product-label-out">Out of Stock</span>
                </div >
            }

            <div className="product-details-action">
                <a
                    href="#"
                    className={`btn-product btn-cart ${product?.product_single_variation?.product_variation_details?.in_stock !== 1 ? 'btn-disabled' : ''}`}
                    onClick={e => onCartClick(e, 0)}
                >
                    <span>add to cart</span>
                </a>
                <div className="details-action-wrapper">
                    {
                        isInWishlist(props.wishlist, product) ?
                            <ALink href="/wishlist" className="btn-product btn-wishlist added-to-wishlist"><span>Go to Wishlist</span></ALink>
                            :
                            <a href="#" className="btn-product btn-wishlist" onClick={onWishlistClick}><span>Add to Wishlist</span></a>

                    }
                </div>
            </div >

            <div className="product-details-footer">
                <div className="product-cat text-truncate">
                    <span>Brand:</span><span>{product?.single_product_details?.product?.brand}</span>
                </div >

                <div className="product-cat text-truncate">
                    <span>Type of Seating: </span><span style={{ textTransform: 'capitalize' }}>{subCategory}</span>
                </div>

                <div className="social-icons social-icons-sm">
                    <span className="social-label">Share:</span>
                    <ALink href="https://www.instagram.com/bafco/" className="social-icon" rel="noopener noreferrer" title="Instagram" target="_blank"><i className="icon-instagram"></i></ALink>
                    <ALink href="https://www.facebook.com/bafcointeriors" className="social-icon" rel="noopener noreferrer" title="Facebook" target="_blank"><i className="icon-facebook-f"></i></ALink>
                    <ALink href="https://www.linkedin.com/company/bafco/" className="social-icon" rel="noopener noreferrer" title="linkedin" target="_blank"><i className="icon-linkedin"></i></ALink>
                    <ALink href="https://twitter.com/Bafco" className="social-icon" rel="noopener noreferrer" title="Twitter" target="_blank"><i className="icon-twitter"></i></ALink>
                    <ALink href="https://www.pinterest.com/bafcointeriors/" className="social-icon" rel="noopener noreferrer" title="pinterest" target="_blank"><i className="icon-pinterest"></i></ALink>

                    {/* <ALink href="#" className="social-icon" title="Instagram">
                        <i className="icon-instagram"></i>
                    </ALink>
                    <ALink href="#" className="social-icon" title="Facebook">
                        <i className="icon-facebook-f"></i>
                    </ALink>
                    <ALink href="#" className="social-icon" title="linkedin">
                        <i className="icon-linkedin"></i>
                    </ALink>

                    <ALink href="#" className="social-icon" title="Twitter">
                        <i className="icon-twitter"></i>
                    </ALink> */}
                </div>
            </div >
            <div className="product-details-adv">
                <ul>
                    <li><img src="images/icons/unsplash_xJkTCbtuqAY.png" /></li>
                    <li><img src="images/icons/unsplash_xJkTCbtuqAY1.png" /></li>
                    <li><img src="images/icons/unsplash_xJkTCbtuqAY2.png" /></li>
                    <li><img src="images/icons/unsplash_xJkTCbtuqAY3.png" /></li>
                </ul>
            </div>
            <div className="sticky-bar d-none">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <figure className="product-media">
                                <ALink href={`/product/default/${product.slug}`}>
                                    <img
                                        src={""} alt="product"
                                    // width={product.sm_pictures[0].width}
                                    // height={product.sm_pictures[0].height}
                                    />
                                </ALink>
                            </figure>
                            <h3 className="product-title">
                                <ALink href={`/product/default/${product.slug}`}>{product.name}</ALink>
                            </h3>
                        </div>
                        <div className="col-6 justify-content-end">
                            {
                                (selectedColorVariant.color && selectedColorVariant.size != "") ?
                                    <div className="product-price">
                                        ${selectedColorVariant.price ? selectedColorVariant.price : 0}
                                    </div>
                                    :
                                    product.stock == 0 ?
                                        <div className="product-price">
                                            <span className="out-price">AED{product.price}</span>
                                        </div>
                                        :
                                        minPrice == maxPrice ?
                                            <div className="product-price">AED{minPrice}</div>
                                            :
                                            product?.variations?.length == 0 ?
                                                <div className="product-price">
                                                    <span className="new-price">AED{minPrice}</span>
                                                    <span className="old-price">AED{maxPrice}</span>
                                                </div>
                                                :
                                                <div className="product-price">AED{minPrice} &ndash; AED{maxPrice}</div>
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
                                        <a href="#" className="btn-product btn-wishlist" onClick={onWishlistClick}><span>Add to Wishlist</span></a>

                                }
                            </div >
                        </div >
                    </div >
                </div >
            </div >
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        cartlist: state.cartlist.data,
        wishlist: state.wishlist.data,
    }
}

export default connect(mapStateToProps, { ...wishlistAction, ...cartAction })(DetailOne);
