import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import SlideToggle from 'react-slide-toggle';
import { API } from '~/http/API';
import ALink from '~/components/features/alink';
import Accordion from '~/components/features/accordion/accordion';
import Card from '~/components/features/accordion/card';
import PageHeader from '~/components/features/page-header';
import CountryRegionData from '~/utils/countrydata.json';
import { cartPriceTotal } from '~/utils/index';
import { toast } from 'react-toastify';
import Joi from 'joi';

let billingAddressData = {
    name: "",
    phone_number: "",
    address_line1: "",
    address_line2: "",
    postal_code: "",
    country: "",
    state: "",
    city: "",
    address_type: "",
    order_notes: "",
}

let shippingAddressData = {
    id: "shipping-01",
    name: "BAFCO Delivery",
    amount: "",
    address: {
        name: "",
        phone_number: "",
        country: "",
        state: "",
        city: "",
        postal_code: "",
        address_line1: "",
        address_line2: "",
    },
}

function Checkout(props) {
    const { cartlist } = props;
    const router = useRouter();
    const [userAddressList, setUserAddressList] = useState();
    const [isdefault, setIsDefault] = useState(false);
    const [billing_address, setBillingAddress] = useState({ ...billingAddressData });
    const [shipping, setshippingAddress] = useState({ ...shippingAddressData });
    const [cuponCode, setCuponCode] = useState('');
    // const [countryList, setCountryList] = useState();
    const [stateList, setStateList] = useState();
    const [email, setEmail] = useState("");
    const [defaultAddressID, setDefaultAddressID] = useState();
    const [ischeckdefault, setIsCheckDefault] = useState(false);
    const [isError, setIsError] = useState(cartlist.length > 0 ? false : true);
    const [cartTotal, setCartTotal] = useState();
    const [isPromoCodeValid, setIsPromoCodeValid] = useState(false);
    const [isShipDifferent, setIsShipDifferent] = useState(false);
    const [error, setError] = useState([]);

    useEffect(() => {

        // let country = [];
        // CountryRegionData?.map((item) => {
        //     country.push(item.countryName);
        // })
        // setCountryList(country);

        let stateList = [];
        stateList = CountryRegionData.filter(item => {
            return item.countryName === "United Arab Emirates";
        });
        setStateList(stateList);

        let xauthtoken = localStorage.getItem('authtoken');
        let UserId = localStorage.getItem('UserData');

        let header = {
            headers: {
                'Authorization': `Bearer ${xauthtoken}`,
            }
        }

        API.get(`/addresses/${UserId}`, header).then((response) => {

            setUserAddressList(response?.data);

            let dataID = response?.data.find(element => { return element.default === 1 })

            setDefaultAddressID(dataID?.id);

            setBillingAddress(dataID);

        }).catch((err) => console.log(err));


        API.get(`/auth/me`, header).then((response) => {

            setEmail(response.data.email);

        }).catch((err) => console.log(err));

        API.get(`/auth/cart-total/${UserId}`, { headers: { 'Authorization': `Bearer ${xauthtoken}` } }).then((response) => {
            setCartTotal(response?.data);
            setCuponCode(response?.data?.coupon);
        }).catch((err) => {
            console.log(err);
        });

    }, [])

    useEffect(() => {
        if (ischeckdefault) {
            let xauthtoken = localStorage.getItem('authtoken');
            let UserId = localStorage.getItem('UserData');

            let header = {
                headers: {
                    'Authorization': `Bearer ${xauthtoken}`,
                }
            }
            API.get(`/addresses/${UserId}`, header).then((response) => {

                let dataID = response?.data.find(element => { return element.id === defaultAddressID })

                setBillingAddress(dataID);

            }).catch((err) => console.log(err));
        }
    }, [defaultAddressID])

    const handleChangeSetDefault = (e, id) => {
        setDefaultAddressID(id);
        setIsCheckDefault(true);
    }

    const handleBillingAddressChange = (e) => {
        let formdata = { ...billing_address }
        formdata[e.target.name] = e.target.value;
        setBillingAddress(formdata);
    }
    const handleShippingAddressChange = (e) => {
        let formdata = { ...shipping }
        formdata.address[e.target.name] = e.target.value;
        setshippingAddress(formdata);
    }

    const handelCuponCode = (e) => {
        setCuponCode(e.target.value);
    }

    const handlePromoCodeSubmit = () => {
        let authtoken = localStorage.getItem('authtoken');
        let UserDetail = localStorage.getItem('UserData');

        if (UserDetail) {
            let data = {
                user_id: UserDetail,
                promo_code_id: cuponCode
            }

            API.post(`/auth/promo-check`, data, { headers: { 'Authorization': `Bearer ${authtoken}` } }).then((response) => {
                console.log(response.data.status, "response")
                if (response.data.status === 200 || response.status === 201) {
                    console.log(response.data)
                    toast.success(response.data.message);
                    // let obj = {
                    //     promo_code_id: promoCode,
                    //     discount: response?.data?.data
                    // }
                    // setCuponCode(obj);
                    setCartTotal(response?.data?.data);
                    setIsPromoCodeValid(true);
                } else {
                    setIsPromoCodeValid(false);
                    toast.warning(response.data.message);
                }
            }).catch((err) => console.log(err));
        }
    }

    const handleUserphone = (e) => {

        let a = Number(e.target.value)
        let formdata = { ...billing_address }
        if (e.target.value === "") {
            formdata.phone_number = ""
            setBillingAddress(formdata)

        } else if (!isNaN(a)) {
            formdata.phone_number = e.target.value
            setBillingAddress(formdata)
        } else {
            e.preventDefault();
        }

    }

    const handlePlaceOrderSubmit = () => {

        let xauthtoken = localStorage.getItem('authtoken');
        let UserId = localStorage.getItem('UserData');

        if (billing_address?.name === '') {
            alert('Please enter a name before submitting.');
            return;
        }
        if (billing_address?.phone_number === '') {
            alert('Please enter a phone number before submitting.');
            return;
        }
        if (billing_address?.state === '') {
            alert('Please enter a state before submitting.');
            return;
        }
        if (billing_address?.country === '') {
            alert('Please enter a country before submitting.');
            return;
        }
        if (billing_address?.city === '') {
            alert('Please enter a city before submitting.');
            return;
        }
        if (billing_address?.postal_code === '') {
            alert('Please enter a postal code before submitting.');
            return;
        }
        if (billing_address?.address_line1 === '') {
            alert('Please enter a address before submitting.');
            return;
        }
        if (isShipDifferent === true) {
            if (shipping?.name === '') {
                alert('Please enter a name before submitting.');
                return;
            }
            if (shipping?.phone_number === '') {
                alert('Please enter a phone number before submitting.');
                return;
            }
            if (shipping?.state === '') {
                alert('Please enter a state before submitting.');
                return;
            }
            if (shipping?.country === '') {
                alert('Please enter a country before submitting.');
                return;
            }
            if (shipping?.city === '') {
                alert('Please enter a city before submitting.');
                return;
            }
            if (shipping?.postal_code === '') {
                alert('Please enter a postal code before submitting.');
                return;
            }
            if (shipping?.address_line1 === '') {
                alert('Please enter a address before submitting.');
                return;
            }
        }

        if (UserId) {

            let formdata = {
                "user_id": 27,
                "coupon_code": isPromoCodeValid === true ? cuponCode : "BAFCOTest",
                "total_amount": cartTotal?.decimal_amount,
                "tax_amount": "0",
                "currency": "AED",
                "shipping": {
                    "id": "shipping-01",
                    "name": "BAFCO Delivery",
                    "amount": "0",
                    "address": {
                        "name": isShipDifferent === true ? shipping?.address?.name : billing_address?.name,
                        "phone_number": isShipDifferent === true ? shipping?.address?.phone_number : billing_address?.phone_number,
                        "alt_phone": isShipDifferent === true ? shipping?.address?.phone_number : billing_address?.phone_number,
                        // "country": isShipDifferent === true ? shipping?.address?.country : billing_address?.country,
                        "country": "AE",
                        "state": isShipDifferent === true ? shipping?.address?.state : billing_address?.state,
                        "city": isShipDifferent === true ? shipping?.address?.city : billing_address?.city,
                        "postal_code": isShipDifferent === true ? shipping?.address?.postal_code : billing_address?.postal_code,
                        "line1": isShipDifferent === true ? shipping?.address?.address_line1 : billing_address?.address_line1,
                        "line2": isShipDifferent === true ? shipping?.address?.address_line2 : billing_address?.address_line2,
                    },
                },
                "billing_address": {
                    "name": billing_address?.name,
                    "phone": billing_address?.phone_number,
                    "alt_phone": billing_address?.phone_number,
                    "line1": billing_address?.address_line1,
                    "line2": billing_address?.address_line2,
                    "city": billing_address?.city,
                    "state": billing_address?.state,
                    "country": "AE",
                    "postal_code": billing_address?.postal_code,
                    "order_notes": billing_address?.billing_address?.postal_code,
                },
                "customer": {
                    "id": UserId,
                    "email": email,
                    "name": isShipDifferent === true ? shipping?.name : billing_address?.name,
                },
                "discounts": [
                    {
                        "code": isPromoCodeValid === true ? cuponCode : "BAFCOTest",
                        "name": isPromoCodeValid === true ? cuponCode : "BAFCOTest",
                        "amount": cartTotal?.total
                    }
                ]
            }

            API.post(`/authCheckout`, formdata, { headers: { 'Authorization': `Bearer ${xauthtoken}` } }).then((response) => {
                console.log(response);
                if (response?.data?.error) {
                    setError(response?.data?.error?.detail);
                    toast.error("Please fill in the required fields.");
                } else {
                    router.push(response?.data?.redirect_url);
                }
                // setError()
            }).catch((error) => {
                toast.error("Somthing went wrong !");
            });

        } else {
            toast.warning("Please Login/Register First.");
        }
    }

    if (isError) {
        // return router.push('/cart/');
    }

    return (
        <div className="main">
            <PageHeader
                title="Checkout"
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
                        <li className="breadcrumb-item active">Checkout</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="checkout">
                    <div className="container">
                        <form>
                            <div className="row">
                                <div className="col-lg-9">
                                    <h2 className="checkout-title">Billing Details</h2>

                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label>Name *</label>
                                            <input type="text" name="name" value={billing_address?.name} onChange={handleBillingAddressChange} className="form-control" required />
                                        </div>

                                        <div className="col-sm-6">
                                            <label>Email *</label>
                                            <input type="text" name="email" value={email} readOnly className="form-control" />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-12">
                                            <label>Phone Number *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="singin-email-2"
                                                name="phone_number"
                                                value={billing_address?.phone_number}
                                                onChange={handleUserphone}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-12">
                                            <label>Street address *</label>
                                            <input type="text" name='address_line1' value={billing_address?.address_line1} onChange={handleBillingAddressChange} className="form-control" placeholder="House number and Street name" required />
                                            <input type="text" name='address_line2' value={billing_address?.address_line2} onChange={handleBillingAddressChange} className="form-control" placeholder="Appartments, suite, unit etc ..." required />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Country *</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="singin-email-2"
                                                    name="country"
                                                    placeholder=""
                                                    value={billing_address?.country}
                                                    onChange={handleBillingAddressChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>State *</label>
                                                <select
                                                    className="form-control"
                                                    id="state"
                                                    name="state"
                                                    value={billing_address?.state}
                                                    label="Select state"
                                                    fullwidth="true"
                                                    style={{ color: "" }}
                                                    onChange={handleBillingAddressChange}
                                                >
                                                    <option value={""}>Select state</option>
                                                    {stateList && stateList[0]?.regions?.map((item, index) => (
                                                        <option value={item.name} key={index}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Town / City *</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="singin-email-2"
                                                    name="city"
                                                    placeholder=""
                                                    value={billing_address?.city}
                                                    onChange={handleBillingAddressChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Postcode / ZIP *</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="singin-email-2"
                                                    name="postal_code"
                                                    placeholder=""
                                                    value={billing_address?.postal_code}
                                                    onChange={handleBillingAddressChange}
                                                    required
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    <>
                                        {/* <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="checkout-create-acc" />
                                            <label className="custom-control-label" htmlFor="checkout-create-acc">Create an account?</label>
                                        </div> */}

                                        <SlideToggle duration={300} collapsed>
                                            {({ onToggle, setCollapsibleElement }) => (
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox mt-0 address-box" onChange={() => setIsShipDifferent(true)}>
                                                        <input type="checkbox" className="custom-control-input"
                                                            id="different-shipping"
                                                            onChange={onToggle}
                                                        />
                                                        <label className="custom-control-label" htmlFor="different-shipping">Ship to a different address?
                                                        </label>
                                                    </div>
                                                    <div className="shipping-info" ref={setCollapsibleElement} style={{ overflow: 'hidden' }}>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <label>Name *</label>
                                                                <input
                                                                    type="text"
                                                                    name="name"
                                                                    value={shipping?.address?.name}
                                                                    onChange={handleShippingAddressChange}
                                                                    className="form-control"
                                                                    required
                                                                />
                                                            </div>

                                                            <div className="col-sm-6">
                                                                <label>Phone Number *</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="singin-email-2"
                                                                    name="phone_number"
                                                                    value={shipping?.address?.phone_number}
                                                                    onChange={handleShippingAddressChange}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <label>Street address *</label>
                                                                <input
                                                                    type="text"
                                                                    name='address_line1'
                                                                    value={shipping?.address?.address_line1}
                                                                    onChange={handleShippingAddressChange}
                                                                    className="form-control"
                                                                    placeholder="House number and Street name"
                                                                    required
                                                                />
                                                                <input
                                                                    type="text"
                                                                    name='address_line2'
                                                                    value={shipping?.address?.address_line2}
                                                                    onChange={handleShippingAddressChange}
                                                                    className="form-control"
                                                                    placeholder="Appartments, suite, unit etc ..."
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <div className="form-group">
                                                                    <label>Country *</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="singin-email-2"
                                                                        name="country"
                                                                        placeholder=""
                                                                        value={shipping?.address?.country}
                                                                        onChange={handleShippingAddressChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="form-group">
                                                                    <label>State *</label>
                                                                    <select
                                                                        className="form-control"
                                                                        id="state"
                                                                        name="state"
                                                                        value={shipping?.address?.state}
                                                                        label="Select state"
                                                                        fullwidth="true"
                                                                        style={{ color: "" }}
                                                                        onChange={handleShippingAddressChange}
                                                                    >
                                                                        <option value={""}>Select state</option>
                                                                        {stateList && stateList[0]?.regions?.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <div className="form-group">
                                                                    <label>Town / City *</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="singin-email-2"
                                                                        name="city"
                                                                        placeholder=""
                                                                        value={shipping?.address?.city}
                                                                        onChange={handleShippingAddressChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="form-group">
                                                                    <label>Postcode / ZIP *</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="singin-email-2"
                                                                        name="postal_code"
                                                                        placeholder=""
                                                                        value={shipping?.address?.postal_code}
                                                                        onChange={handleShippingAddressChange}
                                                                        required
                                                                    />

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </SlideToggle >
                                    </>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <label>Order notes (optional)</label>
                                            <textarea
                                                className="form-control"
                                                value={billing_address?.order_notes}
                                                onChange={handleBillingAddressChange}
                                                cols="30"
                                                rows="4"
                                                placeholder="Notes about your order, e.g. special notes for delivery"
                                            ></textarea>
                                        </div>
                                    </div>

                                    <h2 className="checkout-title">Addresses</h2>
                                    <div className="row checkout_address_section">
                                        {userAddressList?.map((address, index) => (
                                            <div className="col-sm-6" key={index}>
                                                <div className="card card-dashboard" key={index}>
                                                    <div className="card-body">
                                                        <input
                                                            type="radio"
                                                            name="default_address"
                                                            onChange={(e) => handleChangeSetDefault(e, address.id)}
                                                            defaultChecked={address.default === 1 ? true : isdefault}
                                                        />
                                                        <div>
                                                            <h3 className="card-title">{address.name}</h3>
                                                            <p> {address.address_line1}<br />
                                                                {address.address_line2}, {address.postal_code}, {address.city}<br />
                                                                {address.state}, {address.country}<br />
                                                                {address.phone_number}<br /></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                                <aside className="col-lg-3">
                                    <div className="summary">
                                        <div className="checkout-discount mb-3">
                                            <form id="checkout-discount-form">
                                                <input
                                                    type="text"
                                                    name="coupon_code"
                                                    className="form-control"
                                                    required
                                                    id="checkout-discount-input"
                                                    value={cuponCode}
                                                    onChange={handelCuponCode}
                                                    placeholder="Have a coupon? Click here to enter your code"
                                                />
                                                {cuponCode &&
                                                    <label>Hurray! You got a discount!</label>
                                                }
                                                <button type="button" className="btn btn-outline-primary-2 btn-order btn-block" onClick={handlePromoCodeSubmit}>
                                                    Use Promo Code
                                                </button>
                                            </form>
                                        </div>
                                        <h3 className="summary-title">Your Order</h3>

                                        <table className="table table-summary">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                {cartlist.map((item, index) =>
                                                    <tr key={index}>
                                                        <td> <ALink href={`/product/default/${item.slug}`}>{item.name}</ALink></td>
                                                        <td>AED {item.sum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                    </tr>
                                                )}
                                                <tr className="summary-subtotal">
                                                    <td>Subtotal:</td>
                                                    <td>{cartTotal?.sub_total}</td>
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
                                                <tr className="summary-total">
                                                    <td>Total:</td>
                                                    <td>AED {cartTotal?.total}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <button type="button" onClick={handlePlaceOrderSubmit} className="btn btn-outline-primary-2 btn-order btn-block">
                                            <span className="btn-text">Place Order</span>
                                            <span className="btn-hover-text">Proceed to Checkout</span>
                                        </button>
                                    </div>

                                </aside>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const mapStateToProps = (state) => ({
    cartlist: state.cartlist.data,
})

export default connect(mapStateToProps)(Checkout);