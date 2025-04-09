"use client";
import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import { BASE_URL } from "../../../config";

// Main Component
const Whyus = (props: any) => {
  useEffect(() => {
    // Initialize AOS with specified options
    AOS.init({
      duration: 800, // Animation duration
      offset: 600, // Offset for triggering animations
      once: false, // Animation happens on scroll every time
    });

    // Refresh AOS when props change to handle updates
    AOS.refresh();
  }, [props]); // Ensure AOS is refreshed when props change

  return (
    <section className="why_choose mt-4 mt-md-3">
      <Container>
        <Row className="align-items-center g-5 g-md-3">
          <Col
            lg={7}
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-duration="800"
          >
            <div className="why_choose_left">
              <h5>{props.title}</h5>
              <p>{props.description}</p>
            </div>
          </Col>
          <Col
            lg={5}
            data-aos="fade-left"
            data-aos-offset="300"
            data-aos-duration="800"
          >
            <div className="why_choose_right">
              {props?.text?.map((item: any, index: number) => (
                <div className={`why_choose_inner item_${index}`} key={item.id}>
                  <div className="icon_wraper">
                    <img
                      src={`${BASE_URL}${item.icon?.data.attributes.url}`}
                      alt={item.icon?.data.attributes.name}
                    />
                  </div>
                  <div className="content_side">
                    <h6>{item.title}</h6>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Whyus;
