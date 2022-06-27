import { useRouter } from 'next/router';
import React from 'react';
import OwlCarousel from '~/components/features/owl-carousel';
import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
import { applicationSlider, applicationTabsSlider } from '~/utils/data';
import withApollo from '~/server/apollo';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

function TopManagment() {
    const router = useRouter();
    const type = router?.route.split('/')[2];
    const query = router.query;



    return (
        <main className="main shop">
            <PageHeader
                title="Top Management"
                subTitle="We make happy workplaces"
                backgroundImage="images/banners/cat_banner.png"
                buttonText="Discover More"
                buttonUrl="#"
            />
            <nav className="breadcrumb-nav mb-2">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            Applications
                        </li>
                        <li className="breadcrumb-item active">Top Management</li>
                        {
                            query.search ?
                                <li className="breadcrumb-item">
                                    <span>Search - {query.searchTerm}</span>
                                </li>
                                : ""
                        }
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <div className="application-heading text-center mb-3">
                        <h2>Top Management</h2>
                    </div>
                </div>
                <div className="top-management-application-slider mb-3">
                    <OwlCarousel adClass="owl-simple owl-light owl-nav-inside" options={applicationSlider}>
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
                {/* <div className="container"> */}
                <div className="application-heading text-center mb-3">
                    <h2>Ring Applications</h2>
                </div>
                <div className="top-management-application-tabs">
                    <Tabs defaultIndex={0} selectedTabClassName="show">
                        <TabList className="nav nav-pills justify-content-center mb-3" id="tabs-6" role="tablist">
                            <Tab className="nav-item">
                                <span className="nav-link">Rising</span>
                            </Tab>
                            <Tab className="nav-item">
                                <span className="nav-link">Ring</span>
                            </Tab>
                            <Tab className="nav-item">
                                <span className="nav-link">Lorenzo</span>
                            </Tab>
                            <Tab className="nav-item">
                                <span className="nav-link">Gramy</span>
                            </Tab>
                            <Tab className="nav-item">
                                <span className="nav-link">Feigelali</span>
                            </Tab>
                        </TabList>
                        <div className="tab-pane tab-content">
                            <TabPanel>
                                <div className="container">
                                    <div className="row mb-6" style={{ alignItems: 'center' }}>
                                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                                            <div className="product-details sub-cat-deatil">
                                                <p className="lead text-primary mb-3">Rising Application</p>
                                                <h2 className="title">Lorem ipsum dolor sit</h2>
                                                <p className="mb-2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper ...</p>

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
                                    <img src="images/applications/ring-application-big.png" alt="slide" />
                                </div>
                            </TabPanel>

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
                                                <p className="lead text-primary mb-3">Ring Application</p>
                                                <h2 className="title">Lorem ipsum dolor sit</h2>
                                                <p className="mb-2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper ...</p>

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
                                    <img src="images/applications/ring-application-big.png" alt="slide" />
                                </div>
                            </TabPanel>

                            <TabPanel>
                                <div className="container">
                                    <div className="row mb-6" style={{ alignItems: 'center' }}>
                                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                                            <div className="product-details sub-cat-deatil">
                                                <p className="lead text-primary mb-3">Lorenzo Application</p>
                                                <h2 className="title">Lorem ipsum dolor sit</h2>
                                                <p className="mb-2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper ...</p>

                                                <ALink href="#" className="btn btn-sm btn-minwidth btn-outline-primary-2">
                                                    <span>Book A Free Consultation</span>
                                                    <i className="icon-long-arrow-right"></i>
                                                </ALink>
                                            </div>
                                        </div>
                                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                                            <div className="sub-cat-featured-img">
                                                <img src="images/applications/lorenzo-application.png" />
                                            </div>
                                        </div>
                                    </div >
                                </div>
                                <div className="top-management-application-slider tab-content-slider mb-8">
                                    <OwlCarousel adClass="owl-simple owl-light owl-nav-inside" options={applicationTabsSlider}>
                                        <div className="tab-content-slidis">
                                            <img src="images/applications/slider/lorenzo-application-slider01.png" />
                                        </div>
                                        <div className="tab-content-slidis">
                                            <img src="images/applications/slider/lorenzo-application-slider02.png" />
                                        </div>
                                        <div className="tab-content-slidis">
                                            <img src="images/applications/slider/lorenzo-application-slider03.png" />
                                        </div>
                                        <div className="tab-content-slidis">
                                            <img src="images/applications/slider/lorenzo-application-slider04.png" />
                                        </div>
                                        <div className="tab-content-slidis">
                                            <img src="images/applications/slider/lorenzo-application-slider01.png" />
                                        </div>
                                        <div className="tab-content-slidis">
                                            <img src="images/applications/slider/lorenzo-application-slider02.png" />
                                        </div>
                                    </OwlCarousel>
                                </div>
                                <div className="projects-list">
                                    <img src="images/applications/lorenzo-application-big.png" alt="slide" />
                                </div>
                            </TabPanel>

                            <TabPanel>
                                <div className="container">
                                    <div className="row mb-6" style={{ alignItems: 'center' }}>
                                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                                            <div className="sub-cat-featured-img">
                                                <img src="images/applications/gramy-application.png" />
                                            </div>
                                        </div>

                                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                                            <div className="product-details sub-cat-deatil text-right">
                                                <p className="lead text-primary mb-3">Gramy Application</p>
                                                <h2 className="title">Lorem ipsum dolor sit</h2>
                                                <p className="mb-2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper ...</p>

                                                <ALink href="#" className="btn btn-sm btn-minwidth btn-outline-primary-2">
                                                    <span>Book A Free Consultation</span>
                                                    <i className="icon-long-arrow-right"></i>
                                                </ALink>
                                            </div>
                                        </div>
                                    </div >
                                </div >
                                <div className="top-management-application-slider tab-content-slider mb-8">
                                    <OwlCarousel adClass="owl-simple owl-light owl-nav-inside" options={applicationTabsSlider}>
                                        <div className="tab-content-slidis">
                                            <img src="images/applications/slider/gramy-application-slider01.png" />
                                        </div>
                                        <div className="tab-content-slidis">
                                            <img src="images/applications/slider/gramy-application-slider02.png" />
                                        </div>
                                        <div className="tab-content-slidis">
                                            <img src="images/applications/slider/gramy-application-slider03.png" />
                                        </div>
                                        <div className="tab-content-slidis">
                                            <img src="images/applications/slider/gramy-application-slider04.png" />
                                        </div>
                                        <div className="tab-content-slidis">
                                            <img src="images/applications/slider/gramy-application-slider01.png" />
                                        </div>
                                        <div className="tab-content-slidis">
                                            <img src="images/applications/slider/gramy-application-slider02.png" />
                                        </div>
                                    </OwlCarousel>
                                </div>
                                <div className="projects-list">
                                    <img src="images/applications/gramy-application-big.png" alt="slide" />
                                </div>
                            </TabPanel>

                            <TabPanel>
                                <div className="container">
                                    <div className="row mb-6" style={{ alignItems: 'center' }}>
                                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                                            <div className="product-details sub-cat-deatil">
                                                <p className="lead text-primary mb-3">Feigelali Application</p>
                                                <h2 className="title">Lorem ipsum dolor sit</h2>
                                                <p className="mb-2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper ...</p>

                                                <ALink href="#" className="btn btn-sm btn-minwidth btn-outline-primary-2">
                                                    <span>Book A Free Consultation</span>
                                                    <i className="icon-long-arrow-right"></i>
                                                </ALink>
                                            </div>
                                        </div>
                                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                                            <div className="sub-cat-featured-img">
                                                <img src="images/applications/feigelali-application.png" />
                                            </div>
                                        </div>
                                    </div >
                                </div >
                                <div className="top-management-application-slider tab-content-slider mb-8">
                                    <OwlCarousel adClass="owl-simple owl-light owl-nav-inside" options={applicationTabsSlider}>
                                        <div className="tab-content-slidis">
                                            <img src="images/applications/slider/feigelali-application-sliedr01.png" />
                                        </div>
                                        <div className="tab-content-slidis">
                                            <img src="images/applications/slider/feigelali-application-sliedr02.png" />
                                        </div>
                                        <div className="tab-content-slidis">
                                            <img src="images/applications/slider/feigelali-application-sliedr03.png" />
                                        </div>
                                        <div className="tab-content-slidis">
                                            <img src="images/applications/slider/feigelali-application-sliedr04.png" />
                                        </div>
                                        <div className="tab-content-slidis">
                                            <img src="images/applications/slider/feigelali-application-sliedr01.png" />
                                        </div>
                                        <div className="tab-content-slidis">
                                            <img src="images/applications/slider/feigelali-application-sliedr02.png" />
                                        </div>
                                    </OwlCarousel>
                                </div>
                                <div className="projects-list">
                                    <img src="images/applications/feigelali-application-big.png" alt="slide" />
                                </div>

                            </TabPanel>

                        </div>
                    </Tabs>
                </div>
                {/* </div > */}
            </div >
        </main >
    )
}

export default withApollo({ ssr: typeof window == 'undefined' })(TopManagment);