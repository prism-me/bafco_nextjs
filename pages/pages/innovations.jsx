// import React, { useEffect } from 'react';
import { useQuery } from "@apollo/react-hooks";
import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import BlogCollection from '~/components/partials/home/blog-collection';
import { GET_HOME_DATA } from '~/server/queries';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import withApollo from '~/server/apollo';
import Reveal from 'react-awesome-reveal';
import { connect } from 'react-redux';
import { actions as demoAction } from '~/store/demo';
import { fadeInUpShorter, dealSlider } from '~/utils/data';
import OwlCarousel from '~/components/features/owl-carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const postsdata = [
    {
        "id": 101,
        "author": "Jane Doe",
        "comments": 0,
        "content": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit.Pelletesque aliquet nibh necurna.",
        "date": "2020-09-22",
        "slug": "sed-adipiscing-odbrnare.",
        "title": "Sed adipiscing odbrnare.",
        "type": "image",
        "blog_categories": [
            {
                "name": "Lifestyle",
                "slug": "lifestyle",
                "__typename": "Category"
            }
        ],
        "image": [
            {
                "width": 376,
                "height": 250,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/post_1_8285333d58.jpg",
                "__typename": "Media"
            }
        ],
        "__typename": "Post"
    },
    {
        "id": 102,
        "author": "Jane Doe",
        "comments": 0,
        "content": "Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis justo.",
        "date": "2020-05-12",
        "slug": "fusce-lacifgbnia-arcuet-nulla.",
        "title": "Fusce lacifgbnia arcuet nulla.",
        "type": "image",
        "blog_categories": [
            {
                "name": "Lifestyle",
                "slug": "lifestyle",
                "__typename": "Category"
            }
        ],
        "image": [
            {
                "width": 376,
                "height": 250,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/post_2_73cf3ad8f8.jpg",
                "__typename": "Media"
            }
        ],
        "__typename": "Post"
    },
    {
        "id": 103,
        "author": "Jane Doe",
        "comments": 2,
        "content": "Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue.",
        "date": "2020-05-19",
        "slug": "quisque-volutpat-mdbattis-eros.",
        "title": "Quisque volutpat mdbattis eros.",
        "type": "image",
        "blog_categories": [
            {
                "name": "Lifestyle",
                "slug": "lifestyle",
                "__typename": "Category"
            }
        ],
        "image": [
            {
                "width": 376,
                "height": 250,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/post_3_dbb5414ec7.jpg",
                "__typename": "Media"
            }
        ],
        "__typename": "Post"
    }
];


