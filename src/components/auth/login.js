import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Form, Button, Alert } from "react-bootstrap";
import "./authStyle.css";
import {Link} from "@reach/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { navigate } from "gatsby";


const Login = () => {
  const { loginHandler, authInfo } = useContext(AuthContext);
  const [showPassWord, setShowPassword] = useState({
    type1: "password",
  });

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    errorMsg: null,
    successMsg: null,
  });
  const changeHandler = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };
  //use [] because target.name is uncertain and may be more than one

  // const test =  ()=>{
  //   firebase.auth().onAuthStateChanged( user=>{
  //     if (user){
  //       console.log("success",user)
  //     }
  //   })
  // }
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await loginHandler(userData.email, userData.password);
      navigate("/auth/dashboard");
      // test()
    } catch (error) {
      setUserData({
        ...userData,
        errorMsg: error,
      });
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
  console.log("authInfo", authInfo.user);
  return (
    <div className="regForm-container">
      {/* {authInfo.user && JSON.stringify(authInfo.user.email)} */}
      <Form className="regForm">
        {userData.errorMsg ? (
          <Alert variant="danger">{userData.errorMsg} </Alert>
        ) : null}
        <h3 className="sub-title">Login to your account  </h3>
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
          <div className="auth-function-container">
            <Link to="/auth/reset-password" className="auth-function">Forgot Password?</Link>
            <Link to="/auth/signup" className="auth-function">SignUp</Link>
          </div>
        </Form.Group>
        <Button className="auth-submit-btn" onClick={submitHandler} type="submit">
          Submit
        </Button>
       
      </Form>
    </div>
  );
};

export default Login;
