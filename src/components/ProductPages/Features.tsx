"use client";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import { BASE_URL } from "../../../config";


interface Feature {
  id: number;
  title: string;
  description: string;
  icon: {
    data: {
      attributes: {
        url: string;
        name: string;
      };
    };
  };
}

interface FeatureSection {
  title: string;
  description: string;
  text: Feature[];
}

const Features = (props: FeatureSection) => {
  const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const featureSliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    swipeToSlide: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const chunkedFeatures = chunkArray(props.text, 2);

  return (
    <section className="feature section_padding50">
      <Container>
        <h5>{props.title}</h5>
        <p>{props.description}</p>

        <Slider {...featureSliderSettings}>
          {chunkedFeatures?.map((chunk, index) => (
            <div key={index}>
              <Row className="gy-4 gy-md-0">
                <Col md={12}>
                  {chunk.map((feature:any) => (
                    <div className="feature_box_wraper" key={feature.id}>
                      <div className="feature_box">
                        <div className="feature_img_box">
                          <img
                            src={`${BASE_URL}${feature?.icon?.data?.attributes?.url}`}
                            alt={`${BASE_URL}${feature?.icon?.data?.attributes?.name}`}
                          />
                        </div>
                        <h6>{feature.title}</h6>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </Col>
              </Row>
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default Features;