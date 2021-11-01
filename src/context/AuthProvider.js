import React, { useEffect, useState, createContext } from "react";
import firebase from "gatsby-plugin-firebase";
import "firebase/storage";
import "firebase/firestore";
export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [authInfo, setAuthInfo] = useState({
    errorMsg: "",
    email: "",
    user: null,
    photo: "",
    loading: false,
  });

  const user = firebase.auth().currentUser;
  //sign up with email, password and username
  const signUpHandler = (email, password, username) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({
          displayName: username,
        });
        firebase.storage().ref(`${result.user.email}/profile-image/`).put();
        // console.log("result",result)
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
  const updateEmail = (email) => {
    return user.updateEmail(email);
  };
  const updatePassword = (password) => {
    return user.updatePassword(password);
  };
  const updateUsername = (username) => {
    return user.updateProfile({
      displayName: username,
    });
  };
  const updateProfileImage = (uploadImage) => {
    if (authInfo.user.email) {
      const uploadTask = firebase
        .storage()
        .ref(`${authInfo.user.email}/profile-image/${uploadImage.name}`)
        .put(uploadImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        //get task progress
        (error) => console.log("user profile image upload error:", error),
        () => {
          firebase
            .storage()
            .ref(`${authInfo.user.email}`)
            .child(uploadImage.name)
            .getDownloadURL()
            .then((photoUrl) => {
              setAuthInfo({
                ...authInfo,
                photo: photoUrl,
              });
              //update profile photo with local context data
              user.updateProfile({
                photoURL:photoUrl
              })
              //update profile photo to firebase auth
            });
        }
      );
    }
  };
  //get current user by re-render page in useEffect and because authProvider component at top tree, it can be reach everywhere
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setAuthInfo({
        ...authInfo,
        user: user,
        photo:user.photoURL,
        loading: true,
      });
      //request profile photo from firebase auth
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
        updateProfileImage,
      }}
    >
      {authInfo.loading && props.children}
    </AuthContext.Provider>
  );
};
//这里面提供状态
export default AuthProvider;
