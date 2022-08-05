import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import SlideToggle from 'react-slide-toggle';

import ALink from '~/components/features/alink';
import Qty from '~/components/features/qty';

import { actions as wishlistAction } from '~/store/wishlist';
import { actions as cartAction } from '~/store/cart';

import { canAddToCart, isInWishlist } from '~/utils';

function DetailOne(props) {
    const router = useRouter();
    const ref = useRef(null);
    const { product } = props;
    // const [qty, setQty] = useState(1);
    // const [qty2, setQty2] = useState(1);
    // const [colorArray, setColorArray] = useState([]);
    // const [sizeArray, setSizeArray] = useState([]);
    // const [variationGroup, setVariationGroup] = useState([]);
    // const [selectedVariant, setSelectedVariant] = useState({ color: null, colorName: null, price: null, size: "" });
    // const [showClear, setShowClear] = useState(false);
    // const [showVariationPrice, setShowVariationPrice] = useState(false);
    // const [maxPrice, setMaxPrice] = useState(product?.product_single_variation?.product_variation_details?.upper_price);
    // const [minPrice, setMinPrice] = useState(product?.product_single_variation?.product_variation_details?.lower_price);

    // useEffect(() => {
    //     window.addEventListener('scroll', scrollHandler, { passive: true });

    //     return () => { window.removeEventListener('scroll', scrollHandler); }

    // }, [])

    // useEffect(() => {
    //     let min = 99999;
    //     let max = 0;

    //     setVariationGroup(product.variations.reduce((acc, cur) => {
    //         cur.variationItems.map(item => {
    //             acc.push({
    //                 color: cur.color,
    //                 colorName: cur.color_name,
    //                 size: item.name,
    //                 price: cur.price
    //             });
    //         });
    //         if (min > cur.price) min = cur.lower_price;
    //         if (max < cur.price) max = cur.upper_price;
    //         return acc;
    //     }, []));

    //     setMinPrice(min);
    //     setMaxPrice(max);
    // }, [product])

    // useEffect(() => {
    //     setSelectedVariant({ color: null, colorName: null, price: null, size: "" });
    //     setQty(1);
    //     setQty2(1);
    // }, [router.query.slug])

    // useEffect(() => {
    //     refreshSelectableGroup();
    // }, [variationGroup, selectedVariant])

    // useEffect(() => {
    //     scrollHandler();
    // }, [router.pathname])

    // useEffect(() => {
    //     setShowClear((selectedVariant.color || selectedVariant.size != "") ? true : false);
    //     setShowVariationPrice((selectedVariant.color && selectedVariant.size != "") ? true : false);
    //     let toggle = ref.current.querySelector('.variation-toggle');

    //     if (toggle) {
    //         if ((selectedVariant.color && selectedVariant.size != "") && toggle.classList.contains('collapsed')) {
    //             toggle.click();
    //         }

    //         if ((!(selectedVariant.color && selectedVariant.size != "")) && !toggle.classList.contains('collapsed')) {
    //             toggle.click();
    //         }
    //     }
    // }, [selectedVariant])

    // function scrollHandler() {
    //     if (router.pathname.includes('/product/default')) {
    //         let stickyBar = ref.current.querySelector('.sticky-bar');
    //         if (stickyBar.classList.contains('d-none') && ref.current.getBoundingClientRect().bottom < 0) {
    //             stickyBar.classList.remove('d-none');
    //             return;
    //         }
    //         if (!stickyBar.classList.contains('d-none') && ref.current.getBoundingClientRect().bottom > 0) {
    //             stickyBar.classList.add('d-none');
    //         }
    //     }
    // }

    // function onWishlistClick(e) {
    //     e.preventDefault();
    //     if (!isInWishlist(props.wishlist, product)) {
    //         props.addToWishlist(product);
    //     } else {
    //         router.push('/pages/wishlist');
    //     }
    // }

    // function refreshSelectableGroup() {
    //     let tempArray = [...variationGroup];
    //     if (selectedVariant.color) {
    //         tempArray = variationGroup.reduce((acc, cur) => {
    //             if (selectedVariant.color !== cur.color) {
    //                 return acc;
    //             }
    //             return [...acc, cur];
    //         }, []);
    //     }

    //     setSizeArray(tempArray.reduce((acc, cur) => {
    //         if (acc.findIndex(item => item.size == cur.size) !== -1)
    //             return acc;
    //         return [...acc, cur];
    //     }, []));

    //     tempArray = [...variationGroup];
    //     if (selectedVariant.size) {
    //         tempArray = variationGroup.reduce((acc, cur) => {
    //             if (selectedVariant.size !== cur.size) {
    //                 return acc;
    //             }
    //             return [...acc, cur];
    //         }, []);
    //     }

    //     setColorArray(product?.variations?.reduce((acc, cur) => {
    //         if (
    //             tempArray.findIndex(item => item.color == cur.color) == -1
    //         ) {
    //             return [
    //                 ...acc,
    //                 {
    //                     color: cur.color,
    //                     colorName: cur.color_name,
    //                     price: cur.price,
    //                     disabled: true
    //                 }
    //             ];
    //         }
    //         return [
    //             ...acc,
    //             {
    //                 color: cur.color,
    //                 colorName: cur.color_name,
    //                 price: cur.price,
    //                 disabled: false
    //             }
    //         ];
    //     }, []));
    // }

    // function selectColor(e, item) {
    //     e.preventDefault()
    //     if (item.color == selectedVariant.color) {
    //         setSelectedVariant({
    //             ...selectedVariant,
    //             color: null,
    //             colorName: null,
    //             price: item.price
    //         });
    //     } else {
    //         setSelectedVariant({
    //             ...selectedVariant,
    //             color: item.color,
    //             colorName: item.colorName,
    //             price: item.price
    //         });
    //     }
    // }

    // function selectSize(e) {
    //     if (e.target.value == "") {
    //         setSelectedVariant({ ...selectedVariant, size: "" });
    //     } else {
    //         setSelectedVariant({ ...selectedVariant, size: e.target.value });
    //     }
    // }

    // function onChangeQty(current) {
    //     setQty(current);
    // }

    // function onChangeQty2(current) {
    //     setQty2(current);
    // }

    // function clearSelection(e) {
    //     e.preventDefault();
    //     setSelectedVariant(({
    //         ...selectedVariant,
    //         color: null,
    //         colorName: null,
    //         size: ""
    //     }));
    //     refreshSelectableGroup();
    // }

    // function onCartClick(e, index = 0) {
    //     e.preventDefault();
    //     if (e.currentTarget.classList.contains('btn-disabled')) return;

    //     let newProduct = { ...product };
    //     if (product?.variations?.length > 0) {
    //         newProduct = {
    //             ...product,
    //             name:
    //                 product.name +
    //                 ' - ' +
    //                 selectedVariant.colorName +
    //                 ', ' +
    //                 selectedVariant.size,
    //             price: selectedVariant.price
    //         };
    //     }
    //     props.addToCart(
    //         newProduct,
    //         index == 0 ? qty : qty2
    //     );
    // }

    if (!product) {
        return <div></div>;
    }

    return (
        <div className="product-details" ref={ref}>
            {console.log("product :: ", product)}
            <h1 className="product-title">{product?.single_product_details?.product?.name}</h1>

            <div className="ratings-container">
                <div className="ratings">
                    <div className="ratings-val" style={{ width: 70 * 20 + '%' }}></div>
                    <span className="tooltip-text">{70}</span>
                </div>
                <span className="ratings-text">( {70} Reviews )</span>

            </div>
            <div className="product-price">
                <span className="new-price">Dhs. {product?.product_single_variation?.product_variation_details?.lower_price}</span>
            </div>
            <div className="product-content">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            {/* <div className="product-content" dangerouslySetInnerHTML={{ __html: product?.single_product_details?.product?.short_description }} /> */}
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        cartlist: state.cartlist.data,
        wishlist: state.wishlist.data,
    }
}

export default connect(mapStateToProps, { ...wishlistAction, ...cartAction })(DetailOne);
