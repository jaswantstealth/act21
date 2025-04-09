import { Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { BASE_URL } from "../../config";

export default function Driveperformance(props: any) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
    
  const perslider = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: (
      <img src="/assets/img/right-arrow-removebg-preview.png" alt="Next" />
    ),
    prevArrow: <></>,
    responsive: [
      {
        breakpoint: 1024, // tablet and desktop
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // mobile
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // small mobile
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  // Safely access section data
  // const section = props.data?.[0]?.attributes?.section?.[0] || {};

  return (
    <section className="driveperformance" ref={ref}>
      <Container>
        <Row className="align-items-center gy-4 driveperformance_wraper">
          <Col lg={6}>
            <div className="driveperformance_right">
              <h2>{props.title}</h2>
              <h4>{props.description}</h4>
              <div className="perSlider">
                <div className="Slider_heading">
                  <h5>Trusted by</h5>
                </div>
                <Slider {...perslider} className="per_Slider">
                  
                  {props.media?.media?.data?.map((img: any) => (
                    <div key={img.id}>
                      <img
                        src={`${BASE_URL}${img.attributes.url}`}
                        alt="sliderimg"
                       
                        className="slider_img"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </Col>
          <Col lg={6}>
          <div className="box_wraper">
              {props.percentage?.map((perc: any, i:any) => (
                <div key={perc.id} className="driveperformance_box">
                  <h3>
                    <span>{perc.prefix}</span>
                    {inView ? (
                      <CountUp
                        start={0}
                        end={parseFloat(perc.counter)}
                        duration={2.5}
                      />
                    ) : (
                      perc.counter
                    )}
                 {perc.postfix}
                  </h3>
                  <p>{perc.description}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
