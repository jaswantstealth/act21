"use client";
import { useEffect, useLayoutEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Nav, Navbar, Spinner } from "react-bootstrap";
import Dropdown from "./Dropdowns";
import { BASE_URL } from "../../../config";

// TypeScript Interfaces
interface Logo {
  id: number;
  url: string;
  isexternal: boolean;
  media: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

interface LinkItem {
  id: number;
  link: string;
  name: string;
}

interface TopRight {
  id: number;
  name: string;
  link: string;
  type: string;
  mode: string;
}

interface HeaderSection {
  logo: Logo;
  link: LinkItem[];
  topright: TopRight;
}

interface HeaderData {
  section: HeaderSection[];
}

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const navbarCollapseRef = useRef<HTMLDivElement>(null); // Ref to control Navbar collapse
  const router = useRouter();
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [bodyPadding, setBodyPadding] = useState(0);
  const [domain, setDomain] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.origin);
    }
  }, []);
  const updateHeaderHeight = () => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  };

  // Fetch header data
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/header-footer/?populate=deep`
        );
        const data = await response.json();
        setHeaderData(data?.data?.attributes);
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };

    fetchHeaderData();
  }, []);

  // Collapse the navbar on page change
  useEffect(() => {
    const handleRouteChange = () => {
      const navbarCollapse = navbarCollapseRef.current;
      const toggleButton = document.querySelector(
        ".navbar-toggler"
      ) as HTMLElement;

      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        // Manually collapse the navbar
        toggleButton?.click();
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (headerData) {
      const timeoutId = setTimeout(() => {
        updateHeaderHeight();
      }, 100); // Delay to ensure everything is loaded

      return () => clearTimeout(timeoutId); // Cleanup
    }
  }, [headerData]); // Re-run if headerData changes

  // Sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      const sticky = window.scrollY > 200;
      setIsSticky(sticky);
      setBodyPadding(sticky ? headerHeight : 0); // Update body padding based on sticky state
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headerHeight]);

  useEffect(() => {
    document.body.style.paddingTop = `${bodyPadding}px`;
  }, [bodyPadding]);

  if (!headerData || !headerData.section || headerData.section.length === 0) {
    return (
      <div>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    ); 
  }

  const firstSection = headerData.section[0];

  return (
    <>
      <header
        ref={headerRef}
        className={`header-wrapper ${isSticky ? "sticky" : ""}`}
      >
        <Navbar expand="lg" className="header_bg">
          <Container>
            <Navbar.Brand as={Link} href="/">
              <img
                src={`${BASE_URL}${firstSection.logo.media.data.attributes.url}`}
                className="logo_img"
                alt="logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll" ref={navbarCollapseRef}>
              <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
                <Dropdown />
                <Link href={`${domain}${firstSection.topright.link}`} className="header_btn">
                  {firstSection.topright.name}
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
