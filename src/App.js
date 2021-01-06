	  import React, { useState } from 'react';
		import {storage} from './firebase' 
		import Container from 'react-bootstrap/Container';
		import Form from 'react-bootstrap/Form';
		import Alert from 'react-bootstrap/Alert';		
		import Button from 'react-bootstrap/Button';
		import ProgressBar from 'react-bootstrap/ProgressBar';
		import './App.scss';
;

	function App() {
		const [image, setImage] = useState(null);
		const [alertMsg, setAlertMsg] = useState(null);
		const [uploadImage, setUploadImage] = useState(null);
		const [uploadProgress, setUploadProgress] = useState(null);
		
		const handleFileChange = e => {
			if (e.target.files[0]) {
				setImage(e.target.files[0]);
			}
			console.log("File changed!", e.target.files[0]);
		}

		const handleSubmit = e => {
			e.preventDefault();
			
			if(!image) {
				return;
			}

		// get root reference
		const storageRef = storage.ref();

		// create a reference based on the file's name
		const fileRef = storageRef.child(`images/${image.name}`);

		// put (upload) image to fileRef
		const uploadTask = fileRef.put(image, { uploadedBy: 1 });

		//atach listener for `state_changed-event
		uploadTask.on('state_changed', taskSnapshot => {
			setUploadProgress(Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100));
			//console.log(`Transfered ${taskSnapshot.bytesTransferred} bytes out of ${taskSnapshot.totalBytes} which is ${progress} %.`);
		});


		uploadTask.then(snapshot=>{
			console.log("File has been uploaded", snapshot);

			//let user know we are done
			setAlertMsg({
				type: "success",
				msg: "Image successfully uploaded"
			});

			//rereieve URL to uploaded file
			snapshot.ref.getDownloadURL().then(url=>{
				setUploadImage(url);
			})

		}).catch(error => {
			console.error("File upload can been uploadded!", error);
			setAlertMsg({
				typ:"warning",
				msg: `Image could not be uploaded (${error.code})`
			});
		})

		console.log("uploadTask:",uploadTask); 
  }

		const handleReset = e => {
			setImage(null);	
			setAlertMsg(null);
			setUploadProgress(null);
			setUploadImage(null);
		}

	
		return (
					<Container> 
						<header className="App-header mb-4">
										<h1>Photo review</h1>
						</header>

						<Form onSubmit={handleSubmit}onReset={handleReset}> 
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
						image
							? `${image.name} (${Math.round(image.size/1024)} kb)`
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

				{
					uploadImage && (<img src={uploadImage} className="img-fluid my-3" alt="uploaded file" />)
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
