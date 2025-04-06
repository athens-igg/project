//import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; 
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();       // Clear user session
    navigate("/");  // Redirect to homepage
  };

  return (
    <>
        {/* Navbar */}
              <Navbar style={{ backgroundColor: "#e9ecef" }} expand="lg" className="shadow-sm py-2">
              
                <Container>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                <img
                  src="/logo.png"
                  alt="TravelWorld Logo"
                  width="50"
                  height="50"
                  className="d-inline-block align-top me-2"
                />
                <span className="fs-2 fw-bold">TravelWorld</span>
              </Navbar.Brand>
              
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                      <Nav.Link as={Link} to="/" className="fs-5">Home</Nav.Link>
                      <Nav.Link as={Link} to="/trip-planner" className="fs-5">Trip Planner</Nav.Link>
                      <Nav.Link as={Link} to="/gallery" className="fs-5">Gallery</Nav.Link>
                      <Nav.Link as={Link} to="/feedback" className="fs-5">Feedback</Nav.Link>
                      {user ? (
                        <>
                          <Nav.Link as={Link} to="/profile" className="fs-5">Profile</Nav.Link>
                          <Button
                            variant="outline-danger"
                            onClick={handleLogout}
                            className="ms-2 fs-6 fw-semibold"
                          >
                            Logout
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            as={Link}
                            to="/login"
                            variant="outline-primary"
                            className="ms-2 fs-6 fw-semibold"
                          >
                            Login
                          </Button>
                          <Button
                            as={Link}
                            to="/register"
                            variant="primary"
                            className="ms-2 fs-6 fw-semibold"
                          >
                            Register
                          </Button>
                        </>
                      )}
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
        </>
  );
}

export default Profile;
