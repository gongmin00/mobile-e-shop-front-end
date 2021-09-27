import React, { useEffect, useReducer, useState } from "react";
import globalReducer from "./globalReducer";
import { GET_USER_AUTH } from "./type";
import { GlobalContext } from "./GlobalContext";
import firebase from "gatsby-plugin-firebase";
const GlobalProvider = (props) => {
  const [authInfo, setAuthInfo] = useState({
    errorMsg: "",
    email: "",
    user: null,
    loading: false,
  });
  // const [State, dispatch] = useReducer(globalReducer, initState);
  const user = firebase.auth().currentUser;
  const signUpHandler = (email, password, username) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        
        user.updateProfile({
          displayName: username,
        });
      });
  };
  const loginHandler = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };
  const signOutHandler = () => {
    return firebase.auth().signOut();
  };
  const resetPasswordHandler = (email) => {
    return firebase.auth().sendPasswordResetEmail(email);
  };
  const updateEmail=(email)=>{
    return user.updateEmail(email)
  }
  const updatePassword = (password) =>{
    return user.updatePassword(password)
  }
  const updateUsername = (username)=>{
    return user.updateProfile({
      displayName:username
    })
  }
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setAuthInfo({
        ...authInfo,
        user: user,
        loading: true,
      });
    });

    return unsubscribe;
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        signUpHandler,
        loginHandler,
        signOutHandler,
        resetPasswordHandler,
        updateEmail,
        updatePassword,
        updateUsername,
        authInfo,
      }}
    >
      {authInfo.loading && props.children}
    </GlobalContext.Provider>
  );
};
//这里面提供状态
export default GlobalProvider;
