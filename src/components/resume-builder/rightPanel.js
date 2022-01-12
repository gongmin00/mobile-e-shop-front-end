import React from "react";
import CornflowerBlue from "./templates/cornflowerBlue";
import resumeTemplate1 from "../../images/resume-template/Resume_Template_1.png";
import { Container, Row, Col } from "react-bootstrap";
const RightPanel = () => {
  return (
    <div className="right-panel-container">
      <Container>
        <Row>
          <Col sm="12" md="6">
            <img src={resumeTemplate1} alt="resume template 1"/>
          </Col>
          <Col sm="12" md="6">
          <img src={resumeTemplate1} alt="resume template 1"/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RightPanel;
