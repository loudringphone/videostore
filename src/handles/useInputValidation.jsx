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
  const [companyFocused, setCompanyFocused] = useState(false);
  const [companyHasValue, setCompanyHasValue] = useState(false);
  const [address1Focused, setAddress1Focused] = useState(false);
  const [address1HasValue, setAddress1HasValue] = useState(false);
  const [address2Focused, setAddress2Focused] = useState(false);
  const [address2HasValue, setAddress2HasValue] = useState(false);
  const [cityFocused, setCityFocused] = useState(false);
  const [cityHasValue, setCityHasValue] = useState(false);
  const [zipFocused, setZipFocused] = useState(false);
  const [zipHasValue, setZipHasValue] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [phoneHasValue, setPhoneHasValue] = useState(false);
  const [countryFocused, setCountryFocused] = useState(false);
  const [countryHasValue, setCountryHasValue] = useState(false);
  const [stateFocused, setStateFocused] = useState(false);
  const [stateHasValue, setStateHasValue] = useState(false);
  
  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const companyInputRef = useRef(null);
  const address1InputRef = useRef(null);
  const address2InputRef = useRef(null);
  const cityInputRef = useRef(null);
  const zipInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const countryInputRef = useRef(null);
  const stateInputRef = useRef(null);
  const defaultAddressInputRef = useRef(null);



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

  const handleAddressLastNameChange = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setLastNameHasValue(event.target.value !== '');
      companyInputRef.current.focus()
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




  const handleCompanyFocus = () => {
    setCompanyFocused(true);
  }

  const handleCompanyBlur = () => {
    if (!companyInputRef.current.value) {
      setCompanyFocused(false);
    }
  }

  const handleCompanyChange = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setCompanyHasValue(event.target.value !== '');
      address1InputRef.current.focus()
    } else {
      setCompanyHasValue(event.target.value !== '');
    }
  }

  const handleAddress1Focus = () => {
    setAddress1Focused(true);
  }

  const handleAddress1Blur = () => {
    if (!address1InputRef.current.value) {
      setAddress1Focused(false);
    }
  }

  const handleAddress1Change = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setAddress1HasValue(event.target.value !== '');
      address2InputRef.current.focus()
    } else {
      setAddress1HasValue(event.target.value !== '');
    }
  }

  const handleAddress2Focus = () => {
    setAddress2Focused(true);
  }

  const handleAddress2Blur = () => {
    if (!address2InputRef.current.value) {
      setAddress2Focused(false);
    }
  }

  const handleAddress2Change = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setAddress2HasValue(event.target.value !== '');
      cityInputRef.current.focus()
    } else {
      setAddress2HasValue(event.target.value !== '');
    }
  }

  const handleCityFocus = () => {
    setCityFocused(true);
  }

  const handleCityBlur = () => {
    if (!cityInputRef.current.value) {
      setCityFocused(false);
    }
  }

  const handleCityChange = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setCityHasValue(event.target.value !== '');
      countryInputRef.current.focus()
    } else {
      setCityHasValue(event.target.value !== '');
    }
  }

  const handleCountryFocus = () => {
    setCountryFocused(true);
  }

  const handleCountryBlur = () => {
    if (!countryInputRef.current.value) {
      setCountryFocused(false);
    }
  }

  const handleCountryChange = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setCountryHasValue(event.target.value !== '');
      stateInputRef.current.focus()
    } else {
      setCountryHasValue(event.target.value !== '');
    }
  }

  const handleStateFocus = () => {
    setStateFocused(true);
  }

  const handleStateBlur = () => {
    if (!stateInputRef.current.value) {
      setStateFocused(false);
    }
  }

  const handleStateChange = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setStateHasValue(event.target.value !== '');
      zipInputRef.current.focus()
    } else {
      setStateHasValue(event.target.value !== '');
    }
  }

  const handleZipFocus = () => {
    setZipFocused(true);
  }

  const handleZipBlur = () => {
    if (!zipInputRef.current.value) {
      setZipFocused(false);
    }
  }

  const handleZipChange = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setZipHasValue(event.target.value !== '');
      phoneInputRef.current.focus()
    } else {
    setZipHasValue(event.target.value !== '');
    }
  }

  const handlePhoneFocus = () => {
    setPhoneFocused(true);
  }

  const handlePhoneBlur = () => {
    if (!phoneInputRef.current.value) {
      setPhoneFocused(false);
    }
  }

  const handlePhoneChange = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setPhoneHasValue(event.target.value !== '');
      defaultAddressInputRef.current.focus()
    } else {
      setPhoneHasValue(event.target.value !== '');
    }
  }

  return {
    firstNameFocused,
    setFirstNameFocused,
    firstNameHasValue,
    setFirstNameHasValue,
    firstNameInputRef,
    handleFirstNameFocus,
    handleFirstNameBlur,
    handleFirstNameChange,
    lastNameFocused,
    setLastNameFocused,
    lastNameHasValue,
    setLastNameHasValue,
    lastNameInputRef,
    handleLastNameFocus,
    handleLastNameBlur,
    handleLastNameChange,
    handleAddressLastNameChange,
    emailFocused,
    setEmailFocused,
    emailHasValue,
    setEmailHasValue,
    emailInputRef,
    handleEmailFocus,
    handleEmailBlur,
    handleEmailChange,
    passwordFocused,
    setPasswordFocused,
    passwordHasValue,
    setPasswordHasValue,
    passwordInputRef,
    handlePasswordFocus,
    handlePasswordBlur,
    handlePasswordChange,
    companyFocused,
    setCompanyFocused,
    companyHasValue,
    setCompanyHasValue,
    companyInputRef,
    handleCompanyFocus,
    handleCompanyBlur,
    handleCompanyChange,
    address1Focused,
    setAddress1Focused,
    address1HasValue,
    setAddress1HasValue,
    address1InputRef,
    handleAddress1Focus,
    handleAddress1Blur,
    handleAddress1Change,
    address2Focused,
    setAddress2Focused,
    address2HasValue,
    setAddress2HasValue,
    address2InputRef,
    handleAddress2Focus,
    handleAddress2Blur,
    handleAddress2Change,
    cityFocused,
    setCityFocused,
    cityHasValue,
    setCityHasValue,
    cityInputRef,
    handleCityFocus,
    handleCityBlur,
    handleCityChange,
    zipFocused,
    setZipFocused,
    zipHasValue,
    setZipHasValue,
    zipInputRef,
    handleZipFocus,
    handleZipBlur,
    handleZipChange,
    phoneFocused,
    setPhoneFocused,
    phoneHasValue,
    setPhoneHasValue,
    phoneInputRef,
    handlePhoneFocus,
    handlePhoneBlur,
    handlePhoneChange,

    countryFocused,
    setCountryFocused,
    countryHasValue,
    setCountryHasValue,
    countryInputRef,
    handleCountryFocus,
    handleCountryBlur,
    handleCountryChange,
    stateFocused,
    setStateFocused,
    stateHasValue,
    setStateHasValue,
    stateInputRef,
    handleStateFocus,
    handleStateBlur,
    handleStateChange,

    defaultAddressInputRef,
  };
}

export default useInputValidation;