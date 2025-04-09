import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BASE_URL } from "../../../config";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Link from "next/link";
import Head from "next/head";

interface Heading {
  id: string;
  text: string;
  level: number;
}
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
};
const BlogDetail = () => {
  const { query } = useRouter();
  const [blogData, setBlogData] = useState<any>(null);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const generateIdFromText = (text: string) => {
    if (!text) {
      return "";
    }

    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, "-")
      .replace(/\s+/g, "-");
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header-wrapper");
      if (header?.classList.contains("sticky")) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true); // Set loading state before the fetch
        const res = await fetch(`${BASE_URL}/api/services/?filters[slug]=blog&populate=deep`);
        if (!res.ok) {
          throw new Error("Failed to fetch blog data");
        }
        const data = await res.json();
        
        // Handle the query ID (slug) from the URL
        let blogTitleFromUrl = '';
        let blogIdFromUrl = '';
        
        if (query.id) {
          const queryId = Array.isArray(query.id) ? query.id[0] : query.id;
          const match = queryId.match(/[:?](\d+)$/); 
          if (match && match[1]) {
            blogIdFromUrl = match[1];           }
        }
        console.log('blogIdFromUrl', blogIdFromUrl);
        const blog = data.data[0]?.attributes?.section[1]?.blog.filter(
          (item: any) =>
            item.id.toString() === blogIdFromUrl 
        );
    
        if (blog && blog.length > 0) {
          setBlogData(blog[0]); 
        } else {
          setError("Blog not found");
        }
      } catch (e) {
        setError("Error fetching blog data.");
        console.error("Error:", e);
      } finally {
        setLoading(false); 
      }
    };    
  
    if (query.id) {
      fetchBlogData(); // Fetch blog data only when query.id is available
    }
  }, [query.id]); // Trigger this effect whenever query.id changes
  

  // Extract headings from blog content
  useEffect(() => {
    const content = document.querySelector(".blog-content");
    if (!content) return;

    const headingsList: Heading[] = [];
    content.querySelectorAll("h1, h2, h3").forEach((heading) => {
      const textContent = heading.textContent || "";
      const id = heading.id || generateIdFromText(textContent);

      headingsList.push({
        id,
        text: textContent,
        level: parseInt(heading.tagName.replace("H", ""), 10),
      });

      if (!heading.id) {
        heading.id = id; // Assign generated ID to heading
      }
    });

    setHeadings(headingsList);
  }, [blogData]);

  // Intersection Observer for active heading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let isAnyHeadingActive = false;
  
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When heading enters the viewport, set it as active
            setActiveId(entry.target.id);
            isAnyHeadingActive = true;
          }
        });
  
        // If no heading is active, retain the previously active heading
        if (!isAnyHeadingActive && activeId === null && headings.length > 0) {
          // Make the first heading active by default
          setActiveId(headings[0].id);
        }
      },
      {
        rootMargin: "0px 0px -50% 0px", // Adjust margin for when heading should become active
        threshold: [0.5, 1], // Ensure that at least half or fully of the heading is in the viewport before activating
      }
    );
  
    const content = document.querySelector(".blog-content");
    if (!content) return;
  
    const targets = content.querySelectorAll("h1, h2, h3");
    targets.forEach((target) => observer.observe(target));
  
    return () => {
      targets.forEach((target) => observer.unobserve(target));
    };
  }, [blogData, headings, activeId]);
  
  

  const handleClick = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: targetPosition - 100,
        behavior: "smooth",
      });
    }
  };

  const renderBlogDescription = (description: any) => {
    return description.map((desc: any, index: number) => {
      switch (desc.type) {
        case "heading":
          const headingId = desc.id || generateIdFromText(desc.text);
          return React.createElement(
            `h${desc.level}`,
            { key: index, id: headingId },
            desc.children.map((child: any, idx: number) => child.text)
          );
        case "paragraph":
          return (
            <p key={index}>
              {desc.children.map((child: any, idx: number) => child.text)}
            </p>
          );
        default:
          return null;
      }
    });
  };

  if (loading) {
    return <div><Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!blogData) {
    return <div>Blog not found</div>;
  }
  return (
    <>
      <Head>
        <title>{blogData.meta_title}</title>
        <meta name="description" content={blogData.meta_description} />
      </Head>
      <div className="blog-detail">
        <Container fluid>
          <Row>
            <Col md={3}>
              <aside
                className={`d-none d-md-block toc-sidebar ${
                  isSticky ? "paddingtop" : ""
                }`}
              >
                <ul>
                  {headings.map((heading) => (
                    <li
                      key={heading.id}
                      className={`level-${heading.level} ${
                        activeId === heading.id ? "active" : ""
                      }`}
                    >
                      <button onClick={() => handleClick(heading.id)}>
                        {heading.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>
            </Col>
            <Col md={9}>
              <div className="blog_content_wraper">
                <div className="backto_blog">
                  <Link href="/blog">
                    <img src="/assets/img/arrowleft.png" alt="arrow" />
                    Back to blogs
                  </Link>
                </div>
                <div className="blog_img">
                  {blogData.image?.data[0]?.attributes?.url && (
                    <img
                      src={`${BASE_URL}${blogData.image.data[0].attributes.url}`}
                      alt={blogData.title}
                      className="img-fluid"
                    />
                  )}
                </div>
                <div className="blog_date">
                  <p>{formatDate(blogData.create_date)}</p>
                </div>
                <div className="blog-content">
                  <h1 id="blog_title" className="heading_blog">
                    {blogData.title}
                  </h1>
                  <div>{renderBlogDescription(blogData.blog_description)}</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default BlogDetail;
