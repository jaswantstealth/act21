import React, { useEffect, useState } from "react";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { BASE_URL } from "../../../config";


interface MediaAttributes {
  name: string;
  url: string;
}

interface ImageData {
  data: any;
  media: any;
  id: number;
  attributes: MediaAttributes;
}

interface Link {
  id: number;
  name: string;
  link: string;
  type: string | null;
  mode: string;
}

interface ImportantLinks {
  id: number;
  text: string;
  links: Link[];
}

interface SocialLink {
  id: number;
  text: string;
  links: Link[];
}

interface QuickLink {
  id: number;
  text: string;
  links: Link[];
}
interface Whyact21 {
  id: number;
  text: string;
  links: Link[];
}

interface Section {
  id: number;
  text?: string; // Made optional since not all sections may have text
  logo: ImageData;
  image: ImageData;
  important_links: ImportantLinks;
  sociallink: SocialLink;
  quicklink: QuickLink;
  whyact21:Whyact21;
}

interface ApiResponse {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      section: Section[]; // Array of sections
    };
  };
}

const Footer = () => {
  const [footerData, setFooterData] = useState<ApiResponse | null>(null);
  const [domain, setDomain] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.origin);
    }
  }, []); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/header-footer/?populate=deep`
        );
        const data: ApiResponse = await response.json();
        // console.log("API Response", data); // Check the structure
        if (data.data && data.data.attributes.section.length > 0) {
          setFooterData(data);
        } else {
          console.log("No sections found in the API response");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  if (!footerData) return null; // or a loading indicator

  const section = footerData.data.attributes.section[1]; // Access the footer section

  return (
    < footer  className="footer">
  
      <Container>
        <Row className="align-items-center g-4">
          <Col md={6}>
            <img
             src={`${BASE_URL}${section.logo.media.data.attributes.url}`} 
              alt="footer logo"
              className="footer_logo"
            />
            <div className="white_heading">
              <p>{section.text}</p> {/* Display footer text */}
            </div>

            <Row>
              <Col xs={6}>
                <div className="footer_link_wraper">
                  <h4 className="footer_links_heading">
                    {section.important_links.text}
                  </h4>
                  {/* <p><Link href={"/Blog-detail"}>BlogDetailPage</Link></p>
                  <p><Link href={"/Blog"}>BlogPage</Link></p> */}
                  <ul>
                    {section.important_links.links.map((link) => (
                      <li key={link.id}>
                        <Link href={`${domain}${link.link}`}>{link.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
              <Col xs={6}>
                <div className="footer_link_wraper">
                  <h4 className="footer_links_heading">
                    {section.quicklink.text}
                  </h4>
                  <ul>
                    {section.quicklink.links.map((link) => (
                      <li key={link.id}>
                        <Link href={`${domain}${link.link}`}>{link.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
              {/* <Col xs={4}>
                <div className="footer_link_wraper">
                  <h4 className="footer_links_heading">
                    {section.whyact21.text}
                  </h4>
                  <ul>
                    {section.whyact21.links.map((link) => (
                      <li key={link.id}>
                        <Link href={link.link}>{link.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col> */}
            </Row>

            <ul className="socil_links">
              {section.sociallink.links.map((social) => (
                <li key={social.id}>
                  <Link href={social.link}>
                    <FontAwesomeIcon
                      icon={
                        social.name === "Instagram"
                          ? faInstagram
                          : social.name === "Facebook"
                          ? faFacebookF
                          : social.name === "Twitter"
                          ? faXTwitter
                          : faLinkedinIn
                      }
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col md={6}>
            <img
            // src="/assets/img/Footer.gif"
              src={`${BASE_URL}${section.image.data.attributes.url}`}
              alt="footer image"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
