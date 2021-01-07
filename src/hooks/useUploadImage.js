import { useState, useEffect } from 'react';
import { db, storage } from  '../firebase';
		
const useUploadImage = (file) => {
    const [uploadProgress, setUploadProgress] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null); 
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
   
    useEffect(()=>{
		if(!file){
			setUploadProgress(null);
			setUploadedImage(null);
			setError(null);
			setIsSuccess(false);

			return;
		}

		//reset enviroment
		setError(null);
		setIsSuccess(false);
	

		// get file reference
		const fileRef = storage.ref(`images/${file.name}`);

		// put file to fileRef
		const uploadTask = fileRef.put(file);

		//atach listener for `state_changed-event
		uploadTask.on('state_changed', taskSnapshot => {
			setUploadProgress(Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100));
			//console.log(`Transfered ${taskSnapshot.bytesTransferred} bytes out of ${taskSnapshot.totalBytes} which is ${progress} %.`);
		});

		// are we there yet?
		uploadTask.then(snapshot=>{		
			//rereieve URL to uploaded file
			snapshot.ref.getDownloadURL().then(url => {
             //add uploaded file to db
             const image ={
                name: file.name,
				path: snapshot.ref.fullPath,
				size: file.size,
				type:file.type,
				url,		
             };
            
            db.collection('images').add(image).then(() => {
			
				//let user know we are done
				setIsSuccess(true);
				setUploadProgress(null);
					
				//file hase been added to db
                 setUploadedImage(image);
                 setIsSuccess(true);
			});
		}); 
		}).catch(error => {
			console.error("File upload can been uploadded!", error);
            setError({
				typ: "warning",
				msg: `Image could not be uploaded (${error.code})`
			});
		});		
    }, [file]);

    return {uploadProgress, uploadedImage, error, isSuccess};
}
 
export default useUploadImage;
