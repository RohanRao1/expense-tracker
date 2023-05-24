import React, { Fragment, useState, useRef } from "react";
import classes from "./Login.module.css";

const Login = () => {
  const [isLogin , setLogin] = useState(true)
  const emailInputRef = useRef()
  const passwordInputRef= useRef()
  const cPasswordInputRef = useRef()

  const toggle = () =>{
    setLogin(prev => !prev)
  }

  
  const submitHandler = (event) => {
    event.preventDefault()
    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    if (isLogin){

    }
    else {
         fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAVljULb5wx1pjS6nACVu-88E3ybtM49vo",{
            method : 'POST',
            body : JSON.stringify({
                email : enteredEmail,
                password : enteredPassword,
                returnSecureToken : true
            })
          }
        ).then(res => {
          console.log(res)
          if (res.ok) {
            return res.json()
          } else {
            return res.json().then(data => [
              alert(data.error.message)
            ])
          }
        })
    }

  }

  return (
    <Fragment>
      <form className={classes.form} onSubmit={submitHandler}>
        <h1>{isLogin ? 'LOGIN' : 'SIGNUP'}</h1>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailInputRef} required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" required ref={passwordInputRef} />
        <label htmlFor="cpassword">Confirm Password</label>
        <input type="password" id="cpassword" required ref={cPasswordInputRef} />
        <button type="submit">{isLogin ? "Log In" : 'Sign Up'}</button>
        <div className={classes.actions}>
          <button type="button" className={classes.toggle} onClick={toggle}>{isLogin ? 'Create New Account' : 'Login To Existing Account'}</button>
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
