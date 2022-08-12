import React, { useState, useEffect } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { useRouter } from 'next/router';
import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
import { API } from '~/http/API';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

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
    address: "",
    emirates: "",
    area: "",
}

Modal.setAppElement('body');

function MyAccount() {
    const router = useRouter();
    const [userData, setUserData] = useState({ ...userProfileData });
    const [userResetPassData, setUserResetPassData] = useState({ ...userResetPasswordData });
    const [useraddressData, setUserAddressData] = useState({ ...addressData });
    const [isuserdetail, setIsuserdetail] = useState(true);
    const [open, setOpen] = useState(false);
    const [isdefault, setIsDefault] = useState(true)
    let timer;

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
            // console.log("xauthtoken :: ", xauthtoken)
            let header = {
                headers: {
                    'Authorization': `Bearer ${xauthtoken}`,
                }
            }
            API.get(`/auth/me`, header).then((response) => {
                console.log("response :: ", response)
                localStorage.setItem('UserData', response?.data.id);
                setUserData(response?.data);
                setIsuserdetail(false);

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
                console.log("res :: ", response);
                if (response?.status === 200) {
                    toast.success("Done.")
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

    const handleAddressSubmit = () => {
        let formdata = { ...useraddressData };
        console.log("handleAddressSubmit :: ", formdata, isdefault)

    }

    const handleChangeResetPassword = (e) => {
        let formdata = { ...userResetPassData }
        formdata[e.target.name] = e.target.value;
        setUserResetPassData(formdata);
        console.log("handleResetPassword :: ", formdata);
    }

    const handleResetPassword = () => {
        let formdata = { ...userResetPassData }
        console.log("handleResetPassword :: ", formdata);
        if (userResetPassData?.password !== "" && userResetPassData?.newpassword !== "" && userResetPassData?.confirmpassword !== "" && userResetPassData?.newpassword === userResetPassData?.confirmpassword && userResetPassData?.password !== userResetPassData?.newpassword && userResetPassData?.newpassword.length >= 6) {
            alert("Valid data");
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
                                                        <div className="card card-dashboard">
                                                            <div className="card-body">
                                                                <h3 className="card-title">Default address</h3>

                                                                <p>User Name<br />
                                                                    User Company<br />
                                                                    John str<br />
                                                                    New York, NY 10001<br />
                                                                    1-234-987-6543<br />
                                                                    yourmail@mail.com<br /></p>
                                                                <div className="address_actions align-items-center" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                    <ALink href="#">Edit <i className="icon-edit"></i></ALink>
                                                                    <ALink href="#">Delete <i className="icon-edit"></i></ALink>
                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                        <label style={{ paddingRight: '5px', color: '#008482', fontWeight: 'bold' }}>Default address</label>
                                                                        <label class="switch">
                                                                            <input type="checkbox" checked={isdefault} onChange={() => { setIsDefault(!isdefault) }} />
                                                                            <span class="slider round"></span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="card card-dashboard">
                                                            <div className="card-body">
                                                                <h3 className="card-title">Other addresses</h3>

                                                                <p>You have not set up this type of address yet.<br />
                                                                    <ALink href="#">Edit <i className="icon-edit"></i></ALink></p>
                                                            </div>
                                                        </div>
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
                                                                                onChange={handleAddressChange}
                                                                                required
                                                                            />
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-lg-6">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="singin-email-2">Emirates *</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        id="singin-email-2"
                                                                                        name="emirates"
                                                                                        value={useraddressData?.emirates}
                                                                                        onChange={handleAddressChange}
                                                                                        required
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="singin-email-2">Area *</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        id="singin-email-2"
                                                                                        name="area"
                                                                                        value={useraddressData?.area}
                                                                                        onChange={handleAddressChange}
                                                                                        required
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="singin-email-2">Address *</label>
                                                                            <textarea
                                                                                id="reply-message"
                                                                                cols="30"
                                                                                rows="6"
                                                                                name="address"
                                                                                className="form-control mb-2"
                                                                                placeholder="e.g. Apartment 4, Building name, Street 3"
                                                                                value={useraddressData?.address}
                                                                                onChange={handleAddressChange}
                                                                                required>

                                                                            </textarea>
                                                                        </div>
                                                                        <div className="address_actions align-items-center" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                <label style={{ paddingRight: '5px', color: '#008482', fontWeight: 'bold' }}>Default address</label>
                                                                                <label class="switch">
                                                                                    <input type="checkbox" />
                                                                                    <span class="slider round"></span>
                                                                                </label>
                                                                            </div>
                                                                        </div>

                                                                        <div className="form-footer">
                                                                            <button
                                                                                type="button"
                                                                                onClick={handleAddressSubmit}
                                                                                className="btn btn-outline-primary-2">
                                                                                <span>Add Address</span>
                                                                                <i className="icon-long-arrow-right"></i>
                                                                            </button>
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
                                                        readonly='readonly'
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