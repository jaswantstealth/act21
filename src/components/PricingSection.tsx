import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const PricingSection = (props: any) => {
  // const section = props.data[0]?.attributes?.section?.find(
  //   (sec: any) => sec.__component === "sections.package"
  // );

  return (
    <section className="price_sec">
      <Container>
        <Row className="price_inner align-items-center gy-4 gy-lg-0">
          <Col lg={4}>
            <div className="price_inner_first">
              <div className="inner_first_header">
                <h6>{props.title}</h6>
                <p>{props.text}</p>
              </div>
              <div className="price_content">
                {props.package_details.map((pkg: any) => (
                  <p key={pkg.id}>{pkg.title}</p>
                ))}
              </div>
            </div>
          </Col>
          <Col lg={8}>
            <Row className="gy-4 gy-lg-0">
              {props.package.slice(0,2).map((pkg: any) => (
                <Col md={6} lg={6} key={pkg.id}>
                  <div className="price_box h-100">
                    <div className="price_inner_box d-flex justify-content-between flex-column h-100">
                      <div className="inner_box_head">
                      <div className={`head_top ${pkg.title === "Standard" ? "yellowBgColor" : ""}`}>
                          <h6>{pkg.title}</h6>
                          <p>{pkg.description}</p>
                        </div>
                      </div>
                      <div className="price">
                        <p className={` ${pkg.title === "Standard" ? "yellowColor" : ""}`}>
                          ${pkg.price} <span>{pkg.type}</span>
                        </p>
                      </div>
                      <div className="inner_content">
                        {props.package_details.map((detail: any) => (
                          <div className="img_wraper" key={detail.id}>
                            {pkg.title === "Basic" && detail.basic ? (
                              <img
                                src="/assets/img/greencheck.png"
                                alt="check"
                              />
                            ) : pkg.title === "Standard" && detail.standard ? (
                              <img
                                src="/assets/img/greencheck.png"
                                alt="check"
                              />
                            ) : (
                              <img src="/assets/img/redx.png" alt="not available" />
                            )}
                            <p>{detail.title}</p>
                          </div>
                        ))}
                        </div>
                      <div className="price_btn">
                        <a href={pkg.url}className={`price_btn ${pkg.title === "Standard" ? "yellowBgColor" : ""}`}>
                          {pkg.Button}</a>
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

export default PricingSection;
