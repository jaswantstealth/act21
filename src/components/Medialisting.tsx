import Link from "next/link";
import React, { useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { BASE_URL } from "../../config";

const MediaListing = (props: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Adjust the number of items per page as needed

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.media_list?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(props.media_list?.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="blog_list">
        <Container>
          <Row className="g-md-5 g-4">
            {currentItems.map((item: any) => (
              <Col md={4} key={item.id}>
                <Link href={item.link} className="blog_box_link" target="_blank">
                  <div className="blog_box">
                    <img
                      src={item.image?.data?.[0]?.attributes?.url ? `${BASE_URL}${item.image.data[0].attributes.url}` : "/placeholder.jpg"}
                      alt={item.image?.data?.[0]?.attributes?.hash || "Placeholder Image"}
                      className="img-fluid"
                    />
                    <p>{item.title}</p>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
          {props.media_list?.length > itemsPerPage && (
            <div className="pagination justify-content-center " style={{ textAlign: "center", marginTop: "20px" }}>
              <Button onClick={prevPage} disabled={currentPage === 1} style={{ margin: "0 5px" }}>
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <Button
                  key={number}
                  onClick={() => paginate(number)}
                  style={{ margin: "0 5px" }}
                  variant={currentPage === number ? "primary" : "outline-primary"}
                >
                  {number}
                </Button>
              ))}
              <Button onClick={nextPage} disabled={currentPage === totalPages} style={{ margin: "0 5px" }}>
                Next
              </Button>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default MediaListing;
