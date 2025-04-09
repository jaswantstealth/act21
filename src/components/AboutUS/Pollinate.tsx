import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../../config";
const Pollinate = (props:any) => {
  return (
    <section className='banner_bg section_padding50 pollinate-sec'>
      <Container>
        <h2 className='text-white text-uppercase text-center'>
          {props.heading}
        </h2>
        <Row className='align-items-center'>
          <Col lg={6} className='pe-md-5'>
            <div className='pollinate-content'>
              <h6 className='text-white'>{props.subheading}</h6>
              <h5 className='text-white mb-4 mt-4'>{props.title}</h5>
              <p className='text-white' dangerouslySetInnerHTML={{ __html: props.description }}></p>
            </div>
          </Col>
          <Col lg={6}>
            <Row className='pollinatemain-bx'>
              {props.pollinate.map((item:any) => (
                <Col md={6} className='p-0' key={item.id}>
                  <div className='pollinate-overlay'>
                    <div className='pollinatebx text-center'>
                      <img src={`${BASE_URL}${item.media.data.attributes.url}`} alt={item.title} />
                      <h6 className='text-white'>{item.title}</h6>
                      <div className='img-overlay'>
                        <div className='text'>{item.description}</div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Pollinate;
