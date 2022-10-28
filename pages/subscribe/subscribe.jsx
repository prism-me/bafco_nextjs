import { API } from "~/http/API";
import Reveal from "react-awesome-reveal";
import { useState } from "react";
import { fadeIn } from "~/utils/data";
import { toast } from "react-toastify";

function Subscribe() {
  const [email, setEmail] = useState("");

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
        if (response?.status === 200) {
          toast.success(response?.data);
        } else {
          toast.error("Please fill in the required fields.");
        }
      })
      .catch((error) => {
        toast.error("Somthing went wrong !");
      });
  }
  return (
    <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
      <div
        className="footer-newsletter bg-image"
        style={{
          backgroundImage: "url(images/backgrounds/NewsletterBackground.jpg)",
        }}
      >
        <div className="container">
          <div className="heading text-center">
            <h3 className="title">Keep in Touch</h3>

            <p className="title-desc">Join Our Newsletter</p>
          </div>

          <div className="row">
            <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <form action="#">
                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="form-control"
                    placeholder="Enter your Email Address"
                    aria-label="Email Adress"
                    aria-describedby="newsletter-btn"
                    required
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      type="button"
                      id="newsletter-btn"
                      onClick={handleSubmit}
                    >
                      <span>Subscribe</span>
                      <i className="icon-long-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
export default Subscribe;
