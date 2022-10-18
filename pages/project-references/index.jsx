import { useEffect, useState } from "react";
import ALink from "~/components/features/alink";
import withApollo from "~/server/apollo";
import ContactForm from "../contact-form/contact-form";
import { API } from "~/http/API";
import { fadeIn } from "~/utils/data";
import Reveal from "react-awesome-reveal";

function ProjectReferences() {
  const [projectdata, setProjectdata] = useState();

  useEffect(() => {
    API.get(`/pages/project-references-page?en`)
      .then((response) => {
        setProjectdata(response.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [projectsList, setProjectsList] = useState();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categoryList, setCategoryList] = useState("");

  const projectsPerRow = 6;
  const [loadItems, setLoadItems] = useState(projectsPerRow);

  const handleLoadMore = () => {
    setLoadItems(loadItems + projectsPerRow);
  };

  useEffect(() => {
    API.get(`/project-category-list`)
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
            <h3>{projectdata?.intro?.title}</h3>
            <p className="subtitle">{projectdata?.intro?.sub_title}</p>
            <p
              className="descr"
              dangerouslySetInnerHTML={{
                __html: projectdata?.intro?.description,
              }}
            ></p>
          </div>

          <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
            <div className="container">
              <div className="heading heading-center mb-3">
                <h2 className="title">Furniture</h2>
              </div>
              <div className="top-collection  mb-3">
                <ul
                  className="nav nav-pills nav-border-anim justify-content-center"
                  role="tablist"
                >
                  <li
                    className={`nav-item ${selectedCategory === "all" ? "show" : ""
                      }`}
                    onClick={() => setSelectedCategory("all")}
                  >
                    <span className="nav-link">All</span>
                  </li>
                  {categoryList?.length > 0 &&
                    categoryList.map((item, index) => (
                      <li
                        key={index}
                        className={`nav-item ${selectedCategory === `${item.route}` ? "show" : ""
                          }`}
                        onClick={() => setSelectedCategory(`${item.route}`)}
                      >
                        <span className="nav-link">{item.name}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="products mb-5">
              <div className="container">
                <div className="row">
                  {projectsList?.length > 0 ? (
                    projectsList?.slice(0, loadItems).map((x, i) => (
                      <div className="col-6 col-md-6 col-lg-4" key={i}>
                        <div className="furnitureWrper">
                          <ALink href={`/project-references/${x.id}`}>
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
                {loadItems < projectsList?.length && (
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
            </div>
          </Reveal>
        </div>
        <ContactForm type={"project_references_form"} />
      </div>
    </div>
  );
}

export default withApollo({ ssr: typeof window == undefined })(
  ProjectReferences
);
