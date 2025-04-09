"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { BASE_URL } from "../../config";

const Testimonial = (props: any) => {
  var reviewSlider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    gutter: 10,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // tablet and desktop
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767, // mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // small mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const getBackgroundClass = (index: number) => {
    const classes = ["testimonial1", "testimonial2", "testimonial3"];
    return classes[index % classes.length];
  };

  const getOverlayClass = (index: number) => {
    const overlays = ["overlay1", "overlay2", "overlay3"];
    return overlays[index % overlays.length];
  };
  return (
    <section className="testimonial-sec">
      <div className="container">
        <div className="testimonialSlider_heading">
          <h4>{props.heading}</h4>
          <p>{props.subheading}</p>
        </div>
        <Slider {...reviewSlider}>
          {props.testimonial.map((testimonial: any, index: any) => (
            <div key={testimonial.id}>
              <div className={`testimonial-bx ${getBackgroundClass(index)}`}>
                <div className="testimonial-bx_inner">
                  <div className="testimonial-img">
                    <img
                      src={`${BASE_URL}${testimonial.clientProfileImage.data.attributes.url}`}
                      alt={`${testimonial.clientProfileImage.data.attributes.name}`}
                      className="img-fluid"
                    />
                  </div>
                  <h2 className="mt-2">{testimonial.clientName}</h2>
                  <p>{testimonial.clientsPosition}</p>
                  <div className={`detail-overlay ${getOverlayClass(index)}`}>
                    <div className="detail">
                      <p>{testimonial.testimonialText}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonial;
