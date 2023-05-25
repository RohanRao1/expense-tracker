import React, { Fragment, useState, useRef, useContext } from "react";
import {useHistory} from 'react-router-dom'
import classes from "./Login.module.css";
import AuthContext from "../auth/AuthContext";

const Login = () => {
  const [isLogin , setLogin] = useState(true)
  const [loading , setLoading] = useState(false)
  const emailInputRef = useRef()
  const passwordInputRef= useRef()
  const cPasswordInputRef = useRef()
  const history = useHistory()
  const authctx = useContext(AuthContext)
  const toggle = () =>{
    setLogin(prev => !prev)
  }

  
  const submitHandler = (event) => {
    event.preventDefault()
    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value
    setLoading(true)
    if (isLogin){
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAVljULb5wx1pjS6nACVu-88E3ybtM49vo",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => {
          setLoading(false);
          console.log(res);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => alert(data.error.message));
          }
        }).then(data => {
            if(data){
            authctx.login(data.idToken, data.email)
            history.replace('/welcomepage')}
        })
    }
    else {
         fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAVljULb5wx1pjS6nACVu-88E3ybtM49vo",{
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                email : enteredEmail,
                password : enteredPassword,
                returnSecureToken : true
            })
          }
        ).then(res => {
          setLoading(false)
          console.log(res)
          if (res.ok) {
            return res.json()
          } else {
            return res.json().then(data => 
              alert(data.error.message)
            )
          }
        })
    }

  }

  const resetPassword = () => {
    history.push('/resetpassword')
  }

  return (
    <Fragment>
      <form className={classes.form} onSubmit={submitHandler} >
        <h1>{isLogin ? 'LOGIN' : 'SIGNUP'}</h1>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailInputRef} required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" required ref={passwordInputRef} />
        <label htmlFor="cpassword">Confirm Password</label>
        <input type="password" id="cpassword" required ref={cPasswordInputRef} />
        {loading ? 'Loading...' : <button type="submit">{isLogin ? "Log In" : 'Sign Up'}</button> }
        <div className={classes.actions}>
        {isLogin &&  <button type="button" className={classes.pwd} onClick={resetPassword}>Forgot Password??</button> }
        </div>
        <div className={classes.actions}>
          <button type="button" className={classes.toggle} onClick={toggle}>{isLogin ? 'Create New Account' : 'Login To Existing Account'}</button>
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
