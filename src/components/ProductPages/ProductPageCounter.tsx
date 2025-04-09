"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const ProductPageCounter = (props:any) => {
    const { ref, inView } = useInView({
        triggerOnce: true, // Trigger only once
        threshold: 0.5, // Trigger when 50% of the element is in view
      });
  return (<>
  <section className="hyper_counter section_padding50" ref={ref}>
      <Container>
        <Row className="align-items-center gy-4 ">
          <Col lg={6}>
            <div className="counter_left">
              <div
                className="counter_left_heading"
                dangerouslySetInnerHTML={{ __html: props?.text ?? "" }}
              />
              <p>{props.description}</p>
            </div>
          </Col>
          <Col lg={6}>
            <div className="couner_box_wraper">
              {props.percentage.map((item:any) => (
                <div className="counter_box" key={item.id}>
                  <h3>
                    {inView ? (
                      <CountUp start={0} end={parseInt(item.title)} duration={2.5} />
                    ) : (
                      item.title
                    )}
                    %
                  </h3>
                  <p>{item.subTitle}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section></>);
};

export default ProductPageCounter;
