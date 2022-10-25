import { useEffect, useState } from 'react';
import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
const axios = require('axios');
import withApollo from '~/server/apollo';
import { API } from '~/http/API';
import Helmet from "react-helmet";


function BlogListing() {
    const [blogdata, setBlogdata] = useState();

    useEffect(() => {
        API.get(`/blogs`).then((response) => {
            setBlogdata(response.data)
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <div className="main">
            <Helmet>
                <title>Blogs</title>
                <meta name="description" content={`Blogs`} />
            </Helmet>
            <PageHeader
                title="Blogs"
                subTitle="We make happy workplaces"
                backgroundImage="images/banners/innovations-bg.png"
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
                            Blogs
                        </li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className={`container skeleton-body`}>
                    <div className="row">
                        {blogdata?.map((item, index) => (
                            <div className="col-sm-4 col-lg-4" key={index}>
                                <ALink href={`/blogs/${item.route}`}>
                                    <img src={item.featured_img} />
                                </ALink>
                                <div className="entry-body">
                                    <div className="entry-meta mb-2">
                                        {/* <ALink href="#">{item.created_at.toLocaleDateString('en-US', options)}</ALink> */}
                                    </div>

                                    <h2 className="entry-title">
                                        <ALink href={`/blogs/${item.route}`}>
                                            {item.title}
                                        </ALink>
                                    </h2>
                                    <div className="mb-2" dangerouslySetInnerHTML={{ __html: item.short_description }} />
                                    <div className="entry-content">
                                        <ALink href={`/blogs/${item.route}`} className="read-more">Read More</ALink>
                                    </div>
                                </div>
                            </div>
                        ))
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default withApollo({ ssr: typeof window == undefined })(BlogListing);