import React, { useEffect, useState, createContext } from "react";
import firebase from "gatsby-plugin-firebase"; 
import "firebase/storage";
export const AuthContext = createContext()


const AuthProvider = (props) => {
  const [authInfo, setAuthInfo] = useState({
    errorMsg: "",
    email: "",
    user: null,
    loading: false,
  });
  // const [State, dispatch] = useReducer(globalReducer, initState);
  const user = firebase.auth().currentUser;
  //sign up with email, password and username
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
      // firebase.storage().ref(`${user.email}`)
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
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
    </AuthContext.Provider>
  );
};
//这里面提供状态
export default AuthProvider;
