import React, {useEffect, useContext} from 'react'
import { BuilderContext } from '../../../context/BuilderProvider'

const CornflowerBlue = ()=>{
    // const {resumeContentState} = useContext(BuilderContext)
//    const [test, setMyTest] = useState("")
    // const handler = ()=>{
    //     setMyTest({resumeContentState})
    //     console.log(test )
    // }
    // console.log("template data", resumeContentState)
    const {} = useContext(BuilderContext)
    return(
        <div className="resume-style-template-container">
        {/* <div>{resumeContentState.data.profile.photo}</div> */}
        {/* <button onClick={handler}>click to test</button> */}
       greeny template
        </div>
    )
}

export default CornflowerBlue