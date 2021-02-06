	    import React, { useEffect, useState } from 'react';
		import Container from 'react-bootstrap/Container';
		import Row from 'react-bootstrap/Row';		
		import SimpleReactLightbox, {SRLWrapper } from 'simple-react-lightbox';
		import './App.scss';
		import Photo from './components/Photo';
		import UploadImageDropzone from './components/UploadImageDropzone';
		import useDocData from './hooks/useDocData';
		import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
		import Album from './components/albums/Album'
		import Albums from './components/albums/Albums'
		import CreateAlbum from './components/albums/CreateAlbum'
		import AuthRoute from './components/AuthRoute';
		import ForgotPassword from './components/ForgotPassword';
		import Home from './components/Home';
		import Login from './components/Login';
		import Logout from './components/Logout';
		import Signup from './components/Signup';
		import UpdateProfile from './components/UpdateProfile';
		import AuthContextProvider from './contexts/AuthContext'
		import NavBar from './components/NavBar'; 
		import NotFound from './components/NotFound';
	

			   
		function App() {
		const {images} = useDocData();
	
		return (
		 	<Router> 
			   <AuthContextProvider>
					<SimpleReactLightbox>
					
					<NavBar/>

					<Container className= "py-5 mb-5" > 
						<header className="App-header mb-4">
						<h1>Photo review</h1> 
						</header>
							
					<Routes>

						<AuthRoute path="/"> 
							<Home/> 
						</AuthRoute>
						
						<Route path="/albums">
							<Route path= "/">
								<Albums/>
							</Route>
							
							<AuthRoute path="/create">
								<CreateAlbum/>
							</AuthRoute>

							<Route path="/:albumId">
								<Album/>
							</Route>
						</Route>

						<Route path="/login"> 
							<Login/> 
						</Route>

						<Route path="/forgot-password"> 
							<ForgotPassword /> 
						</Route>


						<Route path="/logout"> 
							<Logout/> 
						</Route>
						
						<Route path="/signup"> 
							<Signup/> 
						</Route>
						
						<AuthRoute path="/update-profile"> 
							<UpdateProfile /> 
						</AuthRoute>
						
						<Route path="*" element= {<NotFound/>}/>

					</Routes>
					

						<hr/>

						<UploadImageDropzone/>	 
												
						<hr/>


					<SRLWrapper> 
						<Row className="mb-5">
							{
								images.map(image =>  ( 
									<Photo image={image} key={image.id}/>
								))	
							}
						</Row>
					</SRLWrapper>
						
					</Container>	
			
					<footer className= "bg-dark text-with text-center py-3">
						<span className="text-muted text-small"> Simple File Uploader </span>
					</footer>

				</SimpleReactLightbox>	
				</AuthContextProvider>

			</Router>	
        )
	}

export default App;
