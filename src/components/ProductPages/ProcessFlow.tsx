"use client";
import React from "react";
import Slider from "react-slick";
import { Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../../config";

const ProcessFlow = (props:any) => {
    const flowSlider = {
        dots: true,
        infinite: true,
        speed: 500,
        margin:20,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        swipeToSlide: true,
        pauseOnFocus: true,
        responsive: [
          {
            breakpoint: 991, // Small screens
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 520, // Extra small screens
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };
    
  return (<>
  <section
      className="process_flow section_padding50 text-white"
      style={{
        backgroundImage:  "url('/assets/img/processflowbg.webp')" ,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        <h5 className="text-center text-white mb-3">Process Flow</h5>
        <div className="process_flow_inner">
          {/* Desktop Layout */}
    
          <div className="desktop-layout">
            <ul className="flow_inner_header">
              {props.media.map((step:any, index:any) => (
                <li key={index} className="inner_header_tabs">
                  {step.title}
                </li>
              ))}
            </ul>
            <div className="flow_inner_content">
              <Row>
                {props.media.map((step:any, index:any) => (
                  <Col key={index}>
                    <div className={`inner_content_box ${index % 2 === 1 ? 'sec_ul' : ''}`}>
                      <div className="content_box_img">
                        <img
                          src={`${BASE_URL}${step.media.data.attributes.url}`}
                          alt={step.media.data[0]?.attributes.name}
                          className="img-fluid"
                        />
                      </div>
                      <ul>
                        {step.text.map((desc:any, descIndex:any) => (
                          <li key={descIndex}>{ desc.text}</li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>

          {/* Mobile Slider */}
          <div className="mobile-slider">
            <Slider {...flowSlider}>
              {props.media.map((step:any, index:any) => (
                <div key={index}>
                  <div className={`inner_content_box ${index % 2 === 1 ? 'sec_ul' : ''}`}>
                    <div className="inner_content_box_heading">
                      <h6 className="mb-4">{step.title}</h6>
                    </div>
                    <div className="content_box_img">
                    <img
                          src={`${BASE_URL}${step.media.data.attributes.url}`}
                          alt={step.media.data[0]?.attributes.name}
                          className="img-fluid"
                        />
                    </div>
                    <ul>
                        {step.text.map((desc:any, descIndex:any) => (
                          <li key={descIndex}>{ desc.text}</li>
                        ))}
                      </ul>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </Container>
    </section>
  </>);
};

export default ProcessFlow;
