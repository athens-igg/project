import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateTrip.css"; 

export default function TripPlanner() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Auth state for login/logout
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);

  const interestOptions = ["Foods", "Beaches", "Cultural", "Gardens_and_Parks","Sport", "Museums","theatres_and_entertainments","Shops","historic"];
  const handleLogout = () => {
    logout();       // Clear user session
    navigate("/");  // Redirect to homepage
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const tripData = {
      destination,
      startDate,
      endDate,
      interests,
      budget: Number(budget),
    };

    try {
      const response = await axios.post("http://localhost:5000/api/trips", tripData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      // After creating the trip, get the itinerary ID from the backend
      const itineraryResponse = await axios.get(`http://localhost:5000/api/trips/${response.data._id}/itinerary/generate`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      // Use the itinerary ID to navigate to the itinerary page
      navigate(`/itinerary/${itineraryResponse.data.itineraryId}`);
  } catch (error) {
      console.error("Error creating trip:", error);
      alert("Failed to create trip. Please try again.");
  } finally {
      setLoading(false);
  }
  
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

      {/* Trip Planner Form */}
      <div className="trip-planner-container">
        <h1>Plan Your Trip</h1>
        <form className="trip-form" onSubmit={handleSubmit}>
          {/* Destination Input */}
          <label>Destination</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />

          {/* Start Date Input */}
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />

          {/* End Date Input */}
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />

          {/* Budget Input */}
          <label>Budget </label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />

          {/* Interests (Styled Pills) */}
<label>Interests</label>
<div className="interest-pills">
  {interestOptions.map((interest) => (
    <button
      type="button"
      key={interest}
      className={`pill ${interests.includes(interest) ? "selected" : ""}`}
      onClick={() =>
        setInterests((prev) =>
          prev.includes(interest)
            ? prev.filter((i) => i !== interest)
            : [...prev, interest]
        )
      }
    >
      {interest}
    </button>
  ))}
</div>


          {/* Submit Button */}
          <button type="submit" className="submit-button" disabled={loading}onClick={(e) => {
    if (!user) {
      e.preventDefault(); // Prevent form submission
      navigate("/login");
    }
  }}>
            {loading ? "Generating Itinerary..." : "Create Trip"}
          </button>
        </form>
      </div>
    </>
  );
}
