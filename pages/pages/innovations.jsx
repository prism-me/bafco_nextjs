// import React, { useEffect } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { useEffect, useState } from "react";
import ALink from "~/components/features/alink";
import PageHeader from "~/components/features/page-header";
import BlogCollection from "~/components/partials/home/blog-collection";
import { GET_HOME_DATA } from "~/server/queries";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import withApollo from "~/server/apollo";
import Reveal from "react-awesome-reveal";
import { connect } from "react-redux";
import { actions as demoAction } from "~/store/demo";
import { fadeInUpShorter, dealSlider } from "~/utils/data";
import OwlCarousel from "~/components/features/owl-carousel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Masonry from "react-responsive-masonry";
const axios = require("axios");

const postsdata = [
  {
    id: 101,
    author: "Jane Doe",
    comments: 0,
    content:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit.Pelletesque aliquet nibh necurna.",
    date: "2020-09-22",
    slug: "sed-adipiscing-odbrnare.",
    title: "Sed adipiscing odbrnare.",
    type: "image",
    blog_categories: [
      {
        name: "Lifestyle",
        slug: "lifestyle",
        __typename: "Category",
      },
    ],
    image: [
      {
        width: 376,
        height: 250,
        url: "https://d-themes.com/react_asset_api/molla/uploads/post_1_8285333d58.jpg",
        __typename: "Media",
      },
    ],
    __typename: "Post",
  },
  {
    id: 102,
    author: "Jane Doe",
    comments: 0,
    content:
      "Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis justo.",
    date: "2020-05-12",
    slug: "fusce-lacifgbnia-arcuet-nulla.",
    title: "Fusce lacifgbnia arcuet nulla.",
    type: "image",
    blog_categories: [
      {
        name: "Lifestyle",
        slug: "lifestyle",
        __typename: "Category",
      },
    ],
    image: [
      {
        width: 376,
        height: 250,
        url: "https://d-themes.com/react_asset_api/molla/uploads/post_2_73cf3ad8f8.jpg",
        __typename: "Media",
      },
    ],
    __typename: "Post",
  },
  {
    id: 103,
    author: "Jane Doe",
    comments: 2,
    content:
      "Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue.",
    date: "2020-05-19",
    slug: "quisque-volutpat-mdbattis-eros.",
    title: "Quisque volutpat mdbattis eros.",
    type: "image",
    blog_categories: [
      {
        name: "Lifestyle",
        slug: "lifestyle",
        __typename: "Category",
      },
    ],
    image: [
      {
        width: 376,
        height: 250,
        url: "https://d-themes.com/react_asset_api/molla/uploads/post_3_dbb5414ec7.jpg",
        __typename: "Media",
      },
    ],
    __typename: "Post",
  },
];

