'use client'
import React from "react";
import Slider from "react-slick";
import { BASE_URL } from "../../../config";

const Steps = (props:any) => {
  const stepsSliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section className="step_sec section_padding50">
      <div className="container">
        <Slider {...stepsSliderSettings}>
          {props.step.map((stepItem: any) => (
            <div key={stepItem.id}>
              <div className="steps_wraper">
                <h5 className="d-none">{stepItem.title}</h5>
                {stepItem.media?.data && (
                  <img
                    src={`${BASE_URL}${stepItem.media.data.attributes.url}`}
                    alt={
                      stepItem.media.data.attributes.alternativeText || "Image"
                    }
                    className="img-fluid mx-auto"
                  />
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Steps;
