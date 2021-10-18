import React,{useContext, useEffect, useState} from 'react'
import {BuilderContext} from "../../context/BuilderProvider"
const MainDisplay = ()=>{
    const {resumeContentState} = useContext(BuilderContext)
 
    // console.log("template data", resumeContentState)
    return(
        <div className="resume-style-template-container">
            <img src={resumeContentState.data.profile.photo} alt="profile-photo"/>
        <div>{resumeContentState.data.profile.photo}</div>

       
        </div>
    )
}

export default MainDisplay