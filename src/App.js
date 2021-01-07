	    import React, { useEffect, useState } from 'react';
		import Container from 'react-bootstrap/Container';
		import Form from 'react-bootstrap/Form';
		import Row from 'react-bootstrap/Row';
		import Alert from 'react-bootstrap/Alert';		
		import Button from 'react-bootstrap/Button';
		import ProgressBar from 'react-bootstrap/ProgressBar';
		import './App.scss';
		import Photo from './components/Photo';
		import useUploadImage from './hooks/useUploadImage';
		import useDocData from './hooks/useDocData';
	    
	    const allowedFiletypes = ['image/gif', 'image/jpeg', 'image/png']
		const maxFileSize = 5;
		const maxFileSizeInBytes = maxFileSize * 1024 * 1024;

		function App() {
			const [file, setFile] = useState(null);
			const [uploadFile, setUploadFile] = useState(null);
			const [alertMsg, setAlertMsg] = useState(null);
			const {images, getImages} = useDocData();
			const {uploadProgress, uploadedImage, error, isSuccess} = useUploadImage(uploadFile);
		
		useEffect(() => {
			getImages();
		},[getImages]);

		useEffect(()=>{
			if (uploadedImage) {
				getImages();
			}
		},[uploadedImage, getImages]);

		useEffect (() => {
			if (error) {
				setAlertMsg(error);
			} else if (isSuccess) {
				setAlertMsg({
					type: 'success', 
					msg: 'Image succesfully uploaded.',
				});
			}
		}, [isSuccess, error]);
		 
	const handleFileChange = e => {
		const selectedFile = e.target.files[0];

			if (selectedFile) {
				if(allowedFiletypes.includes(selectedFile.type) && selectedFile.size < maxFileSizeInBytes) {
					setFile(selectedFile); 
					setAlertMsg(null);
				}else{
					setAlertMsg({
						type: 'warning',
						 msg : `Plese select a vaild file (gif, jpg or png) with a maximum 
						filesize of ${maxFileSize} mb.`,
					});
					setFile(null);
				}	
			}			
		}

		const handleSubmit = e => {
			e.preventDefault();
			
			if (!file) {
				return;
			}
			setUploadFile(file);
		}

		const handleReset = e => {
			setUploadFile(null);
			setFile(null);		
		} 

	
		return (
			<Container> 
				<header className="App-header mb-4">
					<h1>Photo review</h1>
				</header>
				
			<Row className= "mb-5">
				{
					images.map(image =>  ( 
					    <Photo image={image} key={image.id}/>
				    ))	
			    }
	        </Row>

			<Form onSubmit={handleSubmit}onReset={handleReset}> 
				<h2>Upload a new image</h2>	
							
				<Form.Group>
					<Form.File
						id="upload-image"
						label="Upload your photos"
						custom
						onChange={handleFileChange}
						/>
				</Form.Group>
				
				<div className="mb-3">
					{
						file
							? `${file.name} (${Math.round(file.size/1024)} kb)`
							: "No image selected."
					}
				</div>		 
				
				{
					uploadProgress !== null && (						
						<ProgressBar animated variant="success" now={uploadProgress} className="mb-3" />
					)
				}

				{
					alertMsg && (<Alert variant={alertMsg.type} className="my-3">{alertMsg.msg}</Alert>)
				}
				
			 	<div>
					<Button variant="primary" className="mr-2" type="submit">Upload</Button>
					<Button variant="secondary" type="reset">Clear</Button>	
				</div>			
			</Form>
    	</Container>		
    )
}

	export default App;
