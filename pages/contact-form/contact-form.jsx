import React, { useState } from "react";
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
                  <button
                    className="btn btn-sm btn-minwidth btn-outline-primary-2 mt-3"
                    disabled
                  >
                    <span>Sending ...</span>
                    <i className="icon-long-arrow-right"></i>
                  </button>
                ) : (
                  <button className="btn btn-sm btn-minwidth btn-outline-primary-2 mt-3">
                    <span>Send</span>
                    <i className="icon-long-arrow-right"></i>
                  </button>
                )}
              </form>
              {/* <div
                id="crmWebToEntityForm"
                className="zcwf_lblLeft crmWebToEntityForm"
                style={{
                  backgroundColor: "transparent",
                  color: "black",
                  maxWidth: "100%",
                }}
              >
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0"
                />
                <form
                  action="https://crm.zoho.com/crm/WebToLeadForm"
                  name={`WebToLeads5418603000000737066`}
                  method="POST"
                  enctype="multipart/form-data"
                  onSubmit='javascript:document.charset="UTF-8"; return checkMandatory5418603000000737066()'
                  accept-charset="UTF-8"
                >
                  <input
                    type="text"
                    style={{ display: "none" }}
                    name="xnQsjsdp"
                    value="8df48e75ac766d3d0df3e68e33edfc9147848055d18ebdc293b459c292dd8c2d"
                  />
                  <input type="hidden" name="zc_gad" id="zc_gad" value="" />
                  <input
                    type="text"
                    style={{ display: "none" }}
                    name="xmIwtLD"
                    value="50e327cca2a258f6690146f6b17457fbdfc525271659a3725acda6bc76ac4135"
                  />
                  <input
                    type="text"
                    style={{ display: "none" }}
                    name="actionType"
                    value="TGVhZHM="
                  />
                  <input
                    type="text"
                    style={{ display: "none" }}
                    name="returnURL"
                    value="https://www.bafco.com/thankyou.html"
                  />

                  <div
                    className="zcwf_title"
                    style={{
                      maxWidth: "600px",
                      color: "black",
                      display: "none",
                    }}
                  >
                    Website Form
                  </div>

                  <div className="zcwf_row">
                    <div
                      className="zcwf_col_lab"
                      style={{ fontSize: "12px", fontFamily: "'Arial'" }}
                    >
                      <label for="Last_Name">
                        Name<span style={{ color: "red" }}>*</span>
                      </label>
                    </div>
                    <div className="zcwf_col_fld p-0">
                      <input
                        type="text"
                        id="Last_Name"
                        name="Last Name"
                        maxlength="80"
                        required
                        placeholder="Full Name *"
                      />
                      <div className="zcwf_col_help"></div>
                    </div>
                  </div>

                  <div className="zcwf_row">
                    <div
                      className="zcwf_col_lab"
                      style={{ fontSize: "12px", fontFamily: "'Arial'" }}
                    >
                      <label for="Email">
                        Email<span style={{ color: "red" }}>*</span>
                      </label>
                    </div>
                    <div className="zcwf_col_fld p-0">
                      <input
                        type="email"
                        // ftype="email"
                        id="Email"
                        name="Email"
                        maxlength="100"
                        required
                        placeholder="E-mail *"
                      />
                      <div className="zcwf_col_help"></div>
                    </div>
                  </div>

                  <div className="zcwf_row">
                    <div
                      className="zcwf_col_lab"
                      style={{ fontSize: "12px", fontFamily: "'Arial'" }}
                    >
                      <label for="Mobile">
                        Phone Number<span style={{ color: "red" }}>*</span>
                      </label>
                    </div>
                    <div className="zcwf_col_fld p-0">
                      <input
                        type="text"
                        id="Mobile"
                        name="Mobile"
                        maxlength="30"
                        required
                        placeholder="Phone Number *"
                      />
                      <div className="zcwf_col_help"></div>
                    </div>
                  </div>
                  <div className="zcwf_row">
                    <div
                      className="zcwf_col_lab"
                      style={{ fontSize: "12px", fontFamily: "'Arial'" }}
                    >
                      <label for="LEADCF6">Subject</label>
                    </div>
                    <div className="zcwf_col_fld">
                      <input
                        type="text"
                        id="LEADCF6"
                        name="LEADCF6"
                        maxlength="255"
                        placeholder="Subject"
                      />
                      <div className="zcwf_col_help"></div>
                    </div>
                  </div>
                  <div className="zcwf_row wfrm_fld_dpNn">
                    <div
                      className="zcwf_col_lab"
                      style={{ fontSize: "12px", fontFamily: "'Arial'" }}
                    >
                      <label for="Lead_Source">Lead Source</label>
                    </div>
                    <div className="zcwf_col_fld">
                      <select
                        className="zcwf_col_fld_slt"
                        id="Lead_Source"
                        name="Lead Source"
                      >
                        <option value="-None-">-None-</option>
                        <option value="Advertisement">Advertisement</option>
                        <option value="Amazon">Amazon</option>
                        <option value="Architect">Architect</option>
                        <option value="BNI">BNI</option>
                        <option value="Brokers">Brokers</option>
                        <option value="Chat">Chat</option>
                        <option value="Client&#x20;Referral">
                          Client Referral
                        </option>
                        <option value="Cold&#x20;Call">Cold Call</option>
                        <option value="Cold&#x20;Calling">Cold Calling</option>
                        <option value="Consultant">Consultant</option>
                        <option value="Email&#x20;to&#x20;Marketing">
                          Email to Marketing
                        </option>
                        <option value="Email&#x20;to&#x20;Salesmen">
                          Email to Salesmen
                        </option>
                        <option value="Employee&#x20;Referral">
                          Employee Referral
                        </option>
                        <option value="Existing&#x20;client">
                          Existing client
                        </option>
                        <option value="Facebook">Facebook</option>
                        <option value="Field&#x20;Visit">Field Visit</option>
                        <option value="Google&#x20;Ads">Google Ads</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Interior&#x20;Design&#x20;Company&#x20;Ref.">
                          Interior Design Company Ref.
                        </option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Noon">Noon</option>
                        <option value="Online&#x20;Store">Online Store</option>
                        <option value="Self&#x20;Generated">
                          Self Generated
                        </option>
                        <option value="Telephone">Telephone</option>
                        <option value="Twitter">Twitter</option>
                        <option value="Walk-in">Walk-in</option>
                        <option value="Website&#x20;Chat">Website Chat</option>
                        <option selected value="Website&#x20;Form">
                          Website Form
                        </option>
                        <option value="Whats&#x20;App">Whats App</option>
                        <option value="Yahoo">Yahoo</option>
                      </select>
                      <div className="zcwf_col_help"></div>
                    </div>
                  </div>
                  <div className="zcwf_row">
                    <div
                      className="zcwf_col_lab"
                      style={{ fontSize: "12px", fontFamily: "'Arial'" }}
                    >
                      <label for="Description">Message</label>
                    </div>
                    <div className="zcwf_col_fld">
                      <textarea
                        id="Description"
                        name="Description"
                        cols="30"
                        rows="4"
                        placeholder="Message"
                        style={{ resize: "none" }}
                      ></textarea>
                      <div className="zcwf_col_help"></div>
                    </div>
                  </div>
                  <div className="zcwf_row" style={{ display: "none" }}>
                    <div
                      className="zcwf_col_lab"
                      style={{
                        fontSize: "12px",
                        fontFamily: "'Arial'",
                      }}
                    >
                      Upload a File
                    </div>
                    <div className="zcwf_col_fld">
                      <div className="clearB">
                        <input
                          type="file"
                          className="zcwf_file"
                          name="theFile"
                          id="theFile5418603000000737066"
                          multiple
                        />
                        <div
                          className="zcwf_col_help"
                          style={{ display: "none" }}
                        >
                          <span
                            title="Click to upload"
                            style={{
                              cursor: "pointer",
                              width: "16px",
                              height: "16px",
                              display: "inline-block",
                              background: "#fff",
                              border: "1px solid #ccc",
                              color: "#ccc",
                              textAlign: "center",
                              fontSize: "11px",
                              lineHeight: "16px",
                              fontWeight: "bold",
                              borderRadius: "50%",
                            }}
                            onclick="tooltipShow5418603000000737066(this)"
                          >
                            ?
                          </span>
                          <div
                            className="zcwf_tooltip_over"
                            style={{ display: "none" }}
                          >
                            <span className="zcwf_tooltip_ctn">
                              Click to upload
                            </span>
                          </div>
                        </div>
                      </div>
                      <p
                        style={{
                          color: "black",
                          fontSize: "11px",
                          paddingLeft: "3px",
                        }}
                      >
                        File(s) size limit is 20MB.
                      </p>
                    </div>
                  </div>
                  <div className="zcwf_row">
                    <div className="zcwf_col_lab"></div>
                    <div className="zcwf_col_fld">
                      <center>
                        <input
                          type="submit"
                          id="formsubmit"
                          className="formsubmit zcwf_button"
                          value="Submit"
                          title="Submit"
                        />
                        <input
                          type="reset"
                          className="zcwf_button"
                          name="reset"
                          value="Reset"
                          title="Reset"
                        />
                      </center>
                    </div>
                  </div>
                </form>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
