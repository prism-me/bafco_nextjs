import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';

function PostFour(props) {
    const { post } = props;

    let date = new Date(post.date);
    let options = { year: "numeric", month: "short", day: "2-digit", timeZone: "UTC" };

    return (
        <div className="col-sm-4 col-lg-4">
            <ALink href={`/blogs/${post.route}`}>
                <img src={post.featured_img} />
                <div className="lazy-overlay"></div>

                <LazyLoadImage
                    alt="Post"
                    src={post.featured_img}
                    threshold={500}
                    effect="blur"
                    height="auto"
                />
            </ALink>
            <div className="entry-body">
                {/* <div className="entry-meta">
                    <ALink href="#">{date.toLocaleDateString('en-US', options)}</ALink>
                    <span className="meta-separator">|</span>
                    <ALink href="#">{post.comments} Comments</ALink>
                </div> */}

                <h2 className="entry-title">
                    <ALink href={`/blogs/${post.route}`}>
                        {post.title}
                    </ALink>
                </h2>

                <div className="entry-content">
                    <ALink href={`/blogs/${post.route}`} className="read-more">Read More</ALink>
                </div>
            </div>
        </div>
    );
}

export default PostFour