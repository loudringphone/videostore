import React, { useEffect, useState } from 'react'
import useInputValidation from "../../handles/useInputValidation";
import {db} from '../../firebase_setup/firebase';
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify"


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
        setFirstNameHasValue,
        setLastNameHasValue,
        setCompanyHasValue,
        setAddress1HasValue,
        setAddress2HasValue,
        setCityHasValue,
        setZipHasValue,
        setPhoneHasValue,

        setFirstNameFocused,
        setLastNameFocused,
        setCompanyFocused,
        setAddress1Focused,
        setAddress2Focused,
        setCityFocused,
        setZipFocused,
        setPhoneFocused,


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


  const reset = function () {
    setFirstName("")
    setLastName("")
    setCompany("")
    setAddress1("")
    setAddress2("")
    setCity("")
    setCountry("Australia")
    setState("New South Wales")
    setZip("")
    setPhone("")
    setDefaultAddress(false)
    setFirstNameHasValue(false)
    setLastNameHasValue(false)
    setCompanyHasValue(false)
    setAddress1HasValue(false)
    setAddress2HasValue(false)
    setCityHasValue(false)
    setZipHasValue(false)
    setPhoneHasValue(false)
    setFirstNameFocused(false)
    setLastNameFocused(false)
    setCompanyFocused(false)
    setAddress1Focused(false)
    setAddress2Focused(false)
    setCityFocused(false)
    setZipFocused(false)
    setPhoneFocused(false)
    props.handleIsLatest(false)
    props.cancelEdit(true)
    console.log('reset')
  }

  const isDeleted = props.isDeleted

  useEffect(() => {
    reset()
  },[isDeleted])





  const userInfo = props.userInfo
  const addressAction = async(e) => {
    e.preventDefault();
    let addresses = null
    let index = null
    if (userInfo.addresses !== undefined) {
        addresses = userInfo.addresses
        for (let i = 0; i <= Infinity; i++) {
            if (addresses[i] === undefined) {
                index = i
                break
            }
        }
    } else {
        addresses = {1:{},default: 1};
        index = 1;
    }
    if (editAddress != null) {
        index = editAddress[0]
    }





        addresses[index] = 
            {
                firstName: firstName,
                lastName: lastName,
                company: company,
                address1: address1,
                address2: address2,
                city: city,
                country: country,
                state: state,
                zip: zip,
                phone: phone
            }
            // console.log(typeof userInfo.addresses["default"])
        if (defaultAddress || typeof userInfo.addresses["default"] != 'number') {
            addresses["default"] = index
        }
        
    
    async function updateAddress() {
        const userRef = doc(db, "users", userInfo.uid);
        await updateDoc(userRef, {
            addresses: addresses
          });
        reset()
        setTimeout(() => {
            if (editAddress != null) {
                toast.success("Address updated.", {autoClose: 1500})
            } else {
                toast.success("Address added.", {autoClose: 1500})
            }
        }, 500);
        
        console.log('updateAddress')
      }
    try {
        updateAddress()
       
        
    
    } catch (error) {
      console.log(error.code)
      
    }
  }

 



  const editAddress = props.editAddress
  
  useEffect(() => {
    if (editAddress != null) {
        setFirstNameHasValue(false)
        setLastNameHasValue(false)
        setCompanyHasValue(false)
        setAddress1HasValue(false)
        setAddress2HasValue(false)
        setCityHasValue(false)
        setZipHasValue(false)
        setPhoneHasValue(false)
        if (editAddress[1].firstName === undefined || editAddress[1].firstName?.length === 0) {
            setFirstName("")
        } else {
            setFirstName(editAddress[1].firstName)
            setFirstNameHasValue(true)
        }
        if (editAddress[1].lastName === undefined || editAddress[1].lastName?.length === 0) {
            setLastName("")
        } else {
            setLastName(editAddress[1].lastName)
            setLastNameHasValue(true)
        }
        if (editAddress[1].company === undefined || editAddress[1].company?.length === 0) {
            setCompany("")
        } else {
            setCompany(editAddress[1].company)
            setCompanyHasValue(true)
        }
        if (editAddress[1].address1 === undefined || editAddress[1].address1?.length === 0) {
            setAddress1("")
        } else {
            setAddress1(editAddress[1].address1)
            setAddress1HasValue(true)
        }
        if (editAddress[1].address2 === undefined || editAddress[1].address2?.length === 0) {
            setAddress2("")
        } else {
            setAddress2(editAddress[1].address2)
            setAddress2HasValue(true)
        }
        if (editAddress[1].city === undefined || editAddress[1].city?.length === 0) {
            setCity("")
        } else {
            setCity(editAddress[1].city)
            setCityHasValue(true)
        }
        if (editAddress[1].country === undefined || editAddress[1].country?.length === 0) {
            setCountry("")
        } else {
            setCountry(editAddress[1].country)
        }
        if (editAddress[1].state === undefined || editAddress[1].state?.length === 0) {
            setState("")
        } else {
            setState(editAddress[1].state)
        }
        if (editAddress[1].zip === undefined || editAddress[1].zip?.length === 0) {
            setZip("")
        } else {
            setZip(editAddress[1].zip)
            setZipHasValue(true)
        }
        if (editAddress[1].phone === undefined || editAddress[1].phone?.length === 0) {
            setPhone("")
        } else {
            setPhone(editAddress[1].phone)
            setPhoneHasValue(true)
        }
        setDefaultAddress(editAddress[0] === userInfo.addresses.default)
    }

  }, [editAddress])


  const cancelEdit = async(e) => {
    e.preventDefault();

    setFirstName("")
    setLastName("")
    setCompany("")
    setAddress1("")
    setAddress2("")
    setCity("")
    setCountry("Australia")
    setState("New South Wales")
    setZip("")
    setPhone("")
    setDefaultAddress(false)
    setFirstNameHasValue(false)
    setLastNameHasValue(false)
    setCompanyHasValue(false)
    setAddress1HasValue(false)
    setAddress2HasValue(false)
    setCityHasValue(false)
    setZipHasValue(false)
    setPhoneHasValue(false)

    props.cancelEdit(true)
  }


  return (
     <div className="account-address-form" >
        <h5 className='account-page-subtitle'>Add a new address</h5>
        <form  autoComplete='off' id="address-form">
            <div className="form-field-columns">
                <div className="form-field form-field-half">
                    <input 
                    type="text" 
                    id="customer_first_name" 
                    className="form-field-input"
                    value={firstName || ""}
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
                    value={lastName || ""}
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
                  value={company || ""}
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
                  value={address1 || ""}
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
                  value={address2 || ""}
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
                    value={city || ""}
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
                            value={country || "Australia"}
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
                            value={state || "New South Wales"}
                            aria-label="state"
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
                    value={zip || ""}
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
                    value={phone || ""}
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
                        checked={defaultAddress || false}
                        onChange={handleCheckboxChange}
                        ref={defaultAddressInputRef}/>
                        <span className="form-field-title--inline">
                            Set as default address
                        </span>
                    </label>
                </div>
            </div>
            { editAddress === null? (
                <div className="form-action-row">
                    <button className="add-address" onClick={addressAction}>Add address</button>
                </div>

            ):(
                <div className="form-action-row">
                    <button className="update-address" onClick={addressAction}>Update address</button>
                    <button className="cancel-address" onClick={cancelEdit}>Cancel</button>
                </div>
            )}
        </form>        

    </div>
  )
}

export default AddressForm;
