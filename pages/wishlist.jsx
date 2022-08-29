import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { API } from '~/http/API';
import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
import { actions as wishlistAction } from '~/store/wishlist';
import { actions as cartAction } from '~/store/cart';

function Wishlist(props) {

    const [wishItems, setWishItems] = useState([]);
    const router = useRouter();
    const authenticated = localStorage.getItem('UserData');
    const wishlistbg = "images/banners/whishlist-banner.png";

    useEffect(() => {

        let UserDetail = localStorage.getItem('UserData');
        let authtoken = localStorage.getItem('authtoken');

        API.get(`/auth/wishlists/${UserDetail}`, { headers: { 'Authorization': `Bearer ${authtoken}` } }).then((response) => {

            setWishItems(response.data)

            // setWishItems(response.data.reduce((acc, product) => {

            //     let max = 0;
            //     let min = 999999;

            //     if (min > product.productvariations.lower_price) min = product.productvariations.lower_price;
            //     if (max < product.productvariations.upper_price) max = product.productvariations.upper_price;

            //     return [
            //         ...acc,
            //         {
            //             ...product,
            //             minPrice: min,
            //             maxPrice: max
            //         }
            //     ];

            // }, []));

        }).catch((err) => {
            console.log(err);
        });


    }, [props.wishlist])

    function moveToCart(product) {

        console.log("moveToCart :: ", product)

        let data = {
            'product_id': product?.productData[0]?.id,
            'product_variation_id': product?.variation[0]?.product_variation_name[0]?.product_variation_id,
        };

        props.addToCart(data);
        deleteFromWishlist(product);
    }

    function deleteFromWishlist(product) {
        let authtoken = localStorage.getItem('authtoken');

        API.delete(`/auth/wishlists/${product?.wishlist[0]?.id}`, { headers: { 'Authorization': `Bearer ${authtoken}` } })
            .then((response) => {
                let data = {
                    'product_id': product?.productData[0]?.id,
                    'product_variation_id': product?.variation[0].product_variation_name[0]?.product_variation_id
                };
                props.removeFromWishlist(data);

            }).catch((err) => {
                console.log(err);
            });
    }

    if (!authenticated) {
        return router.push('/');;
    }

    return (
        <main className="main">
            <PageHeader
                title="WishList"
                subTitle="We make happy workplaces"
                backgroundImage={wishlistbg}
                buttonText="Shop Now"
                buttonUrl="#"
            />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item active">Wishlist</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content pb-5">
                {wishItems.length > 0 ?
                    <div className="container" >
                        <table className="table table-wishlist table-mobile">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Stock Status</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {wishItems.map((product, index) => (
                                    <tr key={index}>
                                        <td className="product-col">
                                            <div className="product">
                                                <figure className="product-media">
                                                    <ALink href={`/collections/${product?.productData[0]?.product_category?.parent_category?.route}/${product?.productData[0]?.product_category?.route}/${product?.productData[0]?.route}`} className="product-image">
                                                        <img src={product?.variation[0]?.images[0].avatar} alt="product" />
                                                    </ALink>
                                                </figure>

                                                <h4 className="product-title">
                                                    <ALink href={`/collections/${product?.productData[0]?.product_category?.parent_category?.route}/${product?.productData[0]?.product_category?.route}/${product?.productData[0]?.route}`}>{product?.productData[0]?.name}</ALink>
                                                </h4>
                                            </div>
                                        </td>
                                        {/* {console.log("product :: ", product)} */}
                                        <td className="price-col">
                                            {product?.variation[0]?.in_stock === 0 ?
                                                <div className="product-price d-inline-block mb-0">
                                                    <span className="out-price">AED {product?.variation[0]?.upper_price}</span>
                                                </div>
                                                :
                                                // product?.variation[0]?.lower_price === product?.variation[0]?.upper_price ?
                                                <div className="product-price d-inline-block mb-0">AED {product?.variation[0]?.upper_price}</div>
                                                // :
                                                // product.variations.length === 0 ?
                                                // <div className="product-price d-inline-block mb-0">
                                                //     <span className="new-price">AED {product?.variation[0]?.lower_price}</span>
                                                //     <span className="old-price">AED {product?.variation[0]?.upper_price}</span>
                                                // </div>
                                                // :
                                                // <div className="product-price d-inline-block mb-0">AED {product.productvariations.lower_price}&ndash;AED {product.productvariations.upper_price}</div>
                                            }
                                        </td>
                                        <td className="stock-col">
                                            <span className={`${product?.variation[0]?.in_stock == 0 ? 'out-of-stock' : 'in-stock'}`} >{product?.variation[0]?.in_stock == 0 ? 'Out of stock' : 'In stock'}</span>
                                        </td>
                                        <td className="action-col">
                                            <div className="dropdown">
                                                {
                                                    // (product.variations.length > 0 || product.productvariations.in_stock === 0) ?
                                                    //     <ALink href={`/product/default/${product.route}`} className="btn btn-block btn-outline-primary-2 btn-select">
                                                    //         <i className="icon-list-alt"></i>
                                                    //         {product.productvariations.in_stock == '0' ? 'read more' : 'select'}
                                                    //     </ALink>
                                                    //     :
                                                    <button className="btn btn-block btn-outline-primary-2" onClick={e => moveToCart(product)}>
                                                        <i className="icon-cart-plus"></i>
                                                        add to cart
                                                    </button>
                                                }
                                            </div>
                                        </td>
                                        <td className="remove-col">
                                            <button
                                                className="btn-remove"
                                                // onClick={e => props.removeFromWishlist(product)}
                                                onClick={e => deleteFromWishlist(product)}
                                            >
                                                <i className="icon-close"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>

                        <div className="wishlist-share">
                            <div className="social-icons social-icons-sm mb-2">
                                <label className="social-label">Share on:</label>
                                <ALink
                                    href="#"
                                    className="social-icon"
                                    title="Facebook"
                                >
                                    <i className="icon-facebook-f"></i>
                                </ALink>
                                <ALink
                                    href="#"
                                    className="social-icon"
                                    title="Twitter"
                                >
                                    <i className="icon-twitter"></i>
                                </ALink>
                                <ALink
                                    href="#"
                                    className="social-icon"
                                    title="Instagram"
                                >
                                    <i className="icon-instagram"></i>
                                </ALink>
                                <ALink
                                    href="#"
                                    className="social-icon"
                                    title="Youtube"
                                >
                                    <i className="icon-youtube"></i>
                                </ALink>
                                <ALink
                                    href="#"
                                    className="social-icon"
                                    title="Pinterest"
                                >
                                    <i className="icon-pinterest"></i>
                                </ALink>
                            </div>
                        </div>
                    </div>
                    :
                    <div
                        className="container"
                    >
                        <div className="text-center">
                            <i className="icon-heart-o wishlist-empty d-block" style={{ fontSize: '15rem', lineHeight: '1' }}></i>
                            <span className="d-block mt-2">No products added to wishlist</span>
                            <ALink
                                href="#"
                                className="btn btn-primary mt-2"
                            >Go Shop</ALink>
                        </div>
                    </div>
                }

            </div>
        </main>
    )
}

const mapStateToProps = (state) => ({
    wishlist: state.wishlist.data
})

export default connect(mapStateToProps, { ...wishlistAction, ...cartAction })(Wishlist);