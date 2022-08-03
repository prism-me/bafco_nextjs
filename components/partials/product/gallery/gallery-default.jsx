import { Magnifier } from 'react-image-magnifiers';
import React, { useState, useEffect } from 'react';
import LightBox from 'react-image-lightbox';

function GalleryDefault(props) {
    const { product, adClass = "product-gallery-vertical" } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    useEffect(() => {
        if (product) {
            setIsOpen(false);
            setPhotoIndex(0);
        }
    }, [product])

    function moveNextPhoto() {
        setPhotoIndex((photoIndex + 1) % product?.images.length);
    }

    function movePrevPhoto() {
        setPhotoIndex((photoIndex + product?.images.length - 1) % product?.images.length);
    }

    function openLightBox() {
        let index = parseInt(document.querySelector(".product-main-image").getAttribute("index"));

        if (!index) {
            index = 0;
        }
        setIsOpen(true);
        setPhotoIndex(index);
    }

    function closeLightBox() {
        setIsOpen(false);
    }

    function changeBgImage(e, image, index) {
        let imgs = document.querySelectorAll('.product-main-image img');
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].src = image;
        }

        document.querySelector('.product-image-gallery .active').classList.remove('active');

        document.querySelector('.product-main-image').setAttribute('index', index);
        e.currentTarget.classList.add('active');
    }

    if (!product) {
        return <div></div>
    }

    return (
        <>
            <div className={`product-gallery ${adClass}`}>
                <div className="row m-0">
                    <figure className="product-main-image" index="0">
                        {
                            !product?.in_stock || product?.in_stock == 0 ?
                                <span className="product-label label-out">Out of Stock</span>
                                : ""
                        }

                        <Magnifier
                            imageSrc={product?.images[0].avatar}
                            imageAlt="product"
                            largeImageSrc={product?.images[0].avatar} // Optional
                            dragToMove={false}
                            mouseActivation="hover"
                            cursorStyleActive="crosshair"
                            id="product-zoom"
                            className="zoom-image position-relative overflow-hidden"
                            width={449}
                            height={569}
                            style={{ paddingTop: `${569 / 449 * 100}%` }}
                        />

                        <button id="btn-product-gallery" className="btn-product-gallery" onClick={openLightBox}>
                            <i className="icon-arrows"></i>
                        </button>
                    </figure>

                    <div id="product-zoom-gallery" className="product-image-gallery">
                        {
                            product?.images.map((item, index) =>
                                <button className={`product-gallery-item ${0 === index ? 'active' : ''}`} key={product?.id + '-' + index} onClick={e => changeBgImage(e, `${item.avatar}`, index)}>
                                    <div className="img-wrapper h-100">
                                        <img src={product?.images[index].avatar} alt="product back" />
                                    </div>
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>

            {
                isOpen ?
                    <LightBox
                        mainSrc={product?.images[photoIndex].avatar}
                        nextSrc={product?.images[(photoIndex + 1) % product?.images.length].avatar}
                        prevSrc={product?.images[(photoIndex + product?.images.length - 1) % product?.images.length].avatar}
                        onCloseRequest={closeLightBox}
                        onMovePrevRequest={moveNextPhoto}
                        onMoveNextRequest={movePrevPhoto}
                        reactModalStyle={{
                            overlay: {
                                zIndex: 1041
                            },
                        }
                        }
                    />
                    : ''
            }
        </>
    )
}

export default React.memo(GalleryDefault);