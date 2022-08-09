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
    const { product } = props;
    const [qty, setQty] = useState(1);
    const [qty2, setQty2] = useState(1);
    const [colorArray, setColorArray] = useState([]);
    const [sizeArray, setSizeArray] = useState([]);
    const [variationGroup, setVariationGroup] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState({ color: null, colorName: null, price: null, size: "" });
    const [showClear, setShowClear] = useState(false);
    const [showVariationPrice, setShowVariationPrice] = useState(false);
    const [maxPrice, setMaxPrice] = useState(product?.product_single_variation?.product_variation_details?.upper_price);
    const [minPrice, setMinPrice] = useState(product?.product_single_variation?.product_variation_details?.lower_price);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler, { passive: true });

        return () => { window.removeEventListener('scroll', scrollHandler); }
        
    }, [])

    useEffect(() => {
        let min = 99999;
        let max = 0;

        setVariationGroup(product.variations.reduce((acc, cur) => {
            cur.variationItems.map(item => {
                acc.push({
                    color: cur.color,
                    colorName: cur.color_name,
                    size: item.name,
                    price: cur.price
                });
            });
            if (min > cur.price) min = cur.lower_price;
            if (max < cur.price) max = cur.upper_price;
            return acc;
        }, []));

        setMinPrice(min);
        setMaxPrice(max);
    }, [product])

    useEffect(() => {
        setSelectedVariant({ color: null, colorName: null, price: null, size: "" });
        setQty(1);
        setQty2(1);
    }, [router.query.slug])

    useEffect(() => {
        refreshSelectableGroup();
    }, [variationGroup, selectedVariant])

    useEffect(() => {
        scrollHandler();
    }, [router.pathname])

    useEffect(() => {
        setShowClear((selectedVariant.color || selectedVariant.size != "") ? true : false);
        setShowVariationPrice((selectedVariant.color && selectedVariant.size != "") ? true : false);
        let toggle = ref.current.querySelector('.variation-toggle');

        if (toggle) {
            if ((selectedVariant.color && selectedVariant.size != "") && toggle.classList.contains('collapsed')) {
                toggle.click();
            }

            if ((!(selectedVariant.color && selectedVariant.size != "")) && !toggle.classList.contains('collapsed')) {
                toggle.click();
            }
        }
    }, [selectedVariant])

    function scrollHandler() {
        if (router.pathname.includes('/product/default')) {
            let stickyBar = ref.current.querySelector('.sticky-bar');
            if (stickyBar.classList.contains('d-none') && ref.current.getBoundingClientRect().bottom < 0) {
                stickyBar.classList.remove('d-none');
                return;
            }
            if (!stickyBar.classList.contains('d-none') && ref.current.getBoundingClientRect().bottom > 0) {
                stickyBar.classList.add('d-none');
            }
        }
    }

    function onWishlistClick(e) {
        e.preventDefault();
        if (!isInWishlist(props.wishlist, product)) {
            props.addToWishlist(product);
        } else {
            router.push('/pages/wishlist');
        }
    }

    function refreshSelectableGroup() {
        let tempArray = [...variationGroup];
        if (selectedVariant.color) {
            tempArray = variationGroup.reduce((acc, cur) => {
                if (selectedVariant.color !== cur.color) {
                    return acc;
                }
                return [...acc, cur];
            }, []);
        }

        setSizeArray(tempArray.reduce((acc, cur) => {
            if (acc.findIndex(item => item.size == cur.size) !== -1)
                return acc;
            return [...acc, cur];
        }, []));

        tempArray = [...variationGroup];
        if (selectedVariant.size) {
            tempArray = variationGroup.reduce((acc, cur) => {
                if (selectedVariant.size !== cur.size) {
                    return acc;
                }
                return [...acc, cur];
            }, []);
        }

        setColorArray(product?.variations?.reduce((acc, cur) => {
            if (
                tempArray.findIndex(item => item.color == cur.color) == -1
            ) {
                return [
                    ...acc,
                    {
                        color: cur.color,
                        colorName: cur.color_name,
                        price: cur.price,
                        disabled: true
                    }
                ];
            }
            return [
                ...acc,
                {
                    color: cur.color,
                    colorName: cur.color_name,
                    price: cur.price,
                    disabled: false
                }
            ];
        }, []));
    }

    function selectColor(e, item) {
        e.preventDefault()
        if (item.color == selectedVariant.color) {
            setSelectedVariant({
                ...selectedVariant,
                color: null,
                colorName: null,
                price: item.price
            });
        } else {
            setSelectedVariant({
                ...selectedVariant,
                color: item.color,
                colorName: item.colorName,
                price: item.price
            });
        }
    }

    function selectSize(e) {
        if (e.target.value == "") {
            setSelectedVariant({ ...selectedVariant, size: "" });
        } else {
            setSelectedVariant({ ...selectedVariant, size: e.target.value });
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
        setSelectedVariant(({
            ...selectedVariant,
            color: null,
            colorName: null,
            size: ""
        }));
        refreshSelectableGroup();
    }

    function onCartClick(e, index = 0) {
        e.preventDefault();
        if (e.currentTarget.classList.contains('btn-disabled')) return;

        let newProduct = { ...product };
        if (product?.variations?.length > 0) {
            newProduct = {
                ...product,
                name:
                    product.name +
                    ' - ' +
                    selectedVariant.colorName +
                    ', ' +
                    selectedVariant.size,
                price: selectedVariant.price
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

            {/* <div className="ratings-container">
                <div className="ratings">
                    <div className="ratings-val" style={{ width: product.ratings * 20 + '%' }}></div>
                    <span className="tooltip-text">{product.ratings}</span>
                </div>
                <span className="ratings-text">( {product.review} Reviews )</span>
            </div> */}

            {
                product?.single_product_details?.product?.stock == 0 ?
                    <div className="product-price">
                        <span className="out-price">
                            {
                                minPrice == maxPrice ?
                                    <span>AED{product.price}</span>
                                    :
                                    <span>AED{minPrice}&ndash;AED{maxPrice}</span>
                            }
                        </span>
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
                            <div className="product-price">AED{minPrice}&ndash;AED{maxPrice}</div>
            }

            <div className="product-content">
                <p>{product.short_desc}</p>
            </div>

            {
                product?.variations?.length > 0 ?
                    <>
                        <div className="details-filter-row details-row-size">
                            <label htmlFor="size">Upholstery:</label>
                            <div className="select-custom">
                                <select
                                    name="size"
                                    className="form-control"
                                    value={selectedVariant.size}
                                    onChange={selectSize}
                                >
                                    <option value="">Select a Upholstery</option>
                                    {
                                        sizeArray.map((item, index) => (
                                            <option
                                                value={item.size}
                                                key={index}
                                            >{item.size}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            {
                                showClear ?
                                    <a href="#" onClick={clearSelection}>clear</a>
                                    : ""
                            }
                        </div >
                        <div className="details-filter-row details-row-size">
                            <label htmlFor="size">Frame:</label>
                            <div className="select-custom">
                                <select
                                    name="size"
                                    className="form-control"
                                    value={selectedVariant.size}
                                    onChange={selectSize}
                                >
                                    <option value="">Select a Frame</option>
                                    {
                                        sizeArray.map((item, index) => (
                                            <option
                                                value={item.size}
                                                key={index}
                                            >{item.size}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            {
                                showClear ?
                                    <a href="#" onClick={clearSelection}>clear</a>
                                    : ""
                            }
                        </div >
                        <SlideToggle collapsed={true}>
                            {({ onToggle, setCollapsibleElement, toggleState }) => (
                                <div>
                                    <button className={`d-none variation-toggle ${toggleState.toLowerCase()}`} onClick={onToggle}></button>
                                    <div ref={setCollapsibleElement} style={{ overflow: 'hidden' }}>
                                        <div className="product-price">
                                            AED{selectedVariant.price ? selectedVariant.price : 0}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </SlideToggle>
                        <div className="details-filter-row details-row-size">
                            <label>Color:</label>

                            <div className="product-nav product-nav-dots">
                                {
                                    colorArray.map((item, index) => (
                                        <a
                                            href="#"
                                            className={`${(item.color == selectedVariant.color ? 'active ' : '') + (item.disabled ? 'disabled' : '')}`}
                                            style={{ backgroundColor: item.color }}
                                            key={index}
                                            onClick={e => selectColor(e, item)}
                                        ></a>
                                    ))
                                }
                            </div>
                        </div>

                    </>
                    : ""
            }

            <div className="details-filter-row details-row-size">
                <label htmlFor="qty">Quantity:</label>
                <Qty changeQty={onChangeQty} max={product.stock} value={qty}></Qty>
            </div >

            <div className="product-details-action">
                <a
                    href="#"
                    className={`btn-product btn-cart ${(!canAddToCart(props.cartlist, product, qty) || (product?.variations?.length > 0 && !showVariationPrice)) ? 'btn-disabled' : ''}`}
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
                {/* <div className="product-cat text-truncate">
                    <span>Brand:</span>
                    {
                        product.brands.map((brand, index) => (
                            <span key={index}>
                                {brand.name}
                                {index < product.brands.length - 1 ? ',' : ''}
                            </span>
                        ))
                    }
                </div > */}

                <div className="product-cat text-truncate">
                    <span>Type of Seating: </span><span>Office Chairs</span>
                </div>
                {/* <div className="product-cat w-100 text-truncate">
                    <span>Category:</span>
                    {
                        product.category.map((cat, index) => (
                            <span key={index}>
                                <ALink
                                    href={{ pathname: `/collections/${cat.slug}`, query: { category: cat.slug } }}
                                >{cat.name}</ALink>
                                {index < product.category.length - 1 ? ',' : ''}
                            </span>
                        ))
                    }
                </div > */}

                <div className="social-icons social-icons-sm">
                    <span className="social-label">Share:</span>
                    <ALink href="#" className="social-icon" title="Instagram">
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
                    </ALink>
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
                                (selectedVariant.color && selectedVariant.size != "") ?
                                    <div className="product-price">
                                        ${selectedVariant.price ? selectedVariant.price : 0}
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
