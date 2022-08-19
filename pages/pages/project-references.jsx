import { useEffect, useState } from 'react';
import { useQuery } from "@apollo/react-hooks";
import ALink from '~/components/features/alink';
import { GET_HOME_DATA } from '~/server/queries';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import withApollo from '~/server/apollo';
import { connect } from 'react-redux';
import { actions as demoAction } from '~/store/demo';
import OwlCarousel from '~/components/features/owl-carousel';
import Masonry from "react-responsive-masonry";
import { fabricFinishedSlider } from '~/utils/data';
const axios = require('axios');

function ProjectReferences(props) {
    const { data, loading, error } = useQuery(GET_HOME_DATA);
    const posts = data && data.homeData.posts;

    const [resourcesdata, setResourcesdata] = useState();

    useEffect(() => {
        axios.get('https://prismcloudhosting.com/BAFCO_APIs/public/v1/api/pages/resources?en').then(function (response) {
            setResourcesdata(response.data.content)
        }).catch(function (error) {
            console.log(error);
        })
    }, [])

    return (
        <div className="main prefrences-page">
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/pages/resources">Resources</ALink>
                        </li>
                        <li className="breadcrumb-item active">Project References</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content pb-0">
                <div className="container">

                    <div className="application-heading mb-5 text-center">
                        <h3>Project Gallery</h3>
                        <p className='subtitle'>
                            Workspaces as unique as the people who work in them.
                        </p>
                        <p>
                            Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue.Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue.Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue.Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu
                        </p>
                    </div>

                    <div className="application-heading text-center mb-3">
                        <h3>Furniture</h3>
                    </div>

                    <div className="top-management-application-tabs">
                        <Tabs defaultIndex={0} selectedTabClassName="show">
                            <TabList className="nav nav-pills justify-content-center mb-3" id="tabs-6" role="tablist">
                                {/* <Tab className="nav-item">
                                    <span className="nav-link">All Products</span>
                                </Tab> */}
                                {resourcesdata?.brochures?.map((item, index) => (
                                    <Tab className="nav-item" key={index}>
                                        <span className="nav-link">{item.categorie}</span>
                                    </Tab>
                                ))}
                            </TabList>
                            <div className="tab-pane tab-content">
                                {resourcesdata?.brochures?.map((item, index) => (
                                    <TabPanel key={index}>
                                        <div className="mb-6">
                                            <Masonry columnsCount={4} gutter="15px">
                                                {item.categorieBrochures.map((item2, index2) => (
                                                    <div className="furnitureWrper">
                                                        <img
                                                            key={index2}
                                                            src={item2.image}
                                                            style={{ width: "100%", height: "250px", display: "block" }}
                                                        />
                                                        <div className="furnitureContent">
                                                            <p className="lead">Lorem Ipsum</p>
                                                            <h3>{item2.title}</h3>
                                                        </div>
                                                    </div>
                                                ))}
                                            </Masonry>
                                        </div>
                                    </TabPanel>
                                ))}
                            </div>
                        </Tabs>
                    </div>
                </div>

                <div className='formwrapper'>
                    <div className="container">
                        <div className="row plannings-container-ideas" style={{ alignItems: 'center' }}>
                            <div className="col-lg-6 col-sm-6 col-xs-12">
                                <div className="application-heading mb-3">
                                    <h3>Are you creating a project and looking
                                        for solutions?
                                    </h3>
                                    <h3>
                                        Do you happen to like one of the
                                        products and would like to learn
                                        more?
                                    </h3>
                                    <h3>
                                        DO you need swatches?
                                    </h3>
                                    <h3>
                                        Contact us !
                                    </h3>
                                </div>
                                <p className="fbsubtitle">Architects Support</p>
                                <p className="fbsubtitle">
                                    e: info@bafco.eu <br />
                                    t: +12 345 67 89 01</p>
                            </div>
                            <div className="col-lg-6 col-sm-6 col-xs-12">
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="name" placeholder="Name & Surname *" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control" id="email" placeholder="E-mail *" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="subject" placeholder="Subject" required />
                                    </div>
                                    <div className="form-group">
                                        <textarea class="form-control" id="message" rows="3" required placeholder="Message"
                                            style={{ resize: "none" }}
                                        ></textarea>
                                    </div>
                                    <div className="form-group form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label ml-3" for="exampleCheck1">Signup for Our Nwesletter</label>
                                    </div>
                                    <div className="form-group form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label ml-3" for="exampleCheck1">I have read and accept the Privacy Policy</label>
                                    </div>
                                    <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
                                        <span>Send</span>
                                        <i className="icon-long-arrow-right"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

// export default React.memo(Innovations);
// export default withApollo({ ssr: typeof window == 'undefined' })(Innovations);
export default withApollo({ ssr: typeof window == undefined })(connect(null, { ...demoAction })(ProjectReferences));