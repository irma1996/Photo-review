	    import React, { useEffect, useState } from 'react';
		import Container from 'react-bootstrap/Container';
		import Row from 'react-bootstrap/Row';		
		import SimpleReactLightbox, {SRLWrapper } from 'simple-react-lightbox';
		import './App.scss';
		import Photo from './components/Photo';
		import UploadImageDropzone from './components/UploadImageDropzone';
		import useDocData from './hooks/useDocData';
		import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
		import Home from './components/Home';
		import Signup from './components/Signup';
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

						<Route path="/"> 
							<Home/> 
						</Route>
						
						<Route path="/signup"> 
							<Signup/> 
						</Route>

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
