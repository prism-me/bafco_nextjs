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

function ShopGrid() {
    const router = useRouter();
    const query = router.query;
    const currentPageRoute = query?.sub_category;
    const [firstLoading, setFirstLoading] = useState(false);
    const [perPage, setPerPage] = useState(12);
    const [pageTitle, setPageTitle] = useState("");
    const [toggle, setToggle] = useState(false);
    const [products, setProducts] = useState();
    const [subCategoryDetails, setsubCategoryDetails] = useState();
    // const [totalCount, setTotalCount] = useState();
    const totalCount = products && products?.length;
    const [totalProducts, setTotalProducts] = useState()
    const [filterBrandValues, setFilterBrandValues] = useState();
    const [filterColorValues, setFilterColorValues] = useState();
    const [filterCategoryList, setFilterCategoryList] = useState();
    const [filterByValue, setFilterByValue] = useState();
    const [priceRange, setRange] = useState({ min: 0, max: 10000 });
    const [brandValue, setBrandValue] = useState([]);
    const [colorValue, setColorValue] = useState([]);

    useEffect(() => {

        // setPageTitle(query?.sub_category);

        API.get(`/front-products/${currentPageRoute}`).then((response) => {
            setProducts(response?.data?.products);
            setPageTitle(response?.data?.name);
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
            setFilterBrandValues(response?.data?.variations?.reduce((acc, curr) =>
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

    const onAttrClick = (event, type) => {

        var updatedList = [...brandValue];
        if (event.target.checked) {
            updatedList = [...brandValue, event.target.value];
        } else {
            updatedList.splice(brandValue.indexOf(event.target.value), 1);
        }
        setBrandValue(updatedList);
    }

    const handelColor = (e, item) => {

        e.preventDefault();

        var updatedList = [...colorValue];

        if (colorValue?.find((v => v === item.value_id))) {
            updatedList.splice(colorValue.indexOf(item.value_id), 1);
        } else {
            updatedList = [...colorValue, item?.value_id];
        }
        setColorValue(updatedList);

    }

    function onChangePriceRange(value) {
        setRange(value);
    }

    function handelSelectFilter() {

        let formdata = {
            "brand": brandValue,
            "min": priceRange.min,
            "max": priceRange.max,
            "route": currentPageRoute,
            "color": colorValue
        };

        API.post(`/category-list-filteration`, formdata).then((response) => {
            setProducts(response?.data)
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
            <PageHeader
                title={pageTitle}
                subTitle=""
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
                        <li className="breadcrumb-item"><ALink href={`/collections/${query?.category}`}>{query?.category}</ALink></li>
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
                                                value={query.sortBy ? query.sortBy : 'default'}
                                            >
                                                <option value="default">Default</option>
                                                <option value="featured">Most Popular</option>
                                                <option value="rating">Most Rated</option>
                                                <option value="new">Date</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div >

                            <ShopListTwo
                                products={products}
                                perPage={perPage}
                            // loading={loading}
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
                                                style={{ color: '#EE3124', fontWeight: 'bold' }}
                                                scroll={false}>Apply</button>
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
                                                    <div className="widget widget-collapsible">
                                                        <h3 className="widget-title mb-2"><a href="#colour" className={`${toggleState.toLowerCase() == 'collapsed' ? 'collapsed' : ''}`} onClick={(e) => { onToggle(e); e.preventDefault() }}>Colour</a></h3>
                                                        <div ref={setCollapsibleElement}>
                                                            <div className="widget-body pt-0">
                                                                <div className="filter-colors">
                                                                    {filterColorValues?.map((item, index) => (
                                                                        item?.value_type !== "3" ?
                                                                            <ALink
                                                                                href='#color'
                                                                                // className={containsAttrInUrl('color', item?.value_name) ? 'selected' : ''}
                                                                                style={{ backgroundColor: item?.value_type_variation }}
                                                                                key={index}
                                                                                onClick={e => handelColor(e, item)}
                                                                            >
                                                                                <span className="sr-only">Color Name</span>
                                                                            </ALink> :

                                                                            <a
                                                                                href={item?.value_id}
                                                                                // className={containsAttrInUrl('color', item?.value_name) ? 'selected' : ''}
                                                                                style={{ backgroundImage: `url(${item?.value_type_variation})` }}
                                                                                key={index}
                                                                                onClick={e => handelColor(e, item)}
                                                                            >
                                                                                <span className="sr-only">Color Name</span>
                                                                            </a>
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
                                                                        <span className="filter-price-range">Dhs{priceRange.min} - Dhs{priceRange.max}</span>
                                                                    </span>

                                                                    {/* <button
                                                                        onClick={handelSelectFilter}
                                                                        className="pr-2"
                                                                        style={{ color: '#EE3124' }}
                                                                        scroll={false}>Filter</button> */}
                                                                </div>

                                                                <div className="price-slider">
                                                                    <InputRange
                                                                        formatLabel={value => `${value}`}
                                                                        maxValue={10000}
                                                                        minValue={0}
                                                                        step={50}
                                                                        value={priceRange}
                                                                        onChange={onChangePriceRange}
                                                                    />
                                                                </div>
                                                            </div>
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