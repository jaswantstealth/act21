import Link from "next/link";
import React from "react";
import { Container } from "react-bootstrap";

const Modulesbookdemo = (props: any) => {
  return (
    <>
      <section className="wanna_try section_padding50 text-center">
        <Container>
          <h3 className="mb-4">{props?.wanna_try.title}</h3>
          <p className="mb-4">{props?.wanna_try.subTitle}</p>
          <div className="btn_wraper">
            <Link href={props.links.link} className="demo_btn light">
              <div className="demo_btn_inner">
                <img
                  src="/assets/img/ciclearrowblk.png"
                  alt="arrow"
                  className="img-fluid"
                />
                <span>{props.links.name}</span>
              </div>
            </Link>
            <Link href={props.second_link.link} className="demo_btn dark">
              <div className="demo_btn_inner">
                <img
                  src="/assets/img/ciclearrowblk.png"
                  alt="arrow"
                  className="img-fluid"
                />
                <span>{props.second_link.name}</span>
              </div>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Modulesbookdemo;