function Innovations(props) {
    const { data, loading, error } = useQuery(GET_HOME_DATA);
    // const posts = data && data.homeData.posts;
    const posts = postsdata && postsdata;
    if (error) {
        return <div></div>
    }
    function openVideoModal(e) {
        e.preventDefault();
        props?.showVideo();
    }

    return (
        <div className="main">
            <PageHeader
                title="Innovations"
                subTitle="We make happy workplaces"
                backgroundImage="images/banners/innovations-bg.png"
                buttonText="Shop Now"
                buttonUrl="#"
            />

            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item active">Innovations</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content pb-3">
                <div className="container">
                    <div className="application-heading text-center mb-6">
                        <h3>Life Philosophy</h3>
                        <p>Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue.Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue.Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue.Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue.Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue.Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue.</p>
                    </div>

                    <div className="application-heading text-center mb-3">
                        <h3>Designing for people</h3>
                    </div>

                    <div className="top-management-application-tabs mb-6">
                        <Tabs defaultIndex={0} selectedTabClassName="show">
                            <TabList className="nav nav-pills justify-content-center mb-3" id="tabs-6" role="tablist">
                                <Tab className="nav-item">
                                    <span className="nav-link">All Products</span>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link">Chairs</span>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link">Desks</span>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link">Collaborative</span>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link">Storages</span>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link">Accessories</span>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link">Materials</span>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link">Workspaces</span>
                                </Tab>
                            </TabList>
                            <div className="tab-pane tab-content">
                                <TabPanel className="text-center">
                                    <p>Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue.Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue.Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, </p>
                                </TabPanel>

                                <TabPanel className="text-center">
                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi tortor eu nibh. Nullam mollis.</p>
                                </TabPanel>

                                <TabPanel className="text-center">
                                    <p>Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue.Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue.Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo,</p>
                                </TabPanel>

                                <TabPanel className="text-center">
                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi tortor eu nibh. Nullam mollis.</p>
                                </TabPanel>

                                <TabPanel className="text-center">
                                    <p>Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue.Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue.Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo,</p>
                                </TabPanel>

                                <TabPanel className="text-center">
                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi tortor eu nibh. Nullam mollis.</p>
                                </TabPanel>

                                <TabPanel className="text-center">
                                    <p>Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue.Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue.Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo,</p>
                                </TabPanel>

                                <TabPanel className="text-center">
                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi tortor eu nibh. Nullam mollis.</p>
                                </TabPanel>
                            </div>
                        </Tabs>
                    </div>

                    <div className="application-heading text-center mb-3">
                        <h3>Workspace concepts</h3>
                    </div>

                    <div className="row mb-6">
                        <div className="col-sm-4 ">
                            <figure className="mb-0">
                                <div className="lazy-overlay"></div>
                                <LazyLoadImage
                                    alt="banner"
                                    src="images/innovations/workspace-concepts01.png"
                                    threshold={200}
                                    width="100%"
                                    height="auto"
                                    effect="blur"
                                />
                                <div className="text-center-overlay">
                                    <h3>Work Spaces</h3>
                                </div>
                            </figure>
                        </div>
                        <div className="col-sm-4 ">
                            <figure className="mb-2">
                                <div className="lazy-overlay"></div>
                                <LazyLoadImage
                                    alt="banner"
                                    src="images/innovations/workspace-concepts02.png"
                                    threshold={200}
                                    width="100%"
                                    height="auto"
                                    effect="blur"
                                />
                                <div className="text-center-overlay text-center-overlay-top">
                                    <h3>Support Spaces</h3>
                                </div>
                            </figure>
                            <figure className="mb-0">
                                <div className="lazy-overlay"></div>
                                <LazyLoadImage
                                    alt="banner"
                                    src="images/innovations/workspace-concepts03.png"
                                    threshold={200}
                                    width="100%"
                                    height="auto"
                                    effect="blur"
                                />
                                <div className="text-center-overlay text-center-overlay-bottom">
                                    <h3>Meeting Spaces</h3>
                                </div>
                            </figure>
                        </div>
                        <div className="col-sm-4 ">
                            <figure className="mb-0">
                                <div className="lazy-overlay"></div>
                                <LazyLoadImage
                                    alt="banner"
                                    src="images/innovations/workspace-concepts04.png"
                                    threshold={200}
                                    width="100%"
                                    height="auto"
                                    effect="blur"
                                />
                                <div className="text-center-overlay">
                                    <h3>Ergonomics Spaces</h3>
                                </div>
                            </figure>
                        </div>
                    </div>

                    {/* <div className="row mb-6">
                        <div className={`col-sm-6 col-md-4 `}>
                            <img src="images/innovations/workspace-concepts01.png" />
                            <h4>Work Spaces</h4>
                        </div>
                        <div className={`col-sm-6 col-md-4 grid-item-workspace`}>
                            <img src="images/innovations/workspace-concepts02.png" />
                            <h4>Support Spaces</h4>
                        </div>
                        <div className={`col-sm-6 col-md-4 grid-item-workspace`}>
                            <img src="images/innovations/workspace-concepts04.png" />
                            <h4>Ergonomics Spaces</h4>
                        </div>
                        <div className={`col-sm-6 col-md-4 grid-item-workspace`}>
                        </div>
                        <div className={`col-sm-6 col-md-4 grid-item-workspace`}>
                            <img src="images/innovations/workspace-concepts03.png" />
                            <h4>Meeting Spaces</h4>
                        </div>
                    </div> */}

                    <BlogCollection posts={posts} loading={loading}></BlogCollection>

                    <div className="application-heading text-center mb-3">
                        <h3>Video Library</h3>
                    </div>
                    <OwlCarousel adClass="owl-simple owl-light owl-nav-inside innovationvideo-slider" options={dealSlider}>
                        <div className="row" style={{ alignItems: 'center' }}>
                            <div className="col-lg-6 col-sm-6 col-xs-12" style={{ textAlign: 'center' }}>
                                <p className="lead text-primary mb-3">New Video</p>
                                <h2 className="title">Lorem ipsum dolor sit</h2>
                                <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames a nisi, congue feugiat id dignissim pellentesque turpis condimentum. Donec dictumst diam ut sollicitudin iaculis scelerisque. Augue nulla dolor tempus quis arcu natoque.</p>

                                <ALink href="#" className="btn btn-sm btn-minwidth btn-outline-primary-2">
                                    <span>View More</span>
                                    <i className="icon-long-arrow-right"></i>
                                </ALink>
                            </div>

                            <div className="col-lg-6 col-sm-6 col-xs-12 ">
                                <div className="innovationvideo-img">
                                    <Reveal keyframes={fadeInUpShorter} delay={200} duration={1000} triggerOnce>
                                        <img src="images/innovations/innovationvideo.png" alt="innovationvideo" />
                                        <a href="https://bafco.b-cdn.net/videos/2020CIFF.mp4" className="btn-video btn-iframe" onClick={openVideoModal}><i className="icon-play"></i></a>
                                    </Reveal>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{ alignItems: 'center' }}>
                            <div className="col-lg-6 col-sm-6 col-xs-12" style={{ textAlign: 'center' }}>
                                <p className="lead text-primary mb-3">New Video</p>
                                <h2 className="title">Lorem ipsum dolor sit</h2>
                                <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames a nisi, congue feugiat id dignissim pellentesque turpis condimentum. Donec dictumst diam ut sollicitudin iaculis scelerisque. Augue nulla dolor tempus quis arcu natoque.</p>

                                <ALink href="#" className="btn btn-sm btn-minwidth btn-outline-primary-2">
                                    <span>View More</span>
                                    <i className="icon-long-arrow-right"></i>
                                </ALink>
                            </div>

                            <div className="col-lg-6 col-sm-6 col-xs-12 ">
                                <div className="innovationvideo-img">
                                    <Reveal keyframes={fadeInUpShorter} delay={200} duration={1000} triggerOnce>
                                        <img src="images/innovations/innovationvideo.png" alt="innovationvideo" />
                                        <a href="https://bafco.b-cdn.net/videos/2020CIFF.mp4" className="btn-video btn-iframe" onClick={openVideoModal}><i className="icon-play"></i></a>
                                    </Reveal>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{ alignItems: 'center' }}>
                            <div className="col-lg-6 col-sm-6 col-xs-12" style={{ textAlign: 'center' }}>
                                <p className="lead text-primary mb-3">New Video</p>
                                <h2 className="title">Lorem ipsum dolor sit</h2>
                                <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames a nisi, congue feugiat id dignissim pellentesque turpis condimentum. Donec dictumst diam ut sollicitudin iaculis scelerisque. Augue nulla dolor tempus quis arcu natoque.</p>

                                <ALink href="#" className="btn btn-sm btn-minwidth btn-outline-primary-2">
                                    <span>View More</span>
                                    <i className="icon-long-arrow-right"></i>
                                </ALink>
                            </div>

                            <div className="col-lg-6 col-sm-6 col-xs-12 ">
                                <div className="innovationvideo-img">
                                    <Reveal keyframes={fadeInUpShorter} delay={200} duration={1000} triggerOnce>
                                        <img src="images/innovations/innovationvideo.png" alt="innovationvideo" />
                                        <a href="https://bafco.b-cdn.net/videos/2020CIFF.mp4" className="btn-video btn-iframe" onClick={openVideoModal}><i className="icon-play"></i></a>
                                    </Reveal>
                                </div>
                            </div>
                        </div>
                    </OwlCarousel>
                </div>
            </div >
        </div >
    )
}

// export default React.memo(Innovations);
// export default withApollo({ ssr: typeof window == 'undefined' })(Innovations);
export default withApollo({ ssr: typeof window == undefined })(connect(null, { ...demoAction })(Innovations));