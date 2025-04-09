import Link from "next/link";
import React from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { BASE_URL } from "../../config";
import Image from "next/image";
const Capapbilities = (props: any) => {
  return (
    <section className="capapbilities">
      <Container>
        <h2>{props.title}</h2>
        <Tabs
          defaultActiveKey={props?.capapbilities[1]?.id.toString()}
          id="captabs"
          className="justify-content-evenly custom-tabs"
        >
          {props?.capapbilities .map((capapbility:any) => (
            <Tab
              key={capapbility.id}
              eventKey={capapbility.id.toString()}
              title={capapbility.tab}
            >
              <Row className="align-items-center gy-md-2 gy-4">
                <Col md={6}>
                  <div className="img_wrper">
                    {/* <Image
                      src={`${BASE_URL}${
                        capapbility.media?.data?.attributes?.url
                      }`}
                      width={546}
                      height={330}
                      alt={capapbility.tab}
                      className="img-fluid"
                    /> */}
                    <img src={`${BASE_URL}${
                        capapbility.media?.data?.attributes?.url
                      }`}  alt={capapbility.tab}
                      className="img-fluid" />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="capapbilities-right">
                    <h4>{capapbility.title}</h4>
                   
                    <h5>{capapbility.subtitle}</h5>
                    <h6>{capapbility.description}</h6>
                    {capapbility.links && (
                      <Link href={capapbility.links.link}>
                        {capapbility.links.text || "Learn More"}
                        <img src="/assets/img/arrow.png" alt="arrow" />
                      </Link>
                    )}
                  </div>
                </Col>
              </Row>
            </Tab>
          ))}
        </Tabs>
      </Container>
    </section>
  );
};

export default Capapbilities;
