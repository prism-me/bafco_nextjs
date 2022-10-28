import React, { useState } from "react";
import withApollo from "~/server/apollo";
import { toast } from "react-toastify";
import { API } from "~/http/API";

function ContactForm({ type }) {
  const defaultState = {
    name: "",
    email: "",
    subject: "",
    message: "",
    type: `${type}`,
  };

  const [formValues, setFormValues] = useState(defaultState);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedData = { ...formValues };
    setLoading(true);
    API.post("/enquiries", updatedData)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          toast.success("Data has been Submitted Successfully!");
          setFormValues({ ...defaultState });
        }
      })
      .catch((err) => {
        setLoading(false);
        alert("Something went wrong.");
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="contactform">
      <div className="formwrapper">
        <div className="container">
          <div
            className="row plannings-container-ideas"
            // style={{ alignItems: "center" }}
          >
            <div className="col-lg-6 col-sm-6 col-xs-12 formDeatilColmblspace">
              <div className="application-heading mb-3">
                <h3>Are you creating a project and looking for solutions?</h3>
                <h3>
                  Do you happen to like one of the products and would like to
                  learn more?
                </h3>
                <h3>Do you need swatches?</h3>
                <h3>Contact Us.</h3>
              </div>
              <p className="fbsubtitle">
                Interior Designer and Architects Support{" "}
              </p>
              <p className="fbsubtitle">
                <a href="mailto:info@bafco.eu" className="cinfo">
                  e: info@bafco.eu
                </a>{" "}
                <br />
                <a href="tel:+97143738300" className="cinfo">
                  {/* t: +12 345 67 89 01 */}
                  t: +971 4 373 8300
                </a>
              </p>
            </div>
            <div className="col-lg-6 col-sm-6 col-xs-12">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Full Name *"
                    name="name"
                    required
                    value={formValues.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="E-mail *"
                    name="email"
                    required
                    value={formValues.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    placeholder="Subject"
                    name="subject"
                    required
                    value={formValues.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="message"
                    rows="3"
                    placeholder="Message"
                    style={{ resize: "none" }}
                    name="message"
                    required
                    value={formValues.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                {/* <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label ml-3" for="exampleCheck1">
                    Signup for Our Nwesletter
                  </label>
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label ml-3" for="exampleCheck1">
                    I have read and accept the Privacy Policy
                  </label>
                </div> */}
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
                    }}
                  />
                ) : (
                  <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
                    <span>Send</span>
                    <i className="icon-long-arrow-right"></i>
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withApollo({ ssr: typeof window == undefined })(ContactForm);
