"use client";
import React, { useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { BASE_URL } from "../../config";

const PartnersPage = (props: any) => {


  // Helper function to determine column size based on "per_row" value
  const getColSize = (perRow: string) => {
    switch (perRow) {
      case "per-row-3":
        return 4; // 12/3 = 4 columns
      case "per-row-4":
        return 3; // 12/4 = 3 columns
      case "per-row-6":
        return 2; // 12/6 = 2 columns
      default:
        return 4; // Default to 3 columns per row
    }
  };

  return (
    <section className="partner_tabs_sec section_padding50">
      <Container>
        <Tabs
          defaultActiveKey={props?.partner?.[0]?.id}
          id="uncontrolled-tab-example"
          className="mb-4 mb-md-5 custom_tabs justify-content-center"
        >
          {props?.partner?.map((item: any) => (
            <Tab eventKey={item.id} title={item.title} key={item.id}>
              <Row className="gy-5 mt-4 text-center">
                {item.media?.map((icon: any) => (
                  <Col md={getColSize(item.per_row)} sm={6} key={icon.id}>
                    <img
                      src={`${BASE_URL}${icon?.media?.data?.attributes.url}`}
                      alt={icon?.media?.data?.attributes.name}
                      className="img-fluid"
                    />
                  </Col>
                ))}
              </Row>
            </Tab>
          ))}
        </Tabs>
      </Container>
    </section>
  );
};

export default PartnersPage;
