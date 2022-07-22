import { useRouter } from 'next/router';

import ALink from '~/components/features/alink';

function CategoryMenu() {
    const query = useRouter().query;

    return (
        <div className="dropdown category-dropdown">
            <ALink href="#" className="dropdown-toggle" title="Browse Categories">
            </ALink>

            <div className="dropdown-menu">
                <div className="row no-gutters" style={{ alignItems: "center" }}>
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
                        <div className="banner banner-overlay">
                            <ALink href="#">
                                <img src="images/menu/hamburger-menu-image.png" alt="Banner" />

                                <div className="banner-content banner-content-bottom">
                                    <div className="banner-title text-white">Comfort<br /><span><strong>Executive Chairs</strong></span></div>
                                </div>
                            </ALink>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CategoryMenu; 