import { useEffect, useState} from "react";
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import 'react-image-lightbox/style.css';
import 'react-toastify/dist/ReactToastify.min.css';
import Header from "./partials/header/header";
import Footer from "./partials/footer/footer";
import VideoModal from "./features/modals/video-modal";
import QuickViewModal from "./features/modals/quickview-modal";
import MobileMenu from "./features/mobile-menu";
import { API } from "~/http/API";
import { actions } from '../store/demo';
import { isSafariBrowser, isEdgeBrowser } from "~/utils";

function Layout({ children, hideQuick, hideVideo }) {
    const router = useRouter("");
    let scrollTop;
    const [categoryList, setCategoryList] = useState();

    useEffect(() => {
        if (router.pathname.includes('pages/coming-soon')) {
            document.querySelector("header").classList.add("d-none");
            document.querySelector("footer").classList.add("d-none");
        } else {
            document.querySelector("header").classList.remove("d-none");
            document.querySelector("footer").classList.remove("d-none");
        }
    }, [router.pathname])

    useEffect(() => {
        hideQuick();
        hideVideo();
        scrollTop = document.querySelector('#scroll-top');
        window.addEventListener('scroll', scrollHandler, false);

        API.get(`header-category`).then((response) => {

            setCategoryList(response?.data)

        }).catch((err) => {
            console.log(err);
        });

    }, [])

    function toScrollTop() {
        if (isSafariBrowser() || isEdgeBrowser()) {
            let pos = window.pageYOffset;
            let timerId = setInterval(() => {
                if (pos <= 0) clearInterval(timerId);
                window.scrollBy(0, -120);
                pos -= 120;
            }, 1);
        }   else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    function scrollHandler() {
        if (window.pageYOffset >= 400) {
            scrollTop.classList.add('show');
        } else {
            scrollTop.classList.remove('show');
        }
    }

    function hideMobileMenu() {
        document.querySelector('body').classList.remove('mmenu-active');
    }

    return (
        <>
            <div className="page-wrapper">
                <Header categoryData={categoryList} />
                {children}
                <Footer categoryData={categoryList} />
            </div>
            <div className="mobile-menu-overlay" onClick={hideMobileMenu}></div>
            <button id="scroll-top" title="Back to top" onClick={toScrollTop}>
                <i className="icon-arrow-up"></i>
            </button>
            <MobileMenu categoryData={categoryList} />

            <ToastContainer
                autoClose={2000}
                duration={300}
                newestOnTo={true}
                className="toast-container"
                position="top-right"
                closeButton={true}
                hideProgressBar={false}
                newestOnTop={true}
                draggable={false}
            />
            <QuickViewModal />
            <VideoModal />
        </>
    )
}

export default connect(null, { ...actions })(Layout);