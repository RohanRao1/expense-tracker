import React, { Fragment, useRef, useContext } from "react";
import classes from './ProfilePage.module.css'
import AuthContext from "../auth/AuthContext";

const ProfilePage = () => {
  const nameRef = useRef()
  const urlRef = useRef()
  const authctx = useContext(AuthContext)

  const submitHandler = event => {
    event.preventDefault()

    const enteredName = nameRef.current.value
    const enteredUrl = urlRef.current.value


    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAVljULb5wx1pjS6nACVu-88E3ybtM49vo",{
        method : 'POST',
        body : JSON.stringify({
          idToken : authctx.token,
          displayName : enteredName,
          photoUrl : enteredUrl,
          returnSecureToken : true
        })
      }
    ).then(res => {
      if(res.ok){
        return res.json()
      } else {
        return res.json().then(data => {
          console.log(data)
          if (data.error.message) {
            alert(data.error.message)
          }
        })
      }
    }).then(data => {
      console.log('received data ',data)
    }).catch(err=> console.log(err))

  }


    return (
      <Fragment>
        <div className={classes.header}>
          <h3>Winners Never Quit. Quitters never win</h3>
          <span>
            Your profile is 69% completed. A complete profile has <br /> higher
            chances of landing a job. <button>Complete now</button>
          </span>
        </div>
        <section className={classes.section}>
          <div className={classes.details}>
            <span>Contact Details</span>
            <button>cancel</button>
          </div>
          <form className={classes.form} onSubmit={submitHandler}>
            <label htmlFor="name">Full Name:</label>
            <input type="text" id="name" ref={nameRef} />
            <label htmlFor="url">Profile Photo URL :</label>
            <input type="url" id="url" ref={urlRef}/>
            <button type='submit'>Update</button>
          </form>
        </section>
      </Fragment>
    );
}

export default ProfilePage