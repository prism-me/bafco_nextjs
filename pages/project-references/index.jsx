import { useEffect, useState } from "react";
import ALink from "~/components/features/alink";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import withApollo from "~/server/apollo";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ContactForm from "../contact-form/contact-form";

const axios = require("axios");

function ProjectReferences() {
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
    <div className="main prefrences-page">
      <nav className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink href="/pages/resources">Resources</ALink>
            </li>
            <li className="breadcrumb-item active">Project References</li>
          </ol>
        </div>
      </nav>

      <div className="page-content pb-0">
        <div className="container">
          <div className="application-heading mb-5 text-center">
            <h3>Project Gallery</h3>
            <p className="subtitle">
              Workspaces as unique as the people who work in them.
            </p>
            <p>
              Sed pretium, ligula sollicitudin laoreet viverra, tortor libero
              sodales leo, eget blandit nunc tortor eu nibh. Suspendisse
              potenti. Sed egestas, ante et vulputate volutpat, uctus metus
              libero eu augue.Sed pretium, ligula sollicitudin laoreet viverra,
              tortor libero sodales leo, eget blandit nunc tortor eu nibh.
              Suspendisse potenti. Sed egestas, ante et vulputate volutpat,
              uctus metus libero eu augue.Sed pretium, ligula sollicitudin
              laoreet viverra, tortor libero sodales leo, eget blandit nunc
              tortor eu nibh. Suspendisse potenti. Sed egestas, ante et
              vulputate volutpat, uctus metus libero eu augue.Sed pretium,
              ligula sollicitudin laoreet viverra, tortor libero sodales leo,
              eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed
              egestas, ante et vulputate volutpat, uctus metus libero eu
            </p>
          </div>

          <div className="application-heading text-center mb-3">
            <h3>Furniture</h3>
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
                              <ALink
                                href={`/project-references/${item2.route}`}
                              >
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
      </div>
    </div>
  );
}

export default withApollo({ ssr: typeof window == undefined })(
  ProjectReferences
);
