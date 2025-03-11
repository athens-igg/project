import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // Custom hook for authentication state
import "bootstrap/dist/css/bootstrap.min.css";
import './Gallery.css';

const TravelGallery = () => {
  const { user, logout } = useAuth();
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1", caption: "Swiss Alps", category: "mountains" },
    { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", caption: "Maldives Beach", category: "beaches" },
    { src: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220", caption: "Tokyo Night View", category: "cities" },
    { src: "https://images.unsplash.com/photo-1506929562872-bb421503ef21", caption: "Amazon Rainforest", category: "nature" },
    { src: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4", caption: "Lake Como, Italy", category: "nature" },
    { src: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b", caption: "Rome Colosseum", category: "historical" },
    { src: "https://images.unsplash.com/photo-1516815231560-8f41ec531527", caption: "Santorini, Greece", category: "islands" },
    { src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34", caption: "Paris, France", category: "cities" },
    { src: "https://images.unsplash.com/photo-1512100356356-de1b84283e18", caption: "Hawaii Beach", category: "beaches" }
  ];

  const categories = [
    { id: 'all', name: 'All Destinations' },
    { id: 'beaches', name: 'Beaches' },
    { id: 'mountains', name: 'Mountains' },
    { id: 'cities', name: 'Cities' },
    { id: 'nature', name: 'Nature' },
    { id: 'historical', name: 'Historical' },
    { id: 'islands', name: 'Islands' }
  ];

  const filteredImages = selectedDestination === 'all' 
    ? images 
    : images.filter(img => img.category === selectedDestination);

  return (
    <>
      {/* Navigation Bar */}
      <Navbar style={{ backgroundColor: "#D3D3D3" }} expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src="/logo.png"
              alt="TravelWorld Logo"
              width="40"
              height="40"
              className="d-inline-block align-top me-2"
            />
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
                  <Button as={Link} to="/login" variant="outline-primary" className="ms-2">
                    Login
                  </Button>
                  <Button as={Link} to="/register" variant="primary" className="ms-2">
                    Register
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Gallery Section */}
      <div className="gallery-container">
        <h1>Explore Dream Destinations</h1>
        <p className="gallery-description">
          Discover breathtaking locations from around the world through our curated collection of travel destinations
        </p>
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedDestination === category.id ? 'active' : ''}`}
              onClick={() => setSelectedDestination(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <div 
              key={index} 
              className="gallery-item"
              onClick={() => setSelectedImage(image)}
            >
              <img src={image.src} alt={image.caption} />
              <div className="image-caption">
                <h3>{image.caption}</h3>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="modal" onClick={() => setSelectedImage(null)}>
            <div className="modal-content">
              <img src={selectedImage.src} alt={selectedImage.caption} />
              <h3>{selectedImage.caption}</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TravelGallery;
