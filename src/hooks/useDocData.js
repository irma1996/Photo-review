import {useEffect, useState } from 'react';
import {db} from  '../firebase';
        

    const useDocData = () => {
        const [images, setImages]= useState([],)

       useEffect(() => {
       const subscribe= db.collection("images").orderBy("name").onSnapshot(snapshot =>{ 
       const imgs = [];
           
            snapshot.forEach(doc => {
                imgs.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setImages(imgs);
         });
         return subscribe;      
    },[]);

    return {images };
}
 
export default useDocData;