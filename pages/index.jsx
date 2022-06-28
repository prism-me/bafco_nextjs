import { useQuery } from "@apollo/react-hooks";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Reveal from 'react-awesome-reveal';
import Countdown from "react-countdown";

import ALink from '~/components/features/alink';
import OwlCarousel from '~/components/features/owl-carousel';
import SpecialCollection from '~/components/partials/home/special-collection';
import TopCollection from '~/components/partials/home/top-collection';
import BlogCollection from '~/components/partials/home/blog-collection';
import NewsletterModal from "~/components/features/modals/newsletter-modal";
import { rendererThree } from "~/components/features/count-down";
import { connect } from 'react-redux';
import withApollo from '~/server/apollo';
import { GET_HOME_DATA } from '~/server/queries';
import { attrFilter } from '~/utils';
import { actions as demoAction } from '~/store/demo';

import { homeData, introSlider, brandSlider, dealSlider, fadeInUpShorter, fadeInLeftShorter, fadeInRightShorter, fadeIn } from '~/utils/data';

function Home(props) {
    const { data, loading, error } = useQuery(GET_HOME_DATA);
    const products = data && data.homeData.products;
    const topProducts = attrFilter(data && data.homeData.products, 'top');
    const posts = data && data.homeData.posts;

    function openVideoModal(e) {
        e.preventDefault();
        props?.showVideo();
    }

    if (error) {
        return <div></div>
    }


    return (
        <div className="main home-page skeleton-body">
            <div className="intro-slider-container">
                <div className="intro-slide slide1" style={{ backgroundColor: '#EDF2F0', backgroundImage: 'url(images/home/Magic7.jpg)' }}>
                    <div className="container intro-content">
                        <Reveal keyframes={fadeInUpShorter} delay="100%" duration={1000}>
                            <>
                                <h3 className="intro-subtitle">Work Better. Live Healthier.</h3>
                                <h1 className="intro-title">Site Stand <br />Desks
                                    {/* <br /><span className="text-primary"><sup>$</sup>49,99</span> */}
                                </h1>

                                <ALink href="#" className="btn btn-dark btn-outline-darker">
                                    <span>Design My Desk</span>
                                    <i className="icon-long-arrow-right"></i>
                                </ALink>
                            </>
                        </Reveal>
                        {/* <img src="images/home/sliders/slide-1-3.png" className="position-absolute" alt="slide" /> */}
                    </div>
                </div>
                {/* <OwlCarousel adClass="owl-simple owl-light owl-nav-inside" options={introSlider}>
                    <div className="intro-slide slide1" style={{ backgroundColor: '#EDF2F0', backgroundImage: 'url(images/home/sliders/slide-1-1.png)' }}>
                        <div className="container intro-content">
                            <Reveal keyframes={fadeInUpShorter} delay="100%" duration={1000}>
                                <>
                                    <h3 className="intro-subtitle">Deals and Promotions</h3>
                                    <h1 className="intro-title">Wooden <br />Sideboard Table <br /><span className="text-primary"><sup>$</sup>49,99</span></h1>

                                    <ALink href="/shop/sidebar/list" className="btn btn-dark btn-outline-darker">
                                        <span>Shop Now</span>
                                        <i className="icon-long-arrow-right"></i>
                                    </ALink>
                                </>
                            </Reveal>
                            <img src="images/home/sliders/slide-1-3.png" className="position-absolute" alt="slide" />
                        </div>
                    </div>
                    <div className="intro-slide" style={{ backgroundImage: 'url(images/home/sliders/slide-2.jpg)' }}>
                        <div className="container intro-content text-right">
                            <Reveal keyframes={fadeInUpShorter} delay="100%" duration={1000}>
                                <div className="d-inline-block text-left">
                                    <h3 className="intro-subtitle">Bedroom Furniture</h3>
                                    <h1 className="intro-title">Find Comfort <br />That Suits You.</h1>

                                    <ALink href="/shop/sidebar/list" className="btn btn-dark btn-outline-darker">
                                        <span>Shop Now</span>
                                        <i className="icon-long-arrow-right"></i>
                                    </ALink>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    <div className="intro-slide slide3" style={{ backgroundColor: '#EDF2F0', backgroundImage: 'url(images/home/sliders/slide-3-1.png)' }}>
                        <div className="container intro-content">
                            <Reveal keyframes={fadeInUpShorter} delay="100%" duration={1000}>
                                <>
                                    <h3 className="intro-subtitle">Baskets & Storage</h3>
                                    <h1 className="intro-title">
                                        Laundary Basket<br />
                                        <span className="text-primary">
                                            <sup className="text-grey font-weight-light">from</sup><sup>$</sup>9,99
                                        </span>
                                    </h1>

                                    <ALink href="/shop/sidebar/list" className="btn btn-dark btn-outline-darker">
                                        <span>Shop Now</span>
                                        <i className="icon-long-arrow-right"></i>
                                    </ALink>
                                </>
                            </Reveal>
                        </div>
                    </div>
                </OwlCarousel> */}
            </div>
            {/* <Reveal keyframes={fadeIn} delay="100%" duration={500} triggerOnce>
                <OwlCarousel adClass="brands-border owl-simple brand-carousel cols-xl-7 cols-lg-5 cols-md-4 cols-sm-3 cols-2" options={brandSlider}>
                    {
                        homeData.brands.map((brand, index) => {
                            return (
                                <ALink href="#" className="brand mr-0" key={index} >
                                    <img src={brand.image} alt="brand" width={brand.width} height={brand.height} />
                                </ALink>
                            )
                        })
                    }
                </OwlCarousel>
            </Reveal> */}

            <div className="icon-boxes-container icon-boxes-separator">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 col-lg-4">
                            <Reveal keyframes={fadeInRightShorter} delay={200} duration={1000} triggerOnce>
                                <div className="icon-box icon-box-side">
                                    <span className="icon-box-icon">
                                        <i className="icon-phone"></i>
                                    </span>
                                    <div className="icon-box-content">
                                        <h3 className="icon-box-title">Give Us A Call</h3>

                                        <p>+971 800 (22326)</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div className="col-sm-4 col-lg-4">
                            <Reveal keyframes={fadeInRightShorter} delay={200} duration={1000} triggerOnce>
                                <div className="icon-box icon-box-side">
                                    <span className="icon-box-icon">
                                        <i className="icon-whatsapp"></i>
                                    </span>

                                    <div className="icon-box-content">
                                        <h3 className="icon-box-title">Whatsapp</h3>

                                        <p>+971 800 (22326)</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div className="col-sm-4 col-lg-4">
                            <Reveal keyframes={fadeInRightShorter} delay={200} duration={1000} triggerOnce>
                                <div className="icon-box icon-box-side">
                                    <span className="icon-box-icon">
                                        <i className="icon-map-marker"></i>
                                    </span>

                                    <div className="icon-box-content">
                                        <h3 className="icon-box-title">Locations</h3>

                                        <p>Visit a showroom near you.</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        {/* <div className="col-sm-6 col-lg-3">
                            <Reveal keyframes={fadeInLeftShorter} delay={200} duration={1000} triggerOnce>
                                <div className="icon-box icon-box-side">
                                    <span className="icon-box-icon">
                                        <i className="icon-life-ring"></i>
                                    </span>

                                    <div className="icon-box-content">
                                        <h3 className="icon-box-title">We Support</h3>

                                        <p>24/7 amazing services</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="mb-3 mb-lg-5"></div>

            <div className="banner-group">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-lg-5">
                            <Reveal keyframes={fadeInLeftShorter} delay={150} duration={1000} triggerOnce>
                                <div className="banner banner-large banner-overlay banner-overlay-light banner-lg banner-1 lazy-media">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        src="images/home/banners/WorkstationCollections.jpg"
                                        threshold={200}
                                        width="100%"
                                        height="auto"
                                        effect="blur"
                                    />

                                    <div className="banner-content banner-content-top">
                                        <h4 className="banner-subtitle">Clearance</h4>
                                        <h3 className="banner-title">Workstation <br /> Collection</h3>
                                        <div className="banner-text">from Dhs.200</div>
                                        <ALink href="#" className="btn btn-outline-gray banner-link">Discover Now<i className="icon-long-arrow-right"></i></ALink>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div className="col-sm-6 col-lg-3">
                            <Reveal keyframes={fadeIn} delay={150} duration={1000} triggerOnce>
                                <div className="banner banner-overlay banner-lg banner-2 lazy-media">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        src="images/home/banners/ChairCollections1.jpg"
                                        threshold={200}
                                        height="auto"
                                        width="100%"
                                        effect="blur"
                                    />

                                    <div className="banner-content banner-content-top">
                                        <h4 className="banner-subtitle text-grey">Freedom</h4>
                                        <h3 className="banner-title text-white">Chair Collections </h3>
                                        {/* <div className="banner-text text-white">from $39.99</div> */}
                                        <ALink href="#" className="btn btn-outline-white banner-link">Discover Now<i className="icon-long-arrow-right"></i></ALink>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-4">
                            <Reveal keyframes={fadeInRightShorter} delay={150} duration={1000} triggerOnce>
                                <div className="row">
                                    <div className="col-lg-12 col-md-6 col-sm-6">
                                        <div className="banner banner-3 banner-overlay lazy-media">
                                            <div className="lazy-overlay"></div>

                                            <LazyLoadImage
                                                alt="banner"
                                                src="images/home/banners/DeskCollections.jpg"
                                                threshold={200}
                                                height="auto"
                                                width="100%"
                                                effect="blur"
                                            />

                                            <div className="banner-content banner-content-top">
                                                <h4 className="banner-subtitle">Midas</h4>
                                                <h3 className="banner-title">Desk Collections</h3>
                                                <ALink href="#" className="btn btn-outline-gray banner-link">Discover Now<i className="icon-long-arrow-right"></i></ALink>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-6 col-sm-6">
                                        <div className="banner banner-4 banner-overlay banner-overlay-light lazy-media">
                                            <div className="lazy-overlay"></div>

                                            <LazyLoadImage
                                                alt="banner"
                                                src="images/home/banners/SofaCollections1.jpg"
                                                threshold={200}
                                                width="100%"
                                                height="auto"
                                                effect="blur"
                                            />

                                            <div className="banner-content banner-content-top">
                                                <h4 className="banner-subtitle">Enzo Plus</h4>
                                                <h3 className="banner-title">Sofa Collections</h3>
                                                {/* <div className="banner-text">up to 30% off</div> */}
                                                <ALink href="#" className="btn btn-outline-gray banner-link">Discover Now<i className="icon-long-arrow-right"></i></ALink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="mb-3"></div> */}

            <div className="our-projects text-center">
                <div className="heading heading-center mb-3">
                    <h2 className="title">Our Projects</h2>
                    <h4>Furniture Overview</h4>
                </div>
                <Reveal keyframes={fadeInUpShorter} delay={200} duration={1000} triggerOnce>
                    <div className="projects-list">
                        <img src="images/home/001-13.jpg" alt="slide" />

                        {/* <ul>
                            <li className="icon-index1">
                                <span className="icon-box-icon">
                                    <i className="icon-plus"></i>
                                </span>
                                <div className="icon-index-detail-box">
                                    <div className="row">
                                        <div className="col-sm-6 col-lg-6">
                                            <img src="images/home/projects/cubord.png" alt="" />
                                        </div>
                                        <div className="col-sm-6 col-lg-6">
                                            <h3>Lorem Ipsum</h3>
                                            <h6>Lorem Ipsum dolor sit</h6>
                                            <p>Double-door wadrobe with built-in hanger. Showing an orderly space.</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="icon-index2">
                                <span className="icon-box-icon">
                                    <i className="icon-plus"></i>
                                </span>
                                <div className="icon-index-detail-box">
                                    <div className="row">
                                        <div className="col-sm-6 col-lg-6">
                                            <img src="images/home/projects/drower-image.png" alt="" />
                                        </div>
                                        <div className="col-sm-6 col-lg-6">
                                            <h3>Lorem Ipsum</h3>
                                            <h6>Lorem Ipsum dolor sit</h6>
                                            <p>Double-door wadrobe with built-in hanger. Showing an orderly space.</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="icon-index3">
                                <span className="icon-box-icon">
                                    <i className="icon-plus"></i>
                                </span>
                                <div className="icon-index-detail-box">
                                    <div className="row">
                                        <div className="col-sm-6 col-lg-6">
                                            <img src="images/home/projects/drower-image.png" alt="" />
                                        </div>
                                        <div className="col-sm-6 col-lg-6">
                                            <h3>Lorem Ipsum</h3>
                                            <h6>Lorem Ipsum dolor sit</h6>
                                            <p>Double-door wadrobe with built-in hanger. Showing an orderly space.</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="icon-index4">
                                <span className="icon-box-icon">
                                    <i className="icon-plus"></i>
                                </span>
                            </li>
                            <li className="icon-index5">
                                <span className="icon-box-icon">
                                    <i className="icon-plus"></i>
                                </span>
                            </li>
                            <li className="icon-index6">
                                <span className="icon-box-icon">
                                    <i className="icon-plus"></i>
                                </span>
                            </li>
                            <li className="icon-index7">
                                <span className="icon-box-icon">
                                    <i className="icon-plus"></i>
                                </span>
                            </li>
                        </ul> */}
                    </div>
                </Reveal>
            </div>

            {/* <div className="mb-3"></div> */}

            <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
                <TopCollection products={topProducts} loading={loading} />
                <div className="text-center mb-7 mt-2">
                    <ALink href="#" className="btn btn-outline-darker btn-more"><span>View more</span><i className="icon-long-arrow-right"></i></ALink>
                </div>
            </Reveal>

            {/* <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
                <SpecialCollection products={products} loading={loading} />
            </Reveal> */}
            <div className="deal-container pt-5 mb-5">
                <div className="container">
                    <OwlCarousel adClass="owl-simple owl-light owl-nav-inside" options={dealSlider}>
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="deal">
                                    <div className="deal-content">
                                        <Reveal keyframes={fadeInLeftShorter} delay={200} duration={1000} triggerOnce>
                                            <>
                                                <h4>Limited Quantities</h4>
                                                <h2>Deal of the Day</h2>

                                                <h3 className="product-title">
                                                    <ALink href="#">Check Out</ALink>
                                                </h3>

                                                <div className="product-price">
                                                    <span className="new-price">Dhs. 5000</span>
                                                    <span className="old-price">Was Dhs.7000</span>
                                                </div>

                                                <div className="deal-countdown">
                                                    <Countdown date={`2022-02-01T01:02:03`} renderer={rendererThree} />
                                                </div>

                                                <ALink href="#" className="btn btn-primary">
                                                    <span>Shop Now</span><i className="icon-long-arrow-right"></i>
                                                </ALink>
                                            </>
                                        </Reveal>
                                    </div>

                                    <div className="deal-image position-relative">
                                        <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
                                            <ALink href="#">
                                                <div className="lazy-overlay bg-white"></div>

                                                <LazyLoadImage
                                                    alt="deal-banner"
                                                    src="images/home/deal/ESD61TW-grey.jpg"
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
                                <div className="banner banner-overlay banner-overlay-light d-none d-lg-block h-100 pb-2">
                                    <ALink href="#" className="h-100">
                                        <div className="lazy-overlay"></div>

                                        <LazyLoadImage
                                            alt="deal-banner"
                                            src="images/home/banners/banner-5.jpg"
                                            threshold="300"
                                            effect="blur"
                                            className="h-100"
                                            width="100%"
                                        />
                                    </ALink>

                                    <div className="banner-content banner-content-top">
                                        <h4 className="banner-subtitle text-white">The Best Choice</h4>
                                        <h3 className="banner-title text-white">Feigelali <br /> Best Sofa</h3>
                                        {/* <div className="banner-text text-primary">$49.99</div> */}
                                        <ALink href="/shop/sidebar/3cols" className="btn btn-outline-light banner-link">Shop Now<i className="icon-long-arrow-right"></i></ALink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="deal">
                                    <div className="deal-content">
                                        <Reveal keyframes={fadeInLeftShorter} delay={200} duration={1000} triggerOnce>
                                            <>
                                                <h4>Limited Quantities</h4>
                                                <h2>Deal of the Day</h2>

                                                <h3 className="product-title">
                                                    <ALink href="#">Check Out</ALink>
                                                </h3>

                                                <div className="product-price">
                                                    <span className="new-price">Dhs. 5000</span>
                                                    <span className="old-price">Was Dhs.7000</span>
                                                </div>

                                                <div className="deal-countdown">
                                                    <Countdown date={`2022-02-01T01:02:03`} renderer={rendererThree} />
                                                </div>

                                                <ALink href="#" className="btn btn-primary">
                                                    <span>Shop Now</span><i className="icon-long-arrow-right"></i>
                                                </ALink>
                                            </>
                                        </Reveal>
                                    </div>

                                    <div className="deal-image position-relative">
                                        <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
                                            <ALink href="#">
                                                <div className="lazy-overlay bg-white"></div>

                                                <LazyLoadImage
                                                    alt="deal-banner"
                                                    src="images/home/deal/ESD61TW-grey.jpg"
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
                                <div className="banner banner-overlay banner-overlay-light d-none d-lg-block h-100 pb-2">
                                    <ALink href="#" className="h-100">
                                        <div className="lazy-overlay"></div>

                                        <LazyLoadImage
                                            alt="deal-banner"
                                            src="images/home/banners/banner-5.jpg"
                                            threshold="300"
                                            effect="blur"
                                            className="h-100"
                                            width="100%"
                                        />
                                    </ALink>

                                    <div className="banner-content banner-content-top">
                                        <h4 className="banner-subtitle text-white">The Best Choice</h4>
                                        <h3 className="banner-title text-white">Feigelali <br />Best Sofa</h3>
                                        {/* <div className="banner-text text-primary">$49.99</div> */}
                                        <ALink href="/shop/sidebar/3cols" className="btn btn-outline-light banner-link">Shop Now<i className="icon-long-arrow-right"></i></ALink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="deal">
                                    <div className="deal-content">
                                        <Reveal keyframes={fadeInLeftShorter} delay={200} duration={1000} triggerOnce>
                                            <>
                                                <h4>Limited Quantities</h4>
                                                <h2>Deal of the Day</h2>

                                                <h3 className="product-title">
                                                    <ALink href="#">Check Out</ALink>
                                                </h3>

                                                <div className="product-price">
                                                    <span className="new-price">Dhs. 5000</span>
                                                    <span className="old-price">Was Dhs.7000</span>
                                                </div>

                                                <div className="deal-countdown">
                                                    <Countdown date={`2022-02-01T01:02:03`} renderer={rendererThree} />
                                                </div>

                                                <ALink href="#" className="btn btn-primary">
                                                    <span>Shop Now</span><i className="icon-long-arrow-right"></i>
                                                </ALink>
                                            </>
                                        </Reveal>
                                    </div>

                                    <div className="deal-image position-relative">
                                        <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
                                            <ALink href="#">
                                                <div className="lazy-overlay bg-white"></div>

                                                <LazyLoadImage
                                                    alt="deal-banner"
                                                    src="images/home/deal/ESD61TW-grey.jpg"
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
                                <div className="banner banner-overlay banner-overlay-light d-none d-lg-block h-100 pb-2">
                                    <ALink href="#" className="h-100">
                                        <div className="lazy-overlay"></div>

                                        <LazyLoadImage
                                            alt="deal-banner"
                                            src="images/home/banners/banner-5.jpg"
                                            threshold="300"
                                            effect="blur"
                                            className="h-100"
                                            width="100%"
                                        />
                                    </ALink>

                                    <div className="banner-content banner-content-top">
                                        <h4 className="banner-subtitle text-white">The Best Choice</h4>
                                        <h3 className="banner-title text-white">Feigelali <br />Best Sofa</h3>
                                        {/* <div className="banner-text text-primary">$49.99</div> */}
                                        <ALink href="/shop/sidebar/3cols" className="btn btn-outline-light banner-link">Shop Now<i className="icon-long-arrow-right"></i></ALink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </OwlCarousel>

                </div>
            </div>

            <div className="mb-6"></div>

            <div className="video-banner video-banner-bg bg-image text-center" style={{ backgroundImage: 'url(images/home/VideoSectionBackgroundwithlayerblur.jpg)' }}>
                <div className="container">
                    <Reveal keyframes={fadeInUpShorter} delay={200} duration={1000} triggerOnce style={{ backgroundImage: 'url(images/home/VideoImage.jpg)' }}>
                        <>
                            <h3 className="video-banner-title h1 text-white">
                                {/* <span>New Collection</span> */}
                                <strong>Visit Our Showroom</strong>
                            </h3>
                            <a href="https://bafco.b-cdn.net/videos/2020CIFF.mp4" className="btn-video btn-iframe" onClick={openVideoModal}><i className="icon-play"></i></a>
                        </>
                    </Reveal>
                </div>
            </div>

            <div className="mb-6"></div>

            <BlogCollection posts={posts} loading={loading}></BlogCollection>
            <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
                <div
                    className="footer-newsletter bg-image"
                    style={{ backgroundImage: 'url(images/backgrounds/NewsletterBackground.jpg)' }}
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
            <NewsletterModal />
        </div>
    )
}

// export default withApollo({ ssr: typeof window == 'undefined' })(Home);
export default withApollo({ ssr: typeof window == undefined })(connect(null, { ...demoAction })(Home));