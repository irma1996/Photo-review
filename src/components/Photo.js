import React from 'react';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
        
const Photo = ({image}) => {
    return ( 
        <Col sm={6} md={4} lg={3}> 
            <Card className= "mb-3">
                 <Card.Img variant="top" src={image.url}/>
                 <Card.Body>
                    <Card.Text>
                        {image.name} ({Math.round(image.size/1024)} kb)
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}
 
export default Photo;