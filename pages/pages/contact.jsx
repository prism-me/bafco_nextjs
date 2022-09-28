import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from "react";
import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import { toast } from 'react-toastify';
import { Tab, Tabs, TabPanel, TabList } from 'react-tabs';
import Files from 'react-files';

const axios = require('axios');

const MapComponent = ({ text }) => <div>{text}</div>;

const contactForm = {
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    attachment: "",
    form_type: "contact_form",
};

function Contact() {
    const [contactusdata, setContactusdata] = useState();
    const [contactFormData, setcontactFormData] = useState({ ...contactForm });


    useEffect(() => {

        axios.get('https://prismcloudhosting.com/BAFCO_APIs/public/v1/api/contact-us').then(function (response) {
            // handle success
            setContactusdata(response.data.content)
        }).catch(function (error) {
            // handle error
            console.log(error);
        })

    }, []);

    const handleInit = (e) => {
        let formdata = { ...contactFormData }
        formdata[e.target.name] = e.target.value;
        setcontactFormData(formdata);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedData = { ...contactFormData };

        if (updatedData.email === "" && updatedData.name === "" && updatedData.phone === "" && updatedData.subject === "") {
            toast.success("Please enter your Data");
        } else if (updatedData.email === "") {
            toast.success("Please enter your Email");
        } else if (updatedData.name === "") {
            toast.success("Please enter your Name");
        } else if (updatedData.phone === "") {
            toast.success("Please enter your Phone number");
        } else if (updatedData.subject === "") {
            toast.success("Please enter your Subject");
        } else {
            console.log("updatedData :: ", updatedData)
            axios.post('https://prismcloudhosting.com/BAFCO_APIs/public/v1/api/form-submit', updatedData).then(function (response) {
                toast.success(response?.data);
            }).catch(function (error) {
                console.log(error);
            });
        }

    };

    const onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }

    const onFilesChange = (files) => {
        console.log(files)
        let formdata = { ...contactFormData }
        formdata.attachment = files;
        setcontactFormData(formdata);
        console.log("formdata :: ", formdata)
    }

    return (
        <div className="main">
            <PageHeader
                title={contactusdata?.banner?.heading}
                subTitle={contactusdata?.banner?.sub_heading}
                backgroundImage={contactusdata?.banner?.image}
                buttonText=""
                buttonUrl="#"
            />
            <nav className="breadcrumb-nav border-0 mb-0">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item active">{contactusdata?.banner?.heading}</li>
                    </ol>
                </div>
            </nav>
            <div className="page-content pb-0">

                <div className="container">
                    <hr className="mt-3 mb-5 mt-md-1" />
                    <div className="row">
                        <div className="col-lg-6 mb-2 mb-lg-0">
                            <h2 className="title mb-1">Your story begins here.</h2>
                            <p className="mb-3">Come and see us at our showrooms in Dubai and Abu Dhabi, where you can try out our collections and see the range of fabrics and finishes available to customise your space. <br /> Call us at our toll-free hotline at <a href="tel:800-BAFCO (22326)">800-BAFCO (22326)</a>.</p>
                            <div className="row">
                                {contactusdata?.contact?.map((item, index) => (
                                    <div className="col-sm-6" key={index}>
                                        <div className="contact-info">
                                            <h3>{item.heading}</h3>

                                            <ul className="contact-list">
                                                <li>
                                                    <i className="icon-map-marker"></i>
                                                    {item.address}
                                                </li>
                                                <li>
                                                    <i className="icon-phone" style={{color: '#008482'}}></i>
                                                    <a href={`tel:${item.number}`}>{item.number}</a>
                                                </li>
                                                <li>
                                                    <i className="icon-envelope" style={{color: '#008482'}}></i>
                                                    <a href={`mailto:${item.email}`}>{item.email}</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-1"></div>
                        <div className="col-lg-5">
                            <h2 className="title mb-1">{contactusdata?.getInTouch?.heading}</h2>
                            <p className="lead text-primary">{contactusdata?.getInTouch?.sub_heading}</p>
                            <div className="mb-3" dangerouslySetInnerHTML={{ __html: contactusdata?.getInTouch?.description }} />

                            <form className="contact-form mb-2">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <label htmlFor="cname" className="sr-only">Name</label>
                                        <input type="text" className="form-control" name="name" placeholder="Name *" onChange={handleInit} required />
                                    </div>

                                    <div className="col-sm-4">
                                        <label htmlFor="cemail" className="sr-only">Email</label>
                                        <input type="email" className="form-control" name="email" placeholder="Email *" onChange={handleInit} required />
                                    </div>

                                    <div className="col-sm-4">
                                        <label htmlFor="cphone" className="sr-only">Phone</label>
                                        <input type="tel" className="form-control" name="phone" placeholder="Phone" onChange={handleInit} />
                                    </div>

                                </div>

                                <label htmlFor="csubject" className="sr-only">Subject</label>
                                <input type="text" className="form-control" name="subject" placeholder="Subject" onChange={handleInit} />

                                <label htmlFor="cmessage" className="sr-only">Message</label>
                                <textarea
                                    className="form-control"
                                    cols="30"
                                    rows="4"
                                    name="message"
                                    required
                                    placeholder="Message *"
                                    onChange={handleInit}
                                >
                                </textarea>

                                <div className="files mb-3">
                                    <Files
                                        className='files-dropzone'
                                        onChange={onFilesChange}
                                        onError={onFilesError}
                                        accepts={['image/png', '.pdf', 'audio/*']}
                                        multiple = "true"
                                        maxFileSize={10000000}
                                        minFileSize={0}
                                        clickable
                                    >
                                        <img src="images/icons/Uploadsvg.png" />Drop files here or click to upload
                                    </Files>
                                </div>

                                <div className="text-center">
                                    <button type="button" onClick={handleSubmit} className="btn btn-outline-primary-2 btn-minwidth-sm">
                                        <span>SUBMIT</span>
                                        <i className="icon-long-arrow-right"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <hr className="mt-3 mb-5 mt-md-1" />
                </div>
                <Tabs defaultIndex={0} selectedTabClassName="show">
                    <div className="heading heading-center mb-3">
                        {/* <h2 className="title">Top Selling Products</h2> */}
                        <TabList className="nav nav-pills nav-border-anim justify-content-center">
                            <Tab className="nav-item">
                                <span className="nav-link">Dubai</span>
                            </Tab>
                            <Tab className="nav-item">
                                <span className="nav-link">Abu Dhabi</span>
                            </Tab>
                        </TabList>
                    </div>

                    <TabPanel>
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

                    </TabPanel>

                    <TabPanel>
                        <div id="map" className="w-100 mb-5">
                            <div className="mapouter">
                                <div className="gmap_canvas">
                                    <iframe
                                        id="gmap_canvas"
                                        src="https://maps.google.com/maps?q=BAFCO%20Showroom,%20G/F,%20Hareb%20Tower%20Sheikh,%20Airport%20Road%20%E2%80%93%20Old%20Rashid%20Bin%20Saeed%20Al%20Maktoum%20St.%20(2nd%20Street)%20Abu%20Dhabi,%20UAE&t=&z=13&ie=UTF8&iwloc=&output=embed"
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

                    </TabPanel>
                </Tabs>
            </div>
        </div >
    )
}

export default Contact;