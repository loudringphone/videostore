import { useState, useRef } from 'react';

function useInputValidation() {
  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [firstNameHasValue, setFirstNameHasValue] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [lastNameHasValue, setLastNameHasValue] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailHasValue, setEmailHasValue] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordHasValue, setPasswordHasValue] = useState(false);
  
  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleFirstNameFocus = () => {
    setFirstNameFocused(true);
  }

  const handleFirstNameBlur = () => {
    if (!firstNameInputRef.current.value) {
      setFirstNameFocused(false);
    }
  }

  const handleFirstNameChange = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setFirstNameHasValue(event.target.value !== '');
      lastNameInputRef.current.focus()
    } else {
      setFirstNameHasValue(event.target.value !== '');
    }
  }

  const handleLastNameFocus = () => {
    setLastNameFocused(true);
  }

  const handleLastNameBlur = () => {
    if (!lastNameInputRef.current.value) {
      setLastNameFocused(false);
    }
  }

  const handleLastNameChange = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setLastNameHasValue(event.target.value !== '');
      emailInputRef.current.focus()
    } else {
      setLastNameHasValue(event.target.value !== '');
    }
  }

  const handleEmailFocus = () => {
    setEmailFocused(true);
  }

  const handleEmailBlur = () => {
    if (!emailInputRef.current.value) {
      setEmailFocused(false);
    }
  }

  const handleEmailChange = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setEmailHasValue(event.target.value !== '');
       passwordInputRef.current.focus()
    } else {
      setEmailHasValue(event.target.value !== '');
    }
  }

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  }

  const handlePasswordBlur = () => {
    if (!passwordInputRef.current.value) {
      setPasswordFocused(false);
    }
  }

  const handlePasswordChange = (event) => {
    setPasswordHasValue(event.target.value !== '');
  }

  return {
    firstNameFocused,
    setFirstNameFocused,
    firstNameHasValue,
    setFirstNameHasValue,
    lastNameFocused,
    setLastNameFocused,
    lastNameHasValue,
    setLastNameHasValue,
    emailFocused,
    setEmailFocused,
    emailHasValue,
    setEmailHasValue,
    passwordFocused,
    setPasswordFocused,
    passwordHasValue,
    setPasswordHasValue,
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
    handlePasswordChange
  };
}

export default useInputValidation;