import Reveal from "react-awesome-reveal";
import react, { useEffect, useState } from "react";
import ALink from "~/components/features/alink";
import OwlCarousel from "~/components/features/owl-carousel";
import PostFour from "~/components/features/posts/post-four";
const axios = require("axios");
import { fadeIn, blogSlider } from "~/utils/data";

function BlogCollection(props) {
  const [blogdata, setBlogdata] = useState();
  // let date = new Date(post.date);
  // let options = { year: "numeric", month: "short", day: "2-digit", timeZone: "UTC" };

  useEffect(() => {
    setBlogdata(props?.posts);
  }, [props]);

  return (
    <section className="blog-posts">
      <div className="container">
        <h2 className="title text-center mb-6">From Our Blog</h2>
        <div className="row">
          {blogdata?.slice(0, 3)?.map((item, index) => (
            <div className="col-sm-4 col-lg-4" key={index}>
              <ALink href={`/blogs/${item.route}`}>
                <img src={item.featured_img} />
              </ALink>
              <div className="entry-body">
                <div className="entry-meta mb-2">
                  {/* <ALink href="#">{item.created_at.toLocaleDateString('en-US', options)}</ALink> */}
                </div>

                <h2 className="entry-title mb-2">
                  <ALink href={`/blogs/${item.route}`}>{item.title}</ALink>
                </h2>
                <div
                  className="mb-2"
                  dangerouslySetInnerHTML={{ __html: item.short_description }}
                />
                <div className="entry-content">
                  <ALink href={`/blogs/${item.route}`} className="read-more">
                    Read More
                  </ALink>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mb-7 mt-2 blogbtnwrapper">
          <ALink href="/blogs/" className="btn btn-outline-darker btn-more">
            <span>View more articles</span>
            <i className="icon-long-arrow-right"></i>
          </ALink>
        </div>
      </div>
    </section>
  );
}

export default BlogCollection;
