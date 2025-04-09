"use client";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BASE_URL } from "../../../config";

const TimelineSlider = (props: any) => {
  const [isMobile, setIsMobile] = useState(false); // Add state to track mobile screen
// console.log(props.images.data.attributes.url)
  // Check if the screen width is mobile size
  const checkScreenSize = () => {
    if (window.innerWidth <= 767) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    // Add the resize event listener
    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);

    return () => {
      // Cleanup the event listener on component unmount
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // console.log('nbefjnervnr', BASE_URL, props.images.data.attributes.url);
  return (
    <section className="timeline_sec2 ">
      <Container fluid className="p-3 p-lg-0">
        <Row className="gy-0">
        <Col lg="3" className="offset-lg-1 mt-4 mt-lg-0 d-flex align-items-center justify-content-center">
            <div className="left_content">
              <h5>{props.title}</h5>
              
              <img  src={`${BASE_URL}${props.images.data.attributes.url}`} className="d-md-none" alt="buterfly" />
            </div>
          </Col>
          <Col lg="8">
            <div className={`timeline-wrapper position-relative }`}
             style={{
              backgroundImage: isMobile ? "none" : `url(${BASE_URL}${props.images.data.attributes.url})`,
              backgroundSize: "250px",
              backgroundPosition: " top right",
              backgroundRepeat: "no-repeat",  
            }}>
              <div className="timeline_progress">
                <div className="timeline_progress-bar"></div>
              </div>

              {props.about_us_2.map((item: any) => (
                <div key={item.id} className="contant_wraper d-flex">
                  <div className="year">
                    <p>{item.date}</p>
                  </div>
                  <div className="des">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        
        </Row>
        {/* <div className="timeline">
        {props.about_us_2.map((item:any, index:any) => (
          <Row
            key={item.id}
            className={`content_wraper ${index % 2 !== 0 ? "flex-row-reverse" : ""}`}
          >
            <Col md={6} className="d-flex justify-content-center align-items-center flex-column">
            <h6>{item.subtitle}</h6>

              {/* <img
                className="img-fluid"
                src={`${BASE_URL}${item.media.data.attributes.url}`}
                // alt={`Timeline ${index + 1}`}
              /> */}
        {/* </Col>
            <Col md={6}>
              <div className="content">
                <h4 className="year">{item.date}</h4>
                <h5>{item.title}</h5>
                <p>{item.description}</p>
              </div>
            </Col>
            
          </Row> */}
        {/* ))}
      </div> */}
      </Container>
    </section>
  );
};

export default TimelineSlider;
