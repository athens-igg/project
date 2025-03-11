//import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; 
import "bootstrap/dist/css/bootstrap.min.css";

const Itinerary = () => {
  const { user, logout } = useAuth();
  return (
    <>
        {/* Navbar */}
        <Navbar style={{ backgroundColor: "#D3D3D3" }} expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img src="/logo.png" alt="TravelWorld Logo" width="50" height="50" className="me-2" />
              <span className="travelworld-text">TravelWorld</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/trip-planner">Trip Planner</Nav.Link>
                <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
                <Nav.Link as={Link} to="/feedback">Feedback</Nav.Link>
                {user ? (
                  <>
                  <Nav.Link as={Link} to="/profile">Profile</Nav.Link> {/* ✅ Show Profile if logged in */}
                  <Button variant="outline-danger" onClick={logout} className="ms-2">
                    Logout
                  </Button>
                </>
                ) : (
                  <>
                    <Button as={Link} to="/login" variant="outline-primary" className="ms-2">Login</Button>
                    <Button as={Link} to="/register" variant="primary" className="ms-2">Register</Button>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </>
  );
}

export default Itinerary;
