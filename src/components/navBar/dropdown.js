import React, { useState } from "react";
import "./navStyle.css";
import { Link } from "gatsby";

const Dropdown = () => {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const sideMenuHandler = () => {
    setDropDownMenu(!dropDownMenu);
  };
  // const sideMenuCloser = () => {
  //   setDropDownMenu(false);
  // };
  let menuIcon;
  if (dropDownMenu === false) {
    menuIcon = (
      <div role="button" tabIndex={0} onClick={sideMenuHandler} className="menu-container">
        <div className="toggle-button-line"> </div>
      </div>
    );
  } else {
    menuIcon = (
      <div className="dropdown-container">
        <div role="button" tabIndex={0} onClick={sideMenuHandler} className="open-menu-container">
          <div className="open-toggle-button-line"> </div>
        </div>
        <div className="dropdown-menu-container2">
          <ul>
            <li>
              <Link to="/builder">Create Free Resume</Link>
            </li>
            <li><Link to="/expert">Find an Expert</Link></li>
            <li><Link to="/auth/login">Login</Link></li>
          </ul>
        </div>
        <div className="wide-click-div" onClick={sideMenuHandler}></div>
      </div>
    );
  }
  return <div>{menuIcon}</div>;
};

export default Dropdown;
