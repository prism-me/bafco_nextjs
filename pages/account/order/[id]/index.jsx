import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
import Modal from 'react-modal';
import { API } from '~/http/API';

Modal.setAppElement('body');

function TrackingOrder() {
    const router = useRouter();
    const OrderId = router?.query?.id;
    const [trackingprocess, setTrackingprocess] = useState();

    useEffect(() => {

        let xauthtoken = localStorage.getItem('authtoken');

        let header = {
            headers: {
                'Authorization': `Bearer ${xauthtoken}`,
            }
        }
        API.get(`/auth/track-order/${OrderId}`, header).then((response) => {
            setTrackingprocess(response?.data?.status);

        }).catch((err) => console.log(err));


    }, [OrderId]);

    return (
        <div className="main">
            <PageHeader
                title="Track Your Order"
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
                        <li className="breadcrumb-item active">Order Tracker</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="dashboard">
                    <div className="container">

                        <div className="padding-bottom-3x mb-1">
                            <div className="card mb-3">
                                <div className="p-4 text-center text-white text-lg rounded-top" style={{ backgroundColor: "#008482" }}>
                                    <span className="text-uppercase">Tracking Order No - </span><span className="text-medium">{OrderId}</span>
                                </div>
                                {/* <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2">
                                    <div className="w-100 text-center py-1 px-2"><span className="text-medium">Shipped Via:</span> UPS Ground</div>
                                    <div className="w-100 text-center py-1 px-2"><span className="text-medium">Status:</span> Checking Quality</div>
                                    <div className="w-100 text-center py-1 px-2"><span className="text-medium">Expected Date:</span> APR 27, 2021</div>
                                </div> */}
                                <div className="card-body">
                                    {trackingprocess === "ORDERPLACED" &&
                                        <div className="order_placed_note">
                                            <p>Order Placed, Your Order will be updated Soon</p>
                                        </div>
                                    }
                                    {trackingprocess === "ORDERCANCELLED" &&
                                        <div className="order_placed_note">
                                            <p>No Record Found Please Try Again</p>
                                        </div>
                                    }
                                    <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between mt-3 padding-top-2x padding-bottom-1x">
                                        <div className={`step ${trackingprocess === "ORDERCONFIRMED" ? "completed" :
                                            trackingprocess === "ORDERDISPATCHED" ? "completed" :
                                                trackingprocess === "ORDERDELIVERED" ? "completed" : ""}`}>
                                            <div className="step-icon-wrap">
                                                <div className="step-icon"><i className="pe-7s-cart"></i></div>
                                            </div>
                                            <h4 className="step-title">Confirmed Order</h4>
                                        </div>
                                        {/* <div className="step completed">
                                            <div className="step-icon-wrap">
                                                <div className="step-icon"><i className="pe-7s-config"></i></div>
                                            </div>
                                            <h4 className="step-title">Processing Order</h4>
                                        </div> */}
                                        {/* <div className="step completed">
                                            <div className="step-icon-wrap">
                                                <div className="step-icon"><i className="pe-7s-medal"></i></div>
                                            </div>
                                            <h4 className="step-title">Quality Check</h4>
                                        </div> */}
                                        <div className={`step ${trackingprocess === "ORDERDISPATCHED" ? "completed" :
                                            trackingprocess === "ORDERDELIVERED" ? "completed" : ""}`}>
                                            <div className="step-icon-wrap">
                                                <div className="step-icon"><i className="pe-7s-car"></i></div>
                                            </div>
                                            <h4 className="step-title">Product Dispatched</h4>
                                        </div>
                                        <div className={`step ${trackingprocess === "ORDERDELIVERED" ? "completed" : ""}`}>
                                            <div className="step-icon-wrap">
                                                <div className="step-icon"><i className="pe-7s-home"></i></div>
                                            </div>
                                            <h4 className="step-title">Product Delivered</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
                                {/* <div className="custom-control custom-checkbox mr-3">
                                    <input className="custom-control-input" type="checkbox" id="notify_me" defaultChecked="" />
                                    <label className="custom-control-label" htmlFor="notify_me">Notify me when order is delivered</label>
                                </div> */}
                                <div className="text-left text-sm-right"><a className="btn btn-outline-primary btn-rounded btn-sm" href="/account"><i className="icon-long-arrow-left"></i>Back to your account</a></div>
                            </div>
                        </div>

                    </div>
                </div >
            </div >
        </div >
    )
}

export default React.memo(TrackingOrder);