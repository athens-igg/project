import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // to get the itinerary ID from the URL
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // Assuming you have an auth context
import "bootstrap/dist/css/bootstrap.min.css";

const ItineraryPage = () => {
    const { id } = useParams(); // Get itinerary ID from URL
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, logout } = useAuth(); // Use auth context for user info

    // Fetch itinerary data when component mounts or id changes
    useEffect(() => {
        const fetchItinerary = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/trips/itinerary/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setItinerary(response.data); // Set the itinerary data to state
            } catch (error) {
                console.error("Error fetching itinerary:", error);
                alert("Failed to fetch itinerary. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchItinerary();
    }, [id]); // This will run when the component mounts or when the `id` changes

    if (loading) {
        return <div>Loading...</div>; // Show loading message until data is fetched
    }

    if (!itinerary) {
        return <div>No itinerary found</div>; // Show error message if itinerary is not found
    }

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
                                    <Nav.Link as={Link} to="/profile">Profile</Nav.Link> {/* Show Profile if logged in */}
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

            {/* Itinerary Details */}
            <div className="container mt-5">
                <h1>Itinerary for {itinerary.destination}</h1>
                <p><strong>Trip ID:</strong> {itinerary.trip}</p>
                <p><strong>User ID:</strong> {itinerary.user}</p>
                {/* Display other itinerary details here */}
                <pre>{JSON.stringify(itinerary, null, 2)}</pre>
            </div>
        </>
    );
};

export default ItineraryPage;
