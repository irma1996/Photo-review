import React from 'react'
import { Row, Col, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AlbumsGrid = ({albums}) => {
    return (
        <Row>
            {albums.map(album => (
                <Col sm={2} md={3} lg={4} key={album.id}>
                    <Card className= "mb-4">
                         <Card.Body>
                            <Card.Title className="mb-0">
                                <Link to={`/albums/${album.id}`}>{album.title}</Link> 
                            </Card.Title>
                         </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default AlbumsGrid
