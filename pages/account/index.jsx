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
    phone_number: "",
    address_line1: "",
    address_line2: "",
    postal_code: "",
    country: "",
    state: "",
    city: "",
    address_type: "Billing",
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
    const [openOrderDetail, setOpenOrderDetail] = useState(false);
    const [isdefault, setIsDefault] = useState(false);
    const [countryList, setCountryList] = useState();
    const [stateList, setStateList] = useState();
    const [editAddressID, setEditAddressID] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const [singleOrderID, setSingleOrderID] = useState();
    const [singleOrderDetails, setSingleOrderDetails] = useState();

    let timer;

    useEffect(() => {
        let country = [];
        CountryRegionData?.map((item) => {
            country.push(item.countryName);
        })
        setCountryList(country);

        let stateList = [];
        stateList = CountryRegionData.filter(item => {
            return item.countryName === "United Arab Emirates";
        });
        setStateList(stateList);
    }, []);

    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        let token = localStorage.getItem("authToken") || ""
        API.get(`/auth/order-detail/${singleOrderID}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response?.data);
            setSingleOrderDetails(response?.data);
        });
    }, [singleOrderID]);

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
    function closeOrderDetailModal() {
        document.getElementById("order-modal").classList.remove("ReactModal__Content--after-open");

        if (document.querySelector(".ReactModal__Overlay")) {
            document.querySelector(".ReactModal__Overlay").style.opaarea = '0';
        }

        timer = setTimeout(() => {
            setOpenOrderDetail(false);
        }, 350);

    }

    function openOrderDetailModal(e) {
        // e.preventDefault();
        setOpenOrderDetail(true);
    }

    useEffect(() => {

        let xauthtoken = localStorage.getItem('authtoken');
        let UserId = localStorage.getItem('UserData');

        let header = {
            headers: {
                'Authorization': `Bearer ${xauthtoken}`,
            }
        }
        if (isEdit) {
            API.get(`/address-detail/${editAddressID}`, header).then((response) => {
                setUserAddressData(response?.data);

            }).catch((err) => console.log(err));

        }

    }, [editAddressID]);

    const handleEditAddress = (e, id) => {
        e.preventDefault();
        console.log("editAddressID ::", id)
        setEditAddressID(id)
        setOpen(true);
        setIsEdit(true);
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

            API.get(`/user-order-detail/${UserId}`, header).then((response) => {
                setOrderList(response?.data);
                console.log("user-order-detail :: ", response?.data);

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

    // const handleCountryChange = (e) => {

    //     let formdata = { ...useraddressData }
    //     formdata.country = e.target.value;
    //     setUserAddressData(formdata);

    //     let stateList = [];
    //     stateList = CountryRegionData.filter(item => {
    //         return item.countryName === e.target.value;
    //     });
    //     setStateList(stateList);

    // }

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

        if (useraddressData?.name !== "" &&
            useraddressData?.phone_number !== "" &&
            useraddressData?.address_line1 !== "" &&
            useraddressData?.country !== "" &&
            useraddressData?.state !== "" &&
            useraddressData?.postal_code !== "" &&
            useraddressData?.address_type !== "" &&
            useraddressData?.city !== ""
        ) {
            if (isEdit) {
                let formdata = {
                    'id': useraddressData.id,
                    'user_id': UserId,
                    'name': useraddressData?.name,
                    'phone_number': useraddressData?.phone_number,
                    'address_line1': useraddressData?.address_line1,
                    'address_line2': useraddressData?.address_line2,
                    'postal_code': useraddressData?.postal_code,
                    'country': useraddressData?.country,
                    'state': useraddressData?.state,
                    'city': useraddressData?.city,
                    'address_type': useraddressData?.address_type,
                };

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
                let formdata = {
                    'user_id': UserId,
                    'name': useraddressData?.name,
                    'phone_number': useraddressData?.phone_number,
                    'address_line1': useraddressData?.address_line1,
                    'address_line2': useraddressData?.address_line2,
                    'postal_code': useraddressData?.postal_code,
                    'country': useraddressData?.country,
                    'state': useraddressData?.state,
                    'city': useraddressData?.city,
                    'address_type': useraddressData?.address_type,
                };

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

            }

        } else {
            if (useraddressData?.name === "") {
                toast.warning("Please enter a name before submit.")
                return
            } else if (useraddressData?.phone_number === "") {
                toast.warning("Please enter a phone number before submit.")
                return
            } else if (useraddressData?.address_line1 === "") {
                toast.warning("Please enter a Address before submit.")
                return
            } else if (useraddressData?.country === "") {
                toast.warning("Please select country before submit.")
                return
            } else if (useraddressData?.state === "") {
                toast.warning("Please select state before submit.")
                return
            } else if (useraddressData?.city === "") {
                toast.warning("Please enter a city before submit.")
                return
            } else if (useraddressData?.address_type === "") {
                toast.warning("Please enter a address type before submit.")
                return
            } else if (useraddressData?.postal_code === "") {
                toast.warning("Please enter a postal code before submit.")
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
                subTitle=""
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

                                            {/* <Tab className="nav-item">
                                                <span className="nav-link">Downloads</span>
                                            </Tab> */}

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
                                                {orderList?.length < 0 ?
                                                    <>
                                                        <p>No order has been made yet.</p>
                                                        <ALink href="/" className="btn btn-outline-primary-2"><span>GO SHOP</span><i className="icon-long-arrow-right"></i></ALink>
                                                    </> :
                                                    <div className="order-list orderDetailsOrderList">
                                                        <div className="list_box orderDetailsTableDiv">
                                                            {/* <p>View your order history.</p> */}
                                                            <table className="table table-striped  justify-content-center">
                                                                <thead className="text-center">
                                                                    <tr>
                                                                        <th>Order Number</th>
                                                                        <th>Shipment Status</th>
                                                                        <th>Total</th>
                                                                        <th>View Details</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="text-center">
                                                                    {orderList?.map((order, index) => (
                                                                        <tr key={index}>
                                                                            <td className="td_product"><span>{order?.order_number}</span></td>
                                                                            <td className="td_product"><span>{order?.status}</span></td>
                                                                            <td className="td_product"><span>{order?.total}</span></td>
                                                                            <td className="td_product">
                                                                                <span onClick={() => {
                                                                                    setSingleOrderID(order?.id)
                                                                                    openOrderDetailModal()
                                                                                }}>
                                                                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" className="action-icon-details" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z">
                                                                                        </path>
                                                                                    </svg>
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                }
                                                {openOrderDetail &&
                                                    <Modal
                                                        isOpen={openOrderDetail}
                                                        style={customStyles}
                                                        contentLabel="order Modal"
                                                        className="modal-dialog"
                                                        overlayClassName="d-flex align-items-center justify-content-center"
                                                        id="order-modal"
                                                        onRequestClose={closeOrderDetailModal}
                                                        closeTimeoutMS={10}
                                                    >
                                                        <div className="modal-content">
                                                            <div className="orderdetailModelheader modal-header">
                                                                <div className="modal-title h4" id="contained-modal-title-vcenter">Order Details</div>
                                                                <button type="button" className="close" onClick={closeOrderDetailModal}>
                                                                    <span aria-hidden="true">×</span>
                                                                    <span className="sr-only">Close</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="orderdetailbody">
                                                                    <div>
                                                                        <div className="row">
                                                                            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                                                                                <h6 className="h6title">Order ID</h6>
                                                                            </div>
                                                                            <div className="col">
                                                                                <p>{singleOrderDetails?.order_number}</p>
                                                                            </div>
                                                                            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                                                                                <h6 className="h6title">Shipping Charges</h6>
                                                                            </div>
                                                                            <div className="col">
                                                                                <p>{singleOrderDetails?.shipping_charges}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                                                                                <h6 className="h6title">User Name</h6>
                                                                            </div>
                                                                            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                                                                                <p>{singleOrderDetails?.user_detail?.name}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                                                                                <h6 className="h6title">Total Amount</h6>
                                                                            </div>
                                                                            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                                                                                <p>{singleOrderDetails?.total}</p>
                                                                            </div>
                                                                            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                                                                                <h6 className="h6title">Paid Amount</h6>
                                                                            </div>
                                                                            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                                                                                <p>{singleOrderDetails?.total}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                                                                                <h6 className="h6title">Date</h6>
                                                                            </div>
                                                                            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                                                                                <p>{new Date(singleOrderDetails?.created_at).toLocaleDateString()}</p>
                                                                            </div>
                                                                            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                                                                                <h6 className="h6title">Status</h6>
                                                                            </div>
                                                                            <div className="col-lg-3 col-md-6 col-sm-6 col-12">{singleOrderDetails?.status}</div>
                                                                        </div>
                                                                        <div className="row">
                                                                        </div>
                                                                    </div>
                                                                    <h6 className="h6title">Products List</h6>
                                                                    <div className="mt-2 tableScroll" id="table-wrapper">
                                                                        <div id="table-scroll">
                                                                            <table className="orderDetailsTableClient table">
                                                                                <thead>
                                                                                    <td>Image</td>
                                                                                    <td>Name</td>
                                                                                    <td>Product Code</td>
                                                                                    <td>Quantity</td>
                                                                                    <td>Price</td>
                                                                                    <td>Sub Total</td>
                                                                                </thead>
                                                                                <tbody className="orderDetailModelTableBody">
                                                                                    {singleOrderDetails?.order_details?.map((item, index) => (
                                                                                        <tr key={index}>
                                                                                            <td className="td_product td_productImg">
                                                                                                <img src={item?.variation_detail?.images[0]?.avatar} alt="" className="orderdetailImg" width="100" />
                                                                                            </td>
                                                                                            <td className="td_product">
                                                                                                <span>
                                                                                                    <span className="productNameStyle">{item?.product_detail?.name}</span>
                                                                                                </span>
                                                                                            </td>
                                                                                            <td className="td_product_code">
                                                                                                <span>{item?.variation_detail?.code}</span>
                                                                                            </td>

                                                                                            <td className="td_product">
                                                                                                <span>{item?.qty}</span>
                                                                                            </td>
                                                                                            <td className="td_product">
                                                                                                <span>{item?.price}</span>
                                                                                            </td>
                                                                                            <td className="td_product">
                                                                                                <span>{item?.total}</span>
                                                                                            </td>
                                                                                        </tr>

                                                                                    ))}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Modal>
                                                }
                                            </TabPanel>

                                            {/* <TabPanel>
                                                <p>No downloads available yet.</p>
                                                <ALink href="/collections/category/executive-chairs" className="btn btn-outline-primary-2"><span>GO SHOP</span><i className="icon-long-arrow-right"></i></ALink>
                                            </TabPanel> */}

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
                                                                    <h3 className="card-title">{address.name}</h3>
                                                                    <p>{address.address_line1}<br />
                                                                        {address.address_line2}, {address.postal_code}, {address.city}<br />
                                                                        {address.state}, {address.country}<br />
                                                                        {address.phone_number}<br /></p>
                                                                    <div className="address_actions align-items-center" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                        <button onClick={(e) => handleEditAddress(e, address.id)} style={{ fontWeight: '600' }}>Edit <i className="icon-edit"></i></button>
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
                                                                    <h3 className="card-title">{address.name}</h3>
                                                                    <p> {address.address_line1}<br />
                                                                        {address.address_line2}, {address.postal_code}, {address.city}<br />
                                                                        {address.state}, {address.country}<br />
                                                                        {address.phone_number}<br /></p>
                                                                    <div className="address_actions align-items-center" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                        <button onClick={(e) => handleEditAddress(e, address.id)} style={{ fontWeight: '600' }}>Edit <i className="icon-edit"></i></button>
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
                                                                        <div className="row">
                                                                            <div className="col-lg-6">
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
                                                                            </div>
                                                                            <div className="col-lg-6">
                                                                                <div className="form-group">
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
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-lg-6">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="singin-email-2">Country *</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        id="singin-email-2"
                                                                                        name="country"
                                                                                        placeholder=""
                                                                                        value={useraddressData?.country}
                                                                                        onChange={handleAddressChange}
                                                                                        required
                                                                                    />
                                                                                    {/* <select
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
                                                                                    </select> */}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="singin-email-2">State *</label>
                                                                                    {/* <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        id="singin-email-2"
                                                                                        name="state"
                                                                                        placeholder=""
                                                                                        value={useraddressData?.state}
                                                                                        onChange={handleAddressChange}
                                                                                        required
                                                                                    /> */}
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
                                                                                    <label htmlFor="singin-email-2">City *</label>
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
                                                                                    <label htmlFor="singin-email-2">Postal Code *</label>
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
                                                                        <div className="form-group">
                                                                            <label htmlFor="singin-email-2">Address Line 1 *</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="singin-email-2"
                                                                                name="address_line1"
                                                                                placeholder="e.g. Apartment 4, Building name, Street 3"
                                                                                value={useraddressData?.address_line1}
                                                                                onChange={handleAddressChange}
                                                                                required
                                                                            />

                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="singin-email-2">Address Line 2</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="singin-email-2"
                                                                                name="address_line2"
                                                                                placeholder=""
                                                                                value={useraddressData?.address_line2}
                                                                                onChange={handleAddressChange}
                                                                            />

                                                                        </div>
                                                                        {/* <div className="form-group">
                                                                            <label htmlFor="singin-email-2">Address Type *</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="singin-email-2"
                                                                                name="address_type"
                                                                                placeholder="Shipping OR Billing"
                                                                                value={useraddressData?.address_type}
                                                                                onChange={handleAddressChange}
                                                                            />

                                                                        </div> */}

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
                </div >
            </div >
        </div >
    )
}

export default React.memo(MyAccount);