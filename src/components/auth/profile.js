import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import "./authStyle.css";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import firebase from "gatsby-plugin-firebase";
import { navigate } from "gatsby";

const Profile = () => {
  const { authInfo, signUpHandler } = useContext(GlobalContext);
  const [showPassWord, setShowPassword] = useState({
    type1: "password",
    type2: "password",
  });
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    username: "",
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
    if (userData.password === userData.confirmPassword) {
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
        await signUpHandler(
          userData.email,
          userData.password,
          userData.username
        );
        navigate("/auth/dashboard");
      } catch (error) {
        setUserData({
          ...userData,
          errorMsg: error.message,
        });
      }
    } else {
      setUserData({
        ...userData,
        errorMsg: "the password didn't match",
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
  console.log("authInfo.user", authInfo.user);
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
                  onClick={submitHandler}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Container>

        <div className="register-errorMsg">
          {userData.errorMsg ? (
            <Alert variant="danger">{userData.errorMsg}</Alert>
          ) : null}
        </div>
      </Form>
    </div>
  );
};
export default Profile;
