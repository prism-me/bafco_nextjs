import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Reveal from "react-awesome-reveal";
import Countdown from "react-countdown";
import ALink from "~/components/features/alink";
import OwlCarousel from "~/components/features/owl-carousel";
import SpecialCollection from "~/components/partials/home/special-collection";
import TopCollection from "~/components/partials/home/top-collection";
import BlogCollection from "~/components/partials/home/blog-collection";
import NewsletterModal from "~/components/features/modals/newsletter-modal";
import { rendererThree } from "~/components/features/count-down";
import ProductTwelve from "~/components/features/products/product-twelve";
import { API } from "~/http/API";
import {
  introSlider,
  dealSlider,
  fadeInUpShorter,
  fadeInLeftShorter,
  fadeInRightShorter,
  fadeIn,
  productSlider,
} from "~/utils/data";
import Modal from "react-modal";
import { Helmet } from "react-helmet";
import Subscribe from "./subscribe/subscribe";

const postsdata = [
  {
    id: 101,
    author: "Jane Doe",
    comments: 0,
    content:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit.Pelletesque aliquet nibh necurna.",
    date: "2020-09-22",
    slug: "sed-adipiscing-odbrnare.",
    title: "Sed adipiscing odbrnare.",
    type: "image",
    blog_categories: [
      {
        name: "Lifestyle",
        slug: "lifestyle",
        __typename: "Category",
      },
    ],
    image: [
      {
        width: 376,
        height: 250,
        url: "https://d-themes.com/react_asset_api/molla/uploads/post_1_8285333d58.jpg",
        __typename: "Media",
      },
    ],
    __typename: "Post",
  },
  {
    id: 102,
    author: "Jane Doe",
    comments: 0,
    content:
      "Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis justo.",
    date: "2020-05-12",
    slug: "fusce-lacifgbnia-arcuet-nulla.",
    title: "Fusce lacifgbnia arcuet nulla.",
    type: "image",
    blog_categories: [
      {
        name: "Lifestyle",
        slug: "lifestyle",
        __typename: "Category",
      },
    ],
    image: [
      {
        width: 376,
        height: 250,
        url: "https://d-themes.com/react_asset_api/molla/uploads/post_2_73cf3ad8f8.jpg",
        __typename: "Media",
      },
    ],
    __typename: "Post",
  },
  {
    id: 103,
    author: "Jane Doe",
    comments: 2,
    content:
      "Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue.",
    date: "2020-05-19",
    slug: "quisque-volutpat-mdbattis-eros.",
    title: "Quisque volutpat mdbattis eros.",
    type: "image",
    blog_categories: [
      {
        name: "Lifestyle",
        slug: "lifestyle",
        __typename: "Category",
      },
    ],
    image: [
      {
        width: 376,
        height: 250,
        url: "https://d-themes.com/react_asset_api/molla/uploads/post_3_dbb5414ec7.jpg",
        __typename: "Media",
      },
    ],
    __typename: "Post",
  },
];

const customStyles = {
  content: {
    top: "50%",
    transform: "translateY(-50%)",
  },
  overlay: {
    backgroundColor: "rgba(77,77,77,0.6)",
    zIndex: "9000",
  },
};

Modal.setAppElement("body");

