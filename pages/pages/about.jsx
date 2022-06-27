import React, { useEffect } from 'react';

import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import { countTo } from '~/utils';
import { homeData } from '~/utils/data';

function About() {
    useEffect(() => {
        countTo();
    }, []);

    return (
        <div className="main">
            <PageHeader
                title="About BAFCO"
                subTitle="We make happy workplaces"
                backgroundImage="images/about/about-banner.png"
                buttonText="Shop Now"
                buttonUrl="#"
            />

            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item active">About BAFCO</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content pb-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="about-text text-center mt-3">
                                <h2 className="title text-center mb-2">About the company</h2>
                                <p>BAFCO is still one of the largest most successful Office Furniture and Fit-out Specialists in the GCC    region. Since its inception 30 years ago, BAFCO has expanded to offer a broad range of workplace solutions.
                                    We are proud of our heritage and our market position, with over 179 full time employees, a new state of the art manufacturing facility of 180,000 sq ft in Dubai Industrial City, 200,000 sq ft of warehousing for fast delivery throughout the GCC, existing showrooms in both Dubai and Abu Dhabi, plus partnerships with over thirty international furniture brands, and an established loyal client base, it is no wonder we deliver over 1,000 interior projects each year.</p>

                                <div className="mb-3"></div>

                                <p>Learn more about how and why we are the leading UAE professional team, here to guide you through the process of office furniture selection and interior fit-out, design and refurbishment.We are your expert partner for office furniture in Dubai and office furniture in Abu Dhabi.BAFCO are an ideal consultant in office interiors in Dubai and office interiors in Abu Dhabi.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-10"></div>
                    <h2 className="title text-center mb-2">History of the company</h2>
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-box icon-box-sm text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-puzzle-piece"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Lorem ipsum </h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-box icon-box-sm text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-life-ring"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Lorem ipsum </h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-box icon-box-sm text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-heart-o"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Lorem ipsum </h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6 pb-5 mb-6 mb-lg-8">
                    <div className="container">
                        <div className="row" style={{ alignItems: 'center' }}>
                            <div className="col-lg-5 mb-3 mb-lg-0">
                                <h2 className="title">About the founder</h2>
                                <p className="lead text-primary mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                <p className="mb-2">Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue.</p>

                                <ALink href="#" className="btn btn-sm btn-minwidth btn-outline-primary-2">
                                    <span>View More</span>
                                    <i className="icon-long-arrow-right"></i>
                                </ALink>
                            </div>

                            <div className="col-lg-6 offset-lg-1">
                                <div className="about-images">
                                    <img src="images/about/Component-106.png" alt="" className="about-img-front" />
                                    <img src="images/about/Component-107.png" alt="" className="about-img-back" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-2"></div>

                <div className="bg-image pt-7 pb-5 pt-md-12 pb-md-9" style={{ backgroundImage: `url(images/about/unsplash_wDDfbanbhl8.png)` }} >
                    <div className="container">
                        <div className="row">
                            <div className="col-6 col-md-3">
                                <div className="count-container text-center">
                                    <div className="count-wrapper text-white">
                                        <span className="count" data-from="0" data-to="2" data-speed="3000" data-refresh-interval="50">0</span>k+
                                    </div>
                                    <h3 className="count-title text-white">Online shoppers</h3>
                                </div>
                            </div>

                            <div className="col-6 col-md-3">
                                <div className="count-container text-center">
                                    <div className="count-wrapper text-white">
                                        <span className="count" data-from="0" data-to="89" data-speed="3000" data-refresh-interval="50">0</span>K+
                                    </div>
                                    <h3 className="count-title text-white">Happy Customers</h3>
                                </div>
                            </div>

                            <div className="col-6 col-md-3">
                                <div className="count-container text-center">
                                    <div className="count-wrapper text-white">
                                        <span className="count" data-from="0" data-to="24" data-speed="3000" data-refresh-interval="50">0</span>H
                                    </div>
                                    <h3 className="count-title text-white">Whatsapp Support</h3>
                                </div>
                            </div>

                            <div className="col-6 col-md-3">
                                <div className="count-container text-center">
                                    <div className="count-wrapper text-white">
                                        <span className="count" data-from="0" data-to="80" data-speed="3000" data-refresh-interval="50">0</span>K+
                                    </div>
                                    <h3 className="count-title text-white">BAFCO Made products</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6 pb-7">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="brands-text text-center mx-auto mb-6">
                                    <h2 className="title">Global Parters</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                </div>
                                <div className="brands-display">
                                    <div className="row justify-content-center">
                                        {
                                            homeData.brands.slice(0, 8).map((brand, index) =>
                                                <div className="col-6 col-sm-4 col-md-3" key={index}>
                                                    <ALink href="#" className="brand">
                                                        <img src={brand.image} alt="Brand Name" width={brand.width} height={brand.height} />
                                                    </ALink>
                                                </div>
                                            )
                                        }
                                    </div >
                                </div >
                            </div >
                        </div >
                    </div >
                </div>

                <div className="bg-light-2 pt-6 pb-7">
                    <div className="container">
                        <h2 className="title text-center mb-4">Meet Our Team</h2>

                        <div className="row">
                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/about-2/member-1.jpg" alt="member photo" />

                                        <figcaption className="member-overlay">
                                            <div className="social-icons social-icons-simple">
                                                <ALink href="#" className="social-icon" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Twitter"><i className="icon-twitter"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Instagram"><i className="icon-instagram"></i></ALink>
                                            </div>
                                        </figcaption>
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Samanta Grey<span>Founder & CEO</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/about-2/member-2.jpg" alt="member photo" />

                                        <figcaption className="member-overlay">
                                            <div className="social-icons social-icons-simple">
                                                <ALink href="#" className="social-icon" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Twitter"><i className="icon-twitter"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Instagram"><i className="icon-instagram"></i></ALink>
                                            </div>
                                        </figcaption>
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Bruce Sutton<span>Sales & Marketing Manager</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/about-2/member-3.jpg" alt="member photo" />

                                        <figcaption className="member-overlay">
                                            <div className="social-icons social-icons-simple">
                                                <ALink href="#" className="social-icon" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Twitter"><i className="icon-twitter"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Instagram"><i className="icon-instagram"></i></ALink>
                                            </div>
                                        </figcaption>
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Janet Joy<span>Product Manager</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/about-2/member-4.jpg" alt="member photo" />

                                        <figcaption className="member-overlay">
                                            <div className="social-icons social-icons-simple">
                                                <ALink href="#" className="social-icon" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Twitter"><i className="icon-twitter"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Instagram"><i className="icon-instagram"></i></ALink>
                                            </div>
                                        </figcaption>
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Mark Pocket<span>Product Manager</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/about-2/member-5.jpg" alt="member photo" />

                                        <figcaption className="member-overlay">
                                            <div className="social-icons social-icons-simple">
                                                <ALink href="#" className="social-icon" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Twitter"><i className="icon-twitter"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Instagram"><i className="icon-instagram"></i></ALink>
                                            </div>
                                        </figcaption>
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Damion Blue<span>Sales & Marketing Manager</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/about-2/member-6.jpg" alt="member photo" />

                                        <figcaption className="member-overlay">
                                            <div className="social-icons social-icons-simple">
                                                <ALink href="#" className="social-icon" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Twitter"><i className="icon-twitter"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Instagram"><i className="icon-instagram"></i></ALink>
                                            </div>
                                        </figcaption>
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Lenard Smith<span>Product Manager</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/about-2/member-7.jpg" alt="member photo" />

                                        <figcaption className="member-overlay">
                                            <div className="social-icons social-icons-simple">
                                                <ALink href="#" className="social-icon" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Twitter"><i className="icon-twitter"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Instagram"><i className="icon-instagram"></i></ALink>
                                            </div>
                                        </figcaption>
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Rachel Green<span>Product Manager</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/about-2/member-8.jpg" alt="member photo" />

                                        <figcaption className="member-overlay">
                                            <div className="social-icons social-icons-simple">
                                                <ALink href="#" className="social-icon" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Twitter"><i className="icon-twitter"></i></ALink>
                                                <ALink href="#" className="social-icon" title="Instagram"><i className="icon-instagram"></i></ALink>
                                            </div>
                                        </figcaption>
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">David Doe<span>Product Manager</span></h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div >
        </div >
    )
}

export default React.memo(About);