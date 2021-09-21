import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {Link} from "gatsby"
import "./navStyle.css"
import logo from "../../images/logo.png"
import Dropdown from "./dropdown"

const NavBar = () => {
  return (
    <div className="nav-container">
    <Container >
      <Row >
        <Col className="logo-container" xs="5" sm="5" md="3" lg="3"><img className="nav-logo" src={logo} alt="logo"/></Col>
        <Col xs="7" sm="7" md="9" lg="9" className="nav-list-container">
          <ul className="nav-list">
            <li className="nav-list-item"><Link to="/builder">Create Free Resume</Link></li>
            <li className="nav-list-item"><Link to="/expert">Find an Expert</Link></li>
            <li className="nav-list-item"><Link to="/auth/login"><Button className="nav-login-btn" variant="outline-primary">Login</Button></Link></li>
          </ul>
          <div className="dropdown-menu-container">
          <Dropdown />
          </div>
          

        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default NavBar;
