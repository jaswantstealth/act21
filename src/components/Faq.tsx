import React from 'react'
import { Accordion, Col, Container, Row } from 'react-bootstrap'
import { BASE_URL } from '../../config'

const Faq = (props:any) => {
  return (
    <>
    <section className="faq section_padding50">
        <Container>
          <Row className="gy-4">
            <Col lg={6} className="heading_side_wraper">
              <div className="faq_heading">
                <h5 className="text-start">{props.heading}</h5>
                <p>{props.description}</p>
              </div>

              <img
                src={`${BASE_URL}${props.media.data.attributes.url}`}
                className="img-fluid"
                alt="question img"
              />
            </Col>
            <Col lg={6}>
              <Accordion>
                {props.faq_accordian.map((item:any) => (
                  <Accordion.Item eventKey={item.id.toString()} key={item.id}>
                    <Accordion.Header>
                      <span>{item.title}</span>
                    </Accordion.Header>
                    <Accordion.Body>{item.description}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Faq