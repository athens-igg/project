import React, { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/"); // Redirect to homepage after login
    } catch (err) {
      setError(err.message);
    }
  };

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
            <Button as={Link} to="/register" variant="primary" className="ms-2">
                                Register
                              </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    {/* LOGIN FORM */}
    <div className="d-flex justify-content-center align-items-center main-content" style={{ minHeight: "60vh" }}>
      <Container className="p-4 shadow-lg rounded" style={{ maxWidth: "450px", backgroundColor: "#fff" }}>
        <h2 className="text-center mb-4">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      </Container>
    </div>
    </>
  );
};

export default Login;
