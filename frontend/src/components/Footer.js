import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa"; // Import social media icons

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#474747", color: "white" }} className="py-4">
    
      <Container>
        <Row>
          {/* Left Section - TravelWorld Info */}
          <Col md={6}>
            <h5>TravelWorld</h5>
            <p>Explore, plan, and experience the best trips tailored just for you.</p>
          </Col>

          {/* Right Section - Social Media Links */}
          <Col md={6} className="text-md-end">
            <h5>Connect With Us</h5>
            <div className="d-flex justify-content-md-end gap-3">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-light">
                <FaFacebook size={25} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-light">
                <FaInstagram size={25} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-light">
                <FaTwitter size={25} />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-light">
                <FaYoutube size={25} />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light">
                <FaLinkedin size={25} />
              </a>
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="mt-3">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} TravelWorld. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
