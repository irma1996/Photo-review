import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useDeleteImage from '../hooks/useDeleteImage';

        
const Photo = ({ image }) => {
    const [deleteImg, setDeleteImg]= useState(null);
     useDeleteImage(deleteImg)

   const handleDeleteImg = () => {
       //eslint-disable-next-line no-restricted-globals
       if(confirm(`Are you sure to delete this image\n"${image.name}"?`)){
        setDeleteImg(image);
       }
     
    }

    return ( 
        <Col sm={6} md={4} lg={3}> 
            <Card className= "mb-3">
                <a href={image.url} title="View image in ligthbox" data-attribute= "SRL">
                    <Card.Img variant="top" src={image.url}/>
                </a>
                <Card.Body>
                    <Card.Text className= "text-muted small">
                        {image.name} ({Math.round(image.size/1024)} kb)
                    </Card.Text>
                    <Button variant="danger" size="sm" onClick={handleDeleteImg}> Delete </Button>
                </Card.Body>
            </Card>
        </Col>
    );
}
 
export default Photo;