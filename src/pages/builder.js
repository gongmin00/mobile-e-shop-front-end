import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Router } from "@reach/router";
import { Container, Row, Col } from "react-bootstrap";
import LeftPanel from "../components/resume-builder/leftPanel";
import CenterPanel from "../components/resume-builder/centerPanel";
import RightPanel from "../components/resume-builder/rightPanel";
import "./pageStyle.css";
import ResumeDashboard from "../components/resume-builder/centerDashboard";
const Builder = () => {
  return (
    <div className="builder-container">

      <Container className="builder-inner-container">
        <Row>
          <Col sm="12" md="3">
            <LeftPanel />
          </Col>
          <Col sm="12" md="6">
            <CenterPanel />
          </Col>
          <Col sm="12" md="3">
            <RightPanel />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Builder;
