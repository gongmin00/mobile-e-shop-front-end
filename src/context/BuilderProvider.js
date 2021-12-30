import React, { createContext, useContext, useReducer } from "react";
import { CHANGE_INPUT, GET_ALL_RESUME_DATA, GET_RESUME_ID } from "./actionType";
import firebase from "gatsby-plugin-firebase";
import "firebase/database";
import {
  builderReducer,
  builderContent,
  firebaseResumeInitData,
  previewReducer,
} from "./globalReducer";
import { AuthContext } from "./AuthProvider";
import ShortUniqueId from "short-unique-id";
import resumeInitData from "../data/resumeInitData.json";
export const BuilderContext = createContext();
const database = firebase.database();
const BuilderProvider = (props) => {
  // const [resumeContentState, dispatch] = useReducer(
  //   builderReducer,
  //   initResumeContent
  // );
  // const [resumeData, dispatch] = useReducer(builderReducer, builderContent);
  const [resumeData, dispatch] = useReducer(builderReducer, builderContent)
  const { authInfo } = useContext(AuthContext);
  const randomResumeId = new ShortUniqueId({ length: 10 });

  //sent resume input to react context
  // const inputChangeHandler = (key, value) => {
  //   dispatch({
  //     type: CHANGE_INPUT,
  //     payload: {
  //       key,
  //       value,
  //     },
  //   });
  // };

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
          .then((value) =>
            dispatch({ type: CHANGE_INPUT, payload: { key, value } })
          );
      }
    );
    // console.log("here is upload image hahah:", resumeContentState.data.profile.photo);
  };
  const createNewResume = () => {
    const resumeId = randomResumeId();
    resumeInitData.resumeId=resumeId
    firebase
      .database()
      .ref(`users/${authInfo.user.uid}/resumes/${resumeId}`)
      .set(resumeInitData);
  };

  const getResumeID = () => {
    const resumeIdArray =[]
    const resumeArray =[]
    firebase
      .database()
      .ref(`users/${authInfo.user.uid}/resumes/`)
      .once("value")
      .then(
        (dataSnapshot)=>{
          const data = dataSnapshot.val()
          if(data){
            Object.keys(data).forEach(key=>{
              resumeIdArray.push(key)
              resumeArray.push(data[key]) 
            })
            
          }
          // dispatch({
          //   type: GET_RESUME_ID,
          //   payload: resumeIdArray
          // })
          dispatch({
            type:GET_ALL_RESUME_DATA,
            payload:resumeArray
          })
        }       
      );
  };
  // const userResumeSnapshot = () => {
  //   const resumeArray = [];
  //   firebase
  //     .database()
  //     .ref(`users/${authInfo.user.uid}/resumes/`)
  //     .once("value")
  //     .then(
  //       (dataSnapshot) => {
  //         const data = dataSnapshot.val();
  //         //data here is in object format
  //         if (data) {
  //           Object.keys(data).forEach((key) => {
  //             const dataObject = {};
  //             dataObject[key] = data[key];
  //             resumeArray.push(dataObject);
  //           });
  //         }
  //         dispatch({
  //           type: GET_ALL_RESUME_DATA,
  //           payload: resumeArray,
  //         });
  //       }
  //       // dispatch({
  //       //   type:GET_ALL_RESUME_DATA,
  //       //   payload:dataSnapshot.val()
  //       // })
  //     );
  // };
  //get all firebase real-time database resume record
  //if no resume link to create, if yes, map all resume
  return (
    <BuilderContext.Provider
      value={{
        // inputChangeHandler,
        imageUploadHandler,
        // resumeContentState,
        // resumeData,
        createNewResume,
        // userResumeSnapshot,
        getResumeID,
        resumeData
      }}
    >
      {props.children}
    </BuilderContext.Provider>
  );
};

export default BuilderProvider;
