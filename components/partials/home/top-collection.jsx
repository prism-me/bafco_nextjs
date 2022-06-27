import { Tab, Tabs, TabPanel, TabList } from 'react-tabs';

import ProductTwelve from '~/components/features/products/product-twelve';

import { catFilter } from '~/utils';

function TopCollection(props) {
    const { products = [], loading } = props;
    const visible = 4;

    return (
        <Tabs defaultIndex={0} selectedTabClassName="show">
            <div className="container">
                <div className="heading heading-center mb-3">
                    <h2 className="title">Top Selling Products</h2>
                    <TabList className="nav nav-pills nav-border-anim justify-content-center">
                        <Tab className="nav-item">
                            <span className="nav-link">All</span>
                        </Tab>
                        <Tab className="nav-item">
                            <span className="nav-link">Furniture</span>
                        </Tab>
                        <Tab className="nav-item">
                            <span className="nav-link">Decoration</span>
                        </Tab>
                        <Tab className="nav-item">
                            <span className="nav-link">Lighting</span>
                        </Tab>
                    </TabList>
                </div>

                <TabPanel>
                    <div className="products">
                        <div className="row">
                            {
                                (loading || products.length == 0) ?
                                    [1, 2, 3, 4, 5, 6, 7, 8].slice(0, visible).map((item, index) =>
                                        <div className="col-6 col-md-6 col-lg-3" key={index}>
                                            <div className="skel-pro"></div>
                                        </div>
                                    )
                                    :
                                    products.slice(0, visible).map((item, index) =>
                                        <div className="col-6 col-md-6 col-lg-3" key={index}>
                                            <ProductTwelve
                                                product={item} />
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="products">
                        <div className="row">
                            {
                                (loading || products.length == 0) ?
                                    [1, 2, 3, 4, 5, 6, 7, 8].slice(0, visible).map((item, index) =>
                                        <div className="col-6 col-md-6 col-lg-3" key={index}>
                                            <div className="skel-pro"></div>
                                        </div>
                                    )
                                    :
                                    catFilter(products, ['furniture']).slice(0, visible).map((item, index) =>
                                        <div className="col-6 col-md-6 col-lg-3" key={index}>
                                            <ProductTwelve
                                                product={item} />
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="products">
                        <div className="row">
                            {
                                (loading || products.length == 0) ?
                                    [1, 2, 3, 4, 5, 6, 7, 8].slice(0, visible).map((item, index) =>
                                        <div className="col-6 col-md-6 col-lg-3" key={index}>
                                            <div className="skel-pro"></div>
                                        </div>
                                    )
                                    :
                                    catFilter(products, ['decoration']).slice(0, visible).map((item, index) =>
                                        <div className="col-6 col-md-6 col-lg-3" key={index}>
                                            <ProductTwelve
                                                product={item} />
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="products">
                        <div className="row">
                            {
                                (loading || products.length == 0) ?
                                    [1, 2, 3, 4, 5, 6, 7, 8].slice(0, visible).map((item, index) =>
                                        <div className="col-6 col-md-6 col-lg-3" key={index}>
                                            <div className="skel-pro"></div>
                                        </div>
                                    )
                                    :
                                    catFilter(products, ['lighting']).slice(0, visible).map((item, index) =>
                                        <div className="col-6 col-md-6 col-lg-3" key={index}>
                                            <ProductTwelve
                                                product={item} />
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </TabPanel>
            </div>
        </Tabs>
    )
}

export default TopCollection;
