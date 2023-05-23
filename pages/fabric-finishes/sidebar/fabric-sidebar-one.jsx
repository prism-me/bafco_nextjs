import React from "react";
import { useRouter } from "next/router";
import SlideToggle from "react-slide-toggle";
import ALink from "~/components/features/alink";

function FabricSidebarOne(props) {
  const { filterData = [], matId } = props;
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

  const uniqueColors = [];
  filterData
    ?.filter((x) => x?.name == "Finishes")[0]
    ?.child_value[0]?.child?.filter((item) => item?.value?.material_id == matId)
    ?.map((item) => {
      var findItem = uniqueColors.find(
        (x) => x?.value?.color_code === item?.value?.color_code
      );
      if (!findItem) uniqueColors.push(item);
    });

  const uniqueFinishes = [];
  filterData
    ?.filter((x) => x?.name == "Finishes")[0]
    ?.child_value?.filter((item) => item?.value?.material_id == matId)
    ?.map((item) => {
      var findItem = uniqueFinishes?.find((x) => x?.name === item?.name);
      if (!findItem) uniqueFinishes?.push(item);
    });

  return (
    <>
      <SlideToggle collapsed={true}>
        {({ onToggle, setCollapsibleElement, toggleState }) => (
          <div className="widget widget-collapsible mb-2">
            <h3 className="widget-title mb-2">
              <a
                href="#colour"
                className={`${
                  toggleState.toLowerCase() == "collapsed" ? "collapsed" : ""
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
                  {uniqueColors?.length > 0
                    ? uniqueColors?.map((item, index) => (
                        <ALink
                          className={`${
                            query?.color == item?.value?.color_code
                              ? "selected"
                              : ""
                          }`}
                          href={{
                            pathname: router.pathname,
                            query: {
                              color: item?.value?.color_code,
                            },
                          }}
                          style={{
                            backgroundColor: item?.value?.color_code,
                          }}
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
                  toggleState.toLowerCase() == "collapsed" ? "collapsed" : ""
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
                  {uniqueFinishes?.length > 0
                    ? uniqueFinishes?.map((item, index) => (
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
    </>
  );
}

export default React.memo(FabricSidebarOne);
