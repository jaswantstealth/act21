import React from "react";
import { Container } from "react-bootstrap";
import { BASE_URL } from "../../config";
import Link from "next/link";

const Modulebanner = (props: any) => {
  
  return (
    <>
      <section
        className="mudulesBanner section_padding50"
        style={{
          // backgroundImage: `url(${BASE_URL}${props.bannerimage.data.attributes.url})`,
          backgroundImage: `url("/assets/img/bg-2.webp")`, 
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container>
          <div className="modulesBannre_inner text-white text-center">
            <h6>{props.heading}</h6>
            <h5 className="fw-medium">{props.title}</h5>
            <p>{props.description}</p>
            <div className="mudulesBanner_btn_wraper">
              <Link
                href={props.links.link}
                className="mudulesBanner_btn fw-medium"
              >
                {props.links.name}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Modulebanner;
