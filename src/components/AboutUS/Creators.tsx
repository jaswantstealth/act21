"use client";
import React, { useEffect, useState } from "react";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../../config";

const Creators = (props:any) => {
  return ( <section className="creators-sec banner_bg section_padding50 ">
    <Container>
      <h2 className="text-white text-uppercase text-center">
        the creators of butterfly
      </h2>
      <Row className="gy-4 mt-3 mt-md-4">
        {props.leadership.map((leader:any) => (
          <Col key={leader.id} md={6} lg={3} xm={6}>
            <div  className="creatorsbx">
              <Link href={leader.url} className="linkedincircle" target="_blank">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </Link>
              <div className="creators-img">
                <img
                  src={`${BASE_URL}${leader.profile.data.attributes.url}`}
                  alt={
                    leader.profile.data.attributes.alternativeText ||
                    leader.title
                  }
                />
              </div>
              <Link href={leader.url} target="_blank"><h6 className="text-white text-center">{leader.title}</h6></Link>
              
              <p className="text-white text-center">{leader.description}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  </section>);
};

export default Creators;
