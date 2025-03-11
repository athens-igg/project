import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // Custom hook for authentication state
import "bootstrap/dist/css/bootstrap.min.css";
import  { useState } from "react";
//import axios from "axios";
import { useNavigate } from "react-router-dom";


function CreateTrip() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [people, setPeople] = useState("");
  const [budget, setBudget] = useState("");
  const [type, setType] = useState("relaxation");
  const navigate = useNavigate();

  const handleCreateTrip = async (e) => {
    e.preventDefault();

    const tripData = {
        destination,
        days: Number(days),   // Convert to number
        people: Number(people),
        budget: Number(budget),
        type
      };
    
      console.log("Sending Trip Data:", tripData); // Debugging

    try {
      //const token = localStorage.getItem("token");

     /* const response = await axios.post(
        "http://localhost:5000/api/trips/create",
        { destination, days, people, budget, type },
        { headers: { Authorization: `Bearer ${token}`,
          "Content-Type": "application/json" } }
      );*/

      alert("Trip created successfully!");
      navigate("/itinerary"); // Redirect to user profile
    } catch (error) {
       console.error("Error Response:", error.response ? error.response.data : error.message);
    alert("Failed to create trip. Please check your input and try again.");
}
  };
  const { user, logout } = useAuth();
  

  return (
    <>
      {/* HEADER */}
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
     



  return (
    <div>
      <h2>Create a Trip</h2>
      <form onSubmit={handleCreateTrip}>
        <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} required />
        <input type="number" placeholder="Number of Days" value={days} onChange={(e) => setDays(e.target.value)} required />
        <input type="number" placeholder="Number of People" value={people} onChange={(e) => setPeople(e.target.value)} required />
        <input type="number" placeholder="Budget" value={budget} onChange={(e) => setBudget(e.target.value)} required />
        
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="relaxation">Relaxation</option>
          <option value="adventure">Adventure</option>
          <option value="food">Food</option>
          <option value="cultural">Cultural</option>
        </select>

        <Button
                  variant="success"
                  onClick={() => (user ? navigate("/itinerary/:id") : navigate("/login"))}
                >
                  {user ? "Create a Trip" : "Plan a Trip"}
                </Button>
      </form>
    </div>
  );


      

     

     
    </>
  );
};

export default CreateTrip;
