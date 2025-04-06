import React, { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters long, include at least one uppercase letter and one special character.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await register(name, email, password);
      setSuccess(true);
      setError("");

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirect after success
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
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
                    <Button as={Link} to="/login" variant="outline-primary" className="ms-2">
                Login
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* REGISTER FORM */}
      <div className="d-flex justify-content-center align-items-center main-content" style={{ minHeight: "60vh" }}>
        <Container className="p-4 shadow-lg rounded" style={{ maxWidth: "450px", backgroundColor: "#fff" }}>
          <h2 className="text-center mb-4">Register</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">Registration successful! Redirecting to login...</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Name:</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label>Email:</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label>Password:</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label>Confirm Password:</label>
              <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-success w-100">Register</button>
          </form>
        </Container>
      </div>
    </>
  );
};

export default Register;
