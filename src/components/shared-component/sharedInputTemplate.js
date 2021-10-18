import React, { useContext } from "react";
import { Form, Button, Alert } from "react-bootstrap";
// import { BuilderContext } from "../../context/BuilderProvider";

export const SharedInputTemplate = ({ onInputChange, labelName }) => {
  return (
    <div className="builder-input-container">
      <label for={labelName}>{labelName}</label>
      <input
        onChange={(e) => onInputChange(e.target.value)}
        id={`builder-input-${labelName}`}
      />
    </div>
  );
};

export const ProfileImageUpload = ({
  imageUploadHandler,
  uploadImage,
  onChangeHandler,
}) => {
 
    return (
      <Form.Group>
        <Form.Label>Upload Profile Image</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => onChangeHandler(e.target.files[0])}
        ></Form.Control>
        
        <Button onClick={() => imageUploadHandler(uploadImage, "data.profile.photo")}>Upload</Button>
      </Form.Group>
    );
  

};
