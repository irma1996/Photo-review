import React, { useState } from "react";
import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

const CreateAlbum = () => {
  const [fault, setFault] = useState(false);
  const [load, setLoad] = useState(false);
  const [title, setTitle] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const changeTheTitle = e => {
    setTitle(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (title.length < 4) {
      return;
    }

    setFault(false);
    setLoad(true);

    try {
      const docRef = await db.collection("albums").add({
        title,
        owner: currentUser.uid
      });

      navigate(`/albums/${docRef.id}`);
    } catch (e) {
      setFault(e.message);
      setLoad(false);
    }
  };

  return (
    <>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Card>
            <Card.Body>
              <Card.Title>Create a New Album</Card.Title>

              {fault && <Alert variant="danger">{fault}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="title">
                  <Form.Label> AlbumTitle</Form.Label>
                  <Form.Control
                    type="title"
                    onChange={changeTheTitle}
                    value={title}
                    required
                  />
                  {title && title.length < 4 && (
                    <Form.Text className="text-danger">
                      Please enter a title at least 4 characters long.
                    </Form.Text>
                  )}
                </Form.Group>

                <Button disabled={load} className="btn btn-dark" type="submit">
                  Create
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateAlbum;
