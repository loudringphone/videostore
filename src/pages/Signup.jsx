import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import '../styles/account-page.css'
import useInputValidation from "../handles/useInputValidation";
  
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
  

  return (
    <section className='account-page-register'>
      <header className='account-page-masthead'>
        <h1 className="account-page-title">Create account</h1>
      </header>
      <article className="account-page-content">
        <div className="account-login">
          <form autoComplete='off' method="post" action="/account/" id="create_customer">
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
                <span class="form-action-row--helper-item">
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

export default Signup