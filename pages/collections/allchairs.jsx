import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import StickyBox from 'react-sticky-box';

import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
import ShopListTwo from '~/components/partials/shop/list/shop-list-two';
import Pagination from '~/components/features/pagination';
import ShopSidebarOne from '~/components/partials/shop/sidebar/shop-sidebar-one';

import withApollo from '~/server/apollo';
import { GET_PRODUCTS } from '~/server/queries';
import { scrollToPageContent } from '~/utils';

function ProductSubCatInner() {
    const router = useRouter();
    const type = router?.route.split('/')[2];
    const query = router.query;
    const [getProducts, { data, loading, error }] = useLazyQuery(GET_PRODUCTS);
    const [firstLoading, setFirstLoading] = useState(false);
    const [perPage, setPerPage] = useState(12);
    const [pageTitle, setPageTitle] = useState(type);
    const [toggle, setToggle] = useState(false);
    const products = data && data.products.data;
    const totalCount = data && data.products.totalCount;

    useEffect(() => {
        window.addEventListener("resize", resizeHandle);
        resizeHandle();
        return () => {
            window.removeEventListener("resize", resizeHandle);
        }
    }, [])

    function resizeHandle() {
        if (document.querySelector("body").offsetWidth < 992)
            setToggle(true);
        else
            setToggle(false);
    }

    useEffect(() => {
        getProducts({
            variables: {
                searchTerm: query.searchTerm,
                color: query.color ? query.color.split(',') : [],
                size: query.size ? query.size.split(',') : [],
                brand: query.brand ? query.brand.split(',') : [],
                minPrice: parseInt(query.minPrice),
                maxPrice: parseInt(query.maxPrice),
                category: query.category,
                sortBy: query.sortBy ? query.sortBy : 'default',
                page: query.page ? parseInt(query.page) : 1,
                perPage: perPage,
                list: true
            }
        });

        scrollToPageContent();
    }, [query, perPage])

    useEffect(() => {
        if (products) setFirstLoading(true);
    }, [products])

    // useEffect(() => {
    //     if (type == 'list') {
    //         setPageTitle('List');
    //         setPerPage(12);
    //     } else if (type == '2cols') {
    //         setPageTitle('Grid 2 Columns');
    //         setPerPage(12);
    //     } else if (type == '3cols') {
    //         setPageTitle('Grid 3 Columns');
    //         setPerPage(12);
    //     } else if (type == '4cols') {
    //         setPageTitle('Grid 4 Columns');
    //         setPerPage(12);
    //     }
    // }, [type])

    function onSortByChange(e) {
        let queryObject = router.query;
        let url = router.pathname.replace('[type]', query.type) + '?';
        for (let key in queryObject) {
            if (key !== "type" && key !== "sortBy") {
                url += key + '=' + queryObject[key] + '&';
            }
        }

        router.push(url + 'sortBy=' + e.target.value);
    }

    function toggleSidebar() {
        if (
            document
                .querySelector('body')
                .classList.contains('sidebar-filter-active')
        ) {
            document
                .querySelector('body')
                .classList.remove('sidebar-filter-active');
        } else {
            document
                .querySelector('body')
                .classList.add('sidebar-filter-active');
        }
    }

    function hideSidebar() {
        document
            .querySelector('body')
            .classList.remove('sidebar-filter-active');
    }

    if (error) {
        return <div></div>
    }

    return (
        <main className="main shop">
            <PageHeader
                title={pageTitle}
                subTitle="We make happy workplaces"
                backgroundImage="images/banners/cat_banner.png"
                buttonText="View Our Products"
                buttonUrl="#"
            />
            <nav className="breadcrumb-nav mb-2">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item active">{pageTitle}</li>
                        {
                            query.search ?
                                <li className="breadcrumb-item">
                                    <span>Search - {query.searchTerm}</span>
                                </li>
                                : ""
                        }
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <div className="row mb-6" style={{ alignItems: 'center' }}>
                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                            <div className="sub-cat-featured-img">
                                <img src="images/category/Insert-Image-Here.png" />
                            </div>
                        </div>
                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                            <div className="product-details sub-cat-deatil">
                                <h1 class="product-title">Executive Chairs</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                                <ul>
                                    <li><strong>Lorem Ipsum</strong><br /> Sometimes features Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                    <li><strong>Lorem Ipsum</strong><br /> Sometimes features Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                </ul>
                            </div>
                        </div>
                    </div >
                    <div className="row mb-6" style={{ alignItems: 'center' }}>
                        <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                            <div className="product-details sub-cat-deatil">
                                <h1 class="product-title">Our Collections</h1>
                                <p>Get the latest items immediately with promo prices</p>
                                <ALink href={"#"} className="btn btn-dark btn-outline-darker">
                                    <span>Check All </span>
                                    <i className="icon-long-arrow-right"></i>
                                </ALink>
                            </div>
                        </div>
                        <div className={`col-lg-9 col-sm-6 col-xs-12`}>
                            <div className="row">
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/collection01.png" />
                                        <h6 className="text-center">Freedom Humanscale</h6>
                                    </div>
                                </div>
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/collection02.png" />
                                        <h6 className="text-center">Freedom Humanscale</h6>
                                    </div>
                                </div>
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/collection03.png" />
                                        <h6 className="text-center">Numex Comfort</h6>
                                    </div>
                                </div>
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/collection04.png" />
                                        <h6 className="text-center">Numex Comfort</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-6" style={{ alignItems: 'center' }}>
                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                            <div className="sub-cat-featured-img">
                                <img src="images/category/Insert-Image-Here.png" />
                            </div>
                        </div>
                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                            <div className="product-details sub-cat-deatil">
                                <h1 class="product-title">Ergonomic Chairs</h1>
                                <p>Our designer already made a lot of beautiful chairs and workspace that inspire you</p>
                                <ul>
                                    <li><strong>Lorem Ipsum</strong><br /> Sometimes features Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                    <li><strong>Lorem Ipsum</strong><br /> Sometimes features Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                </ul>
                            </div>
                        </div>
                    </div >
                    <div className="row mb-6" style={{ alignItems: 'center' }}>
                        <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                            <div className="product-details sub-cat-deatil">
                                <h1 class="product-title">Our Collections</h1>
                                <p>Get the latest items immediately with promo prices</p>
                                <ALink href={"#"} className="btn btn-dark btn-outline-darker">
                                    <span>Check All </span>
                                    <i className="icon-long-arrow-right"></i>
                                </ALink>
                            </div>
                        </div>
                        <div className={`col-lg-9 col-sm-6 col-xs-12`}>
                            <div className="row">
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/collection01.png" />
                                        <h6 className="text-center">Freedom Humanscale</h6>
                                    </div>
                                </div>
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/collection02.png" />
                                        <h6 className="text-center">Freedom Humanscale</h6>
                                    </div>
                                </div>
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/collection03.png" />
                                        <h6 className="text-center">Numex Comfort</h6>
                                    </div>
                                </div>
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/collection04.png" />
                                        <h6 className="text-center">Numex Comfort</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-6" style={{ alignItems: 'center' }}>
                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                            <div className="sub-cat-featured-img">
                                <img src="images/category/conference-chair.png" />
                            </div>
                        </div>
                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                            <div className="product-details sub-cat-deatil">
                                <h1 class="product-title">Conference Chairs</h1>
                                <p>Get the latest items immediately with best prices</p>
                                <ul>
                                    <li><strong>Lorem Ipsum</strong><br /> Sometimes features Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                    <li><strong>Lorem Ipsum</strong><br /> Sometimes features Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                </ul>
                            </div>
                        </div>
                    </div >
                    <div className="row mb-6" style={{ alignItems: 'center' }}>
                        <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                            <div className="product-details sub-cat-deatil">
                                <h1 class="product-title">Our Collections</h1>
                                <p>Get the latest items immediately with promo prices</p>
                                <ALink href={"#"} className="btn btn-dark btn-outline-darker">
                                    <span>Check All </span>
                                    <i className="icon-long-arrow-right"></i>
                                </ALink>
                            </div>
                        </div>
                        <div className={`col-lg-9 col-sm-6 col-xs-12`}>
                            <div className="row">
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/collection01.png" />
                                        <h6 className="text-center">Freedom Humanscale</h6>
                                    </div>
                                </div>
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/collection02.png" />
                                        <h6 className="text-center">Freedom Humanscale</h6>
                                    </div>
                                </div>
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/collection03.png" />
                                        <h6 className="text-center">Numex Comfort</h6>
                                    </div>
                                </div>
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/collection04.png" />
                                        <h6 className="text-center">Numex Comfort</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-6" style={{ alignItems: 'center' }}>
                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                            <div className="sub-cat-featured-img">
                                <img src="images/category/Visitor-Chairs.png" />
                            </div>
                        </div>
                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                            <div className="product-details sub-cat-deatil">
                                <h1 class="product-title">Visitor Chairs</h1>
                                <p>“They are have a perfect touch for make something so professional ,interest and useful for a lot of people .”</p>
                                <ul>
                                    <li><strong>Lorem Ipsum</strong><br /> Sometimes features Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                    <li><strong>Lorem Ipsum</strong><br /> Sometimes features Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                </ul>
                            </div>
                        </div>
                    </div >
                    <div className="row mb-6" style={{ alignItems: 'center' }}>
                        <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                            <div className="product-details sub-cat-deatil">
                                <h1 class="product-title">Our Collections</h1>
                                <p>Get the latest items immediately with promo prices</p>
                                <ALink href={"#"} className="btn btn-dark btn-outline-darker">
                                    <span>Check All </span>
                                    <i className="icon-long-arrow-right"></i>
                                </ALink>
                            </div>
                        </div>
                        <div className={`col-lg-9 col-sm-6 col-xs-12`}>
                            <div className="row">
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/collection01.png" />
                                        <h6 className="text-center">Freedom Humanscale</h6>
                                    </div>
                                </div>
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/collection02.png" />
                                        <h6 className="text-center">Freedom Humanscale</h6>
                                    </div>
                                </div>
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/collection03.png" />
                                        <h6 className="text-center">Numex Comfort</h6>
                                    </div>
                                </div>
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/collection04.png" />
                                        <h6 className="text-center">Numex Comfort</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-6" style={{ alignItems: 'center' }}>
                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                            <div className="sub-cat-featured-img">
                                <img src="images/category/Multi-Functional-Chairs.png" />
                            </div>
                        </div>
                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                            <div className="product-details sub-cat-deatil">
                                <h1 class="product-title">Multi-Functional Chairs</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                                <ul>
                                    <li><strong>Lorem Ipsum</strong><br /> Sometimes features Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                    <li><strong>Lorem Ipsum</strong><br /> Sometimes features Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                </ul>
                            </div>
                        </div>
                    </div >
                    <div className="row mb-6" style={{ alignItems: 'center' }}>
                        <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                            <div className="product-details sub-cat-deatil">
                                <h1 class="product-title">Our Collections</h1>
                                <p>Get the latest items immediately with promo prices</p>
                                <ALink href={"#"} className="btn btn-dark btn-outline-darker">
                                    <span>Check All </span>
                                    <i className="icon-long-arrow-right"></i>
                                </ALink>
                            </div>
                        </div>
                        <div className={`col-lg-9 col-sm-6 col-xs-12`}>
                            <div className="row">
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/Multi-Functional-Chairs-collection01.png" />
                                        <h6 className="text-center">Freedom Humanscale</h6>
                                    </div>
                                </div>
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/Multi-Functional-Chairs-collection02.png" />
                                        <h6 className="text-center">Freedom Humanscale</h6>
                                    </div>
                                </div>
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/Multi-Functional-Chairs-collection03.png" />
                                        <h6 className="text-center">Numex Comfort</h6>
                                    </div>
                                </div>
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/Multi-Functional-Chairs-collection04.png" />
                                        <h6 className="text-center">Numex Comfort</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-6" style={{ alignItems: 'center' }}>
                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                            <div className="sub-cat-featured-img">
                                <img src="images/category/Insert-Image-Here.png" />
                            </div>
                        </div>
                        <div className={`col-lg-6 col-sm-6 col-xs-12`}>
                            <div className="product-details sub-cat-deatil">
                                <h1 class="product-title">Stools</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                                <ul>
                                    <li><strong>Lorem Ipsum</strong><br /> Sometimes features Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                    <li><strong>Lorem Ipsum</strong><br /> Sometimes features Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                </ul>
                            </div>
                        </div>
                    </div >
                    <div className="row mb-6" style={{ alignItems: 'center' }}>
                        <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                            <div className="product-details sub-cat-deatil">
                                <h1 class="product-title">Our Collections</h1>
                                <p>Get the latest items immediately with promo prices</p>
                                <ALink href={"#"} className="btn btn-dark btn-outline-darker">
                                    <span>Check All </span>
                                    <i className="icon-long-arrow-right"></i>
                                </ALink>
                            </div>
                        </div>
                        <div className={`col-lg-9 col-sm-6 col-xs-12`}>
                            <div className="row">
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/stool01.png" />
                                        <h6 className="text-center">Freedom Humanscale</h6>
                                    </div>
                                </div>
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/stool02.png" />
                                        <h6 className="text-center">Freedom Humanscale</h6>
                                    </div>
                                </div>
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/stool03.png" />
                                        <h6 className="text-center">Numex Comfort</h6>
                                    </div>
                                </div>
                                <div className={`col-lg-3 col-sm-6 col-xs-12`}>
                                    <div className="sub-cat-product-img">
                                        <img src="images/category/products/stool04.png" />
                                        <h6 className="text-center">Numex Comfort</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div >
            </div >
        </main >
    )
}

export default withApollo({ ssr: typeof window == 'undefined' })(ProductSubCatInner);