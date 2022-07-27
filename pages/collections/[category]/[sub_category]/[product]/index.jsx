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


const axios = require('axios');

function ProductInner() {
    const router = useRouter();
    const query = router.query;
    const slug = useRouter().query?.sub_category;

    // if (!slug) return <div></div>;

    console.log("router :: ", router)

    const { data, loading, error } = useQuery(GET_PRODUCT, { variables: { slug } });
    const product = data && data.product.single;
    const related = data && data.product.related;
    const prev = data && data.product.prev;
    const next = data && data.product.next;

    console.log("Product :: ", product);

    useEffect(() => {
        alert("we are here in product")
    }, [query])

    if (error) {
        return <div></div>
    }

    return (
        <div className="main">
            <PageHeader
                title=""
                subTitle="We make happy workplaces"
                backgroundImage="images/banners/cat_banner.png"
                buttonText="Discover More"
                buttonUrl="#"
            />
            <Breadcrumb prev={prev} next={next} current="" currentCategory="" />
        </div>
    )
}

// export default ProductInner;
export default withApollo({ ssr: typeof window == 'undefined' })(ProductInner);
