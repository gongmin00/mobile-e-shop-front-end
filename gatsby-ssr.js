import "firebase/auth"
import GlobalProvider from "./src/context/GlobalProvider"
import React from "react"
export const wrapRootElement = ({element})=>(
    <GlobalProvider>{element}</GlobalProvider>
)