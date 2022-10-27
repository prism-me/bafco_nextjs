import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
import { API } from '~/http/API';
import Helmet from "react-helmet";

function ProductSubCatInner() {
    const router = useRouter();
    const query = router.query;
    const [categoryData, setCategoryData] = useState();

    useEffect(() => {

        API.get(`/front-category/${query?.category}`)
            .then((response) => {
                setCategoryData(response?.data[0])
            })
            .catch((err) => {
                console.log(err);
            });

    }, [query])

    return (
        <main className="main shop">
            <Helmet>
                <title>{categoryData?.seo?.meta_title}</title>
                <meta name="description" content={`${categoryData?.seo?.meta_description}`} />
            </Helmet>
            <PageHeader
                title={categoryData?.name}
                subTitle={categoryData?.sub_title}
                backgroundImage={categoryData?.banner_image === "" || categoryData?.banner_image === null ? "images/banners/cat_banner.png" : categoryData?.banner_image}
                buttonText=""
                buttonUrl="#"
            />
            <nav className="breadcrumb-nav mb-2">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item active">{categoryData?.name}</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    {categoryData?.subcategory_products?.length !== 0 &&
                        categoryData?.subcategory_products?.map((item, index) => (
                            <div className="row mb-6" style={{ alignItems: 'center' }} key={index}>
                                <div className={`col-lg-6 col-sm-6 col-xs-12 mb-6`}>
                                    <div className="sub-cat-featured-img">
                                        <img src={item.featured_image} style={{ width: '100%' }} />
                                    </div>
                                </div>
                                <div className={`col-lg-6 col-sm-6 col-xs-12 mb-6`}>
                                    <div className="product-details sub-cat-deatil">
                                        <h1 className="product-title">{item.name}</h1>
                                        <div className="mb-2" dangerouslySetInnerHTML={{ __html: item.description }} />
                                    </div>
                                </div>
                                {item?.products?.length !== 0 &&
                                    <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                        <div className="product-details sub-cat-deatil">
                                            <h1 className="product-title">Our Collections</h1>
                                            <p>{item.sub_title}</p>
                                            <ALink href={`/collections/${query?.category}/${item.route}`} className="btn btn-dark btn-outline-darker">
                                                <span>Check All </span>
                                                <i className="icon-long-arrow-right"></i>
                                            </ALink>
                                        </div>
                                    </div>
                                }
                                {item?.products?.length !== 0 &&
                                    <div className={`col-lg-9 col-sm-6 col-xs-12`}>
                                        <div className="row">
                                            {item.products.slice(-4).map((item2, index2) => (
                                                <div className={`col-lg-3 col-sm-6 col-xs-6`} key={index2}>
                                                    <div className="sub-cat-product-img">
                                                        <ALink href={`/collections/${query?.category}/${item.route}/${item2.route}`}><img src={item2.featured_image} /></ALink>
                                                        <h6 className="text-center"><ALink href={`/collections/${query?.category}/${item.route}/${item2.route}`}>{item2.name}</ALink></h6>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                }
                            </div>
                        ))}
                </div >
            </div >
        </main >
    )
}

export default ProductSubCatInner;