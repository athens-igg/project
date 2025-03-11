import React, { useState } from "react";
//import axios from "axios";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // Custom hook for authentication state
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [destinations] = useState([]);
  const [search, setSearch] = useState("");

  /*useEffect(() => {
    axios
      .get("http://localhost:5000/api/destinations")
      .then((response) => {
        console.log("API Response:", response.data); // Check the response format in the console
        if (Array.isArray(response.data)) {
          setDestinations(response.data);
        } else {
          console.error("Unexpected API response format:", response.data);
          setDestinations([]); // Ensure it's always an array
        }
      })
      .catch((error) => {
        console.error("Error fetching destinations:", error);
        setDestinations([]); // Prevent `null` or `undefined`
      });
  }, []);*/
  

  return (
    <>
      {/* HEADER */}
      <Navbar style={{ backgroundColor: "#D3D3D3" }} expand="lg" className="shadow-sm">
    
        <Container>
        <Navbar.Brand as={Link} to="/" className="travelworld-brand">
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

      {/* CAROUSEL */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff"
            alt="Beach"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Explore Beautiful Beaches</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
            alt="Mountains"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Go on an Adventure</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1494526585095-c41746248156"
            alt="City"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Experience Vibrant Cities</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* SEARCH DESTINATIONS */}
      <Container className="text-center my-5">
       
        <input
          type="text"
          placeholder="Search destinations..."
          className="form-control d-inline-block w-50 mt-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Container>
      {/* TRIP PLANNING BUTTON */}
      <Container className="text-center mt-5">
        <h2>Plan Your Dream Trip</h2>
        <p>Customize and organize your travel itinerary with ease.</p>
        <Button
          variant="success"
          onClick={() => (user ? navigate("/trip-planner") : navigate("/login"))}
        >
          {user ? "Create a Trip" : "Plan a Trip"}
        </Button>
      </Container>
      
      {/* DESTINATIONS LIST */}
      <Container>
        <h2 className="text-center my-4">Top Destinations</h2>
        <div className="row">
          {destinations.length === 0 ? (
            <p className="text-center">No destinations found.</p>
          ) : (
            destinations
              .filter((dest) => dest.name.toLowerCase().includes(search.toLowerCase()))
              .map((dest) => (
                <div key={dest.xid} className="col-md-4 mb-4">
                  <div className="card">
                    <img
                      src={dest.image || "https://via.placeholder.com/300"}
                      className="card-img-top"
                      alt={dest.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{dest.name}</h5>
                      <p className="card-text">{dest.description || "No description available."}</p>
                      <a href={dest.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </Container>

      
    </>
  );
};

export default Home;