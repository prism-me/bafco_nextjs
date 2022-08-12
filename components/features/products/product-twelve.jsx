import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';

import { actions as wishlistAction } from '~/store/wishlist';
import { actions as cartAction } from '~/store/cart';
import { actions as compareAction } from '~/store/compare';
import { actions as demoAction } from '~/store/demo';
import { isInWishlist, isInCompare } from '~/utils';

function ProductTwelve(props) {
    const router = useRouter();
    const { product, wishlist } = props;
    const [maxPrice, setMaxPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(99999);
    const categoryName = router.query.category;
    const subCategoryName = router.query.sub_category;

    useEffect(() => {
        let min = minPrice;
        let max = maxPrice;
        product?.variants?.map(item => {
            if (min > item.price) min = item.price;
            if (max < item.price) max = item.price;
        }, []);

        if (product?.variants?.length == 0) {
            min = product?.sale_price
                ? product?.sale_price
                : product?.price;
            max = product?.price;
        }

        setMinPrice(min);
        setMaxPrice(max);
    }, [])

    function onCartClick(e) {
        e.preventDefault();
        props.addToCart(product);
    }

    function onWishlistClick(e) {
        e.preventDefault();
        if (!isInWishlist(props.wishlist, product)) {
            props.addToWishlist(product);
        } else {
            router.push('/pages/wishlist');
        }
    }

    function onCompareClick(e) {
        e.preventDefault();
        if (!isInCompare(props.comparelist, product)) {
            props.addToCompare(product);
        }
    }

    function onQuickView(e) {
        e.preventDefault();
        // props.showQuickView(product?.route);
        router.push(`/collections/${categoryName}/${subCategoryName}/${product?.route}`);
    }

    return (
        <div className="product product-11 text-center">

            <figure className="product-media">

                {!product?.productvariations?.in_stock || product?.productvariations?.in_stock === 0 ?
                    <span className="product-label label-circle label-out">Out of Stock</span>
                    : ""
                }

                <ALink href={`/collections/${categoryName}/${subCategoryName}/${product?.route}`}>
                    <LazyLoadImage
                        alt="product"
                        src={product?.productvariations.images[0]?.avatar}
                        threshold={500}
                        effect="black and white"
                        wrapperClassName="product-image"
                    />
                    {
                        product?.variations?.length >= 2 ?
                            <LazyLoadImage
                                alt="product"
                                // src={ process.env.NEXT_PUBLIC_ASSET_URI + product?.sm_pictures[ 1 ].url }
                                src={product?.productvariations.images[0].avatar}
                                threshold={500}
                                effect="black and white"
                                wrapperClassName="product-image-hover"
                            />
                            : ""
                    }
                </ALink>


                <div className="product-action-vertical">
                    {isInWishlist(wishlist, product) ?
                        <ALink href="/shop/wishlist" className="btn-product-icon btn-wishlist btn-expandable added-to-wishlist">
                            <span>go to wishlist</span>
                        </ALink>
                        :
                        <a href="#" className="btn-product-icon btn-wishlist btn-expandable" onClick={onWishlistClick}>
                            <span>add to wishlist</span>
                        </a>

                    }
                    <span className="btn-product-icon btn-quickview" style={{ cursor: "pointer" }} title="Quick View" onClick={onQuickView}><span>quick view</span></span>
                </div>
            </figure>

            <div className="product-body">
                <div className="product-cat">
                    <ALink href={`/collections/${categoryName}`}>
                        {categoryName}
                    </ALink>
                </div>

                <h3 className="product-title">
                    <ALink href={`/collections/${categoryName}/${subCategoryName}/${product?.route}`}>{product?.name}</ALink>
                </h3>

                {!product?.productvariations.in_stock || product?.productvariations.in_stock == 0 ?
                    <div className="product-price">
                        <span className="out-price">AED{product?.productvariations.lower_price}</span>
                    </div>
                    :
                    product?.productvariations.lower_price == product?.productvariations.upper_price ?
                        <div className="product-price">AED{product?.productvariations.lower_price}</div>
                        :
                        product?.variants?.length == 0 ?
                            <div className="product-price">
                                <span className="new-price">AED{product?.productvariations.lower_price}</span>
                                <span className="old-price">AED{product?.productvariations.upper_price}</span>
                            </div>
                            :
                            <div className="product-price">AED{product?.productvariations.lower_price}&ndash;AED{product?.productvariations.upper_price}
                            </div>
                }

                {/* <div className="ratings-container">
                    <div className="ratings">
                        <div className="ratings-val" style={{ width: product?.ratings * 20 + '%' }}></div>
                        <span className="tooltip-text">{product?.ratings?.toFixed(2)}</span>
                    </div>
                    <span className="ratings-text">( {product?.review} Reviews )</span>
                </div> */}

                {
                    product?.variants?.length > 0 ?
                        <div className="product-nav product-nav-dots">
                            <div className="row no-gutters">
                                {
                                    product?.variants?.map((item, index) => (
                                        <ALink href="#" style={{ backgroundColor: item.color }} key={index}><span className="sr-only">Color Name</span></ALink>
                                    ))
                                }
                            </div>
                        </div>
                        : ""
                }
            </div>

            {
                product?.productvariations.in_stock && product?.productvariations.in_stock !== 0 ?
                    <div className="product-action">
                        {
                            product?.variants?.length > 0 ?
                                <ALink href={`#`} className="btn-product btn-cart btn-select">
                                    <span>select options</span>
                                </ALink>
                                :
                                <button className="btn-product btn-cart" onClick={onCartClick}>
                                    <span>add to cart</span>
                                </button>
                        }
                    </div>
                    : ""
            }

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        wishlist: state.wishlist.data,
        comparelist: state.comparelist.data
    }
}

export default connect(mapStateToProps, { ...wishlistAction, ...cartAction, ...compareAction, ...demoAction })(ProductTwelve);