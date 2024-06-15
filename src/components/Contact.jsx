import React, { useState } from 'react';
import * as emailjs from 'emailjs-com';
import './contact.css';

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showForm, setShowForm] = useState(false);

  const { name, email, message } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
      name: name,
      email: email,
      to_name: 'YOUR NAME OR COMPANY',
      message: message
    };

    emailjs.send(
      "service_8ozwkno",
      "template_af2o3oe",
      templateParams,
      "9Xv2J4N48aW9CUDLK"
    )
    .then(
      (result) => {
        console.log(result.text);
        setSubmitted(true);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      },
      (error) => {
        console.log(error.text);
        setSubmitted(true);
        setFailure(true);
        setTimeout(() => {
          setFailure(false);
        }, 3000);
      }
    );

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <section className="section contact all" aria-label="contact" id="contact">
        <div className="container text-center position-relative">
          <div className="title-wrapper">

          </div>
          {showForm && (
            <div className="row justify-content-center px-lg-5 py-3">
              <div className="col-md-6">
                <div className="contact-form text-center p-5">
                  <h5 className="mb-4">Send us a message</h5>
                  <form
                    className="form-wrapper"
                    name="contact-form"
                    method="POST"
                    onSubmit={handleSubmit}
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                  >
                    <div className="form-group mb-2">
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-2">
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-4">
                      <textarea
                        className="form-control"
                        name="message"
                        placeholder="Message"
                        value={message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <button
                        className={
                          submitted
                            ? "btn btn-round disabled px-3"
                            : "btn btn-round px-3"
                        }
                        type="submit"
                        name="submit"
                        id="submit"
                        value="Submit"
                      >
                        {submitted ? (
                          <span>
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>{" "}
                            Sending ...
                          </span>
                        ) : (
                          <span>Send Message</span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          <button onClick={toggleForm} className="btn btn-toggle">
            {showForm ? 'Hide Contact Form' : 'Contact Us'}
          </button>
        </div>
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div
            className={
              success
                ? "toast show align-items-center text-bg-success border-0"
                : "d-none"
            }
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body">Message sent successfully</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div
            className={
              failure
                ? "toast show align-items-center text-bg-danger border-0"
                : "d-none"
            }
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body">Something went wrong</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
