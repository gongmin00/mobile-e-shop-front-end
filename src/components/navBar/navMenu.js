import React, { useContext, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "gatsby";
import "./navStyle.css";
import logo from "../../images/logo.png";
import Dropdown from "./dropdown";
import { GlobalContext } from "../../context/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faChevronDown } from "@fortawesome/free-solid-svg-icons";
const NavBar = () => {
  const { authInfo, signOutHandler } = useContext(GlobalContext);
  const [clickDropdown, setDropdown] = useState(false);
  const dropdownHandler = () => {
    setDropdown(!clickDropdown);
  };
  let userNav;
  if (clickDropdown) {
    userNav = (
      <div className="user-dropdown-container"> 
        <div onClick={dropdownHandler} className="user-dropdown-menu1">
          {authInfo.user?authInfo.user.displayName:null}
          <FontAwesomeIcon icon={faChevronDown} />
          <i class="fas fa-chevron-down"></i>
        </div>
        <div className="user-dropdown-menu2">
          <ul className="user-nav-list">
            <li className="nav-list-item">
              <Link to="/auth/dashboard">Account</Link>
            </li>
            <li className="nav-list-item" onClick={signOutHandler}>
              <div>Sign out</div>
            </li>
          </ul>
        </div>
        <div className="wide-click-div" onClick={dropdownHandler}></div>
      </div>
    );
  } else {
    userNav = (
      <div onClick={dropdownHandler} className="user-dropdown-menu1">
        {authInfo.user?authInfo.user.displayName:null}
        <FontAwesomeIcon icon={faChevronDown} />
        <i class="fas fa-chevron-down"></i>
      </div>
    );
  }

  return (
    <div className="nav-container">
      <Container>
        <Row>
          <Col className="logo-container" xs="5" sm="5" md="3" lg="3">
            <img className="nav-logo" src={logo} alt="logo" />
          </Col>
          <Col xs="7" sm="7" md="9" lg="9" className="nav-list-container">
            <ul className="nav-list">
              <li className="nav-list-item">
                <Link to="/builder">Create Free Resume</Link>
              </li>
              <li className="nav-list-item">
                <Link to="/expert">Find an Expert</Link>
              </li>
              <li className="nav-list-item">
                {authInfo.user ? userNav : <Link to="/auth/login">Log In</Link>}
              </li>

              {/* <li className="nav-list-item"><Link to="/auth/login">Log In</Link></li> */}
              <li className="nav-list-item">
                {authInfo.user ? null : (
                  <Link to="/auth/signup">
                    <Button className="nav-login-btn" variant="outline-primary">
                      Sign Up
                    </Button>
                  </Link>
                )}
              </li>
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
