import GoogleMapReact from 'google-map-react';

import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";

const MapComponent = ({ text }) => <div>{text}</div>;

function Contact() {
    return (
        <div className="main">
            <PageHeader
                title="Contact us"
                subTitle="Lorem ipsum"
                backgroundImage="images/contact-header-bg.jpg"
                buttonText="Shop Now"
                buttonUrl="#"
            />
            <nav className="breadcrumb-nav border-0 mb-0">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item active">Contact Us</li>
                    </ol>
                </div>
            </nav>
            <div className="page-content pb-0">

                <div className="container">
                    <hr className="mt-3 mb-5 mt-md-1" />
                    <div className="row">
                        <div className="col-lg-6 mb-2 mb-lg-0">
                            <h2 className="title mb-1">Contact Information</h2>
                            <p className="mb-3">Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p>
                            <div className="row">
                                <div className="col-sm-7">
                                    <div className="contact-info">
                                        <h3>The Dubai Office</h3>

                                        <ul className="contact-list">
                                            <li>
                                                <i className="icon-map-marker"></i>
                                                BAFCO Office & Showroom Ground Floor, Al Manara Building (near Al Safa Metro Station) Sheikh Zayed Road, Dubai, UAE
                                            </li>
                                            <li>
                                                <i className="icon-phone"></i>
                                                <a href="tel:+9714 324 4424">+9714 324 4424</a>
                                            </li>
                                            <li>
                                                <i className="icon-envelope"></i>
                                                <a href="mailto:hello@gmail.com">hello@gmail.com</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-sm-5">
                                    <div className="contact-info">
                                        <h3>The Abu Dhabi Office</h3>

                                        <ul className="contact-list">
                                            <li>
                                                <i className="icon-map-marker"></i>
                                                Mezzanine Floor, Hareb Tower Sheikh, Airport Road – Old Rashid Bin Saeed Al Maktoum St. (2nd Street) Abu Dhabi, UAE
                                            </li>
                                            <li>
                                                <i className="icon-phone"></i>
                                                <a href="tel:+9714 324 4424">+9714 324 4424</a>
                                            </li>
                                            <li>
                                                <i className="icon-envelope"></i>
                                                <a href="mailto:hello@gmail.com">hello@gmail.com</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <h2 className="title mb-1">Get In Touch</h2>
                            <p className="lead text-primary">
                                We collaborate with ambitious brands and people; we’d love to build something great together.
                            </p>
                            <p className="mb-3">Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p>

                            <form action="#" className="contact-form mb-2">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <label htmlFor="cname" className="sr-only">Name</label>
                                        <input type="text" className="form-control" id="cname" placeholder="Name *" required />
                                    </div>

                                    <div className="col-sm-4">
                                        <label htmlFor="cemail" className="sr-only">Name</label>
                                        <input type="email" className="form-control" id="cemail" placeholder="Email *" required />
                                    </div>

                                    <div className="col-sm-4">
                                        <label htmlFor="cphone" className="sr-only">Phone</label>
                                        <input type="tel" className="form-control" id="cphone" placeholder="Phone" />
                                    </div>
                                </div>

                                <label htmlFor="csubject" className="sr-only">Subject</label>
                                <input type="text" className="form-control" id="csubject" placeholder="Subject" />

                                <label htmlFor="cmessage" className="sr-only">Message</label>
                                <textarea className="form-control" cols="30" rows="4" id="cmessage" required placeholder="Message *"></textarea>

                                <div className="text-center">
                                    <button type="submit" className="btn btn-outline-primary-2 btn-minwidth-sm">
                                        <span>SUBMIT</span>
                                        <i className="icon-long-arrow-right"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <hr className="mt-3 mb-5 mt-md-1" />
                </div>
                <div id="map" className="w-100 mb-5">
                    <div className="mapouter">
                        <div className="gmap_canvas">
                            <iframe
                                id="gmap_canvas"
                                src="https://maps.google.com/maps?q=BAFCO%20Showroom,%20Ground%20Floor,%20Al%20Manara%20Building%20-%20Dubai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"
                                style={{ width: "100%", height: "492px" }}
                            ></iframe>
                        </div>
                    </div>

                    {/* <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyBgVsModMpsR59_OIK-2sEcmhBBkW4xUuw' }}
                        defaultCenter={{ lat: 55.22, lng: 25.15 }}
                        defaultZoom={11}
                    >
                        <MapComponent
                            lat={55.226221}
                            lng={25.1506752}
                            text="My Marker"
                        />
                    </GoogleMapReact> */}
                </div>
            </div>
        </div>
    )
}

export default Contact;