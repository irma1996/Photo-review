import { useState, useCallback } from 'react';
import {db} from  '../firebase';
        

    const useDocData = () => {
    const [images, setImages]= useState([],)

    const getImages = useCallback(() => {
        const imgs = [];

        db.collection('images').get().then(snapshot =>{
            snapshot.forEach(doc => {
                imgs.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setImages(imgs);
         });
    },[]);

    return {images, getImages };
}
 
export default useDocData;