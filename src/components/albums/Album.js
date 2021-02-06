import React from 'react'
import AlbumImages from './AlbumImages'

const Album = () => {
    //query firestore for images with this albumId
    return (
        <div>
           This will show all images in a specific album.

           <AlbumImages images={[]}/>
        </div>
    )
}

export default Album
