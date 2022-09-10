import Reveal from "react-awesome-reveal";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ALink from "~/components/features/alink";
import withApollo from "~/server/apollo";
import { actions as demoAction } from "~/store/demo";
import { fadeIn } from "~/utils/data";
import { API } from "~/http/API";
import ContactForm from "../contact-form/contact-form";

function BrouchureImages(props) {
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

  return (
    <div className="main brouchure-images-page">
      <nav className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item active">Brochures and Images</li>
          </ol>
        </div>
      </nav>

      <div className="page-content pb-0">
        <div className="container">
          <div className="brouchurewrapper mb-5">
            <div className="row plannings-container-ideas">
              <div className="col-lg-12 col-sm-12 col-xs-12">
                <div className="imgWrapper">
                  <img
                    src="images/brochureImages/brochureimg.png"
                    className="img-fluid mb-2"
                  />
                  <div className="bottom-left">
                    BAFCO <br />
                    Company Profile
                  </div>
                  <div className="top-right">
                    Sed pretium, ligula sollicitudin laoreet viverra, tortor
                    libero sodales leo, eget blandit nunc tortor eu nibh.
                    Suspendisse potenti. Sed egestas, ante et vulputate
                    volutpat, uctus metus libero eu augue.Sed pretium,
                  </div>
                </div>
                <div className="btnWrapper">
                  <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
                    <i className="icon-arrow-down"></i>
                    <span>Download Bafco Company Profile</span>
                  </button>
                  <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
                    <i className="icon-eye"></i>
                    <span>View Bafco Company Profile (via ISSUU)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <ContactForm />
        </div>

        <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
          <div className="container">
            <div className="heading heading-center mb-3">
              <h2 className="title">Downloads</h2>
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
          <div className="products">
            <div className="container">
              <div className="row">
                {/* <div className="col-12 col-md-12 col-lg-12">
                  <div className="mb-3 d-flex justify-content-between align-items-center brochureImagesWrapper">
                    <p className="subtitle">
                      Sed pretium, ligula sollicitudin laoreet viverra, tortor
                      libero sodales leo, eget blandit.
                    </p>
                    <form>
                      <div class="form-group">
                        <select className="form-control" id="showall">
                          <option>Show: All</option>
                          <option>dummy</option>
                          <option>Lorem</option>
                        </select>
                      </div>
                    </form>
                  </div>
                </div> */}
                {brochuresList?.length > 0 ? (
                  brochuresList?.map((x, i) => (
                    <div className="col-6 col-md-6 col-lg-4" key={i}>
                      <div className="downloadWrper">
                        <img
                          key={i}
                          src={x?.thumbnail_img}
                          style={{ width: "100%", display: "block" }}
                        />
                        <div className="downloadContent">
                          <p className="subtitle">{x?.title}</p>
                          <div className="downloadbtnWrapper">
                            {x.files &&
                              x.files.length > 0 &&
                              x.files.map((t, ind) => (
                                <a
                                  href={t.url === null ? t?.file_link : t?.url}
                                  without
                                  rel="noopener noreferrer"
                                  target="_blank"
                                >
                                  <button
                                    className="btn btn-sm btn-minwidth btn-outline-primary-2 mr-2"
                                    key={ind}
                                  >
                                    <span>{t.name}</span>
                                    <i className="icon-arrow-down"></i>
                                  </button>
                                </a>
                              ))}
                          </div>
                        </div>
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
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default withApollo({ ssr: typeof window == undefined })(
  connect(null, { ...demoAction })(BrouchureImages)
);
