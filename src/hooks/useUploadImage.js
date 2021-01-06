import { useState, useEffect } from 'react';
import {db, storage} from  '../firebase';
		
const useUploadImage = (file) => {
    const [uploadProgress, setUploadProgress] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null); 
    const [status, setStatus] = useState(null);
    const [isSucess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    
    useEffect(()=>{
		if(!file){
			setUploadProgress(null);
			setUploadedImage(null);
			setStatus(null);
			setIsError(false);
			setIsSuccess(false);

			return;
		}
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
		
			//let user know we are done
			setStatus({
				type: "success",
				msg: "Image successfully uploaded"
			});
	
			setUploadProgress(null);

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
                 //file hase been added to db
                 setUploadedImage(image);
                 setIsSuccess(true);
			});
		}); 
		}).catch(error => {
			console.error("File upload can been uploadded!", error);
            setIsError(true);
            setStatus({
				typ:"warning",
				msg: `Image could not be uploaded (${error.code})`
			});
		});		
    }, [file]);

    return {uploadProgress, uploadedImage, status, isSucess, isError};
}
 
export default useUploadImage;
