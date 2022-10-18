import { useEffect, useState } from "react";
import { API } from "~/http/API"
import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import { countTo } from '~/utils';

function About() {

    const [aboutdata, setAboutdata] = useState();
    const [teamList, setTeamList] = useState();
    const [partnersList, setPartnersList] = useState();

    useEffect(() => {

        countTo();

        API.get(`/about`).then((response) => {
            setAboutdata(response.data?.about?.content)
            setTeamList(response?.data?.team)
            setPartnersList(response?.data?.partner)
        }).catch((err) => console.log(err));

    }, []);

    return (
        <div className="main">
            <PageHeader
                title={aboutdata?.banner?.heading}
                subTitle={aboutdata?.banner?.sub_heading}
                backgroundImage={aboutdata?.banner?.image}
                buttonText=""
                buttonUrl="#"
            />

            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item active">{aboutdata?.banner?.heading}</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content pb-3">
                <div className="container">
                    <div className="row" style={{ alignItems: 'center' }}>
                        <div className="col-lg-4">
                            <div className="about-text mt-3">
                                <img src={aboutdata?.intro?.animationImg} alt={aboutdata?.intro?.heading} />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="about-text mt-3" style={{ marginLeft: '30px' }}>
                                <h2 className="title mb-2">{aboutdata?.intro?.heading}</h2>
                                <div dangerouslySetInnerHTML={{ __html: aboutdata?.intro?.description }} />
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
                                    <h3 className="icon-box-title">{aboutdata?.history[0]?.heading}</h3>
                                    <p>{aboutdata?.history[0]?.sub_heading}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-box icon-box-sm text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-life-ring"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">{aboutdata?.history[1]?.heading}</h3>
                                    <p>{aboutdata?.history[1]?.sub_heading}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-box icon-box-sm text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-heart-o"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">{aboutdata?.history[2]?.heading}</h3>
                                    <p>{aboutdata?.history[2]?.sub_heading}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="pt-6 pb-5 mb-6 mb-lg-8">
                    <div className="container">
                        <div className="row" style={{ alignItems: 'center' }}>
                            <div className="col-lg-5 mb-3 mb-lg-0">
                                <h3 className="mb-3">{aboutdata?.founder?.heading}</h3>
                                <div dangerouslySetInnerHTML={{ __html: aboutdata?.founder?.description }} />

                                <ALink href="#" className="btn btn-sm btn-minwidth btn-outline-primary-2">
                                    <span>View More</span>
                                    <i className="icon-long-arrow-right"></i>
                                </ALink>
                            </div>

                            <div className="col-lg-5 offset-lg-2">
                                <div className="about-images">
                                    <img src={aboutdata?.founder?.image} alt="" width="300" className="about-img-front" />
                                    <img src="images/about/Component-107.jpg" alt="" width="300" className="about-img-back" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="mb-2"></div>

                <div className="bg-image pt-7 pb-5 pt-md-12 pb-md-9" style={{ backgroundImage: `url(images/about/unsplash_wDDfbanbhl8.png)` }} >
                    <div className="container">
                        <div className="row">
                            {aboutdata?.counter?.map((item, index) => (
                                <div className="col-6 col-md-3" key={index}>
                                    <div className="count-container text-center">
                                        <div className="count-wrapper text-white">
                                            <span className="count" data-from="0" data-to={item.value} data-speed="3000" data-refresh-interval="50">0</span>
                                        </div>
                                        <h3 className="count-title text-white">{item.description}</h3>
                                    </div>
                                </div>
                            ))}
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
                                        partnersList?.map((brand, index) =>
                                            index % 2 ?
                                                <div className="row justify-content-center mb-3" key={index} style={{ alignItems: 'center' }}>
                                                    <div className="col-sm-6 col-md-6 col-xs-12">
                                                        <img src={brand.image} alt={brand.name} />
                                                    </div>
                                                    <div className="col-sm-6 col-md-6 col-xs-12">
                                                        <ALink href={brand.link} target="_blank"><img src={brand.logo} alt={brand.name} /></ALink>
                                                        <div dangerouslySetInnerHTML={{ __html: brand.description }} />
                                                    </div>
                                                </div > :
                                                <div className="row justify-content-center mb-3" key={index} style={{ alignItems: 'center' }}>

                                                    <div className="col-sm-6 col-md-6 col-xs-12">
                                                        <ALink href={brand.link} target="_blank"><img src={brand.logo} alt={brand.name} /></ALink>
                                                        <div dangerouslySetInnerHTML={{ __html: brand.description }} />
                                                    </div>
                                                    <div className="col-sm-6 col-md-6 col-xs-12">
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

                {/* <div className="bg-light-2 pt-6 pb-7">
                    <div className="container">
                        <h2 className="title text-center mb-2">Meet Our Team</h2>
                        <p className="text-center mb-4">We’re a furniture-loving, creative bunch who love to sing and dance, listen to music, bake cakes, and cuddle with our pets.</p>
                        <div className="row">
                            {teamList?.map((item, index) => (
                                <div className="col-sm-6 col-lg-3" key={index}>
                                    <div className="member member-2 text-center">
                                        <figure className="member-media">
                                            <img src={item.image} className="Sirv image-main" alt={item.name} />
                                            <img src={item.gif} className="Sirv image-hover" alt={item.name} />
                                        </figure>
                                        <div className="member-content">
                                            <h3 className="member-title">{item.name}<span>{item.designation}</span></h3>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div className="text-center mt-5">
                            <ALink href="/pages/team/" className="btn btn-outline-darker btn-more"><span>View more</span><i className="icon-long-arrow-right"></i></ALink>
                        </div>
                    </div>
                </div> */}

            </div >
        </div >
    )
}

export default React.memo(About);