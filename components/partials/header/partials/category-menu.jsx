import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import ALink from '~/components/features/alink';

function CategoryMenu() {
    const [menuBtnCloseIcon, setMenuBtnCloseIcon] = useState(false);
    const query = useRouter().query;

    const handleMenuOpen = (e) => {
        if (menuBtnCloseIcon === false) {
            setMenuBtnCloseIcon(true);
        } else {
            setMenuBtnCloseIcon(false);
        }

    }


    return (
        <>
            <div className="dropdown category-dropdown" onClick={handleMenuOpen}>
                <ALink
                    href="#"
                    className={`dropdown-toggle ${menuBtnCloseIcon === true ? 'toggle_icon_open' : ''}`}
                    title="Browse Categories">
                </ALink>
            </div>
            <div className={`dropdown-menu ${menuBtnCloseIcon === true ? 'show_verticalmenu' : ''}`} onClick={handleMenuOpen}>
                <button onClick={handleMenuOpen} type="button" className="mfp-close"><span>×</span></button>
                <div className="row no-gutters">
                    <div className="col-md-6">
                        <nav className="side-nav">
                            <ul className="menu-vertical sf-arrows">
                                <li className={query.category == 'electronics' ? 'active' : ''}><ALink href="/application/top-management/" scroll={false}>Top Management</ALink></li>
                                <li className={query.category == 'gift-idea' ? 'active' : ''}><ALink href="/application/senior-management/" scroll={false}>Senior Management</ALink></li>
                                <li className={query.category == 'beds' ? 'active' : ''}><ALink href="/application/majlis-area/" scroll={false}>Majlis Area</ALink></li>
                                <li className={query.category == 'lighting' ? 'active' : ''}><ALink href="/application/management-desk-and-chairs/" scroll={false}>Management Desk & Chairs</ALink></li>
                                <li className={query.category == 'lighting' ? 'active' : ''}><ALink href="/application/workstation-and-desks/" scroll={false}>Workstation & Desks</ALink></li>
                                <li className={query.category == 'lighting' ? 'active' : ''}><ALink href="/application/executive-chairs/" scroll={false}>Executive Chairs</ALink></li>
                                <li className={query.category == 'lighting' ? 'active' : ''}><ALink href="/application/executive-sofa/" scroll={false}>Executive Sofa</ALink></li>
                                <li className={query.category == 'lighting' ? 'active' : ''}><ALink href="/application/boardroom/" scroll={false}>Boardroom</ALink></li>
                                <li className={query.category == 'lighting' ? 'active' : ''}><ALink href="/application/meeting-rooms/" scroll={false}>Meeting Rooms</ALink></li>
                                <li className={query.category == 'lighting' ? 'active' : ''}><ALink href="/application/task-chairs/" scroll={false}>Task Chairs</ALink></li>
                                <li className={query.category == 'lighting' ? 'active' : ''}><ALink href="/application/collaborative-and-public-seating/" scroll={false}>Modular & Collaborative Seating</ALink></li>
                                <li className={query.category == 'decoration' ? 'active' : ''}><ALink href="/application/training-area-and-pantry-area/" scroll={false}>Training Area & Pantry Area</ALink></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-md-6">
                        <nav className="side-nav">
                            <ul className="menu-vertical sf-arrows hamburger_main_menu">
                                <li><ALink href="/pages/about/">About Us</ALink></li>
                                <li><ALink href="/pages/services/">Services</ALink></li>
                                {/* <li><ALink href="/pages/innovations/">Innovations</ALink></li> */}
                                <li><ALink href="/pages/resources/">Resources</ALink></li>
                                {/* <li><ALink href="/pages/team/">Our Team</ALink></li> */}
                                <li><ALink href="/pages/contact/">Contact Us</ALink></li>
                            </ul>
                        </nav>
                    </div>
                </div>

            </div>
        </>
    );
}

export default CategoryMenu; 