import React,{useContext, useEffect, useState} from 'react'
import {BuilderContext} from "../../context/BuilderProvider"
const Greeny = ()=>{
    const {resumeContentState} = useContext(BuilderContext)
   const [test, setMyTest] = useState("")
    const handler = ()=>{
        setMyTest({resumeContentState})
        console.log(test )
    }
    // console.log("template data", resumeContentState)
    return(
        <div className="resume-style-template-container">
        <div>{resumeContentState.data.profile.photo}</div>
        <button onClick={handler}>click to test</button>
       
        </div>
    )
}

export default Greeny