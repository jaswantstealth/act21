import Link from "next/link";
import React from "react";
import { Container } from "react-bootstrap";

const Newslistscroll = (props: any) => {
  return (
    <section className="newsticker">
      <Container>
        <div className="newsSide_wraper">
          <h6>{props.text}</h6>
          <div className="newsSide">
            <ul className="d-flex ">
              {props?.newslistscrooler.map((item: any) => (
                  <li key={item.id}>
                    <Link href={`${item.newslink}`} target="_blank">{item.newstitle} </Link>
                </li>
               
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Newslistscroll;
