import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "#474747", color: "white" }}
      className="py-3 mt-5"
    >
      <Container>
        <Row className="align-items-center">
          {/* Left Section - TravelWorld Info */}
          <Col md={6}>
            <h5 className="mb-2 fs-3">TravelWorld</h5>
            <p className="mb-0 fs-6">
              Explore, plan, and experience the best trips tailored just for you.
            </p>
          </Col>

          {/* Right Section - Social Media Links */}
          <Col md={6} className="text-md-end mt-3 mt-md-0">
            <h6 className="mb-2 fs-5">Connect With Us</h6>
            <div className="d-flex justify-content-md-end gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <FaFacebook size={22} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <FaInstagram size={22} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <FaTwitter size={22} />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <FaYoutube size={22} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <FaLinkedin size={22} />
              </a>
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="mt-2">
          <Col className="text-center">
            <p className="mb-0 fs-6">
              &copy; {new Date().getFullYear()} TravelWorld. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
