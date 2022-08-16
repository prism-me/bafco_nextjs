import React, { useState, useEffect } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { useRouter } from 'next/router';
import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
import { API } from '~/http/API';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import CountryRegionData from '../../utils/countrydata.json';


let userProfileData = {
    name: "",
    email: "",
}

let userResetPasswordData = {
    password: "",
    newpassword: "",
    confirmpassword: "",
}

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(77,77,77,0.6)',
        zIndex: '9000'
    }
}

let addressData = {
    name: "",
    mobile: "",
    DeliveryAddress: "",
    country: "",
    area: "",
}

Modal.setAppElement('body');

function MyAccount() {
    const router = useRouter();
    const [userData, setUserData] = useState({ ...userProfileData });
    const [userResetPassData, setUserResetPassData] = useState({ ...userResetPasswordData });
    const [useraddressData, setUserAddressData] = useState({ ...addressData });
    const [useraddressList, setUserAddressList] = useState();
    const [isuserdetail, setIsuserdetail] = useState(true);
    const [open, setOpen] = useState(false);
    const [isdefault, setIsDefault] = useState(false);
    const [countryList, setCountryList] = useState();
    const [areaList, setAreaList] = useState();
    let timer;

    useEffect(() => {
        let country = [];
        CountryRegionData?.map((item) => {
            country.push(item.countryName);
        })
        setCountryList(country);
    }, []);

    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer);
        }
    });

    function closeModal() {
        document.getElementById("address-modal").classList.remove("ReactModal__Content--after-open");

        if (document.querySelector(".ReactModal__Overlay")) {
            document.querySelector(".ReactModal__Overlay").style.opaarea = '0';
        }

        timer = setTimeout(() => {
            setOpen(false);
        }, 350);

    }

    function openModal(e) {
        e.preventDefault();
        setOpen(true);
    }

    useEffect(() => {
        if (isuserdetail === true) {
            let xauthtoken = localStorage.getItem('authtoken');
            let UserId = localStorage.getItem('UserData');

            let header = {
                headers: {
                    'Authorization': `Bearer ${xauthtoken}`,
                }
            }
            API.get(`/auth/me`, header).then((response) => {
                localStorage.setItem('UserData', response?.data.id);
                setUserData(response?.data);
                setIsuserdetail(false);

            }).catch((err) => console.log(err));

            API.get(`/addresses/${UserId}`, header).then((response) => {
                setUserAddressList(response?.data);

            }).catch((err) => console.log(err));
        }

    }, [isuserdetail])

    const handleSubmit = () => {
        let xauthtoken = localStorage.getItem('authtoken');
        let UserId = localStorage.getItem('UserData');
        let formdata = {
            'user_id': UserId,
            'name': userData?.name,
        };

        if (userData?.name !== "" && userData?.email !== "") {

            API.post(`/auth/update-profile`, formdata, {
                headers: {
                    'Authorization': `Bearer ${xauthtoken}`
                }
            }).then((response) => {
                console.log(response);
                if (response?.status === 200) {
                    toast.success(response?.data?.message)
                } else {
                    toast.warning("Somthing went wrong !");
                }
            }).catch((error) => {
                toast.error("Somthing went wrong !");
            });
        } else {
            if (userData?.name === "") {
                toast.warning("Please enter a name before updating profile")
                return
            } else if (userData?.email === "") {
                toast.warning("Please enter a email id before updating profile")
                return
            }
        }

    };

    const handleChange = (e) => {
        let formdata = { ...userData }
        formdata[e.target.name] = e.target.value;
        setUserData(formdata);
    }

    const handleAddressChange = (e) => {
        let formdata = { ...useraddressData }
        formdata[e.target.name] = e.target.value;
        setUserAddressData(formdata);
    }

    const handleCountryChange = (e) => {

        let formdata = { ...useraddressData }
        formdata.country = e.target.value;
        setUserAddressData(formdata);

        let areaList = [];
        areaList = CountryRegionData.filter(item => {
            return item.countryName === e.target.value;
        });
        setAreaList(areaList);

    }

    const handleUserphone = (e) => {

        let a = Number(e.target.value)
        let formdata = { ...useraddressData }
        if (e.target.value === "") {
            formdata.mobile = ""
            setUserAddressData(formdata)

        } else if (!isNaN(a)) {
            formdata.mobile = e.target.value
            setUserAddressData(formdata)
        } else {
            e.preventDefault();
        }

    }

    const handleChangeSetDefault = (e, id) => {

        e.preventDefault();

        let xauthtoken = localStorage.getItem('authtoken');
        let UserId = localStorage.getItem('UserData');
        let formdata = {
            'user_id': UserId,
        };


        API.put(`/set-default/${id}`, formdata, {
            headers: {
                'Authorization': `Bearer ${xauthtoken}`
            }
        }).then((response) => {
            if (response?.status === 200) {
                window.location.reload(false);
            } else {
                toast.warning("Somthing went wrong !");
            }
        }).catch((error) => {
            console.log(error)
        });
    }

    const handleAddressDelete = (e, id) => {

        e.preventDefault();

        let xauthtoken = localStorage.getItem('authtoken');

        API.delete(`/addresses/${id}`, {
            headers: {
                'Authorization': `Bearer ${xauthtoken}`
            }
        }).then((response) => {
            if (response?.status === 200) {
                window.location.reload(false);
            } else {
                toast.warning("Somthing went wrong !");
            }
        }).catch((error) => {
            console.log(error)
        });
    }

    const handleAddressSubmit = () => {

        let xauthtoken = localStorage.getItem('authtoken');
        let UserId = localStorage.getItem('UserData');
        let formdata = {
            'user_id': UserId,
            'address': useraddressData,
        };

        if (useraddressData?.name !== "" && useraddressData?.mobile !== "" && useraddressData?.DeliveryAddress !== "" && useraddressData?.country !== "" && useraddressData?.area !== "") {

            API.post(`/addresses`, formdata, {
                headers: {
                    'Authorization': `Bearer ${xauthtoken}`
                }
            }).then((response) => {
                if (response?.status === 200) {
                    toast.success(response?.data)
                    closeModal()
                } else {
                    toast.warning("Somthing went wrong !");
                }
            }).catch((error) => {
                toast.error("Somthing went wrong !");
            });
        } else {
            if (useraddressData?.name === "") {
                toast.warning("Please enter a name before submit.")
                return
            } else if (useraddressData?.mobile === "") {
                toast.warning("Please enter a mobile number before submit.")
                return
            } else if (useraddressData?.DeliveryAddress === "") {
                toast.warning("Please enter a Address before submit.")
                return
            } else if (useraddressData?.country === "") {
                toast.warning("Please enter a mobile number before submit.")
                return
            } else if (useraddressData?.area === "") {
                toast.warning("Please enter a mobile number before submit.")
                return
            }
        }

    }

    /** Change Password Functional */

    const handleChangeResetPassword = (e) => {
        let formdata = { ...userResetPassData }
        formdata[e.target.name] = e.target.value;
        setUserResetPassData(formdata);
        // console.log("handleResetPassword :: ", formdata);
    }

    const handleResetPassword = () => {

        let xauthtoken = localStorage.getItem('authtoken');
        let UserId = localStorage.getItem('UserData');
        let formdata = {
            'user_id': UserId,
            "password": userResetPassData.password,
            "change_password": userResetPassData.newpassword,
            "confirm_password": userResetPassData.confirmpassword
        };
        if (userResetPassData?.password !== "" && userResetPassData?.newpassword !== "" && userResetPassData?.confirmpassword !== "" && userResetPassData?.newpassword === userResetPassData?.confirmpassword && userResetPassData?.password !== userResetPassData?.newpassword && userResetPassData?.newpassword.length >= 6) {
            API.post(`/auth/change-password`, formdata, {
                headers: {
                    'Authorization': `Bearer ${xauthtoken}`
                }
            }).then((response) => {
                console.log("reset ::", response)
                if (response?.status === 200) {
                    toast.success(response?.data?.message)
                } else {
                    toast.warning("Somthing went wrong !");
                }
            }).catch((error) => {
                // toast.error("Somthing went wrong !");
                console.error(error);
            });
        } else {
            if (userResetPassData?.password === "") {
                toast.warning("Please enter a password before submission")
                return false;
            } else if (userResetPassData?.newpassword === "") {
                toast.warning("Please enter a New password before submission")
                return false;
            } else if (userResetPassData?.confirmpassword === "") {
                toast.warning("Please enter a Confirm password before submission")
                return false;
            } else if (userResetPassData?.password === userResetPassData?.newpassword) {
                toast.warning("Current password and New password can not be same")
                return false;
            } else if (userResetPassData?.confirmpassword !== userResetPassData?.newpassword) {
                toast.warning("New Password and Confirm Password does not match")
                return false;
            } else if (userResetPassData?.newpassword.length < 6) {
                toast.error("Password must be at least 6 characters.");
                return false;
            }
        }
    }

    function toOrder(e) {
        e.preventDefault();
        document
            .querySelector('.nav-dashboard .react-tabs__tab-list .nav-item:nth-child(2)')
            .click();
    }

    function toAddress(e) {
        e.preventDefault();
        document
            .querySelector('.nav-dashboard .react-tabs__tab-list .nav-item:nth-child(4)')
            .click();
    }

    function toAccount(e) {
        e.preventDefault();
        document
            .querySelector('.nav-dashboard .react-tabs__tab-list .nav-item:nth-child(5)')
            .click();
    }

    function handleLogOut() {
        // e.preventDefault();
        localStorage.removeItem('authtoken');
        localStorage.removeItem('UserData');
        if (window.location.pathname == '/account/') {
            router.push('/');
        } else {
            window.location.reload();
        }
    }

    return (
        <div className="main">
            <PageHeader
                title="My Account"
                subTitle="We make happy workplaces"
                backgroundImage="images/banners/account-banner.png"
                buttonText="Shop Now"
                buttonUrl="#"
            />
            <nav className="breadcrumb-nav mb-3">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item active">My Account</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="dashboard">
                    <div className="container">
                        <ul className="nav nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
                            <Tabs selectedTabClassName="active show">
                                <div className="row">
                                    <aside className="col-md-4 col-lg-3 mb-md-0 mb-2">
                                        <TabList>
                                            <Tab className="nav-item">
                                                <span className="nav-link">Dashboard</span>
                                            </Tab>

                                            <Tab className="nav-item">
                                                <span className="nav-link">Orders</span>
                                            </Tab>

                                            <Tab className="nav-item">
                                                <span className="nav-link">Downloads</span>
                                            </Tab>

                                            <Tab className="nav-item">
                                                <span className="nav-link">Addresses</span>
                                            </Tab>

                                            <Tab className="nav-item">
                                                <span className="nav-link">Account Details</span>
                                            </Tab>

                                            <Tab className="nav-item">
                                                <span className="nav-link">Reset Password</span>
                                            </Tab>

                                            <Tab className="nav-item">
                                                <button className="nav-link" onClick={handleLogOut} style={{ width: '100%', textAlign: 'left' }}>Sign Out</button>
                                            </Tab>
                                        </TabList>
                                    </aside>

                                    <div className="col-md-8 col-lg-9" style={{ marginTop: "1rem" }}>
                                        <div className="tab-pane">
                                            <TabPanel>
                                                <p>Hello <span className="text-dark" style={{ textDecoration: "underline", fontWeight: "bold" }}>{userData?.name}</span> (not <span className="font-weight-normal text-dark">User</span>? <ALink href="/">Log out</ALink>)
                                                    <br />
                                                    From your account dashboard you can view your <a href="#tab-orders" onClick={toOrder} className="tab-trigger-link link-underline">recent orders</a>, manage your <a href="#tab-address" onClick={toAddress} className="tab-trigger-link">shipping and billing addresses</a>, and <a href="#tab-account" onClick={toAccount} className="tab-trigger-link">edit your password and account details</a>.</p>
                                            </TabPanel>

                                            <TabPanel>
                                                <p>No order has been made yet.</p>
                                                <ALink href="/collections/category/executive-chairs" className="btn btn-outline-primary-2"><span>GO SHOP</span><i className="icon-long-arrow-right"></i></ALink>
                                            </TabPanel>

                                            <TabPanel>
                                                <p>No downloads available yet.</p>
                                                <ALink href="/collections/category/executive-chairs" className="btn btn-outline-primary-2"><span>GO SHOP</span><i className="icon-long-arrow-right"></i></ALink>
                                            </TabPanel>

                                            <TabPanel>
                                                <p>The following addresses will be used on the checkout page by default.</p>
                                                <button className="btn btn-outline-primary-2 mb-3" onClick={openModal}>ADD NEW ADDRESS</button>

                                                <div className="row">
                                                    <div className="col-lg-6">

                                                        <h3 className="card-title mb-3">Default address</h3>

                                                        {useraddressList?.map((address, index) => (
                                                            address.default === 1 &&
                                                            <div className="card card-dashboard" key={index}>
                                                                <div className="card-body">

                                                                    <p>{address.address.name}<br />
                                                                        {address.address.DeliveryAddress}<br />
                                                                        {address.address.area}, {address.address.country}<br />
                                                                        {address.address.mobile}<br /></p>
                                                                    <div className="address_actions align-items-center" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                        <ALink href="#">Edit <i className="icon-edit"></i></ALink>
                                                                        <ALink href="#" style={{ cursor: 'not-allowed' }}>Delete <i className="icon-edit"></i></ALink>
                                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                            <label style={{ paddingRight: '5px', color: '#008482', fontWeight: 'bold' }}>Default address</label>
                                                                            <label className="switch" style={{ cursor: 'not-allowed', pointerEvents: 'none', opacity: '0.8' }}>
                                                                                <input
                                                                                    type="checkbox"
                                                                                    defaultChecked={address.default === 1 ? true : isdefault}
                                                                                // onChange={(e) => handleChangeSetDefault(e, index, address.id)}
                                                                                // onChange={() => { setIsDefault(!isdefault) }} 
                                                                                />
                                                                                <span className="slider round"></span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="col-lg-6">

                                                        <h3 className="card-title mb-3">Other Addresses</h3>

                                                        {useraddressList?.map((address, index) => (
                                                            address.default !== 1 &&
                                                            <div className="card card-dashboard" key={index}>
                                                                <div className="card-body">
                                                                    <p>{address.address.name}<br />
                                                                        {address.address.DeliveryAddress}<br />
                                                                        {address.address.area}, {address.address.country}<br />
                                                                        {address.address.mobile}<br /></p>
                                                                    <div className="address_actions align-items-center" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                        <ALink href="#">Edit <i className="icon-edit"></i></ALink>
                                                                        <button onClick={(e) => handleAddressDelete(e, address.id)} style={{ fontWeight: '600' }}>Delete <i className="icon-edit"></i></button>
                                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                            <label style={{ paddingRight: '5px', color: '#008482', fontWeight: 'bold' }}>Default address</label>
                                                                            <label className="switch">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    // checked={address.default === 1 ? true : isdefault}
                                                                                    value={isdefault}
                                                                                    onChange={(e) => handleChangeSetDefault(e, address.id)}
                                                                                />
                                                                                <span className="slider round"></span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {open &&
                                                    <Modal
                                                        isOpen={open}
                                                        style={customStyles}
                                                        contentLabel="login Modal"
                                                        className="modal-dialog"
                                                        overlayClassName="d-flex align-items-center justify-content-center"
                                                        id="address-modal"
                                                        onRequestClose={closeModal}
                                                        closeTimeoutMS={10}
                                                    >
                                                        <div className="modal-content">
                                                            <div className="modal-body">
                                                                <button type="button" className="close" onClick={closeModal}>
                                                                    <span aria-hidden="true"><i className="icon-close"></i></span>
                                                                </button>
                                                                <div className="form-box">
                                                                    <form>
                                                                        <div className="form-group">
                                                                            <label htmlFor="singin-email-2">Name *</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="singin-email-2"
                                                                                name="name"
                                                                                value={useraddressData?.name}
                                                                                onChange={handleAddressChange}
                                                                                required
                                                                            />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="singin-email-2">Mobile *</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="singin-email-2"
                                                                                name="mobile"
                                                                                value={useraddressData?.mobile}
                                                                                onChange={handleUserphone}
                                                                                required
                                                                            />
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
                                                                                    <label htmlFor="singin-email-2">Area *</label>
                                                                                    <select
                                                                                        className="form-control"
                                                                                        id="area"
                                                                                        name="area"
                                                                                        value={useraddressData?.area}
                                                                                        label="Select Area"
                                                                                        fullwidth="true"
                                                                                        style={{ color: "" }}
                                                                                        onChange={handleAddressChange}
                                                                                    >
                                                                                        <option value={""}>Select Area</option>
                                                                                        {areaList && areaList[0]?.regions?.map((item, index) => (
                                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                                        ))}
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="singin-email-2">Delivery Address *</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="singin-email-2"
                                                                                name="DeliveryAddress"
                                                                                placeholder="e.g. Apartment 4, Building name, Street 3"
                                                                                value={useraddressData?.DeliveryAddress}
                                                                                onChange={handleAddressChange}
                                                                                required
                                                                            />

                                                                        </div>


                                                                        <div className="form-footer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                                            <button
                                                                                type="button"
                                                                                onClick={handleAddressSubmit}
                                                                                className="btn btn-outline-primary-2">
                                                                                <span>Add Address</span>
                                                                                <i className="icon-long-arrow-right"></i>
                                                                            </button>
                                                                            {/* <div className="address_actions align-items-center" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                    <label style={{ paddingRight: '5px', color: '#008482', fontWeight: 'bold' }}>Default address</label>
                                                                                    <label className="switch">
                                                                                        <input type="checkbox" />
                                                                                        <span className="slider round"></span>
                                                                                    </label>
                                                                                </div>
                                                                            </div> */}
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Modal>
                                                }

                                            </TabPanel>

                                            <TabPanel>
                                                <form>
                                                    <label>Display Name *</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        className="form-control"
                                                        value={userData?.name}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label>Email address *</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={userData?.email}
                                                        // onChange={handleChange}
                                                        className="form-control"
                                                        readOnly
                                                    />

                                                    <input type="button" className="btn btn-outline-primary-2" value="SAVE CHANGES" onClick={handleSubmit} />
                                                </form>
                                            </TabPanel>

                                            <TabPanel>
                                                <form>
                                                    <label>Current password (leave blank to leave unchanged)</label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        value={userResetPassData?.password}
                                                        onChange={handleChangeResetPassword}
                                                        className="form-control"
                                                    />

                                                    <label>New password (leave blank to leave unchanged)</label>
                                                    <input
                                                        type="password"
                                                        name="newpassword"
                                                        value={userResetPassData?.newpassword}
                                                        onChange={handleChangeResetPassword}
                                                        className="form-control"
                                                    />

                                                    <label>Confirm new password</label>
                                                    <input
                                                        type="password"
                                                        name="confirmpassword"
                                                        value={userResetPassData?.confirmpassword}
                                                        onChange={handleChangeResetPassword}
                                                        className="form-control mb-2"
                                                    />

                                                    <input type="button" className="btn btn-outline-primary-2" value="SAVE CHANGES" onClick={handleResetPassword} />
                                                </form>
                                            </TabPanel>

                                            <TabPanel>
                                                <div></div>
                                            </TabPanel>
                                        </div>
                                    </div>
                                </div>
                            </Tabs>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(MyAccount);