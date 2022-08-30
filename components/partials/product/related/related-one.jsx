import React from 'react';
import ProductTwelve from '~/components/features/products/product-twelve';
import OwlCarousel from '~/components/features/owl-carousel';

import { mainSlider8 } from '~/utils/data';

function RelatedProductsOne(props) {
    const { relatedproducts, randomProduct } = props;

    return (
        <>
            {randomProduct?.length !== 0 &&
                <>
                    <h2 className="title text-center mb-4">You May Also Purchase</h2>
                    <OwlCarousel adClass="owl-simple carousel-equal-height carousel-with-shadow cols-lg-4 cols-md-3 cols-xs-2 cols-1 mb-4" isTheme={false} options={mainSlider8}>
                        {randomProduct?.map((product, index) =>
                            <ProductTwelve
                                product={product}
                                key={index}
                                categoryName={product?.product_category?.parent_category?.route}
                                subCategoryName={product?.product_category?.route}
                            />
                        )
                        }
                    </OwlCarousel>
                </>
            }
            {relatedproducts?.length !== 0 &&
                <>
                    <h2 className="title text-center mb-4">You Might Also Like</h2>
                    <OwlCarousel adClass="owl-simple carousel-equal-height carousel-with-shadow cols-lg-4 cols-md-3 cols-xs-2 cols-1" isTheme={false} options={mainSlider8}>
                        {
                            relatedproducts?.map((product, index) =>
                                <ProductTwelve product={product} key={index} />
                            )
                        }
                    </OwlCarousel>
                </>
            }
        </>
    );
}

export default React.memo(RelatedProductsOne);