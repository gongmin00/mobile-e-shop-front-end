import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faExternalLinkAlt, faEllipsisH} from "@fortawesome/free-solid-svg-icons"

const ResumePreview = (props)=>{
    console.log("preview",props.singleResumeData)
    return (
        <div className="resume-preview-container">
            <div className="resume-name">Resume</div>
            <div className="resume-link"><FontAwesomeIcon icon={faExternalLinkAlt}/></div>
            <div className="resume-options"><FontAwesomeIcon icon={faEllipsisH}/></div>

        </div>
    )
}
export default ResumePreview