import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../config";
import { useRouter } from "next/router";

const BlogListing = (props: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;
  const router = useRouter();

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = props.blog.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const shouldShowPagination = props.blog.length > blogsPerPage;

  const detailPage = (item: any) => {
    const filteredBlogs = currentBlogs.filter((blog: any) => blog.id === item);
    // const titleSlug = filteredBlogs[0].title.replace(/\s+/g, "-").toLowerCase();
    const titleSlug = filteredBlogs[0].title
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "") // Removes all characters except letters, numbers, hyphens, and underscores
      .toLowerCase();
    router.push(`/blog/${titleSlug}:${filteredBlogs[0].id}`);
  };

  // console.log("currentBlogs", currentBlogs);

  return (
    <div>
      <div className="blog_list">
        <Container>
          <Row className="gy-4">
            {props.blog && props.blog.length > 0 ? (
              currentBlogs.map((item: any) => (
                <Col md={4} key={item.id}>
                  <div
                    className="blog_box_link"
                    onClick={() => detailPage(item.id)}
                  >
                    <div className="blog_box">
                      <img
                        src={`${BASE_URL}${item.image.data[0]?.attributes.url}`}
                        alt={item.title}
                        className="img-fluid"
                      />
                      <p>{item.title}</p>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <h2 className="text-center">No blogs available</h2>
            )}
          </Row>

          {shouldShowPagination && (
            <Row className="mt-5">
              <div className="pagination_controls text-center">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn"
                >
                  Previous
                </button>

                {Array.from(
                  { length: Math.ceil(props.blog.length / blogsPerPage) },
                  (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => paginate(index + 1)}
                      className={`${
                        currentPage === index + 1 ? "active" : ""
                      } btn number_btn`}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={
                    currentPage === Math.ceil(props.blog.length / blogsPerPage)
                  }
                  className="btn page_change"
                >
                  Next
                </button>
              </div>
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
};

export default BlogListing;
