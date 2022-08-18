import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
// import SlideToggle from 'react-slide-toggle';
import ALink from '~/components/features/alink';
import Qty from '~/components/features/qty';
import { actions as globalAction } from '~/store/global';
import { actions as wishlistAction } from '~/store/wishlist';
import { actions as cartAction } from '~/store/cart';
import { canAddToCart, isInWishlist } from '~/utils';

function DetailOne(props) {
    const router = useRouter();
    const ref = useRef(null);
    const { product, subCategory } = props;
    const [qty, setQty] = useState(1);
    const [qty2, setQty2] = useState(1);
    const [variationGroup, setVariationGroup] = useState([]);
    const [variationTypeGroup, setVariationTypeGroup] = useState([]);
    const [selectedColorVariant, setselectedColorVariant] = useState({ color: null, colorName: null, colorId: null, variationId: null, fabricImage: "" });
    const [authtoken, setAuthtoken] = useState('');

    useEffect(() => {

        setVariationTypeGroup(product?.dropDown?.reduce((acc, curr) =>
            acc.find((v) => v.variant.name === curr.variant.name) ? acc : [...acc, curr],
            []));

        setVariationGroup(product?.dropDown?.reduce((acc, curr) =>
            acc.find((v) => v.name === curr.name) ? acc : [...acc, curr],
            []));

    }, [product])

    useEffect(() => {
        setselectedColorVariant({ color: null, colorName: null, colorId: null, variationId: null, fabricImage: "" });
        setQty(1);
        setQty2(1);
    }, [router.query.slug])

    // useEffect(() => {

    //     setAuthtoken(localStorage.getItem('authtoken'));

    //     window.addEventListener('scroll', scrollHandler, { passive: true });

    //     return () => { window.removeEventListener('scroll', scrollHandler); }

    // }, [])

    // useEffect(() => {
    //     scrollHandler();
    // }, [router.pathname])

    // function scrollHandler() {
    //     if (router.pathname.includes('/collections/')) {
    //         let stickyBar = ref.current.querySelector('.sticky-bar');
    //         if (stickyBar.classList.contains('d-none') && ref.current.getBoundingClientRect().bottom < 0) {
    //             stickyBar.classList.remove('d-none');
    //             return;
    //         }
    //         if (!stickyBar.classList.contains('d-none') && ref.current.getBoundingClientRect().bottom > 0) {
    //             stickyBar.classList.add('d-none');
    //         }
    //     }
    // }


    function onWishlistClick(e) {
        e.preventDefault();
        if (!isInWishlist(props.wishlist, product)) {
            if (authtoken === "" || authtoken === null || authtoken === undefined) {
                props.showPopup(true);
            } else {
                props.addToWishlist(product);
            }
        } else {
            router.push('/wishlist');
        }
    }

    function onChangeQty(current) {
        setQty(current);
    }

    function onChangeQty2(current) {
        setQty2(current);
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

    function handelSelectVariantChange(e, id) {
        e.preventDefault();
        console.log("handelSelectVariantChange :: ", id);
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
                        {product?.product_single_variation?.product_variation_details.lower_price === product?.product_single_variation?.product_variation_details.upper_price ?
                            <span>AED{product?.product_single_variation?.product_variation_details.lower_price}</span>
                            :
                            <span>AED{product?.product_single_variation?.product_variation_details.lower_price}&ndash;AED{product?.product_single_variation?.product_variation_details.upper_price}</span>
                        }
                    </span>
                </div>
                :
                product?.product_single_variation?.product_variation_details.lower_price === product?.product_single_variation?.product_variation_details.upper_price ?
                    <div className="product-price">AED{product?.product_single_variation?.product_variation_details.lower_price}</div>
                    :
                    <div className="product-price">
                        <span className="new-price">AED{product?.product_single_variation?.product_variation_details.lower_price}</span>
                        <span className="old-price">AED{product?.product_single_variation?.product_variation_details.upper_price}</span>
                    </div>
            }

            <div className="product-content" dangerouslySetInnerHTML={{ __html: product?.single_product_details?.product?.short_description }} />

            {console.log("variationGroup :: ", variationGroup)}
            <div className="row">
                {variationTypeGroup !== null &&
                    variationTypeGroup?.map((item, index) => (
                        <div className="col-md-6" key={index}>
                            <div className="details-filter-row details-row-size">
                                <label htmlFor={`${item.variant.name}`}>{item.variant.name}: </label>
                                {item.type === "1" ?
                                    <div className="select-custom">
                                        <select
                                            name={`${item.variant.name}`}
                                            className="form-control"
                                            value={selectedColorVariant?.item?.variant?.name}
                                            onChange={(e) => handelSelectVariantChange(e, item.product_variation_id)}
                                        >
                                            <option value="">Select a {item.variant.name}</option>
                                            {variationGroup.map((item2, index2) => (
                                                item.variant.name === item2.variant.name &&
                                                <option value={item2.variation_id} key={index2}>{item2.type_value}</option>
                                            ))
                                            }
                                        </select>
                                    </div> :
                                    <div className="product-nav product-nav-dots">
                                        {variationGroup.map((item2, index2) => (
                                            item.variant.name === item2.variant.name &&
                                            <a
                                                href="#"
                                                className={`${(item2.name == selectedColorVariant.colorName ? 'active ' : '') + (item2?.disabled ? 'disabled' : '')}`}
                                                style={{ backgroundImage: `url(${item2.type_value})` }}
                                                key={index2}
                                                onClick={(e) => handelSelectVariantChange(e, item.product_variation_id)}
                                            ></a>
                                        ))
                                        }
                                    </div>
                                }
                            </div >
                        </div>
                    ))
                }
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
                                <ALink href={`/product/default/${product?.single_product_details?.product?.route}`}>
                                    <img
                                        src={product?.product_single_variation?.product_variation_details?.images[0]?.avatar} alt="product"
                                    // width={product.sm_pictures[0].width}
                                    // height={product.sm_pictures[0].height}
                                    />
                                </ALink>
                            </figure>
                            <h3 className="product-title">
                                <ALink href={`/product/default/${product?.single_product_details?.product?.route}`}>{product?.single_product_details?.product?.name}</ALink>
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
                                            <span className="out-price">AED{product.price}</span>
                                        </div>
                                        :
                                        product?.product_single_variation?.product_variation_details.lower_price == product?.product_single_variation?.product_variation_details.upper_price ?
                                            <div className="product-price">AED{product?.product_single_variation?.product_variation_details.lower_price}</div>
                                            :
                                            product?.variations?.length == 0 ?
                                                <div className="product-price">
                                                    <span className="new-price">AED{product?.product_single_variation?.product_variation_details.lower_price}</span>
                                                    <span className="old-price">AED{product?.product_single_variation?.product_variation_details.upper_price}</span>
                                                </div>
                                                :
                                                <div className="product-price">AED{product?.product_single_variation?.product_variation_details.lower_price} &ndash; AED{product?.product_single_variation?.product_variation_details.upper_price}</div>
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
                        </div > */}
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

export default connect(mapStateToProps, { ...wishlistAction, ...cartAction, ...globalAction })(DetailOne);
