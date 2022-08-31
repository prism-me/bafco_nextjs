import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ALink from "~/components/features/alink";
import withApollo from "~/server/apollo";
import { actions as demoAction } from "~/store/demo";
import OwlCarousel from "~/components/features/owl-carousel";
import {
  projectReferenceInnerSlider,
  projectRelatedProductsInnerSlider,
} from "~/utils/data";
import { API } from "~/http/API";
import RelatedProducts from "./related-products";

function ProjectReferencesInner(props) {
  const slug = useRouter().query.slug;
  const [projectDetail, setProjectDetail] = useState("");
  const [relatedProduct, setrelatedProduct] = useState([]);

  useEffect(() => {
    API.get(`/project-detail/${slug}`)
      .then((response) => {
        setProjectDetail(response?.data?.project);
        setrelatedProduct(response?.data?.relatedProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);

  return (
    <div className="main prefrencesInner-page">
      <nav className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink href="/project-references/">Project References</ALink>
            </li>
            <li className="breadcrumb-item active">{projectDetail.title}</li>
          </ol>
        </div>
      </nav>

      <div className="page-content">
        <div className="container">
          <div className="referencesinnerwrapper mb-5">
            <div
              className="row plannings-container-ideas"
              style={{ alignItems: "center" }}
            >
              <div className="col-lg-4 col-sm-6 col-xs-12 prDeatilColmblspace">
                <div className="application-heading mb-3">
                  <h3>{projectDetail.title}</h3>
                </div>
                <h3 className="prefresubheading">
                  {projectDetail.project_category &&
                    projectDetail.project_category.length > 0 &&
                    projectDetail.project_category.map((t, ind) => (
                      <span key={ind} className="mr-2">
                        {t.name},
                      </span>
                    ))}
                </h3>
                <p
                  className="prefresubtitle"
                  dangerouslySetInnerHTML={{
                    __html: projectDetail.description,
                  }}
                ></p>
              </div>
              <div className="col-lg-8 col-sm-6 col-xs-12">
                <img
                  src={projectDetail.featured_img}
                  className="img-fluid mb-2"
                />
                <div className="btnWrapper">
                  {projectDetail.files &&
                    projectDetail.files.length > 0 &&
                    projectDetail.files.map((t, ind) => (
                      <a
                        href={t.url}
                        without
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <button
                          className="btn btn-sm btn-minwidth btn-outline-primary-2"
                          key={ind}
                        >
                          <i className="icon-arrow-down"></i>
                          <span>{t.name}</span>
                        </button>
                      </a>
                    ))}

                  {/* <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
                    <i className="icon-arrow-down"></i>
                    <span>Autocad 2D (47.92 KB)</span>
                  </button>
                  <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
                    <i className="icon-arrow-down"></i>
                    <span>Autocad 3D (2.28 MB)</span>
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="top-management-application-slider mb-5">
            <OwlCarousel
              adClass="owl-simple owl-light"
              options={projectReferenceInnerSlider}
            >
              {projectDetail?.additional_img?.map((x, i) => (
                <div className="top-management-application" key={i}>
                  <img src={x.avatar} />
                </div>
              ))}
            </OwlCarousel>
          </div>

          <div className="application-heading mb-3">
            <h3>Related Products</h3>
          </div>

          <div className="top-management-application-slider mb-3 relatedProductwrape">
            <OwlCarousel
              adClass="owl-simple carousel-equal-height carousel-with-shadow cols-lg-4 cols-md-3 cols-xs-2 cols-1"
              isTheme={false}
              options={projectRelatedProductsInnerSlider}
            >
              {relatedProduct &&
                relatedProduct.length > 0 &&
                relatedProduct.map((product, index) => (
                  <RelatedProducts product={product} key={index} />
                ))}
            </OwlCarousel>
            {/* <OwlCarousel
              adClass="owl-simple owl-light"
              options={projectReferenceInnerSlider}
            >
              {relatedProduct &&
                relatedProduct.length > 0 &&
                relatedProduct.map((product, index) => (
                  <ProductTwelve product={product} key={index} />
                  // <div className="top-management-application" key={index}>
                  //   <img src={product.featured_image} />
                  //   <h3>{product.brand}</h3>
                  //   <p>{product.name}</p>
                  // </div>
                ))}
            </OwlCarousel> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withApollo({ ssr: typeof window == undefined })(
  connect(null, { ...demoAction })(ProjectReferencesInner)
);
