import Link from "next/link";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";

const HomeBanner = () => {
  var bannerslider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Hide the arrows
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <div className="home_banner banner ">
        <Container>
          <Slider {...bannerslider}>
            <div>
              <Row className="gy-md-2 gy-5 align-items-center">
                <Col lg={7}>
                  <div className="banner_right">
                    <h1>
                      RESHAPING <b>BFSI</b>
                      <br />
                      <span>
                        with<b className="f_50"> LOW-CODE & AI</b>
                      </span>
                    </h1>
                    <p>
                      A Leading SAAS company offering innovative low-code
                      solutions for digital transformation.
                    </p>
                    <Link href={"/contact"} className="banner_bttn ">
                      Request a demo{" "}
                      <img src="/assets/img/rightarrow.png" alt="rightarrow" />{" "}
                    </Link>
                  </div>
                </Col>
                <Col lg={5}>
                  <div className="video_wraper">
                    {" "}
                    <video className="img-fluid" autoPlay muted loop>
                      <source
                        src="/assets/video/actvideo.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </Col>
              </Row>
            </div>
            <div>
              <Row className="gy-md-2 gy-5 align-items-center">
                <Col md={7}>
                  <div className="banner_right">
                    <h1>
                      <span>EMPOWERING REAL TIME</span>{" "}
                      <b 
                        className="f_50"
                      ><br/>
                        DECISIONING
                      </b>
                    </h1>
                    <p>
                      Leverage analytics for deeper customer insights, unify
                      process automation for instant decisioning in customer
                      onboarding
                    </p>
                    <Link  href={"/contact"} className="banner_bttn ">
                      Request a demo{" "}
                      <img src="/assets/img/rightarrow.png" alt="rightarrow" />{" "}
                    </Link>
                  </div>
                </Col>
                <Col md={5}>
                  <div className="banner_img_wraper">
                    <img
                      src="/assets/img/mobileimgbanner.png"
                      alt="mobileimgbanner"
                      className="img-fluid"
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <div>
              <Row className="gy-md-2 gy-5 align-items-center">
                <Col md={7}>
                  <div className="banner_right">
                    <h1>
                      <span className="last_span">
                        {" "}
                        OPTIMISE I AUTOMATE I FORECAST
                      </span>
                      <br />
                      Achieve <b> 5x</b> Sales <br />
                    </h1>
                    <p  style={{ maxWidth:600 }}> 
                      Replace commission counting with accurate sales earnings
                      forecasts
                    </p>
                    <Link href={"/contact"}  className="banner_bttn ">
                      Request a demo{" "}
                      <img src="/assets/img/rightarrow.png" alt="rightarrow" />{" "}
                    </Link>
                  </div>
                </Col>
                <Col md={5}>
                  <div className="banner_img_wraper">
                    <img
                      src="/assets/img/mobileimgbanner2.png"
                      alt="mobileimgbanner2"
                      className="img-fluid"
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Slider>
        </Container>
      </div>
    </>
  );
};

export default HomeBanner;
