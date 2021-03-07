import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

const AlbumsImages = ({
  images,
  chooseOurImage,
  handleLikes,
  setChooseImg
}) => {

  const { currentUser } = useAuth();

  return (
    <>
      <Row className="mb-3 w-100 my-6 ">
        {images &&
          images.map(image => (
            <Col sm={6} md={3} lg={3}>
              <Card key={image.id} className="mb-4 border-0">
                <Card.Img
                  style={{ width: "auto", height: "auto" }}
                  variant="top"
                  src={image.url}
                  onClick={() => setChooseImg(image.url)}
                />

                {currentUser ? (
                  <div>
                    <input
                      type="checkbox"
                      id={image.id}
                      className="mr-3"
                      onChange={chooseOurImage}
                    />
                    <label htmlFor="selected-photo">Select</label>
                  </div>
                ) : (
                  <>
                    <Row
                      id={image.id}
                      className="d-flex justify-content-between ml-4 mr-4 mt-3 mb-3 auto"
                    >
                      <button
                        className="like"
                        onClick={() => handleLikes(image, true)}
                      >
                        Like
                      </button>

                      <button
                        className="dislike"
                        onClick={() => handleLikes(image, false)}
                      >
                        Dislike
                      </button>
                    </Row>
                  </>
                )}
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default AlbumsImages;
