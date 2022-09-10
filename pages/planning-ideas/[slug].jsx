import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ALink from "~/components/features/alink";
import withApollo from "~/server/apollo";
import { actions as demoAction } from "~/store/demo";
import Reveal from "react-awesome-reveal";
import { fadeIn } from "~/utils/data";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestShareButton,
  PinterestIcon,
} from "react-share";
import { API } from "~/http/API";

function PlaningIdeasInner(props) {
  const slug = useRouter().query.slug;
  const [planDetail, setPlanDetail] = useState("");

  useEffect(() => {
    API.get(`/plan-detail/${slug}`)
      .then((response) => {
        setPlanDetail(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);

  //featured image change on button click

  let featImg = "";
  if (planDetail.featured_img) {
    featImg = planDetail.featured_img[0];
  }

  const [featuredImg, setFeaturedImg] = useState(featImg);

  useEffect(() => {
    setFeaturedImg(featImg);
  }, [featImg]);

  const changeTab = (tabtext) => {
    planDetail.featured_img.forEach((item) => {
      if (item.name === tabtext) {
        setFeaturedImg(item);
      }
    });
  };

  return (
    <div className="main planingIdeasInner-page">
      <nav className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink href="/planning-ideas/">Planning Ideas</ALink>
            </li>
            <li className="breadcrumb-item active">{planDetail?.title}</li>
          </ol>
        </div>
      </nav>

      <div className="page-content">
        <div className="container">
          <div className="planninginnerwrapper">
            <div className="row plannings-container-ideas">
              <div className="col-lg-6 col-sm-6 col-xs-12">
                <div className="application-heading mb-3">
                  <h3>Concept details</h3>
                </div>

                <div className="mb-3">
                  <p dangerouslySetInnerHTML={{ __html: planDetail?.concept }}>
                    {/* <span className="prefresubtitle">Concept : </span>Private
                    Office, Sit-to-stand{" "} */}
                  </p>
                </div>

                <p className="subtitle mb-3">Available formats</p>

                <div className="btnWrapper mb-3">
                  {planDetail.files &&
                    planDetail.files.length > 0 &&
                    planDetail.files.map((t, ind) => (
                      <a
                        href={t.url === null ? t?.file_link : t?.url}
                        without
                        rel="noopener noreferrer"
                        target="_blank"
                        // download
                      >
                        <button
                          className="btn btn-sm btn-minwidth btn-outline-primary-2 mr-3"
                          key={ind}
                        >
                          <i className="icon-arrow-down"></i>
                          <span>{t.name}</span>
                        </button>
                      </a>
                    ))}
                </div>

                <p className="subtitle mb-3">Documentation</p>

                <div className="docWrape mb-3">
                  <div className="row">
                    <div className="col-lg-6 col-sm-12 col-xs-12 colStyle">
                      <div className="colSpace">
                        <p>I’m already an Bafco member</p>
                        <form>
                          <div className="form-group">
                            <label for="email">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="E-mail *"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label for="password">Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              placeholder="Password *"
                              required
                            />
                            <p style={{ color: "#ee3124" }}>
                              <small>Forgot your password?</small>
                            </p>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="form-group form-check mb-0">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="exampleCheck1"
                              />
                              <label
                                className="form-check-label ml-3"
                                for="exampleCheck1"
                              >
                                Remember Me
                              </label>
                            </div>
                            <button className="btn btn-sm btn-minwidth btn-outline-primary-2 mt-2">
                              <span>Sign in</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-xs-12">
                      <div className="colSpace">
                        <p>I don't have an account yet.</p>
                        <p>
                          Obtaining an account takes up to 72 hours (business
                          days only, Customer service opening hours, from Monday
                          to Friday, between 8 A.M. and 5 P.M.).
                        </p>
                        <button className="btn btn-sm btn-minwidth btn-outline-primary-2 mt-2">
                          <span>Request an access</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="subtitle mb-3">Share</p>
                <div className="shareBtnWrape">
                  <div className="shareBtn">
                    <FacebookShareButton
                      url={`https://bafco-next.herokuapp.com//planning-ideas/`}
                      hashtag={"#BAFCO"}
                      quote={"Planning Ideas"}
                    >
                      <FacebookIcon size={36} />
                    </FacebookShareButton>
                  </div>
                  <div className="shareBtn">
                    <LinkedinShareButton
                      url={`https://bafco-next.herokuapp.com//planning-ideas/`}
                      title={"Planning Ideas"}
                      summary={"Planning Ideas"}
                      source={"BAFCO"}
                    >
                      <LinkedinIcon size={36} />
                    </LinkedinShareButton>
                  </div>
                  <div className="shareBtn">
                    <PinterestShareButton
                      url={`https://bafco-next.herokuapp.com//planning-ideas/`}
                      media={`https://bafco-next.herokuapp.com//planning-ideas/`}
                      description={"Planning Ideas"}
                    >
                      <PinterestIcon size={36} />
                    </PinterestShareButton>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6 col-xs-12">
                <img src={featuredImg?.img} className="img-fluid mb-2" />
                <div className="btnWrapper">
                  {planDetail.featured_img &&
                    planDetail.featured_img.length > 0 &&
                    planDetail.featured_img.map((name, index) => (
                      <button
                        className={`btn btn-sm btn-minwidth btn-outline-primary-2 mr-2 ${
                          featuredImg?.name === name?.name && "active"
                        }`}
                        key={index}
                        onClick={() => changeTab(name.name)}
                      >
                        <span>{name.name}</span>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
        <div
          className="footer-newsletter bg-image"
          style={{
            backgroundImage: "url(images/backgrounds/NewsletterBackground.jpg)",
          }}
        >
          <div className="container">
            <div className="heading text-center">
              <h3 className="title">Keep in Touch</h3>

              <p className="title-desc">Join Our Newsletter</p>
            </div>

            <div className="row">
              <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                <form action="#">
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your Email Address"
                      aria-label="Email Adress"
                      aria-describedby="newsletter-btn"
                      required
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        id="newsletter-btn"
                      >
                        <span>Subscribe</span>
                        <i className="icon-long-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default withApollo({ ssr: typeof window == undefined })(
  connect(null, { ...demoAction })(PlaningIdeasInner)
);
