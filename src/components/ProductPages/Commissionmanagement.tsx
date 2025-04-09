"use client"
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../../config";

const Commissionmanagement = (props:any) => {
  console.log( "cokfzhdgxfcbxk", props.commission_management)
  return <>
  <section className="section_padding50 comission_sec pb-0">
      <Container>
        <h5 className="text-center">
           {props?.commission_management?.title}
        </h5>
        <Row>
          <Col md={12} className="text-center">
          {/* <img src="/assets/img/GIFHY.gif" alt="footer_right" className="img-fluid" /> */}

            <img
              src={`${BASE_URL}${props?.commission_management.icon?.data.attributes.url}`}
            //   alt={images?.data?.attributes?.alternativeText || "Commission Image"}
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </section>
  </>;
};

export default Commissionmanagement;
