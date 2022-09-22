import React from 'react';
import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Rating } from 'react-simple-star-rating';
import ALink from '~/components/features/alink';

let initialObject = {
    name: "",
    email: "",
    comment: "",
    rating: 0,
}

function InfoOne(props) {
    const { product, dimension } = props;
    const [reviewData, setReviewData] = useState({ ...initialObject });

    const setRating = (e) => {
        e.preventDefault();

        if (e.currentTarget.parentNode.querySelector('.active')) {
            e.currentTarget.parentNode.querySelector('.active').classList.remove('active');
        }

        e.currentTarget.classList.add('active');
    }

    // if ( !product ) {
    //     return <div></div>
    // }

    const handleReviewInputChange = (e) => {
        let dataReview = { ...reviewData };
        dataReview[e.target.name] = e.target.value;
        setReviewData(dataReview);
    };

    const handleRating = (rate) => {

        let updatedData = { ...reviewData };
        updatedData.rating = rate;
        setReviewData(updatedData);
    }

    const handleSubmit = () => {
        let finalRoom = reviewData;
        console.log("reviewData ::", finalRoom);
    }

    return (
        <Tabs selectedTabClassName="show" selectedTabPanelClassName="active show">
            <div className="product-details-tab">
                <TabList className="nav nav-pills justify-content-center">
                    {!product?.product?.long_description ? "" :
                        <Tab className="nav-item">
                            <span className="nav-link"> Description</span>
                        </Tab>
                    }

                    {!product?.product?.download ? "" :
                        <Tab className="nav-item">
                            <span className="nav-link"> Resources</span>
                        </Tab>
                    }

                    {!product?.product?.shiping_and_return ? "" :
                        <Tab className="nav-item">
                            <span className="nav-link">Shipping & Returns</span>
                        </Tab>
                    }

                    <Tab className="nav-item">
                        <span className="nav-link">Dimensions</span>
                    </Tab>
                    {product?.footrest?.length === 0 || product?.headrest?.length === 0 ? "" :
                        <Tab className="nav-item">
                            <span className="nav-link">Colours & Materials</span>
                        </Tab>
                    }

                    <Tab className="nav-item">
                        {/* <span className="nav-link" >Reviews ({product?.review})</span> */}
                        <span className="nav-link" >Reviews (2)</span>
                    </Tab>
                </TabList>

                <div className="tab-content">
                    {!product?.product?.long_description ? "" :
                        <TabPanel className="tab-pane">
                            <div className="product-desc-content">
                                <h3>Product Information</h3>
                                <div className="mb-2" dangerouslySetInnerHTML={{ __html: product?.product?.long_description }} />
                            </div>
                        </TabPanel>
                    }

                    {!product?.product?.download ? "" :
                        <TabPanel className="tab-pane">
                            <div className="product-desc-content">
                                <a href={product?.download} target="_blank">
                                    <img className="mb-2" src="images/products/Component197.png" />
                                    <div className="pl-sm-2">
                                        <h3>Office Chair Brochure</h3>
                                        <p>Brochure</p>
                                        <p>Visit us : <a href="bit.ly/BAFCOCHAIR">bit.ly/BAFCOCHAIR</a></p>
                                    </div>
                                </a>
                            </div>
                        </TabPanel>
                    }

                    {!product?.product?.shiping_and_return ? "" :
                        <TabPanel className="tab-pane">
                            <div className="product-desc-content">
                                <h3>Delivery & returns</h3>
                                <div className="mb-2" dangerouslySetInnerHTML={{ __html: product?.product?.shiping_and_return }} />
                            </div>
                        </TabPanel>
                    }

                    <TabPanel className="tab-pane">
                        <div className="product-desc-content">
                            {/* <h3>Dimensions</h3> */}
                            <table className="table table-striped  justify-content-center">
                                <thead className="text-center">
                                    <tr>
                                        <th>Product</th>
                                        <th>Product Model</th>
                                        <th>Depth (mm)</th>
                                        <th>Width (mm)</th>
                                        <th>Height (mm)</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {dimension?.length !== 0 &&
                                        dimension?.map((dimension, i) => (
                                            <tr key={i}>
                                                <td><img src={dimension.images[0].avatar} style={{ height: "90px", margin: "0px auto" }} /></td>
                                                <td>{dimension.code}</td>
                                                <td>{dimension.depth}</td>
                                                <td>{dimension.width}</td>
                                                <td>{dimension.height}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </TabPanel>
                    {product?.footrest?.length === 0 || product?.headrest?.length === 0 ? "" :
                        <TabPanel className="tab-pane">
                            <div className="product-desc-content color_tabpanel">
                                {/* <h3>Colours & Materials</h3> */}
                                <Tabs selectedTabClassName="show" selectedTabPanelClassName="active show">
                                    <TabList className="nav nav-pills">
                                        {product?.footrest?.length === 0 ? " " :
                                            < Tab className="nav-item">
                                                <span className="nav-link"> Seat / Footrest</span>
                                            </Tab>
                                        }
                                        {product?.headrest?.length === 0 ? " " :
                                            <Tab className="nav-item">
                                                <span className="nav-link"> Backrest / Headrest</span>
                                            </Tab>
                                        }
                                    </TabList>
                                    <div className="tab-content">
                                        {product?.footrest?.length === 0 ? " " :
                                            <TabPanel className="tab-pane">
                                                <div className="color_sampel">
                                                    <ul>
                                                        {product?.footrest?.map((item, index) => (
                                                            <li key={index}>
                                                                {item.type === '3' ?
                                                                    <img src={item?.type_value} width="150" /> :
                                                                    <span style={{ backgroundColor: item.type_value }}></span>
                                                                }
                                                                <p>{item.name}</p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </TabPanel>
                                        }
                                        {product?.headrest?.length === 0 ? " " :
                                            <TabPanel className="tab-pane">
                                                <div className="color_sampel">
                                                    <ul>
                                                        {product?.headrest?.map((item, index) => (
                                                            <li key={index}>
                                                                {item.type === '3' ?
                                                                    <img src={item?.type_value} width="150" /> :
                                                                    <span style={{ backgroundColor: item.type_value }}></span>
                                                                }
                                                                <p>{item.name}</p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </TabPanel>
                                        }
                                    </div>
                                </Tabs>
                            </div>
                        </TabPanel>
                    }

                    <TabPanel className="tab-pane">
                        <div className="reviews">
                            <h3>Reviews (2)</h3>
                            <div className="review">
                                <div id="stamped-main-widget"
                                    data-product-id={`${product?.product?.id}`}
                                    data-name={`${product?.product?.name}`}
                                    data-url="##product.url##"
                                    data-image-url="##product.image##"
                                    data-description={`${product?.product?.long_description}`}
                                    data-product-sku={`${product?.product?.brand}`}>
                                </div>

                                <span class="stamped-product-reviews-badge stamped-main-badge" data-id="##product.id##"></span>

                                <div className="row no-gutters">
                                    <div className="col-auto">
                                        <h4><ALink href="#">Samanta J.</ALink></h4>
                                        <div className="ratings-container">
                                            <div className="ratings">
                                                <div className="ratings-val" style={{ width: product?.ratings * 20 + '%' }}></div>
                                                <span className="tooltip-text">{product?.ratings?.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <span className="review-date mb-1">6 days ago</span>
                                    </div>
                                    <div className="col">
                                        <h4>Good, perfect size</h4>

                                        <div className="review-content">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus cum dolores assumenda asperiores facilis porro reprehenderit animi culpa atque blanditiis commodi perspiciatis doloremque, possimus, explicabo, autem fugit beatae quae voluptas!</p>
                                        </div>

                                        <div className="review-action">
                                            <ALink href="#"><i className="icon-thumbs-up"></i>Helpful (2)</ALink>
                                            <ALink href="#"><i className="icon-thumbs-down"></i>Unhelpful (0)</ALink>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="review" >
                                <div className="row no-gutters">
                                    <div className="col-auto">
                                        <h4><ALink href="#">John Doe</ALink></h4>

                                        {/* <div className="ratings-container">
                                            <div className="ratings">
                                                <div className="ratings-val" style={ { width: product.ratings * 20 + '%' } }></div>
                                                <span className="tooltip-text">{ product.ratings.toFixed( 2 ) }</span>
                                            </div>
                                        </div> */}

                                        <span className="review-date mb-1">5 days ago</span>
                                    </div>

                                    <div className="col">
                                        <h4>Very good</h4>

                                        <div className="review-content">
                                            <p>Sed, molestias, tempore? Ex dolor esse iure hic veniam laborum blanditiis laudantium iste amet. Cum non voluptate eos enim, ab cumque nam, modi, quas iure illum repellendus, blanditiis perspiciatis beatae!</p>
                                        </div>

                                        <div className="review-action">
                                            <ALink href="#"><i className="icon-thumbs-up"></i>Helpful (0)</ALink>
                                            <ALink href="#"><i className="icon-thumbs-down"></i>Unhelpful (0)</ALink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="reply">
                            <div className="title-wrapper text-left">
                                <h3 className="title title-simple text-left text-normal">Add a Review
                                </h3>
                                <p>Your email address will not be published. Required fields are
                                    marked *</p>
                            </div>
                            <div className="rating-form">
                                <label htmlFor="rating" className="text-dark">Your rating * </label>
                                <Rating
                                    onClick={handleRating}
                                    ratingValue={reviewData?.rating}
                                    allowHalfIcon
                                    fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                                />
                                {/* <span className="rating-stars selected">
                                    {[1, 2, 3, 4, 5].map((num, index) =>
                                        <a className={`star-${num}`} href="#" onClick={setRating} key={'star-' + index}>{num}</a>
                                    )}
                                </span> */}

                                {/* <select 
                                name="rating" 
                                id="rating" 
                                required=""
                                
                                style={{ display: 'none' }}>
                                    <option value="">Rate…</option>
                                    <option value="5">Perfect</option>
                                    <option value="4">Good</option>
                                    <option value="3">Average</option>
                                    <option value="2">Not that bad</option>
                                    <option value="1">Very poor</option>
                                </select> */}
                            </div>
                            <form>
                                <textarea
                                    id="reply-message"
                                    cols="30"
                                    rows="6"
                                    className="form-control mb-2"
                                    placeholder="Comment *"
                                    onChange={handleReviewInputChange}
                                    required></textarea>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="reply-name"
                                            name="reply-name"
                                            placeholder="Name *"
                                            onChange={handleReviewInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="reply-email"
                                            name="reply-email"
                                            placeholder="Email *"
                                            onChange={handleReviewInputChange}
                                            required />
                                    </div>
                                </div>
                                <div className="form-checkbox d-flex align-items-start mb-2">
                                    <input type="checkbox" className="custom-checkbox"
                                        id="signin-remember" name="signin-remember" />
                                    <label className="form-control-label ml-3" htmlFor="signin-remember">
                                        Save my name, email, and website in this browser for the
                                        next time I comment.
                                    </label>
                                </div>
                                <input
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSubmit}
                                    value="Submit"
                                />
                            </form>
                        </div>
                    </TabPanel>
                </div>
            </div>
        </Tabs >
    );
}

export default React.memo(InfoOne);


