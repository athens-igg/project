import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Card,
  Accordion,
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Button,
} from "react-bootstrap";
import { useAuth } from "../auth/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ItineraryPage = () => {
  const { id } = useParams();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleLogout = () => {
    logout(); // Clear user session
    navigate("/"); // Redirect to homepage
  };

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/trips/${id}/itinerary`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("🎯 Itinerary data received:", response.data);
        setItinerary(response.data);
      } catch (error) {
        console.error("Error fetching itinerary:", error);
        alert("Failed to fetch itinerary. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [id]);

  const saveItinerary = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/itineraries",
        {
          trip: itinerary._id,
          destination: itinerary.destination,
          startDate: itinerary.startDate,
          endDate: itinerary.endDate,
          days: itinerary.days,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Saved:", response.data);
      setSaved(true);
    } catch (error) {
      console.error("❌ Failed to save:", error);
      alert("Failed to save itinerary.");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!itinerary)
    return <div className="text-center mt-5">No itinerary found</div>;

  const markers = [];
  Object.values(itinerary.days).forEach((day) => {
    day.forEach((place) => {
      if (place.geometry?.coordinates) {
        markers.push({
          lat: place.geometry.coordinates[1],
          lng: place.geometry.coordinates[0],
          name: place.properties.name,
        });
      }
    });
  });

  const defaultCenter =
    markers.length > 0 ? [markers[0].lat, markers[0].lng] : [10.0, 76.0];

  return (
    <>
      {/* Navbar */}
      <Navbar
        style={{ backgroundColor: "#D3D3D3" }}
        expand="lg"
        className="shadow-sm"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src="/logo.png"
              alt="TravelWorld Logo"
              width="50"
              height="50"
              className="me-2"
            />
            <span className="travelworld-text">TravelWorld</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/trip-planner">
                Trip Planner
              </Nav.Link>
              <Nav.Link as={Link} to="/gallery">
                Gallery
              </Nav.Link>
              <Nav.Link as={Link} to="/feedback">
                Feedback
              </Nav.Link>
              {user ? (
                <>
                  <Nav.Link as={Link} to="/profile">
                    Profile
                  </Nav.Link>
                  <Button
                    variant="outline-danger"
                    onClick={handleLogout}
                    className="ms-2"
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
                    className="ms-2"
                  >
                    Login
                  </Button>
                  <Button
                    as={Link}
                    to="/register"
                    variant="primary"
                    className="ms-2"
                  >
                    Register
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Itinerary Content */}
      <Container className="mt-4">
        <h2 className="mb-4 text-center">
          Itinerary for {itinerary.destination}
        </h2>

        <Button
          variant="success"
          className="mb-3"
          onClick={saveItinerary}
          disabled={saved}
        >
          {saved ? "Itinerary Saved!" : "Save Itinerary"}
        </Button>

        {/* Map */}
        <MapContainer
          center={defaultCenter}
          zoom={10}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {markers.map((marker, index) => (
            <Marker key={index} position={[marker.lat, marker.lng]}>
              <Popup>{marker.name}</Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Day-wise Itinerary */}
        <Accordion defaultActiveKey="0" className="mt-4">
          {Object.entries(itinerary.days).map(([day, places], index) => (
            <Accordion.Item eventKey={index.toString()} key={day}>
              <Accordion.Header>📅 {day}</Accordion.Header>
              <Accordion.Body>
                <Row xs={1} sm={2} md={2} lg={3} xl={3} className="g-4">
                  {places.map((place, idx) => (
                    <Col key={idx}>
                      <Card className="h-100 shadow-sm">
                        {place.properties.image && (
                          <Card.Img
                            variant="top"
                            src={place.properties.image}
                            alt={place.properties.name}
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                        )}
                        <Card.Body>
                          <Card.Title>{place.properties.name}</Card.Title>
                          <Card.Text>
                            <strong>📍 Location:</strong>{" "}
                            {place.geometry.coordinates[1]},{" "}
                            {place.geometry.coordinates[0]}
                            <br />
                            <strong>⭐ Rating:</strong>{" "}
                            {place.properties.rate || "N/A"}
                            <br />
                            <strong>🔖 Category:</strong>{" "}
                            {place.properties.kinds.replace(/_/g, " ")}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </>
  );
};

export default ItineraryPage;
