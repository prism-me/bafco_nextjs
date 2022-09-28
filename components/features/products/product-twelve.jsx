import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';

import { actions as wishlistAction } from '~/store/wishlist';
import { actions as cartAction } from '~/store/cart';
import { actions as compareAction } from '~/store/compare';
import { actions as demoAction } from '~/store/demo';
import { actions as globalAction } from '~/store/global';
import { isInWishlist, isInCompare } from '~/utils';

function ProductTwelve(props) {
    const router = useRouter();
    const { product, wishlist } = props;
    const [maxPrice, setMaxPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(99999);
    const categoryName = props?.categoryName ? props.categoryName : router.query.category;
    const subCategoryName = props?.subCategoryName ? props.subCategoryName : router.query.sub_category;
    const [authtoken, setAuthtoken] = useState('');

    useEffect(() => {

        setAuthtoken(localStorage.getItem('authtoken'));

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

        let data = {
            'product_id': product?.id,
            'product_variation_id': product?.productvariations?.product_variation_name[0]?.product_variation_id,
        };

        props.addToCart(data);

    }

    function onWishlistClick(e) {
        e.preventDefault();
        if (!isInWishlist(props.wishlist, product)) {
            if (authtoken === "" || authtoken === null || authtoken === undefined) {
                props.showPopup(true);
            } else {
                let data = {
                    'product_id': product?.id,
                    'product_variation_id': product?.productvariations?.product_variation_name[0]?.product_variation_id,

                };
                props.addToWishlist(data);
            }
        } else {
            router.push('/wishlist');
        }
    }

    function onQuickView(e) {
        e.preventDefault();
        router.push(`/collections/${categoryName}/${subCategoryName}/${product?.route}`);
    }

    return (
        <div className="product product-11 text-center">

            <figure className="product-media">

                {!product?.productvariations?.in_stock || product?.productvariations?.in_stock === 0 ?
                    <span className="product-label label-circle label-out">Stocking</span>
                    : ""
                }

                <ALink href={`/collections/${categoryName}/${subCategoryName}/${product?.route}`}>
                    {/* <LazyLoadImage
                        alt="product"
                        src={product?.productvariations?.images.length > 0 ? product?.featured_image : product?.productvariations?.images[0]?.avatar}
                        threshold={500}
                        effect="black and white"
                        wrapperClassName="product-image"
                    /> */}
                    <img src={product?.productvariations?.images.length > 0 ? product?.featured_image : product?.productvariations?.images[0]?.avatar} alt="product" />
                    {product?.variations?.length >= 2 ?
                        <LazyLoadImage
                            alt="product"
                            src={product?.productvariations?.images[1].avatar}
                            threshold={500}
                            effect="black and white"
                            wrapperClassName="product-image-hover"
                        />
                        : ""
                    }
                </ALink>


                <div className="product-action-vertical">
                    {isInWishlist(wishlist, product) ?
                        <ALink href="/wishlist" className="btn-product-icon btn-wishlist btn-expandable added-to-wishlist">
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

                {!product?.productvariations?.in_stock || product?.productvariations?.in_stock === 0 ?
                    <div className="product-price">
                        <span className="out-price">AED {product?.productvariations?.upper_price}</span>
                    </div>
                    :
                    <div className="product-price">AED {product?.productvariations?.upper_price}</div>
                }

                {product?.variants?.length > 0 ?
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

            {product?.productvariations.in_stock && product?.productvariations.in_stock !== 0 ?
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

export default connect(mapStateToProps, { ...wishlistAction, ...cartAction, ...compareAction, ...demoAction, ...globalAction })(ProductTwelve);