	    import React, { useEffect, useState } from 'react';
		import Container from 'react-bootstrap/Container';
		import Row from 'react-bootstrap/Row';		
		import SimpleReactLightbox, {SRLWrapper } from 'simple-react-lightbox';
		import './App.scss';
		import Photo from './components/Photo';
		import UploadImageDropzone from './components/UploadImageDropzone';
		import useDocData from './hooks/useDocData';
		import LogIn from './components/LogIn'; 
		
			   
		function App() {
		const {images} = useDocData();
	
		return (
			<SimpleReactLightbox>
				
				<LogIn/>

				<Container className= "py-5 mb-5" > 
					<header className="App-header mb-4">
			  		<h1>Photo review</h1> 
					</header>
						

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
        )
	}

export default App;
