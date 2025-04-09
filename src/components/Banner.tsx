"use client";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import { BASE_URL } from "../../config";
import Image from "next/image";
import PopupModal from "./Popup";

// Main Component
const Banner = (props: any) => {
  // Slider settings
  const bannerslider = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  // Check the number of banners
  const hasMultipleBanners = props?.banner?.length > 1;

  // Function to extract column size from "column" attribute
  const getColumnSize = (column: string) => {
    if (!column || typeof column !== "string") {
      // Default to 6 if column is undefined, null, or not a string
      return 6;
    }

    const size = column.split("-")[1];
    // Ensure size is between 1 and 12, default to 6 if not found or invalid
    const parsedSize = parseInt(size);
    return parsedSize >= 1 && parsedSize <= 12 ? parsedSize : 6;
  };

  return (
    <section className="banner homebanner">
      <Container>
        <PopupModal />
        {hasMultipleBanners ? (
          <Slider {...bannerslider}>
            {props?.banner?.map((banner: any) => (
              <div key={banner.id}>
                <Row className="gy-md-2 gy-5 align-items-center">
                  <Col lg={getColumnSize(banner.column)}>
                    <div
                      className="banner_right"
                      dangerouslySetInnerHTML={{ __html: banner.title }}
                    />
                  </Col>
                  <Col lg={12 - getColumnSize(banner.column)}>
                    <div className="banner_img_wraper">
                      {banner.media?.data?.attributes?.ext === ".mp4" ? (
                        <div className="video_wraper">
                          <video className="img-fluid" autoPlay muted loop>
                            <source
                              src={`${BASE_URL}${banner.media.data.attributes.url}`}
                              type="video/mp4"
                            />
                          </video>
                        </div>
                      ) : (
                        <img
                          src={`${BASE_URL}${banner.media.data.attributes.url}`}
                          alt={banner.media.data.attributes.name}
                          className="img-fluid"
                        />
                        // <Image
                        //   src={`${BASE_URL}${banner.media.data.attributes.url}`}
                        //   alt={banner.media.data.attributes.name}
                        //   className="img-fluid"
                        //   width={500}
                        //   height={500}
                        //   sizes="(min-width: 768px) , 456px 304px"
                        // />
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </Slider>
        ) : (
          // Render single banner if only one
          props?.banner?.length === 1 && (
            <Row className="gy-md-2 gy-5 align-items-center">
              <Col lg={getColumnSize(props.banner[0].column)}>
                <div
                  className="banner_right"
                  dangerouslySetInnerHTML={{ __html: props.banner[0].title }}
                />
              </Col>
              <Col lg={12 - getColumnSize(props.banner[0].column)}>
                <div className="banner_img_wraper">
                  {props.banner[0].media?.data?.attributes?.ext === ".mp4" ? (
                    <div className="video_wraper">
                      <video className="img-fluid" autoPlay muted loop>
                        <source
                          src={`${BASE_URL}${props.banner[0].media.data.attributes.url}`}
                          type="video/mp4"
                        />
                      </video>
                    </div>
                  ) : (
                    <img
                      src={`${BASE_URL}${props.banner[0].media.data.attributes.url}`}
                      alt={props.banner[0].media.data.attributes.name}
                      className="img-fluid"
                    />
                  )}
                </div>
              </Col>
            </Row>
          )
        )}
      </Container>
    </section>
  );
};

export default Banner;
