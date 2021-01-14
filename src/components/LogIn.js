import  React from 'react';
import {Navbar, Nav, NavDropdown, Container,Form, Button, FormControl} from 'react-bootstrap';

    const LogIn = () => {
			return(
				<>
					<Navbar bg="dark" variant="dark">
						<Container>
							<Navbar.Brand href="/">
							<img 
								alt= " Photo review"
								width= "30"
								height="30"
								className= "d-inline.block align-top"
							/> {''} 
							</Navbar.Brand>
							<Navbar.Toggle aria-controls="basic-navbar-nav" />
				
							<Navbar.Collapse id="basic-navbar-nav">
								<Nav className="ml-auto">
									<Nav.Link href="/albums">Albums</Nav.Link>
									<NavDropdown title="Username" id="basic-nav-dropdown">
										<NavDropdown.Item href="#my-profile">My profile</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item href="/logout">Log Out</NavDropdown.Item>
									</NavDropdown>
                                    <Form inline>
                                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                        <Button variant="outline-success">Search</Button>
                                    </Form>
								</Nav>				
							</Navbar.Collapse>
						</Container>
					</Navbar>
					<Container>
						
					</Container>
				</>
			)
        }
        
export default LogIn