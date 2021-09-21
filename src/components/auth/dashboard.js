import React, {useContext} from "react"
import {GlobalContext} from "../../context/GlobalContext"
import {Button} from "react-bootstrap"
import { navigate } from "gatsby-link"

const Dashboard = ()=>{
    const {signOutHandler, authInfo} = useContext(GlobalContext)
    const logoutHandler = ()=>{
      signOutHandler()
      navigate("/auth/login")
    }
    console.log("authInfo in dashboard",authInfo.user)
    return(
        <div>this is Dashboard
          <Button onClick={logoutHandler}>Log out</Button>
        </div>
    )
}

export default Dashboard