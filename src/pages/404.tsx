// pages/404.tsx
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

export default function Custom404() {
  return (
    <section
      className="section_padding50 not_found_height justify-content-center align-items-center d-flex"
      style={{
        backgroundImage: `url("/assets/img/bg-2.webp")`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container className="text-center ">
        <Row className="justify-content-center align-items-center">
          <Col>
            {" "}
            <h1 className="text-white">404 - Page Not Found</h1>
            <p className="text-white">
              Sorry, the page you are looking for does not exist.
            </p>
            <Link href="/home" className="white_btn mx-auto text-center" >
              Go back to the homepage
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