function Innovations(props) {
  const { data, loading, error } = useQuery(GET_HOME_DATA);
  // const posts = data && data.homeData.posts;
  const posts = postsdata && postsdata;
  const [innovationdata, setInnovationdata] = useState();
  const [bloglist, setBlogList] = useState();

  function openVideoModal(e) {
    e.preventDefault();
    props?.showVideo();
  }
  useEffect(() => {
    axios
      .get("https://endpoint.bafco.com/v1/api/innovations")
      .then(function (response) {
        // handle success
        setInnovationdata(response.data.innovations.content);
        setBlogList(response.data.blog);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div className="main">
      <PageHeader
        title={innovationdata?.banner?.heading}
        subTitle={innovationdata?.banner?.sub_heading}
        backgroundImage={innovationdata?.banner?.image}
        buttonText=""
        buttonUrl="#"
      />

      <nav className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item active">
              {innovationdata?.banner?.heading}
            </li>
          </ol>
        </div>
      </nav>

      <div className="page-content pb-3">
        <div className="container">
          <div className="application-heading text-center mb-6">
            <h3>{innovationdata?.intro?.heading}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: innovationdata?.intro?.description,
              }}
            />
          </div>

          <div className="application-heading text-center mb-3">
            <h3>Designing for people</h3>
          </div>

          <div className="top-management-application-tabs mb-6">
            <Tabs defaultIndex={0} selectedTabClassName="show">
              <TabList
                className="nav nav-pills justify-content-center mb-3"
                id="tabs-6"
                role="tablist"
              >
                {innovationdata?.demonstration?.map((item, index) => (
                  <Tab className="nav-item" key={index}>
                    <span className="nav-link">{item.name}</span>
                  </Tab>
                ))}
              </TabList>
              <div className="tab-pane tab-content">
                {innovationdata?.demonstration.map((item, index) => (
                  <TabPanel className="text-center" key={index}>
                    <div
                      className="mb-3"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                    <div className="application-heading text-center mb-3">
                      <h3>Workspace concepts</h3>
                    </div>
                    <div className="mb-6">
                      <Masonry columnsCount={3} gutter="15px">
                        {item.workspace.map((item2, index2) => (
                          <div className="Workspace_img">
                            <img
                              key={index2}
                              src={item2.workspaceImage}
                              style={{ width: "100%", display: "block" }}
                            />
                            <h3>{item2.heading}</h3>
                          </div>
                        ))}
                      </Masonry>
                    </div>
                  </TabPanel>
                ))}
              </div>
            </Tabs>
          </div>

          <BlogCollection posts={bloglist}></BlogCollection>

          <div className="application-heading text-center mb-3">
            <h3>Video Library</h3>
          </div>
          <OwlCarousel
            adclassName="owl-simple owl-light owl-nav-inside innovationvideo-slider"
            options={dealSlider}
          >
            <div className="row" style={{ alignItems: "center" }}>
              <div
                className="col-lg-6 col-sm-6 col-xs-12"
                style={{ textAlign: "center" }}
              >
                <p className="lead text-primary mb-3">New Video</p>
                <h2 className="title">Lorem ipsum dolor sit</h2>
                <p className="mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames
                  a nisi, congue feugiat id dignissim pellentesque turpis
                  condimentum. Donec dictumst diam ut sollicitudin iaculis
                  scelerisque. Augue nulla dolor tempus quis arcu natoque.
                </p>

                <ALink
                  href="#"
                  className="btn btn-sm btn-minwidth btn-outline-primary-2"
                >
                  <span>View More</span>
                  <i className="icon-long-arrow-right"></i>
                </ALink>
              </div>

              <div className="col-lg-6 col-sm-6 col-xs-12 ">
                <div className="innovationvideo-img">
                  <Reveal
                    keyframes={fadeInUpShorter}
                    delay={200}
                    duration={1000}
                    triggerOnce
                  >
                    <img
                      src="images/innovations/innovationvideo.png"
                      alt="innovationvideo"
                    />
                    <a
                      href="https://bafco.b-cdn.net/videos/2020CIFF.mp4"
                      className="btn-video btn-iframe"
                      onClick={openVideoModal}
                    >
                      <i className="icon-play"></i>
                    </a>
                  </Reveal>
                </div>
              </div>
            </div>
            <div className="row" style={{ alignItems: "center" }}>
              <div
                className="col-lg-6 col-sm-6 col-xs-12"
                style={{ textAlign: "center" }}
              >
                <p className="lead text-primary mb-3">New Video</p>
                <h2 className="title">Lorem ipsum dolor sit</h2>
                <p className="mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames
                  a nisi, congue feugiat id dignissim pellentesque turpis
                  condimentum. Donec dictumst diam ut sollicitudin iaculis
                  scelerisque. Augue nulla dolor tempus quis arcu natoque.
                </p>

                <ALink
                  href="#"
                  className="btn btn-sm btn-minwidth btn-outline-primary-2"
                >
                  <span>View More</span>
                  <i className="icon-long-arrow-right"></i>
                </ALink>
              </div>

              <div className="col-lg-6 col-sm-6 col-xs-12 ">
                <div className="innovationvideo-img">
                  <Reveal
                    keyframes={fadeInUpShorter}
                    delay={200}
                    duration={1000}
                    triggerOnce
                  >
                    <img
                      src="images/innovations/innovationvideo.png"
                      alt="innovationvideo"
                    />
                    <a
                      href="https://bafco.b-cdn.net/videos/2020CIFF.mp4"
                      className="btn-video btn-iframe"
                      onClick={openVideoModal}
                    >
                      <i className="icon-play"></i>
                    </a>
                  </Reveal>
                </div>
              </div>
            </div>
            <div className="row" style={{ alignItems: "center" }}>
              <div
                className="col-lg-6 col-sm-6 col-xs-12"
                style={{ textAlign: "center" }}
              >
                <p className="lead text-primary mb-3">New Video</p>
                <h2 className="title">Lorem ipsum dolor sit</h2>
                <p className="mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames
                  a nisi, congue feugiat id dignissim pellentesque turpis
                  condimentum. Donec dictumst diam ut sollicitudin iaculis
                  scelerisque. Augue nulla dolor tempus quis arcu natoque.
                </p>

                <ALink
                  href="#"
                  className="btn btn-sm btn-minwidth btn-outline-primary-2"
                >
                  <span>View More</span>
                  <i className="icon-long-arrow-right"></i>
                </ALink>
              </div>

              <div className="col-lg-6 col-sm-6 col-xs-12 ">
                <div className="innovationvideo-img">
                  <Reveal
                    keyframes={fadeInUpShorter}
                    delay={200}
                    duration={1000}
                    triggerOnce
                  >
                    <img
                      src="images/innovations/innovationvideo.png"
                      alt="innovationvideo"
                    />
                    <a
                      href="https://bafco.b-cdn.net/videos/2020CIFF.mp4"
                      className="btn-video btn-iframe"
                      onClick={openVideoModal}
                    >
                      <i className="icon-play"></i>
                    </a>
                  </Reveal>
                </div>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </div>
    </div>
  );
}

// export default React.memo(Innovations);
// export default withApollo({ ssr: typeof window == 'undefined' })(Innovations);
export default withApollo({ ssr: typeof window == undefined })(
  connect(null, { ...demoAction })(Innovations)
);
