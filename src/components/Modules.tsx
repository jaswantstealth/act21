"use client";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import { BASE_URL } from "../../config";
// import { props, images } from "./data";

const Modules = (props:any) => {
  const [currentImage, setCurrentImage] = useState("");
  const handleMouseEnter = (id: any) => {
    const imageUrl = props?.moudle_section[id]?.media?.data?.attributes?.url;
    setCurrentImage(imageUrl ?? ""); // Provide a fallback value (empty string) if imageUrl is undefined
  };
  useEffect(() => {
    if (props?.moudle_section && props?.moudle_section.length > 0) {
      const firstImageUrl =
        props.moudle_section[0]?.media?.data?.attributes?.url;
      setCurrentImage(firstImageUrl ?? ""); 
    }
  }, [props?.moudle_section]);
  return (
    <section className="independent-module">
      <Container>
      
        <h2>{props?.title}</h2>
        <h4>{props?.description}</h4>
        <Row className="gy-5 align-items-center">
          <Col lg={6}>
            <div className="independent-img">
              <img
                src={`${BASE_URL}${currentImage}`}
                alt={props?.moudle_section?.media?.data?.attributes?.name}
                className="img-fluid"
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="row justify-content-center g-3">
              {props?.moudle_section.map((block:any, i:any) => (
                <Col lg={4} xl={3} xs={6} key={block.id}>
                  <div
                    className="indepentdent-box"
                    onMouseEnter={() => handleMouseEnter(i)}
                  >
                    <p>{block.title}</p>
                    <div className="text-overlay">
                      <div className="text">
                        <span>{block.description}</span>
                        <br />
                        <div className="box_link mt-1">
                          <Link href={block.links.link}>
                            Know More{" "}
                            <img src="/assets/img/arrow.png" alt="Arrow" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Modules;
