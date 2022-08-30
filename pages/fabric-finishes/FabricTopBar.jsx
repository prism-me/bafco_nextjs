import { useRouter } from "next/router";
import React from "react";
import ALink from "~/components/features/alink";

function FabricTopBar(props) {
  const router = useRouter();
  const type = router.query.type;

  return (
    <>
      <div className="fabric-top-bar mb-5">
        <div className="btnWrapper">
          <button className="btn btn-sm btn-minwidth btn-outline-primary-2 active">
            <span>Leather</span>
          </button>
          <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
            <span>Fabric</span>
          </button>
          <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
            <span>Laminate</span>
          </button>
          <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
            <span>Veneer</span>
          </button>
          <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
            <span>Nanotec</span>
          </button>
          <button className="btn btn-sm btn-minwidth btn-outline-primary-2 downloadbtn">
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
