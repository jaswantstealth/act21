import { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import Link from "next/link";
import Cta from "./Cta";

export default function HeroSection(props: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showDropdown, setShowDropdown] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const dropdowns = props?.dropdown ;
  // const dropdowns = props?.dropdown;
  console.log("dropdowns",dropdowns)

  return (
    <div>
      <header className={`header-wrapper ${isSticky ? "sticky" : ""}`}>
        <Navbar expand="lg" className="header_bg">
          <Container>
            <Navbar.Brand as={Link} href="/">
              <img
                src="/assets/img/actlogo1.png"
                className="logo_img"
                alt="logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
                {/* Dynamic nav items */}
                {props?.navitem.map((item:any) => (
                  <Nav.Link key={item.id} as={Link} href={item.link}>
                    {item.name}
                  </Nav.Link>
                ))}

                {/* Dynamic dropdown menus */}
                {/* { dropdowns.map((drop:any) => (
                  <NavDropdown
                    key={drop.id}
                    title={drop.title}
                    id={`${drop.title.toLowerCase()}-nav-dropdown`}
                    show={showDropdown === drop.title}
                    onMouseEnter={() => setShowDropdown(drop.title)}
                    onMouseLeave={() => setShowDropdown("")}
                  >
                    {drop.links.map((link:any) => (
                      <NavDropdown.Item
                        key={link.id}
                        as={Link}
                        href={link.link}
                      >
                        {link.name}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ))} */}

                {/* CTA Button */}
                <Cta {...props.toprightcta} />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
}
