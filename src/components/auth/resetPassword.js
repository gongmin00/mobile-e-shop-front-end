import React, {useContext, useState} from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import {Form, Button, Alert} from "react-bootstrap"
const ResetPassword =()=> {
    const {resetPasswordHandler} = useContext(GlobalContext)
    const [resetData, setData] = useState({
        email:"",
        errorMsg:""
    })
    const changeHandler = (event)=>{
        setData({
            ...resetData,
            email:event.target.value
        })
    }
    const resetHandler = ()=>{
        try {
            resetPasswordHandler(resetData.email)
        }catch(error){
            setData({
                ...resetData,
                errorMsg:error
            })
        }
    }
    return (
        <div className="regForm-container">
      {/* {authInfo.user && JSON.stringify(authInfo.user.email)} */}
      <Form className="regForm">
        {resetData.errorMsg ? (
          <Alert variant="danger">{resetData.errorMsg} </Alert>
        ) : null}
        <Form.Group className="email-container" controlId="formGroupEmail">
          <Form.Label>Enter Email to Reset Password</Form.Label>
          <Form.Control
            name="email"
            onChange={changeHandler}
            type="email"
            placeholder="Enter Email"
          ></Form.Control>
        </Form.Group>
       
        <Button className="auth-submit-btn" onClick={resetHandler} type="submit">
          Send Email
        </Button>
       
      </Form>
    </div>
    )
}
export default ResetPassword