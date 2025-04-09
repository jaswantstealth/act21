import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Countdown from "./Countdown";

type RegisterCounterProps = {
  detail: string;
  Date: string; // e.g., "2025-04-10"
  time?: string; // optional, e.g., "15:30:00"
};

const Registercounter: React.FC<RegisterCounterProps> = (props) => {
  const { detail, Date: date, time } = props;
  const targetDateTime = time ? `${date}T${time}` : date;

  const now = new Date();
  const target = new Date(targetDateTime);

  // If the current time is after the target, don't render
  if (now > target) {
    return null;
  }

  return (
    <section className="registercounter">
      <Container>
        <Row className="gy-4 align-items-center registercounter_wraper">
          <Col md={6}>
            <div className="detial">
              <p>{detail}</p>
            </div>
          </Col>
          <Col md={6}>
            <Countdown targetDate={targetDateTime} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Registercounter;
