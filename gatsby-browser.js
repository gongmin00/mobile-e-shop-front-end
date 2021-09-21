import "firebase/auth"
import GlobalProvider from "./src/context/GlobalProvider"
import React, {useState} from "react"
import Layout from "./src/components/layout"
import firebase from "gatsby-plugin-firebase"

export const wrapRootElement = ({element})=>{


    return  (
        <GlobalProvider><Layout>{element}</Layout></GlobalProvider>
    )
}