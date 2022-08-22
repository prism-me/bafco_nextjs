import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import ALink from '~/components/features/alink';
import withApollo from '~/server/apollo';
import { actions as demoAction } from '~/store/demo';
import OwlCarousel from '~/components/features/owl-carousel';
import { projectReferenceInnerSlider } from '~/utils/data';


const axios = require('axios');

function ProjectReferencesInner(props) {
    const slug = useRouter().query.slug;
  

    return (
        <div className="main prefrencesInner-page">
        <nav className="breadcrumb-nav">
            <div className="container">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <ALink href="/">Home</ALink>
                    </li>
                    <li className="breadcrumb-item">
                            <ALink href="/pages/resources">Resources</ALink>
                        </li>
                    <li className="breadcrumb-item">
                        <ALink href="/project-references/">Project References</ALink>
                    </li>
                    <li className="breadcrumb-item active">Project References Details</li>
                </ol>
            </div>
        </nav>

        <div className="page-content">
            <div className="container">
            <div className='referencesinnerwrapper mb-5'>
                    <div className="row plannings-container-ideas" style={{ alignItems: 'center' }}>
                        <div className="col-lg-4 col-sm-6 col-xs-12">
                            <div className="application-heading mb-3">
                                <h3>
                                    Name of the Project
                                </h3>
                            </div>
                            <h3 className='prefresubheading'>
                                Office
                                </h3>
                            <p className="prefresubtitle">Afi Chair Colour: natural oak Base color: M115</p>
                        </div>
                        <div className="col-lg-8 col-sm-6 col-xs-12">
                        <img src="images/projectreferencesinner/projectreferencesdetail.png" className='img-fluid mb-2'/>
                        <div className='btnWrapper'>
                        <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
                        <i className="icon-arrow-down"></i>
                                        <span>Sketch Up (4.58 MB)</span>
                                    </button>
                                    <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
                                    <i className="icon-arrow-down"></i>
                                        <span>Autocad 2D (47.92 KB)</span>
                                    </button>
                                    <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
                                    <i className="icon-arrow-down"></i>
                                        <span>Autocad 3D (2.28 MB)</span>
                                    </button>
                        </div>
                        </div>
                </div>
            </div>
                    <div className="top-management-application-slider mb-5">
                        <OwlCarousel adClass="owl-simple owl-light owl-nav-inside" options={projectReferenceInnerSlider}>
                            <div className="top-management-application">
                            <img src="images/applications/top-management.png" />
                        </div>
                        <div className="top-management-application">
                            <img src="images/applications/top-management.png" />
                        </div>
                        <div className="top-management-application">
                            <img src="images/applications/top-management.png" />
                        </div>
                        <div className="top-management-application">
                            <img src="images/applications/top-management.png" />
                        </div>
                        <div className="top-management-application">
                            <img src="images/applications/top-management.png" />
                        </div>
                        <div className="top-management-application">
                            <img src="images/applications/top-management.png" />
                        </div>
                        <div className="top-management-application">
                            <img src="images/applications/top-management.png" />
                        </div>
                        </OwlCarousel>
                    </div>

                <div className="application-heading mb-3">
                    <h3>Related Products</h3>
                </div>

                <div className="top-management-application-slider mb-3">
                        <OwlCarousel adClass="owl-simple owl-light owl-nav-inside" options={projectReferenceInnerSlider}>
                            <div className="top-management-application">
                            <img src="images/applications/top-management.png" />
                        </div>
                        <div className="top-management-application">
                            <img src="images/applications/top-management.png" />
                        </div>
                        <div className="top-management-application">
                            <img src="images/applications/top-management.png" />
                        </div>
                        <div className="top-management-application">
                            <img src="images/applications/top-management.png" />
                        </div>
                        <div className="top-management-application">
                            <img src="images/applications/top-management.png" />
                        </div>
                        <div className="top-management-application">
                            <img src="images/applications/top-management.png" />
                        </div>
                        <div className="top-management-application">
                            <img src="images/applications/top-management.png" />
                        </div>
                        <div className="top-management-application">
                            <img src="images/applications/top-management.png" />
                        </div>
                        </OwlCarousel>
                    </div>
            </div>
        </div >
    </div >
    )
}

export default withApollo({ ssr: typeof window == undefined })(connect(null, { ...demoAction })(ProjectReferencesInner));