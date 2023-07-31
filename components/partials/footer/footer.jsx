import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import ALink from "~/components/features/alink";

function Footer(props) {
  const router = useRouter("");
  const [isBottomSticky, setIsBottomSticky] = useState(false);
  const [containerClass, setContainerClass] = useState("container");
  const [categoryList, setCategoryList] = useState();

  useEffect(() => {
    setCategoryList(props?.categoryData);
  }, [props]);

  useEffect(() => {
    handleBottomSticky();
    setContainerClass(
      router.asPath.includes("fullwidth") ? "container-fluid" : "container"
    );
  }, [router.asPath]);

  useEffect(() => {
    window.addEventListener("resize", handleBottomSticky, { passive: true });
    return () => {
      window.removeEventListener("resize", handleBottomSticky);
    };
  }, []);

  function handleBottomSticky() {
    setIsBottomSticky(
      router.pathname.includes("product/default") && window.innerWidth > 991
    );
  }

  return (
    <footer className="footer footer-2">
      <div className="footer-middle">
        <div className={containerClass}>
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <div className="widget widget-about">
                <img
                  src="images/bafco-logo.png"
                  className="footer-logo"
                  alt="Footer Logo"
                  width="150"
                />
                <p>
                  We believe that the workplace is where you can be your best
                  self, and we've been making happy workplaces since 1991.
                  <br />
                  Great interiors, delivered.
                </p>

                <div className="widget-about-info">
                  {/* <div className="social-icons social-icons-color"> */}
                  <span className="widget-about-title">Social Media</span>
                  <ALink
                    href="https://www.instagram.com/bafco/"
                    className="social-icon social-instagram"
                    rel="noopener noreferrer"
                    title="Instagram"
                    target="_blank"
                  >
                    <i className="icon-instagram"></i>
                  </ALink>
                  <ALink
                    href="https://www.facebook.com/bafcofurniture"
                    className="social-icon social-facebook"
                    rel="noopener noreferrer"
                    title="Facebook"
                    target="_blank"
                  >
                    <i className="icon-facebook-f"></i>
                  </ALink>
                  <ALink
                    href="https://www.linkedin.com/company/bafco/"
                    className="social-icon social-linkedin"
                    rel="noopener noreferrer"
                    title="linkedin"
                    target="_blank"
                  >
                    <i className="icon-linkedin"></i>
                  </ALink>
                  <ALink
                    href="https://twitter.com/Bafco"
                    className="social-icon social-twitter"
                    rel="noopener noreferrer"
                    title="Twitter"
                    target="_blank"
                  >
                    <i className="icon-twitter"></i>
                  </ALink>
                  <ALink
                    href="https://www.pinterest.com/bafcointeriors/"
                    className="social-icon social-pinterest"
                    rel="noopener noreferrer"
                    title="pinterest"
                    target="_blank"
                  >
                    <i className="icon-pinterest"></i>
                  </ALink>
                  {/* <ALink href="https://www.tiktok.com/@bafcodxb" className="social-icon social-twitter" rel="noopener noreferrer" title="Twitter" target="_blank"><i className="fa-tiktok"></i></ALink> */}
                  {/* </div> */}

                  <span className="widget-about-title">Payment Methods</span>
                  <figure className="footer-payments">
                    <img
                      src="images/payments.png"
                      alt="Payment methods"
                      width="272"
                      height="20"
                    />
                  </figure>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-2">
              <div className="widget">
                <h4 className="widget-title">QUICK LINKS</h4>

                <ul className="widget-list">
                  <li>
                    <ALink href="#">Space Planning Services</ALink>
                  </li>
                  <li>
                    <ALink href="#">Delivery & Installation</ALink>
                  </li>
                  <li>
                    <ALink href="/fabric-finishes/">Fabric & Finishes</ALink>
                  </li>
                  <li>
                    <ALink href="#">Warranty</ALink>
                  </li>
                  {/* <li>
                    <ALink href="/project-gallery/">Project Gallery</ALink>
                  </li> */}
                  <li>
                    <ALink href="#">Testimonials</ALink>
                  </li>
                  <li>
                    <ALink href="/blogs/">BLOGS/ Insights</ALink>
                  </li>
                  <li>
                    <ALink href="/pages/faq">FAQs</ALink>
                  </li>
                  <li>
                    <ALink href="/policies/terms-of-service">
                      Terms & Condition
                    </ALink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-12 col-lg-3">
              <div className="row">
                <div className="col-sm-6 col-lg-6">
                  <div className="widget">
                    <h4 className="widget-title">SHOP</h4>

                    <ul className="widget-list">
                      {categoryList?.map(
                        (category, i) =>
                          category?.parent_id === null && (
                            <li>
                              <ALink
                                href={`/collections/${category.route}`}
                                key={i}
                              >
                                {category.name}
                              </ALink>
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-6">
                  <div className="widget">
                    <h4 className="widget-title">BAFCO</h4>

                    <ul className="widget-list">
                      <li>
                        <ALink href="/pages/about/">About Us</ALink>
                      </li>
                      <li>
                        <ALink href="/pages/services/">Services</ALink>
                      </li>
                      {/* <li>
                    <ALink href="/pages/innovations/">Innovations</ALink>
                  </li> */}
                      <li>
                        <ALink href="/pages/resources/">Resources</ALink>
                      </li>
                      {/* <li>
                    <ALink href="/pages/team/">Our Team</ALink>
                  </li> */}
                      <li>
                        <ALink href="/project-gallery/">Project Gallery</ALink>
                      </li>
                      <li>
                        <ALink href="/pages/contact/">Contact Us</ALink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-lg-4" style={{ paddingRight: "0" }}>
              <div className="widget">
                <h4 className="widget-title">VISIT OUR SHOWROOM</h4>
                <ul className="contact-list">
                  <li>
                    <i className="icon-map-marker"></i>
                    <p>
                      <strong>Dubai</strong>
                    </p>
                    BAFCO Office & Showroom Ground Floor, Al Manara Building
                    (near Al Safa Metro Station) Sheikh Zayed Road, Dubai, UAE
                  </li>
                </ul>
                <ul className="contact-list contact-info">
                  <li>
                    <i className="icon-phone" style={{ color: "#008482" }}></i>
                    <a href="tel:+97143738300">+971 4 373 8300</a>
                  </li>
                  <li>
                    <i
                      className="icon-envelope"
                      style={{ color: "#008482" }}
                    ></i>
                    <a href="mailto:hello@bafco.com">hello@bafco.com</a>
                  </li>
                </ul>
                <ul className="contact-list">
                  <li>
                    <i className="icon-map-marker"></i>
                    <p>
                      <strong>Abu Dhabi</strong>
                    </p>
                    Mezzanine Floor, Hareb Tower Sheikh, Airport Road – Old
                    Rashid Bin Saeed Al Maktoum St. (2nd Street) Abu Dhabi, UAE
                  </li>
                </ul>
                <ul className="contact-list contact-info">
                  <li>
                    <i className="icon-phone" style={{ color: "#008482" }}></i>
                    <a href="tel:+97126317008">+971 2 631 7008</a>
                  </li>
                  <li>
                    <i
                      className="icon-envelope"
                      style={{ color: "#008482" }}
                    ></i>
                    <a href="mailto:auhoffice@bafco.com">auhoffice@bafco.com</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className={containerClass}>
          <p className="footer-copyright">
            Copyright © {new Date().getFullYear()} Bafco Store. All Rights
            Reserved.
          </p>
          <ul className="footer-menu">
            <li>
              <ALink href="/policies/terms-of-service">Terms Of Use</ALink>
            </li>
            <li>
              <ALink href="/policies/privacy-policy">Privacy Policy</ALink>
            </li>
            <li>
              <ALink href="/policies/shipping-policy">Shipping Policy</ALink>
            </li>
          </ul>

          <div className="social-icons social-icons-color">
            <p>
              Designed and Managed by{" "}
              <ALink href="https://www.prism-me.com/">Prism Digital</ALink>
            </p>
            {/* <span className="social-label">Social Media</span>

                        <ALink href="#" className="social-icon social-facebook" rel="noopener noreferrer" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                        <ALink href="#" className="social-icon social-twitter" rel="noopener noreferrer" title="Twitter"><i className="icon-twitter"></i></ALink>
                        <ALink href="#" className="social-icon social-instagram" rel="noopener noreferrer" title="Instagram"><i className="icon-instagram"></i></ALink>
                        <ALink href="#" className="social-icon social-youtube" rel="noopener noreferrer" title="Youtube"><i className="icon-youtube"></i></ALink>
                        <ALink href="#" className="social-icon social-pinterest" rel="noopener noreferrer" title="Pinterest"><i className="icon-pinterest"></i></ALink> */}
          </div>
        </div>
      </div>
      {isBottomSticky ? <div className="mb-10"></div> : ""}
    </footer>
  );
}

export default React.memo(Footer);
