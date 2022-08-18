import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import React, { useState, useEffect } from 'react';
import PageHeader from '~/components/features/page-header';
import Breadcrumb from '~/components/partials/product/breadcrumb';
import GalleryDefault from '~/components/partials/product/gallery/gallery-default';
import DetailOne from '~/components/partials/product/details/detail-one';
import InfoOne from '~/components/partials/product/info-tabs/info-one';
import RelatedProductsOne from '~/components/partials/product/related/related-one';
import { mainSlider9 } from '~/utils/data';
import { Magnifier } from 'react-image-magnifiers';
import OwlCarousel from '~/components/features/owl-carousel';
import { GET_PRODUCT } from '~/server/queries';
import withApollo from '~/server/apollo';
import ALink from '~/components/features/alink';
import { API } from '~/http/API';


const axios = require('axios');

function ProductInner() {
    const router = useRouter();
    const query = router.query;
    const slug = useRouter().query?.product;
    const subCategoryName = query?.sub_category.replace('-', ' ');

    if (!slug) return <div></div>;

    const { data, loading, error } = useQuery(GET_PRODUCT, { variables: { slug } });
    // const product = data && data.product.single;
    const related = data && data.product.related;
    const prev = data && data.product.prev;
    const next = data && data.product.next;
    const [product, setProduct] = useState();
    const [pageTitle, setPageTitle] = useState("");
    const [selectedVariation, setSelectedVariation] = useState();

    useEffect(() => {
        // alert("we are here in product")
        setPageTitle(query?.product.replace('-', ' '));
        API.get(`/product-detail/${query?.product}`)
            .then((response) => {
                setProduct(response?.data)
            })
            .catch((err) => {
                console.log(err);
            });
        { console.log("Main :: ", selectedVariation) }

    }, [selectedVariation])

    return (
        <div className="main">
            <PageHeader
                title={pageTitle}
                subTitle="We make happy workplaces"
                backgroundImage="images/banners/cat_banner.png"
                buttonText="Discover More"
                buttonUrl="#"
            />
            <nav className="breadcrumb-nav mb-2">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item"><ALink href={`/collections/${query?.category}`}>{query?.category}</ALink></li>
                        <li className="breadcrumb-item"><ALink href={`/collections/${query?.category}/${query?.sub_category}`}>{subCategoryName}</ALink></li>
                        <li className="breadcrumb-item active">{pageTitle}</li>
                    </ol>
                </div>
            </nav>
            <div className="page-content">
                <div className="container skeleton-body">
                    <div className="product-details-top">
                        <div className={`row skel-pro-single ${loading ? '' : 'loaded'}`}>
                            <div className="col-md-6">
                                <div className="skel-product-gallery"></div>
                                {product?.product_single_variation ?
                                    <GalleryDefault product={product?.product_single_variation?.product_variation_details} />
                                    : ""
                                }
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
                                {
                                    !loading ?
                                        <DetailOne product={product} subCategory={subCategoryName} handelselectedVariation={setSelectedVariation} />
                                        : ""
                                }
                            </div>
                        </div>
                    </div>

                    <div className="product-lg position-relative mb-5">
                        {/* {
                            product?.stock == 0 ?
                                <span className="product-label label-out">Out of Stock</span>
                                : ""
                        } */}
                        <OwlCarousel adClass="product-gallery-carousel owl-full owl-nav-dark cols-1 cols-md-2 cols-lg-3" options={mainSlider9}>
                            {product?.single_product_details?.product?.album.map((item, index) =>
                                <Magnifier
                                    imageSrc={item.avatar}
                                    imageAlt="product"
                                    largeImageSrc={item.avatar} // Optional
                                    dragToMove={false}
                                    mouseActivation="hover"
                                    cursorStyleActive="crosshair"
                                    className="product-gallery-image"
                                    style={{ paddingTop: `${424 / 405 * 100}%` }}
                                    key={"gallery-" + index}
                                />
                            )}
                        </OwlCarousel>
                    </div>
                    <InfoOne product={product?.single_product_details} dimension={product?.dimensions} />
                    <RelatedProductsOne relatedproducts={product?.related_products} randomProduct={product?.random_purchase} loading={loading} />
                </div >
            </div >

        </div>
    )
}

// export default ProductInner;
export default withApollo({ ssr: typeof window == 'undefined' })(ProductInner);
