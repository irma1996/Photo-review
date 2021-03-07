import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Form, Row, Col, Button } from "react-bootstrap";
import { db } from "../../firebase";
import useAlbum from "../../hooks/useAlbum";

const EditAlbum = () => {
  const { albumId } = useParams();
  const doYouWantToEdit = useRef();
  const [fault, setFault] = useState(null);
  const navigate = useNavigate();
  const { album, loading } = useAlbum(albumId);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFault(null);

    try {
      await db.collection("albums").doc(albumId).update({
        title: doYouWantToEdit.current.value,
      });

      navigate(`/albums`);
    } catch (e) {
      setFault(e.message);
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs={12} md={6} lg={4}>
        <h2>New album name</h2>
        {fault && <Alert variant="warning">{fault}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter name"
              ref={doYouWantToEdit}
              defaultValue={album && album.title}
              required
            />
          </Form.Group>

          <Button className="btn btn-dark btn-lg" type="submit">
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default EditAlbum;
