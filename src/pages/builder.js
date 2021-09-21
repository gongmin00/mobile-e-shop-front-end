import React, {useContext} from "react"
import {GlobalContext} from "../context/GlobalContext"

const Builder =()=>{
    const test = useContext(GlobalContext)
    return(
        <div>builder page
            <div>{test}</div>
        </div>
    )
}
export default Builder