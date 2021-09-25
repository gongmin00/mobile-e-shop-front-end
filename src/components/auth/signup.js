import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Form, Button, Alert } from "react-bootstrap";
import "./authStyle.css";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import firebase from "gatsby-plugin-firebase";
import { navigate } from "gatsby";

//login
const Register = () => {
  const {authInfo, signUpHandler} = useContext(GlobalContext);
  const [showPassWord, setShowPassword] = useState({
    type1: "password",
    type2: "password",
  });
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    username:"",
    confirmPassword: "",
    errorMsg: null,
    successMsg: null,
    userAuthInfo: null,
  });

  const changeHandler = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };
  //use [] because target.name is uncertain and may be more than one
  const submitHandler = async (event) => {
    event.preventDefault();
    if (userData.password === userData.confirmPassword){
      // try {
      //   let result = await firebase
      //     .auth()
      //     .createUserWithEmailAndPassword(userData.email, userData.password);
      //   getAuthInfo(result);
      //   navigate("/auth/dashboard");
      // } catch (error) {
      //   console.log("submit error",error)
      //   setUserData({
      //     ...userData,
      //     errorMsg: error.message,
      //   });
      // }
      try {
        await signUpHandler(userData.email, userData.password,userData.username)
        navigate("/auth/dashboard");
      }catch(error){
        setUserData({
          ...userData,
          errorMsg:error.message
        })
      }
      
  
    } else {
      setUserData({
        ...userData,
        errorMsg:"the password didn't match"
      })
    }
    
  };

  let eyeIcon = (
    <FontAwesomeIcon
      className="eye-icon"
      onClick={(event) => {
        event.preventDefault();
        setShowPassword({
          ...showPassWord,
          type1: showPassWord.type1 === "text" ? "password" : "text",
        });
      }}
      icon={showPassWord.type1 === "text" ? faEyeSlash : faEye}
    />
  );

  let eyeIcon2 = (
    <FontAwesomeIcon
      className="eye-icon"
      onClick={(event) => {
        event.preventDefault();
        setShowPassword({
          ...showPassWord,
          type2: showPassWord.type2 === "text" ? "password" : "text",
        });
      }}
      icon={showPassWord.type2 === "text" ? faEyeSlash : faEye}
    />
  );
console.log("authInfo.user",authInfo.user)
  return (
    <div className="regForm-container">
 {/* {authInfo.user&&JSON.stringify(authInfo.user.email)} */}
      <Form className="regForm">
      <div className="register-errorMsg">
         {userData.errorMsg ?  <Alert variant="danger">{userData.errorMsg}</Alert> : null}
        </div>
        <h3 className="sub-title">Create an account for your smart resume</h3>
        <Form.Group className="username-container" controlId="formGroupUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            onChange={changeHandler}
            type="text"
            placeholder="Enter User Name"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="email-container" controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            onChange={changeHandler}
            type="email"
            placeholder="Enter Email"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            onChange={changeHandler}
            type={showPassWord.type1}
            placeholder="Enter Password"
          ></Form.Control>
          {eyeIcon}
        </Form.Group>
        <Form.Group controlId="formGroupConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="confirmPassword"
            onChange={changeHandler}
            type={showPassWord.type2}
            placeholder="Confirm Password"
          ></Form.Control>
          {eyeIcon2}
          <div className="auth-function-container">
            <div>Have account already? <Link to="/auth/login" className="auth-function">Login</Link></div>
          </div>
        </Form.Group>
        <Button className="auth-submit-btn"  onClick={submitHandler} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
