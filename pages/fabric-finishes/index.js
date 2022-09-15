import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import StickyBox from "react-sticky-box";
import ALink from "~/components/features/alink";
import FabricListOne from "~/pages/fabric-finishes/list/fabric-list-one";
// import Pagination from "~/components/features/pagination";
import FabricSidebarOne from "~/pages/fabric-finishes/sidebar/fabric-sidebar-one";
import withApollo from "~/server/apollo";
import { GET_PRODUCTS } from "~/server/queries";
import { scrollToPageContent } from "~/utils";
import FabricTopBar from "./FabricTopBar";
import { API } from "~/http/API";

function FabricGrid() {
  const router = useRouter();
  //   const type = router.query.type;
  const type = "4cols";
  const query = router.query;
  const [getProducts, { data, loading, error }] = useLazyQuery(GET_PRODUCTS);
  const [firstLoading, setFirstLoading] = useState(false);
  const [perPage, setPerPage] = useState(5);
  const [pageTitle, setPageTitle] = useState("4cols");
  const [toggle, setToggle] = useState(false);
  const products = data && data.products.data;
  const totalCount = data && data.products.totalCount;

  const [fabricList, setFabricList] = useState();
  const [filterList, setFilterList] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryList, setCategoryList] = useState("");

  const [matId, setMatId] = useState("");

  // console.log("matId::", matId);
  // console.log("tab::", selectedCategory);

  // console.log(
  //   "Leather::",
  //   fabricList?.child_value[0]?.child?.filter(
  //     (item) => item.value.material_id === matId
  //   )
  // );

  useEffect(() => {
    if ((query?.collection || query?.color || query?.finishes) && matId) {
      let formdata = {
        finishes_id:
          Number(query?.collection) ||
          Number(query?.color) ||
          Number(query?.finishes),
        material_id: matId,
      };
      API.post(`/finishes-filter-data`, formdata)
        .then((response) => {
          setFabricList(response?.data?.finishesData[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [query, matId]);

  useEffect(() => {
    API.get(`/material-list`)
      .then((response) => {
        setCategoryList(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    API.get(`/finishes-filter-list/${selectedCategory}`)
      .then((response) => {
        // debugger;
        setFabricList(response?.data?.finishesData[0]);
        setFilterList(response?.data?.finishesList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedCategory]);

  useEffect(() => {
    window.addEventListener("resize", resizeHandle);
    resizeHandle();
    return () => {
      window.removeEventListener("resize", resizeHandle);
    };
  }, []);

  function resizeHandle() {
    if (document.querySelector("body").offsetWidth < 992) setToggle(true);
    else setToggle(false);
  }

  useEffect(() => {
    getProducts({
      variables: {
        searchTerm: query.searchTerm,
        color: query.color ? query.color.split(",") : [],
        size: query.size ? query.size.split(",") : [],
        brand: query.brand ? query.brand.split(",") : [],
        minPrice: parseInt(query.minPrice),
        maxPrice: parseInt(query.maxPrice),
        category: query.category,
        sortBy: query.sortBy ? query.sortBy : "default",
        page: query.page ? parseInt(query.page) : 1,
        perPage: perPage,
        list: true,
      },
    });

    scrollToPageContent();
  }, [query, perPage]);

  useEffect(() => {
    if (products) setFirstLoading(true);
  }, [products]);

  useEffect(() => {
    if (type == "list") {
      setPageTitle("List");
      setPerPage(5);
    } else if (type == "2cols") {
      setPageTitle("Grid 2 Columns");
      setPerPage(6);
    } else if (type == "3cols") {
      setPageTitle("Grid 3 Columns");
      setPerPage(9);
    } else if (type == "4cols") {
      setPageTitle("Grid 4 Columns");
      setPerPage(12);
    }
  }, [type]);

  function onSortByChange(e) {
    let queryObject = router.query;
    let url = router.pathname.replace("[type]", query.type) + "?";
    for (let key in queryObject) {
      if (key !== "type" && key !== "sortBy") {
        url += key + "=" + queryObject[key] + "&";
      }
    }

    router.push(url + "sortBy=" + e.target.value);
  }

  function toggleSidebar() {
    if (
      document.querySelector("body").classList.contains("sidebar-filter-active")
    ) {
      document.querySelector("body").classList.remove("sidebar-filter-active");
    } else {
      document.querySelector("body").classList.add("sidebar-filter-active");
    }
  }

  function hideSidebar() {
    document.querySelector("body").classList.remove("sidebar-filter-active");
  }

  if (error) {
    return <div></div>;
  }

  return (
    <main className="main shop fabric-finishes-page">
      <nav className="breadcrumb-nav mb-2">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item active">Fabric & Finishes</li>
            {query.search ? (
              <li className="breadcrumb-item">
                <span>Search - {query.searchTerm}</span>
              </li>
            ) : (
              ""
            )}
          </ol>
        </div>
      </nav>

      <div className="page-content">
        <div className="container">
          <FabricTopBar
            categoryList={categoryList}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setMatId={setMatId}
          />
          <div className="row skeleton-body">
            <div
              className={`col-lg-9 skel-shop-products ${
                !loading ? "loaded" : ""
              }`}
            >
              <FabricListOne
                products={fabricList}
                perPage={perPage}
                loading={loading}
                matId={matId}
              ></FabricListOne>

              {/* {totalCount > perPage ? (
                <Pagination perPage={perPage} total={totalCount}></Pagination>
              ) : (
                ""
              )} */}
            </div>

            <aside
              className={`col-lg-3 skel-shop-sidebar order-lg-first skeleton-body ${
                !loading || firstLoading ? "loaded" : ""
              }`}
            >
              <div className="skel-widget"></div>
              <div className="skel-widget"></div>
              <div className="skel-widget"></div>
              <div className="skel-widget"></div>
              <StickyBox className="sticky-content" offsetTop={70}>
                <FabricSidebarOne
                  toggle={toggle}
                  filterData={filterList}
                  matId={matId}
                ></FabricSidebarOne>
              </StickyBox>
              {toggle ? (
                <button
                  className="sidebar-fixed-toggler"
                  onClick={toggleSidebar}
                >
                  <i className="icon-cog"></i>
                </button>
              ) : (
                ""
              )}
              <div
                className="sidebar-filter-overlay"
                onClick={hideSidebar}
              ></div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

export default withApollo({ ssr: typeof window == "undefined" })(FabricGrid);
