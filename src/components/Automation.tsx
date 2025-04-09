
import Link from "next/link";
import React from "react";
import { Container,Row ,Col} from "react-bootstrap";

const Automation = (props:any) => {
  return (
    <section className="automation">
    <Container>
      <h6 className="heading">{props?.title}</h6>
      <Row className="align-items-center mt-4">
        <Col md={7}>
          <div className="auto_content">
            <p>{props?.description}</p>
          </div>
        </Col>
        <Col md={5} className="d-flex justify-content-end">
          <Link className="btn_primery" href={props?.links?.link}>
            {props?.links.name}
            <img src="/assets/img/rightarrow.png" alt="rightarrow" />{" "}
          </Link>
        </Col>
      </Row>
    </Container>
  </section>
  );
};

export default Automation;
