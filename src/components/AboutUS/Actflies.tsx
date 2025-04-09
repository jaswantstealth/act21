import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Actflies = (props: any) => {
    const [currentIndex, setCurrentIndex] = useState(0);




  useEffect(() => {
   

    const steps = document.querySelectorAll(
      ".actflies-circleouter"
    ) as NodeListOf<HTMLElement>;
    const content = document.querySelectorAll(
      ".actflies-content"
    ) as NodeListOf<HTMLElement>;
    const dot = document.querySelector(".animatedBall") as HTMLElement;

    let animationFrameId: number;
    let startTime: number | null = null;

    const duration = 1000; // 1 second for animation
    const interval = 2000; // 2 seconds for interval

    function animateDot(start: number, end: number) {
      function step(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const offset = start + (end - start) * easeInOutQuad(progress);
        dot.style.transform = `translateX(${offset}px)`;

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          cancelAnimationFrame(animationFrameId);
          startTime = null; // Reset start time for the next animation
        }
      }

      animationFrameId = requestAnimationFrame(step);
    }

    function easeInOutQuad(t: number) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function updateDotPosition(index: number,focusIndex : number) {
      const stepWidth = steps[0].offsetWidth;
      const start =
        parseFloat(
          dot.style.transform.replace("translateX(", "").replace("px)", "")
        ) || 0;
      const end = index * stepWidth;
      // console.log(start,"Start")
      // console.log(end,"End")
      animateDot(start, end);
      steps.forEach((step, idx) => {
        if (idx <= focusIndex) {
          step.classList.add("active");
        }
        if (0 == end) {
          setTimeout(() => {
            step.classList.remove("active");
        }, 1000);
        }
      });
      content.forEach((step, idx) => {
        if (idx <= focusIndex) {
          step.classList.add("content-active");
        }
        if (0== end) {
          setTimeout(() => {
              step.classList.remove("content-active");
          }, 1000);
        }
      });
      // con?tent.forEach((step, idx) =>
        // st?ep.classList.toggle("content-active", idx === index)
      // );
    }

    function moveDot() {
      setCurrentIndex((prevIndex) => {
        // console.log(prevIndex,"-111111111111111111111")
        const nextIndex = (prevIndex + 1) % steps.length;
        updateDotPosition(nextIndex, prevIndex);
        return nextIndex;
      });
    }

    const intervalId = setInterval(moveDot, interval);

    return () => {
      clearInterval(intervalId);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Include section4Data as a dependency
  return (
    <section className="actflies-sec section_padding50">
      <Container>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <div className="animation_ball_wraper mt-5">
          <div className="actflies-circle_desktop">
            <div className="animatedBall"></div>

            {props.act_flies.map((act: any) => (
              <div className="actflies-circleouter">
                <div className="actflies-circle">
                  <h2 className="mb-0">{act.slug}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Row className="mt-3 mt-md-0 gy-3 actflies-content_wraper">
          {props.act_flies.map((act: any) => (
            <Col lg={4} md={6} className="actflies-circle_bg">
              <div className="actflies-content">
                <div className="actflies-circle">
                <h2 className="mb-0">{act.slug}</h2>
                </div>
                <h5>{act.title}</h5>
                <p>{act.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Actflies;
