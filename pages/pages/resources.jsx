import { useEffect, useState } from 'react';
import { useQuery } from "@apollo/react-hooks";
import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import { GET_HOME_DATA } from '~/server/queries';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import withApollo from '~/server/apollo';
import Reveal from 'react-awesome-reveal';
import { connect } from 'react-redux';
import { actions as demoAction } from '~/store/demo';
import OwlCarousel from '~/components/features/owl-carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Masonry from "react-responsive-masonry";

import { introSlider, fadeInUpShorter, fabricFinishedSlider } from '~/utils/data';
const axios = require('axios');

function Resources(props) {
    const { data, loading, error } = useQuery(GET_HOME_DATA);
    const posts = data && data.homeData.posts;

    const [resourcesdata, setResourcesdata] = useState();

    useEffect(() => {
        axios.get('https://prismcloudhosting.com/BAFCO_APIs/public/v1/api/pages/resources?en').then(function (response) {
            console.log(response.data.content);
            setResourcesdata(response.data.content)
        }).catch(function (error) {
            console.log(error);
        })
    }, [])

    return (
        <div className="main">
            <PageHeader
                title={resourcesdata?.banner?.heading}
                subTitle={resourcesdata?.banner?.sub_heading}
                backgroundImage={resourcesdata?.banner?.image}
                buttonText="Shop Now"
                buttonUrl="#"
            />

            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item active">{resourcesdata?.banner?.heading}</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content pb-3">
                <div className="container">

                    <div className="application-heading text-center mb-3">
                        <h3>Project References</h3>
                    </div>

                    <OwlCarousel adClass="owl-simple owl-light owl-nav-inside mb-3 project-references" options={introSlider}>
                        {resourcesdata?.projectReferences?.map((item, index) => (
                            <div className="intro-slide slide1" key={index} style={{ backgroundColor: '#EDF2F0', backgroundImage: `url(${item.image})` }}>
                                <div className="container intro-content">
                                    <div className="project-reference-slider-cont">
                                        <p className="lead text-primary">{item.sub_heading}</p>
                                        <h2 className="title">{item.heading}</h2>
                                        <div className="mb-2" dangerouslySetInnerHTML={{ __html: item.description }} />

                                        <ALink href={item.btn_url && item.btn_url === "" || item.btn_url === null || item.btn_url === undefined ? "#" : item.btn_url} className="btn btn-sm btn-minwidth btn-outline-primary-2">
                                            <span>View More</span>
                                            <i className="icon-long-arrow-right"></i>
                                        </ALink>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </OwlCarousel>

                    <div className="application-heading text-center mb-3">
                        <h3>Planning Ideas</h3>
                    </div>

                    <div className="row plannings-container-ideas mb-3">
                        <div className="col-lg-8 col-sm-8 col-xs-12">
                            <div className="planning-imgs">
                                <img src={resourcesdata?.planingIdeas[0]?.image} style={{ height: '445px' }} />
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-4 col-xs-12">
                            <div className="planning-imgs mb-2">
                                <img src={resourcesdata?.planingIdeas[1]?.image} />
                            </div>
                            <div className="planning-imgs">
                                <img src={resourcesdata?.planingIdeas[2]?.image} />
                            </div>
                        </div>
                    </div>

                    <div className="application-heading text-center mb-3">
                        <h3>Brochures and Images</h3>
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
                                    <TabPanel className="text-center" key={index}>
                                        <div className="mb-6">
                                            <Masonry columnsCount={3} gutter="15px">
                                                {item.categorieBrochures.map((item2, index2) => (
                                                    <div className="Workspace_img">
                                                        <img
                                                            key={index2}
                                                            src={item2.image}
                                                            style={{ width: "100%", display: "block" }}
                                                        />
                                                        <h3>{item2.title}</h3>
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
                <hr className="mb-6"/>
                <div className="container">
                    <div className="row plannings-container-ideas mb-3" style={{alignItems: 'center'}}>
                        <div className="col-lg-4 col-sm-6 col-xs-12">
                            <div className="application-heading mb-2">
                                <h3>{resourcesdata?.fabricFinished?.title}</h3>
                                <p>{resourcesdata?.fabricFinished?.sub_title}</p>
                            </div>
                            <div className="mb-2" dangerouslySetInnerHTML={{ __html: resourcesdata?.fabricFinished?.description }} />
                        </div>
                        <div className="col-lg-8 col-sm-6 col-xs-12">
                            <OwlCarousel adClass="owl-simple owl-light owl-nav-inside mb-3 fabric_finished" options={fabricFinishedSlider}>
                                {resourcesdata?.fabricFinished?.fabricFinished_images?.map((item, index) => (
                                    <div key={index}>
                                        <img src={item.avatar} style={{ height: '325px' }} />
                                    </div>
                                ))}
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

// export default React.memo(Innovations);
// export default withApollo({ ssr: typeof window == 'undefined' })(Innovations);
export default withApollo({ ssr: typeof window == undefined })(connect(null, { ...demoAction })(Resources));