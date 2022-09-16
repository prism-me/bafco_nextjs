import { useEffect, useState } from "react";
import ALink from "~/components/features/alink";
import withApollo from "~/server/apollo";
import ContactForm from "../contact-form/contact-form";
import { actions as demoAction } from "~/store/demo";
import { API } from "~/http/API";
import { fadeIn } from "~/utils/data";
import Reveal from "react-awesome-reveal";
import { connect } from "react-redux";

function PlaningIdeas() {
  const [planningList, setPlanningList] = useState();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categoryList, setCategoryList] = useState("");

  const planningPerRow = 6;
  const [loadItems, setLoadItems] = useState(planningPerRow);

  const handleLoadMore = () => {
    setLoadItems(loadItems + planningPerRow);
  };

  useEffect(() => {
    API.get(`/plan-category-list`)
      .then((response) => {
        setCategoryList(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    API.get(`/plan-filter/${selectedCategory}`)
      .then((response) => {
        setPlanningList(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedCategory]);

  return (
    <div className="main planing-ideas-page">
      <nav className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item active">Planning Ideas</li>
          </ol>
        </div>
      </nav>

      <div className="page-content pb-0">
        <div className="container">
          <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
            <div className="heading heading-center mb-3">
              <h2 className="title">Planning Ideas</h2>
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
            <div className="products mb-5">
              <div className="row">
                {planningList?.length > 0 ? (
                  planningList?.slice(0, loadItems)?.map((x, i) => (
                    <div className="col-6 col-md-6 col-lg-4" key={i}>
                      <div className="furnitureWrper">
                        <ALink href={`/planning-ideas/${x.id}`}>
                          <img
                            key={i}
                            src={x.thumbnail_img}
                            style={{
                              width: "100%",
                              // height: "250px",
                              display: "block",
                            }}
                          />
                        </ALink>
                        <div className="furnitureContent">
                          <p className="lead">{x?.plan_category?.name}</p>
                          <h3>{x.title}</h3>
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
              {loadItems < planningList?.length && (
                <div
                  className={
                    "d-flex justify-content-center align-items-center mt-3"
                  }
                >
                  <button
                    onClick={handleLoadMore}
                    className={`btn btn-sm btn-minwidth btn-outline-primary-2`}
                  >
                    <span>Load More</span>
                    <i className="icon-long-arrow-right"></i>
                  </button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
        <ContactForm type={"planning_ideas_form"} />
        <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
          <div
            className="footer-newsletter bg-image"
            style={{
              backgroundImage:
                "url(images/backgrounds/NewsletterBackground.jpg)",
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
    </div>
  );
}

export default withApollo({ ssr: typeof window == undefined })(
  connect(null, { ...demoAction })(PlaningIdeas)
);
