import React, {useContext} from "react"
import {AuthContext} from "../../context/AuthProvider"
import { navigate } from "gatsby-link"
const PrivateRoute =({component:Component, ...rest})=>{
    const {authInfo}=useContext(AuthContext)
    // const { loginHandler, authInfo} = useContext(AuthContext);
    // const test = false
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