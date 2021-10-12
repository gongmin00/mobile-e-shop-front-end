import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Container, Row, Col } from "react-bootstrap";
import ControlPanel from "../components/resume-builder/controlPanel";
import MainDisplay from "../components/resume-builder/mainDisplay";
import Greeny from "../components/template/greeny";
import "./pageStyle.css";

const Builder = () => {

  return (
    <div className="builder-container">
      <Container className="builder-inner-container">
        <Row>
          <Col sm="12" md="3">
            <ControlPanel />
          </Col>
          <Col sm="12" md="6">
            <MainDisplay />
          </Col>
          <Col sm="12" md="3">
            <Greeny />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Builder;
