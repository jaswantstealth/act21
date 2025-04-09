"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../config";

// Define the type for the form data
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  contactNo: string;
  message: string;
}
interface Seo {
  meta_title: string;
  meta_description: string;
}

interface MetaData {
  seo: Seo;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [metaData, setMetaData] = useState<MetaData | null>(null);

  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/contact-metas?populate[]=deep`);
        if (response.data.data && response.data.data.length > 0) {
          const { meta_title, meta_description } = response.data.data[0].attributes.seo;
          setMetaData({ seo: { meta_title, meta_description } });
          console.log("Meta Title:", meta_title);
        } else {
          console.log("No meta data available");
        }
      } catch (error) {
        console.error("Error fetching metadata", error);
      }
    };

    fetchMetaData();
  }, []);

  // Validate form fields
  const validateForm = () => {
    const errors: Partial<FormData> = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }

    // Check if contact number is exactly 10 digits
    if (!formData.contactNo.trim()) {
      errors.contactNo = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contactNo)) {
      errors.contactNo = "Contact number must be exactly 10 digits";
    }

    if (!formData.message.trim()) errors.message = "Message is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Allow only numeric input for contact number and limit to 10 digits
    if (name === "contactNo") {
      if (/^\d{0,10}$/.test(value)) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const payload = {
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
          contact: formData.contactNo,
          message: formData.message,
        };

        const response = await axios.post(`${BASE_URL}/api/contacts`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Form submitted successfully", response.data);
        toast.success(response.data.message);

        // Reset form fields
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          contactNo: "",
          message: "",
        });
      } catch (error: any) {
        console.error("Error during form submission", error);

        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error?.message || // Check for nested error message
          "An error occurred during form submission.";

        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error("Form validation failed. Please check the fields.");
    }
  };

  return (
    <>
      {metaData && (
        <Head>
          <title>{metaData.seo.meta_title}</title>
          <meta name="description" content={metaData.seo.meta_description} />
        </Head>
      )}
      <section className="contact">
        <Container>
          <Row className="align-items-center gx-5 gy-5 gy-lg-0">
            <Col lg={6}>
              <div className="contact_left">
                <h2 className="fw-medium text-capitalize">get Ready To</h2>
                <h5 className="fw-medium text-uppercase">AUTOMATE | Analyse | Engage </h5>
                <h6>
                  Your business processes,
                  <br />
                  decisions and workforce!
                </h6>
              </div>
            </Col>
            <Col lg={6}>
              <div className="contact_right">
                <h5 className="heading text-center">Book a Demo</h5>

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6} className="mt-4">
                      <Form.Group controlId="formFirstName">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Your first name*"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          isInvalid={!!errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.firstName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-4">
                      <Form.Group controlId="formLastName">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Your last name*"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          isInvalid={!!errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.lastName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={12} className="mt-4">
                      <Form.Group controlId="formEmail">
                        <Form.Label>Your Email Address:</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Your email address*"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={12} className="mt-4">
                      <Form.Group controlId="formContactNo">
                        <Form.Label>Contact No:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Your contact no*"
                          name="contactNo"
                          value={formData.contactNo}
                          onChange={handleChange}
                          isInvalid={!!errors.contactNo}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.contactNo}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={12} className="mt-4">
                      <Form.Group controlId="formMessage">
                        <Form.Label>Write A Message:</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          placeholder="Your message*"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          isInvalid={!!errors.message}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={12} className="mt-4 mt-md-5 mx-auto text-center">
                      <Button
                        className="form_btn"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Book now"}{" "}
                        <img src="/assets/img/formarrow.png" alt="arrowbg" />
                      </Button>
                    </Col>
                  </Row>
                  <ToastContainer />
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Contact;
