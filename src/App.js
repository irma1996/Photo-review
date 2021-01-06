	  import React, { useEffect, useState } from 'react';
		import {db, storage} from './firebase' 
		import Container from 'react-bootstrap/Container';
		import Form from 'react-bootstrap/Form';
		import Row from 'react-bootstrap/Row';
		import Col from 'react-bootstrap/Col';
		import Card from 'react-bootstrap/Card';
		import Alert from 'react-bootstrap/Alert';		
		import Button from 'react-bootstrap/Button';
		import ProgressBar from 'react-bootstrap/ProgressBar';
		import './App.scss';
	    
	    
	    const allowedFiletypes = ['image/gif', 'image/jpeg', 'image/png']
		const maxFileSize = 5;
		const maxFileSizeInBytes = maxFileSize * 1024 * 1024;

		function App() {
			const [file, setFile] = useState(null);
			const [images, setImages]= useState([]);
			const [alertMsg, setAlertMsg] = useState(null);
			const [uploadProgress, setUploadProgress] = useState(null);
		
		useEffect(() => {
			getImages();
		},[]);

		const getImages = async () => {
			console.log("Getting images from db...");
		const imgs = [];

		const snapshot = await db.collection('images').get();
			snapshot.forEach(doc => {
				imgs.push({
					id: doc.id,
					...doc.data(),
				});
			});
			
			setImages(imgs);
		}

		 
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
			
			if(!file) {
				return;
			}

		// get root reference
		const storageRef = storage.ref();

		// create a reference based on the file's name
		const fileRef = storageRef.child(`images/${file.name}`);

		// put (upload) file to fileRef
		const uploadTask = fileRef.put(file);

		//atach listener for `state_changed-event
		uploadTask.on('state_changed', taskSnapshot => {
			setUploadProgress(Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100));
			//console.log(`Transfered ${taskSnapshot.bytesTransferred} bytes out of ${taskSnapshot.totalBytes} which is ${progress} %.`);
		});

		// are we there yet?
		uploadTask.then(snapshot=>{
			console.log("File has been uploaded", snapshot);

			//let user know we are done
			setAlertMsg({
				type: "success",
				msg: "Image successfully uploaded"
			});

			//rereieve URL to uploaded file
		snapshot.ref.getDownloadURL().then(url => {
			 //add uploaded file to db
			 db.collection('images').add({
				name: file.name,
				path: snapshot.ref.fullPath,
				size: file.size,
				type:file.type,
				url,

			 }).then(() => {
				 //file hase been added to db
				 console.log("File has been added to db");
				
				 //redresh list of files
				 getImages();
			 });
		}); 
		}).catch(error => {
			console.error("File upload can been uploadded!", error);
			setAlertMsg({
				typ:"warning",
				msg: `Image could not be uploaded (${error.code})`
			});
		})		
  }

		const handleReset = e => {
			setFile(null);	
			setAlertMsg(null);
			setUploadProgress(null);
		}

	
	return (
		<Container> 
				<header className="App-header mb-4">
					<h1>Photo review</h1>
				</header>
				
				<Row className= "mb-5">
					{
						images.map(image =>  ( 
							<Col sm={6} md={4} lg={3} key={image.id}> 
							   <Card className= "mb-3">
								<Card.Img variant="top" src={image.url}/>
									<Card.Body>
										<Card.Text>
										    {image.name} ({Math.round(image.size/1024)} kb)
										</Card.Text>
									</Card.Body>
							    </Card>
						    <br />
					        </Col>
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
						<Button variant="primary" type="submit">Upload</Button>
						<Button variant="secondary" type="reset">Clear</Button>
				</div>			
			</Form>
	 </Container>		
    )
}

	export default App;
