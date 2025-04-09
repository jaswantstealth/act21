import Link from "next/link";
import React from "react";
import { Container } from "react-bootstrap";

interface DiscoverProps {
  title: string;
  links: {
    link: string;
    name: string;
  };
  className?: string; // optional prop for class name
}

const Discover: React.FC<DiscoverProps> = (props) => {
  return (
    <section className={`discover_sec section_padding50 ${props.className || ''}`}>
      <Container>
        <h2>{props.title}</h2>
        <Link href={props.links.link} className="diccover_btn">
          <span>{props.links.name}</span>
          <span className="img_wraper">
            <img
              src="/assets/img/hand-arrow.png"
              className="img-fluid"
              alt="hand arrow"
            />
          </span>
        </Link>
      </Container>
    </section>
  );
};

export default Discover;
