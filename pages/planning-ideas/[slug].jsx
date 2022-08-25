import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ALink from "~/components/features/alink";
import withApollo from "~/server/apollo";
import { actions as demoAction } from "~/store/demo";
import OwlCarousel from "~/components/features/owl-carousel";
import { projectReferenceInnerSlider } from "~/utils/data";

const axios = require("axios");

function PlaningIdeasInner(props) {
  const slug = useRouter().query.slug;

  return (
    <div className="main planingIdeasInner-page">
      <nav className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink href="/planning-ideas/">Planning Ideas</ALink>
            </li>
            <li className="breadcrumb-item active">Planning Ideas Details</li>
          </ol>
        </div>
      </nav>

      <div className="page-content">
        <div className="container">
          <div className="planninginnerwrapper mb-5">
            <div
              className="row plannings-container-ideas"
              style={{ alignItems: "center" }}
            >
              <div className="col-lg-6 col-sm-6 col-xs-12">
                <div className="application-heading mb-3">
                  <h3>Concept details</h3>
                </div>

                <div className="mb-3">
                  <p>
                    <span className="prefresubtitle">Concept : </span>Private
                    Office, Sit-to-stand{" "}
                  </p>
                  <p>
                    <span className="prefresubtitle">Collection : </span>
                    Adjustable tables
                  </p>
                  <p>
                    <span className="prefresubtitle">Space type : </span>{" "}
                    Private Office, Sit-to-stand
                  </p>
                </div>

                <p className="subtitle mb-3">Available formats</p>

                <div className="btnWrapper">
                  <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
                    <i className="icon-arrow-down"></i>
                    <span>Autocad 2D (47.92 KB)</span>
                  </button>
                  <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
                    <i className="icon-arrow-down"></i>
                    <span>Autocad 3D (2.28 MB)</span>
                  </button>
                  <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
                    <i className="icon-arrow-down"></i>
                    <span>Sketch Up (4.58 MB)</span>
                  </button>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6 col-xs-12">
                <img
                  src="images/projectreferencesinner/projectreferencesdetail.png"
                  className="img-fluid mb-2"
                />
                <div className="btnWrapper">
                  <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
                    <span>3D SHAPE</span>
                  </button>
                  <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
                    <span>3D LINE</span>
                  </button>
                  <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
                    <span>Plan</span>
                  </button>
                  <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
                    <span>3D Viewers</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withApollo({ ssr: typeof window == undefined })(
  connect(null, { ...demoAction })(PlaningIdeasInner)
);
