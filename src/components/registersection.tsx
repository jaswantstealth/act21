// components/Registersection/index.tsx

import React, { useState } from "react";
import { BASE_URL } from "../../config"; // <-- your API base URL
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RegistersectionProps {
  firsttext: string;
  secondtext: string;
  paragraph: string;
  Date: string;
  starttime: string;
  endtime: string;
  webinarlogo: {
    data: {
      attributes: {
        url: string;
        name: string;
      };
    };
  };
  attendeestitle: string;
  attendees: {
    id: number;
    name: string;
    designation: string;
    attendeeimg: {
      data: {
        attributes: {
          url: string;
          name: string;
        };
      };
    };
  }[];
}

const Registersection = (props: RegistersectionProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const isEventOver = () => {
    const eventDate = new Date(props.Date);
    const today = new Date();

   
    // Set event date to end of the day (11:59 PM)
    eventDate.setHours(23, 59, 59, 999);

    return today > eventDate;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/registers`, {
        data: {
          ...formData,
          eventTitle: props.firsttext,
          eventDate: props.Date,
          eventTime: `${props.starttime} - ${props.endtime}`,
        },
      });

      

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        contactNo: "",
      });

      toast.success("Registration successful!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Utility functions
  const dateObj = new Date(props.Date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "short" });
  const year = dateObj.getFullYear();

  const formatTime = (time: string) => {
    if (!time) return "";
    const [hoursStr, minutesStr] = time.split(":");
    let hours = parseInt(hoursStr, 10);
    const minutes = minutesStr;
    const ampm = hours >= 12 ? "p.m." : "a.m.";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const getDayWithSuffix = (day: number) => {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const dayWithSuffix = getDayWithSuffix(day);

  return (
    <div className="register_sec">
      <Container>
        {isEventOver() ? (
          <div className="text-center py-5">
            <h2 className="text-white">This event is over.</h2>
          </div>
        ) : (
          <>
            <Row className="g-md-5 g-4 justify-content-between">
              <Col md={6}>
                <img
                  src={`${BASE_URL}${props.webinarlogo.data.attributes.url}`}
                  alt={props.webinarlogo.data.attributes.name}
                  className="img-fluid registerlogo"
                />
                <h2>{props.firsttext}</h2>
                <h3>{props.secondtext}</h3>

                <div className="d-flex align-items-end gap-4 mt-lg-5 mt-4">
                  <div className="date">
                    <p>{dayWithSuffix}</p>
                    <p className="month">
                      <span>{month}</span>
                    </p>
                    <p>{year}</p>
                  </div>

                  <div className="register_content">
                    <p>{props.paragraph}</p>
                    <p className="time">
                      {formatTime(props.starttime)} -{" "}
                      {formatTime(props.endtime)}
                    </p>
                  </div>
                </div>
              </Col>

              <Col md={5}>
                <div className="register_form">
                  <h5>Register Now!</h5>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={12} className="mt-4">
                        <Form.Group controlId="formFirstName">
                          <Form.Label>First Name:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Your first name*"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={12} className="mt-4">
                        <Form.Group controlId="formLastName">
                          <Form.Label>Last Name:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Your last name*"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
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
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={12} className="mt-4">
                        <Form.Group controlId="formContactNo">
                          <Form.Label>Contact No:</Form.Label>
                          <Form.Control
                            type="text"
                            inputMode="numeric" // <--- mobile number keyboard
                            pattern="\d{10}" // <--- browser validation (10 digits)
                            placeholder="Contact no*"
                            name="contactNo"
                            value={formData.contactNo}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d{0,10}$/.test(value)) {
                                handleChange(e);
                              }
                            }}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={12} className="mt-4 mt-md-5 mx-auto text-center">
                        <Button
                          className="form_btn"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Registering..." : "Register"}
                          <img src="/assets/img/formarrow.png" alt="arrow" />
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                  <ToastContainer />
                </div>
              </Col>
            </Row>

            {/* Attendees Section */}
            <h2 className="mt-5 text-center text-white">
              {props.attendeestitle}
            </h2>
            <Row className="gy-4 mt-4 mt-md-5 attendees_wraper">
              {props.attendees?.map((item) => (
                <Col md={6} lg={3} key={item.id}>
                  <div className="attendee_img_wraper">
                    <img
                      src={`${BASE_URL}${item.attendeeimg.data.attributes.url}`}
                      alt={item.attendeeimg.data.attributes.name}
                      className="img-fluid"
                    />
                  </div>

                  <div className="attendee_content_wraper">
                    <p>{item.name}</p>
                    <p>{item.designation}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default Registersection;
