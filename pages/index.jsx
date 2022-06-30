import { useQuery } from "@apollo/react-hooks";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Reveal from 'react-awesome-reveal';
import Countdown from "react-countdown";

import ALink from '~/components/features/alink';
import OwlCarousel from '~/components/features/owl-carousel';
import SpecialCollection from '~/components/partials/home/special-collection';
import TopCollection from '~/components/partials/home/top-collection';
import BlogCollection from '~/components/partials/home/blog-collection';
import NewsletterModal from "~/components/features/modals/newsletter-modal";
import { rendererThree } from "~/components/features/count-down";
import { connect } from 'react-redux';
import withApollo from '~/server/apollo';
import { GET_HOME_DATA } from '~/server/queries';
import { attrFilter } from '~/utils';
import { actions as demoAction } from '~/store/demo';
// import { productdata } from "../data";
import { homeData, introSlider, brandSlider, dealSlider, fadeInUpShorter, fadeInLeftShorter, fadeInRightShorter, fadeIn } from '~/utils/data';

const productdata = [
    {
        "id": 107,
        "name": "2-Seater",
        "slug": "2-seater",
        "price": 248,
        "sale_price": null,
        "review": 2,
        "ratings": 5,
        "until": null,
        "stock": 0,
        "top": null,
        "featured": true,
        "new": null,
        "category": [
            {
                "name": "Furniture",
                "slug": "furniture",
                "__typename": "Category"
            }
        ],
        "sm_pictures": [
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_1_1_300x300_ec128f72cf.jpg",
                "__typename": "Media"
            },
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_1_2_300x300_d265cc4cd6.jpg",
                "__typename": "Media"
            }
        ],
        "variants": [],
        "__typename": "Product"
    },
    {
        "id": 108,
        "name": "Block Side Table/Trolley",
        "slug": "block-side-tabletrolley",
        "price": 210,
        "sale_price": null,
        "review": 2,
        "ratings": 5,
        "until": null,
        "stock": 100,
        "top": null,
        "featured": true,
        "new": null,
        "category": [
            {
                "name": "Coffee & Tables",
                "slug": "coffee-and-tables",
                "__typename": "Category"
            },
            {
                "name": "Furniture",
                "slug": "furniture",
                "__typename": "Category"
            },
            {
                "name": "Tables",
                "slug": "tables",
                "__typename": "Category"
            }
        ],
        "sm_pictures": [
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_2_1_300x300_1cbb2b1986.jpg",
                "__typename": "Media"
            },
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_2_2_300x300_798eabaee1.jpg",
                "__typename": "Media"
            }
        ],
        "variants": [
            {
                "color": "#669933",
                "color_name": "Green",
                "price": 210,
                "size": [
                    {
                        "name": "Medium",
                        "__typename": "Size"
                    },
                    {
                        "name": "Large",
                        "__typename": "Size"
                    }
                ],
                "__typename": "Variant"
            },
            {
                "color": "#cc3333",
                "color_name": "Red",
                "price": 240,
                "size": [
                    {
                        "name": "Large",
                        "__typename": "Size"
                    },
                    {
                        "name": "Extra Large",
                        "__typename": "Size"
                    }
                ],
                "__typename": "Variant"
            }
        ],
        "__typename": "Product"
    },
    {
        "id": 109,
        "name": "Butler Stool Ladder",
        "slug": "butler-stool-ladder",
        "price": 25,
        "sale_price": 20,
        "review": 2,
        "ratings": 3,
        "until": "2022-01-01",
        "stock": 100,
        "top": true,
        "featured": true,
        "new": null,
        "category": [
            {
                "name": "Furniture",
                "slug": "furniture",
                "__typename": "Category"
            }
        ],
        "sm_pictures": [
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_3_1_300x300_a6a525d4b9.jpg",
                "__typename": "Media"
            },
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_3_2_300x300_7ef429113e.jpg",
                "__typename": "Media"
            }
        ],
        "variants": [],
        "__typename": "Product"
    },
    {
        "id": 110,
        "name": "Can 2-Seater Sofa",
        "slug": "can-2-seater-sofa",
        "price": 60,
        "sale_price": null,
        "review": 2,
        "ratings": 2,
        "until": null,
        "stock": 100,
        "top": true,
        "featured": true,
        "new": null,
        "category": [
            {
                "name": "Furniture",
                "slug": "furniture",
                "__typename": "Category"
            }
        ],
        "sm_pictures": [
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_4_1_300x300_aec4741c63.jpg",
                "__typename": "Media"
            },
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_4_2_300x300_ec63a5f054.jpg",
                "__typename": "Media"
            }
        ],
        "variants": [],
        "__typename": "Product"
    },
    {
        "id": 111,
        "name": "Roots Sofa Bed",
        "slug": "roots-sofa-bed",
        "price": 449,
        "sale_price": null,
        "review": 2,
        "ratings": 2,
        "until": "2022-01-01",
        "stock": 100,
        "top": true,
        "featured": null,
        "new": null,
        "category": [
            {
                "name": "Furniture",
                "slug": "furniture",
                "__typename": "Category"
            }
        ],
        "sm_pictures": [
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_11_1_300x300_574a1b1d0e.jpg",
                "__typename": "Media"
            },
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_11_2_300x300_8f906c2dcd.jpg",
                "__typename": "Media"
            }
        ],
        "variants": [],
        "__typename": "Product"
    },
    {
        "id": 112,
        "name": "Carronade Table Lamp",
        "slug": "carronade-table-lamp",
        "price": 130,
        "sale_price": null,
        "review": 2,
        "ratings": 4,
        "until": null,
        "stock": 100,
        "top": null,
        "featured": true,
        "new": true,
        "category": [
            {
                "name": "Decoration",
                "slug": "decoration",
                "__typename": "Category"
            },
            {
                "name": "Electronics",
                "slug": "electronics",
                "__typename": "Category"
            },
            {
                "name": "Lighting",
                "slug": "lighting",
                "__typename": "Category"
            }
        ],
        "sm_pictures": [
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_6_1_300x300_aea55d68e9.jpg",
                "__typename": "Media"
            },
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_6_2_300x300_76886659e2.jpg",
                "__typename": "Media"
            }
        ],
        "variants": [
            {
                "color": "#cc3333",
                "color_name": "Red",
                "price": 150,
                "size": [
                    {
                        "name": "Large",
                        "__typename": "Size"
                    },
                    {
                        "name": "Extra Small",
                        "__typename": "Size"
                    }
                ],
                "__typename": "Variant"
            },
            {
                "color": "#f0c04a",
                "color_name": "Yellow",
                "price": 130,
                "size": [
                    {
                        "name": "Small",
                        "__typename": "Size"
                    },
                    {
                        "name": "Large",
                        "__typename": "Size"
                    },
                    {
                        "name": "Extra Large",
                        "__typename": "Size"
                    }
                ],
                "__typename": "Variant"
            },
            {
                "color": "#669933",
                "color_name": "Green",
                "price": 110,
                "size": [
                    {
                        "name": "Large",
                        "__typename": "Size"
                    }
                ],
                "__typename": "Variant"
            }
        ],
        "__typename": "Product"
    },
    {
        "id": 113,
        "name": "Cushion Set 3 Pieces",
        "slug": "cushion-set-3-pieces",
        "price": 199,
        "sale_price": null,
        "review": 2,
        "ratings": 0,
        "until": null,
        "stock": 100,
        "top": null,
        "featured": true,
        "new": null,
        "category": [
            {
                "name": "Decoration",
                "slug": "decoration",
                "__typename": "Category"
            },
            {
                "name": "Beds",
                "slug": "beds",
                "__typename": "Category"
            }
        ],
        "sm_pictures": [
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_7_1_300x300_298b73e706.jpg",
                "__typename": "Media"
            },
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_7_2_300x300_6e6c2d02d3.jpg",
                "__typename": "Media"
            }
        ],
        "variants": [],
        "__typename": "Product"
    },
    {
        "id": 114,
        "name": "Flow Slim Armchair",
        "slug": "flow-slim-armchair",
        "price": 97,
        "sale_price": null,
        "review": 2,
        "ratings": 3,
        "until": null,
        "stock": 100,
        "top": true,
        "featured": null,
        "new": null,
        "category": [
            {
                "name": "Furniture",
                "slug": "furniture",
                "__typename": "Category"
            },
            {
                "name": "Armchairs & Chaises",
                "slug": "armchairs-and-chaises",
                "__typename": "Category"
            }
        ],
        "sm_pictures": [
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_8_1_300x300_ffd8a22d4a.jpg",
                "__typename": "Media"
            },
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_8_2_300x300_aef1526120.jpg",
                "__typename": "Media"
            },
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_8_3_300x300_cf0af19cb3.jpg",
                "__typename": "Media"
            }
        ],
        "variants": [],
        "__typename": "Product"
    },
    {
        "id": 115,
        "name": "Foldable Tray Table",
        "slug": "foldable-tray-table",
        "price": 308,
        "sale_price": 250,
        "review": 2,
        "ratings": 3,
        "until": null,
        "stock": 100,
        "top": true,
        "featured": null,
        "new": null,
        "category": [
            {
                "name": "Decoration",
                "slug": "decoration",
                "__typename": "Category"
            },
            {
                "name": "Furniture",
                "slug": "furniture",
                "__typename": "Category"
            }
        ],
        "sm_pictures": [
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_9_1_300x300_6a1e6d817c.jpg",
                "__typename": "Media"
            },
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_9_2_300x300_1b33d80bc7.jpg",
                "__typename": "Media"
            }
        ],
        "variants": [],
        "__typename": "Product"
    },
    {
        "id": 116,
        "name": "Garden Armchair",
        "slug": "garden-armchair",
        "price": 94,
        "sale_price": null,
        "review": 2,
        "ratings": 5,
        "until": null,
        "stock": 100,
        "top": true,
        "featured": null,
        "new": null,
        "category": [
            {
                "name": "Decoration",
                "slug": "decoration",
                "__typename": "Category"
            },
            {
                "name": "Furniture",
                "slug": "furniture",
                "__typename": "Category"
            },
            {
                "name": "Armchairs & Chaises",
                "slug": "armchairs-and-chaises",
                "__typename": "Category"
            }
        ],
        "sm_pictures": [
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_10_2_300x300_4ef184c8b8.jpg",
                "__typename": "Media"
            },
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_10_1_300x300_76e829e2ec.jpg",
                "__typename": "Media"
            }
        ],
        "variants": [
            {
                "color": "#333333",
                "color_name": "Black",
                "price": 90,
                "size": [
                    {
                        "name": "Extra Small",
                        "__typename": "Size"
                    },
                    {
                        "name": "Small",
                        "__typename": "Size"
                    },
                    {
                        "name": "Large",
                        "__typename": "Size"
                    }
                ],
                "__typename": "Variant"
            },
            {
                "color": "#999999",
                "color_name": "Grey",
                "price": 100,
                "size": [
                    {
                        "name": "Extra Small",
                        "__typename": "Size"
                    },
                    {
                        "name": "Large",
                        "__typename": "Size"
                    },
                    {
                        "name": "Extra Large",
                        "__typename": "Size"
                    }
                ],
                "__typename": "Variant"
            }
        ],
        "__typename": "Product"
    },
    {
        "id": 117,
        "name": "Carronade Large Suspension Lamp",
        "slug": "carronade-large-suspension-lamp",
        "price": 341,
        "sale_price": null,
        "review": 2,
        "ratings": 1,
        "until": null,
        "stock": 100,
        "top": true,
        "featured": null,
        "new": null,
        "category": [
            {
                "name": "Lighting",
                "slug": "lighting",
                "__typename": "Category"
            }
        ],
        "sm_pictures": [
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_5_1_300x300_1dc848bfc9.jpg",
                "__typename": "Media"
            },
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_5_2_300x300_5fe4a7e523.jpg",
                "__typename": "Media"
            }
        ],
        "variants": [],
        "__typename": "Product"
    },
    {
        "id": 118,
        "name": "Petite Table Lamp",
        "slug": "petite-table-lamp",
        "price": 65,
        "sale_price": null,
        "review": 2,
        "ratings": 5,
        "until": null,
        "stock": 100,
        "top": true,
        "featured": null,
        "new": null,
        "category": [
            {
                "name": "Lighting",
                "slug": "lighting",
                "__typename": "Category"
            }
        ],
        "sm_pictures": [
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_12_1_300x300_b966955471.jpg",
                "__typename": "Media"
            },
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_12_3_300x300_5762cc36c5.jpg",
                "__typename": "Media"
            },
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_12_2_300x300_dd9ba0a9be.jpg",
                "__typename": "Media"
            }
        ],
        "variants": [
            {
                "color": "#3399cc",
                "color_name": "Blue",
                "price": 69,
                "size": [
                    {
                        "name": "Medium",
                        "__typename": "Size"
                    },
                    {
                        "name": "Large",
                        "__typename": "Size"
                    }
                ],
                "__typename": "Variant"
            },
            {
                "color": "#cc3333",
                "color_name": "Red",
                "price": 65,
                "size": [
                    {
                        "name": "Small",
                        "__typename": "Size"
                    },
                    {
                        "name": "Medium",
                        "__typename": "Size"
                    },
                    {
                        "name": "Extra Large",
                        "__typename": "Size"
                    },
                    {
                        "name": "Extra Small",
                        "__typename": "Size"
                    }
                ],
                "__typename": "Variant"
            },
            {
                "color": "#ebfa00",
                "color_name": "Yellow",
                "price": 73,
                "size": [
                    {
                        "name": "Medium",
                        "__typename": "Size"
                    },
                    {
                        "name": "Large",
                        "__typename": "Size"
                    }
                ],
                "__typename": "Variant"
            }
        ],
        "__typename": "Product"
    },
    {
        "id": 119,
        "name": "Madra Log Holder",
        "slug": "madra-log-holder",
        "price": 40,
        "sale_price": null,
        "review": 2,
        "ratings": 3,
        "until": null,
        "stock": 100,
        "top": true,
        "featured": null,
        "new": true,
        "category": [
            {
                "name": "Decor",
                "slug": "decor",
                "__typename": "Category"
            },
            {
                "name": "Storage Boxes & Baskets",
                "slug": "storage-boxes-and-baskets",
                "__typename": "Category"
            },
            {
                "name": "Kitchen Cabinets",
                "slug": "kitchen-cabinets",
                "__typename": "Category"
            }
        ],
        "sm_pictures": [
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_13_1_300x300_338f481ae5.jpg",
                "__typename": "Media"
            },
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_13_2_300x300_c669393809.jpg",
                "__typename": "Media"
            }
        ],
        "variants": [],
        "__typename": "Product"
    },
    {
        "id": 120,
        "name": "Original Outdoor Beanbag",
        "slug": "original-outdoor-beanbag",
        "price": 80,
        "sale_price": null,
        "review": 2,
        "ratings": 4,
        "until": null,
        "stock": 100,
        "top": true,
        "featured": null,
        "new": null,
        "category": [
            {
                "name": "Storage Boxes & Baskets",
                "slug": "storage-boxes-and-baskets",
                "__typename": "Category"
            },
            {
                "name": "Decor",
                "slug": "decor",
                "__typename": "Category"
            },
            {
                "name": "Decoration",
                "slug": "decoration",
                "__typename": "Category"
            },
            {
                "name": "Beds",
                "slug": "beds",
                "__typename": "Category"
            }
        ],
        "sm_pictures": [
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_14_1_300x300_627d43a050.jpg",
                "__typename": "Media"
            },
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_14_2_300x300_2154bc1dd6.jpg",
                "__typename": "Media"
            },
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_14_3_300x300_011cc9330f.jpg",
                "__typename": "Media"
            },
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_14_4_300x300_84aa7cc3d2.jpg",
                "__typename": "Media"
            }
        ],
        "variants": [],
        "__typename": "Product"
    },
    {
        "id": 121,
        "name": "Windback Chair",
        "slug": "windback-chair",
        "price": 199,
        "sale_price": null,
        "review": 2,
        "ratings": 3,
        "until": null,
        "stock": 100,
        "top": null,
        "featured": null,
        "new": null,
        "category": [
            {
                "name": "Sofas & Sleeper Sofas",
                "slug": "sofas-and-sleeper-sofas",
                "__typename": "Category"
            },
            {
                "name": "Decor",
                "slug": "decor",
                "__typename": "Category"
            },
            {
                "name": "Armchairs & Chaises",
                "slug": "armchairs-and-chaises",
                "__typename": "Category"
            }
        ],
        "sm_pictures": [
            {
                "width": 300,
                "height": 300,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/product_15_1_300x300_d63bee55db.jpg",
                "__typename": "Media"
            }
        ],
        "variants": [],
        "__typename": "Product"
    }
];

