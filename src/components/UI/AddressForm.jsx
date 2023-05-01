import React, { useState } from "react";
import useInputValidation from "../../handles/useInputValidation";


const AddressForm = (props) => {
    const {
        firstNameFocused,
        firstNameHasValue,
        firstNameInputRef,
        handleFirstNameFocus,
        handleFirstNameBlur,
        handleFirstNameChange,
        lastNameFocused,
        lastNameHasValue,
        lastNameInputRef,
        handleLastNameFocus,
        handleLastNameBlur,
        handleAddressLastNameChange,
        companyFocused,
        companyHasValue,
        companyInputRef,
        handleCompanyFocus,
        handleCompanyBlur,
        handleCompanyChange,
        address1Focused,
        address1HasValue,
        address1InputRef,
        handleAddress1Focus,
        handleAddress1Blur,
        handleAddress1Change,
        address2Focused,
        address2HasValue,
        address2InputRef,
        handleAddress2Focus,
        handleAddress2Blur,
        handleAddress2Change,
        cityFocused,
        cityHasValue,
        cityInputRef,
        handleCityFocus,
        handleCityBlur,
        handleCityChange,
        zipFocused,
        zipHasValue,
        zipInputRef,
        handleZipFocus,
        handleZipBlur,
        handleZipChange,
        phoneFocused,
        phoneHasValue,
        phoneInputRef,
        handlePhoneFocus,
        handlePhoneBlur,
        handlePhoneChange,
        countryFocused,
        countryHasValue,
        countryInputRef,
        handleCountryFocus,
        handleCountryBlur,
        handleCountryChange,
        stateFocused,
        stateHasValue,
        stateInputRef,
        handleStateFocus,
        handleStateBlur,
        handleStateChange,
        defaultAddressInputRef,
      } = useInputValidation();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [company, setCompany] = useState("")
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("Australia")
    const [state, setState] = useState("New South Wales")
    const [zip, setZip] = useState("")
    const [phone, setPhone] = useState("")
    const [defaultAddress, setDefaultAddress] = useState(false)

    


    const handleFirstNameInput = (e) => {
        setFirstName(e.target.value)
    }
    const handleLastNameInput = (e) => {
        setLastName(e.target.value)
    }
    const handleCompanyInput = (e) => {
        setCompany(e.target.value)
    }
    const handleAddress1Input = (e) => {
        setAddress1(e.target.value)
    }
    const handleAddress2Input = (e) => {
        setAddress2(e.target.value)
    }
    const handleCityInput = (e) => {
        setCity(e.target.value)
    }
    const handleZipInput = (e) => {
        setZip(e.target.value)
    }
    const handlePhoneInput = (e) => {
        setPhone(e.target.value)
    }
    const handleCountryInput = (e) => {
        setCountry(e.target.value)
    }
    const handleStateInput = (e) => {
        setState(e.target.value)
    }
    
 

  const handleCheckboxChange = (event) => {
    setDefaultAddress(event.target.checked);
  };


  return (
     <div className="account-address-form" >
        <h5 className='account-page-subtitle'>Add a new address</h5>
        <form action="account/addresses" id="address-form">
            <div className="form-field-columns">
                <div className="form-field form-field-half">
                    <input 
                    type="text" 
                    id="customer_first_name" 
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
                    htmlFor="customer_first_name"
                    className={`form-field-title ${firstNameFocused || firstNameHasValue ? 'form-field-title--input' : ''}`}
                    >
                    First name
                    </label>
                </div>
                <div className="form-field form-field-half">
                    <input 
                    type="text" 
                    id="customer_last_name" 
                    className="form-field-input"
                    autoCorrect='off' 
                    autoCapitalize='off' 
                    onFocus={handleLastNameFocus}
                    onBlur={handleLastNameBlur}
                    onChange={handleAddressLastNameChange}
                    onKeyDown={handleAddressLastNameChange}
                    onInput={handleLastNameInput}
                    ref={lastNameInputRef}
                    />
                    <label 
                    htmlFor="customer_last_name"
                    className={`form-field-title ${lastNameFocused || lastNameHasValue ? 'form-field-title--input' : ''}`}
                    >
                    Last name
                    </label>
                </div>
            </div>
            <div className="form-field">
                <input 
                  type="text" 
                  id="customer_company" 
                  className="form-field-input"
                  autoCorrect='off' 
                  autoCapitalize='off' 
                  onFocus={handleCompanyFocus}
                  onBlur={handleCompanyBlur}
                  onChange={handleCompanyChange}
                  onKeyDown={handleCompanyChange}
                  onInput={handleCompanyInput}
                  ref={companyInputRef}
                />
                <label 
                  htmlFor="customer_company"
                  className={`form-field-title ${companyFocused || companyHasValue ? 'form-field-title--input' : ''}`}
                >
                  Company
                </label>
            </div>
            <div className="form-field">
                <input 
                  type="text" 
                  id="customer_address1" 
                  className="form-field-input"
                  autoCorrect='off' 
                  autoCapitalize='off' 
                  onFocus={handleAddress1Focus}
                  onBlur={handleAddress1Blur}
                  onChange={handleAddress1Change}
                  onKeyDown={handleAddress1Change}
                  onInput={handleAddress1Input}
                  ref={address1InputRef}
                />
                <label 
                  htmlFor="customer_address1"
                  className={`form-field-title ${address1Focused || address1HasValue ? 'form-field-title--input' : ''}`}
                >
                  Address 1
                </label>
            </div>
            <div className="form-field">
                <input 
                  type="text" 
                  id="customer_address2" 
                  className="form-field-input"
                  autoCorrect='off' 
                  autoCapitalize='off' 
                  onFocus={handleAddress2Focus}
                  onBlur={handleAddress2Blur}
                  onChange={handleAddress2Change}
                  onKeyDown={handleAddress2Change}
                  onInput={handleAddress2Input}
                  ref={address2InputRef}
                />
                <label 
                  htmlFor="customer_address2"
                  className={`form-field-title ${address2Focused || address2HasValue ? 'form-field-title--input' : ''}`}
                >
                  Address 2
                </label>
            </div>
            <div className="form-field-columns">
                <div className="form-field form-field-half">
                    <input 
                    type="text" 
                    id="customer_city" 
                    className="form-field-input"
                    autoCorrect='off' 
                    autoCapitalize='off' 
                    onFocus={handleCityFocus}
                    onBlur={handleCityBlur}
                    onChange={handleCityChange}
                    onKeyDown={handleCityChange}
                    onInput={handleCityInput}
                    ref={cityInputRef}
                    />
                    <label 
                    htmlFor="customer_city"
                    className={`form-field-title ${cityFocused || cityHasValue ? 'form-field-title--input' : ''}`}
                    >
                    City
                    </label>
                </div>
                <div className="form-field form-field-half">
                    <div className="form-field-select-wrapper">
                        <div>
                            <label className="form-field-title">
                                Country
                            </label>
                            <select 
                            id="customer_country"
                            className="form-field"
                            aria-label="Country"
                            onFocus={handleCountryFocus}
                            onBlur={handleCountryBlur}
                            onChange={handleCountryChange}
                            onKeyDown={handleCountryChange}
                            onInput={handleCountryInput}
                            ref={countryInputRef}
                            // value={quantity || ""}
                            // onChange={handleQuantityChange}
                            >
                                <option value="Australia">
                                    Australia
                                </option>
                                
                            </select>
                        </div>
                        <i className="ri-arrow-down-s-line"></i>
                    </div>
                </div>
            </div>
            <div className="form-field-columns">
                <div className="form-field form-field-half">
                <div className="form-field-select-wrapper">
                        <div>
                            <label className="form-field-title">
                                State/Province
                            </label>
                            <select 
                            id="customer_state"
                            className="form-field"
                            aria-label="state"
                            defaultValue="New South Wales"
                            onFocus={handleStateFocus}
                            onBlur={handleStateBlur}
                            onChange={handleStateChange}
                            onKeyDown={handleStateChange}
                            onInput={handleStateInput}
                            ref={stateInputRef}
                            // value={quantity || ""}
                            // onChange={handleQuantityChange}
                            >
                                <option value="Australian Capital Territory">
                                    Australian Capital Territory
                                </option>
                                <option value="New South Wales">
                                    New South Wales
                                </option>
                                <option value="Northern Territory">
                                    Northern Territory
                                </option>
                                <option value="Queensland">
                                    Queensland
                                </option>
                                <option value="South Australia">
                                    South Australia
                                </option>
                                <option value="Tasminia">
                                    Tasminia
                                </option>
                                <option value="Victoria">
                                    Victoria
                                </option>
                                <option value="Western Australia">
                                    Western Australia
                                </option>

                                
                            </select>
                        </div>
                        <i className="ri-arrow-down-s-line"></i>
                    </div>
                </div>
                <div className="form-field form-field-half">
                    <input 
                    type="text" 
                    id="customer_zip" 
                    className="form-field-input"
                    autoCorrect='off' 
                    autoCapitalize='off' 
                    onFocus={handleZipFocus}
                    onBlur={handleZipBlur}
                    onChange={handleZipChange}
                    onKeyDown={handleZipChange}
                    onInput={handleZipInput}
                    ref={zipInputRef}
                    />
                    <label 
                    htmlFor="customer_zip"
                    className={`form-field-title ${zipFocused || zipHasValue ? 'form-field-title--input' : ''}`}
                    >
                    Zip/Postal code
                    </label>
                </div>
            </div>
            <div className="form-field-columns">
                <div className="form-field form-field-half">
                    <input 
                    type="text" 
                    id="customer_phone" 
                    className="form-field-input"
                    autoCorrect='off' 
                    autoCapitalize='off' 
                    onFocus={handlePhoneFocus}
                    onBlur={handlePhoneBlur}
                    onChange={handlePhoneChange}
                    onKeyDown={handlePhoneChange}
                    onInput={handlePhoneInput}
                    ref={phoneInputRef}
                    />
                    <label 
                    htmlFor="customer_phone"
                    className={`form-field-title ${phoneFocused || phoneHasValue ? 'form-field-title--input' : ''}`}
                    >
                    Phone
                    </label>
                </div>
                <div className="form-field form-field-half">
                    <label className="form-field-checkbox" htmlFor="address_default_address">
                        <input type="checkbox" id="default_address" name="address[default]"
                        checked={defaultAddress}
                        onChange={handleCheckboxChange}
                        ref={defaultAddressInputRef}/>
                        <span className="form-field-title--inline">
                            Set as default address
                        </span>
                    </label>
                </div>
            </div>
            <button className="add-address">Add address</button>
        </form>        

    </div>
  )
}

export default AddressForm;
