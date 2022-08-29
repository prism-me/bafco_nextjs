import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import ALink from '~/components/features/alink';
import { API } from '~/http/API';

function MainMenu() {
    const router = useRouter();
    let path = router.query.slug;
    const [categoryList, setCategoryList] = useState();

    useEffect(() => {

        API.get(`header-category`).then((response) => {

            setCategoryList(response.data)

        }).catch((err) => {
            console.log(err);
        });

    }, []);

    return (
        <nav className="main-nav">
            <ul className="menu sf-arrows">
                {categoryList?.map((category, index) => (
                    category?.parent_id === null &&
                    <li className={`megamenu-container ${path === category.route ? 'active' : ''}`} id="menu-home" key={index}>
                        <ALink href={`/collections/${category.route}`} className="sf-with-ul">{category.name}</ALink>
                        {category?.header_child.length > 0 &&
                            <div className="megamenu demo">
                                <div className="menu-col">
                                    <div className="row no-gutters">
                                        <div className="col-md-6">
                                            <div className="menu-col">
                                                <div className="menu-title">{category.name} Collections</div>
                                                <ul>
                                                    {category?.header_child?.map((item, index2) => (
                                                        <li className={path?.indexOf(`/collections/${category.route}/${item.route}`) > -1 ? 'active' : ''} key={index2}>
                                                            <ALink href={`/collections/${category.route}/${item.route}`}>{item.name}</ALink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="banner banner-overlay">
                                                <ALink href={`/collections/${category.route}`}>
                                                    <img src={category?.featured_image} alt={category.name} />

                                                    <div className="banner-content banner-content-bottom">
                                                        <div className="banner-title text-white">{category.sub_title}<br /><span><strong>{category.name}</strong></span></div>
                                                    </div>
                                                </ALink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </li>
                ))}
            </ul>
        </nav >
    );
}

export default MainMenu;