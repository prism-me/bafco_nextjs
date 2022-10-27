import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import Helmet from "react-helmet";

function TermsOfService() {
    return (
        <div className="main">
            <Helmet>
                <title>Shipping policy</title>
                <meta name="description" content={`Shipping policy`} />
            </Helmet>
            <PageHeader
                title="Shipping policy"
                subTitle="We make happy workplaces"
                backgroundImage="images/banners/cat_banner.png"
                buttonText=""
                buttonUrl="#"
            />

            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item active">Shipping policy</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <h2 className="title text-center mb-3">Shipping policy</h2>
                    <div className="rte">
                        <p>Free Ground Shipping on all orders above AED 2000 (Two Thousand Dirhams) or more. Only applies to orders totalling AED 2001.00 or more after all other discounts etc. have been applied, with a shipping destination within the United Arab Emirates, a low delivery fee of AED 300.00 (Three Hundred Dirhams) will be chargeable extra on any order/s below AED 2001 (Two Thousand and One Dirhams).</p>

                        <p>Most orders placed before 1200hrs UAE time will be processed on the same day and an Order Confirmation Mail will be sent to the client. </p>

                        <p>The default charges calculated on International shipping are applicable ONLY on small items, with weight not exceeding 1 Kg., any additional shipping charges will be communicated directly to the customer prior to the shipment. The items will then be shipped only upon written confirmation from the customer.</p>

                        <p>The customer may also provide their Carrier( FEDEX/ DHL/ ANY OTHER) account numbers against which the ordered items will be handed over to the specified Carrier. The items will be handed over to the carrier only after the funds are cleared into our account.</p>

                        <p>Urgent same day delivery option is available upon special request at extra charges. <br />
                            All Special Order pieces will be shipped upon arrival of the product or as requested by the purchaser.</p>

                        <p>Any orders placed over the phone and paid by check, cash, or money order are not subject to the listed quantity of product at the time of order. It is subject to the listed quantity at the time payment is received. Multiple transactions may result in multiple postings to the cardholder's monthly statement. All orders placed online with payment being made you will automatically be emailed a tax invoice with your Order Confirmation. Your UAE tax invoice is your proof of purchase.</p>

                        <p>All orders scheduled on any official UAE Holiday will be shipped the next business day. <br />
                            Friday &amp; Saturday deliveries are available upon request.</p>

                        <p>Customer has 3 business days to report any missing or damaged parts from date of receiving any merchandise. </p>

                        <p>Shipping Time is calculated in BUSINESS DAYS, and does not include Fridays, Saturdays, and/or official holidays.</p>

                        <p>BAFCO Trading LLC reserves the right to refuse any order for any reason, without assigning the reason thereof.</p>

                        <p>www.store.bafco.com will NOT deal or provide any services or products to any of OFAC (Office of Foreign Assets Control) sanctions countries in accordance with the law of UAE.</p>

                        <p>DAMAGED, LOST AND DELAYED SHIPMENTS <br />
                            BAFCO is not responsible for items that may be damaged, or lost by the shipping company, or “carrier” (FedEx, UPS, Flash Express, Empost or any other Courier or Carrier). All shipments are fully insured with the respective carrier. All products and packaging should be carefully inspected upon receipt and any damage should be brought to the carrier’s attention. If necessary, purchaser should alert the carrier and BAFCO that a claim needs to be filed for that shipment. Once a claim is approved and processed by the carrier, our shipping department will then ship out a replacement. BAFCO has no control over the timeliness of the shipments and cannot be held responsible for any delays caused by the Carrier. If necessary, BAFCO will aid in the filing of an appropriate claim with the carrier in the event of loss, damage, or shipping delay.</p>

                        <p>NON DEFECTIVE RETURNS <br />
                            All non-defective furniture can be returned for full credit of the merchandise within 7 days of purchase. The following guidelines must be met for consideration of return.</p>

                        <p>Must contact our offices within 7 Days of date of purchase. We do not accept returns after 7 days. No exceptions unless authorized before purchase.
                            Must have a valid Return Authorization Number. To get a Return Authorization Number please contact our offices at +971-4-3738300.
                            Equipment must not be altered or tampered with in attempts to modify.
                            The box must have the UPC on the box (not have been cut off) and the box not damaged or cut. Original merchandise box must not be defaced or altered in any way.
                            All returned merchandise must be in original carton with all manufacturers included accessories, manuals and instructions. Missing accessories will result in a reduced credit amount by the actual replacement cost of those items.
                            Credits will be posted to the appropriate account within 30 business days of receipt of equipment. Packages should be mailed to the address below with the Return Authorization on the outside of the box.</p>

                        <p>BAFCO Trading LLC <br />
                            PO Box 15556 <br />
                            Dubai, <br />
                            United Arab Emirates <br />
                            Tel: +9714 37 38 300 <br />
                            Defective Equipment</p>

                        <p>All products sold by BAFCO Trading LLC are covered by the manufacturer’s warranty against faulty workmanship and materials, subject to the terms and conditions of that warranty.</p>

                        <p>The terms of warranty and replacement are governed by the manufacturer and BAFCO cannot act outside the purview of decision provided by the manufacturer.</p>

                        <p>All warranty claims addressed to the service centre must be accompanied by the original purchase invoice/receipt provided by BAFCO Trading LLC at the time of the delivery.</p>

                        <p>ORDERS OUTSIDE UAE MARKET <br />
                            We strongly recommend our customers to ship either by EMPOST, DHL or FEDEX as the actual movement of the shipment can be tracked online by the customer directly.</p>

                        <p>Cash on Delivery payment terms are not available for International Shipments and the consignment will be shipped only after receipt of the full payment, including freight charges, as applicable.</p>

                        <p>Customs Duty, as applicable, is payable by the customer at actual value. This value will be determined by the concerned Customs Authority at the customer’s port of entry.</p>
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

export default TermsOfService;