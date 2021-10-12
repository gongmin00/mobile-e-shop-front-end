import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router } from "@reach/router";
import PrivateRoute from "../components/auth/PrivateRoute";
import Login from "../components/auth/login";
import Signup from "../components/auth/signup";
import Dashboard from "../components/auth/dashboard";
import ResetPassword from "../components/auth/resetPassword";
const Auth = () => {
 
  return (
    <Router>
      <PrivateRoute path="/auth/dashboard" component={Dashboard} />
      <Login path="/auth/login" />
      <Signup path="/auth/signup" />
      <ResetPassword path="/auth/reset-password"/>
    </Router>
  );
};

export default Auth;
