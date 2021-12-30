import React from 'react'
import {BuilderContext} from "../../context/BuilderProvider"
import {Router} from "@reach/router"
import CenterDashboard from './centerDashboard'
import CenterDisplay from './centerDisplay'
const CenterPanel = ()=>{
    // const {resumeContentState} = useContext(BuilderContext)
 
    // console.log("template data", resumeContentState)
    return(
        <div className="resume-style-template-container">
{/*         
            <img src={resumeContentState.data.profile.photo} alt="profile-photo"/>
        <div>{resumeContentState.data.profile.photo}</div> */}
        <CenterDashboard />
        <Router>
        <CenterDashboard path="/builder/dashboard" />
        <CenterDisplay path="/builder/edit" />
      </Router>
        

       
        </div>
    )
}

export default CenterPanel