import React, { useState, useEffect, useCallback } from "react";
import Alert from "react-bootstrap/Alert";
import ProgressBar from "react-bootstrap/esm/ProgressBar";
import { useDropzone } from "react-dropzone";
import useUploadImage from "../hooks/useUploadImage";
import { useParams } from "react-router";

const UploadImageDropzone = () => {
  const { albumId } = useParams();
  const [uploadSomeFile, setUploadSomefile] = useState(null);
  const [posting, setPosting] = useState(null);
  const { uploadProgress, error, isSuccess } = useUploadImage(uploadSomeFile);

  useEffect(() => {
 
    if (error) {
      setPosting({
        error: true,
        text: error
      });
    } else if (isSuccess) {
      setPosting({
        success: true,
        text: "Image successfully uploaded!"
      });
      setUploadSomefile(null);
    } else {
      setPosting(null);
    }
  }, [error, isSuccess]);
 
  const onDrop = useCallback(acceptedFiles => {
    setPosting(null);
  

    if (acceptedFiles.length === 0) {
      return;
    }


    setUploadSomefile(acceptedFiles);
  }, []);

  console.log('im working')

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: "image/gif, image/jpeg, image/png",
    onDrop
  });

  return (
    <div
      {...getRootProps()}
      id="upload-image-dropzone-wrapper"
      className={`text-center px-4 py-3 my-3 ${
        isDragAccept ? `drag-accept` : ``
      } ${isDragReject ? `drag-reject` : ``}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        isDragAccept ? (
          <p>Please drop it! </p>
        ) : (
          <p> Choose another file </p>
        )
      ) : (
        <p> Drop your files </p>
      )}
      {acceptedFiles && (
        <div className="accepted-files mt-2">
          <ul className="list-unstyled">
            {acceptedFiles.map(file => (
              <li key={file.name}>
                <small>
               {file.name} ({Math.round(file.size / 1024)} kb)
                </small>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Status */}
      {uploadProgress !== null && (
        <ProgressBar variant="success" animated now={uploadProgress} />
      )}

      {posting && (
        <Alert variant={posting.error ? "warning" : "success"}>
          {posting.text}
        </Alert>
      )}
    </div>
  );
};

export default UploadImageDropzone;
