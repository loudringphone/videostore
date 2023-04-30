import React, { useState } from "react";
import { Link } from 'react-router-dom';
import useInputValidation from "../handles/useInputValidation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase_setup/firebase"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import processing from '../assets/images/loading.gif'

import '../styles/account-page.css'

const Login = (props) => {
  const {
    emailFocused,
    emailHasValue,
    passwordFocused,
    passwordHasValue,
    emailInputRef,
    passwordInputRef,
    handleEmailFocus,
    handleEmailBlur,
    handleEmailChange,
    handlePasswordFocus,
    handlePasswordBlur,
    handlePasswordChange,
  } = useInputValidation();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessageDisplay, setErrorMessageDisplay] = useState({display: "none"})
  const [errorIncorrectLoginDisplay, setErrorIncorrectLoginDisplay] = useState({display: "none"})
  const navigate = useNavigate()

  const handleEmailInput = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordInput = (e) => {
    setPassword(e.target.value)
  }

  const signIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessageDisplay({display: "none"})
    setErrorIncorrectLoginDisplay({display: "none"})
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      // console.log(user)
      setLoading(false)
      toast.success("Successfully logged in.", {autoClose: 1500})
      // console.log(props.prevLocation)
      if (props.prevLocation === undefined || props.prevLocation === null || props.prevLocation === 'account/logout') {
        navigate('/')
      } else {
        navigate(props.prevLocation)
      }
    } catch (error) {
      console.log(error.code)
      setErrorMessageDisplay({display: "block"})
      setErrorIncorrectLoginDisplay({display: "block"})
      setLoading(false)
    }
  }
  if (loading) {
    return (
      <section className='account-page'>
        <div className="processing">
          <img src={processing} alt="processing" style={{height: '30px'}}/>
        Securely logging you in...
        </div>
      </section>
    )
  } else {
    return (
      <section className='account-page account-page-login'>
        <header className='account-page-masthead'>
          <h2 className="account-page-title">Login</h2>
        </header>
        <article className="account-page-content">
          <div className="account-login">
            <form  onSubmit={signIn} action="/account/login" id="customer_login">
              <div className="account-message-error" style={errorMessageDisplay}>
                <div className="errors">
                  <ul>
                    <li style={errorIncorrectLoginDisplay}>Incorrect email or password.</li>
                  </ul>
                </div>
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
                  autoComplete="on"
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
                <button className="sign-in">Sign in</button>
                <div className="form-action-row--helper">
                  <span className="form-action-row--helper-item">
                    New Customer?&nbsp;
                    <Link to="/account/register" id="customer_register_link">Create account</Link>
                  </span>
                  <span className="form-action-row--helper-item">
                    <Link to="#customer_recovery">Forgot your password?</Link>
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

export default Login