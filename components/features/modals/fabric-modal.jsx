import Modal from "react-modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import React, { useState, useEffect } from "react";
import { GET_PRODUCTS } from "~/server/queries";
import { useLazyQuery } from "@apollo/react-hooks";
import { API } from "~/http/API";
import withApollo from "~/server/apollo";
import ALink from "~/components/features/alink";
import { saveAs } from "file-saver";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(51,51,51,0.6)",
    zIndex: "9000",
  },
};

Modal.setAppElement("body");

function FabricModal(props) {
  const [{ loading }] = useLazyQuery(GET_PRODUCTS);

  const { productId } = props;

  const [ModalData, setModalData] = useState();

  useEffect(() => {
    if (productId) {
      API.get(`/finishes-filter-detail/${productId}`)
        .then((response) => {
          setModalData(response?.data?.detailData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [productId]);

  const downloadImg = (downloadImg) => {
    if (downloadImg) {
      saveAs(downloadImg, "image.jpg");
    }
  };

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
                          src={ModalData?.featured_img}
                          width="100%"
                          height={100}
                          className="d-block"
                          style={{ height: "400px" }}
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
                        <h3 className="mb-3">{ModalData?.title}</h3>

                        {ModalData?.values?.parent && (
                          <>
                            <p className="title">Type</p>
                            <p className="subtitle">
                              {ModalData?.values?.parent?.name}
                            </p>
                          </>
                        )}

                        {ModalData?.code && (
                          <>
                            <p className="title">Color Range</p>
                            {/* <p className="subtitle">{ModalData?.code}</p> */}
                            <ALink
                              href="#"
                              style={{ backgroundColor: "pink" }}
                              scroll={false}
                              className="colorStyle"
                            >
                              <span className="sr-only">Color Name</span>
                            </ALink>
                          </>
                        )}

                        {ModalData?.values && (
                          <>
                            <p className="title">Finish</p>
                            <p className="subtitle">
                              {ModalData?.values?.name}
                            </p>
                          </>
                        )}
                      </div>
                      <button
                        className="btn btn-sm btn-minwidth btn-outline-primary-2"
                        onClick={() => downloadImg(ModalData?.featured_img)}
                      >
                        <span>Download</span>
                        <i className="icon-arrow-down"></i>
                      </button>
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
