import withApollo from "~/server/apollo";

function ContactForm() {
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
                <h3>DO you need swatches?</h3>
                <h3>Contact us !</h3>
              </div>
              <p className="fbsubtitle">Architects Support</p>
              <p className="fbsubtitle">
                e: info@bafco.eu <br />
                t: +12 345 67 89 01
              </p>
            </div>
            <div className="col-lg-6 col-sm-6 col-xs-12">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name & Surname *"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="E-mail *"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    placeholder="Subject"
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    class="form-control"
                    id="message"
                    rows="3"
                    required
                    placeholder="Message"
                    style={{ resize: "none" }}
                  ></textarea>
                </div>
                <div className="form-group form-check">
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
                </div>
                <button className="btn btn-sm btn-minwidth btn-outline-primary-2">
                  <span>Send</span>
                  <i className="icon-long-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withApollo({ ssr: typeof window == undefined })(ContactForm);
