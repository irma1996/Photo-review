import React from 'react'
import { Row, Col, Card} from 'react-bootstrap'
import {SRLWrapper} from 'simple-react-lightbox'


const ImagesGrid = ({ images }) => {
    return (
        <SRLWrapper>
            <Row className="my-3">
                {images.map(image => (
                    <Col sm={6} md={4} lg={3} key={image.id}>
                        <Card className= "mb-3"> 
                            <Card.Body>
                            <Card.Text className=" text-muted small">
                                {image.name} ({Math.round (image.size/1024)} kb )
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </SRLWrapper>    
    )
}

export default ImagesGrid