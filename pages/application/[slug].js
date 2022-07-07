import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import OwlCarousel from '~/components/features/owl-carousel';
import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
import { applicationSlider, applicationTabsSlider } from '~/utils/data';
import withApollo from '~/server/apollo';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

const axios = require('axios');

function ManagmentPage() {
    const router = useRouter();
    const type = router?.route.split('/')[2];
    const query = router.query;
    const [currentPage, setCurrentPage] = useState();
    const [managementdata, setManagementdata] = useState();

    useEffect(() => {

        setCurrentPage(query?.slug.replace('-', ' '));

        axios.get('https://prismcloudhosting.com/BAFCO_APIs/public/v1/api/managements/topManagement').then(function (response) {
            // handle success
            console.log(response.data.content);
            setManagementdata(response.data.content)
        }).catch(function (error) {
            // handle error
            console.log(error);
        })

    }, [query])

    return (
        <main className="main shop">
            <PageHeader
                title={managementdata?.content?.banner?.heading}
                subTitle={managementdata?.content?.banner?.sub_heading}
                backgroundImage={managementdata?.content?.banner?.image}
                buttonText="Discover More"
                buttonUrl="#"
            />
            <nav className="breadcrumb-nav mb-2">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item active">{managementdata?.content?.banner?.heading}</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <div className="application-heading text-center mb-3">
                        <h2 style={{ textTransform: 'capitalize' }}>{managementdata?.content?.banner?.heading}</h2>
                    </div>
                </div>
                <div className="top-management-application-slider mb-3">
                    <OwlCarousel adClass="owl-simple owl-light owl-nav-inside" options={applicationSlider}>
                        {managementdata?.content?.sliders.map((item, index) => (
                            <div className="top-management-application" key={index}>
                                <img src={item} />
                            </div>
                        ))}

                        {/* <div className="top-management-application">
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
                        </div> */}
                    </OwlCarousel>
                </div>
                {managementdata?.data.map((item, index) => (
                    <div className='mb-6'>
                        <div className="application-heading text-center mb-3">
                            <h2>{item.name}</h2>
                        </div>
                        <div className="top-management-application-tabs">
                            <Tabs defaultIndex={0} selectedTabClassName="show">
                                <TabList className="nav nav-pills justify-content-center mb-3" id="tabs-6" role="tablist">
                                    {item.applications.map((item1, index1) => (
                                        <Tab className="nav-item" key={index1}>
                                            <span className="nav-link">{item1.heading}</span>
                                        </Tab>
                                    ))}
                                </TabList>
                                <div className="tab-pane tab-content">
                                    {item.applications.map((item1, index1) => (
                                        index1 % 2 ?
                                            <TabPanel>
                                                <div className="container">
                                                    <div className="row mb-6" style={{ alignItems: 'center' }}>
                                                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                                                            <div className="sub-cat-featured-img">
                                                                <img src="images/applications/ring-application.png" />
                                                            </div>
                                                        </div>
                                                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                                                            <div className="product-details sub-cat-deatil text-right">
                                                                <p className="lead text-primary mb-3">{item1.heading}</p>
                                                                <h2 className="title">{item1.sub_heading}</h2>
                                                                <div className="mb-2" dangerouslySetInnerHTML={{ __html: item1.description }} />

                                                                <ALink href="#" className="btn btn-sm btn-minwidth btn-outline-primary-2">
                                                                    <span>Book A Free Consultation</span>
                                                                    <i className="icon-long-arrow-right"></i>
                                                                </ALink>
                                                            </div>
                                                        </div>
                                                    </div >
                                                </div>
                                                <div className="top-management-application-slider tab-content-slider mb-8">
                                                    <OwlCarousel adClass="owl-simple owl-light owl-nav-inside" options={applicationTabsSlider}>
                                                        <div className="tab-content-slidis">
                                                            <img src="images/applications/slider/ring-application-slider01.png" />
                                                        </div>
                                                        <div className="tab-content-slidis">
                                                            <img src="images/applications/slider/ring-application-slider02.png" />
                                                        </div>
                                                        <div className="tab-content-slidis">
                                                            <img src="images/applications/slider/ring-application-slider03.png" />
                                                        </div>
                                                        <div className="tab-content-slidis">
                                                            <img src="images/applications/slider/ring-application-slider04.png" />
                                                        </div>
                                                        <div className="tab-content-slidis">
                                                            <img src="images/applications/slider/ring-application-slider01.png" />
                                                        </div>
                                                        <div className="tab-content-slidis">
                                                            <img src="images/applications/slider/ring-application-slider02.png" />
                                                        </div>
                                                    </OwlCarousel>
                                                </div>
                                                <div className="projects-list">
                                                    <img src={item1.shopableImg} alt="slide" />
                                                </div>
                                            </TabPanel> :
                                            <TabPanel>
                                                <div className="container">
                                                    <div className="row mb-6" style={{ alignItems: 'center' }}>
                                                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                                                            <div className="product-details sub-cat-deatil">
                                                                <p className="lead text-primary mb-3">{item1.heading}</p>
                                                                <h2 className="title">{item1.sub_heading}</h2>
                                                                <div className="mb-2" dangerouslySetInnerHTML={{ __html: item1.description }} />

                                                                <ALink href="#" className="btn btn-sm btn-minwidth btn-outline-primary-2">
                                                                    <span>Book A Free Consultation</span>
                                                                    <i className="icon-long-arrow-right"></i>
                                                                </ALink>
                                                            </div>
                                                        </div>
                                                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                                                            <div className="sub-cat-featured-img">
                                                                <img src="images/applications/ring-application.png" />
                                                            </div>
                                                        </div>
                                                    </div >
                                                </div>
                                                <div className="top-management-application-slider tab-content-slider mb-8">
                                                    <OwlCarousel adClass="owl-simple owl-light owl-nav-inside" options={applicationTabsSlider}>
                                                        <div className="tab-content-slidis">
                                                            <img src="images/applications/slider/ring-application-slider01.png" />
                                                        </div>
                                                        <div className="tab-content-slidis">
                                                            <img src="images/applications/slider/ring-application-slider02.png" />
                                                        </div>
                                                        <div className="tab-content-slidis">
                                                            <img src="images/applications/slider/ring-application-slider03.png" />
                                                        </div>
                                                        <div className="tab-content-slidis">
                                                            <img src="images/applications/slider/ring-application-slider04.png" />
                                                        </div>
                                                        <div className="tab-content-slidis">
                                                            <img src="images/applications/slider/ring-application-slider01.png" />
                                                        </div>
                                                        <div className="tab-content-slidis">
                                                            <img src="images/applications/slider/ring-application-slider02.png" />
                                                        </div>
                                                    </OwlCarousel>
                                                </div>
                                                <div className="projects-list">
                                                    <img src={item1.shopableImg} alt="slide" />
                                                </div>
                                            </TabPanel>
                                    ))}
                                </div>
                            </Tabs>
                        </div>
                    </div>
                ))}

            </div >
        </main >
    )
}

export default withApollo({ ssr: typeof window == 'undefined' })(ManagmentPage);