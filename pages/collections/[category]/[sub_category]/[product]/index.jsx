import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import GalleryDefault from "~/components/partials/product/gallery/gallery-default";
import DetailOne from "~/components/partials/product/details/detail-one";
import InfoOne from "~/components/partials/product/info-tabs/info-one";
import RelatedProductsOne from "~/components/partials/product/related/related-one";
import { mainSlider9 } from "~/utils/data";
import OwlCarousel from "~/components/features/owl-carousel";
import ALink from "~/components/features/alink";
import { API } from "~/http/API";
import LightBox from "react-image-lightbox";
import PageHeader from '~/components/features/page-header';
import { scrollToPageContentInstant } from '~/utils';
import Helmet from "react-helmet";

function ProductInner() {
  const router = useRouter();
  const query = router.query;
  const slug = useRouter().query?.product;
  const subCategoryslug = query?.sub_category?.split("-");
  const subCategoryName = subCategoryslug?.map((item) => item + " ");
  const categoryslug = query?.category?.split("-");
  const categoryName = categoryslug?.map((item) => item + " ");
  // const { loading } = useQuery(GET_PRODUCT, { variables: { slug } });
  const { loading } = false;
  const [product, setProduct] = useState();
  const [pageTitle, setPageTitle] = useState("");
  const [selectedVariation, setSelectedVariation] = useState("");
  const [randomProducts, setRandomProducts] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    // setQuery(router.query);
    // let slug1 = router.query?.product;
    // setSlug(slug1);
    // setSubCategoryName(query?.sub_category.replace('-', ' '));

    // setPageTitle(query?.product.replace('-', ' '));

    // console.log("useffect", query?.product);

    API.get(`/product-detail/${query?.product}`)
      .then((response) => {
        setProduct(response.data);
        setPageTitle(response?.data?.single_product_details?.product?.name);
        // setSubCategoryName(query?.sub_category);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [query?.product])

  useEffect(() => {
    scrollToPageContentInstant();
  }, [query])

  useEffect(() => {
    if (selectedVariation !== "") {
      router.push(
        `/collections/${query?.category}/${query?.sub_category}/${query?.product}?variationId=${selectedVariation}`
      );

      API.get(`/product-detail/${query?.product}/${selectedVariation}`)
        .then((response) => {
          setProduct(response?.data);
          setPageTitle(response?.data?.single_product_details?.product?.name);
          // setSubCategoryName(query?.sub_category);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (query?.variationId) {
        API.get(`/product-detail/${query?.product}/${query?.variationId}`)
          .then((response) => {
            setProduct(response?.data);
            setPageTitle(response?.data?.single_product_details?.product?.name);
            // setSubCategoryName(query?.sub_category);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // else {
      //   API.get(`/product-detail/${query?.product}`)
      //     .then((response) => {
      //       setProduct(response.data);
      //       setPageTitle(response?.data?.single_product_details?.product?.name);
      //       // setSubCategoryName(query?.sub_category);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // }
    }
    API.get(`random-products`)
      .then((response) => {
        setRandomProducts(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedVariation]);

  function moveNextPhoto() {
    setPhotoIndex(
      (photoIndex + 1) % product?.single_product_details?.product?.album.length
    );
  }

  function movePrevPhoto() {
    setPhotoIndex(
      (photoIndex +
        product?.single_product_details?.product?.album.length -
        1) %
      product?.single_product_details?.product?.album.length
    );
  }

  function openLightBox() {
    let index = parseInt(
      document.querySelector(".product-main-image").getAttribute("index")
    );

    if (!index) {
      index = 0;
    }
    setIsOpen(true);
    setPhotoIndex(index);
  }

  function closeLightBox() {
    setIsOpen(false);
  }

  return (
    <div className="main">
      <Helmet>
        <script type="text/javascript" src="https://cdn1.stamped.io/files/widget.min.js"></script>
        <script
          type="text/javascript"
          data-partytown-config
          dangerouslySetInnerHTML={{
            __html: `
            StampedFn.init({
              apiKey: 'key-3Md5j76g62ShEJ4G3U57SIy107P66a', 
              storeUrl: 'www.bafco.com' 
            });
            `,
          }}
        />

      </Helmet>
      <PageHeader
        title={''}
        subTitle=""
        backgroundImage={product?.single_product_details?.product?.banner_img !== "" && product?.single_product_details?.product?.banner_img !== null ? product?.single_product_details?.product?.banner_img : `images/banners/cat_banner.png`}
        buttonText=""
        buttonUrl="#"
      />
      <nav className="breadcrumb-nav mb-6">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink href={`/collections/${query?.category}`}>
                {categoryName}
              </ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink
                href={`/collections/${query?.category}/${query?.sub_category}`}
              >
                {subCategoryName}
              </ALink>
            </li>
            <li className="breadcrumb-item active">{pageTitle}</li>
          </ol>
        </div>
      </nav>

      <div className="page-content">
        <div className="container skeleton-body">
          <div className="product-details-top">
            <div className={`row skel-pro-single ${loading ? "" : "loaded"}`}>
              <div className="col-md-6">
                <div className="skel-product-gallery"></div>
                {product?.product_single_variation ? (
                  <GalleryDefault
                    product={
                      product?.product_single_variation
                        ?.product_variation_details
                    }
                  />
                ) : (
                  ""
                )}
              </div>

              <div className="col-md-6">
                <div className="entry-summary row">
                  <div className="col-md-12">
                    <div className="entry-summary1 mt-2 mt-md-0"></div>
                  </div>
                  <div className="col-md-12">
                    <div className="entry-summary2"></div>
                  </div>
                </div>
                {/* {console.log("product :: ", product)} */}
                <DetailOne
                  product={product}
                  subCategory={subCategoryName}
                  handelselectedVariation={setSelectedVariation}
                />
              </div>
            </div>
          </div>

          {product?.single_product_details?.product?.album?.length === 0 ? (
            ""
          ) : (
            <div className="product-lg position-relative mb-5">
              <OwlCarousel
                adClass="product-gallery-carousel owl-full owl-nav-dark cols-1 cols-md-2 cols-lg-3"
                options={mainSlider9}
              >
                {product?.single_product_details?.product?.album.map(
                  (item, index2) => (
                    <figure
                      className="product-main-image"
                      index="0"
                      key={index2}
                    >
                      <img src={item.avatar} alt={`product_${index2}`} />
                      <button
                        id="btn-product-gallery"
                        className="btn-product-gallery"
                        onClick={openLightBox}
                      >
                        <i className="icon-arrows"></i>
                      </button>
                    </figure>
                  )
                )}
              </OwlCarousel>
              {isOpen ? (
                <LightBox
                  mainSrc={
                    product?.single_product_details?.product?.album[photoIndex]
                      ?.avatar
                  }
                  nextSrc={
                    product?.single_product_details?.product?.album[
                      (photoIndex + 1) %
                      product?.single_product_details?.product?.album?.length
                    ].avatar
                  }
                  prevSrc={
                    product?.single_product_details?.product?.album[
                      (photoIndex +
                        product?.single_product_details?.product?.album
                          ?.length -
                        1) %
                      product?.single_product_details?.product?.album?.length
                    ].avatar
                  }
                  onCloseRequest={closeLightBox}
                  onMovePrevRequest={moveNextPhoto}
                  onMoveNextRequest={movePrevPhoto}
                  reactModalStyle={{
                    overlay: {
                      zIndex: 1041,
                    },
                  }}
                />
              ) : (
                ""
              )}
            </div>
          )}
          <InfoOne
            product={product?.single_product_details}
            dimension={product?.dimensions}
          />
          <RelatedProductsOne
            // relatedproducts={relatedProducts}
            randomProduct={randomProducts}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductInner;
