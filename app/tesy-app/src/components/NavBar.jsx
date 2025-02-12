import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../images/Logo-lapinakyva.gif';
import { useEffect } from 'react';

const NavBar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('loggedUser'));

  const handleLogout = (event) => {
    localStorage.clear();
    // navigate('/');
    window.location.href = '/';
    console.log('user in the navebar', user);

    // Add any additional logout logic here
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary justify-content-between">
      <Container>
        <Navbar.Brand as={NavLink} to="/home">
          {' '}
          <img
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="Tesy logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="mr-auto" variant="tabs">
            {user &&
              (user.roles.includes('volunteer') ||
                user.roles.includes('admin')) && (
                <Nav.Link as={NavLink} to="/animalregister" className="px-3">
                  Animal Register
                </Nav.Link>
              )}
            {/* <Nav.Link as={NavLink} to="/animalregister" className="px-3">
              Animal Register
            </Nav.Link> */}
            {user &&
              (user.roles.includes('volunteer') ||
                user.roles.includes('admin')) && (
                <Nav.Link as={NavLink} to="/missionreport" className="px-3">
                  Rescue mission
                </Nav.Link>
              )}
            {/* <Nav.Link as={NavLink} to="/missionreport" className="px-3">
              Rescue mission
            </Nav.Link> */}
            {user &&
              (user.roles.includes('volunteer') ||
                user.roles.includes('admin') ||
                user.roles.includes('user')) && (
                <Nav.Link as={NavLink} to="/animalreport" className="px-3">
                  Animal report
                </Nav.Link>
              )}
            {/* <Nav.Link as={NavLink} to="/animalreport" className="px-3">
              Animal report
            </Nav.Link> */}
            {user &&
              (user.roles.includes('volunteer') ||
                user.roles.includes('admin') ||
                user.roles.includes('user')) && (
                <Nav.Link as={NavLink} to="/observation" className="px-3">
                  Observation
                </Nav.Link>
              )}
            {/* <Nav.Link as={NavLink} to="/observation" className="px-3">
              Observation
            </Nav.Link> */}
            {user && user.roles.includes('admin') && (
              <Nav.Link as={NavLink} to="/admin" className="px-3">
                Admin Dashboard
              </Nav.Link>
            )}
            {/* <Nav.Link as={NavLink} to="/admin" className="px-3">
              Admin
            </Nav.Link> */}
            {/* <NavDropdown title="Admin" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> 
            </NavDropdown>*/}
            <Nav.Link
              as={NavLink}
              to="/"
              className="px-3"
              onClick={handleLogout}
            >
              Log out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
