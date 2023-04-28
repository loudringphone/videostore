import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import '../styles/account-page.css'
import useInputValidation from "../handles/useInputValidation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { db, auth, storage } from "../firebase_setup/firebase"
import { setDoc, doc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import processing from '../assets/images/loading.gif'

const Signup = () => {
  const {
    firstNameFocused,
    firstNameHasValue,
    lastNameFocused,
    lastNameHasValue,
    emailFocused,
    emailHasValue,
    passwordFocused,
    passwordHasValue,
    firstNameInputRef,
    lastNameInputRef,
    emailInputRef,
    passwordInputRef,
    handleFirstNameFocus,
    handleFirstNameBlur,
    handleFirstNameChange,
    handleLastNameFocus,
    handleLastNameBlur,
    handleLastNameChange,
    handleEmailFocus,
    handleEmailBlur,
    handleEmailChange,
    handlePasswordFocus,
    handlePasswordBlur,
    handlePasswordChange,
  } = useInputValidation();
  
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleFirstNameInput = (e) => {
    setFirstName(e.target.value)
  }
  const handleLastNameInput = (e) => {
    setLastName(e.target.value)
  }
  const handleEmailInput = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordInput = (e) => {
    setPassword(e.target.value)
  }

  const [loading, setLoading] = useState(false)
  const [errorMessageDisplay, setErrorMessageDisplay] = useState({display: "none"})
  const [errorBlankEmailDisplay, setErrorBlankEmailDisplay] = useState({display: "none"})
  const [errorInvalidEmailDisplay, setErrorInvalidEmailDisplay] = useState({display: "none"})
  const [errorTakenEmailDisplay, setErrorTakenEmailDisplay] = useState({display: "none"})
  const [errorBlankPasswordDisplay, setErrorBlankPasswordDisplay] = useState({display: "none"})
  const [errorShortPasswordDisplay, setErrorShortPasswordDisplay] = useState({display: "none"})
  const navigate = useNavigate()
  const signup = async(e) => {
    e.preventDefault();
    setLoading(true)
    setErrorMessageDisplay({display: "none"})
    setErrorBlankEmailDisplay({display: "none"})
    setErrorInvalidEmailDisplay({display: "none"})
    setErrorTakenEmailDisplay({display: "none"})
    setErrorBlankPasswordDisplay({display: "none"})
    setErrorShortPasswordDisplay({display: "none"})
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      console.log(firstName)
      await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email,
          firstName: firstName,
          lastName: lastName
        })
      setLoading(false)
      toast.success("Congratulations, your account has been successfully created.")
      navigate('/')
    } catch (error) {
      setLoading(false)
      console.log(error.code)
      setErrorMessageDisplay({display: "block"})
      const isInvalidEmail = (str) => {
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(str) || str.length < 5 || str.length > 254;
      }
      if (email==="" || error.code === "auth/missing-email") {
        setErrorBlankEmailDisplay({display: "block"});
      }
      if(isInvalidEmail(email) || error.code === "auth/invalid-email") {
        setErrorInvalidEmailDisplay({display: "block"});
      }
      if (error.code === "auth/email-already-in-use") {
        setErrorTakenEmailDisplay({display: "block"})
      }
      if (password==="" || error.code === "auth/missing-password") {
        setErrorBlankPasswordDisplay({display: "block"});
      }
      if (password.length <= 5 || error.code === "auth/weak-password") {
        setErrorShortPasswordDisplay({display: "block"});
      }

      
    }
  }


  if (loading) {
    return (
      <section className='account-page-register'>
        <div className="processing">
          <img src={processing} alt="processing" style={{height: '30px'}}/>
        Your account is being created...
        </div>
      </section>
    )
  } else {

    return (
      <section className='account-page-register'>
        <header className='account-page-masthead'>
          <h1 className="account-page-title">Create account</h1>
        </header>
        <article className="account-page-content">
          <div className="account-signup">
            <form autoComplete='off' onSubmit={signup} action="/account/" id="create_customer">
              <div className="account-message-error" style={errorMessageDisplay}>
              <div className="errors">
                <ul>
                  <li style={errorBlankEmailDisplay}>Email can't be blank.</li>
                  <li style={errorInvalidEmailDisplay}>Email is invalid.</li>
                  <li style={errorTakenEmailDisplay}>This email address is already associated with an account. If this account is yours, you can reset your password.</li>
                  <li style={errorBlankPasswordDisplay}>Password can't be blank.</li>
                  <li style={errorShortPasswordDisplay}>Password is too short (minimum is 6 characters)</li>
                </ul>
              </div>
            </div>
              <div className="form-field">
                <input 
                  type="text" 
                  id="register_first_name" 
                  className="form-field-input"
                  autoCorrect='off' 
                  autoCapitalize='off' 
                  onFocus={handleFirstNameFocus}
                  onBlur={handleFirstNameBlur}
                  onChange={handleFirstNameChange}
                  onKeyDown={handleFirstNameChange}
                  onInput={handleFirstNameInput}
                  ref={firstNameInputRef}
                />
                <label 
                  htmlFor="register_first_name" 
                  className={`form-field-title ${firstNameFocused || firstNameHasValue ? 'form-field-title--input' : ''}`}
                >
                  First name
                </label>
              </div>
              <div className="form-field">
                <input 
                  type="text" 
                  id="register_last_name" 
                  className="form-field-input"
                  autoCorrect='off' 
                  autoCapitalize='off' 
                  onFocus={handleLastNameFocus}
                  onBlur={handleLastNameBlur}
                  onChange={handleLastNameChange}
                  onKeyDown={handleLastNameChange}
                  onInput={handleLastNameInput}
                  ref={lastNameInputRef}
                />
                <label 
                  htmlFor="register_last_name" 
                  className={`form-field-title ${lastNameFocused || lastNameHasValue ? 'form-field-title--input' : ''}`}
                >
                  Last name
                </label>
              </div>
              <div className="form-field">
                <input 
                  type="text" 
                  id="customer_email" 
                  className="form-field-input"
                  autoCorrect='off' 
                  autoCapitalize='off' 
                  onFocus={handleEmailFocus}
                  onBlur={handleEmailBlur}
                  onChange={handleEmailChange}
                  onKeyDown={handleEmailChange}
                  onInput={handleEmailInput}
                  ref={emailInputRef}
                />
                <label 
                  htmlFor="customer_email" 
                  className={`form-field-title ${emailFocused || emailHasValue ? 'form-field-title--input' : ''}`}
                >
                  Email
                </label>
              </div>
              <div className="form-field">
                <input 
                  className="form-field-input"
                  id="customer_password" 
                  name="customer[password]" 
                  type="password"
                  autoComplete="new-password"
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                  onChange={handlePasswordChange}
                  onInput={handlePasswordInput}
                  ref={passwordInputRef}
                />
                <label 
                  className={`form-field-title ${passwordFocused || passwordHasValue ? 'form-field-title--input' : ''}`}
                  htmlFor="customer_password"
                >
                  Password
                </label>
              </div>
              <div className="form-action-row">
                <button className="create-account">Create</button>
                <div className="form-action-row--helper">
                  <span className="form-action-row--helper-item">
                    Returning customer?&nbsp;
                    <Link to="/account/login" id="customer_login_link">Sign in</Link>
                  </span>
                </div>
              </div>
            </form>













          </div>
        </article>
      </section>
    )
  }
}

export default Signup