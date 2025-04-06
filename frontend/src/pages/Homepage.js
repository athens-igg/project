import React, { useState } from "react";
import { Navbar, Nav, Container, Button, ListGroup, Spinner, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ExploreDestinations from '../components/ExploreDestinations';

const API_KEY = "5ae2e3f221c38a28845f05b657803716b89a8415ff74cbe991ffb379";
const BASE_URL = "https://api.opentripmap.com/0.1/en/places";

/** Fetch destination coordinates */
const getDestinationCoordinates = async (destination) => {
  try {
    const response = await axios.get(`${BASE_URL}/geoname`, {
      params: { name: destination, apikey: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching destination coordinates:", error);
    return null;
  }
};

/** Fetch places in the radius */
const fetchPlaces = async (lat, lon, radius = 10000) => {
  try {
    const response = await axios.get(`${BASE_URL}/radius`, {
      params: { radius, lon, lat, apikey: API_KEY },
    });

    const filteredPlaces = await Promise.all(
      response.data.features
        .filter(place => place.properties.name) // Remove unnamed places
        .map(async (place) => {
          const details = await fetchPlaceDetails(place.properties.xid);
          return details ? place : null; // Keep only places with descriptions
        })
    );

    return filteredPlaces.filter(Boolean); // Remove null entries
  } catch (error) {
    console.error("OpenTripMap API Error:", error.response?.data || error.message);
    return [];
  }
};

/** Fetch place details by XID */
const fetchPlaceDetails = async (xid) => {
  try {
    const response = await axios.get(`${BASE_URL}/xid/${xid}`, {
      params: { apikey: API_KEY },
    });

    return response.data.wikipedia_extracts?.text ? response.data : null; // Remove places with no description
  } catch (error) {
    console.error("Error fetching place details:", error);
    return null;
  }
};

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  /** Handle Search */
  const handleSearch = async (e) => {
    setSearch(e.target.value);
    if (e.target.value.length < 3) return;

    setLoading(true);
    const data = await getDestinationCoordinates(e.target.value);
    if (data && data.lat && data.lon) {
      const places = await fetchPlaces(data.lat, data.lon);
      setDestinations(places);
    } else {
      setDestinations([]);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    logout();       // Clear user session
    navigate("/");  // Redirect to homepage
  };

  /** Handle Click on a Place */
  const handlePlaceClick = async (xid) => {
    setLoading(true);
    const details = await fetchPlaceDetails(xid);
    setSelectedPlace(details);
    setModalShow(true);
    setLoading(false);
  };

  return (
    <>
      {/* HEADER */}
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


       {/* CAROUSEL */}
       <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff" alt="Beach" style={{ maxHeight: "500px", objectFit: "cover" }} />
          <Carousel.Caption><h3>Explore Beautiful Mountains</h3></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" alt="Mountains" style={{ maxHeight: "500px", objectFit: "cover" }} />
          <Carousel.Caption><h3>Go on an Adventure</h3></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="https://images.unsplash.com/photo-1494526585095-c41746248156" alt="City" style={{ maxHeight: "500px", objectFit: "cover" }} />
          <Carousel.Caption><h3>Experience Vibrant Cities</h3></Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* SEARCH DESTINATIONS */}
      <div className="input-group mt-4 mx-auto" style={{ maxWidth: '700px' }}>
  <span className="input-group-text bg-white border-end-0 rounded-start-pill px-4 py-3">
    <i className="bi bi-search fs-5 text-muted"></i>
  </span>
  <input
    type="text"
    className="form-control border-start-0 rounded-end-pill px-4 py-3 fs-5"
    placeholder="Search destinations..."
    value={search}
    onChange={handleSearch}
  />
</div>



      {/* DESTINATIONS LIST */}
      <Container>
        <h2 className="text-center my-4">Search Results</h2>
        {destinations.length > 0 ? (
          <ListGroup className="mt-3">
            {destinations.map((place, index) => (
              <ListGroup.Item key={index} onClick={() => handlePlaceClick(place.properties.xid)} style={{ cursor: "pointer" }}>
                {place.properties.name || "Unnamed Place"}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          search.length >= 3 && !loading && <p className="text-center">No destinations found.</p>
        )}
      </Container>

      {/* PLACE DETAILS MODAL */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPlace?.name || "Place Details"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Spinner animation="border" />
          ) : selectedPlace ? (
            <>
              {selectedPlace.preview && (
                <img src={selectedPlace.preview.source} alt="Place" className="img-fluid mb-3" />
              )}
              <p>{selectedPlace.wikipedia_extracts?.text || "No description available."}</p>
              <a href={selectedPlace.otm} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                More Info
              </a>
            </>
          ) : (
            <p>No details available.</p>
          )}
        </Modal.Body>
      </Modal>

      {/* TRIP PLANNING BUTTON */}
      <div style={{ backgroundColor: "#e9ecef" }} className="py-5">
      <Container className="text-center mt-5">
  <h2 style={{ color: "#2d3748", fontSize: "3rem", marginBottom: "1rem" }}>
    Plan Your Dream Trip
  </h2>
  <p style={{ color: "#718096", fontSize: "1.2rem", marginBottom: "2rem" }}>
    Customize and organize your travel itinerary with ease.
  </p>
  <Button
  className="btn btn-success px-5 py-3 rounded-pill shadow-sm"
  style={{
    backgroundColor: "#38a169",
    borderColor: "#38a169",
    fontSize: "1.2rem",
    transition: "all 0.3s ease-in-out",
  }}
  onMouseOver={(e) => {
    e.target.style.backgroundColor = "#2f855a";
    e.target.style.borderColor = "#2f855a";
    e.target.style.transform = "translateY(-2px)";
    e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
  }}
  onMouseOut={(e) => {
    e.target.style.backgroundColor = "#38a169";
    e.target.style.borderColor = "#38a169";
    e.target.style.transform = "translateY(0)";
    e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  }}
  onClick={() => (user ? navigate("/trip-planner") : navigate("/login"))}
>
  {user ? "Create a Trip" : "Plan a Trip"}
</Button>

</Container>
</div>
      <ExploreDestinations />

    </>
  );
};

export default Home;