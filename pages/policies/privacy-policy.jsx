import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import Helmet from "react-helmet";

function PrivacyPolicy() {
    return (
        <div className="main">
            <Helmet>
                <title>Privacy policy</title>
                <meta name="description" content={`Privacy policy`} />
            </Helmet>
            <PageHeader
                title="Privacy policy"
                subTitle="We make happy workplaces"
                backgroundImage="images/banners/cat_banner.png"
                buttonText="Shop Now"
                buttonUrl="#"
            />

            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item active">Privacy policy</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <h2 className="title text-center mb-3">Privacy policy</h2>
                    <div className="rte">
                        <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from store.bafco.com (the “Site”).</p>

                        <h6 className="mt-3">PERSONAL INFORMATION WE COLLECT</h6>
                        <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information”.</p>

                        <h6 className="mt-3">We collect Device Information using the following technologies:</h6>
                        <p>  - “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.
                            - “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.
                            - “Web beacons”, “tags”, and “pixels” are electronic files used to record information about how you browse the Site.</p>

                        <p>Additionally, when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers [Visa &amp; Mastercard]), email address, and phone number. We refer to this information as “Order Information”.</p>

                        <p>When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.</p>

                        <h6 className="mt-3">HOW DO WE USE YOUR PERSONAL INFORMATION?</h6>
                        <p> We use the Order Information that we collect generally to fulfil any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:
                            - Communicate with you;
                            - Screen our orders for potential risk or fraud; and
                            - When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</p>

                        <p>We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).</p>

                        <h6 className="mt-3">PERSONALISE YOUR EXPERIENCE</h6>
                        <p>We may use your personal information to personalise the marketing messages we send to you and to make them more relevant and interesting, as this is in our legitimate business interests. Where necessary we will obtain your consent first. We may use your personal information for this purpose in the following ways: </p>

                        <p>- Using your online browsing behaviour as well as your showroom and online purchases to help us better understand you as a customer and provide you with personalised offers and services; </p>

                        <p>- Providing you with relevant marketing communications (including by email, post, telephone, SMS, or online advertising), relating to products and services we offer, and those of our suppliers and partners. As part of this, online advertising may be displayed on Our Websites and on other organisations’ websites and online media channels. We may also measure the effectiveness of our marketing communications and those of our suppliers and partners; </p>

                        <p>• To help us to better understand you and provide you with services and marketing communications, that are relevant to your interests, we combine personal information we collect when you make purchases in-store with personal information collected from our Websites.</p>

                        <p>Contact and interact with you
                            We may use your personal information when we communicate with you, in order to:</p>

                        <p>• Contact you about our Services, for example by phone, email or post or by responding to social media posts that you have directed at us;</p>

                        <p>• Manage promotions and competitions you take part in, including those we run with our suppliers and partners;</p>

                        <p>• Invite you to take part in and manage customer surveys, questionnaires and other market research activities carried out by BAFCO and by other organisations on our behalf</p>

                        <p>It is in our legitimate business interests that we are able to provide you with appropriate responses and provide you with notice about our services.</p>

                        <h6 className="mt-3">Manage and improve our day-to-day operations</h6>
                        <p>  We analyse information about how you use our services to:
                            - Manage and improve our Websites and Mobile Apps;
                            - Help to develop and improve our product range, services, stores, information technology systems, know-how and the way we communicate with you; </p>

                        <h6 className="mt-3">SHARING YOUR PERSONAL INFORMATION</h6>
                        <p> We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store--you can read more about how Shopify uses your Personal Information here: https://www.shopify.com/legal/privacy. We also use Google Analytics to help us understand how our customers use the Site -- you can read more about how Google uses your Personal Information here: https://www.google.com/intl/en/policies/privacy/. You can also opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout.</p>

                        <p>Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</p>

                        <h6 className="mt-3">BEHAVIOURAL ADVERTISING</h6>
                        <p> As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.</p>

                        <p>You can opt out of targeted advertising by using the links below:
                            - Facebook: https://www.facebook.com/settings/?tab=ads
                            - Google: https://www.google.com/settings/ads/anonymous
                            - Bing: https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads
                            Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance’s opt-out portal at: http://optout.aboutads.info/.</p>

                        <p>Some of the advertisements you see on the Site are selected and delivered by third parties, such as ad networks, advertising agencies, advertisers, and audience segment providers. These third parties may collect information about you and your online activities, either on the Site or on other websites, through cookies, web beacons, and other technologies in an effort to understand your interests and deliver to you advertisements that are tailored to your interests. Please remember that we do not have access to, or control over, the information these third parties may collect. The information practices of these third parties are not covered by this privacy policy. </p>

                        <h6 className="mt-3">DO NOT TRACK</h6>
                        <p>Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.</p>

                        <h6 className="mt-3">YOUR RIGHTS</h6>
                        <p> If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.</p>

                        <p>Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.</p>

                        <h6 className="mt-3">DATA RETENTION</h6>
                        <p>When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
                            All credit/debit card details and personally identifiable information will NOT be stored, sold, shared, rented or leased to any third parties.</p>

                        <h6 className="mt-3">CHANGES</h6>
                        <p>We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons. Therefore, you are encouraged to frequently visit these sections in order to be updated about the changes on the website. Modifications will be effective on the day they are posted.</p>

                        <h6 className="mt-3">MINORS</h6>
                        <p>The Site is not intended for individuals under the age of 18. Minors under the age of 18 shall be prohibited to register as a User of this website and are not allowed to transact or use this website.</p>

                        <h6 className="mt-3">CONTACT US</h6>
                        <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e‑mail at hello@bafco.com or by mail using the details provided below:</p>

                        <h6 className="mt-3">BAFCO Furniture</h6>
                        <p>[Re: Privacy Compliance Officer]
                            BAFCO Trading LLC, BAFCO Interiors, Karama Furniture Mall, Oud Metha, 15556 Dubai DU, United Arab Emirates</p>
                    </div>
                </div>
            </div>

            <div className="cta cta-display bg-image pt-4 pb-4" style={{ backgroundImage: `url(images/backgrounds/cta/bg-7.jpg)` }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-9 col-xl-7">
                            <div className={`row no-gutters flex-sm-row align-items-sm-center`} >
                                <div className="col">
                                    <h3 className="cta-title text-white">If You Have More Questions</h3>
                                    <p className="cta-desc text-white">Quisque volutpat mattis eros</p>
                                </div>

                                <div className="col-auto">
                                    <ALink href="/pages/contact" className="btn btn-outline-white"><span>CONTACT US</span><i className="icon-long-arrow-right"></i></ALink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy;