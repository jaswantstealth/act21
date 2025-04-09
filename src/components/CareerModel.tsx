"use client";
import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

interface CareerDetailClientProps {
  title: string;
  link: string;
}

const CareerDetailClient: React.FC<CareerDetailClientProps> = ({
  title,
  link,
}) => {
  const [show, setShow] = useState(false);
  const [friendEmail, setFriendEmail] = useState("");
  const [jobtitle, setJobtitle] = useState(title); // Start with empty state

  const handleClose = () => setShow(false);
  
  const handleShow = () => {
    setJobtitle(title); // Set jobtitle when the modal opens
    setShow(true);
  };

  const handleSubmit = async () => {
    const pageUrl = window.location.href; // Get current page URL
    const data = {
      email: friendEmail,
      url: pageUrl,
      title: jobtitle, // Now jobtitle will be correctly set
    };
    
    console.log("Data to send: ", data);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/sendemails`,
        data
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Error sending email");
    }

    setShow(false);
    setFriendEmail(""); // Clear the email input after submission
  };

  return (
    <>
      <div className="btn_wraper d-flex justify-content-center mt-4">
        <Button className="header_btn rounded-0 bg-white" onClick={handleShow}>
          Refer A Friend
          <img
            src="/assets/img/rightbtnarriw.svg"
            className="img-fluid"
            width={10}
            alt="Arrow"
          />
        </Button>
        <Link href={link} className="header_btn rounded-0">
          I’m Interested
          <img
            src="/assets/img/rightbtnarriw.svg"
            className="img-fluid"
            width={10}
            alt="Arrow"
          />
        </Link>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Refer A Friend - {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFriendEmail">
              <Form.Label>Friend's Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter friend's email"
                value={friendEmail}
                onChange={(e) => setFriendEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="rounded-0"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button className="header_btn rounded-0" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CareerDetailClient;
