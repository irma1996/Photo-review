import React from 'react'
import { Link } from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext'
import useAlbums from '../../hooks/useAlbums' 
import AlbumsGrid from './AlbumsGrid'

const Albums = () => {
    const {currentUser} = useAuth()
    const {albums, loading } = useAlbums()

    return (
        <>
            <h3 className="mb-3">All Albums</h3>
           
            {!loading && (<AlbumsGrid albums={albums}/>)}

            {currentUser && (
                <div className="mt">
                    <Link to= "/albums/create" className="btn btn-primary"> Create a new Album</Link>
                </div>
                )}
        </>
    )
}

export default Albums
