// pages/404.tsx
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

export default function comingSoon() {
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
            <h2 className="text-white mb-5">Big things are in the works. <br/>Coming SOON, stay tuned!!</h2>
            
            <Link href="/home" className="white_btn mx-auto text-center" >
              Go back to the homepage
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
