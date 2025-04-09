"use client";

import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BASE_URL } from "../../../config";

const Fintechparnters = (props:any) => {
  return (<>
  <section className="fintechaprtner section_padding50">
      <Container>
        <Row className="align-items-center gy-4">
          <Col lg={3}>
            <h2 className="f_50">{props.title }</h2>
          </Col>
          <Col lg={9}>
            <div className="partner_box_wraper">
              {props.partners.map((partner:any) => (
                <div className="partner_box" key={partner.id}>
                  <img
                  src={`${BASE_URL}${partner.media.data[0].attributes.url}`}
                    
                    // alt={partner.images.data.attributes.alternativeText || partner.title}
                  />
                  <p>{partner.title}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section></>);
};

export default Fintechparnters;
