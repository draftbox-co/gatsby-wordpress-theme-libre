import React, { useState } from "react";
import { useForm } from "../hook/useForm";
import Navbar from "./navbar";
import "../styles/contact-form.css";

const ContactForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [{ handleSubmit: submitForm, submitting, succeeded }] = useForm(
    "contact"
  );

  const handleSubmit = e => {
    e.preventDefault();
    submitForm(formValues);
  };

  const handleChange = (target, value) => {
    switch (target) {
      case "name":
        setFormValues({ ...formValues, name: value });
        break;
      case "email":
        setFormValues({ ...formValues, email: value });
        break;
      case "message":
        setFormValues({ ...formValues, message: value });
        break;
      default:
        break;
    }
  };

  return (
    <div className="home blog wp-embed-responsive">
      <div id="page" className="hfeed site">
        <Navbar />
        <div id="content" className="site-content">
          <div id="primary" className="content-area">
            <main id="main" className="site-main">
              <div className="post-header">
                <main className="content">
                  <div className="inner">
                    {succeeded && (
                      <h1 className="entry-title-header">
                        {" "}
                        Message Sent Successfully
                      </h1>
                    )}
                    {!succeeded && (
                      <>
                        <h1 className="entry-title-header">Contact Us</h1>
                        <form
                          className="form-content"
                          onSubmit={e => handleSubmit(e)}
                        >
                          <div>
                            <label htmlFor="name">Name</label>
                            <input
                              onChange={e =>
                                handleChange(e.target.id, e.target.value)
                              }
                              id="name"
                              type="text"
                            />
                          </div>
                          <br />
                          <div>
                            <label htmlFor="email">Email</label>
                            <input
                              onChange={e =>
                                handleChange(e.target.id, e.target.value)
                              }
                              required
                              id="email"
                              type="email"
                            />
                          </div>
                          <br />
                          <label htmlFor="message">Message</label>
                          <textarea
                            rows="3"
                            onChange={e =>
                              handleChange(e.target.id, e.target.value)
                            }
                            id="message"
                          />
                          <br />
                          <button disabled={submitting} type="submit">
                            {submitting ? "Sending..." : "Send"}
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                </main>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
