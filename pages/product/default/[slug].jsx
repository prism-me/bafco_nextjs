import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import withApollo from '~/server/apollo';
import { GET_PRODUCT } from '~/server/queries';

import Breadcrumb from '~/components/partials/product/breadcrumb';
import GalleryDefault from '~/components/partials/product/gallery/gallery-default';
import DetailOne from '~/components/partials/product/details/detail-one';
import InfoOne from '~/components/partials/product/info-tabs/info-one';
import RelatedProductsOne from '~/components/partials/product/related/related-one';
import PageHeader from '~/components/features/page-header';
import { mainSlider9 } from '~/utils/data';
import { Magnifier } from 'react-image-magnifiers';
import OwlCarousel from '~/components/features/owl-carousel';

function ProductDefault() {
    const slug = useRouter().query.slug;
    if (!slug) return <div></div>;

    const { data, loading, error } = useQuery(GET_PRODUCT, { variables: { slug } });
    const product = data && data.product.single;
    const related = data && data.product.related;
    const prev = data && data.product.prev;
    const next = data && data.product.next;

    // console.log("Product :: ", product);

    if (error) {
        return <div></div>
    }

    return (
        <div className="main">
            <PageHeader
                title={product?.name}
                subTitle="We make happy workplaces"
                backgroundImage="images/banners/cat_banner.png"
                buttonText="Discover More"
                buttonUrl="#"
            />
            <Breadcrumb prev={prev} next={next} current={product?.name} currentCategory={product?.category[0]?.name} />
            <div className="page-content">
                <div className="container skeleton-body">
                    <div className="product-details-top">
                        <div className={`row skel-pro-single ${loading ? '' : 'loaded'}`}>
                            <div className="col-md-6">
                                <div className="skel-product-gallery"></div>
                                {
                                    !loading ?
                                        <GalleryDefault product={product} />
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
                                {
                                    !loading ?
                                        <DetailOne product={product} />
                                        : ""
                                }
                            </div>
                        </div>
                    </div>

                    <div className="product-lg position-relative mb-5">
                        {
                            product?.new ?
                                <span className="product-label label-new">New</span>
                                : ""
                        }

                        {
                            product?.sale_price ?
                                <span className="product-label label-sale">Sale</span>
                                : ""
                        }

                        {
                            product?.top ?
                                <span className="product-label label-top">Top</span>
                                : ""
                        }

                        {
                            product?.stock === 1 ?
                                <span className="product-label label-out">Stocking</span>
                                : ""
                        }
                        <OwlCarousel adClass="product-gallery-carousel owl-full owl-nav-dark cols-1 cols-md-2 cols-lg-3" options={mainSlider9}>
                            {product?.pictures.map((item, index) =>
                                <Magnifier
                                    imageSrc={process.env.NEXT_PUBLIC_ASSET_URI + item.url}
                                    imageAlt="product"
                                    largeImageSrc={process.env.NEXT_PUBLIC_ASSET_URI + item.url} // Optional
                                    dragToMove={false}
                                    mouseActivation="hover"
                                    cursorStyleActive="crosshair"
                                    className="product-gallery-image"
                                    style={{ paddingTop: `${product?.pictures[0].height / product?.pictures[0].width * 100}%` }}
                                    key={"gallery-" + index}
                                />
                            )}
                        </OwlCarousel>
                    </div>

                    {
                        loading ?
                            <div className="skel-pro-tabs"></div>
                            :
                            <InfoOne product={product} />
                    }

                    <RelatedProductsOne products={related} loading={loading} />
                </div >
            </div >
        </div >
    )
}

export default withApollo({ ssr: typeof window == 'undefined' })(ProductDefault);