function Home() {
  const posts = postsdata && postsdata;
  const [homedata, setHomedata] = useState();
  const [bloglist, setBlogList] = useState();
  const [productList, setProductList] = useState();
  const [isVideoShow, setIsVideoShow] = useState(false);

  function openVideoModal(e) {
    e.preventDefault();
    setIsVideoShow(true);
  }

  const closeHandler = () => {
    document
      .querySelector("#video-modal")
      .classList.remove("ReactModal__Content--after-open");

    if (document.querySelector(".ReactModal__Overlay")) {
      document.querySelector(".ReactModal__Overlay").style.opacity = "0";
    }

    setTimeout(() => {
      setIsVideoShow(false);
    }, 350);
  };

  useEffect(() => {
    API.get(`/home`)
      .then((response) => {
        setHomedata(response.data.pages.content);
        setBlogList(response.data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });

    API.get(`/top-selling-products`)
      .then((response) => {
        // console.log(response);
        setProductList(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="main home-page skeleton-body">
      <Helmet>
        <title>{homedata?.meta?.meta_title}</title>
        <meta
          name="description"
          content={`${homedata?.meta?.meta_description}`}
        />
      </Helmet>
      <div className="intro-slider-container">
        <OwlCarousel
          adclassName="owl-simple owl-light owl-nav-inside"
          options={introSlider}
        >
          {homedata?.banner?.map((item, index) => (
            <div
              className={`intro-slide slide1`}
              key={index}
              style={{
                backgroundColor: "#EDF2F0",
                backgroundImage: `url(${
                  item?.image !== "" ? item?.image : "images/home/Magic7.jpg"
                })`,
              }}
            >
              <div className="container intro-content">
                <Reveal
                  keyframes={fadeInUpShorter}
                  delay="100%"
                  duration={1000}
                >
                  <>
                    <h3 className="intro-subtitle">{item?.sub_heading}</h3>
                    <h1 className="intro-title">{item?.heading}</h1>

                    <ALink
                      href={`${item?.button_url}`}
                      className="btn btn-dark btn-outline-darker"
                    >
                      <span>{item?.button_text}</span>
                      <i className="icon-long-arrow-right"></i>
                    </ALink>
                  </>
                </Reveal>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>

      <div className="icon-boxes-container icon-boxes-separator">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-lg-4">
              <Reveal
                keyframes={fadeInRightShorter}
                delay={200}
                duration={1000}
                triggerOnce
              >
                <div className="icon-box icon-box-side">
                  <span className="icon-box-icon">
                    <i className="icon-phone"></i>
                  </span>
                  <div className="icon-box-content">
                    <h3 className="icon-box-title">
                      {homedata?.contact[0]?.text}
                    </h3>

                    <p>
                      <a
                        href={`tel:${homedata?.contact[0]?.value}`}
                        style={{ color: "#fff" }}
                      >
                        {homedata?.contact[0]?.value}
                      </a>
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="col-sm-4 col-lg-4">
              <Reveal
                keyframes={fadeInRightShorter}
                delay={200}
                duration={1000}
                triggerOnce
              >
                <div className="icon-box icon-box-side">
                  <span className="icon-box-icon">
                    <i className="icon-whatsapp"></i>
                  </span>

                  <div className="icon-box-content">
                    <h3 className="icon-box-title">
                      {homedata?.contact[1]?.text}
                    </h3>

                    <p>
                      <a
                        href={`https://wa.me/${homedata?.contact[1]?.value?.replace(
                          /\s+/g,
                          ""
                        )}`}
                        style={{ color: "#fff" }}
                      >
                        {homedata?.contact[1]?.value}
                      </a>
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="col-sm-4 col-lg-4">
              <Reveal
                keyframes={fadeInRightShorter}
                delay={200}
                duration={1000}
                triggerOnce
              >
                <div className="icon-box icon-box-side">
                  <span className="icon-box-icon">
                    <i className="icon-map-marker"></i>
                  </span>

                  <div className="icon-box-content">
                    <h3 className="icon-box-title">
                      {homedata?.contact[2]?.text}
                    </h3>

                    <p>
                      <a href="/pages/contact" style={{ color: "#fff" }}>
                        {homedata?.contact[2]?.value}
                      </a>
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3 mb-lg-5"></div>

      <div className="banner-group">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-5">
              <Reveal
                keyframes={fadeInLeftShorter}
                delay={150}
                duration={1000}
                triggerOnce
              >
                <div className="banner banner-large banner-overlay banner-overlay-light banner-lg banner-1 lazy-media">
                  <div className="lazy-overlay"></div>

                  {/* <LazyLoadImage
                                        alt="banner"
                                        src={homedata?.collections[0]?.image}
                                        threshold={200}
                                        width="100%"
                                        height="auto"
                                        effect="blur"
                                    /> */}
                  <img src={homedata?.collections[0]?.image} alt="banner" />

                  <div className="banner-content banner-content-top">
                    <h4 className="banner-subtitle">
                      {homedata?.collections[0]?.sub_heading}
                    </h4>
                    <h3 className="banner-title">
                      {homedata?.collections[0]?.heading}
                    </h3>
                    <div className="banner-text">
                      {homedata?.collections[0]?.starting_from}
                    </div>
                    <ALink
                      href={`${homedata?.collections[0]?.button_url}`}
                      className="btn btn-outline-gray banner-link"
                    >
                      {homedata?.collections[0]?.button_text}{" "}
                      <i className="icon-long-arrow-right"></i>
                    </ALink>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="col-sm-6 col-lg-3">
              <Reveal
                keyframes={fadeIn}
                delay={150}
                duration={1000}
                triggerOnce
              >
                <div className="banner banner-overlay banner-lg banner-2 lazy-media">
                  <div className="lazy-overlay"></div>

                  {/* <LazyLoadImage
                                        alt="banner"
                                        src={homedata?.collections[1]?.image}
                                        threshold={200}
                                        height="auto"
                                        width="100%"
                                        effect="blur"
                                    /> */}

                  <img src={homedata?.collections[1]?.image} alt="banner" />

                  <div className="banner-content banner-content-top">
                    <h4 className="banner-subtitle text-grey">
                      {homedata?.collections[1]?.sub_heading}
                    </h4>
                    <h3 className="banner-title text-white">
                      {homedata?.collections[1]?.heading}
                    </h3>
                    {/* <div className="banner-text text-white">from $39.99</div> */}
                    <ALink
                      href={`${homedata?.collections[1]?.button_url}`}
                      className="btn btn-outline-white banner-link"
                    >
                      {homedata?.collections[1]?.button_text}{" "}
                      <i className="icon-long-arrow-right"></i>
                    </ALink>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="col-sm-12 col-md-12 col-lg-4">
              <Reveal
                keyframes={fadeInRightShorter}
                delay={150}
                duration={1000}
                triggerOnce
              >
                <div className="row">
                  <div className="col-lg-12 col-md-6 col-sm-6">
                    <div className="banner banner-3 banner-overlay lazy-media">
                      <div className="lazy-overlay"></div>

                      {/* <LazyLoadImage
                                                alt="banner"
                                                src={homedata?.collections[2]?.image}
                                                threshold={200}
                                                height="auto"
                                                width="100%"
                                                effect="blur"
                                            /> */}
                      <img src={homedata?.collections[2]?.image} alt="banner" />

                      <div className="banner-content banner-content-top">
                        <h4 className="banner-subtitle">
                          {homedata?.collections[2]?.sub_heading}
                        </h4>
                        <h3 className="banner-title">
                          {homedata?.collections[2]?.heading}
                        </h3>
                        <ALink
                          href={`${homedata?.collections[2]?.button_url}`}
                          className="btn btn-outline-gray banner-link"
                        >
                          {homedata?.collections[2]?.button_text}{" "}
                          <i className="icon-long-arrow-right"></i>
                        </ALink>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-6 col-sm-6">
                    <div className="banner banner-4 banner-overlay banner-overlay-light lazy-media">
                      <div className="lazy-overlay"></div>

                      {/* <LazyLoadImage
                                                alt="banner"
                                                src={homedata?.collections[3]?.image}
                                                threshold={200}
                                                width="100%"
                                                height="auto"
                                                effect="blur"
                                            /> */}
                      <img src={homedata?.collections[3]?.image} alt="banner" />

                      <div className="banner-content banner-content-top">
                        <h4 className="banner-subtitle text-grey">
                          {homedata?.collections[3]?.sub_heading}
                        </h4>
                        <h3 className="banner-title text-white">
                          {homedata?.collections[3]?.heading}
                        </h3>
                        {/* <div className="banner-text">up to 30% off</div> */}
                        <ALink
                          href={`${homedata?.collections[3]?.button_url}`}
                          className="btn btn-outline-white banner-link"
                        >
                          {homedata?.collections[3]?.button_text}{" "}
                          <i className="icon-long-arrow-right"></i>
                        </ALink>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <div className="our-projects text-center">
        <div className="heading heading-center mb-3">
          <h2 className="title">{homedata?.projects?.heading}</h2>
          <h5>{homedata?.projects?.sub_heading}</h5>
        </div>
        <Reveal
          keyframes={fadeInUpShorter}
          delay={200}
          duration={1000}
          triggerOnce
        >
          <div className="projects-list">
            <img src={homedata?.projects?.image} alt="slide" />
          </div>
          <div className="text-center mb-7 mt-2">
            <ALink
              href="/project-gallery/"
              className="btn btn-outline-darker btn-more"
            >
              <span>View All Projects</span>
              <i className="icon-long-arrow-right"></i>
            </ALink>
          </div>
        </Reveal>
      </div>

      <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
        {/* <TopCollection categories={categoryList} products={productList} setIsSelectedCategory={setSelectedCategory} loading={loading} /> */}
        <div className="container mb-7">
          <div className="heading heading-center mb-3">
            <h2 className="title">Top Seller</h2>
          </div>
          <div className="products">
            <div className="row">
              <OwlCarousel
                adClass="owl-simple carousel-with-shadow cols-xxl-6 cols-xl-5 cols-lg-4 cols-md-3 cols-xs-2"
                options={productSlider}
              >
                {productList?.length > 0 ? (
                  productList?.map((item1, index1) => (
                    <div className="slide1" key={index1}>
                      <ProductTwelve
                        product={item1}
                        categoryName={
                          item1?.product_category?.parent_category?.route
                        }
                        subCategoryName={item1?.product_category?.route}
                      />
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
                    No product found.
                  </p>
                )}
              </OwlCarousel>
            </div>
          </div>
        </div>
        {/* <div className="text-center mb-7 mt-2">
                    <ALink href="#" className="btn btn-outline-darker btn-more"><span>View more</span><i className="icon-long-arrow-right"></i></ALink>
                </div> */}
      </Reveal>
      {homedata?.deal?.length > 0 && (
        <div className="deal-container pt-5 mb-5">
          <div className="container">
            <OwlCarousel
              adclassName="owl-simple owl-light owl-nav-inside"
              options={dealSlider}
            >
              {homedata?.deal?.map((item, index) => (
                <div className="row" key={index}>
                  <div className="col-lg-9">
                    <div className="deal">
                      <div className="deal-content">
                        <Reveal
                          keyframes={fadeInLeftShorter}
                          delay={200}
                          duration={1000}
                          triggerOnce
                        >
                          <>
                            <h4>{item?.sub_heading_image1}</h4>
                            <h2>{item?.heading_image1}</h2>

                            <h3 className="product-title">
                              {item?.product_title}
                            </h3>

                            <div className="product-price">
                              <span className="new-price">
                                {item?.new_price
                                  ?.toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </span>
                              <span className="old-price">
                                {item?.old_price
                                  ?.toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </span>
                            </div>

                            <div className="deal-countdown">
                              {/* <Countdown date={`2022-08-01T01:02:03`} renderer={rendererThree} /> */}
                              <Countdown
                                date={item?.expires_in}
                                renderer={rendererThree}
                              />
                            </div>
                            <ALink
                              href={`${item?.button_url1}`}
                              className="btn btn-primary"
                            >
                              <span>{item?.button_text1}</span>
                              <i className="icon-long-arrow-right"></i>
                            </ALink>
                          </>
                        </Reveal>
                      </div>

                      <div className="deal-image position-relative">
                        <Reveal
                          keyframes={fadeIn}
                          delay={200}
                          duration={1000}
                          triggerOnce
                        >
                          <ALink href={`${item?.button_url1}`}>
                            <div className="lazy-overlay bg-white"></div>

                            <LazyLoadImage
                              alt="deal-banner"
                              src={item.slider_images.main_image}
                              threshold="300"
                              effect="blur"
                              width="100%"
                              height={460}
                            />
                          </ALink>
                        </Reveal>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3">
                    <div className="banner banner-overlay banner-overlay-light d-none d-lg-block pb-2">
                      <ALink
                        href={`${item?.button_url2}`}
                        // className="h-100"
                      >
                        <div className="lazy-overlay"></div>

                        <LazyLoadImage
                          alt="deal-banner"
                          src={item.slider_images.sub_image}
                          threshold="300"
                          effect="blur"
                          // className="h-100"
                          width="100%"
                        />
                      </ALink>

                      <div className="banner-content banner-content-top">
                        <h4 className="banner-subtitle text-white">
                          {item.sub_heading_image2}
                        </h4>
                        <h3 className="banner-title text-white">
                          {item.heading_image2}
                        </h3>
                        {/* <div className="banner-text text-primary">$49.99</div> */}
                        <ALink
                          href={`${item?.button_url2}`}
                          className="btn btn-outline-light banner-link"
                        >
                          {item?.button_text2}
                          <i className="icon-long-arrow-right"></i>
                        </ALink>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      )}

      <div className="mb-6"></div>

      <div
        className="video-banner video-banner-bg bg-image text-center"
        style={{ backgroundImage: `url(${homedata?.video?.icon})` }}
      >
        <div className="container">
          <Reveal
            keyframes={fadeInUpShorter}
            delay={200}
            duration={1000}
            triggerOnce
            style={{ backgroundImage: `url(${homedata?.video?.icon})` }}
          >
            <>
              <h3 className="video-banner-title h1 text-white">
                <strong>{homedata?.video?.heading}</strong>
              </h3>
              <a
                href={homedata?.video?.link}
                className="btn-video btn-iframe"
                onClick={openVideoModal}
              >
                <i className="icon-play"></i>
              </a>
            </>
          </Reveal>
          <Modal
            isOpen={isVideoShow}
            onRequestClose={closeHandler}
            style={customStyles}
            contentLabel="Video Modal"
            className="video-modal p-3"
            shouldReturnFocusAfterClose={false}
            id="video-modal"
          >
            <button type="button" className="close" onClick={closeHandler}>
              <span aria-hidden="true">
                <i className="icon-close"></i>
              </span>
            </button>
            <iframe
              className="mfp-iframe modal-content"
              src={`https://www.youtube.com/embed/${
                homedata?.video?.link?.split("https://youtu.be/")[1]
              }`}
              frameBorder="0"
              allowFullScreen=""
              title="youtube"
            ></iframe>
          </Modal>
        </div>
      </div>

      <div className="mb-6"></div>

      <BlogCollection posts={bloglist}></BlogCollection>
      <Subscribe />
      <NewsletterModal />
    </div>
  );
}

export default Home;
