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
                                <p>BAFCO is one of the GCC region's most established office furniture manufacturers and traders. We are known in the market as the “Office Furniture People”, as we are obsessed with design, quality and materials.</p>

                                <div className="mb-3"></div>

                                <p>We have a manufacturing facility of 180,000 square feet in Dubai Industrial City, existing showrooms in both Dubai and Abu Dhabi, partnerships with over 30 global furniture brands, and an established loyal client base. This enables us to deliver over 1,000 successful workspaces that balance function, cost and design.</p>
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
                                <h3 className="mb-3">Our values are the foundation of our creative ideas.</h3>
                                <p className="mb-2">“We want to help you discover new ideas, improve the way you work, and teach you techniques to make your work even more effective.” </p>
                                <p className="lead text-primary mb-2"> - K. Fattahi, Managing Director of BAFCO</p>

                                <ALink href="#" className="btn btn-sm btn-minwidth btn-outline-primary-2">
                                    <span>View More</span>
                                    <i className="icon-long-arrow-right"></i>
                                </ALink>
                            </div>

                            <div className="col-lg-5 offset-lg-2">
                                <div className="about-images">
                                    <img src="images/about/founder.jpg" alt="" width="300" className="about-img-front" />
                                    <img src="images/about/Component-107.jpg" alt="" width="300" className="about-img-back" />
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
                                        <span className="count" data-from="0" data-to="300" data-speed="3000" data-refresh-interval="50">0</span>+
                                    </div>
                                    <h3 className="count-title text-white">BAFCO Employees</h3>
                                </div>
                            </div>

                            <div className="col-6 col-md-3">
                                <div className="count-container text-center">
                                    <div className="count-wrapper text-white">
                                        <span className="count" data-from="0" data-to="30" data-speed="3000" data-refresh-interval="50">0</span>
                                    </div>
                                    <h3 className="count-title text-white">Exclusive Partnerships with Global Furniture Brands</h3>
                                </div>
                            </div>

                            <div className="col-6 col-md-3">
                                <div className="count-container text-center">
                                    <div className="count-wrapper text-white">
                                        <span className="count" data-from="0" data-to="3" data-speed="3000" data-refresh-interval="50">0</span>
                                    </div>
                                    <h3 className="count-title text-white">Showrooms across GCC</h3>
                                </div>
                            </div>

                            <div className="col-6 col-md-3">
                                <div className="count-container text-center">
                                    <div className="count-wrapper text-white">
                                        <span className="count" data-from="0" data-to="28" data-speed="3000" data-refresh-interval="50">0</span>
                                    </div>
                                    <h3 className="count-title text-white">Furniture Lines, made in the UAE by BAFCO</h3>
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
                                    <p>Access to on-trend, design-led brands sourced from global markets and artisan ateliers.</p>
                                </div>
                                <div className="brands-display">
                                    {
                                        homeData.brands.map((brand, index) =>
                                            index % 2 ?
                                                <div className="row justify-content-center mb-3" key={index} style={{ alignItems: 'center' }}>
                                                    <div className="col-6 col-sm-6 col-md-6">
                                                        <img src={brand.image} alt={brand.name} />
                                                    </div>
                                                    <div className="col-6 col-sm-6 col-md-6">
                                                        <ALink href={brand.slug} target="_blank"><img src={brand.logo} alt={brand.name} /></ALink>
                                                        <p>{brand.description}</p>
                                                    </div>
                                                </div > :
                                                <div className="row justify-content-center mb-3" key={index} style={{ alignItems: 'center' }}>

                                                    <div className="col-6 col-sm-6 col-md-6">
                                                        <ALink href={brand.slug} target="_blank"><img src={brand.logo} alt={brand.name} /></ALink>
                                                        <p>{brand.description}</p>
                                                    </div>
                                                    <div className="col-6 col-sm-6 col-md-6">
                                                        <img src={brand.image} alt={brand.name} />
                                                    </div>
                                                </div >
                                        )
                                    }
                                </div >
                            </div >
                        </div >
                    </div >
                </div>

                <div className="bg-light-2 pt-6 pb-7">
                    <div className="container">
                        <h2 className="title text-center mb-2">Meet Our Team</h2>
                        <p className="text-center mb-4">We’re a furniture-loving, creative bunch who love to sing and dance, listen to music, bake cakes, and cuddle with our pets.</p>
                        <div className="row">
                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/RajkamalParapath.jpg" class="Sirv image-main" alt="member photo" />
                                        <img src="images/team/gifimg/RajkamalParapathGIF.gif" class="Sirv image-hover" alt="member photo" />
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Rajkamal Parapath<span>Designer / Account Manager</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/DinahSarmiento.jpg" class="Sirv image-main" alt="member photo" />
                                        <img src="images/team/gifimg/RajkamalParapathGIF.gif" class="Sirv image-hover" alt="member photo" />
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Dinah Sarmiento<span>Quality Department Head</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/NehaLaitu.jpg" class="Sirv image-main" alt="member photo" />
                                        <img src="images/team/gifimg/RajkamalParapathGIF.gif" class="Sirv image-hover" alt="member photo" />
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Neha Laitu<span>Department Head Sales / Account Manager</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/DianneGallardo.jpg" class="Sirv image-main" alt="member photo" />
                                        <img src="images/team/gifimg/RajkamalParapathGIF.gif" class="Sirv image-hover" alt="member photo" />
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Dianne Gallardo<span>After Sales Support</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/JackieCartin.jpg" class="Sirv image-main" alt="member photo" />
                                        <img src="images/team/gifimg/RajkamalParapathGIF.gif" class="Sirv image-hover" alt="member photo" />
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Jackie Cartin<span>Procurement & Planning</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/LizaPorquiado.jpg" class="Sirv image-main" alt="member photo" />
                                        <img src="images/team/gifimg/RajkamalParapathGIF.gif" class="Sirv image-hover" alt="member photo" />
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Liza Porquiado<span>Head of Planning</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/MysolNaron.jpg" class="Sirv image-main" alt="member photo" />
                                        <img src="images/team/gifimg/RajkamalParapathGIF.gif" class="Sirv image-hover" alt="member photo" />
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Mysol Naron<span>Head of Admin</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/SunilDamodaran.jpg" class="Sirv image-main" alt="member photo" />
                                        <img src="images/team/gifimg/RajkamalParapathGIF.gif" class="Sirv image-hover" alt="member photo" />
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Sunil Damodaran<span>Head of Procurement</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/GilbertGrino.jpg" class="Sirv image-main" alt="member photo" />
                                        <img src="images/team/gifimg/RajkamalParapathGIF.gif" class="Sirv image-hover" alt="member photo" />
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Gilbert Grino<span>Head of Marketing</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/Prasad.jpg" class="Sirv image-main" alt="member photo" />
                                        <img src="images/team/gifimg/RajkamalParapathGIF.gif" class="Sirv image-hover" alt="member photo" />
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Prasad<span>Project Engineer</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/Ashraf.jpg" class="Sirv image-main" alt="member photo" />
                                        <img src="images/team/gifimg/RajkamalParapathGIF.gif" class="Sirv image-hover" alt="member photo" />
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Ashraf<span>Accounts</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/ArifAhmedMohammed.jpg" class="Sirv image-main" alt="member photo" />
                                        <img src="images/team/gifimg/RajkamalParapathGIF.gif" class="Sirv image-hover" alt="member photo" />
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Arif Ahmed Mohammed<span></span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/PauloEsmeralda.jpg" class="Sirv image-main" alt="member photo" />
                                        <img src="images/team/gifimg/RajkamalParapathGIF.gif" class="Sirv image-hover" alt="member photo" />
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Paulo Esmeralda<span>Head of Product Development</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/TedAlmario.jpg" class="Sirv image-main" alt="member photo" />
                                        <img src="images/team/gifimg/RajkamalParapathGIF.gif" class="Sirv image-hover" alt="member photo" />
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Ted Almario<span>Inventory Controller</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <div className="member member-2 text-center">
                                    <figure className="member-media">
                                        <img src="images/team/KervyAvelino.jpg" class="Sirv image-main" alt="member photo" />
                                        <img src="images/team/gifimg/RajkamalParapathGIF.gif" class="Sirv image-hover" alt="member photo" />
                                    </figure>
                                    <div className="member-content">
                                        <h3 className="member-title">Kervy Avelino<span>Sales Support</span></h3>
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