import React from "react";
import { useRouter } from "next/router";
import SlideToggle from "react-slide-toggle";
import ALink from "~/components/features/alink";

function FabricSidebarOne(props) {
  const { toggle = false, filterData = [], matId } = props;
  const router = useRouter();
  const query = useRouter().query;

  function onAttrClick(e, attr, value) {
    if ((attr, value)) {
      let att = attr;
      let val = value;
      let url =
        router.pathname.replace("[type]", query.type) + "?" + att + "=" + val;
      router.push(url);
    }
  }

  const collectionData = filterData
    ?.filter((x) => x?.name == "Brand")[0]
    ?.child_value?.filter((item) => item?.value?.material_id == matId);

  const colorsData = filterData
    ?.filter((x) => x?.name == "Color Range")[0]
    ?.child_value?.filter((item) => item?.value?.material_id == matId);

  const finishesData = filterData
    ?.filter((x) => x?.name == "Finishes")[0]
    ?.child_value?.filter((item) => item?.value?.material_id == matId);

  // const uniqueCollections = [];
  // filterData
  //   ?.filter((x) => x?.name == "Brand")[0]
  //   ?.child_value.map((item) => {
  //     var findItem = uniqueCollections.find((x) => x.name === item.name);
  //     if (!findItem) uniqueCollections.push(item);
  //   });

  // const uniqueColors = [];
  // filterData
  //   ?.filter((x) => x?.name == "Color Range")[0]
  //   ?.child_value.map((item) => {
  //     var findItem = uniqueColors.find((x) => x.name === item.name);
  //     if (!findItem) uniqueColors.push(item);
  //   });

  // const uniqueFinishes = [];
  // filterData
  //   ?.filter((x) => x?.name == "Finishes")[0]
  //   ?.child_value.map((item) => {
  //     var findItem = uniqueFinishes.find((x) => x.name === item.name);
  //     if (!findItem) uniqueFinishes.push(item);
  //   });

  return (
    <>
      <aside
        className={`${toggle ? "sidebar-filter" : "sidebar"} sidebar-shop`}
      >
        <div className={toggle ? "sidebar-filter-wrapper" : ""}>
          <SlideToggle collapsed={true}>
            {({ onToggle, setCollapsibleElement, toggleState }) => (
              <div className="widget widget-collapsible">
                <h3 className="widget-title mb-2">
                  <a
                    href="#collection"
                    className={`${
                      toggleState.toLowerCase() == "collapsed"
                        ? "collapsed"
                        : ""
                    }`}
                    onClick={(e) => {
                      onToggle(e);
                      e.preventDefault();
                    }}
                  >
                    Collection
                  </a>
                </h3>

                <div ref={setCollapsibleElement}>
                  <div className="widget-body pt-0">
                    <div className="filter-items filter-items-count">
                      {collectionData?.length > 0
                        ? collectionData?.map((item, index) => (
                            <div className="filter-item" key={`cat_${index}`}>
                              <ALink
                                className={`${
                                  query?.collection == item?.id ? "active" : ""
                                }`}
                                href={{
                                  pathname: router.pathname,
                                  query: {
                                    collection: item?.id,
                                  },
                                }}
                                scroll={false}
                              >
                                {item?.name}
                              </ALink>
                              {/* <span className="item-count">{item.count}</span> */}
                            </div>
                          ))
                        : "No Collection Found !!!"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SlideToggle>

          <SlideToggle collapsed={true}>
            {({ onToggle, setCollapsibleElement, toggleState }) => (
              <div className="widget widget-collapsible">
                <h3 className="widget-title mb-2">
                  <a
                    href="#colour"
                    className={`${
                      toggleState.toLowerCase() == "collapsed"
                        ? "collapsed"
                        : ""
                    }`}
                    onClick={(e) => {
                      onToggle(e);
                      e.preventDefault();
                    }}
                  >
                    Color Range
                  </a>
                </h3>
                <div ref={setCollapsibleElement}>
                  <div className="widget-body pt-0">
                    <div className="filter-colors">
                      {colorsData?.length > 0
                        ? colorsData?.map((item, index) => (
                            <ALink
                              className={`${
                                query?.color == item?.id ? "selected" : ""
                              }`}
                              href={{
                                pathname: router.pathname,
                                query: {
                                  color: item?.id,
                                },
                              }}
                              style={{ backgroundColor: item?.name }}
                              key={index}
                              scroll={false}
                            >
                              <span className="sr-only">Color Name</span>
                            </ALink>
                          ))
                        : "No Color Range Found !!!"}
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
                  <a
                    href="#finishes"
                    className={`${
                      toggleState.toLowerCase() == "collapsed"
                        ? "collapsed"
                        : ""
                    }`}
                    onClick={(e) => {
                      onToggle(e);
                      e.preventDefault();
                    }}
                  >
                    Finishes
                  </a>
                </h3>
                <div ref={setCollapsibleElement}>
                  <div className="widget-body pt-0">
                    <div className="filter-items">
                      {finishesData?.length > 0
                        ? finishesData?.map((item, index) => (
                            <div className="filter-item" key={index}>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id={`finishes-${index + 1}`}
                                  value={item?.id}
                                  onChange={(e) =>
                                    onAttrClick(e, "finishes", item?.id)
                                  }
                                  checked={
                                    query?.finishes == item?.id ? true : false
                                  }
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor={`finishes-${index + 1}`}
                                >
                                  {item?.name}
                                </label>
                              </div>
                            </div>
                          ))
                        : "No Finishes Found !!!"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SlideToggle>
        </div>
      </aside>
    </>
  );
}

export default React.memo(FabricSidebarOne);
