import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Modal from "react-modal";
import Cookie from "js-cookie";
import { API } from "~/http/API";
import { toast } from "react-toastify";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(51,51,51,0.6)",
    zIndex: "9001",
  },
};

Modal.setAppElement("body");

function NewsletterModal() {
  const [open, setOpen] = useState(false);
  const [doNotShow, setDoNotShow] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    let timer;
    Cookie.get(`hideNewsletter-${process.env.NEXT_PUBLIC_DEMO}`) ||
      (timer = setTimeout(() => {
        setOpen(true);
      }, 5000));

    return () => {
      timer && clearTimeout(timer);
    };
  }, []);

  function closeModal(e) {
    document
      .getElementById("newsletter-popup-form")
      .classList.remove("ReactModal__Content--after-open");

    if (document.querySelector(".ReactModal__Overlay")) {
      document.querySelector(".ReactModal__Overlay").style.opacity = "0";
    }

    setTimeout(() => {
      setOpen(false);
      doNotShow &&
        Cookie.set(`hideNewsletter-${process.env.NEXT_PUBLIC_DEMO}`, "true", {
          expires: 7,
        });
    }, 350);
  }

  function handleChange(e) {
    setDoNotShow(e.target.checked);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handleSubmit() {
    if (email === "") {
      alert("Please enter a email before submitting.");
      return;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      alert("Invalid email address.");
      return;
    }
    let formdata = {
      email: email,
    };
    API.post(`/subscriber`, formdata)
      .then((response) => {
        // console.log("Success :: ", response)
        if (response?.data?.error) {
          toast.error("Please fill in the required fields.");
        } else {
          toast.success(response?.data);
          setOpen(false);
        }
      })
      .catch((error) => {
        toast.error("Somthing went wrong !");
      });
  }

  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      style={customStyles}
      shouldReturnFocusAfterClose={false}
      contentLabel="Newsletter Modal"
      className="container newsletter-popup-container h-auto"
      overlayClassName="d-flex align-items-center justify-content-center"
      id="newsletter-popup-form"
    >
      <div className="modal-content overflow-hidden">
        <div className="row justify-content-center position-relative">
          <div className="col-12">
            <div className="row no-gutters bg-white newsletter-popup-content">
              <div className="col-xl-3-5col col-lg-7 banner-content-wrap">
                <div className="banner-content text-center">
                  <img
                    src="images/bafco-logo.png"
                    alt="logo"
                    className="logo mb-0"
                    width="150"
                  />
                  {/* <h2 className="banner-title">get <span>25<span style={ { fontWeight: '400' } }>%</span></span> off</h2> */}
                  {/* <h2 className="banner-title">Sign Up. Be Inspired.</h2>
                  <p>
                    Subscribe now for hand-picked exclusive deals, inspiration
                    and workplace interior design tips, straight to your inbox.
                  </p> */}

                  <>
                    <div
                      id="sf3z8febd0b22be43b8e6e9b7815f99efab7b93169edfdb9cd68cfe97046d57a569d"
                      data-type="signupform"
                      style={{ opacity: "1" }}
                    >
                      <div id="customForm">
                        <div
                          className="quick_form_30_css"
                          style={{
                            // backgroundColor: "rgb(36, 50, 121)",
                            zIndex: "2",
                            fontFamily: "Montserrat, sans-serif",
                            // borderWidth: "1px",
                            // borderStyle: "solid",
                            // borderColor: "rgb(235, 235, 235)",
                            // backgroundPosition: "0px 100%",
                            // backgroundRepeat: "no-repeat",
                            // overflow: "hidden",
                            // backgroundImage:
                            //   "url(http://zohopublic.com/zohocampaigns/12edef35e_unnamed_1.jpg)",
                            // width: "1000px",
                            width: "100%",
                            // height: "271px",
                          }}
                          name="SIGNUP_BODY"
                        >
                          <div>
                            <div
                              style={{
                                fontWeight: "normal",
                                // color: "rgb(255, 255, 255)",
                                color: "#222",
                                textAlign: "center",
                                padding: "0px 0px 15px",
                                width: "100%",
                                display: "block",
                                boxSizing: "border-box",
                                fontSize: "16px",
                                fontFamily: "Montserrat, sans-serif",
                              }}
                              id="SIGNUP_HEADING"
                            >
                              {/* <br /> */}
                              <span
                                style={{ fontSize: "3rem", fontWeight: "600" }}
                              >
                                Sign Up. Be Inspired
                              </span>
                              <br />
                              <span style={{ color: "#000" }}>
                                Subscribe now for hand-picked exclusive deals,
                                inspiration and workplace interior design tips,
                                straight to your inbox.
                              </span>
                            </div>
                            <div style={{ position: "relative" }}>
                              <div
                                id="Zc_SignupSuccess"
                                style={{
                                  display: "none",
                                  position: "absolute",
                                  marginLeft: "4%",
                                  width: "90%",
                                  backgroundColor: "white",
                                  padding: "3px",
                                  border: "3px solid rgb(194, 225, 154)",
                                  marginTop: "10px",
                                  marginBottom: "10px",
                                  wordBreak: "break-all",
                                }}
                              >
                                <table
                                  width="100%"
                                  cellSpacing="0"
                                  cellPadding="0"
                                  border="0"
                                >
                                  <tbody>
                                    <tr>
                                      <td width="10%">
                                        <img
                                          className="successicon"
                                          src="https://bafc-cmpzourl.maillist-manage.com/images/challangeiconenable.jpg"
                                          align="absmiddle"
                                        />
                                      </td>
                                      <td>
                                        <span
                                          id="signupSuccessMsg"
                                          style={{
                                            color: "rgb(73, 140, 132)",
                                            fontFamily:
                                              "Montserrat, sans-serif",
                                            fontSize: "14px",
                                            wordBreak: "break-word",
                                          }}
                                        >
                                          &nbsp;&nbsp;Thank you for Signing Up
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <form
                              method="POST"
                              id="zcampaignOptinForm"
                              style={{
                                margin: "0px",
                                width: "100%",
                                padding: "0px 25px",
                                boxSizing: "border-box",
                                textAlign: "center",
                              }}
                              action="https://bafc-cmpzourl.maillist-manage.com/weboptin.zc"
                              target="_zcSignup"
                            >
                              <div
                                style={{
                                  backgroundColor: "rgb(49, 135, 104)",
                                  padding: "10px",
                                  color: "rgb(255, 255, 255)",
                                  fontSize: "11px",
                                  margin: "20px 10px 0px",
                                  border: "1px solid rgb(255, 217, 211)",
                                  opacity: " 1",
                                  height: "25px",
                                  width: "922px",
                                  display: "none",
                                }}
                                id="errorMsgDiv"
                              >
                                Please correct the marked field(s) below.
                              </div>
                              <div
                                style={{
                                  position: "relative",
                                  margin: "25px 0px 30px",
                                  height: "35px",
                                  display: "inline-block",
                                  //   width: "547px",
                                  width: "295px",
                                }}
                                className="SIGNUP_FLD"
                              >
                                <input
                                  type="text"
                                  style={{
                                    fontSize: "14px",
                                    border: "0",
                                    borderRadius: "0px",
                                    width: "100%",
                                    height: "100%",
                                    zIndex: "4",
                                    outline: "none",
                                    padding: "25px 10px",
                                    color: "rgb(136, 136, 136)",
                                    textAlign: "left",
                                    fontFamily: "Montserrat, sans-serif",
                                    // backgroundColor: "rgb(255, 255, 255)",
                                    backgroundColor: "#f5f5f5",
                                    boxSizing: "border-box",
                                  }}
                                  placeholder="Enter your Email Address"
                                  changeitem="SIGNUP_FORM_FIELD"
                                  name="CONTACT_EMAIL"
                                  id="EMBED_FORM_EMAIL_LABEL"
                                  required
                                />
                              </div>
                              <div
                                style={{
                                  position: "relative",
                                  margin: "25px 15px 15px",
                                  width: "180px",
                                  height: "35px",
                                  display: "none",
                                }}
                                className="SIGNUP_FLD"
                              >
                                <input
                                  type="text"
                                  style={{
                                    fontSize: "14px",
                                    border: "0",
                                    borderRadius: "4px",
                                    width: "100%",
                                    height: "100%",
                                    zIndex: "4",
                                    outline: "none",
                                    padding: "5px 10px",
                                    color: "rgb(136, 136, 136)",
                                    textAlign: "left",
                                    fontFamily: "Montserrat, sans-serif",
                                    backgroundColor: "rgb(255, 255, 255)",
                                    boxSizing: "border-box",
                                  }}
                                  placeholder="Name"
                                  changeitem="SIGNUP_FORM_FIELD"
                                  name="LASTNAME"
                                  id="EMBED_FORM_NAME_LABEL"
                                />
                              </div>
                              <div
                                style={{
                                  position: "relative",
                                  width: "100px",
                                  height: "35px",
                                  margin: "0 0 12px",
                                  display: "inline-block",
                                }}
                                className="SIGNUP_FLD"
                              >
                                <input
                                  type="submit"
                                  style={{
                                    textAlign: "center",
                                    width: "100%",
                                    height: "50px",
                                    zIndex: "5",
                                    border: "0px none",
                                    color: "rgb(255, 255, 255)",
                                    cursor: "pointer",
                                    outline: "none",
                                    fontSize: "14px",
                                    backgroundColor: "rgb(61, 139, 138)",
                                    borderRadius: "0px",
                                  }}
                                  name="SIGNUP_SUBMIT_BUTTON"
                                  id="zcWebOptin"
                                  value="Subscribe"
                                />
                              </div>
                              <input type="hidden" id="fieldBorder" value="" />
                              <input
                                type="hidden"
                                id="submitType"
                                name="submitType"
                                value="optinCustomView"
                              />
                              <input
                                type="hidden"
                                id="emailReportId"
                                name="emailReportId"
                                value=""
                              />
                              <input
                                type="hidden"
                                id="formType"
                                name="formType"
                                value="QuickForm"
                              />
                              <input
                                type="hidden"
                                name="zx"
                                id="cmpZuid"
                                value="12edef35e"
                              />
                              <input type="hidden" name="zcvers" value="3.0" />
                              <input
                                type="hidden"
                                name="oldListIds"
                                id="allCheckedListIds"
                                value=""
                              />
                              <input
                                type="hidden"
                                id="mode"
                                name="mode"
                                value="OptinCreateView"
                              />
                              <input
                                type="hidden"
                                id="zcld"
                                name="zcld"
                                value="1e65b9461f239d14"
                              />
                              <input
                                type="hidden"
                                id="zctd"
                                name="zctd"
                                value="1e65b9461f239be1"
                              />
                              <input
                                type="hidden"
                                id="document_domain"
                                value=""
                              />
                              <input
                                type="hidden"
                                id="zc_Url"
                                value="bafc-cmpzourl.maillist-manage.com"
                              />
                              <input
                                type="hidden"
                                id="new_optin_response_in"
                                value="0"
                              />
                              <input
                                type="hidden"
                                id="duplicate_optin_response_in"
                                value="0"
                              />
                              <input
                                type="hidden"
                                name="zc_trackCode"
                                id="zc_trackCode"
                                value="ZCFORMVIEW"
                              />
                              <input
                                type="hidden"
                                id="zc_formIx"
                                name="zc_formIx"
                                value="3z8febd0b22be43b8e6e9b7815f99efab7b93169edfdb9cd68cfe97046d57a569d"
                              />
                              <input
                                type="hidden"
                                id="viewFrom"
                                value="URL_ACTION"
                              />
                              <span
                                style={{ display: "none" }}
                                id="dt_CONTACT_EMAIL"
                              >
                                1,true,6,Contact Email,2
                              </span>
                              <span
                                style={{ display: "none" }}
                                id="dt_FIRSTNAME"
                              >
                                1,false,1,First Name,2
                              </span>
                              <span
                                style={{ display: "none" }}
                                id="dt_LASTNAME"
                              >
                                1,false,1,Last Name,2
                              </span>
                            </form>
                          </div>
                        </div>
                        <div style={{ display: "none" }} id="unauthPageTitle">
                          BAFCO Trading LLC - Form
                        </div>
                      </div>
                      <img
                        src="https://bafc-cmpzourl.maillist-manage.com/images/spacer.gif"
                        id="refImage"
                        onLoad={referenceSetter(this)}
                        style={{ display: "none" }}
                      />
                    </div>
                    <input
                      type="hidden"
                      id="signupFormType"
                      value="QuickForm_Horizontal"
                    />
                    <div
                      id="zcOptinOverLay"
                      onContextMenu="return false"
                      style={{
                        display: "none",
                        textAlign: "center",
                        backgroundColor: "rgb(0, 0, 0)",
                        opacity: "0.5",
                        zIndex: "100",
                        position: "fixed",
                        width: "100%",
                        top: "0px",
                        left: "0px",
                        height: "988px",
                      }}
                    ></div>
                    <div
                      id="zcOptinSuccessPopup"
                      style={{
                        display: "none",
                        zIndex: "9999",
                        width: "800px",
                        height: "40%",
                        top: "84px",
                        position: "fixed",
                        left: "26%",
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E6E6E6",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        boxShadow: "0 1px 10px #424242",
                        padding: "35px",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: "-16px",
                          right: "-14px",
                          zIndex: "99999",
                          cursor: "pointer",
                        }}
                        id="closeSuccess"
                      >
                        <img src="https://bafc-cmpzourl.maillist-manage.com/images/videoclose.png" />
                      </span>
                      <div id="zcOptinSuccessPanel"></div>
                    </div>
                  </>
                  {/* <form action="#">
                                        <div className="input-group input-group-round">
                                            <input
                                                type="email"
                                                name="email"
                                                value={email}
                                                onChange={handleEmailChange}
                                                className="form-control form-control-white"
                                                placeholder="Your Email Address"
                                                aria-label="Email Adress"
                                                required
                                            />
                                            <div className="input-group-append">
                                                <button className="btn" type="button" onClick={handleSubmit}><span>go</span></button>
                                            </div>
                                        </div>
                                    </form> */}

                  <div className="custom-control custom-checkbox pl-4 ml-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="register-policy"
                      onChange={handleChange}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="register-policy"
                    >
                      Do not show this popup again
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-xl-2-5col col-lg-5 d-none d-lg-block">
                <div className="lazy-overlay"></div>
                <LazyLoadImage
                  alt="newsletter"
                  src="images/popup/newsletter/cover-1.jpg"
                  threshold={0}
                  width={383}
                  height={420}
                  effect="blur"
                  className="newsletter-img"
                />
              </div>
            </div>
          </div>
          <button
            title="Close (Esc)"
            type="button"
            className="mfp-close"
            onClick={closeModal}
          >
            <span>×</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default NewsletterModal;
