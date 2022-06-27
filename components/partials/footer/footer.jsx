import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

import ALink from '~/components/features/alink';

function Footer() {
    const router = useRouter("");
    const [isBottomSticky, setIsBottomSticky] = useState(false);
    const [containerClass, setContainerClass] = useState('container');

    useEffect(() => {
        handleBottomSticky();
        setContainerClass(router.asPath.includes('fullwidth') ? 'container-fluid' : 'container');
    }, [router.asPath]);

    useEffect(() => {
        window.addEventListener('resize', handleBottomSticky, { passive: true });
        return () => {
            window.removeEventListener('resize', handleBottomSticky);
        }
    }, [])

    function handleBottomSticky() {
        setIsBottomSticky(router.pathname.includes('product/default') && (window.innerWidth > 991));
    }

    return (
        <footer className="footer footer-2">
            <div className="footer-middle">
                <div className={containerClass}>
                    <div className="row">
                        <div className="col-sm-6 col-lg-3">
                            <div className="widget widget-about">
                                <img src="images/bafco-logo.png" className="footer-logo" alt="Footer Logo" width="150" />
                                <p>Praesent dapibus, neque id cursus ucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>

                                <div className="widget-about-info">
                                    {/* <div className="social-icons social-icons-color"> */}
                                    <span className="widget-about-title">Social Media</span>
                                    <ALink href="#" className="social-icon social-instagram" rel="noopener noreferrer" title="Instagram"><i className="icon-instagram"></i></ALink>
                                    <ALink href="#" className="social-icon social-facebook" rel="noopener noreferrer" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                    <ALink href="#" className="social-icon social-linkedin" rel="noopener noreferrer" title="linkedin"><i className="icon-linkedin"></i></ALink>
                                    <ALink href="#" className="social-icon social-twitter" rel="noopener noreferrer" title="Twitter"><i className="icon-twitter"></i></ALink>
                                    {/* </div> */}

                                    <span className="widget-about-title">Payment Method</span>
                                    <figure className="footer-payments">
                                        <img src="images/payments.png" alt="Payment methods" width="272" height="20" />
                                    </figure>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 col-lg-2">
                            <div className="widget">
                                <h4 className="widget-title">QUICK LINKS</h4>

                                <ul className="widget-list">
                                    <li><ALink href="#">Space Planning Services</ALink></li>
                                    <li><ALink href="#">Delivery & Installation</ALink></li>
                                    <li><ALink href="#">Fabric & Finishes</ALink></li>
                                    <li><ALink href="#">Warranty</ALink></li>
                                    <li><ALink href="#">Project References</ALink></li>
                                    <li><ALink href="#">Testimonials</ALink></li>
                                    <li><ALink href="#">BLOGS/ Insights</ALink></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-sm-2 col-lg-1">
                            <div className="widget">
                                <h4 className="widget-title">SHOP</h4>

                                <ul className="widget-list">
                                    <li><ALink href="#">Chairs</ALink></li>
                                    <li><ALink href="#">Desks</ALink></li>
                                    <li><ALink href="#">Collaborative</ALink></li>
                                    <li><ALink href="#">Storages</ALink></li>
                                    <li><ALink href="#">Accessories</ALink></li>
                                    <li><ALink href="#">Materials</ALink></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-sm-4 col-lg-2">
                            <div className="widget">
                                <h4 className="widget-title">MY ACCOUNT</h4>

                                <ul className="widget-list">
                                    <li><ALink href="#">My account</ALink></li>
                                    <li><ALink href="#">Login</ALink></li>
                                    <li><ALink href="#">Order History</ALink></li>
                                    <li><ALink href="#">Terms & Condition</ALink></li>
                                    <li><ALink href="#">FAQs</ALink></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-sm-2 col-lg-1">
                            <div className="widget">
                                <h4 className="widget-title">BAFCO</h4>

                                <ul className="widget-list">
                                    <li><ALink href="/pages/about/">About Us</ALink></li>
                                    <li><ALink href="#">Services</ALink></li>
                                    <li><ALink href="#">Innovations</ALink></li>
                                    <li><ALink href="#">Resources</ALink></li>
                                    <li><ALink href="/pages/contact/">Contact Us</ALink></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3">
                            <div className="widget">
                                <h4 className="widget-title">Visit our Showroom</h4>
                                <ul className="contact-list">
                                    <li>
                                        <i className="icon-map-marker"></i>
                                        <p><strong>Dubai</strong></p>BAFCO Office & Showroom Ground Floor, Al Manara Building (near Al Safa Metro Station) Sheikh Zayed Road, Dubai, UAE
                                    </li>
                                </ul>
                                <ul className="contact-list contact-info">
                                    <li>
                                        <i className="icon-phone"></i>
                                        <a href="tel:+9714 324 4424">+9714 324 4424</a>
                                    </li>
                                    <li>
                                        <i className="icon-envelope"></i>
                                        <a href="mailto:hello@gmail.com">hello@gmail.com</a>
                                    </li>
                                </ul>
                                <ul className="contact-list">
                                    <li>
                                        <i className="icon-map-marker"></i>
                                        <p><strong>Abu Dhabi</strong></p>Mezzanine Floor, Hareb Tower Sheikh, Airport Road – Old Rashid Bin Saeed Al Maktoum St. (2nd Street) Abu Dhabi, UAE
                                    </li>
                                </ul>
                                <ul className="contact-list contact-info">
                                    <li>
                                        <i className="icon-phone"></i>
                                        <a href="tel:+9714 324 4424">+9714 324 4424</a>
                                    </li>
                                    <li>
                                        <i className="icon-envelope"></i>
                                        <a href="mailto:hello@gmail.com">hello@gmail.com</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className={containerClass}>
                    <p className="footer-copyright">Copyright © {(new Date()).getFullYear()} Bafco Store. All Rights Reserved.</p>
                    <ul className="footer-menu">
                        <li><ALink href="#">Terms Of Use</ALink></li>
                        <li><ALink href="#">Privacy Policy</ALink></li>
                        <li><ALink href="#">Shipping Policy</ALink></li>
                    </ul>

                    <div className="social-icons social-icons-color">
                        <p>Designed and Managed by <ALink href="https://www.prism-me.com/">Prism</ALink></p>
                        {/* <span className="social-label">Social Media</span>

                        <ALink href="#" className="social-icon social-facebook" rel="noopener noreferrer" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                        <ALink href="#" className="social-icon social-twitter" rel="noopener noreferrer" title="Twitter"><i className="icon-twitter"></i></ALink>
                        <ALink href="#" className="social-icon social-instagram" rel="noopener noreferrer" title="Instagram"><i className="icon-instagram"></i></ALink>
                        <ALink href="#" className="social-icon social-youtube" rel="noopener noreferrer" title="Youtube"><i className="icon-youtube"></i></ALink>
                        <ALink href="#" className="social-icon social-pinterest" rel="noopener noreferrer" title="Pinterest"><i className="icon-pinterest"></i></ALink> */}
                    </div>
                </div>
            </div>
            {
                isBottomSticky ?
                    <div className="mb-10"></div>
                    : ""
            }
        </footer>
    );
}

export default React.memo(Footer);