import React, {useContext} from "react"
import {GlobalContext} from "../../context/GlobalContext"
import {Redirect, Router, Route} from "@reach/router"
import { navigate } from "gatsby-link"
const PrivateRoute =({component:Component, ...rest})=>{
    const {authInfo}=useContext(GlobalContext)
    // const { loginHandler, authInfo} = useContext(GlobalContext);
    // const test = false
   console.log("authInfo in private route", authInfo)
    // return(
    //     <Router 
    //     {...rest}
    //     render={props=>{
    //         return authInfo.user?<Component {...props } />:<Redirect to="/auth/login"/>
    //     }}
    //     >

    //     </Router>

    // )
    // const test = true
    if(authInfo.user===null){
        navigate("/auth/login")
        return null
    } 
    return <Component {...rest}/>
}
export default PrivateRoute