"use client"
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BASE_URL } from '../../../config';

const DistinctiveModels = (props:any) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const handleMouseEnter = (index: number) => {
        setActiveIndex(index);
      };
    
  return (
    (<> <section
        className="undwr_modules section_padding50"
        style={{
          backgroundImage: 'url("/assets/img/bg-2.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container>
          <h4 className="text-white text-center">
            {props.title}
          </h4>
          <Row className="align-items-center g-2">
            {props.text.map((module:any, index:any) => (
              <Col lg={3} xs={6} key={module.id}>
                <div
                  className={`modules_box ${index === activeIndex ? "showit" : ""}`}
                  onMouseEnter={() => handleMouseEnter(index)}
                >
                  <div className="img_box">
                    <img
                      src={`${BASE_URL}${module.icon.data.attributes.url}`}
                      className="img-fluid"
                      alt={module.icon.data.attributes.alternativeText || module.title}
                    />
                    <h6>{module.title}</h6>
                  </div>
                  <div className="box_content">
                    <p>{module.description}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section></>)
  )
}

export default DistinctiveModels

function setActiveIndex(index: number) {
    throw new Error('Function not implemented.');
}
