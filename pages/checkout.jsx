import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SlideToggle from 'react-slide-toggle';
import { API } from '~/http/API';
import ALink from '~/components/features/alink';
import Accordion from '~/components/features/accordion/accordion';
import Card from '~/components/features/accordion/card';
import PageHeader from '~/components/features/page-header';
import CountryRegionData from '~/utils/countrydata.json';
import { cartPriceTotal } from '~/utils/index';

let addressData = {
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

function Checkout(props) {
    const { cartlist } = props;
    const [userAddressList, setUserAddressList] = useState();
    const [isdefault, setIsDefault] = useState(false);
    const [useraddressData, setUserAddressData] = useState({ ...addressData });
    const [countryList, setCountryList] = useState();
    const [stateList, setStateList] = useState();
    const [email, setEmail] = useState("");
    const [defaultAddressID, setDefaultAddressID] = useState();

    useEffect(() => {

        let country = [];
        CountryRegionData?.map((item) => {
            country.push(item.countryName);
        })
        setCountryList(country);

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

            setUserAddressData(dataID);

        }).catch((err) => console.log(err));

        API.get(`/auth/me`, header).then((response) => {

            setEmail(response.data.email);

        }).catch((err) => console.log(err));

        document.querySelector('body').addEventListener("click", clearOpacity)

        return () => {

            document.querySelector('body').removeEventListener("click", clearOpacity);

        }

    }, [defaultAddressID])

    const handleChangeSetDefault = (e, id) => {

    }

    function clearOpacity() {

        if (document.querySelector('#checkout-discount-input').value == '')
            document.querySelector('#checkout-discount-form label').removeAttribute('style');

    }

    function addOpacity(e) {

        e.currentTarget.parentNode.querySelector("label").setAttribute("style", "opacity: 0");

    }

    const handleCountryChange = (e) => {

        let formdata = { ...useraddressData }
        formdata.country = e.target.value;
        setUserAddressData(formdata);

        let stateList = [];
        stateList = CountryRegionData.filter(item => {
            return item.countryName === e.target.value;
        });
        setStateList(stateList);

    }

    const handleAddressChange = (e) => {
        let formdata = { ...useraddressData }
        formdata[e.target.name] = e.target.value;
        setUserAddressData(formdata);
    }

    const handleUserphone = (e) => {

        let a = Number(e.target.value)
        let formdata = { ...useraddressData }
        if (e.target.value === "") {
            formdata.phone_number = ""
            setUserAddressData(formdata)

        } else if (!isNaN(a)) {
            formdata.phone_number = e.target.value
            setUserAddressData(formdata)
        } else {
            e.preventDefault();
        }

    }

    return (
        <div className="main">
            <PageHeader
                title="Checkout"
                subTitle=""
                backgroundImage="images/banners/cart-banner.png"
                buttonText="Shop Now"
                buttonUrl="#"
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
                        <div className="checkout-discount">
                            <form action="#" id="checkout-discount-form">
                                <input type="text" className="form-control" required id="checkout-discount-input" onClick={addOpacity} />
                                <label htmlFor="checkout-discount-input" className="text-truncate">Have a coupon? <span>Click here to enter your code</span></label>
                            </form>
                        </div>

                        <form action="#">
                            <div className="row">
                                <div className="col-lg-9">
                                    <h2 className="checkout-title">Billing Details</h2>

                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label>Name *</label>
                                            <input type="text" name="name" value={useraddressData?.name} onChange={handleAddressChange} className="form-control" required />
                                        </div>

                                        <div className="col-sm-6">
                                            <label>Email *</label>
                                            <input type="text" name="email" value={email} readOnly className="form-control" />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-12">
                                            <label htmlFor="singin-email-2">Phone Number *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="singin-email-2"
                                                name="phone_number"
                                                value={useraddressData?.phone_number}
                                                onChange={handleUserphone}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-12">
                                            <label>Street address *</label>
                                            <input type="text" name='address_line1' value={useraddressData?.address_line1} onChange={handleAddressChange} className="form-control" placeholder="House number and Street name" required />
                                            <input type="text" name='address_line2' value={useraddressData?.address_line2} onChange={handleAddressChange} className="form-control" placeholder="Appartments, suite, unit etc ..." required />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="singin-email-2">Country *</label>
                                                <select
                                                    className="form-control"
                                                    id="country"
                                                    name="country"
                                                    value={useraddressData?.country}
                                                    label="Select Country"
                                                    fullwidth="true"
                                                    style={{ color: "" }}
                                                    onChange={handleCountryChange}
                                                >
                                                    <option value={""}>Select Country</option>
                                                    {countryList?.map((item, index) => (
                                                        <option value={item} key={index}>{item}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="singin-email-2">State *</label>
                                                <select
                                                    className="form-control"
                                                    id="state"
                                                    name="state"
                                                    value={useraddressData?.state}
                                                    label="Select state"
                                                    fullwidth="true"
                                                    style={{ color: "" }}
                                                    onChange={handleAddressChange}
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
                                                <label htmlFor="singin-email-2">Town / City *</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="singin-email-2"
                                                    name="city"
                                                    placeholder=""
                                                    value={useraddressData?.city}
                                                    onChange={handleAddressChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="singin-email-2">Postcode / ZIP *</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="singin-email-2"
                                                    name="postal_code"
                                                    placeholder=""
                                                    value={useraddressData?.postal_code}
                                                    onChange={handleAddressChange}
                                                    required
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    <>
                                        {/* <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="checkout-create-acc" />
                                        <label className="custom-control-label" htmlFor="checkout-create-acc">Create an account?</label>
                                    </div>

                                    <SlideToggle duration={300} collapsed >
                                        {({ onToggle, setCollapsibleElement }) => (
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox mt-0 address-box">
                                                    <input type="checkbox" className="custom-control-input"
                                                        id="different-shipping" onChange={onToggle} />
                                                    <label className="custom-control-label" htmlFor="different-shipping">Ship to a different address?
                                                    </label>
                                                </div>
                                                <div className="shipping-info" ref={setCollapsibleElement} style={{ overflow: 'hidden' }}>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>First name <abbr className="required"
                                                                    title="required">*</abbr></label>
                                                                <input type="text" className="form-control" required />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Last name <abbr className="required"
                                                                    title="required">*</abbr></label>
                                                                <input type="text" className="form-control" required />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Company name (optional)</label>
                                                        <input type="text" className="form-control" />
                                                    </div>

                                                    <div className="select-custom">
                                                        <label>Country / Region <span className="required">*</span></label>
                                                        <select name="orderby" className="form-control">
                                                            <option value="" defaultValue="selected">Vanuatu</option>
                                                            <option value="1">Brunei</option>
                                                            <option value="2">Bulgaria</option>
                                                            <option value="3">Burkina Faso</option>
                                                            <option value="4">Burundi</option>
                                                            <option value="5">Cameroon</option>
                                                        </select>
                                                    </div>

                                                    <div className="form-group mb-1 pb-2">
                                                        <label>Street address <abbr className="required"
                                                            title="required">*</abbr></label>
                                                        <input type="text" className="form-control"
                                                            placeholder="House number and street name" required />
                                                    </div>

                                                    <div className="form-group">
                                                        <input type="text" className="form-control"
                                                            placeholder="Apartment, suite, unit, etc. (optional)" required />
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Town / City <abbr className="required"
                                                            title="required">*</abbr></label>
                                                        <input type="text" className="form-control" required />
                                                    </div>

                                                    <div className="select-custom">
                                                        <label>State / County <abbr className="required"
                                                            title="required">*</abbr></label>
                                                        <select name="orderby" className="form-control">
                                                            <option value="" defaultValue="selected">NY</option>
                                                            <option value="1">Brunei</option>
                                                            <option value="2">Bulgaria</option>
                                                            <option value="3">Burkina Faso</option>
                                                            <option value="4">Burundi</option>
                                                            <option value="5">Cameroon</option>
                                                        </select>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Postcode / ZIP <abbr className="required"
                                                            title="required">*</abbr></label>
                                                        <input type="text" className="form-control" required />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </SlideToggle > */}
                                    </>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <label>Order notes (optional)</label>
                                            <textarea className="form-control" value={useraddressData?.order_notes} onChange={handleAddressChange} cols="30" rows="4" placeholder="Notes about your order, e.g. special notes for delivery"></textarea>
                                        </div>
                                    </div>

                                    <h2 className="checkout-title">Addresses</h2>
                                    <div className="row checkout_address_section">
                                        {userAddressList?.map((address, index) => (
                                            <div className="col-sm-6" key={index}>
                                                <div className="card card-dashboard" key={index}>
                                                    <div className="card-body">
                                                        <input
                                                            type="checkbox"
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
                                                    <td>AED {cartPriceTotal(cartlist).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                </tr>
                                                <tr>
                                                    <td>Shipping:</td>
                                                    <td>Free Shipping</td>
                                                </tr>
                                                <tr className="summary-total">
                                                    <td>Total:</td>
                                                    <td>AED {cartPriceTotal(cartlist).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        {/* <Accordion type="checkout">
                                            <Card title="Direct bank transfer" expanded={true}>
                                                Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                                            </Card>

                                            <Card title="Check payments">
                                                Ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                                            </Card>

                                            <Card title="Cash on delivery">
                                                Quisque volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.
                                            </Card>

                                            <Card title='PayPal'>
                                                <small className="float-right paypal-link">What is PayPal?</small>
                                                Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                            </Card>

                                            <Card title='Credit Card (Stripe)'>
                                                <img src="images/payments-summary.png" alt="payments cards" className="mb-1" />
                                                Donec nec justo eget felis facilisis fermentum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Lorem ipsum dolor sit ame.
                                            </Card>
                                        </Accordion> */}

                                        <button type="submit" className="btn btn-outline-primary-2 btn-order btn-block">
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