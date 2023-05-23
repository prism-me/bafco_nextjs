import Modal from "react-modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import React, { useState, useEffect } from "react";
import { API } from "~/http/API";
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
  const { productId } = props;

  const [ModalData, setModalData] = useState();

  useEffect(() => {
    if (productId) {
      API.get(`/finishes-filter-detail/${productId}`)
        .then((response) => {
          setModalData(response?.data);
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
            <div className={`row skel-pro-single skel-quickview mb-0 loaded`}>
              <div className="col-lg-6 p-0">
                <div className="fabricImgWrape">
                  <figure>
                    <LazyLoadImage
                      alt="Thumbnail"
                      src={ModalData?.detailData?.featured_img}
                      width="100%"
                      height={100}
                      className="d-block"
                    />
                  </figure>
                </div>
              </div>
              <div className="col-lg-6 quickview-desc pl-lg-4 pr-0 mt-3 mt-lg-0">
                <div className="product-summary pr-4">
                  <div className="mb-5">
                    {ModalData?.detailData?.values?.name && (
                      <h3 className="mb-3">
                        {ModalData?.detailData?.values?.name}
                      </h3>
                    )}

                    {ModalData?.material?.name && (
                      <>
                        <p className="title">Material</p>
                        <p className="subtitle">{ModalData?.material?.name}</p>
                      </>
                    )}

                    {ModalData?.detailData?.title && (
                      <>
                        <p className="title">Collection</p>
                        <p className="subtitle">
                          {ModalData?.detailData?.title}
                        </p>
                      </>
                    )}

                    {ModalData?.detailData?.color_code && (
                      <>
                        <p className="title">Color</p>
                        <ALink
                          href="#"
                          style={{
                            backgroundColor: `${ModalData?.detailData?.color_code}`,
                          }}
                          scroll={false}
                          className="colorStyle"
                        >
                          <span className="sr-only">Color Name</span>
                        </ALink>
                      </>
                    )}

                    {ModalData?.detailData?.values?.parent?.name && (
                      <>
                        <p className="title">Finish</p>
                        <p className="subtitle">
                          {ModalData?.detailData?.values?.parent?.name}
                        </p>
                      </>
                    )}
                  </div>
                  <button
                    className="btn btn-sm btn-minwidth btn-outline-primary-2"
                    onClick={() =>
                      downloadImg(ModalData?.detailData?.featured_img)
                    }
                  >
                    <span>Download</span>
                    <i className="icon-arrow-down"></i>
                  </button>
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

export default FabricModal;
