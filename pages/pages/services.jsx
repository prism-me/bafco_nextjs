import React, { useEffect } from 'react';

import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import OwlCarousel from '~/components/features/owl-carousel';

import { mainSlider5 } from '~/utils/data';

function Services() {

    return (
        <div className="main">
            <PageHeader
                title="Services"
                subTitle="We make happy workplaces"
                backgroundImage="images/banners/service-banner.png"
                buttonText="Shop Now"
                buttonUrl="#"
            />

            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item active">Services</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content pb-3">
                <div className="container">
                    <div className="application-heading text-center mb-3">
                        <h2>Our Services</h2>
                    </div>
                    <div className="row mb-6 align-items-center">
                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                            <div className="sub-cat-featured-img">
                                <img src="images/service/service01.png" />
                            </div>
                        </div>

                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                            <div className="product-details sub-cat-deatil text-right">
                                <h2 className="title">Who we are?</h2>
                                <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum, id porttitor maecenas amet. Mattis quisque facilisi duis tellus lacus vitae. Malesuada nibh libero eget elementum in nec. Lorem auctor amet tristique est porttitor integer at. Risus massa id consectetur diam. Commodo nec, in tellus faucibus ornare elit bibendum risus lacinia. Ultrices porttitor sem ultricies amet. </p>

                            </div>
                        </div>
                    </div >
                    <div className="row mb-6 align-items-center">
                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                            <div className="product-details sub-cat-deatil">
                                <h2 className="title">We deliver very carefully</h2>
                                <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames a nisi, congue feugiat id dignissim pellentesque turpis condimentum. Donec dictumst diam ut sollicitudin iaculis scelerisque. Augue nulla dolor tempus quis arcu natoque.</p>

                            </div>
                        </div>
                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                            <div className="sub-cat-featured-img">
                                <img src="images/service/service02.png" />
                            </div>
                        </div>
                    </div >
                    <div className="row mb-6 align-items-center">
                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                            <div className="sub-cat-featured-img">
                                <img src="images/service/service01.png" />
                            </div>
                        </div>

                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                            <div className="product-details sub-cat-deatil text-right">
                                <h2 className="title">Why Should You Choose Us?</h2>
                                <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum, id porttitor maecenas amet. Mattis quisque facilisi duis tellus lacus vitae. Malesuada nibh libero eget elementum in nec. Lorem auctor amet tristique est porttitor integer at. Risus massa id consectetur diam. Commodo nec, in tellus faucibus ornare elit bibendum risus lacinia. Ultrices porttitor sem ultricies amet.</p>

                            </div>
                        </div>
                    </div >
                    <div className="row mb-6 align-items-center">
                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                            <div className="product-details sub-cat-deatil">
                                <h2 className="title">What Have We Achieved?</h2>
                                <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames a nisi, congue feugiat id dignissim pellentesque turpis condimentum. Donec dictumst diam ut sollicitudin iaculis scelerisque. Augue nulla dolor tempus quis arcu natoque.</p>

                            </div>
                        </div>
                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                            <div className="sub-cat-featured-img">
                                <img src="images/service/service02.png" />
                            </div>
                        </div>
                    </div >
                </div>
                <div className="testimonial-containerfluid" style={{ backgroundImage: 'url(images/testimonials/testimonial-bg.png)' }}>
                    <div className="container">
                        <h3 className="text-center mb-3">Testimonials</h3>

                        <OwlCarousel adClass="owl-testimonials cols-1"
                            options={mainSlider5}>
                            <blockquote className="testimonial testimonial-icon text-center">
                                <img src="images/testimonials/testimonial01.png" />
                                <p>“ Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue.Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. ” </p>

                                <cite>
                                    Jenson Gregory
                                    <span>Customer</span>
                                </cite>
                            </blockquote>

                            <blockquote className="testimonial testimonial-icon text-center">
                                <img src="images/testimonials/testimonial01.png" />
                                <p>“ Impedit, ratione sequi, sunt incidunt magnam et. Delectus obcaecati optio eius error libero perferendis nesciunt atque dolores magni recusandae! Doloremque quidem error eum quis similique doloribus natus qui ut ipsum.Velit quos ipsa exercitationem, vel unde obcaecati impedit eveniet non. ”</p>

                                <cite>
                                    Damon Stone
                                    <span>Customer</span>
                                </cite>
                            </blockquote>

                            <blockquote className="testimonial testimonial-icon text-center">
                                <img src="images/testimonials/testimonial01.png" />
                                <p>“ Molestias animi illo natus ut quod neque ad accusamus praesentium fuga! Dolores odio alias sapiente odit delectus quasi, explicabo a, modi voluptatibus. Perferendis perspiciatis, voluptate, distinctio earum veritatis animi tempora eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. ”</p>

                                <cite>
                                    John Smith
                                    <span>Customer</span>
                                </cite>
                            </blockquote>
                        </OwlCarousel>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default React.memo(Services);