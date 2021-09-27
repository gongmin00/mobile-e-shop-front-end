import React, { useState, useContext, useRef } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import "./authStyle.css";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import firebase from "gatsby-plugin-firebase";
import { navigate } from "gatsby";

const Profile = () => {
  const { authInfo, updateEmail, updatePassword, updateUsername } =
    useContext(GlobalContext);
  const [showPassWord, setShowPassword] = useState({
    type1: "password",
    type2: "password",
  });
  const [userData, setUserData] = useState({
    // email: "",
    // password: "",
    // username: "",
    // confirmPassword: "",
    errorMsg: null,
    successMsg: null,
    userAuthInfo: null,
  });
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const usernameRef = useRef();
  const changeHandler = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };
  //use [] because target.name is uncertain and may be more than one

  const editSubmitHandler = async (event) => {
    event.preventDefault();
    const promise = [];
    if (
      emailRef.current.value) {
        emailRef.current.value !== authInfo.user.email?
          promise.push(updateEmail(emailRef.current.value)):
          setUserData({
            ...userData,
            errorMsg: "this email has been used, please enter new email address",
          })
    }

    if (passwordRef.current.value && confirmPasswordRef.current.value) {
      passwordRef.current.value === confirmPasswordRef.current.value
        ? promise.push(updatePassword(passwordRef.current.value))
        : setUserData({
            ...userData,
            errorMsg: "the password didn't match",
          });
    }
    if (usernameRef.current.value) {
      usernameRef.current.value!==authInfo.user.displayName?
      promise.push(updateUsername(usernameRef.current.value)):
      setUserData({
        ...userData,
        errorMsg: "this username has been used, please enter different username",
      });
    }
  
    if(promise.length!==0){
      Promise.all(promise)
      .then((result) => {
        setUserData({
          ...userData,
          successMsg: "successfully edited profile",
        });
      })
      .catch((error) =>
        setUserData({
          ...userData,
          errorMsg: error.message,
        })
      )
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

  return (
    <div className="regForm-container">
      {/* {authInfo.user&&JSON.stringify(authInfo.user.email)} */}
      <Form className="profile-form">
        <Container>
          <h3 className="sub-title">Account Settings</h3>
          <Row>
            <Col className="profile-container" sm="12" md="6">
              <Form.Group
                className="username-container profile-item"
                controlId="formGroupUsername"
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  onChange={changeHandler}
                  type="text"
                  ref={usernameRef}
                  placeholder={authInfo.user.displayName}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col className="profile-container" sm="12" md="6">
              <Form.Group
                className="email-container profile-item"
                controlId="formGroupEmail"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  onChange={changeHandler}
                  type="email"
                  ref={emailRef}
                  placeholder={authInfo.user.email}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="profile-container" sm="12" md="6">
              <Form.Group
                className="profile-item"
                controlId="formGroupPassword"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  onChange={changeHandler}
                  type={showPassWord.type1}
                  ref={passwordRef}
                  placeholder="Enter New Password"
                ></Form.Control>
                {eyeIcon}
              </Form.Group>
            </Col>
            <Col className="profile-container" sm="12" md="6">
              <Form.Group
                className="profile-item"
                controlId="formGroupConfirmPassword"
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  onChange={changeHandler}
                  type={showPassWord.type2}
                  ref={confirmPasswordRef}
                  placeholder="Confirm New Password"
                ></Form.Control>
                {eyeIcon2}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">
              <div className="profile-btn-container1">
                <Button
                  className="auth-submit-btn profile-submit-btn"
                  onClick={editSubmitHandler}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Container>

        <div className="profile-errorMsg">
          {userData.errorMsg ? (
            <Alert variant="danger">{userData.errorMsg}</Alert>
          ) : null}
        </div>
        <div className="profile-successMsg">
          {userData.successMsg ? (
            <Alert variant="success">{userData.successMsg}</Alert>
          ) : null}
        </div>
      </Form>
    </div>
  );
};
export default Profile;
