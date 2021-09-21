import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Form, Button, Alert } from "react-bootstrap";
import "./authStyle.css";
import {Link} from "@reach/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { navigate } from "gatsby";

//forgot password
//sign up

const Login = () => {
  const { loginHandler, authInfo } = useContext(GlobalContext);
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
      {authInfo.user && JSON.stringify(authInfo.user.email)}
      <Form className="regForm">
        {userData.errorMsg ? (
          <Alert variant="danger">{userData.errorMsg} </Alert>
        ) : null}
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
            <Link to="/auth/reset-passpord" className="auth-function">Forgot Password?</Link>
            <div className="auth-function">SignUp</div>
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
