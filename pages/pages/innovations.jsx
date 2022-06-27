// import React, { useEffect } from 'react';
import { useQuery } from "@apollo/react-hooks";
import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import BlogCollection from '~/components/partials/home/blog-collection';
import { GET_HOME_DATA } from '~/server/queries';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import withApollo from '~/server/apollo';


function Innovations() {
    const { data, loading, error } = useQuery(GET_HOME_DATA);
    const posts = data && data.homeData.posts;
    if (error) {
        return <div></div>
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
                </div>
            </div >
        </div >
    )
}

// export default React.memo(Innovations);
export default withApollo({ ssr: typeof window == 'undefined' })(Innovations);