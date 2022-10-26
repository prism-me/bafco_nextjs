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
import Lightbox from "react-image-lightbox";
import { saveAs } from "file-saver";
import Helmet from "react-helmet";



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

  const downloadImg = (downloadImg) => {
    if (downloadImg) {
      saveAs(downloadImg, "image.jpg");
    }
  };

  const initilindex = { index: 0 };
  const [photoIndex, setPhotoIndex] = useState(initilindex);

  return (
    <div className="main prefrencesInner-page">
      <Helmet>
        <title>{projectDetail?.seo?.meta_title}</title>
        <meta name="description" content={`${projectDetail?.seo?.meta_description}`} />
      </Helmet>
      <nav className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink href="/project-gallery/">Project Gallery</ALink>
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
                {projectDetail.files &&
                  projectDetail.files.length > 0 &&
                  projectDetail.files[0].url !== null && (
                    <div className="btnWrapper">
                      {projectDetail.files.map((t, ind) => (
                        <button
                          className="btn btn-sm btn-minwidth btn-outline-primary-2"
                          key={ind}
                          onClick={() => downloadImg(t?.url)}
                        >
                          <i className="icon-arrow-down"></i>
                          <span>{t.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className="top-management-application-slider isotopeSelector mb-5">
            <OwlCarousel
              adClass="owl-simple owl-light"
              options={projectReferenceInnerSlider}
            >
              {projectDetail?.additional_img?.map((x, i) => (
                <div className="overlay">
                  <div className="border-portfolio">
                    <div
                      className="zoom_gallery"
                      data-source={
                        projectDetail?.additional_img[photoIndex.index]?.avatar
                      }
                      title=""
                    >
                      <div
                        className="overlay-background"
                        onClick={() =>
                          setPhotoIndex({
                            ...photoIndex,
                            index: i,
                            isOpen: true,
                          })
                        }
                      >
                        <i className="icon-plus iconStyle"></i>
                      </div>
                      <img
                        alt=""
                        className="img-fluid blur-up lazyload imgSliderStyle"
                        src={x.avatar}
                      />
                      {photoIndex.isOpen && (
                        <Lightbox
                          mainSrc={
                            projectDetail?.additional_img[photoIndex.index]
                              ?.avatar
                          }
                          nextSrc={
                            projectDetail?.additional_img[
                            (photoIndex.index + 1) %
                            projectDetail?.additional_img.length
                            ]
                          }
                          prevSrc={
                            projectDetail?.additional_img[
                            (photoIndex.index +
                              projectDetail?.additional_img.length -
                              1) %
                            projectDetail?.additional_img.length
                            ]
                          }
                          imageTitle={
                            photoIndex.index +
                            1 +
                            "/" +
                            projectDetail?.additional_img.length
                          }
                          onCloseRequest={() =>
                            setPhotoIndex({ ...photoIndex, isOpen: false })
                          }
                          onMovePrevRequest={() =>
                            setPhotoIndex({
                              ...photoIndex,
                              index:
                                (photoIndex.index +
                                  projectDetail?.additional_img.length -
                                  1) %
                                projectDetail?.additional_img.length,
                            })
                          }
                          onMoveNextRequest={() =>
                            setPhotoIndex({
                              ...photoIndex,
                              index:
                                (photoIndex.index + 1) %
                                projectDetail?.additional_img.length,
                            })
                          }
                        />
                      )}
                    </div>
                  </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default withApollo({ ssr: typeof window == undefined })(
  connect(null, { ...demoAction })(ProjectReferencesInner)
);
