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
    loading:false
  });
  // const [State, dispatch] = useReducer(globalReducer, initState);
  const signUpHandler = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };
  const loginHandler = (email, password)=>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }
  const signOutHandler = ()=>{
    return firebase.auth().signOut()
  }
  const resetPasswordHandler = (email)=>{
    return firebase.auth().sendPasswordResetEmail(email)
  }
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setAuthInfo({
        ...authInfo,
        user: user,
        loading:true
      });
    });
    
    return unsubscribe
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        signUpHandler,
        loginHandler,
        signOutHandler,
        resetPasswordHandler,
        authInfo,
      }}
    >
      {authInfo.loading&&props.children}
    </GlobalContext.Provider>
  );
};
//这里面提供状态
export default GlobalProvider;
