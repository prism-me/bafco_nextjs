import { useRouter } from 'next/router';

import ALink from '~/components/features/alink';

function CategoryMenu() {
    const query = useRouter().query;

    return (
        <div className="dropdown category-dropdown">
            <ALink href="#" className="dropdown-toggle" title="Browse Categories">
            </ALink>

            <div className="dropdown-menu">
                <div className="row no-gutters" style={{alignItems: "center"}}>
                    <div className="col-md-6">
                        <nav className="side-nav">
                            <ul className="menu-vertical sf-arrows">
                                <li className={query.category == 'electronics' ? 'active' : ''}><ALink href="#" scroll={false}>Top Management</ALink></li>
                                <li className={query.category == 'gift-idea' ? 'active' : ''}><ALink href="#" scroll={false}>Senior Management</ALink></li>
                                <li className={query.category == 'beds' ? 'active' : ''}><ALink href="#" scroll={false}>Majlis Area</ALink></li>
                                <li className={query.category == 'lighting' ? 'active' : ''}><ALink href="#" scroll={false}>Management Desk & Chairs</ALink></li>
                                <li className={query.category == 'sofas-and-sleeper-sofas' ? 'active' : ''}><ALink href="#" scroll={false}>Workstation & Ergonomic Chairs</ALink></li>
                                <li className={query.category == 'storage' ? 'active' : ''}><ALink href="#" scroll={false}>Formal and Casual Meeting Area</ALink></li>
                                <li className={query.category == 'armchairs-and-chaises' ? 'active' : ''}><ALink href="#" scroll={false}>Collaborative & Public Seating</ALink></li>
                                <li className={query.category == 'decoration' ? 'active' : ''}><ALink href="#" scroll={false}>Training Area & Pantry Area</ALink></li>
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