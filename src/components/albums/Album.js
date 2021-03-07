import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import useAlbum from "../../hooks/useAlbum";
import { Link } from "react-router-dom";
import UploadYourAlbumImage from "./UploadYourAlbumImage";
import useClipboard from "react-use-clipboard";
import { db } from "../../firebase";
import firebase from "../../firebase/index";
import { useAuth } from "../../contexts/AuthContext";
import AlbumsImages from "./AlbumsImages";
import ImageLightBox from "../ImageBox/ImageShow";

const Album = () => {
  const { currentUser } = useAuth();
  const { albumId } = useParams();
  const { album, images, loading } = useAlbum(albumId);
  const [newLink, setNewLink] = useState(null);
  const [copied, setCopied] = useClipboard(newLink);
  const [chooseImages, setChooseImage] = useState([]);
  const [error, setError] = useState(false);
  const [modifyCaption, setModifyCaption] = useState(false);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [chooseImg, setChooseImg] = useState(null);

  const chooseNewLink = album => {
    let baseUrl = window.location.origin;
    let url = `${baseUrl}/Reviewalbum/${album}`;
    setNewLink(url);
  };

  const bringName = e => {
    setTitle(e.target.value);
  };

  const bringNewAlbum = async e => {
    e.preventDefault();

    try {
      const docRef = await db.collection("albums").add({
        title,
        owner: currentUser.uid
      });

      await chooseImages.forEach(image => {
        db.collection("images")
          .doc(image)
          .update({
            album: firebase.firestore.FieldValue.arrayUnion(
              db.collection("albums").doc(docRef.id)
            )
          });
      });
      navigate(`/albums`);
    } catch (error) {
      setError(error.message);
    }
  };

  const chooseOurImage = async e => {
    let upToDateImage = [];
    if (e.target.checked === true) {
      if (chooseImages.includes(e.target.id)) {
        return;
      }
      upToDateImage.push(e.target.id);
      setChooseImage(chooseImages.concat(upToDateImage));
    }
  };

  return (
    <>
      <h2 className="mb-3">{album && album.title}</h2>

      <Button className="btn btn-dark btn-lg mt-2 ">
        <Link
          className="text-light text-decoration-none"
          to={`/albums/edit/${albumId}`}
        >
          Edit Album
        </Link>
      </Button>

      <Button
        className="btn btn-dark btn-lg ml-3 mt-2 "
        onClick={() => {
          chooseNewLink(albumId);
        }}
      >
        Create client review
      </Button>

      <Button
        className="btn btn-dark btn-lg ml-3 mt-2"
        onClick={() => {
          setModifyCaption(!modifyCaption);
        }}
      >
        {modifyCaption ? "Close" : "Create album"}
      </Button>

      {modifyCaption && (
        <div className="d-flex justify-content-center ">
          <Form onSubmit={bringNewAlbum} className="w-50 p-3 text-center">
            <Form.Group id="title">
              <Form.Label>New Album Title</Form.Label>
              <Form.Control
                type="title"
                onChange={bringName}
                value={title}
                required
              />
              {error && <p>{error}</p>}
              {title && title.length < 4 && (
                <Form.Text className="text-dark">
                  Please enter a title at least 4 characters long.
                </Form.Text>
              )}
            </Form.Group>

            <Button
              className="btn btn-dark btn-lg text-decoration-none"
              disabled={loading}
              type="submit"
            >
              Create New Album
            </Button>
          </Form>
        </div>
      )}

      {newLink && (
        <p className="mt-3 text-muted font-weight-light">
          {newLink}
          <Button className="btn btn-dark btn-sm ml-3" onClick={setCopied}>
            {copied ? "Copied " : "Copy Link "}
          </Button>
        </p>
      )}
      <UploadYourAlbumImage albumId={albumId} />
      <AlbumsImages
        images={images}
        chooseOurImage={chooseOurImage}
        setChooseImg={setChooseImg}
      />
      {chooseImg && (
        <ImageLightBox chooseImg={chooseImg} setChooseImg={setChooseImg} />
      )}
    </>
  );
};

export default Album;
