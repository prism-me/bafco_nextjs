import { connect } from 'react-redux';
import { useEffect, useState } from "react";
import ALink from '~/components/features/alink';
import { API } from '~/http/API';
import { actions } from '~/store/cart';
import { cartQtyTotal, cartPriceTotal } from '~/utils/index';

function CartMenu(props) {
    const { cartlist } = props;
    const [cartCount, setCartCount] = useState(0);

    console.log("cartlist :: ", cartlist)

    useEffect(() => {
        let authtoken = localStorage.getItem('authtoken');
        let UserDetail = localStorage.getItem('UserData');
        let GuestUserDetail = localStorage.getItem('GuestUserData');

        if (authtoken === "" || authtoken === null || authtoken === undefined) {

            API.get(`/guest-cart/${GuestUserDetail}`).then((response) => {
                setCartCount(response?.data?.length);
            }).catch((err) => {
                console.log(err);
            });

        } else {
            API.get(`/auth/cart/${UserDetail}`, { headers: { 'Authorization': `Bearer ${authtoken}` } }).then((response) => {
                setCartCount(response?.data?.length);
            }).catch((err) => {
                console.log(err);
            });
        }

    }, [props.cartlist])

    return (
        <div className="dropdown cart-dropdown">
            <ALink href="/cart" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                <div className="icon">
                    <i className="icon-shopping-cart"></i>
                    {/* <span className="cart-count">{cartQtyTotal(cartlist)}</span> */}
                    <span className="cart-count">{cartCount}</span>
                </div>
                <p>Cart</p>
            </ALink>

            {/* <div className={`dropdown-menu dropdown-menu-right ${cartlist.length === 0 ? 'text-center' : ''}`} >
                {
                    0 === cartlist.length ?
                        <p>No products in the cart.</p> :
                        <>
                            <div className="dropdown-cart-products">
                                {cartlist.map((item, index) => (
                                    <div className="product justify-content-between" key={index}>
                                        <div className="product-cart-details">
                                            <h4 className="product-title">
                                                <ALink href={`/product/default/${item.route}`}>{item.name}</ALink>
                                            </h4>
                                        </div>

                                        <figure className="product-image-container ml-2">
                                            <ALink href={`/product/default/${item.route}`} className="product-image">
                                                <img src={item.featured_image} alt="product" />
                                            </ALink>
                                        </figure>
                                        <button className="btn-remove" title="Remove Product" onClick={() => props.removeFromCart(item)}><i className="icon-close"></i></button>
                                    </div>
                                ))}
                            </div>
                            <div className="dropdown-cart-total">
                                <span>Total</span>

                                <span className="cart-total-price">AED {cartPriceTotal(cartlist).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>

                            <div className="dropdown-cart-action">
                                <ALink href="/cart" className="btn btn-primary">View Cart</ALink>
                                <ALink href="/shop/checkout" className="btn btn-outline-primary-2"><span>Checkout</span><i className="icon-long-arrow-right"></i></ALink>
                            </div>
                        </>
                }
            </div> */}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        cartlist: state.cartlist.data
    }
}

export default connect(mapStateToProps, { ...actions })(CartMenu);