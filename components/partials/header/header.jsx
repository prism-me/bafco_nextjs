import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

import ALink from '~/components/features/alink';
import LoginModal from '~/components/features/modals/login-modal';
import HeaderSearch from '~/components/partials/header/partials/header-search';
import WishlistMenu from '~/components/partials/header/partials/wishlist-menu';
import CartMenu from '~/components/partials/header/partials/cart-menu';
import CategoryMenu from '~/components/partials/header/partials/category-menu';
import MainMenu from '~/components/partials/header/partials/main-menu';
import StickyHeader from '~/components/features/sticky-header';

function Header() {
    const router = useRouter();
    const [containerClass, setContainerClass] = useState('container');
    const [authtoken, setAuthtoken] = useState('');

    function openMobileMenu() {
        document.querySelector('body').classList.add('mmenu-active');
    }

    useEffect(() => {
        setContainerClass(router.asPath.includes('fullwidth') ? 'container-fluid' : 'container');
        setAuthtoken(localStorage.getItem('authtoken'));
    }, [router.asPath]);

    return (
        <header className="header header-2 header-intro-clearance">
            {/* <div className="header-top">
                <div className={containerClass}>
                    <div className="header-left overflow-hidden mr-3 mr-sm-0">
                        <div className="welcome-msg d-flex flex-nowrap">
                            <p>Special collection already available.</p><ALink href="#">&nbsp;Read more ...</ALink>
                        </div>
                    </div>

                    <div className="header-right">
                        <ul className="top-menu">
                            <li>
                                <ALink href="#">Links</ALink>
                                <ul>
                                    <li>
                                        <div className="header-dropdown">
                                            <ALink href="#">USD</ALink>
                                            <div className="header-menu">
                                                <ul>
                                                    <li><ALink href="#">Eur</ALink></li>
                                                    <li><ALink href="#">Usd</ALink></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="header-dropdown">
                                            <ALink href="#">English</ALink>
                                            <div className="header-menu">
                                                <ul>
                                                    <li><ALink href="#">English</ALink></li>
                                                    <li><ALink href="#">French</ALink></li>
                                                    <li><ALink href="#">Spanish</ALink></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <LoginModal />
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> */}

            <div className="header-middle">
                <div className={containerClass}>
                    <div className="header-left">
                        <button className="mobile-menu-toggler" onClick={openMobileMenu}>
                            <span className="sr-only">Toggle mobile menu</span>
                            <i className="icon-bars"></i>
                        </button>

                        <ALink href="/" className="logo">
                            <img src="images/bafco-logo.png" alt="Molla Logo" width={150} />
                        </ALink>
                    </div>

                    <div className="header-center">
                        <HeaderSearch />
                    </div>

                    <div className="header-right">
<<<<<<< HEAD
                        {authtoken === "" || authtoken === null || authtoken === undefined ?
                            <LoginModal /> :
                            <div className="account">
                                <ALink href="/account" title="My account">
                                    <div className="icon">
                                        <i className="icon-user"></i>
                                    </div>
                                    <p>Account</p>
                                </ALink>
                            </div>
                        }
=======
                        <div className="account">
                            <ALink href="/shop/dashboard" title="My account">
                                <div className="icon">
                                    <i className="icon-user"></i>
                                </div>
                                <p>Account</p>
                            </ALink>
                        </div>
>>>>>>> parent of e00bfd3 (minor)

                        <WishlistMenu />
                        <CartMenu />
                    </div>
                </div>
            </div>

            <StickyHeader>
                <div className="header-bottom sticky-header">
                    <div className={containerClass}>
                        <div className="header-left">
                            <CategoryMenu />
                        </div>

                        <div className="header-center">
                            <MainMenu />
                        </div>

                        {/* <div className="header-right overflow-hidden"> */}
                            <div className="header-right">
                                <ul className="top-menu">
                                    <li>
                                        <ALink href="#">Links</ALink>
                                        <ul>
                                            <li>
                                                <div className="header-dropdown">
                                                    <ALink href="#">USD</ALink>
                                                    <div className="header-menu">
                                                        <ul>
                                                            <li><ALink href="#">USD</ALink></li>
                                                            <li><ALink href="#">AED</ALink></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="header-dropdown">
                                                    <ALink href="#">English</ALink>
                                                    <div className="header-menu">
                                                        <ul>
                                                            <li><ALink href="#">English</ALink></li>
                                                            <li><ALink href="#">Arabic</ALink></li>
                                                            {/* <li><ALink href="#">Spanish</ALink></li> */}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                            {/* <LoginModal /> */}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            {/* <i className="la la-lightbulb-o"></i><p className="text-truncate">Clearance<span className="highlight">&nbsp;Up to 30% Off</span></p> */}
                        {/* </div> */}
                    </div>
                </div>
            </StickyHeader>
        </header>
    )
}

export default Header;