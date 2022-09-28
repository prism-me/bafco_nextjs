import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import ALink from '~/components/features/alink';
import Qty from '~/components/features/qty';
import PageHeader from '~/components/features/page-header';
import { actions as cartAction } from '~/store/cart';
import { cartPriceTotal } from '~/utils/index';
import { API } from '~/http/API';
import '~/utils/postpay';

function Cart(props) {
    const [cartList, setCartList] = useState([]);
    const [shippingCost, setShippingCost] = useState(0);
    const [cartTotal, setCartTotal] = useState();

    useEffect(() => {
        let authtoken = localStorage.getItem('authtoken');
        let UserDetail = localStorage.getItem('UserData');

        let GuestUserDetail = localStorage.getItem('GuestUserData');

        if (authtoken === "" || authtoken === null || authtoken === undefined) {

            API.get(`/guest-cart/${GuestUserDetail}`).then((response) => {
                setCartList(response?.data);
            }).catch((err) => {
                console.log(err);
            });

            API.get(`/guest-cart-total/${GuestUserDetail}`).then((response) => {
                setCartTotal(response?.data);
            }).catch((err) => {
                console.log(err);
            });

        } else {
            API.get(`/auth/cart/${UserDetail}`, {
                headers: {
                    'Authorization': `Bearer ${authtoken}`
                }
            }).then((response) => {
                setCartList(response?.data);
            }).catch((err) => {
                console.log(err);
            });

            API.get(`/auth/cart-total/${UserDetail}`, {
                headers: {
                    'Authorization': `Bearer ${authtoken}`
                }
            }).then((response) => {
                setCartTotal(response?.data);
            }).catch((err) => {
                console.log(err);
            });
        }

    }, [props.cartItems])

    function onChangeShipping(value) {
        setShippingCost(value);
    }

    function changeQty(value, item) {

        console.log("ChangeQty :: ", value, item);

        let authtoken = localStorage.getItem('authtoken');

        let data = {
            'cart_id': item?.cart[0]?.id,
            'qty': value
        };

        if (authtoken !== null) {

            API.post(`/auth/cart-qty`, data, {
                headers: { 'Authorization': `Bearer ${authtoken}` }
            }).then((response) => {
                console.log("response :: ", response)
            }).catch((err) => {
                console.log(err);
            });
        } else {
            API.post(`/guest-cart-qty`, data).then((response) => {
                console.log("response :: ", response)

            }).catch((err) => {
                console.log(err);
            });
        }

    }

    function updateCart(e) {
        let button = e.currentTarget;
        button.querySelector('.icon-refresh').classList.add('load-more-rotating');

        setTimeout(() => {
            props.updateCart(cartList);
            button.querySelector('.icon-refresh').classList.remove('load-more-rotating');
        }, 400);
    }

    function deleteFromCart(product) {
        let authtoken = localStorage.getItem('authtoken');

        if (authtoken !== null) {

            API.delete(`/auth/remove-cart/${product?.cart[0]?.id}`, {
                headers: { 'Authorization': `Bearer ${authtoken}` }
            }).then((response) => {
                let data = {
                    'product_id': product?.productData[0]?.id,
                    'product_variation_id': product?.variation[0].product_variation_name[0]?.product_variation_id
                };
                props.removeFromCart(data);

            }).catch((err) => {
                console.log(err);
            });
        } else {
            API.delete(`/guest-remove-cart/${product?.cart[0]?.id}`).then((response) => {
                let data = {
                    'product_id': product?.productData[0]?.id,
                    'product_variation_id': product?.variation[0].product_variation_name[0]?.product_variation_id
                };
                props.removeFromCart(data);

            }).catch((err) => {
                console.log(err);
            });
        }
    }

    return (
        <div className="main">
            <PageHeader
                title="Cart"
                subTitle=""
                backgroundImage="images/banners/cart-banner.png"
                buttonText="Shop Now"
                buttonUrl="/"

            />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item active">Shopping Cart</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content pb-5">
                <div className="cart">
                    <div className="container">
                        {cartList.length > 0 ?
                            <div className="row">
                                <div className="col-lg-9">
                                    <table className="table table-cart table-mobile">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {cartList.length > 0 ?
                                                cartList.map((item, index) =>
                                                    <tr key={index}>
                                                        <td className="product-col">
                                                            <div className="product">
                                                                <figure className="product-media">
                                                                    <ALink href={`/collections/${item?.productData[0]?.product_category?.parent_category?.route}/${item?.productData[0]?.product_category?.route}/${item?.productData[0]?.route}`} className="product-image">
                                                                        <img src={item?.variation[0]?.images[0]?.avatar} alt="product" />
                                                                    </ALink>
                                                                </figure>

                                                                <h4 className="product-title">
                                                                    <ALink href={`/collections/${item?.productData[0]?.product_category?.parent_category?.route}/${item?.productData[0]?.product_category?.route}/${item?.productData[0]?.route}`}>{item?.productData[0]?.name}</ALink>
                                                                </h4>
                                                            </div>
                                                        </td>

                                                        <td className="price-col">
                                                            {item?.variation[0]?.in_stock === 0 ?
                                                                <div className="product-price d-inline-block mb-0">
                                                                    <span className="out-price">AED {item?.variation[0]?.upper_price}</span>
                                                                </div>
                                                                :
                                                                <div className="product-price d-inline-block mb-0">AED {item?.variation[0]?.upper_price}</div>
                                                            }
                                                        </td>

                                                        <td className="quantity-col">
                                                            <Qty
                                                                value={item.qty}
                                                                changeQty={current => changeQty(current, item)}
                                                                adClass="cart-product-quantity"
                                                            >
                                                            </Qty>
                                                        </td>

                                                        <td className="total-col">
                                                            AED {item?.total}
                                                        </td>

                                                        <td className="remove-col">
                                                            <button
                                                                className="btn-remove"
                                                                onClick={() => deleteFromCart(item)}
                                                            >
                                                                <i className="icon-close"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ) :
                                                <tr>
                                                    <td>
                                                        <p className="pl-2 pt-1 pb-1"> No Products in Cart </p>
                                                    </td>
                                                </tr>
                                            }

                                        </tbody>
                                    </table>

                                    <div className="cart-bottom">
                                        {/* <div className="cart-discount">
                                                <form action="#">
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" required placeholder="coupon code" />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-outline-primary-2" type="submit"><i className="icon-long-arrow-right"></i></button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div> */}
                                        {/* <button className="btn btn-outline-dark-2" onClick={updateCart}><span>Clear Cart</span><i className="icon-refresh"></i></button> */}


                                        <button className="btn btn-outline-dark-2" onClick={updateCart}><span>UPDATE CART</span><i className="icon-refresh"></i></button>
                                    </div>
                                </div>
                                <aside className="col-lg-3">
                                    <div className="summary summary-cart">
                                        <h3 className="summary-title">Cart Total</h3>

                                        <table className="table table-summary">
                                            <tbody>
                                                <tr className="summary-subtotal">
                                                    <td>Subtotal:</td>
                                                    <td>AED {cartTotal?.sub_total}</td>
                                                    {/* <td>AED {cartPriceTotal(props.cartItems).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td> */}
                                                </tr>

                                                {cartTotal?.discounted_price &&
                                                    <tr className="summary-shipping">
                                                        <td>Discount:</td>
                                                        <td>AED {cartTotal?.discounted_price}</td>
                                                    </tr>
                                                }

                                                <tr>
                                                    <td>Shipping Fee:</td>
                                                    <td>{cartTotal?.shipping_charges === 'Free' ? cartTotal?.shipping_charges : `AED ${cartTotal?.shipping_charges}`}</td>
                                                </tr>

                                                {/* <tr className="summary-shipping-row">
                                                        <td>
                                                            <div className="custom-control custom-radio">
                                                                <input type="radio"
                                                                    id="standard-shipping"
                                                                    name="shipping"
                                                                    className="custom-control-input"
                                                                    onChange={(e) => onChangeShipping(10)}
                                                                />
                                                                <label className="custom-control-label" htmlFor="standard-shipping">Standard:</label>
                                                            </div>
                                                        </td>
                                                        <td>AED 10.00</td>
                                                    </tr>

                                                    <tr className="summary-shipping-row">
                                                        <td>
                                                            <div className="custom-control custom-radio">
                                                                <input type="radio"
                                                                    id="express-shipping"
                                                                    name="shipping"
                                                                    className="custom-control-input"
                                                                    onChange={(e) => onChangeShipping(20)}
                                                                />
                                                                <label className="custom-control-label" htmlFor="express-shipping">Express:</label>
                                                            </div>
                                                        </td>
                                                        <td>AED 20.00</td>
                                                    </tr> */}

                                                {/* <tr className="summary-shipping-estimate">
                                                        <td>Estimate for Your Country<br /> <ALink href="/shop/dashboard">Change address</ALink></td>
                                                        <td>&nbsp;</td>
                                                    </tr> */}

                                                <tr className="summary-total">
                                                    <td>Total:</td>
                                                    <td>AED {cartTotal?.total}</td>
                                                    {/* <td>
                                                            AED {(cartPriceTotal(props.cartItems) + shippingCost).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </td> */}
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div
                                            class="postpay-widget"
                                            data-type="cart"
                                            data-amount="100000"
                                            data-currency="AED"
                                            data-num-instalments="3"
                                            data-locale="en"
                                        ></div>

                                        <ALink
                                            className="btn btn-outline-primary-2 btn-order btn-block"
                                            href="/checkout"
                                        >
                                            PROCEED TO CHECKOUT
                                        </ALink>
                                    </div>

                                    <ALink href="/" className="btn btn-outline-dark-2 btn-block mb-3"><span>CONTINUE SHOPPING</span><i className="icon-refresh"></i></ALink>
                                </aside>
                            </div>
                            :
                            <div className="row">
                                <div className="col-12">
                                    <div className="cart-empty-page text-center">
                                        <i className="cart-empty icon-shopping-cart" style={{ lineHeight: 1, fontSize: '15rem' }}></i>
                                        <p className="px-3 py-2 cart-empty mb-3">No products added to the cart</p>
                                        <p className="return-to-shop mb-0">
                                            <ALink
                                                href="/"
                                                className="btn btn-primary"
                                            >RETURN TO SHOP</ALink>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => (
    {
        cartItems: state.cartlist.data
    }
)

export default connect(mapStateToProps, { ...cartAction })(Cart);