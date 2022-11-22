import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import ALink from "~/components/features/alink";
import { API } from "~/http/API";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { actions as globalAction } from "~/store/global";
import { connect } from "react-redux";
const axios = require("axios").default;

const customStyles = {
  overlay: {
    backgroundColor: "rgba(77,77,77,0.6)",
    zIndex: "9000",
  },
};

Modal.setAppElement("body");

const userForm = {
  name: "",
  email: "",
  password: "",
};

function LoginModal(props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [userFormData, setUserFormData] = useState({ ...userForm });
  const [openForgotPasswordForm, setOpenForgotPasswordForm] = useState(false);
  const [forgotPasswordemail, setForgotPasswordEmail] = useState("");
  const [isRememberChecked, setIsRememberChecked] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  let timer;

  // console.log("VerificationPAge :: ", props)

  useEffect(() => {
    setOpen(props.LoginModal);
    return () => {
      if (timer) clearTimeout(timer);
    };
  });

  const handleChange = () => {
    console.log("onChangeCheckbox :: ", !isRememberChecked);
    setIsRememberChecked(!isRememberChecked);
  };

  const handleChangeIsAgree = () => {
    setIsAgree(!isAgree);
  };

  function closeModal() {
    document
      .getElementById("login-modal")
      .classList.remove("ReactModal__Content--after-open");

    if (document.querySelector(".ReactModal__Overlay")) {
      document.querySelector(".ReactModal__Overlay").style.opacity = "0";
    }

    timer = setTimeout(() => {
      setOpen(false);
      props.hidePopup(false);
    }, 350);
  }

  function handelOpenForgotPasswordForm(e) {
    e.preventDefault();
    setOpenForgotPasswordForm(true);
  }
  function handelCloseForgotPasswordForm(e) {
    e.preventDefault();
    setOpenForgotPasswordForm(false);
  }

  function openModal(e) {
    e.preventDefault();
    // setOpen(true);
    props.showPopup(true);
  }

  const handleInit = (e) => {
    let formdata = { ...userFormData };
    formdata[e.target.name] = e.target.value;
    setUserFormData(formdata);
  };

  const handleForgotPasswordemailInit = (e) => {
    setForgotPasswordEmail(e.target.value);
  };

  const handleRigistrationSubmit = (e) => {
    // if (
    //   userFormData?.name !== "" &&
    //   userFormData?.email !== "" &&
    //   userFormData?.password !== "" &&
    //   userFormData?.password.length >= 6
    // ) {
    if (userFormData?.name === "") {
      toast.error("Please Enter User Name.");
      return false;
    }
    if (userFormData?.email === "") {
      toast.error("Please Enter Email.");
      return false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userFormData?.email)
    ) {
      alert("Invalid email address.");
      return;
    }
    if (userFormData?.password === "") {
      toast.error("Please Enter Password.");
      return false;
    } else if (userFormData?.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }
    let formdata = new FormData();
    formdata.append("name", userFormData?.name);
    formdata.append("email", userFormData?.email);
    formdata.append("password", userFormData?.password);
    formdata.append("user_type", "user");
    formdata.append("redirect_url", "https://bafco-next.herokuapp.com/");
    setLoading(true);
    API.post(`/auth/register`, formdata, {
      "Content-Type": `multipart/form-data; boundary=${formdata._boundary}`,
    })
      .then((response) => {
        if (response?.data?.errors) {
          setLoading(false);
          toast.error(response?.data?.message);
        } else {
          closeModal();
          setLoading(false);
          toast.success(response?.data?.message);
          router.push("/verification");
          props.verificationPageShow(true);
          // props.showPopup(true);
          props.hidePopup(false);
        }
        // localStorage.setItem("userData", JSON.stringify(response.data));
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleLoginSubmit = async () => {
    if (userFormData?.email === "") {
      toast.error("Please Enter Email.");
      return false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userFormData?.email)
    ) {
      alert("Invalid email address.");
      return;
    }
    if (userFormData?.password === "") {
      toast.error("Please Enter Password.");
      return false;
    } else if (userFormData?.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }

    let formdata = {
      email: userFormData.email,
      password: userFormData.password,
      user_type: "user",
    };
    setLoading(true);
    API.post(`/auth/login`, formdata)
      .then((response) => {
        if (response?.data?.error) {
          setLoading(false);
          toast.error(response?.data?.error);
        } else if (response?.data?.errors) {
          setLoading(false);
          toast.error(response?.data?.errors?.email[0]);
        } else {
          setLoading(false);
          router.push("/account/");
          toast.success(response?.data);
          closeModal();
          localStorage.setItem("authtoken", response?.headers?.x_auth_token);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data);
      });
  };

  const handleForgotePasswordSubmit = async () => {
    if (forgotPasswordemail === "") {
      toast.error("Please Enter Email.");
      return false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(forgotPasswordemail)
    ) {
      alert("Invalid email address.");
      return;
    }

    let formdata = {
      email: `${forgotPasswordemail}`,
      redirect_url: "http://bafco-next.herokuapp.com/",
    };
    setLoading(true);
    API.post(`/forget-password`, formdata)
      .then((response) => {
        if (response?.data?.errors) {
          setLoading(false);
          toast.warning(response?.data?.errors?.email[0]);
        } else {
          setLoading(false);
          toast.success(response?.data);
          closeModal();
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data);
      });
  };
  return (
    <div className="account" onClick={openModal}>
      <ALink href="#">
        <div className="icon">
          <i className="icon-user"></i>
        </div>
        <p>Account</p>
      </ALink>

      {open ? (
        <Modal
          isOpen={open}
          style={customStyles}
          contentLabel="login Modal"
          className="modal-dialog"
          overlayClassName="d-flex align-items-center justify-content-center"
          id="login-modal"
          onRequestClose={closeModal}
          closeTimeoutMS={10}
        >
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close" onClick={closeModal}>
                <span aria-hidden="true">
                  <i className="icon-close"></i>
                </span>
              </button>
              <div className="form-box">
                <div className="form-tab">
                  <Tabs selectedTabClassName="show" defaultIndex={0}>
                    <TabList className="nav nav-pills nav-fill">
                      <Tab className="nav-item">
                        <span className="nav-link">Sign In</span>
                      </Tab>

                      <Tab className="nav-item">
                        <span className="nav-link">Register</span>
                      </Tab>
                    </TabList>

                    <div className="tab-content">
                      <TabPanel style={{ paddingTop: "2rem" }}>
                        {openForgotPasswordForm !== true ? (
                          <div>
                            <form method="post">
                              <div className="form-group">
                                <label htmlFor="singin-email-2">
                                  Email address *
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="singin-email-2"
                                  name="email"
                                  onChange={handleInit}
                                  required
                                />
                              </div>

                              <div className="form-group">
                                <label htmlFor="singin-password-2">
                                  Password *
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="singin-password-2"
                                  name="password"
                                  onChange={handleInit}
                                  required
                                />
                              </div>

                              <div className="form-footer">
                                {loading ? (
                                  <div
                                    className="loader"
                                    style={{
                                      borderTopColor: "white",
                                      borderRightColor: "white",
                                      borderBottomColor: "white",
                                      borderLeftColor: "#008482",
                                      width: "sm"
                                        ? "6em"
                                        : "md"
                                        ? "10em"
                                        : "10em",
                                      height: "sm"
                                        ? "6em"
                                        : "md"
                                        ? "10em"
                                        : "10em",
                                    }}
                                  />
                                ) : (
                                  <button
                                    type="button"
                                    onClick={handleLoginSubmit}
                                    className="btn btn-outline-primary-2"
                                  >
                                    <span>LOG IN</span>
                                    <i className="icon-long-arrow-right"></i>
                                  </button>
                                )}

                                {/* <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="signin-remember-2"
                                    value={isRememberChecked}
                                    onChange={handleChange}
                                    name="lsRememberMe"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="signin-remember-2"
                                  >
                                    Remember Me
                                  </label>
                                </div> */}

                                <span
                                  onClick={(e) =>
                                    handelOpenForgotPasswordForm(e)
                                  }
                                  className="forgot-link"
                                >
                                  Forgot Your Password?
                                </span>
                              </div>
                            </form>
                            {/* <div className="form-choice">
                                                            <p className="text-center">or sign in with</p>
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <ALink href="#" className="btn btn-login btn-g">
                                                                        <i className="icon-google"></i>
                                                                            Login With Google
                                                                    </ALink>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <ALink href="#" className="btn btn-login btn-f">
                                                                        <i className="icon-facebook-f"></i>
                                                                            Login With Facebook
                                                                    </ALink>
                                                                </div>
                                                            </div>
                                                        </div> */}
                          </div>
                        ) : (
                          <div>
                            <form method="post">
                              <div className="form-group">
                                <label htmlFor="singin-email-2">
                                  Email address *
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="singin-email-2"
                                  name="email"
                                  value={forgotPasswordemail}
                                  onChange={handleForgotPasswordemailInit}
                                  required
                                />
                              </div>

                              <div className="form-footer">
                                {loading ? (
                                  <div
                                    className="loader"
                                    style={{
                                      borderTopColor: "white",
                                      borderRightColor: "white",
                                      borderBottomColor: "white",
                                      borderLeftColor: "#008482",
                                      width: "sm"
                                        ? "6em"
                                        : "md"
                                        ? "10em"
                                        : "10em",
                                      height: "sm"
                                        ? "6em"
                                        : "md"
                                        ? "10em"
                                        : "10em",
                                    }}
                                  />
                                ) : (
                                  <button
                                    type="button"
                                    onClick={handleForgotePasswordSubmit}
                                    className="btn btn-outline-primary-2"
                                  >
                                    <span>Forgot Password</span>
                                    <i className="icon-long-arrow-right"></i>
                                  </button>
                                )}
                                <span
                                  onClick={(e) =>
                                    handelCloseForgotPasswordForm(e)
                                  }
                                  className="forgot-link"
                                  style={{
                                    color: "#EE3124",
                                    fontWeight: "600",
                                  }}
                                >
                                  <i className="icon-long-arrow-left"></i>Back
                                  To Login
                                </span>
                              </div>
                            </form>
                          </div>
                        )}
                      </TabPanel>

                      <TabPanel>
                        <form onSubmit={handleRigistrationSubmit}>
                          <div className="form-group">
                            <label htmlFor="register-email-2">
                              Your Name *
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="register-name-2"
                              name="name"
                              onChange={handleInit}
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="register-email-2">
                              Your email address *
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="register-email-2"
                              name="email"
                              onChange={handleInit}
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="register-password-2">
                              Password *
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="register-password-2"
                              name="password"
                              onChange={handleInit}
                              required
                            />
                          </div>

                          <div className="form-footer">
                            {loading ? (
                              <div
                                className="loader"
                                style={{
                                  borderTopColor: "white",
                                  borderRightColor: "white",
                                  borderBottomColor: "white",
                                  borderLeftColor: "#008482",
                                  width: "sm" ? "6em" : "md" ? "10em" : "10em",
                                  height: "sm" ? "6em" : "md" ? "10em" : "10em",
                                  margin: "auto",
                                }}
                              />
                            ) : (
                              <button
                                type="button"
                                className="btn btn-outline-primary-2"
                                onClick={handleRigistrationSubmit}
                              >
                                <span>SIGN UP</span>
                                <i className="icon-long-arrow-right"></i>
                              </button>
                            )}

                            {/* <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="register-policy-2"
                                value={isAgree}
                                onChange={handleChangeIsAgree}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="register-policy-2"
                              >
                                I agree to the privacy policy *
                              </label>
                            </div> */}
                          </div>
                        </form>
                        {/* <div className="form-choice">
                                                        <p className="text-center">or sign in with</p>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <ALink href="#" className="btn btn-login btn-g">
                                                                    <i className="icon-google"></i>
                                                                    Login With Google
                                                                </ALink>
                                                            </div>
                                                            <div className="col-md-6 mt-1 mt-md-0">
                                                                <ALink href="#" className="btn btn-login  btn-f">
                                                                    <i className="icon-facebook-f"></i>
                                                                    Login With Facebook
                                                                </ALink>
                                                            </div>
                                                        </div>
                                                    </div> */}
                      </TabPanel>
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // wishlist: state.wishlist.data,
    // comparelist: state.comparelist.data,
    LoginModal: state.globalReducer.popupShow,
    VerificationPage: state.globalReducer.verificationshow,
  };
};

// export default LoginModal;
export default connect(mapStateToProps, { ...globalAction })(LoginModal);
