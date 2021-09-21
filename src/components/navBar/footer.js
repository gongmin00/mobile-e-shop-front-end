import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./navStyle.css";
import logo from "../../images/logo.png";
const Footer = () => {
  return (
    <div className="footer-container">
      <Container>
        <Row>
          <Col>
            <img className="nav-logo" src={logo} alt="logo" />
          </Col>
          <Col>nav menu</Col>
        </Row>
    
      </Container>
      <div className="footer-copyRight">Copy Right@Min Gong</div>
    </div>
  );
};

export default Footer;
