import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
 
const NavBar = () => {
 const { currentUser } = useAuth();
 
 return (
    <>
      <Navbar bg="dark" variant="dark">
          <Container>
            <Link to="/" className="navbar-brand">
              Photo review
            </Link>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link to="/albums" className="nav-link">
              Albums
            </Link>
            {currentUser ? (
            <NavDropdown
              title={currentUser.displayName || currentUser.email}
              id="basic-nav-dropdown"
            >
            <Link to="/update-profile" className="dropdown-item">
              Update Profile
            </Link>
            <NavDropdown.Divider />
        
            <Link to="/logout" className="dropdown-item">
              Log Out
            </Link>
            </NavDropdown>
        ) : (
          <Link to="/login" className="nav-link">
            Login
          </Link>
        )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  <Container></Container>
  </>
  );
};
 
export default NavBar;