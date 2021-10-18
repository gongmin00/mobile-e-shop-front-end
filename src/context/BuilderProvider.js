import React, { createContext, useReducer } from "react";
import { CHANGE_INPUT } from "./actionType";
import { builderReducer } from "./globalReducer";
import firebase from "gatsby-plugin-firebase";
import "firebase/storage";

const initResumeContent = {
  data: {
    profile: {
      heading: "Profile",
      photo: "",
      firstName: "",
      lastName: "",
      subtitle: "",
      address: {
        line1: "",
        line2: "",
        line3: "",
      },
      phone: "",
      website: "",
      email: "",
    },
    objective: {
      heading: "Objective",
      body: "",
    },
    work: {
      heading: "Work Experience",
      items: [],
    },
    education: {
      heading: "Education",
      items: [],
    },
    awards: {
      heading: "Honors & Awards",
      items: [],
    },
    certifications: {
      heading: "Certifications",
      items: [],
    },
    skills: {
      heading: "Skills & Hobbies",
      items: [],
    },
    extras: {
      heading: "Personal Information",
      items: [],
    },
  },
  themes: {
    font: {
      family: "",
    },
    colors: {
      background: "",
      accent: "",
      body: "",
    },
  },
};

export const BuilderContext = createContext();

const BuilderProvider = (props) => {
  const [resumeContentState, dispatch] = useReducer(
    builderReducer,
    initResumeContent
  );
  const inputChangeHandler = (key, value) => {
    dispatch({
      type: CHANGE_INPUT,
      payload: {
        key,
        value,
      },
    });
  };
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
