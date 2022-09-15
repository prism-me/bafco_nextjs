import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
// import ALink from "~/components/features/alink";
import { saveAs } from "file-saver";

function FabricTopBar(props) {
  const router = useRouter();
  // const type = router.query.type;
  const { categoryList, selectedCategory, setSelectedCategory, setMatId } =
    props;

  useEffect(() => {
    if (categoryList.length > 0) {
      setMatId(categoryList[0].id);
      setSelectedCategory(categoryList[0].name);
    }
  }, [categoryList.length]);

  const downloadImg = (downloadImg) => {
    if (downloadImg) {
      saveAs(downloadImg, "image.jpg");
    }
  };
  return (
    <>
      <div className="fabric-top-bar mb-5">
        <div className="btnWrapper">
          {categoryList?.length > 0 &&
            categoryList.map((item, index) => (
              <button
                className={`btn btn-sm btn-minwidth btn-outline-primary-2 mr-2 ${
                  selectedCategory === `${item.name}` ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(`${item.name}`);
                  setMatId(`${item.id}`);
                }}
              >
                <span>{item.name}</span>
              </button>
            ))}
          <button
            className="btn btn-sm btn-minwidth btn-outline-primary-2 downloadbtn"
            onClick={() =>
              downloadImg("http://www.africau.edu/images/default/sample.pdf")
            }
          >
            <i className="icon-arrow-down"></i>
            <span>Download Collections</span>
          </button>
        </div>
        <div className="toolbox mb-0">
          <div className="toolbox-right">
            <div className="toolbox-sort">
              <label htmlFor="sortby" className="mr-0">
                Laminate Card
              </label>
            </div>
            {/* <div className="toolbox-layout">
              <ALink
                href=""
                className={`btn-layout ${type == "4cols" ? "active" : ""}`}
                scroll={false}
              >
                <svg width="22" height="10">
                  <rect x="0" y="0" width="4" height="4" />
                  <rect x="6" y="0" width="4" height="4" />
                  <rect x="12" y="0" width="4" height="4" />
                  <rect x="18" y="0" width="4" height="4" />
                  <rect x="0" y="6" width="4" height="4" />
                  <rect x="6" y="6" width="4" height="4" />
                  <rect x="12" y="6" width="4" height="4" />
                  <rect x="18" y="6" width="4" height="4" />
                </svg>
              </ALink>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(FabricTopBar);
