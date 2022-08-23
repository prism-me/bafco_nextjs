import Reveal from "react-awesome-reveal";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ALink from "~/components/features/alink";
import withApollo from "~/server/apollo";
import { actions as demoAction } from "~/store/demo";
import { fadeIn } from "~/utils/data";
import { API } from "~/http/API";

function VideoGallery(props) {
  function openVideoModal(e) {
    e.preventDefault();
    props?.showVideo();
  }

  const videoList = [
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      video_link: "https://youtu.be/vBPgmASQ1A0",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_12_1_300x300_b966955471.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      video_link: "https://youtu.be/vBPgmASQ1A0",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_12_1_300x300_b966955471.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      video_link: "https://youtu.be/vBPgmASQ1A0",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_12_1_300x300_b966955471.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      video_link: "https://youtu.be/vBPgmASQ1A0",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_12_1_300x300_b966955471.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      video_link: "https://youtu.be/vBPgmASQ1A0",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_12_1_300x300_b966955471.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      video_link: "https://youtu.be/vBPgmASQ1A0",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_12_1_300x300_b966955471.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      video_link: "https://youtu.be/vBPgmASQ1A0",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_12_1_300x300_b966955471.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      video_link: "https://youtu.be/vBPgmASQ1A0",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_12_1_300x300_b966955471.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      video_link: "https://youtu.be/vBPgmASQ1A0",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_12_1_300x300_b966955471.jpg",
    },
  ];

  return (
    <div className="main video-gallery-page">
      <nav className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink href="/pages/resources">Resources</ALink>
            </li>
            <li className="breadcrumb-item active">Video Gallery</li>
          </ol>
        </div>
      </nav>

      <div className="page-content">
        <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-12">
                <div className="application-heading mb-3 d-flex justify-content-between align-items-center">
                  <h3>Video Gallery</h3>
                </div>
              </div>
              {videoList?.length > 0 ? (
                videoList?.map((x, i) =>
                  i === 0 ? (
                    <div className="col-12 col-md-12 col-lg-12 mb-2" key={i}>
                      <div className="videowrapper">
                        <img
                          key={i}
                          src={x?.thumbnail}
                          style={{
                            width: "100%",
                            display: "block",
                            height: "500px",
                          }}
                        />
                        <div className="videoContent">
                          <a
                            href={x?.video_link}
                            className="btn-iframe"
                            onClick={openVideoModal}
                          >
                            <i className="icon-play-outline icon"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="col-6 col-md-6 col-lg-3" key={i}>
                      <div className="videowrapper">
                        <img
                          key={i}
                          src={x?.thumbnail}
                          style={{ width: "100%", display: "block" }}
                        />
                        <div className="videoContent">
                          <a
                            href={x?.video_link}
                            className="btn-iframe"
                            onClick={openVideoModal}
                          >
                            <i className="icon-play-outline icon"></i>
                          </a>
                        </div>
                      </div>
                      <p className="videotitle">{x?.title}</p>
                    </div>
                  )
                )
              ) : (
                <p
                  style={{
                    fontSize: "20px",
                    textAlign: "center",
                    fontWeight: "bold",
                    display: "block",
                    width: "100%",
                  }}
                >
                  No Video found.
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default withApollo({ ssr: typeof window == undefined })(
  connect(null, { ...demoAction })(VideoGallery)
);
