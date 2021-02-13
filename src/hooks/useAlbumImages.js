import {useEffect, useState } from 'react';
import { db } from  '../firebase';
        

    const useAlbumImages = (albumId) => {
        const [images, setImages]= useState([]);


       useEffect(() => {
        const unsubscribe= db.collection('images')
            .where('album',' == ', db.collection('albums').doc(albumId ))
            .orderBy("name")
            .onSnapshot(snapshot => { 
                    const imgs = [];
                
                    snapshot.forEach(doc => {
                        imgs.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });
                    
                    setImages(imgs);
                });

         return unsubscribe;      
    },[albumId]);

    return {images };
}
 
export default useAlbumImages;