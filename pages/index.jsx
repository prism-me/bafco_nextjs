import { useQuery } from "@apollo/react-hooks";
import { useEffect, useState } from "react";
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
// import { GET_HOME_DATA } from '~/server/queries';
import { attrFilter } from '~/utils';
import { actions as demoAction } from '~/store/demo';
import ProductTwelve from '~/components/features/products/product-twelve';
import { API } from '~/http/API';
// import { productdata } from "../data";
import { toast } from 'react-toastify';
import {
    homeData,
    introSlider,
    brandSlider,
    dealSlider,
    fadeInUpShorter,
    fadeInLeftShorter,
    fadeInRightShorter,
    fadeIn,
    projectRelatedProductsInnerSlider,
    productSlider
} from '~/utils/data';

const axios = require('axios');

// const productdata = [
//     {
//         "id": 107,
//         "name": "2-Seater",
//         "slug": "2-seater",
//         "price": 248,
//         "sale_price": null,
//         "review": 2,
//         "ratings": 5,
//         "until": null,
//         "stock": 0,
//         "top": null,
//         "featured": true,
//         "new": null,
//         "category": [
//             {
//                 "name": "Furniture",
//                 "slug": "furniture",
//                 "__typename": "Category"
//             }
//         ],
//         "sm_pictures": [
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_1_1_300x300_ec128f72cf.jpg",
//                 "__typename": "Media"
//             },
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_1_2_300x300_d265cc4cd6.jpg",
//                 "__typename": "Media"
//             }
//         ],
//         "variants": [],
//         "__typename": "Product"
//     },
//     {
//         "id": 108,
//         "name": "Block Side Table/Trolley",
//         "slug": "block-side-tabletrolley",
//         "price": 210,
//         "sale_price": null,
//         "review": 2,
//         "ratings": 5,
//         "until": null,
//         "stock": 100,
//         "top": null,
//         "featured": true,
//         "new": null,
//         "category": [
//             {
//                 "name": "Coffee & Tables",
//                 "slug": "coffee-and-tables",
//                 "__typename": "Category"
//             },
//             {
//                 "name": "Furniture",
//                 "slug": "furniture",
//                 "__typename": "Category"
//             },
//             {
//                 "name": "Tables",
//                 "slug": "tables",
//                 "__typename": "Category"
//             }
//         ],
//         "sm_pictures": [
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_2_1_300x300_1cbb2b1986.jpg",
//                 "__typename": "Media"
//             },
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_2_2_300x300_798eabaee1.jpg",
//                 "__typename": "Media"
//             }
//         ],
//         "variants": [
//             {
//                 "color": "#669933",
//                 "color_name": "Green",
//                 "price": 210,
//                 "size": [
//                     {
//                         "name": "Medium",
//                         "__typename": "Size"
//                     },
//                     {
//                         "name": "Large",
//                         "__typename": "Size"
//                     }
//                 ],
//                 "__typename": "Variant"
//             },
//             {
//                 "color": "#cc3333",
//                 "color_name": "Red",
//                 "price": 240,
//                 "size": [
//                     {
//                         "name": "Large",
//                         "__typename": "Size"
//                     },
//                     {
//                         "name": "Extra Large",
//                         "__typename": "Size"
//                     }
//                 ],
//                 "__typename": "Variant"
//             }
//         ],
//         "__typename": "Product"
//     },
//     {
//         "id": 109,
//         "name": "Butler Stool Ladder",
//         "slug": "butler-stool-ladder",
//         "price": 25,
//         "sale_price": 20,
//         "review": 2,
//         "ratings": 3,
//         "until": "2022-01-01",
//         "stock": 100,
//         "top": true,
//         "featured": true,
//         "new": null,
//         "category": [
//             {
//                 "name": "Furniture",
//                 "slug": "furniture",
//                 "__typename": "Category"
//             }
//         ],
//         "sm_pictures": [
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "images/products/GeneModularSofa.png",
//                 "__typename": "Media"
//             },
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "images/products/GeneModularSofa.png",
//                 "__typename": "Media"
//             }
//         ],
//         "variants": [],
//         "__typename": "Product"
//     },
//     {
//         "id": 110,
//         "name": "Can 2-Seater Sofa",
//         "slug": "can-2-seater-sofa",
//         "price": 60,
//         "sale_price": null,
//         "review": 2,
//         "ratings": 2,
//         "until": null,
//         "stock": 100,
//         "top": true,
//         "featured": true,
//         "new": null,
//         "category": [
//             {
//                 "name": "Furniture",
//                 "slug": "furniture",
//                 "__typename": "Category"
//             }
//         ],
//         "sm_pictures": [
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_4_1_300x300_aec4741c63.jpg",
//                 "__typename": "Media"
//             },
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_4_2_300x300_ec63a5f054.jpg",
//                 "__typename": "Media"
//             }
//         ],
//         "variants": [],
//         "__typename": "Product"
//     },
//     {
//         "id": 111,
//         "name": "Roots Sofa Bed",
//         "slug": "roots-sofa-bed",
//         "price": 449,
//         "sale_price": null,
//         "review": 2,
//         "ratings": 2,
//         "until": "2022-01-01",
//         "stock": 100,
//         "top": true,
//         "featured": null,
//         "new": null,
//         "category": [
//             {
//                 "name": "Furniture",
//                 "slug": "furniture",
//                 "__typename": "Category"
//             }
//         ],
//         "sm_pictures": [
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_11_1_300x300_574a1b1d0e.jpg",
//                 "__typename": "Media"
//             },
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_11_2_300x300_8f906c2dcd.jpg",
//                 "__typename": "Media"
//             }
//         ],
//         "variants": [],
//         "__typename": "Product"
//     },
//     {
//         "id": 112,
//         "name": "Carronade Table Lamp",
//         "slug": "carronade-table-lamp",
//         "price": 130,
//         "sale_price": null,
//         "review": 2,
//         "ratings": 4,
//         "until": null,
//         "stock": 100,
//         "top": null,
//         "featured": true,
//         "new": true,
//         "category": [
//             {
//                 "name": "WORKSPACE",
//                 "slug": "workspace",
//                 "__typename": "Category"
//             },
//             {
//                 "name": "Electronics",
//                 "slug": "electronics",
//                 "__typename": "Category"
//             },
//             {
//                 "name": "Lighting",
//                 "slug": "lighting",
//                 "__typename": "Category"
//             }
//         ],
//         "sm_pictures": [
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_6_1_300x300_aea55d68e9.jpg",
//                 "__typename": "Media"
//             },
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_6_2_300x300_76886659e2.jpg",
//                 "__typename": "Media"
//             }
//         ],
//         "variants": [
//             {
//                 "color": "#cc3333",
//                 "color_name": "Red",
//                 "price": 150,
//                 "size": [
//                     {
//                         "name": "Large",
//                         "__typename": "Size"
//                     },
//                     {
//                         "name": "Extra Small",
//                         "__typename": "Size"
//                     }
//                 ],
//                 "__typename": "Variant"
//             },
//             {
//                 "color": "#f0c04a",
//                 "color_name": "Yellow",
//                 "price": 130,
//                 "size": [
//                     {
//                         "name": "Small",
//                         "__typename": "Size"
//                     },
//                     {
//                         "name": "Large",
//                         "__typename": "Size"
//                     },
//                     {
//                         "name": "Extra Large",
//                         "__typename": "Size"
//                     }
//                 ],
//                 "__typename": "Variant"
//             },
//             {
//                 "color": "#669933",
//                 "color_name": "Green",
//                 "price": 110,
//                 "size": [
//                     {
//                         "name": "Large",
//                         "__typename": "Size"
//                     }
//                 ],
//                 "__typename": "Variant"
//             }
//         ],
//         "__typename": "Product"
//     },
//     {
//         "id": 113,
//         "name": "Cushion Set 3 Pieces",
//         "slug": "cushion-set-3-pieces",
//         "price": 199,
//         "sale_price": null,
//         "review": 2,
//         "ratings": 0,
//         "until": null,
//         "stock": 100,
//         "top": null,
//         "featured": true,
//         "new": null,
//         "category": [
//             {
//                 "name": "WORKSPACE",
//                 "slug": "workspace",
//                 "__typename": "Category"
//             },
//             {
//                 "name": "Beds",
//                 "slug": "beds",
//                 "__typename": "Category"
//             }
//         ],
//         "sm_pictures": [
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_7_1_300x300_298b73e706.jpg",
//                 "__typename": "Media"
//             },
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_7_2_300x300_6e6c2d02d3.jpg",
//                 "__typename": "Media"
//             }
//         ],
//         "variants": [],
//         "__typename": "Product"
//     },
//     {
//         "id": 114,
//         "name": "Flow Slim Armchair",
//         "slug": "flow-slim-armchair",
//         "price": 97,
//         "sale_price": null,
//         "review": 2,
//         "ratings": 3,
//         "until": null,
//         "stock": 100,
//         "top": true,
//         "featured": null,
//         "new": null,
//         "category": [
//             {
//                 "name": "Furniture",
//                 "slug": "furniture",
//                 "__typename": "Category"
//             },
//             {
//                 "name": "Armchairs & Chaises",
//                 "slug": "armchairs-and-chaises",
//                 "__typename": "Category"
//             }
//         ],
//         "sm_pictures": [
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_8_1_300x300_ffd8a22d4a.jpg",
//                 "__typename": "Media"
//             },
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_8_2_300x300_aef1526120.jpg",
//                 "__typename": "Media"
//             },
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_8_3_300x300_cf0af19cb3.jpg",
//                 "__typename": "Media"
//             }
//         ],
//         "variants": [],
//         "__typename": "Product"
//     },
//     {
//         "id": 115,
//         "name": "Gene Modular Sofa",
//         "slug": "gene-modular-sofa",
//         "price": 308,
//         "sale_price": 250,
//         "review": 2,
//         "ratings": 3,
//         "until": null,
//         "stock": 100,
//         "top": true,
//         "featured": null,
//         "new": null,
//         "category": [
//             {
//                 "name": "WORKSPACE",
//                 "slug": "workspace",
//                 "__typename": "Category"
//             },
//             {
//                 "name": "Furniture",
//                 "slug": "furniture",
//                 "__typename": "Category"
//             }
//         ],
//         "sm_pictures": [
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "images/products/GeneModularSofa.png",
//                 "__typename": "Media"
//             },
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "images/products/GeneModularSofa.png",
//                 "__typename": "Media"
//             }
//         ],
//         "variants": [],
//         "__typename": "Product"
//     },
//     {
//         "id": 116,
//         "name": "Garden Armchair",
//         "slug": "garden-armchair",
//         "price": 94,
//         "sale_price": null,
//         "review": 2,
//         "ratings": 5,
//         "until": null,
//         "stock": 100,
//         "top": true,
//         "featured": null,
//         "new": null,
//         "category": [
//             {
//                 "name": "WORKSPACE",
//                 "slug": "workspace",
//                 "__typename": "Category"
//             },
//             {
//                 "name": "Furniture",
//                 "slug": "furniture",
//                 "__typename": "Category"
//             },
//             {
//                 "name": "Armchairs & Chaises",
//                 "slug": "armchairs-and-chaises",
//                 "__typename": "Category"
//             }
//         ],
//         "sm_pictures": [
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_10_2_300x300_4ef184c8b8.jpg",
//                 "__typename": "Media"
//             },
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_10_1_300x300_76e829e2ec.jpg",
//                 "__typename": "Media"
//             }
//         ],
//         "variants": [
//             {
//                 "color": "#333333",
//                 "color_name": "Black",
//                 "price": 90,
//                 "size": [
//                     {
//                         "name": "Extra Small",
//                         "__typename": "Size"
//                     },
//                     {
//                         "name": "Small",
//                         "__typename": "Size"
//                     },
//                     {
//                         "name": "Large",
//                         "__typename": "Size"
//                     }
//                 ],
//                 "__typename": "Variant"
//             },
//             {
//                 "color": "#999999",
//                 "color_name": "Grey",
//                 "price": 100,
//                 "size": [
//                     {
//                         "name": "Extra Small",
//                         "__typename": "Size"
//                     },
//                     {
//                         "name": "Large",
//                         "__typename": "Size"
//                     },
//                     {
//                         "name": "Extra Large",
//                         "__typename": "Size"
//                     }
//                 ],
//                 "__typename": "Variant"
//             }
//         ],
//         "__typename": "Product"
//     },
//     {
//         "id": 117,
//         "name": "Carronade Large Suspension Lamp",
//         "slug": "carronade-large-suspension-lamp",
//         "price": 341,
//         "sale_price": null,
//         "review": 2,
//         "ratings": 1,
//         "until": null,
//         "stock": 100,
//         "top": true,
//         "featured": null,
//         "new": null,
//         "category": [
//             {
//                 "name": "Lighting",
//                 "slug": "lighting",
//                 "__typename": "Category"
//             }
//         ],
//         "sm_pictures": [
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_5_1_300x300_1dc848bfc9.jpg",
//                 "__typename": "Media"
//             },
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_5_2_300x300_5fe4a7e523.jpg",
//                 "__typename": "Media"
//             }
//         ],
//         "variants": [],
//         "__typename": "Product"
//     },
//     {
//         "id": 118,
//         "name": "Petite Table Lamp",
//         "slug": "petite-table-lamp",
//         "price": 65,
//         "sale_price": null,
//         "review": 2,
//         "ratings": 5,
//         "until": null,
//         "stock": 100,
//         "top": true,
//         "featured": null,
//         "new": null,
//         "category": [
//             {
//                 "name": "Lighting",
//                 "slug": "lighting",
//                 "__typename": "Category"
//             }
//         ],
//         "sm_pictures": [
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_12_1_300x300_b966955471.jpg",
//                 "__typename": "Media"
//             },
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_12_3_300x300_5762cc36c5.jpg",
//                 "__typename": "Media"
//             },
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_12_2_300x300_dd9ba0a9be.jpg",
//                 "__typename": "Media"
//             }
//         ],
//         "variants": [
//             {
//                 "color": "#3399cc",
//                 "color_name": "Blue",
//                 "price": 69,
//                 "size": [
//                     {
//                         "name": "Medium",
//                         "__typename": "Size"
//                     },
//                     {
//                         "name": "Large",
//                         "__typename": "Size"
//                     }
//                 ],
//                 "__typename": "Variant"
//             },
//             {
//                 "color": "#cc3333",
//                 "color_name": "Red",
//                 "price": 65,
//                 "size": [
//                     {
//                         "name": "Small",
//                         "__typename": "Size"
//                     },
//                     {
//                         "name": "Medium",
//                         "__typename": "Size"
//                     },
//                     {
//                         "name": "Extra Large",
//                         "__typename": "Size"
//                     },
//                     {
//                         "name": "Extra Small",
//                         "__typename": "Size"
//                     }
//                 ],
//                 "__typename": "Variant"
//             },
//             {
//                 "color": "#ebfa00",
//                 "color_name": "Yellow",
//                 "price": 73,
//                 "size": [
//                     {
//                         "name": "Medium",
//                         "__typename": "Size"
//                     },
//                     {
//                         "name": "Large",
//                         "__typename": "Size"
//                     }
//                 ],
//                 "__typename": "Variant"
//             }
//         ],
//         "__typename": "Product"
//     },
//     {
//         "id": 119,
//         "name": "Madra Log Holder",
//         "slug": "madra-log-holder",
//         "price": 40,
//         "sale_price": null,
//         "review": 2,
//         "ratings": 3,
//         "until": null,
//         "stock": 100,
//         "top": true,
//         "featured": null,
//         "new": true,
//         "category": [
//             {
//                 "name": "Decor",
//                 "slug": "decor",
//                 "__typename": "Category"
//             },
//             {
//                 "name": "Storage Boxes & Baskets",
//                 "slug": "storage-boxes-and-baskets",
//                 "__typename": "Category"
//             },
//             {
//                 "name": "Kitchen Cabinets",
//                 "slug": "kitchen-cabinets",
//                 "__typename": "Category"
//             }
//         ],
//         "sm_pictures": [
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_13_1_300x300_338f481ae5.jpg",
//                 "__typename": "Media"
//             },
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_13_2_300x300_c669393809.jpg",
//                 "__typename": "Media"
//             }
//         ],
//         "variants": [],
//         "__typename": "Product"
//     },
//     {
//         "id": 120,
//         "name": "Original Outdoor Beanbag",
//         "slug": "original-outdoor-beanbag",
//         "price": 80,
//         "sale_price": null,
//         "review": 2,
//         "ratings": 4,
//         "until": null,
//         "stock": 100,
//         "top": true,
//         "featured": null,
//         "new": null,
//         "category": [
//             {
//                 "name": "Storage Boxes & Baskets",
//                 "slug": "storage-boxes-and-baskets",
//                 "__typename": "Category"
//             },
//             {
//                 "name": "Decor",
//                 "slug": "decor",
//                 "__typename": "Category"
//             },
//             {
//                 "name": "WORKSPACE",
//                 "slug": "workspace",
//                 "__typename": "Category"
//             },
//             {
//                 "name": "Beds",
//                 "slug": "beds",
//                 "__typename": "Category"
//             }
//         ],
//         "sm_pictures": [
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_14_1_300x300_627d43a050.jpg",
//                 "__typename": "Media"
//             },
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_14_2_300x300_2154bc1dd6.jpg",
//                 "__typename": "Media"
//             },
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_14_3_300x300_011cc9330f.jpg",
//                 "__typename": "Media"
//             },
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_14_4_300x300_84aa7cc3d2.jpg",
//                 "__typename": "Media"
//             }
//         ],
//         "variants": [],
//         "__typename": "Product"
//     },
//     {
//         "id": 121,
//         "name": "Windback Chair",
//         "slug": "windback-chair",
//         "price": 199,
//         "sale_price": null,
//         "review": 2,
//         "ratings": 3,
//         "until": null,
//         "stock": 100,
//         "top": null,
//         "featured": null,
//         "new": null,
//         "category": [
//             {
//                 "name": "Sofas & Sleeper Sofas",
//                 "slug": "sofas-and-sleeper-sofas",
//                 "__typename": "Category"
//             },
//             {
//                 "name": "Decor",
//                 "slug": "decor",
//                 "__typename": "Category"
//             },
//             {
//                 "name": "Armchairs & Chaises",
//                 "slug": "armchairs-and-chaises",
//                 "__typename": "Category"
//             }
//         ],
//         "sm_pictures": [
//             {
//                 "width": 300,
//                 "height": 300,
//                 "url": "https://d-themes.com/react_asset_api/molla/uploads/product_15_1_300x300_d63bee55db.jpg",
//                 "__typename": "Media"
//             }
//         ],
//         "variants": [],
//         "__typename": "Product"
//     }
// ];

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
    // const { data, loading, error } = useQuery(GET_HOME_DATA);
    // const products = data && data.homeData.products;
    // const topProducts = attrFilter(data && data.homeData.products, 'top');
    // const topProducts = attrFilter(productdata && productdata, 'top');
    // const posts = data && data.homeData.posts;
    const posts = postsdata && postsdata;
    const [homedata, setHomedata] = useState();
    const [bloglist, setBlogList] = useState();
    const [productList, setProductList] = useState();
    const [email, setEmail] = useState("");
    // const [selectedCategory, setSelectedCategory] = useState('executive-chairs');

    function openVideoModal(e) {
        e.preventDefault();
        props?.showVideo();
    }

    // if (error) {
    //     return <div></div>
    // }
    useEffect(() => {

        API.get(`/home`).then((response) => {
            setHomedata(response.data.pages.content)
            setBlogList(response.data.blogs)
        }).catch((err) => {
            console.log(err);
        });

        API.get(`/top-selling-products`)
            .then((response) => {
                console.log(response)
                setProductList(response?.data)
            })
            .catch((err) => {
                console.log(err);
            });

    }, [])

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handleSubmit() {
        if (email === '') {
            alert('Please enter a email before submitting.');
            return;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            alert("Invalid email address.");
            return;
        }
        let formdata = {
            'email': email
        }
        API.post(`/subscriber`, formdata).then((response) => {
            if (response?.status === 200) {
                toast.success(response?.data)
            } else {
                toast.error("Please fill in the required fields.");
            }
        }).catch((error) => {
            toast.error("Somthing went wrong !");
        });
    }


    return (
        <div className="main home-page skeleton-body">
            <div className="intro-slider-container">
                <OwlCarousel adclassName="owl-simple owl-light owl-nav-inside" options={introSlider}>
                    {homedata?.banner?.map((item, index) => (
                        <div className={`intro-slide slide1`} key={index} style={{ backgroundColor: '#EDF2F0', backgroundImage: `url(${item.image !== "" ? item.image : 'images/home/Magic7.jpg'})` }}>
                            <div className="container intro-content">
                                <Reveal keyframes={fadeInUpShorter} delay="100%" duration={1000}>
                                    <>
                                        <h3 className="intro-subtitle">{item.sub_heading}</h3>
                                        <h1 className="intro-title">{item.heading}</h1>

                                        <ALink href="#" className="btn btn-dark btn-outline-darker">
                                            <span>Design My Desk</span>
                                            <i className="icon-long-arrow-right"></i>
                                        </ALink>
                                    </>
                                </Reveal>
                            </div>
                        </div>
                    ))}
                </OwlCarousel>
            </div>

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
                                        <h3 className="icon-box-title">{homedata?.contact[0]?.text}</h3>

                                        <p><a href={`tel:${homedata?.contact[0]?.value}`} style={{ color: '#fff' }}>{homedata?.contact[0]?.value}</a></p>
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
                                        <h3 className="icon-box-title">{homedata?.contact[1]?.text}</h3>

                                        <p><a href={`https://wa.me/${homedata?.contact[1]?.value?.replace(/\s+/g, '')}`} style={{ color: '#fff' }}>{homedata?.contact[1]?.value}</a></p>
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
                                        <h3 className="icon-box-title">{homedata?.contact[2]?.text}</h3>

                                        <p><a href="/pages/contact" style={{ color: '#fff' }}>{homedata?.contact[2]?.value}</a></p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </div >

            <div className="mb-3 mb-lg-5"></div>

            <div className="banner-group">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-lg-5">
                            <Reveal keyframes={fadeInLeftShorter} delay={150} duration={1000} triggerOnce>
                                <div className="banner banner-large banner-overlay banner-overlay-light banner-lg banner-1 lazy-media">
                                    <div className="lazy-overlay"></div>

                                    {/* <LazyLoadImage
                                        alt="banner"
                                        src={homedata?.collections[0]?.image}
                                        threshold={200}
                                        width="100%"
                                        height="auto"
                                        effect="blur"
                                    /> */}
                                    <img src={homedata?.collections[0]?.image} alt="banner" />

                                    <div className="banner-content banner-content-top">
                                        <h4 className="banner-subtitle">{homedata?.collections[0]?.sub_heading}</h4>
                                        <h3 className="banner-title">{homedata?.collections[0]?.heading}</h3>
                                        <div className="banner-text">{homedata?.collections[0]?.starting_from}</div>
                                        <ALink href="#" className="btn btn-outline-gray banner-link">View All Workstations <i className="icon-long-arrow-right"></i></ALink>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div className="col-sm-6 col-lg-3">
                            <Reveal keyframes={fadeIn} delay={150} duration={1000} triggerOnce>
                                <div className="banner banner-overlay banner-lg banner-2 lazy-media">
                                    <div className="lazy-overlay"></div>

                                    {/* <LazyLoadImage
                                        alt="banner"
                                        src={homedata?.collections[1]?.image}
                                        threshold={200}
                                        height="auto"
                                        width="100%"
                                        effect="blur"
                                    /> */}

                                    <img src={homedata?.collections[1]?.image} alt="banner" />

                                    <div className="banner-content banner-content-top">
                                        <h4 className="banner-subtitle text-grey">{homedata?.collections[1]?.sub_heading}</h4>
                                        <h3 className="banner-title text-white">{homedata?.collections[1]?.heading}</h3>
                                        {/* <div className="banner-text text-white">from $39.99</div> */}
                                        <ALink href="#" className="btn btn-outline-white banner-link">View All Chairs <i className="icon-long-arrow-right"></i></ALink>
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

                                            {/* <LazyLoadImage
                                                alt="banner"
                                                src={homedata?.collections[2]?.image}
                                                threshold={200}
                                                height="auto"
                                                width="100%"
                                                effect="blur"
                                            /> */}
                                            <img src={homedata?.collections[2]?.image} alt="banner" />

                                            <div className="banner-content banner-content-top">
                                                <h4 className="banner-subtitle">{homedata?.collections[2]?.sub_heading}</h4>
                                                <h3 className="banner-title">{homedata?.collections[2]?.heading}</h3>
                                                <ALink href="#" className="btn btn-outline-gray banner-link">View All Desks <i className="icon-long-arrow-right"></i></ALink>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-6 col-sm-6">
                                        <div className="banner banner-4 banner-overlay banner-overlay-light lazy-media">
                                            <div className="lazy-overlay"></div>

                                            {/* <LazyLoadImage
                                                alt="banner"
                                                src={homedata?.collections[3]?.image}
                                                threshold={200}
                                                width="100%"
                                                height="auto"
                                                effect="blur"
                                            /> */}
                                            <img src={homedata?.collections[3]?.image} alt="banner" />

                                            <div className="banner-content banner-content-top">
                                                <h4 className="banner-subtitle text-grey">{homedata?.collections[3]?.sub_heading}</h4>
                                                <h3 className="banner-title text-white">{homedata?.collections[3]?.heading}</h3>
                                                {/* <div className="banner-text">up to 30% off</div> */}
                                                <ALink href="#" className="btn btn-outline-white banner-link">View All Sofa <i className="icon-long-arrow-right"></i></ALink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </div>

            <div className="our-projects text-center">
                <div className="heading heading-center mb-3">
                    <h2 className="title">{homedata?.projects?.heading}</h2>
                    <h5>{homedata?.projects?.sub_heading}</h5>
                </div>
                <Reveal keyframes={fadeInUpShorter} delay={200} duration={1000} triggerOnce>
                    <div className="projects-list">
                        <img src={homedata?.projects?.image} alt="slide" />
                    </div>
                    <div className="text-center mb-7 mt-2">
                        <ALink href="/project-references/" className="btn btn-outline-darker btn-more"><span>View All Projects</span><i className="icon-long-arrow-right"></i></ALink>
                    </div>
                </Reveal>
            </div>

            <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
                {/* <TopCollection categories={categoryList} products={productList} setIsSelectedCategory={setSelectedCategory} loading={loading} /> */}
                <div className="container mb-7">
                    <div className="heading heading-center mb-3">
                        <h2 className="title">Top Seller</h2>
                    </div>
                    <div className="products">
                        <div className="row">
                            <OwlCarousel adClass="owl-simple carousel-with-shadow cols-xxl-6 cols-xl-5 cols-lg-4 cols-md-3 cols-xs-2" options={productSlider}>
                                {productList?.length > 0 ?
                                    productList?.map((item1, index1) =>
                                        <div className="slide1" key={index1}>
                                            <ProductTwelve
                                                product={item1}
                                                categoryName={item1?.product_category?.parent_category?.route}
                                                subCategoryName={item1?.product_category?.route}
                                            />
                                        </div>
                                    ) :
                                    <p style={{ fontSize: '20px', textAlign: 'center', fontWeight: 'bold', display: 'block', width: '100%' }}>No product found.</p>
                                }
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
                {/* <div className="text-center mb-7 mt-2">
                    <ALink href="#" className="btn btn-outline-darker btn-more"><span>View more</span><i className="icon-long-arrow-right"></i></ALink>
                </div> */}
            </Reveal>
            {homedata?.deal?.length > 0 &&
                <div className="deal-container pt-5 mb-5">
                    <div className="container">
                        <OwlCarousel adclassName="owl-simple owl-light owl-nav-inside" options={dealSlider}>
                            {homedata?.deal?.map((item, index) => (
                                <div className="row" key={index}>
                                    <div className="col-lg-9">
                                        <div className="deal">
                                            <div className="deal-content">
                                                <Reveal keyframes={fadeInLeftShorter} delay={200} duration={1000} triggerOnce>
                                                    <>
                                                        <h4>{item.sub_heading_image1}</h4>
                                                        <h2>{item.heading_image1}</h2>

                                                        <h3 className="product-title">
                                                            <ALink href="#">Check Out</ALink>
                                                        </h3>

                                                        <div className="product-price">
                                                            <span className="new-price">{item?.new_price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                                            <span className="old-price">{item?.old_price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                                        </div>

                                                        <div className="deal-countdown">
                                                            {/* <Countdown date={`2022-08-01T01:02:03`} renderer={rendererThree} /> */}
                                                            <Countdown date={item.expires_in} renderer={rendererThree} />
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
                                                            src={item.slider_images.main_image}
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
                                        <div className="banner banner-overlay banner-overlay-light d-none d-lg-block pb-2">
                                            <ALink href="#"
                                            // className="h-100"
                                            >
                                                <div className="lazy-overlay"></div>

                                                <LazyLoadImage
                                                    alt="deal-banner"
                                                    src={item.slider_images.sub_image}
                                                    threshold="300"
                                                    effect="blur"
                                                    // className="h-100"
                                                    width="100%"
                                                />
                                            </ALink>

                                            <div className="banner-content banner-content-top">
                                                <h4 className="banner-subtitle text-white">{item.sub_heading_image2}</h4>
                                                <h3 className="banner-title text-white">{item.heading_image2}</h3>
                                                {/* <div className="banner-text text-primary">$49.99</div> */}
                                                <ALink href="/" className="btn btn-outline-light banner-link">Shop Now<i className="icon-long-arrow-right"></i></ALink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </OwlCarousel>

                    </div>
                </div>
            }

            <div className="mb-6"></div>

            <div className="video-banner video-banner-bg bg-image text-center" style={{ backgroundImage: `url(${homedata?.video?.icon})` }}>
                <div className="container">
                    <Reveal keyframes={fadeInUpShorter} delay={200} duration={1000} triggerOnce style={{ backgroundImage: `url(${homedata?.video?.icon})` }}>
                        <>
                            <h3 className="video-banner-title h1 text-white">
                                {/* <span>New Collection</span> */}
                                <strong>{homedata?.video?.heading}</strong>
                            </h3>
                            <a href={homedata?.video?.link} className="btn-video btn-iframe" onClick={openVideoModal}><i className="icon-play"></i></a>
                        </>
                    </Reveal>
                </div>
            </div>

            <div className="mb-6"></div>

            <BlogCollection posts={bloglist} ></BlogCollection>

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
                                            name="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            className="form-control"
                                            placeholder="Enter your Email Address"
                                            aria-label="Email Adress"
                                            aria-describedby="newsletter-btn"
                                            required
                                        />
                                        <div className="input-group-append">
                                            <button
                                                className="btn btn-primary"
                                                type="button"
                                                id="newsletter-btn"
                                                onClick={handleSubmit}
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
        </div >
    )
}

// export default Home;
export default connect(null, { ...demoAction })(Home);