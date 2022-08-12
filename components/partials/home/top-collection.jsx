import { Tab, Tabs, TabPanel, TabList } from 'react-tabs';

import ProductTwelve from '~/components/features/products/product-twelve';

import { catFilter } from '~/utils';

function TopCollection(props) {
    const { products = [], categories, loading, setIsSelectedCategory } = props;
    const visible = 4;
    // console.log("props :: ", props);
    const handleCategory = (route) => {
        // console.log("route :: ", route)
        props.setIsSelectedCategory(route);
    }
    return (
        <Tabs defaultIndex={0} selectedTabClassName="show">
            <div className="container">
                <div className="heading heading-center mb-3">
                    <h2 className="title">Top Selling Products</h2>
                    <TabList className="nav nav-pills nav-border-anim justify-content-center">
                        <Tab className="nav-item">
                            <span className="nav-link">All</span>
                        </Tab>
                        {/* {categories?.map((item, index) => (
                            <Tab className="nav-item" key={index}>
                                <span className="nav-link">{item.name}</span>
                            </Tab>
                        ))} */}
                        <Tab className="nav-item">
                            <span className="nav-link">Executive Chairs</span>
                        </Tab>
                        <Tab className="nav-item">
                            <span className="nav-link">Ergonomic Chairs</span>
                        </Tab>
                        <Tab className="nav-item">
                            <span className="nav-link">Conference Chairs</span>
                        </Tab>
                        <Tab className="nav-item">
                            <span className="nav-link">Visitor Chairs</span>
                        </Tab>
                        <Tab className="nav-item">
                            <span className="nav-link">Stools</span>
                        </Tab>
                        <Tab className="nav-item">
                            <span className="nav-link">Multi-Functional Chairs</span>
                        </Tab>
                    </TabList>
                </div>
                <div className="products">
                    <div className="row">
                        {products.map((item1, index1) =>
                            <div className="col-6 col-md-6 col-lg-3" key={index1}>
                                {/* <ProductTwelve
                                    product={item1} /> */}
                            </div>
                        )}
                    </div>
                </div>
                {/* <TabPanel>
                    <div className="products">
                        <div className="row">
                            {products.map((item1, index1) =>
                                <div className="col-6 col-md-6 col-lg-3" key={index1}>
                                    <ProductTwelve
                                        product={item1} />
                                </div>
                            )}
                        </div>
                    </div>
                </TabPanel> */}
                {/* {categories?.map((item, index) => ( */}
                {/* <TabPanel>
                        <div className="products">
                            <div className="row">
                                {products.map((item1, index1) =>
                                    <div className="col-6 col-md-6 col-lg-3" key={index1}>
                                        <ProductTwelve
                                            product={item1} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </TabPanel> */}
                {/* ))} */}
            </div>
        </Tabs>
    )
}

export default TopCollection;
