import { useEffect, useState } from "react";
import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import Card from '~/components/features/accordion/card';
import Accordion from '~/components/features/accordion/accordion';
import { API } from '~/http/API';

function FAQ() {

    const [faqsdata, setFaqsdata] = useState();
    const [faqType, setFaqType] = useState([]);

    useEffect(() => {

        API.get(`/faq`).then((response) => {
            setFaqsdata(response.data);

            let typeGroup = response.data?.faqs?.reduce((acc, curr) =>
                acc.find((v) => v?.type === curr?.type) ? acc : [...acc, curr],
                []);

            let typegroupdata = typeGroup?.map((item) => {
                let typeData = { 'type': item.type }
                return typeData
            })
            setFaqType(typegroupdata);

        }).catch((err) => console.log(err));

    }, []);

    return (
        <div className="main">
            <PageHeader
                title={faqsdata?.FaqBanner?.content?.banner?.heading}
                subTitle={faqsdata?.FaqBanner?.content?.banner?.sub_heading !== '' ? faqsdata?.FaqBanner?.content?.banner?.sub_heading : ''}
                backgroundImage={faqsdata?.FaqBanner?.content?.banner?.image}
                buttonText="Shop Now"
                buttonUrl="/"
            />

            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item active">FAQ</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    {faqType?.map((item, index) => (
                        <>
                            <h2 className="title text-center mb-3" key={index}>{item.type}</h2>
                            <Accordion adClass="accordion-rounded">
                                {faqsdata?.faqs?.map((faq, index2) => (
                                    faq?.type === item.type &&
                                    <Card title={faq?.question} adClass="card-box card-sm bg-light" key={index2}>
                                        <div dangerouslySetInnerHTML={{ __html: faq?.answer }} />
                                    </Card>
                                ))}
                            </Accordion>

                        </>
                    ))}
                </div>
            </div>

            <div className="cta cta-display bg-image pt-4 pb-4" style={{ backgroundImage: `url(images/backgrounds/cta/bg-7.jpg)` }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-9 col-xl-7">
                            <div className={`row no-gutters flex-sm-row align-items-sm-center`} >
                                <div className="col">
                                    <h3 className="cta-title text-white">If You Have More Questions</h3>
                                    <p className="cta-desc text-white">Quisque volutpat mattis eros</p>
                                </div>

                                <div className="col-auto">
                                    <ALink href="/pages/contact" className="btn btn-outline-white"><span>CONTACT US</span><i className="icon-long-arrow-right"></i></ALink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default FAQ;