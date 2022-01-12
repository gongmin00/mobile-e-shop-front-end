import React, { useContext } from "react";
import { Router } from "@reach/router";

import "./pageStyle.css";
import Dashboard from "../components/resume-builder/dashboard";
import Editor from "../components/resume-builder/editor";
const Builder = () => {
  return (
    <Router>
      <Dashboard path="/builder/dashboard"/>
      <Editor path="/builder/edit" />
    </Router>
  );
};
export default Builder;