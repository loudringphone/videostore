import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import useInputValidation from "../handles/useInputValidation";


import '../styles/account-page.css'

const Login = () => {
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

  return (
    <section className='account-page-login'>
      <header className='account-page-masthead'>
        <h1 className="account-page-title">Login</h1>
      </header>
      <article className="account-page-content">
        <div className="account-login">
          <form action="/account/login" id="customer_login">
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
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                onChange={handlePasswordChange}
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
                <span class="form-action-row--helper-item">
                  New Customer?&nbsp;
                  <Link to="/account/register" id="customer_register_link">Create account</Link>
                </span>
                <span class="form-action-row--helper-item">
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

export default Login