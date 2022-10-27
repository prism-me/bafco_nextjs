import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import SlideToggle from "react-slide-toggle";
import { API } from "~/http/API";
import ALink from "~/components/features/alink";

function MobileMenu(props) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryList, setCategoryList] = useState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCategoryList(props?.categoryData);
  }, [props]);

  useEffect(() => {
    router.events.on("routeChangeComplete", hideMobileMenu);
  }, []);

  function hideMobileMenu() {
    document.querySelector("body").classList.remove("mmenu-active");
  }

  function onSearchChange(e) {
    var lowerCase = e.target.value.toLowerCase();
    setSearchTerm(lowerCase);
  }

  function onSubmitSearchForm(e) {
    e.preventDefault();
    router.push({
      pathname: "/",
      query: {
        searchTerm: searchTerm,
        category: "",
      },
    });
  }

  useEffect(() => {
    if (searchTerm?.length > 2) setLoading(true);
    API.get(`/search?query=${searchTerm}`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setProducts(response?.data);
        }
      })
      .catch((err) => console.log(err));
  }, [searchTerm]);

  return (
    <div className="mobile-menu-container mobile-menu-light">
      <div className="mobile-menu-wrapper">
        <span className="mobile-menu-close" onClick={hideMobileMenu}>
          <i className="icon-close"></i>
        </span>

        <form onSubmit={(e) => e.preventDefault()} className="mobile-search">
          <label
            htmlFor="mobile-search"
            value={searchTerm}
            required
            className="sr-only"
          >
            Search
          </label>
          <input
            type="text"
            autoComplete="off"
            className="form-control"
            value={searchTerm}
            onChange={onSearchChange}
            name="mobile-search"
            id="mobile-search"
            placeholder="Search product ..."
            required
          />
          <button className="btn btn-primary" type="submit">
            <i className="icon-search"></i>
          </button>
          {searchTerm?.length > 2 ?
            <div className="live-search-list">
              {(products?.products?.length > 0 || products?.category?.length > 0) ? (
                <div className="autocomplete-suggestions">
                  {products?.products?.map((product, index) => (
                    <ALink
                      href={`/collections/${product?.category_route?.parent_catetory[0]?.route}/${product?.category_route?.route}/${product?.route}`}
                      className="autocomplete-suggestion"
                      key={`search-result-${index}`}
                    >
                      <img src={product?.featured_image} alt={product?.name} />{product?.name}
                    </ALink>
                  ))}
                  {products?.category?.map((product, index) => (
                    product?.parent_catetory?.length === 0 ?
                      <ALink
                        href={`/collections/${product?.route}`}
                        className="autocomplete-suggestion"
                        key={`search-result-${index}`}
                      >
                        <img src={product?.featured_image} alt={product?.name} />{product?.name}
                      </ALink> :
                      <ALink
                        href={`/collections/${product?.parent_catetory[0]?.route}/${product?.route}`}
                        className="autocomplete-suggestion"
                        key={`search-result-${index}`}
                      >
                        <img src={product?.featured_image} alt={product?.name} />{product?.name}
                      </ALink>
                  ))}
                </div>
              ) : (
                <p
                  style={{
                    color: "#b0b0b0",
                    textTransform: "capitalize",
                    padding: "1rem",
                  }}
                >
                  No Product Found !!!
                </p>
              )}
            </div>
            : (
              ""
            )
          }

        </form>

        <Tabs defaultIndex={0} selectedTabClassName="show">
          <TabList className="nav nav-pills-mobile" role="tablist">
            <Tab className="nav-item text-center">
              <span className="nav-link">Menu</span>
            </Tab>

            <Tab className="nav-item text-center">
              <span className="nav-link">Categories</span>
            </Tab>
          </TabList>

          <div className="tab-content">
            <TabPanel>
              <nav className="mobile-nav">
                <ul className="mobile-menu">
                  <li>
                    <ALink href="/application/top-management/">
                      Top Management
                    </ALink>
                  </li>
                  <li>
                    <ALink href="/application/senior-management/">
                      Senior Management
                    </ALink>
                  </li>
                  <li>
                    <ALink href="/application/majlis-area/">Majlis Area</ALink>
                  </li>
                  <li>
                    <ALink href="/application/management-desk-and-chairs/">
                      Management Desk & Chairs
                    </ALink>
                  </li>
                  <li>
                    <ALink href="/application/workstation-and-desks/">
                      Workstation & Desks
                    </ALink>
                  </li>
                  <li>
                    <ALink href="/application/executive-chairs/">
                      Executive Chairs
                    </ALink>
                  </li>
                  <li>
                    <ALink href="/application/executive-sofa/">
                      Executive Sofa
                    </ALink>
                  </li>
                  <li>
                    <ALink href="/application/boardroom/">Boardroom</ALink>
                  </li>
                  <li>
                    <ALink href="/application/meeting-rooms/">
                      Meeting Rooms
                    </ALink>
                  </li>
                  <li>
                    <ALink href="/application/task-chairs/">Task Chairs</ALink>
                  </li>
                  <li>
                    <ALink href="/application/collaborative-and-public-seating/">
                      Modular & Collaborative Seating
                    </ALink>
                  </li>
                  <li>
                    <ALink href="/application/training-area-and-pantry-area/">
                      Training Area & Pantry Area
                    </ALink>
                  </li>
                  <li>
                    <ALink href="/pages/about/">About Us</ALink>
                  </li>
                  <li>
                    <ALink href="/pages/services/">Services</ALink>
                  </li>
                  {/* <li><ALink href="/pages/innovations/">Innovations</ALink></li> */}
                  <li>
                    <ALink href="/pages/resources/">Resources</ALink>
                  </li>
                  <li>
                    <ALink href="/project-gallery/">Project Gallery</ALink>
                  </li>
                  {/* <li><ALink href="/pages/team/">Our Team</ALink></li> */}
                  <li>
                    <ALink href="/pages/contact/">Contact Us</ALink>
                  </li>
                </ul>
              </nav>
            </TabPanel>

            <TabPanel>
              <nav className="mobile-cats-nav">
                <ul className="mobile-cats-menu">
                  {categoryList?.map(
                    (category, index) =>
                      category?.parent_id === null && (
                        <SlideToggle collapsed={true} key={index}>
                          {({
                            onToggle,
                            setCollapsibleElement,
                            toggleState,
                          }) => (
                            <li
                              className={
                                toggleState.toLowerCase() == "expanded"
                                  ? "open"
                                  : ""
                              }
                            >
                              <ALink href={`/collections/${category.route}`}>
                                {category.name}
                                <span
                                  className="mmenu-btn"
                                  onClick={(e) => {
                                    onToggle(e);
                                    e.preventDefault();
                                  }}
                                ></span>
                              </ALink>

                              <ul ref={setCollapsibleElement}>
                                {category?.header_child?.map((item, index2) => (
                                  <li key={index2}>
                                    <ALink
                                      href={`/collections/${category.route}/${item.route}`}
                                    >
                                      {item.name}
                                    </ALink>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          )}
                        </SlideToggle>
                      )
                  )}
                </ul>
              </nav>
            </TabPanel>
          </div>
        </Tabs>

        <div className="social-icons">
          <ALink
            href="https://www.instagram.com/bafco/"
            className="social-icon"
            rel="noopener noreferrer"
            title="Instagram"
            target="_blank"
          >
            <i className="icon-instagram"></i>
          </ALink>
          <ALink
            href="https://www.facebook.com/bafcofurniture"
            className="social-icon"
            rel="noopener noreferrer"
            title="Facebook"
            target="_blank"
          >
            <i className="icon-facebook-f"></i>
          </ALink>
          <ALink
            href="https://www.linkedin.com/company/bafco/"
            className="social-icon"
            rel="noopener noreferrer"
            title="linkedin"
            target="_blank"
          >
            <i className="icon-linkedin"></i>
          </ALink>
          <ALink
            href="https://twitter.com/Bafco"
            className="social-icon"
            rel="noopener noreferrer"
            title="Twitter"
            target="_blank"
          >
            <i className="icon-twitter"></i>
          </ALink>
          <ALink
            href="https://www.pinterest.com/bafcointeriors/"
            className="social-icon"
            rel="noopener noreferrer"
            title="pinterest"
            target="_blank"
          >
            <i className="icon-pinterest"></i>
          </ALink>
        </div>
      </div>
    </div>
  );
}

export default React.memo(MobileMenu);
