
import  React from 'react';
import { Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';

const NavBar = () => {
   const { currentUser } = useAuth()



	return (
			<>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Link to= "/" className= "navbar-brand"> 
						<img 
							alt= " Photo review"
							width= "30"
							height="30"
							className= "d-inline.block align-top"
						/> {' '} 
			
					</Link>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<Nav.Link href="/albums" className="nav-link">Albums</Nav.Link>
							{
								currentUser ? (
									<NavDropdown title= {currentUser.displayName || currentUser.email } 
									id="basic-nav-dropdown">
										<NavLink to="/update-profile" className="dropdown-item">Update Profile
										</NavLink>
										<NavDropdown.Divider />
										<NavLink to="/logout" className="dropdown-item">Log Out</NavLink>
									</NavDropdown>
								):(
									<NavLink to="/login" className="nav-link">Login</NavLink>
								)

							}

							</Nav>				
						</Navbar.Collapse>
					</Container>
				</Navbar>
			<Container>
							
		</Container>
				</>
			)
		}
        
export default NavBar