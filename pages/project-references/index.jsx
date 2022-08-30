import { useEffect, useState } from "react";
import ALink from "~/components/features/alink";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import withApollo from "~/server/apollo";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ContactForm from "../contact-form/contact-form";
import { API } from "~/http/API";

function ProjectReferences() {
  const [projectsList, setProjectsList] = useState();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categoryList, setCategoryList] = useState("");

  useEffect(() => {
    API.get(`/project-category-list/`)
      .then((response) => {
        setCategoryList(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    API.get(`/all-project/${selectedCategory}`)
      .then((response) => {
        setProjectsList(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedCategory]);

  return (
    <div className="main prefrences-page">
      <nav className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
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
                <Tab
                  className="nav-item"
                  onClick={() => setSelectedCategory("all")}
                >
                  <span className="nav-link">All</span>
                </Tab>
                {categoryList?.length > 0 &&
                  categoryList.map((item, index) => (
                    <Tab
                      className="nav-item"
                      key={index}
                      onClick={() => setSelectedCategory(`${item.route}`)}
                    >
                      <span className="nav-link">{item.name}</span>
                    </Tab>
                  ))}
              </TabList>
              <div className="tab-pane tab-content">
                {categoryList?.length > 0 &&
                  categoryList.map((item, index) => (
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
                            {projectsList?.length > 0 ? (
                              projectsList.map((x, i) => (
                                <div className="furnitureWrper">
                                  <ALink
                                    href={`/project-references/${x.route}`}
                                  >
                                    <img
                                      key={i}
                                      src={x.featured_img}
                                      style={{
                                        width: "100%",
                                        // height: "250px",
                                        display: "block",
                                      }}
                                    />
                                  </ALink>
                                  <div className="furnitureContent">
                                    <p className="lead">
                                      {x.project_category.map((t, ind) => (
                                        <span key={ind} className="mr-2">
                                          {t.name},
                                        </span>
                                      ))}
                                    </p>
                                    <h3>{x.title}</h3>
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
                                No project found.
                              </p>
                            )}
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
