import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import StickyBox from 'react-sticky-box';
import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
import withApollo from '~/server/apollo';
import { GET_POST } from '~/server/queries';
import { actions as demoAction } from '~/store/demo';
const axios = require('axios');

function BlogInner(props) {
    const slug = useRouter().query.slug;
    // const { data, loading, error } = useQuery(GET_POST, { variables: { slug } });
    // const post = data && data.post.single;
    // const related = data && data.post.related;
    // const prev = data && data.post.prev;
    // const next = data && data.post.next;
    // const options = { year: "numeric", month: "short", day: "2-digit", timeZone: "UTC" };
    const [blogData, setBlogdata] = useState();

    useEffect(() => {
        axios.get(`https://prismcloudhosting.com/BAFCO_APIs/public/v1/api/blogs/${slug}`).then(function (response) {
            // handle success
            console.log("response :: ", response.data);
            setBlogdata(response.data)
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
    }, [])


    // const openVideoModal = (e) => {
    //     e.preventDefault();
    //     props.showVideo();
    // }

    // if (error) {
    //     return <div></div>
    // }

    return (
        <div className="main">
            <PageHeader
                title={blogData?.title}
                subTitle={blogData?.sub_title}
                backgroundImage={blogData?.banner_img}
                buttonText="Shop Now"
                buttonUrl="#"
            />

            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/blogs">Blog</ALink>
                        </li>
                        <li className="breadcrumb-item active">{blogData?.title}</li>
                    </ol>
                </div>
            </nav>


            <div className="page-content">
                <div className={`container skeleton-body`}>
                    <article className="entry single-entry entry-fullwidth">
                        <div className="row">
                            <div className="col-lg-11">
                                <div className="entry-body">
                                    <div className="application-heading text-center mb-3">
                                        <h3>{blogData?.title}</h3>
                                    </div>
                                    <div className="entry-content editor-content">
                                        <div dangerouslySetInnerHTML={{ __html: blogData?.description }} />

                                        <div className="pb-1"></div>
                                    </div>

                                    <div className="entry-footer row no-gutters">
                                        <div className="col">
                                            <div className="entry-tags">
                                                <span>Tags:</span>
                                                {blogData?.tags?.map((item, index) => (
                                                    <ALink href="#" key={index}>{item.label}</ALink>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-1 order-lg-first mb-2 mb-lg-0">
                                <StickyBox className="sticky-content" offsetTop={70}>
                                    <div
                                        className="social-icons social-icons-colored social-icons-vertical"
                                    >
                                        <span className="social-label">SHARE:</span>
                                        <ALink
                                            href={`https://www.facebook.com/share.php?u=${window.location.hostname + `/` + blogData?.route}`}
                                            className="social-icon social-facebook"
                                            title="Facebook"
                                            target="_blank"
                                        >
                                            <i className="icon-facebook-f"></i>
                                        </ALink>
                                        <ALink
                                            href={`https://twitter.com/share.php?u=${window.location.hostname + `/` + blogData?.route}`}
                                            className="social-icon social-twitter"
                                            title="Twitter"
                                            target="_blank"
                                        >
                                            <i className="icon-twitter"></i>
                                        </ALink>
                                        <ALink
                                            href={`https://www.instagram.com/share.php?u=${window.location.hostname + `/` + blogData?.route}`}
                                            className="social-icon social-instagram"
                                            title="Instagram"
                                            target="_blank"
                                        >
                                            <i className="icon-instagram"></i>
                                        </ALink>
                                        <ALink
                                            href={`https://www.linkedin.com/share.php?u=${window.location.hostname + `/` + blogData?.route}`}
                                            className="social-icon social-linkedin"
                                            title="Linkedin"
                                            target="_blank"
                                        >
                                            <i className="icon-linkedin"></i>
                                        </ALink>
                                    </div>
                                </StickyBox>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}

export default withApollo({ ssr: typeof window == undefined })(connect(null, { ...demoAction })(BlogInner));