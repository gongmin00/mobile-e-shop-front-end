import React,{useContext} from 'react'
import {BuilderContext} from "../../context/BuilderProvider"
const Greeny = ()=>{
    const {resumeContentState} = useContext(BuilderContext)
    console.log("template data", resumeContentState)
    return(
        <div>test</div>
    )
}

export default Greeny