const postsdata = [
    {
        "id": 101,
        "author": "Jane Doe",
        "comments": 0,
        "content": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit.Pelletesque aliquet nibh necurna.",
        "date": "2020-09-22",
        "slug": "sed-adipiscing-odbrnare.",
        "title": "Sed adipiscing odbrnare.",
        "type": "image",
        "blog_categories": [
            {
                "name": "Lifestyle",
                "slug": "lifestyle",
                "__typename": "Category"
            }
        ],
        "image": [
            {
                "width": 376,
                "height": 250,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/post_1_8285333d58.jpg",
                "__typename": "Media"
            }
        ],
        "__typename": "Post"
    },
    {
        "id": 102,
        "author": "Jane Doe",
        "comments": 0,
        "content": "Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis justo.",
        "date": "2020-05-12",
        "slug": "fusce-lacifgbnia-arcuet-nulla.",
        "title": "Fusce lacifgbnia arcuet nulla.",
        "type": "image",
        "blog_categories": [
            {
                "name": "Lifestyle",
                "slug": "lifestyle",
                "__typename": "Category"
            }
        ],
        "image": [
            {
                "width": 376,
                "height": 250,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/post_2_73cf3ad8f8.jpg",
                "__typename": "Media"
            }
        ],
        "__typename": "Post"
    },
    {
        "id": 103,
        "author": "Jane Doe",
        "comments": 2,
        "content": "Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue.",
        "date": "2020-05-19",
        "slug": "quisque-volutpat-mdbattis-eros.",
        "title": "Quisque volutpat mdbattis eros.",
        "type": "image",
        "blog_categories": [
            {
                "name": "Lifestyle",
                "slug": "lifestyle",
                "__typename": "Category"
            }
        ],
        "image": [
            {
                "width": 376,
                "height": 250,
                "url": "https://d-themes.com/react_asset_api/molla/uploads/post_3_dbb5414ec7.jpg",
                "__typename": "Media"
            }
        ],
        "__typename": "Post"
    }
];

