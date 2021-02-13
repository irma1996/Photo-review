import React from 'react'
import { useParams } from 'react-router-dom'
import ImagesGrid from './ImagesGrid'
import useAlbumImages from '../../hooks/useAlbumImages'

const Album = () => {
  
    //query firestore for images with this albumId
   const{ albumId } = useParams()
   const { images } = useAlbumImages(albumId)
   
    return (
        <div>
           This will show all images in a specific album with id <code>{albumId}</code>. 

           <ImagesGrid images={images} />
        </div>
    )
}

export default Album
