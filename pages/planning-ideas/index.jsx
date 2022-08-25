import { useEffect, useState } from "react";
import ALink from "~/components/features/alink";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import withApollo from "~/server/apollo";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ContactForm from "../contact-form/contact-form";
import { actions as demoAction } from "~/store/demo";
import { fadeIn } from "~/utils/data";
import Reveal from "react-awesome-reveal";
import { connect } from "react-redux";

const axios = require("axios");

function PlaningIdeas() {
  const [resourcesdata, setResourcesdata] = useState();

  useEffect(() => {
    axios
      .get(
        "https://prismcloudhosting.com/BAFCO_APIs/public/v1/api/pages/resources?en"
      )
      .then(function (response) {
        setResourcesdata(response.data.content);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
          <div className="application-heading text-center mb-3">
            <h3>Lorem ipsum</h3>
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
                  <TabPanel key={index}>
                    <div className="mb-5">
                      <ResponsiveMasonry
                        columnsCountBreakPoints={{
                          1100: 3,
                          700: 2,
                          500: 1,
                        }}
                      >
                        <Masonry gutter="2rem">
                          {item.categorieBrochures.map((item2, index2) => (
                            <div className="furnitureWrper">
                              <ALink href={`/planning-ideas/${item2.route}`}>
                                <img
                                  key={index2}
                                  src={item2.image}
                                  style={{
                                    width: "100%",
                                    height: "250px",
                                    display: "block",
                                  }}
                                />
                              </ALink>
                              <div className="furnitureContent">
                                <p className="lead">Category</p>
                                <h3>{item2.title}</h3>
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
        </div>
        <ContactForm />
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
