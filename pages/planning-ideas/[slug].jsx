import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ALink from "~/components/features/alink";
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
import { saveAs } from "file-saver";
import { actions as globalAction } from "~/store/global";
import { toast } from "react-toastify";
import Helmet from "react-helmet";
import Subscribe from "../subscribe/subscribe";

function PlaningIdeasInner(props) {
  const slug = useRouter().query.slug;

  //login api

  const userForm = {
    name: "",
    email: "",
    password: "",
    user_type: "user",
  };
  const [userFormData, setUserFormData] = useState({ ...userForm });
  const [loading, setLoading] = useState(false);

  const handleInit = (e) => {
    let formdata = { ...userFormData };
    formdata[e.target.name] = e.target.value;
    setUserFormData(formdata);
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let formdata = { ...userFormData };
    setLoading(true);
    API.post(`/auth/login`, formdata)
      .then((response) => {
        console.log("response :: ", response);
        if (response?.status === 200) {
          setLoading(false);
          window.location.reload(false);
          toast.success(response?.data);
          localStorage.setItem("authtoken", response?.headers?.x_auth_token);
        } else {
          setLoading(false);
          toast.warning("Somthing went wrong !");
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data);
      });
  };

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

  const downloadImg = (downloadImg) => {
    if (downloadImg) {
      saveAs(downloadImg, "image.jpg");
    }
  };

  //auth login
  const [authtoken, setAuthtoken] = useState("");

  useEffect(() => {
    setAuthtoken(localStorage.getItem("authtoken"));
  }, [authtoken]);

  function openModal(e) {
    e.preventDefault();
    // setOpen(true);
    props.showPopup(true);
  }

  return (
    <div className="main planingIdeasInner-page">
      <Helmet>
        <title>{planDetail?.seo?.meta_title}</title>
        <meta
          name="description"
          content={`${planDetail?.seo?.meta_description}`}
        />
      </Helmet>
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
                {console.log("authtoken ::", authtoken)}
                {authtoken === "" ||
                authtoken === null ||
                authtoken === undefined ? (
                  ""
                ) : (
                  <>
                    {planDetail.files &&
                      planDetail.files.length > 0 &&
                      (planDetail.files[0].url !== null ||
                        planDetail.files[0].file_link !== null) && (
                        <>
                          <p className="subtitle mb-3">Available formats</p>
                          <div className="btnWrapper mb-3">
                            {planDetail.files.map((t, ind) => (
                              <button
                                className="btn btn-sm btn-minwidth btn-outline-primary-2 mr-3"
                                key={ind}
                                onClick={() =>
                                  downloadImg(
                                    t.url === null ? t?.file_link : t?.url
                                  )
                                }
                              >
                                <i className="icon-arrow-down"></i>
                                <span>{t.name}</span>
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                  </>
                )}

                <p className="subtitle mb-3">Documentation</p>

                {authtoken === "" ||
                authtoken === null ||
                authtoken === undefined ? (
                  <div className="docWrape mb-3">
                    <div className="row">
                      <div className="col-lg-6 col-sm-12 col-xs-12 colStyle">
                        <div className="colSpace">
                          <p>I’m already an Bafco member</p>
                          <form onSubmit={handleLoginSubmit}>
                            <div className="form-group">
                              <label for="email">Email</label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="E-mail *"
                                required
                                name="email"
                                value={userFormData.email}
                                onChange={handleInit}
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
                                name="password"
                                value={userFormData.password}
                                onChange={handleInit}
                              />
                              {/* <p style={{ color: "#ee3124" }}>
                                <small>Forgot your password?</small>
                              </p> */}
                            </div>
                            <div
                            // className="d-flex justify-content-between align-items-center"
                            >
                              {/* <div className="form-group form-check mb-0">
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
                              </div> */}
                              {loading ? (
                                <div
                                  className="loader"
                                  style={{
                                    borderTopColor: "white",
                                    borderRightColor: "white",
                                    borderBottomColor: "white",
                                    borderLeftColor: "#008482",
                                    width: "sm"
                                      ? "6em"
                                      : "md"
                                      ? "10em"
                                      : "10em",
                                    height: "sm"
                                      ? "6em"
                                      : "md"
                                      ? "10em"
                                      : "10em",
                                  }}
                                />
                              ) : (
                                <button className="btn btn-sm btn-minwidth btn-outline-primary-2 mt-2">
                                  <span>Sign in</span>
                                </button>
                              )}
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-12 col-xs-12">
                        <div className="colSpace">
                          <p>I don't have an account yet.</p>
                          <p>
                            {/* Obtaining an account takes up to 72 hours (business
                            days only, Customer service opening hours, from
                            Monday to Friday, between 8 A.M. and 5 P.M.). */}
                            Are you an architect, designer or interior
                            influencer that needs a new ideas for your next
                            project? <strong>Sign up for</strong> the latest{" "}
                            <strong>workspace</strong> design{" "}
                            <strong>solution</strong> available{" "}
                            <strong>as</strong> 3D AutoCAD (DWG) and SketchUp 3D{" "}
                            <strong>(SKP) files</strong>.
                          </p>
                          <button
                            className="btn btn-sm btn-minwidth btn-outline-primary-2 mt-2"
                            onClick={openModal}
                          >
                            <span>Request an access</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="docdownloadbtnwrape">
                    <button
                      className="btn btn-sm btn-minwidth btn-outline-primary-2 mb-3"
                      onClick={() =>
                        downloadImg(
                          "http://www.africau.edu/images/default/sample.pdf"
                        )
                      }
                    >
                      <i className="icon-arrow-down"></i>
                      <span>Download Document</span>
                    </button>
                  </div>
                )}

                <p className="subtitle mb-3">Share</p>
                <div className="shareBtnWrape">
                  <div className="shareBtn">
                    <FacebookShareButton
                      url={`https://bafco-next.herokuapp.com/planning-ideas/${slug}`}
                      quote={`
                      ${planDetail?.title}
                      \n
                      Check out our latest plans here:
                                \n
                                https://bafco-next.herokuapp.com/planning-ideas`}
                      hashtag={"#BAFCO"}
                    >
                      <FacebookIcon size={36} />
                    </FacebookShareButton>
                  </div>
                  <div className="shareBtn">
                    <LinkedinShareButton
                      url={`https://bafco-next.herokuapp.com/planning-ideas`}
                      title={"BAFCO"}
                      source={`https://bafco-next.herokuapp.com/planning-ideas/${slug}`}
                      summary={`Check out our latest plans here:
                                \n
                                https://bafco-next.herokuapp.com/planning-ideas
                                `}
                    >
                      <LinkedinIcon size={36} />
                    </LinkedinShareButton>
                  </div>
                  <div className="shareBtn">
                    <PinterestShareButton
                      media={featuredImg?.img}
                      url={`https://bafco-next.herokuapp.com/planning-ideas/${slug}`}
                      description={`Check out our latest plans here:
                              \n
                              https://bafco-next.herokuapp.com/planning-ideas
                              `}
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
      <Subscribe />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    LoginModal: state.globalReducer.popupShow,
  };
};

export default connect(mapStateToProps, { ...globalAction })(PlaningIdeasInner);
