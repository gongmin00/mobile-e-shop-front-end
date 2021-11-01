import React, { createContext, useReducer } from "react";
import { CHANGE_INPUT } from "./actionType";
import { builderReducer } from "./globalReducer";
import firebase from "gatsby-plugin-firebase";
import {initResumeContent} from "./globalReducer"



export const BuilderContext = createContext();

const BuilderProvider = (props) => {
  const [resumeContentState, dispatch] = useReducer(
    builderReducer,
    initResumeContent
  );
  //sent resume input to react context 
  const inputChangeHandler = (key, value) => {
    dispatch({
      type: CHANGE_INPUT,
      payload: {
        key,
        value,
      },
    });
  };

  //upload resume profile image to google firebase storage
  const imageUploadHandler = (uploadImage, key) => {
    
    const uploadTask = firebase
      .storage()
      .ref(`profile-images/${uploadImage.name}`)
      .put(uploadImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => console.log("image upload error:", error),
      () => {
        firebase
          .storage()
          .ref("profile-images")
          .child(uploadImage.name)
          .getDownloadURL()
          .then(value =>
            dispatch({ type: CHANGE_INPUT, payload: { key, value } })
          );
      }
    );
    // console.log("here is upload image hahah:", resumeContentState.data.profile.photo);
  };
  return (
    <BuilderContext.Provider
      value={{ inputChangeHandler, imageUploadHandler, resumeContentState }}
    >
      {props.children}
    </BuilderContext.Provider>
  );
};

export default BuilderProvider;
