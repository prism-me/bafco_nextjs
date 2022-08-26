import { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import ALink from "~/components/features/alink";
import PageHeader from "~/components/features/page-header";
import { GET_HOME_DATA } from "~/server/queries";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import withApollo from "~/server/apollo";
import Reveal from "react-awesome-reveal";
import { connect } from "react-redux";
import { actions as demoAction } from "~/store/demo";
import OwlCarousel from "~/components/features/owl-carousel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import BlogCollection from "~/components/partials/home/blog-collection";

import {
  introSlider,
  fadeInUpShorter,
  fabricFinishedSlider,
} from "~/utils/data";
const axios = require("axios");

function Resources(props) {
  const { data, loading, error } = useQuery(GET_HOME_DATA);
  const posts = data && data.homeData.posts;

  const [resourcesdata, setResourcesdata] = useState();

  useEffect(() => {
    axios
      .get(
        "https://prismcloudhosting.com/BAFCO_APIs/public/v1/api/pages/resources?en"
      )
      .then(function (response) {
        console.log(response.data.content);
        setResourcesdata(response.data.content);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [bloglist, setBlogList] = useState();
  useEffect(() => {
    axios
      .get("https://prismcloudhosting.com/BAFCO_APIs/public/v1/api/home?en")
      .then(function (response) {
        // handle success
        setBlogList(response.data.blogs);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  function openVideoModal(e) {
    e.preventDefault();
    props?.showVideo();
  }

  const videoList = [
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      video_link: "https://youtu.be/vBPgmASQ1A0",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_12_1_300x300_b966955471.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      video_link: "https://youtu.be/vBPgmASQ1A0",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_12_1_300x300_b966955471.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      video_link: "https://youtu.be/vBPgmASQ1A0",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_12_1_300x300_b966955471.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      video_link: "https://youtu.be/vBPgmASQ1A0",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_12_1_300x300_b966955471.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      video_link: "https://youtu.be/vBPgmASQ1A0",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_12_1_300x300_b966955471.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      video_link: "https://youtu.be/vBPgmASQ1A0",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_12_1_300x300_b966955471.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      video_link: "https://youtu.be/vBPgmASQ1A0",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_12_1_300x300_b966955471.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      video_link: "https://youtu.be/vBPgmASQ1A0",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_12_1_300x300_b966955471.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      video_link: "https://youtu.be/vBPgmASQ1A0",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_12_1_300x300_b966955471.jpg",
    },
  ];

  return (
    <div className="main resources-page">
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
            <li className="breadcrumb-item active">
              {resourcesdata?.banner?.heading}
            </li>
          </ol>
        </div>
      </nav>

      <div className="page-content pb-3">
        <div className="container">
          <div className="application-heading mb-3 d-flex justify-content-between align-items-center resourceheadingmbl">
            <h3>Project References</h3>
            <ALink
              href={"/project-references/"}
              className="btn btn-outline-darker btn-more"
            >
              <span>View All Projects</span>
              <i className="icon-long-arrow-right"></i>
            </ALink>
          </div>

          <OwlCarousel
            adClass="owl-simple owl-light owl-nav-inside mb-5 project-references"
            options={introSlider}
          >
            {resourcesdata?.projectReferences?.map((item, index) => (
              <div
                className="intro-slide slide1"
                key={index}
                style={{
                  backgroundColor: "#EDF2F0",
                  backgroundImage: `url(${item.image})`,
                }}
              >
                <div className="container intro-content">
                  <div className="project-reference-slider-cont">
                    <p className="lead text-primary">{item.sub_heading}</p>
                    <h2 className="title">{item.heading}</h2>
                    <div
                      className="mb-2"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />

                    <ALink
                      href={"/project-references/"}
                      className="btn btn-sm btn-minwidth btn-outline-primary-2"
                    >
                      <span>Click Here</span>
                      <i className="icon-long-arrow-right"></i>
                    </ALink>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>

          <div className="application-heading mb-3 d-flex justify-content-between align-items-center resourceheadingmbl">
            <h3>Planning Ideas</h3>
            <ALink
              href={"/planning-ideas/"}
              className="btn btn-outline-darker btn-more"
            >
              <span> View Planning Ideas</span>
              <i className="icon-long-arrow-right"></i>
            </ALink>
          </div>

          <div className="row plannings-container-ideas mb-5">
            <div className="col-lg-8 col-sm-8 col-xs-12">
              <div className="planning-imgs imageWrapper">
                <img
                  src={resourcesdata?.planingIdeas[0]?.image}
                  style={{ height: "445px" }}
                />
                <div className="planingContent">
                  <p className="lead">Lorem Ipsum</p>
                  <h2 className="title">Lorem ipsum dolor sit amet</h2>
                  <ALink
                    href={"/planning-ideas/"}
                    className="btn btn-sm btn-minwidth btn-outline-primary-2"
                  >
                    <span>Click Here</span>
                    <i className="icon-long-arrow-right"></i>
                  </ALink>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-4 col-xs-12">
              <div className="planning-imgs mb-2 imageWrapper2">
                <img src={resourcesdata?.planingIdeas[1]?.image} />
                <div className="planingContent2">
                  <p className="lead">Lorem Ipsum</p>
                  <h2 className="title">Lorem ipsum dolor sit amet</h2>
                  <ALink
                    href={"/planning-ideas/"}
                    className="btn btn-sm btn-minwidth btn-outline-primary-2"
                  >
                    <span>Click Here</span>
                    <i className="icon-long-arrow-right"></i>
                  </ALink>
                </div>
              </div>
              <div className="planning-imgs imageWrapper3">
                <img src={resourcesdata?.planingIdeas[2]?.image} />
                <div className="planingContent3">
                  <p className="lead">Lorem Ipsum</p>
                  <h2 className="title">Lorem ipsum dolor sit amet</h2>
                  <ALink
                    href={"/planning-ideas/"}
                    className="btn btn-sm btn-minwidth btn-outline-primary-2"
                  >
                    <span>Click Here</span>
                    <i className="icon-long-arrow-right"></i>
                  </ALink>
                </div>
              </div>
            </div>
          </div>

          <div className="application-heading text-center mb-3">
            <h3>Brochures and Images</h3>
          </div>

          <div className="top-management-application-tabs">
            <Tabs defaultIndex={0} selectedTabClassName="show">
              <TabList
                className="nav nav-pills justify-content-center mb-3"
                id="tabs-6"
                role="tablist"
              >
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
                      <ResponsiveMasonry
                        columnsCountBreakPoints={{
                          1100: 3,
                          700: 2,
                          500: 1,
                        }}
                      >
                        <Masonry gutter="15px">
                          {item.categorieBrochures.map((item2, index2) => (
                            <div className="workspaceWrper">
                              <img
                                key={index2}
                                src={item2.image}
                                style={{ width: "100%", display: "block" }}
                              />
                              <div className="worspaceContent">
                                <h3>{item2.title}</h3>
                                <p className="lead">Lorem Ipsum</p>
                              </div>
                            </div>
                          ))}
                        </Masonry>
                      </ResponsiveMasonry>
                    </div>
                  </TabPanel>
                ))}
              </div>
            </Tabs>
          </div>
          <center>
            <ALink
              href={"/pages/brouchure-images"}
              className="btn btn-outline-darker btn-more mb-5"
            >
              <span>View All Brochures & Images</span>
              <i className="icon-long-arrow-right"></i>
            </ALink>
          </center>
        </div>
        {/* <hr className="mb-6" /> */}
        <div className="fabricwrapper mb-5">
          <div className="container">
            <div
              className="row plannings-container-ideas"
              style={{ alignItems: "center" }}
            >
              <div className="col-lg-4 col-sm-6 col-xs-12">
                <div className="application-heading mb-3">
                  <h3>{resourcesdata?.fabricFinished?.title}</h3>
                </div>
                <p className="fbsubtitle">
                  {resourcesdata?.fabricFinished?.sub_title}
                </p>
                <div
                  className="mb-2"
                  dangerouslySetInnerHTML={{
                    __html: resourcesdata?.fabricFinished?.description,
                  }}
                />
                <ALink
                  href={"/fabric-finishes/sidebar/4cols/"}
                  className="btn btn-outline-darker btn-more"
                >
                  <span>View All Fabric & Finishes</span>
                  <i className="icon-long-arrow-right"></i>
                </ALink>
              </div>
              <div className="col-lg-8 col-sm-6 col-xs-12">
                <OwlCarousel
                  adClass="owl-simple owl-light owl-nav-inside mb-3 fabric_finished"
                  options={fabricFinishedSlider}
                >
                  {resourcesdata?.fabricFinished?.fabricFinished_images?.map(
                    (item, index) => (
                      <div key={index}>
                        <img src={item.avatar} style={{ height: "325px" }} />
                      </div>
                    )
                  )}
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>

        <div className="application-heading mb-3 text-center">
          <h3>Video Gallery</h3>
        </div>
        <div className="container">
          <div className="row video-gallery mb-3">
            {videoList?.length > 0 ? (
              videoList?.slice(0, 8)?.map((x, i) =>
                i <= 6 ? (
                  <div className="col-lg-3 col-sm-6 col-xs-12" key={i}>
                    <div className="planning-imgs videoWrapper">
                      <img src={x?.thumbnail} className="img-fluid" />
                      <div className="videoContent">
                        <a
                          href={x?.video_link}
                          className="btn-iframe"
                          onClick={openVideoModal}
                        >
                          <i className="icon-play-outline icon"></i>
                        </a>
                      </div>
                    </div>
                    <p className="videotitle">{x?.title}</p>
                  </div>
                ) : (
                  <div className="col-lg-3 col-sm-6 col-xs-12">
                    <div className="planning-imgs videoWrapper2">
                      <ALink href={"/pages/video-gallery"}>
                        <img src={x?.thumbnail} className="img-fluid" />
                        <div className="videoContent2">View All</div>
                      </ALink>
                    </div>
                  </div>
                )
              )
            ) : (
              <p
                style={{
                  fontSize: "20px",
                  textAlign: "center",
                  fontWeight: "bold",
                  display: "block",
                  width: "100%",
                }}
              >
                No Video found.
              </p>
            )}
          </div>
        </div>

        <BlogCollection posts={bloglist} />
      </div>
    </div>
  );
}

// export default React.memo(Innovations);
// export default withApollo({ ssr: typeof window == 'undefined' })(Innovations);
export default withApollo({ ssr: typeof window == undefined })(
  connect(null, { ...demoAction })(Resources)
);
