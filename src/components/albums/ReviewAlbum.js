import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import firebase from "firebase/app";
import { db } from "../../firebase";
import AlbumsImages from "./AlbumsImages";
import useImages from "../../hooks/useImages";
import useAlbum from "../../hooks/useAlbum";
import ImageLightBox from "../ImageBox/ImageShow";
 
const ReviewAlbum = () => {
 const { albumId } = useParams();
 const { images } = useImages(albumId);
 const [fault, setFault] = useState(false);
 const [disabled, setDisabled] = useState(false);
 const [someLikes, setsomeLikes] = useState([]);
 const [lookOverImage, setlookOverImage] = useState([]);
 const [chooseImg, setchooseImg] = useState(null);
 const { album, loading } = useAlbum(albumId);
 
 const navigate = useNavigate();
 
 useEffect(() => {
        async function getImages() {
          const cardList = await Promise.all(
            images.map((image) => {
              return {
              id: image.id,
              like: undefined,
            };
          })
        );
        setlookOverImage(cardList);
    }
    getImages();
    }, [images]);
    
    useEffect(() => {
      let likedArray = lookOverImage.filter((image) => {
      return image.like === true;
    });
    setsomeLikes(likedArray);
    
    let effectOfYourResult = lookOverImage.every((image) => image.like !== undefined);
    if (effectOfYourResult === false) {
      setDisabled(true);
      return;
    } else if (effectOfYourResult === true) {
      setDisabled(false);
    }
  }, [lookOverImage]);
    
    const handleReview = async () => {
      const title = `${album.title} is reviewed`;
    
      setFault(false);
    
      try {
        const docRef = await db.collection("albums").add({
          title,
          owner: album.owner,
        });
        await someLikes.forEach((image) => {
          db.collection("images")
            .doc(image.id)
            .update({
              album: firebase.firestore.FieldValue.arrayUnion(
                db.collection("albums").doc(docRef.id)
              ),
            });
        });
        navigate(`/thanks`);
      } catch (fault) {
        setFault(fault.message);
      }
    };
    
    const dealWithSomeReview = (id, liked) => {
      let Line = document.getElementById(id);
      if (liked === true) {
        Line.getElementsByClassName("like")[0].classList.add("like-active");
        Line.getElementsByClassName("dislike")[0].classList.remove(
          "dislike-active"
        );
      } else if (liked === false) {
        Line.getElementsByClassName("dislike")[0].classList.add("dislike-active");
        Line.getElementsByClassName("like")[0].classList.remove("like-active");
      }
    };
    
    const handleLikes = (image, liked) => {
      let changeArray = lookOverImage.map((img) => {
        if (img.id === image.id) {
          return {
            id: img.id,
            like: liked,
          };
        } else {
        return img;
        }
      });
      setlookOverImage(changeArray);
      dealWithSomeReview(image.id, liked);
    };
    
    if (loading) {
    return <p className="text-center">Loading...</p>;
    }
    
    return (
      <>
        <h4 className="mb-5">Album name: {album && album.title}</h4>
    
        <AlbumsImages
          images={images}
          handleLikes={handleLikes}
          key={images.id}
          setchooseImg={setchooseImg}
        />
        {chooseImg && (
          <ImageLightBox chooseImg={chooseImg} setchooseImg={setchooseImg} />
        )}
    
        <h2 className="text-center mb-2">
          {someLikes.length} / {images.length}
        </h2>
    
      <div className="d-flex justify-content-center mb-5">
        <button
          id="buttons-allaround"
          disabled={disabled}
          className="btn btn-dark"
          onClick={handleReview}
        >
          Send your review
        </button>
    </div>
    
    {fault && <p>{fault}</p>}
  </>
  );
};
  
export default ReviewAlbum;