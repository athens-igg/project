import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
//import { motion } from "framer-motion";

const Profile = () => {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("❌ No token found in localStorage");
        setError("User not authenticated.");
        setLoading(false);
        navigate("/login"); // Redirect if not authenticated
        return;
      }

      try {
        console.log("🔑 Sending Token:", token);

        const response = await fetch("http://localhost:5000/api/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Fix Authorization header
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        console.log("✅ Parsed JSON Data:", data);

        setUserData(data); // Set name and email from backend
      } catch (error) {
        console.error("🚨 Error fetching user data:", error);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading)
    return <div className="text-center p-6">Loading user data...</div>;
  if (error) return <div className="text-center p-6 text-red-600">{error}</div>;
  console.log("🖼️ Profile Photo URL:", userData.profilePhoto);

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
                    onClick={logout}
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

      <div className="min-h-screen bg-gray-100 p-6">
        {/* Profile Section */}
        <div className="bg-white shadow-md p-6 rounded-lg max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900">{userData?.name}</h2>{" "}
          {/* Display name */}
          <p className="text-gray-600">{userData?.email}</p>{" "}
          {/* Display email */}
        </div>
      </div>
    </>
  );
};

export default Profile;
