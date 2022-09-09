import { useEffect, useState } from "react";
import ALink from "~/components/features/alink";
import PageHeader from "~/components/features/page-header";
import withApollo from "~/server/apollo";
import Reveal from "react-awesome-reveal";
import { connect } from "react-redux";
import { actions as demoAction } from "~/store/demo";
import OwlCarousel from "~/components/features/owl-carousel";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import BlogCollection from "~/components/partials/home/blog-collection";
import { API } from "~/http/API";
import { fadeIn } from "~/utils/data";
import { introSlider, fabricFinishedSlider } from "~/utils/data";

function Resources(props) {
  const [resourcesdata, setResourcesdata] = useState();
  const [projectsData, setProjectsData] = useState();
  const [plansData1, setPlansData1] = useState();
  const [plansData2, setPlansData2] = useState();
  const [plansData3, setPlansData3] = useState();
  const [blogsData, setBlogsData] = useState();
  const [videosData, setVideosData] = useState();

  useEffect(() => {
    API.get(`/home-resource`)
      .then((response) => {
        setProjectsData(response?.data?.project);
        setPlansData1(response?.data?.plans[0]);
        setPlansData2(response?.data?.plans[1]);
        setPlansData3(response?.data?.plans[2]);
        setVideosData(response?.data?.videos);
        setBlogsData(response?.data?.blog);
        setResourcesdata(response?.data?.page?.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [brochuresList, setBrochuresList] = useState();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categoryList, setCategoryList] = useState("");

  useEffect(() => {
    API.get(`/brochure-category-list`)
      .then((response) => {
        setCategoryList(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    API.get(`/brochure-filter/${selectedCategory}`)
      .then((response) => {
        setBrochuresList(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedCategory]);

  function openVideoModal(e) {
    e.preventDefault();
    props?.showVideo();
  }

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
            {projectsData?.slice(0, 1)?.map((item, index) => (
              <div
                className="intro-slide slide1"
                key={index}
                style={{
                  backgroundColor: "#EDF2F0",
                  backgroundImage: `url(${item.featured_img})`,
                }}
              >
                <div className="container intro-content">
                  <div className="project-reference-slider-cont">
                    <p className="lead text-primary">{item.sub_title}</p>
                    <h2 className="title">{item.title}</h2>
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
                  src={
                    // plansData &&
                    // plansData.lenth > 0 &&
                    plansData1?.thumbnail_img
                  }
                  style={{ height: "500px" }}
                />
                <div className="planingContent">
                  <p className="lead">{plansData1?.sub_title}</p>
                  <h2 className="title">{plansData1?.title}</h2>
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
                <img
                  src={plansData2?.thumbnail_img}
                  style={{ height: "240px" }}
                />
                <div className="planingContent2">
                  <p className="lead">{plansData2?.sub_title}</p>
                  <h2 className="title">{plansData2?.title}</h2>
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
                <img
                  src={plansData3?.thumbnail_img}
                  style={{ height: "240px" }}
                />
                <div className="planingContent3">
                  <p className="lead">{plansData3?.sub_title}</p>
                  <h2 className="title">{plansData3?.title}</h2>
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

          <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
            <div className="container">
              <div className="heading heading-center mb-3">
                <h2 className="title">Brochures and Images</h2>
              </div>
              <div className="top-collection  mb-3">
                <ul
                  className="nav nav-pills nav-border-anim justify-content-center"
                  role="tablist"
                >
                  <li
                    className={`nav-item ${
                      selectedCategory === "all" ? "show" : ""
                    }`}
                    onClick={() => setSelectedCategory("all")}
                  >
                    <span className="nav-link">All</span>
                  </li>
                  {categoryList?.length > 0 &&
                    categoryList.map((item, index) => (
                      <li
                        key={index}
                        className={`nav-item ${
                          selectedCategory === `${item.route}` ? "show" : ""
                        }`}
                        onClick={() => setSelectedCategory(`${item.route}`)}
                      >
                        <span className="nav-link">{item.name}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="container mb-6">
              <ResponsiveMasonry
                columnsCountBreakPoints={{
                  1100: 3,
                  700: 2,
                  500: 1,
                }}
              >
                <Masonry gutter="15px">
                  {brochuresList?.length > 0 ? (
                    brochuresList?.slice(0, 9)?.map((x, i) => (
                      <div className="workspaceWrper">
                        <img
                          key={i}
                          src={x.featured_img}
                          style={{ width: "100%", display: "block" }}
                        />
                        <div className="worspaceContent">
                          <h3>{x.title}</h3>
                          <p className="lead">
                            {x?.broucher_category &&
                              x?.broucher_category?.length > 0 &&
                              x?.broucher_category?.map((cat, ind) => (
                                <span key={ind}>{cat?.name}, </span>
                              ))}
                          </p>
                        </div>
                      </div>
                    ))
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
                      No Item found.
                    </p>
                  )}
                </Masonry>
              </ResponsiveMasonry>
            </div>
          </Reveal>
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
            {videosData?.length > 0 ? (
              videosData?.slice(0, 8)?.map((x, i) =>
                i <= 6 ? (
                  <div className="col-lg-3 col-sm-6 col-xs-12" key={i}>
                    <div className="planning-imgs videoWrapper">
                      <img src={x?.thumbnail} className="img-fluid" />
                      <div className="videoContent">
                        <a
                          href={x?.link}
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

        <BlogCollection posts={blogsData} />
      </div>
    </div>
  );
}

// export default React.memo(Innovations);
// export default withApollo({ ssr: typeof window == 'undefined' })(Innovations);
export default withApollo({ ssr: typeof window == undefined })(
  connect(null, { ...demoAction })(Resources)
);
