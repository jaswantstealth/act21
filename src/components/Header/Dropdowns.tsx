import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router"; // Import useRouter hook
import { Nav, NavDropdown } from "react-bootstrap";
import { getDropDowns } from "../../../config";

const Dropdown = () => {
  const [DropdownData, setDropdownData] = useState<any>([]);
  const [dropdownState, setDropdownState] = useState<string | null>(null); // Use a single state for the open dropdown
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter(); // Initialize router
  const [domain, setDomain] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.origin);
    }
  }, []);
  
  // Detect if the user is on mobile (window width < 768px)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Fetch the Dropdown data on component mount
    const getData = async () => {
      const data = await getDropDowns(); // Call the imported function
      // console.log(data);
      setDropdownData(data); // Use the correct path for the dropdown data
    };
    getData();
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setDropdownState(null); // Reset dropdown state (close all dropdowns)
    };

    // Subscribe to route change event
    router.events.on("routeChangeStart", handleRouteChange);

    // Cleanup the event listener on component unmount
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  // Handlers to show/hide dropdown on hover (desktop)
  const handleMouseEnter = useCallback(
    (id: string) => {
      if (!isMobile) {
        setDropdownState(id); // Set the currently open dropdown
      }
    },
    [isMobile]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setDropdownState(null); // Close the dropdown on mouse leave
    }
  }, [isMobile]);

  // Handler to toggle dropdown visibility on click (mobile)
  const handleClick = useCallback(
    (id: string) => {
      if (isMobile) {
        setDropdownState((prev) => (prev === id ? null : id)); // Toggle dropdown on click (mobile)
      }
    },
    [isMobile]
  );

  return (
    <>
      {DropdownData?.map((item: any) =>
        item?.submenu !== undefined ? (
          <NavDropdown
            title={item.title}
            id={`${item.title.toLowerCase()}-nav-dropdown`}
            key={item.id}
            show={dropdownState === item.id} // Only show the dropdown if it is the current one
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(item.id)} // Toggle dropdown on click (mobile)
          >
            {item.submenu?.map((submenuItem: any) => (
              <Nav.Link
                key={submenuItem.id}
                as={Link}
                href={`${domain}/${submenuItem.slug}`}
              >
                {submenuItem.title}
              </Nav.Link>
            ))}
          </NavDropdown>
        ) : (
          <Nav.Link key={item.id} as={Link} href={item.link}>
            {item.title}
          </Nav.Link>
        )
      )}
    </>
  );
};

export default Dropdown;
