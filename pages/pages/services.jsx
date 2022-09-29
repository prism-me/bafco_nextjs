import React, { useEffect, useState } from 'react';

import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import OwlCarousel from '~/components/features/owl-carousel';
import { mainSlider5 } from '~/utils/data';
import { API } from '~/http/API';

function Services() {

    const [servicesData, setServicesData] = useState();
    const [testimonial, setTestimonial] = useState();

    useEffect(() => {

        API.get(`/services`).then((response) => {
            setServicesData(response.data.services.content)
            setTestimonial(response.data.testimonial)
        }).catch((err) => console.log(err));

    }, [])

    return (
        <div className="main">
            <PageHeader
                title={servicesData?.banner?.heading}
                subTitle={servicesData?.banner?.sub_heading}
                backgroundImage={servicesData?.banner?.image}
                buttonText=""
                buttonUrl="#"
            />

            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item active">{servicesData?.banner?.heading}</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content pb-3">
                <div className="container">
                    <div className="application-heading text-center mb-3">
                        <h2>Our Services</h2>
                    </div>
                    {servicesData?.content?.map((item, index) => (
                        index % 2 ?
                            <div className="row mb-6 align-items-center" key={index}>
                                <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                                    <div className="product-details sub-cat-deatil">
                                        <h2 className="title">{item.heading}</h2>
                                        <div className="mb-2" dangerouslySetInnerHTML={{ __html: item.description }} />

                                    </div>
                                </div>
                                <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-featured-img">
                                        <img src={item.images} />
                                    </div>
                                </div>
                            </div > :
                            <div className="row mb-6 align-items-center" key={index}>
                                <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-featured-img">
                                        <img src={item.images} />
                                    </div>
                                </div>

                                <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                                    <div className="product-details sub-cat-deatil text-right">
                                        <h2 className="title">{item.heading}</h2>
                                        <div className="mb-2" dangerouslySetInnerHTML={{ __html: item.description }} />

                                    </div>
                                </div>
                            </div >
                    ))}
                </div>
                <div className="testimonial-containerfluid" style={{ backgroundImage: 'url(images/testimonials/testimonial-bg.png)' }}>
                    <div className="container">
                        <h3 className="text-center mb-3">Testimonials</h3>

                        <OwlCarousel adClass="owl-testimonials cols-1"
                            options={mainSlider5}>
                            {testimonial?.map((item, index) => (
                                <blockquote className="testimonial testimonial-icon text-center" key={index}>
                                    <img src={item.img} />
                                    <div dangerouslySetInnerHTML={{ __html: item.review }} />
                                    <cite>
                                        {item.name}
                                        <span>{item.designation}</span>
                                    </cite>
                                </blockquote>
                            ))}

                        </OwlCarousel>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default React.memo(Services);