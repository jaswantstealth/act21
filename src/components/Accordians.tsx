import Link from "next/link";
import React from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../config";
import Slider from "react-slick";

const Accodians = (props: any) => {
  const modulesSlider = {
    dots: false,
    infinite: true,
    speed: 800,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <section className="accordian_sec section_padding50">
      <Container>
        {props?.module.map((sections: any, sectionIndex: any) => {
          const isRowReversed = sectionIndex % 2 !== 0;
          return (
            <Row
              key={sectionIndex}
              className={`g-4 g-md-5 mt-1 mt-md-4 ${
                isRowReversed ? "flex-row-reverse" : ""
              }`}
            >
              <Col lg={6}>
                <div
                  className={`accordain_img mt-4 mt-md-0 ${
                    isRowReversed ? "reverse-img-class" : ""
                  }`}
                >
                  {sections.media ? (
                    Array.isArray(sections.media.data) && sections.media.data.length > 1 ? (
                      <Slider {...modulesSlider}>
                        {sections.media.data.map(
                          (media: any, mediaIndex: any) => (
                            <div key={mediaIndex}>
                              <img
                                src={`${BASE_URL}${media.attributes.url}`}
                                className="img-fluid"
                                alt="accordain_img"
                              />
                            </div>
                          )
                        )}
                      </Slider>
                    ) : (
                      <img
                        src={`${BASE_URL}${sections.media.data[0]?.attributes.url}`}
                        className="img-fluid"
                        alt="accordain_img"
                      />
                    )
                  ) : (
                    <div>No image</div>
                  )}
                </div>
              </Col>
              <Col lg={6}>
                <div className="accordian_heaing mt-4 mt-md-0">
                  <h5>{sections.title}</h5>
                </div>
                <Accordion defaultActiveKey="0">
                  {sections.accordian.map((item: any, itemIndex: any) => (
                    <Accordion.Item
                      eventKey={itemIndex.toString()}
                      key={item.id}
                    >
                      <Accordion.Header>{item.title}</Accordion.Header>
                      <Accordion.Body>{item.description}</Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Col>
            </Row>
          );
        })}
      </Container>
    </section>
  );
};

export default Accodians;