function Home(props) {
    const { data, loading, error } = useQuery(GET_HOME_DATA);
    const products = data && data.homeData.products;
    // const topProducts = attrFilter(data && data.homeData.products, 'top');
    const topProducts = attrFilter(productdata && productdata, 'top');
    // const posts = data && data.homeData.posts;
    const posts = postsdata && postsdata;
    function openVideoModal(e) {
        e.preventDefault();
        props?.showVideo();
    }

    if (error) {
        return <div></div>
    }


    return (
        <div className="main home-page skeleton-body">
            <div className="intro-slider-container">
                <div className="intro-slide slide1" style={{ backgroundColor: '#EDF2F0', backgroundImage: 'url(images/home/Magic7.jpg)' }}>
                    <div className="container intro-content">
                        <Reveal keyframes={fadeInUpShorter} delay="100%" duration={1000}>
                            <>
                                <h3 className="intro-subtitle">Work Better. Live Healthier.</h3>
                                <h1 className="intro-title">Site Stand <br />Desks
                                    {/* <br /><span className="text-primary"><sup>$</sup>49,99</span> */}
                                </h1>

                                <ALink href="#" className="btn btn-dark btn-outline-darker">
                                    <span>Design My Desk</span>
                                    <i className="icon-long-arrow-right"></i>
                                </ALink>
                            </>
                        </Reveal>
                        {/* <img src="images/home/sliders/slide-1-3.png" className="position-absolute" alt="slide" /> */}
                    </div>
                </div>
                {/* <OwlCarousel adClass="owl-simple owl-light owl-nav-inside" options={introSlider}>
                    <div className="intro-slide slide1" style={{ backgroundColor: '#EDF2F0', backgroundImage: 'url(images/home/sliders/slide-1-1.png)' }}>
                        <div className="container intro-content">
                            <Reveal keyframes={fadeInUpShorter} delay="100%" duration={1000}>
                                <>
                                    <h3 className="intro-subtitle">Deals and Promotions</h3>
                                    <h1 className="intro-title">Wooden <br />Sideboard Table <br /><span className="text-primary"><sup>$</sup>49,99</span></h1>

                                    <ALink href="/shop/sidebar/list" className="btn btn-dark btn-outline-darker">
                                        <span>Shop Now</span>
                                        <i className="icon-long-arrow-right"></i>
                                    </ALink>
                                </>
                            </Reveal>
                            <img src="images/home/sliders/slide-1-3.png" className="position-absolute" alt="slide" />
                        </div>
                    </div>
                    <div className="intro-slide" style={{ backgroundImage: 'url(images/home/sliders/slide-2.jpg)' }}>
                        <div className="container intro-content text-right">
                            <Reveal keyframes={fadeInUpShorter} delay="100%" duration={1000}>
                                <div className="d-inline-block text-left">
                                    <h3 className="intro-subtitle">Bedroom Furniture</h3>
                                    <h1 className="intro-title">Find Comfort <br />That Suits You.</h1>

                                    <ALink href="/shop/sidebar/list" className="btn btn-dark btn-outline-darker">
                                        <span>Shop Now</span>
                                        <i className="icon-long-arrow-right"></i>
                                    </ALink>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    <div className="intro-slide slide3" style={{ backgroundColor: '#EDF2F0', backgroundImage: 'url(images/home/sliders/slide-3-1.png)' }}>
                        <div className="container intro-content">
                            <Reveal keyframes={fadeInUpShorter} delay="100%" duration={1000}>
                                <>
                                    <h3 className="intro-subtitle">Baskets & Storage</h3>
                                    <h1 className="intro-title">
                                        Laundary Basket<br />
                                        <span className="text-primary">
                                            <sup className="text-grey font-weight-light">from</sup><sup>$</sup>9,99
                                        </span>
                                    </h1>

                                    <ALink href="/shop/sidebar/list" className="btn btn-dark btn-outline-darker">
                                        <span>Shop Now</span>
                                        <i className="icon-long-arrow-right"></i>
                                    </ALink>
                                </>
                            </Reveal>
                        </div>
                    </div>
                </OwlCarousel> */}
            </div>
            {/* <Reveal keyframes={fadeIn} delay="100%" duration={500} triggerOnce>
                <OwlCarousel adClass="brands-border owl-simple brand-carousel cols-xl-7 cols-lg-5 cols-md-4 cols-sm-3 cols-2" options={brandSlider}>
                    {
                        homeData.brands.map((brand, index) => {
                            return (
                                <ALink href="#" className="brand mr-0" key={index} >
                                    <img src={brand.image} alt="brand" width={brand.width} height={brand.height} />
                                </ALink>
                            )
                        })
                    }
                </OwlCarousel>
            </Reveal> */}

            <div className="icon-boxes-container icon-boxes-separator">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 col-lg-4">
                            <Reveal keyframes={fadeInRightShorter} delay={200} duration={1000} triggerOnce>
                                <div className="icon-box icon-box-side">
                                    <span className="icon-box-icon">
                                        <i className="icon-phone"></i>
                                    </span>
                                    <div className="icon-box-content">
                                        <h3 className="icon-box-title">Give Us A Call</h3>

                                        <p>+971 800 (22326)</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div className="col-sm-4 col-lg-4">
                            <Reveal keyframes={fadeInRightShorter} delay={200} duration={1000} triggerOnce>
                                <div className="icon-box icon-box-side">
                                    <span className="icon-box-icon">
                                        <i className="icon-whatsapp"></i>
                                    </span>

                                    <div className="icon-box-content">
                                        <h3 className="icon-box-title">Whatsapp</h3>

                                        <p>+971 800 (22326)</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div className="col-sm-4 col-lg-4">
                            <Reveal keyframes={fadeInRightShorter} delay={200} duration={1000} triggerOnce>
                                <div className="icon-box icon-box-side">
                                    <span className="icon-box-icon">
                                        <i className="icon-map-marker"></i>
                                    </span>

                                    <div className="icon-box-content">
                                        <h3 className="icon-box-title">Locations</h3>

                                        <p>Visit a showroom near you.</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        {/* <div className="col-sm-6 col-lg-3">
                            <Reveal keyframes={fadeInLeftShorter} delay={200} duration={1000} triggerOnce>
                                <div className="icon-box icon-box-side">
                                    <span className="icon-box-icon">
                                        <i className="icon-life-ring"></i>
                                    </span>

                                    <div className="icon-box-content">
                                        <h3 className="icon-box-title">We Support</h3>

                                        <p>24/7 amazing services</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="mb-3 mb-lg-5"></div>

            <div className="banner-group">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-lg-5">
                            <Reveal keyframes={fadeInLeftShorter} delay={150} duration={1000} triggerOnce>
                                <div className="banner banner-large banner-overlay banner-overlay-light banner-lg banner-1 lazy-media">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        src="images/home/banners/WorkstationCollection.jpg"
                                        threshold={200}
                                        width="100%"
                                        height="auto"
                                        effect="blur"
                                    />

                                    <div className="banner-content banner-content-top">
                                        <h4 className="banner-subtitle">Clearance</h4>
                                        <h3 className="banner-title">Workstation <br /> Collection</h3>
                                        <div className="banner-text">from Dhs.200</div>
                                        <ALink href="#" className="btn btn-outline-gray banner-link">Discover Now<i className="icon-long-arrow-right"></i></ALink>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div className="col-sm-6 col-lg-3">
                            <Reveal keyframes={fadeIn} delay={150} duration={1000} triggerOnce>
                                <div className="banner banner-overlay banner-lg banner-2 lazy-media">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        src="images/home/banners/Chair-Collection.jpg"
                                        threshold={200}
                                        height="auto"
                                        width="100%"
                                        effect="blur"
                                    />

                                    <div className="banner-content banner-content-top">
                                        <h4 className="banner-subtitle text-grey">Freedom</h4>
                                        <h3 className="banner-title text-white">Chair Collections </h3>
                                        {/* <div className="banner-text text-white">from $39.99</div> */}
                                        <ALink href="#" className="btn btn-outline-white banner-link">Discover Now<i className="icon-long-arrow-right"></i></ALink>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-4">
                            <Reveal keyframes={fadeInRightShorter} delay={150} duration={1000} triggerOnce>
                                <div className="row">
                                    <div className="col-lg-12 col-md-6 col-sm-6">
                                        <div className="banner banner-3 banner-overlay lazy-media">
                                            <div className="lazy-overlay"></div>

                                            <LazyLoadImage
                                                alt="banner"
                                                src="images/home/banners/Desk-Collection.jpg"
                                                threshold={200}
                                                height="auto"
                                                width="100%"
                                                effect="blur"
                                            />

                                            <div className="banner-content banner-content-top">
                                                <h4 className="banner-subtitle">Midas</h4>
                                                <h3 className="banner-title">Desk Collections</h3>
                                                <ALink href="#" className="btn btn-outline-gray banner-link">Discover Now<i className="icon-long-arrow-right"></i></ALink>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-6 col-sm-6">
                                        <div className="banner banner-4 banner-overlay banner-overlay-light lazy-media">
                                            <div className="lazy-overlay"></div>

                                            <LazyLoadImage
                                                alt="banner"
                                                src="images/home/banners/Sofa-Collection.jpg"
                                                threshold={200}
                                                width="100%"
                                                height="auto"
                                                effect="blur"
                                            />

                                            <div className="banner-content banner-content-top">
                                                <h4 className="banner-subtitle text-grey">Enzo Plus</h4>
                                                <h3 className="banner-title text-white">Sofa Collections</h3>
                                                {/* <div className="banner-text">up to 30% off</div> */}
                                                <ALink href="#" className="btn btn-outline-white banner-link">Discover Now<i className="icon-long-arrow-right"></i></ALink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="mb-3"></div> */}

            <div className="our-projects text-center">
                <div className="heading heading-center mb-3">
                    <h2 className="title">Our Projects</h2>
                    <h4>Furniture Overview</h4>
                </div>
                <Reveal keyframes={fadeInUpShorter} delay={200} duration={1000} triggerOnce>
                    <div className="projects-list">
                        <img src="images/home/001-13.jpg" alt="slide" />

                        {/* <ul>
                            <li className="icon-index1">
                                <span className="icon-box-icon">
                                    <i className="icon-plus"></i>
                                </span>
                                <div className="icon-index-detail-box">
                                    <div className="row">
                                        <div className="col-sm-6 col-lg-6">
                                            <img src="images/home/projects/cubord.png" alt="" />
                                        </div>
                                        <div className="col-sm-6 col-lg-6">
                                            <h3>Lorem Ipsum</h3>
                                            <h6>Lorem Ipsum dolor sit</h6>
                                            <p>Double-door wadrobe with built-in hanger. Showing an orderly space.</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="icon-index2">
                                <span className="icon-box-icon">
                                    <i className="icon-plus"></i>
                                </span>
                                <div className="icon-index-detail-box">
                                    <div className="row">
                                        <div className="col-sm-6 col-lg-6">
                                            <img src="images/home/projects/drower-image.png" alt="" />
                                        </div>
                                        <div className="col-sm-6 col-lg-6">
                                            <h3>Lorem Ipsum</h3>
                                            <h6>Lorem Ipsum dolor sit</h6>
                                            <p>Double-door wadrobe with built-in hanger. Showing an orderly space.</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="icon-index3">
                                <span className="icon-box-icon">
                                    <i className="icon-plus"></i>
                                </span>
                                <div className="icon-index-detail-box">
                                    <div className="row">
                                        <div className="col-sm-6 col-lg-6">
                                            <img src="images/home/projects/drower-image.png" alt="" />
                                        </div>
                                        <div className="col-sm-6 col-lg-6">
                                            <h3>Lorem Ipsum</h3>
                                            <h6>Lorem Ipsum dolor sit</h6>
                                            <p>Double-door wadrobe with built-in hanger. Showing an orderly space.</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="icon-index4">
                                <span className="icon-box-icon">
                                    <i className="icon-plus"></i>
                                </span>
                            </li>
                            <li className="icon-index5">
                                <span className="icon-box-icon">
                                    <i className="icon-plus"></i>
                                </span>
                            </li>
                            <li className="icon-index6">
                                <span className="icon-box-icon">
                                    <i className="icon-plus"></i>
                                </span>
                            </li>
                            <li className="icon-index7">
                                <span className="icon-box-icon">
                                    <i className="icon-plus"></i>
                                </span>
                            </li>
                        </ul> */}
                    </div>
                </Reveal>
            </div>

            {/* <div className="mb-3"></div> */}

            <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
                <TopCollection products={topProducts} loading={loading} />
                <div className="text-center mb-7 mt-2">
                    <ALink href="#" className="btn btn-outline-darker btn-more"><span>View more</span><i className="icon-long-arrow-right"></i></ALink>
                </div>
            </Reveal>

            {/* <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
                <SpecialCollection products={products} loading={loading} />
            </Reveal> */}
            <div className="deal-container pt-5 mb-5">
                <div className="container">
                    <OwlCarousel adClass="owl-simple owl-light owl-nav-inside" options={dealSlider}>
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="deal">
                                    <div className="deal-content">
                                        <Reveal keyframes={fadeInLeftShorter} delay={200} duration={1000} triggerOnce>
                                            <>
                                                <h4>Limited Quantities</h4>
                                                <h2>Deal of the Day</h2>

                                                <h3 className="product-title">
                                                    <ALink href="#">Check Out</ALink>
                                                </h3>

                                                <div className="product-price">
                                                    <span className="new-price">Dhs. 5000</span>
                                                    <span className="old-price">Was Dhs.7000</span>
                                                </div>

                                                <div className="deal-countdown">
                                                    <Countdown date={`2022-02-01T01:02:03`} renderer={rendererThree} />
                                                </div>

                                                <ALink href="#" className="btn btn-primary">
                                                    <span>Shop Now</span><i className="icon-long-arrow-right"></i>
                                                </ALink>
                                            </>
                                        </Reveal>
                                    </div>

                                    <div className="deal-image position-relative">
                                        <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
                                            <ALink href="#">
                                                <div className="lazy-overlay bg-white"></div>

                                                <LazyLoadImage
                                                    alt="deal-banner"
                                                    src="images/home/deal/ESD61TW-grey.jpg"
                                                    threshold="300"
                                                    effect="blur"
                                                    width="100%"
                                                    height={460}
                                                />
                                            </ALink>
                                        </Reveal>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="banner banner-overlay banner-overlay-light d-none d-lg-block h-100 pb-2">
                                    <ALink href="#" className="h-100">
                                        <div className="lazy-overlay"></div>

                                        <LazyLoadImage
                                            alt="deal-banner"
                                            src="images/home/banners/banner-5.jpg"
                                            threshold="300"
                                            effect="blur"
                                            className="h-100"
                                            width="100%"
                                        />
                                    </ALink>

                                    <div className="banner-content banner-content-top">
                                        <h4 className="banner-subtitle text-white">The Best Choice</h4>
                                        <h3 className="banner-title text-white">Feigelali <br /> Best Sofa</h3>
                                        {/* <div className="banner-text text-primary">$49.99</div> */}
                                        <ALink href="/shop/sidebar/3cols" className="btn btn-outline-light banner-link">Shop Now<i className="icon-long-arrow-right"></i></ALink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="deal">
                                    <div className="deal-content">
                                        <Reveal keyframes={fadeInLeftShorter} delay={200} duration={1000} triggerOnce>
                                            <>
                                                <h4>Limited Quantities</h4>
                                                <h2>Deal of the Day</h2>

                                                <h3 className="product-title">
                                                    <ALink href="#">Check Out</ALink>
                                                </h3>

                                                <div className="product-price">
                                                    <span className="new-price">Dhs. 5000</span>
                                                    <span className="old-price">Was Dhs.7000</span>
                                                </div>

                                                <div className="deal-countdown">
                                                    <Countdown date={`2022-02-01T01:02:03`} renderer={rendererThree} />
                                                </div>

                                                <ALink href="#" className="btn btn-primary">
                                                    <span>Shop Now</span><i className="icon-long-arrow-right"></i>
                                                </ALink>
                                            </>
                                        </Reveal>
                                    </div>

                                    <div className="deal-image position-relative">
                                        <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
                                            <ALink href="#">
                                                <div className="lazy-overlay bg-white"></div>

                                                <LazyLoadImage
                                                    alt="deal-banner"
                                                    src="images/home/deal/ESD61TW-grey.jpg"
                                                    threshold="300"
                                                    effect="blur"
                                                    width="100%"
                                                    height={460}
                                                />
                                            </ALink>
                                        </Reveal>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="banner banner-overlay banner-overlay-light d-none d-lg-block h-100 pb-2">
                                    <ALink href="#" className="h-100">
                                        <div className="lazy-overlay"></div>

                                        <LazyLoadImage
                                            alt="deal-banner"
                                            src="images/home/banners/banner-5.jpg"
                                            threshold="300"
                                            effect="blur"
                                            className="h-100"
                                            width="100%"
                                        />
                                    </ALink>

                                    <div className="banner-content banner-content-top">
                                        <h4 className="banner-subtitle text-white">The Best Choice</h4>
                                        <h3 className="banner-title text-white">Feigelali <br />Best Sofa</h3>
                                        {/* <div className="banner-text text-primary">$49.99</div> */}
                                        <ALink href="/shop/sidebar/3cols" className="btn btn-outline-light banner-link">Shop Now<i className="icon-long-arrow-right"></i></ALink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="deal">
                                    <div className="deal-content">
                                        <Reveal keyframes={fadeInLeftShorter} delay={200} duration={1000} triggerOnce>
                                            <>
                                                <h4>Limited Quantities</h4>
                                                <h2>Deal of the Day</h2>

                                                <h3 className="product-title">
                                                    <ALink href="#">Check Out</ALink>
                                                </h3>

                                                <div className="product-price">
                                                    <span className="new-price">Dhs. 5000</span>
                                                    <span className="old-price">Was Dhs.7000</span>
                                                </div>

                                                <div className="deal-countdown">
                                                    <Countdown date={`2022-02-01T01:02:03`} renderer={rendererThree} />
                                                </div>

                                                <ALink href="#" className="btn btn-primary">
                                                    <span>Shop Now</span><i className="icon-long-arrow-right"></i>
                                                </ALink>
                                            </>
                                        </Reveal>
                                    </div>

                                    <div className="deal-image position-relative">
                                        <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
                                            <ALink href="#">
                                                <div className="lazy-overlay bg-white"></div>

                                                <LazyLoadImage
                                                    alt="deal-banner"
                                                    src="images/home/deal/ESD61TW-grey.jpg"
                                                    threshold="300"
                                                    effect="blur"
                                                    width="100%"
                                                    height={460}
                                                />
                                            </ALink>
                                        </Reveal>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="banner banner-overlay banner-overlay-light d-none d-lg-block h-100 pb-2">
                                    <ALink href="#" className="h-100">
                                        <div className="lazy-overlay"></div>

                                        <LazyLoadImage
                                            alt="deal-banner"
                                            src="images/home/banners/banner-5.jpg"
                                            threshold="300"
                                            effect="blur"
                                            className="h-100"
                                            width="100%"
                                        />
                                    </ALink>

                                    <div className="banner-content banner-content-top">
                                        <h4 className="banner-subtitle text-white">The Best Choice</h4>
                                        <h3 className="banner-title text-white">Feigelali <br />Best Sofa</h3>
                                        {/* <div className="banner-text text-primary">$49.99</div> */}
                                        <ALink href="/shop/sidebar/3cols" className="btn btn-outline-light banner-link">Shop Now<i className="icon-long-arrow-right"></i></ALink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </OwlCarousel>

                </div>
            </div>

            <div className="mb-6"></div>

            <div className="video-banner video-banner-bg bg-image text-center" style={{ backgroundImage: 'url(images/home/VideoSectionBackgroundwithlayerblur.jpg)' }}>
                <div className="container">
                    <Reveal keyframes={fadeInUpShorter} delay={200} duration={1000} triggerOnce style={{ backgroundImage: 'url(images/home/VideoImage.jpg)' }}>
                        <>
                            <h3 className="video-banner-title h1 text-white">
                                {/* <span>New Collection</span> */}
                                <strong>Visit Our Showroom</strong>
                            </h3>
                            <a href="https://bafco.b-cdn.net/videos/2020CIFF.mp4" className="btn-video btn-iframe" onClick={openVideoModal}><i className="icon-play"></i></a>
                        </>
                    </Reveal>
                </div>
            </div>

            <div className="mb-6"></div>

            <BlogCollection posts={posts} loading={loading}></BlogCollection>
            <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
                <div
                    className="footer-newsletter bg-image"
                    style={{ backgroundImage: 'url(images/backgrounds/NewsletterBackground.jpg)' }}
                >
                    <div className="container">
                        <div className="heading text-center">
                            <h3 className="title">Keep in Touch</h3>

                            <p className="title-desc">Join Our Newsletter</p>
                        </div>

                        <div className="row">
                            <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                <form action="#">
                                    <div className="input-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter your Email Address"
                                            aria-label="Email Adress"
                                            aria-describedby="newsletter-btn"
                                            required
                                        />
                                        <div className="input-group-append">
                                            <button
                                                className="btn btn-primary"
                                                type="submit"
                                                id="newsletter-btn"
                                            >
                                                <span>Subscribe</span>
                                                <i className="icon-long-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
            <NewsletterModal />
        </div>
    )
}

// export default withApollo({ ssr: typeof window == 'undefined' })(Home);
export default withApollo({ ssr: typeof window == undefined })(connect(null, { ...demoAction })(Home));