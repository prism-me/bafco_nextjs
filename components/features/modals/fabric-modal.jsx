import Modal from "react-modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import React, { useState, useEffect } from "react";
import DetailOne from "~/components/partials/product/details/detail-one";
import { GET_PRODUCTS } from "~/server/queries";
import { useLazyQuery } from "@apollo/react-hooks";

import withApollo from "~/server/apollo";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(51,51,51,0.6)",
    zIndex: "9000",
  },
};

Modal.setAppElement("body");

function FabricModal(props) {
  const [getProducts, { data, loading, error }] = useLazyQuery(GET_PRODUCTS);

  return (
    <>
      <Modal
        isOpen={props?.show}
        onRequestClose={props?.onHide}
        className="container quickView-container quickView-two fabric-modal"
        overlayClassName="d-flex align-items-center justify-content-center"
        shouldReturnFocusAfterClose={false}
        closeTimeoutMS={100}
        contentLabel="QuickView"
        style={customStyles}
        id="product-quickview"
      >
        <div className="modal-content">
          <div className="quickView-content skeleton-body">
            <div
              className={`row skel-pro-single skel-quickview mb-0 ${
                loading ? "" : "loaded"
              }`}
            >
              <div className="col-lg-6 p-0">
                {!loading ? (
                  <>
                    <div className="fabricImgWrape">
                      <figure className="mb-3">
                        <LazyLoadImage
                          alt="Thumbnail"
                          src={"images/fabric/fabric.png"}
                          width="100%"
                          height={100}
                          className="d-block"
                        />
                      </figure>
                      <center>
                        <button
                          className="btn btn-sm btn-minwidth btn-outline-primary-2"
                          onClick={() =>
                            window.open("images/fabric/fabric.png", "_blank")
                          }
                        >
                          <span>See the Full Panel</span>
                        </button>
                      </center>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-6 quickview-desc pl-lg-4 pr-0 mt-3 mt-lg-0">
                <div className="product-summary pr-4">
                  {!loading ? (
                    <>
                      <div className="mb-5">
                        <h3 className="mb-3">W-SD01 grey</h3>
                        <p className="title">Type</p>
                        <p className="subtitle">Leather</p>
                        <p className="title">Color Range</p>
                        <p className="subtitle mb-0">Lorem Ipsum</p>
                        <p className="subtitle">Lorem Ipsum</p>
                        <p className="title">Finish</p>
                        <p className="subtitle">Leather</p>
                      </div>
                      <a
                        href={
                          "http://www.africau.edu/images/default/sample.pdf"
                        }
                        without
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
                          <span>Download</span>
                          <i className="icon-arrow-down"></i>
                        </button>
                      </a>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          title="Close (Esc)"
          type="button"
          className="mfp-close"
          onClick={props?.onHide}
        >
          <span>×</span>
        </button>
      </Modal>
    </>
  );
}

export default withApollo({ ssr: typeof window == "undefined" })(FabricModal);
