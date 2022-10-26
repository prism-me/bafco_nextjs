import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import StickyBox from 'react-sticky-box';
import { API } from '~/http/API';
import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
import ShopListTwo from '~/components/partials/shop/list/shop-list-two';
import Pagination from '~/components/features/pagination';
import withApollo from '~/server/apollo';
import { scrollToPageContent } from '~/utils';
import InputRange from 'react-input-range';
import SlideToggle from 'react-slide-toggle';
import 'react-input-range/lib/css/index.css';
import { shopData } from '~/utils/data';
import Tooltip from "react-simple-tooltip";
import Helmet from "react-helmet";

function ShopGrid() {
    const router = useRouter();
    const query = router.query;
    const currentPageRoute = query?.sub_category;
    const [firstLoading, setFirstLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [perPage, setPerPage] = useState(12);
    const [pageTitle, setPageTitle] = useState("");
    const [pageBanner, setPageBanner] = useState("");
    const [pageSEODetails, setPageSEODetails] = useState("");
    const [toggle, setToggle] = useState(false);
    const [products, setProducts] = useState();
    const categoryslug = query?.category?.split("-");
    const categoryName = categoryslug?.map((item) => item + " ");
    const [subCategoryDetails, setsubCategoryDetails] = useState();
    // const [totalCount, setTotalCount] = useState();
    const totalCount = products && products?.length;
    const [totalProducts, setTotalProducts] = useState()
    const [filterBrandValues, setFilterBrandValues] = useState();
    const [filterColorValues, setFilterColorValues] = useState();
    const [filterCategoryList, setFilterCategoryList] = useState();
    const [filterByValue, setFilterByValue] = useState();
    const [priceRange, setRange] = useState({ min: 0, max: 90000 });
    const [brandValue, setBrandValue] = useState([]);
    const [colorValue, setColorValue] = useState([]);
    const [sortBy, setSortBy] = useState("all");

    useEffect(() => {

        // setPageTitle(query?.sub_category);

        API.get(`/front-products/${currentPageRoute}`).then((response) => {
            // setProducts(response?.data?.products);
            setProducts(response?.data?.products?.sort((a, b) => a.currentIndex - b.currentIndex));
            setPageTitle(response?.data?.name);
            setPageBanner(response?.data?.banner_image);
            setPageSEODetails(response?.data?.seo);
            // setTotalCount(response?.data?.products?.length)
            setTotalProducts(response?.data?.products?.length);
        }).catch((err) => {
            console.log(err);
        });

        API.get(`/category-filters-list/${currentPageRoute}`).then((response) => {
            setFilterCategoryList(response?.data?.categories);
            setFilterColorValues(response?.data?.variations?.reduce((acc, curr) =>
                acc.find((v) => v?.value_name === curr?.value_name) ? acc : [...acc, curr],
                []));
            setFilterBrandValues(response?.data?.brands?.reduce((acc, curr) =>
                acc.find((v) => v?.brand === curr?.brand) ? acc : [...acc, curr],
                [])
            );
        }).catch((err) => {
            console.log(err);
        });

    }, [query])

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
        scrollToPageContent();
    }, [query, perPage])

    useEffect(() => {
        if (products) setFirstLoading(true);
    }, [products])

    function onSortByChange(e) {

        setLoading(true);
        let sortByProductList = [];

        if (e.target.value == "low_to_high") {

            sortByProductList = products?.sort((el1, el2) => el1?.productvariations?.upper_price?.localeCompare(el2?.productvariations?.upper_price, undefined, { numeric: true }));

            setProducts([...sortByProductList]);
            setLoading(false);

        } else if (e.target.value === "high_to_low") {

            sortByProductList = products?.sort((el1, el2) => el2?.productvariations?.upper_price?.localeCompare(el1?.productvariations?.upper_price, undefined, { numeric: true }));

            setProducts([...sortByProductList]);
            setLoading(false);

        } else if (e.target.value === "stocking") {

            console.log("in_stock :: ", products?.filter(v => v?.productvariations?.in_stock === 1))

            sortByProductList = products?.filter(v => v?.productvariations?.in_stock === 1);

            setProducts([...sortByProductList]);
            setLoading(false);

        } else {

            let formdata = {
                "brand": brandValue,
                "min": priceRange.min,
                "max": priceRange.max,
                "route": currentPageRoute,
                "color": colorValue
            };

            API.post(`/category-list-filteration`, formdata).then((response) => {
                setProducts(response?.data?.sort((a, b) => a.currentIndex - b.currentIndex))
                setLoading(false);
            }).catch((err) => {
                console.log(err);
            });

        }

        setSortBy(e.target.value);

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

    const onAttrClick = (event, type) => {
        setLoading(true);
        var updatedList = [...brandValue];
        if (event.target.checked) {
            updatedList = [...brandValue, event.target.value];
        } else {
            updatedList.splice(brandValue.indexOf(event.target.value), 1);
        }
        setBrandValue(updatedList);

        let formdata = {
            "brand": updatedList,
            "min": priceRange.min,
            "max": priceRange.max,
            "route": currentPageRoute,
            "color": colorValue
        };

        API.post(`/category-list-filteration`, formdata).then((response) => {
            setProducts(response?.data?.sort((a, b) => a.currentIndex - b.currentIndex))
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        });
    }

    const handelColor = (e, item) => {

        e.preventDefault();

        setLoading(true);

        var updatedList = [...colorValue];

        if (colorValue?.find((v => v === item.value_id))) {
            updatedList.splice(colorValue.indexOf(item.value_id), 1);
        } else {
            updatedList = [...colorValue, item?.value_id];
        }
        setColorValue(updatedList);

        let formdata = {
            "brand": brandValue,
            "min": priceRange.min,
            "max": priceRange.max,
            "route": currentPageRoute,
            "color": updatedList
        };

        API.post(`/category-list-filteration`, formdata).then((response) => {
            setProducts(response?.data?.sort((a, b) => a.currentIndex - b.currentIndex));
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        });

    }

    function onChangePriceRange(value) {

        setLoading(true);
        setRange(value);

        let formdata = {
            "brand": brandValue,
            "min": value.min,
            "max": value.max,
            "route": currentPageRoute,
            "color": colorValue
        };

        API.post(`/category-list-filteration`, formdata).then((response) => {
            setProducts(response?.data?.sort((a, b) => a.currentIndex - b.currentIndex))
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        });
    }

    function handelSelectFilter() {

        setRange({ min: 0, max: 90000 });
        setBrandValue([]);
        setColorValue([]);

        API.get(`/front-products/${currentPageRoute}`).then((response) => {
            setProducts(response?.data?.products?.sort((a, b) => a.currentIndex - b.currentIndex));
            setPageTitle(response?.data?.name);
            setPageBanner(response?.data?.banner_image);
            setPageSEODetails(response?.data?.seo);
            // setTotalCount(response?.data?.products?.length)
            setTotalProducts(response?.data?.products?.length);
        }).catch((err) => {
            console.log(err);
        });

    }

    function containsAttrInUrl(type, value) {
        const currentQueries = query[type] ? query[type].split(',') : [];
        return currentQueries && currentQueries.includes(value);
    }

    function getUrlForAttrs(type, value) {
        let currentQueries = query[type] ? query[type].split(',') : [];
        currentQueries = containsAttrInUrl(type, value) ? currentQueries.filter(item => item !== value) : [...currentQueries, value];

        return {
            pathname: router.pathname,
            query: {
                ...query,
                page: 1,
                [type]: currentQueries.join(',')
            }
        }
    }


    return (
        <main className="main shop">
            <Helmet>
                <title>{pageSEODetails?.meta_title}</title>
                <meta name="description" content={`${pageSEODetails?.meta_description}`} />
            </Helmet>
            <PageHeader
                title={pageTitle}
                subTitle=""
                backgroundImage={pageBanner === "" || pageBanner === null ? "images/banners/cat_banner.png" : pageBanner}
                buttonText=""
                buttonUrl="#"
            />
            <nav className="breadcrumb-nav mb-2">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item"><ALink href={`/collections/${query?.category}`}>{categoryName}</ALink></li>
                        <li className="breadcrumb-item active">{pageTitle}</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <div className="row skeleton-body">
                        <div className={`col-lg-9 skel-shop-products`}>
                            <div className="toolbox">
                                <div className="toolbox-left">
                                    {products ?
                                        <div className="toolbox-info">
                                            Showing <span> {totalProducts} of {totalCount}</span> Products
                                        </div>
                                        : ""
                                    }
                                </div>

                                <div className="toolbox-right">
                                    <div className="toolbox-sort">
                                        <label htmlFor="sortby">Sort by:</label>
                                        <div className="select-custom">
                                            <select
                                                name="sortby"
                                                id="sortby"
                                                className="form-control"
                                                onChange={onSortByChange}
                                                value={sortBy}
                                            >
                                                <option value="all">All</option>
                                                <option value="stocking">Stocking</option>
                                                <option value="low_to_high">Price : Low To High</option>
                                                <option value="high_to_low">Price : High To Low</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div >

                            <ShopListTwo
                                products={products}
                                perPage={perPage}
                                loading={loading}
                            />
                            {/* {totalCount > perPage ?
                                <Pagination perPage={perPage} total={totalCount}></Pagination>
                                : ""
                            } */}
                        </div >

                        <aside className={`col-lg-3 skel-shop-sidebar order-lg-first skeleton-body ${(firstLoading) ? 'loaded' : ''}`}>
                            <div className="skel-widget"></div>
                            <div className="skel-widget"></div>
                            <div className="skel-widget"></div>
                            <div className="skel-widget"></div>
                            <StickyBox className="sticky-content" offsetTop={70}>
                                <aside className={`${toggle ? 'sidebar-filter' : 'sidebar'} sidebar-shop`}>
                                    <div className={toggle ? 'sidebar-filter-wrapper' : ''}>
                                        <div className="widget widget-clean">
                                            <label>Filters:</label>

                                            <button
                                                onClick={handelSelectFilter}
                                                className="pr-2 sidebar-filter-clear"
                                                style={{ color: '#008482', fontWeight: 'bold' }}
                                                scroll={false}>Reset</button>
                                        </div>

                                        <SlideToggle collapsed={false}>
                                            {({ onToggle, setCollapsibleElement, toggleState }) => (
                                                <div className="widget widget-collapsible">
                                                    <h3 className="widget-title mb-2">
                                                        <a href="#category" className={`${toggleState.toLowerCase() == 'collapsed' ? 'collapsed' : ''}`} onClick={(e) => { onToggle(e); e.preventDefault() }}>Category</a>
                                                    </h3>

                                                    <div ref={setCollapsibleElement}>
                                                        <div className="widget-body pt-0">
                                                            <div className="filter-items filter-items-count">
                                                                {filterCategoryList?.map((item, index) =>
                                                                    <div className="filter-item" key={`cat_${index}`}>
                                                                        <ALink
                                                                            className={`${currentPageRoute == item.route ? 'active' : ''}`}
                                                                            href={`/collections/${query?.category}/${item?.route}`}
                                                                            scroll={false}
                                                                        >{item?.name}
                                                                        </ALink>
                                                                        <span className="item-count">{item?.products_count}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </SlideToggle>

                                        <SlideToggle collapsed={false}>
                                            {
                                                ({ onToggle, setCollapsibleElement, toggleState }) => (
                                                    <div className="widget widget-collapsible widget-color">
                                                        <h3 className="widget-title mb-2">
                                                            <a href="#colour" className={`${toggleState.toLowerCase() == 'collapsed' ? 'collapsed' : ''}`} onClick={(e) => { onToggle(e); e.preventDefault() }}>Colour</a>
                                                        </h3>
                                                        <div ref={setCollapsibleElement}>
                                                            <div className="widget-body pt-0">
                                                                <div className="filter-colors">
                                                                    {filterColorValues?.map((item, index) => (
                                                                        item?.value_type !== "3" ?
                                                                            <Tooltip
                                                                                className="stocking_massage"
                                                                                content={item?.value_name}
                                                                            >
                                                                                <a
                                                                                    href={item?.value_id}
                                                                                    className={colorValue?.find(v => v === item?.value_id) ? 'selected' : ''}
                                                                                    style={{ backgroundColor: item?.value_type_variation }}
                                                                                    key={index}
                                                                                    onClick={e => handelColor(e, item)}
                                                                                >
                                                                                    <span className="sr-only">Color Name</span>
                                                                                </a></Tooltip> :
                                                                            <Tooltip
                                                                                className="stocking_massage"
                                                                                content={item?.value_name}
                                                                            >
                                                                                <a
                                                                                    href={item?.value_id}
                                                                                    className={colorValue?.find(v => v === item?.value_id) ? 'selected' : ''}
                                                                                    style={{ backgroundImage: `url(${item?.value_type_variation})` }}
                                                                                    key={index}
                                                                                    onClick={e => handelColor(e, item)}
                                                                                >
                                                                                    <span className="sr-only">Color Name</span>
                                                                                </a>
                                                                            </Tooltip>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </SlideToggle>

                                        <SlideToggle collapsed={false}>
                                            {({ onToggle, setCollapsibleElement, toggleState }) => (
                                                <div className="widget widget-collapsible">
                                                    <h3 className="widget-title mb-2">
                                                        <a
                                                            href="#brand"
                                                            className={`${toggleState.toLowerCase() == 'collapsed' ? 'collapsed' : ''}`}
                                                            onClick={(e) => { onToggle(e); e.preventDefault() }}
                                                        >Brand</a>
                                                    </h3>
                                                    <div ref={setCollapsibleElement}>
                                                        <div className="widget-body pt-0">
                                                            <div className="filter-items">
                                                                {filterBrandValues?.map((item, index) => (
                                                                    <div className="filter-item" key={index}>
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input type="checkbox"
                                                                                className="custom-control-input"
                                                                                id={`brand-${index + 1}`}
                                                                                value={item.brand}
                                                                                onChange={e => onAttrClick(e, "Brand")}
                                                                            // checked={containsAttrInUrl('brand', item.brand) ? true : false}
                                                                            />
                                                                            <label className="custom-control-label" htmlFor={`brand-${index + 1}`}>{item.brand}</label>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </SlideToggle>

                                        <SlideToggle collapsed={false}>
                                            {({ onToggle, setCollapsibleElement, toggleState }) => (
                                                <div className="widget widget-collapsible">
                                                    <h3 className="widget-title mb-2">
                                                        <a href="#"
                                                            className={`${toggleState.toLowerCase() == 'collapsed' ? 'collapsed' : ''}`}
                                                            onClick={(e) => { onToggle(e); e.preventDefault() }}
                                                        >Price</a>
                                                    </h3>

                                                    <div ref={setCollapsibleElement}>
                                                        <div className="widget-body pt-0">
                                                            <div className="filter-price">
                                                                <div className="filter-price-text d-flex justify-content-between">
                                                                    <span>
                                                                        Price Range:&nbsp;
                                                                        <span className="filter-price-range">AED {priceRange.min} - AED {priceRange.max?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                                                    </span>
                                                                </div>

                                                                <div className="price-slider">
                                                                    <InputRange
                                                                        formatLabel={value => `${value}`}
                                                                        maxValue={90000}
                                                                        minValue={0}
                                                                        step={50}
                                                                        value={priceRange}
                                                                        // onChange={onChangePriceRange}
                                                                        onChange={value => setRange(value)}
                                                                        onChangeComplete={onChangePriceRange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            {/* <div className="filter-items">
                                                                <div className="filter-item">
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input type="checkbox"
                                                                            className="custom-control-input"
                                                                            id={`price-1`}
                                                                            value="200"
                                                                            name="price"
                                                                            // onChange={e => onAttrClick(e, "Brand")}
                                                                        />
                                                                        <label className="custom-control-label" htmlFor={`price-1`}>Under AED 200</label>
                                                                    </div>
                                                                </div>
                                                                <div className="filter-item">
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input type="checkbox"
                                                                            className="custom-control-input"
                                                                            id={`price-2`}
                                                                            value="200"
                                                                            name="price"
                                                                            // onChange={e => onAttrClick(e, "Brand")}
                                                                        />
                                                                        <label className="custom-control-label" htmlFor={`price-2`}>AED 500 - AED 1000</label>
                                                                    </div>
                                                                </div>
                                                                <div className="filter-item">
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input type="checkbox"
                                                                            className="custom-control-input"
                                                                            id={`price-3`}
                                                                            value="200"
                                                                            name="price"
                                                                            // onChange={e => onAttrClick(e, "Brand")}
                                                                        />
                                                                        <label className="custom-control-label" htmlFor={`price-3`}>AED 1000 - AED 5000</label>
                                                                    </div>
                                                                </div>
                                                                <div className="filter-item">
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input type="checkbox"
                                                                            className="custom-control-input"
                                                                            id={`price-4`}
                                                                            value="200"
                                                                            name="price"
                                                                            // onChange={e => onAttrClick(e, "Brand")}
                                                                        />
                                                                        <label className="custom-control-label" htmlFor={`price-4`}>AED 5000 - AED 10000</label>
                                                                    </div>
                                                                </div>
                                                                <div className="filter-item">
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input type="checkbox"
                                                                            className="custom-control-input"
                                                                            id={`price-5`}
                                                                            value="200"
                                                                            name="price"
                                                                            // onChange={e => onAttrClick(e, "Brand")}
                                                                        />
                                                                        <label className="custom-control-label" htmlFor={`price-5`}>Over AED 10000</label>
                                                                    </div>
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </SlideToggle>
                                    </div>
                                </aside>

                            </StickyBox>
                            {
                                toggle ?
                                    <button className="sidebar-fixed-toggler" onClick={toggleSidebar}>
                                        <i className="icon-cog"></i>
                                    </button>
                                    : ''
                            }
                            <div className="sidebar-filter-overlay" onClick={hideSidebar}></div>
                        </aside >
                    </div >
                </div >
            </div >
        </main >
    )
}

export default withApollo({ ssr: typeof window == 'undefined' })(ShopGrid);