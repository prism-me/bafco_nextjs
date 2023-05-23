import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback } from "react";
import StickyBox from "react-sticky-box";
import ALink from "~/components/features/alink";
import FabricListOne from "~/pages/fabric-finishes/list/fabric-list-one";
import FabricSidebarOne from "~/pages/fabric-finishes/sidebar/fabric-sidebar-one";
import FabricTopBar from "./FabricTopBar";
import { API } from "~/http/API";
import Helmet from "react-helmet";

function FabricGrid() {
  const router = useRouter();
  const query = router.query;

  // finishes List data start

  const [fabricList, setFabricList] = useState();
  const [filterList, setFilterList] = useState();
  const [categoryList, setCategoryList] = useState("");

  // the parentState will be set by its child slider component
  const [selectedCategory, setSelectedCategory] = useState("");

  // make wrapper function to give child
  const wrappersetSelectedCategory = useCallback(
    (val) => {
      setSelectedCategory(val);
    },
    [setSelectedCategory]
  );

  // the parentState will be set by its child slider component
  const [matId, setMatId] = useState("");

  // make wrapper function to give child
  const wrappersetMatId = useCallback(
    (val) => {
      setMatId(val);
    },
    [setMatId]
  );

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
    if (selectedCategory) {
      API.get(`/finishes-filter-list/${selectedCategory}`)
        .then((response) => {
          setFabricList(response?.data?.finishesData[0]);
          setFilterList(response?.data?.finishesList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedCategory, matId]);
  // finishes List data end

  // filters data start

  useEffect(() => {
    if ((query?.color || query?.finishes) && matId) {
      let formdata = {
        color_code: query?.color,
        finishes_id: Number(query?.finishes),
        material_id: matId,
      };
      API.post(`/finishes-filter-data`, formdata)
        .then((response) => {
          if (query.color) {
            setFabricList(response?.data?.finishesData);
          } else {
            setFabricList(response?.data?.finishesData[0]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [query, matId]);

  // filters data End

  return (
    <main className="main shop fabric-finishes-page">
      <Helmet>
        <title>Fabric & Finishe</title>
        <meta name="description" content={`Fabric & Finishe`} />
      </Helmet>
      <nav className="breadcrumb-nav mb-2">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item active">Fabric & Finishes</li>
          </ol>
        </div>
      </nav>

      <div className="page-content">
        <div className="container">
          <FabricTopBar
            categoryList={categoryList}
            selectedCategory={selectedCategory}
            wrappersetSelectedCategory={wrappersetSelectedCategory}
            wrappersetMatId={wrappersetMatId}
          />
          <div className="row skeleton-body">
            <div className="col-lg-3 order-lg-first">
              <StickyBox offsetTop={75} offsetBottom={20}>
                <FabricSidebarOne
                  filterData={filterList}
                  matId={matId}
                ></FabricSidebarOne>
              </StickyBox>
            </div>
            <div className={`col-lg-9 skel-shop-products`}>
              <FabricListOne
                products={fabricList}
                matId={matId}
              ></FabricListOne>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default FabricGrid;
