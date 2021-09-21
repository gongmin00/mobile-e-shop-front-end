import React from "react"
// import { propTypes } from "react-bootstrap/esm/Image"
import Footer from "./navBar/footer"
import NavBar from "./navBar/navMenu"
const Layout = (props)=>{
    return(
        <div className="main-body">
            <NavBar/>
            {props.children}
            <Footer/>
        </div>
    )
}

export default Layout