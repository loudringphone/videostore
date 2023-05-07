import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {db} from '../../firebase_setup/firebase';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import useInputValidation from "../../handles/useInputValidation";


import '../../styles/checkout.css';

const AddressSection = (props) => {

  const currentUser = props.currentUser;

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


  const [userInfo, setUserInfo] = useState({})
  const [addresses, setAddresses] = useState({})
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState([])
  const [otherAddresses, setOtherAddresses] = useState([])
  const [shippingAddress, setShippingAddress] = useState(selectedAddress['selected'])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [company, setCompany] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("Australia")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [phone, setPhone] = useState("")

  const navigate = useNavigate()
  
  const reset = function () {
    setFirstName("")
    setLastName("")
    setCompany("")
    setAddress1("")
    setAddress2("")
    setCity("")
    setCountry("")
    setState("")
    setZip("")
    setPhone("")
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
  }

  useEffect(() => {
    if (currentUser != null) {       
        console.log('fetching user')
        const fetchUser = async () => {
            const docRef = doc(db, "customers", currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserInfo(docSnap.data());
                if (docSnap.data().addresses) {
                  setAddresses(docSnap.data().addresses);
                }
            } else {
            // docSnap.data() will be undefined in this case
            console.log("No such user!");
            }
            }
            fetchUser()
    
    } else {
      return navigate('/account/login')

    }
    return () => setLoading(false);
  }, [currentUser])



  useEffect(() => {
    
        if (Object.keys(addresses)?.length > 0) {
            const selectedAddressObj = userInfo.addresses[userInfo.addresses.selected]
            let selectedAddressArr =
                [
                    
                    selectedAddressObj.address1,
                    selectedAddressObj.address2,
                    `${selectedAddressObj.city}, ${selectedAddressObj.state}`,
                    `${selectedAddressObj.country} ${selectedAddressObj.zip}`,
                    `(${selectedAddressObj.firstName} ${selectedAddressObj.lastName}, ${selectedAddressObj.company})`,
                ]
                for (let i = 0; i < selectedAddressArr.length; i++) {
                    const element = selectedAddressArr[i];
                    if (selectedAddressArr[i]?.startsWith(',')) {
                        selectedAddressArr[i] = selectedAddressArr[i].slice(1);
                    }
                    selectedAddressArr[i] = selectedAddressArr[i]?.trim()
                    if (selectedAddressArr[i]?.endsWith(',')) {
                        selectedAddressArr[i] = selectedAddressArr[i].slice(0, -1);
                    }
                    if (selectedAddressArr[i]?.startsWith('( , ')) {
                      selectedAddressArr[i] = selectedAddressArr[i].replace('( , ', '(');
                    }
                    if (selectedAddressArr[i]?.endsWith(', )')) {
                      selectedAddressArr[i] = selectedAddressArr[i].replace(', )', ')');
                    }
                    if (element === " " || element === ", " || element.length === 0) {
                        selectedAddressArr.splice(i, 1);
                        i--;
                    }
                }
            selectedAddressArr = [addresses.selected, selectedAddressArr]
            const selectedAddressStr = selectedAddressArr[1].join(', ').replace(', (',' (').replace('()',"")
            setSelectedAddress([selectedAddressArr[0],selectedAddressStr])
        }
            const selectedIndex = addresses.selected
            let addressKeys = Object.keys(addresses)
            addressKeys = addressKeys.filter((key) => key != selectedIndex && key != 'default' && key != 'selected')
            let otherAddressesArr = []
            for (let key of addressKeys) {
                const addressObj = addresses[key]
                let addressArr = 
                [
                    addressObj.address1,
                    addressObj.address2,
                    `${addressObj.city}, ${addressObj.state}`,
                    `${addressObj.country} ${addressObj.zip}`,
                    `(${addressObj.firstName} ${addressObj.lastName}, ${addressObj.company})`,
                    
                ]
                for (let i = 0; i < addressArr.length; i++) {
                    const element = addressArr[i];
                    if (addressArr[i]?.startsWith(',')) {
                        addressArr[i] = addressArr[i].slice(1);
                    }
                    addressArr[i] = addressArr[i]?.trim()
                    if (addressArr[i]?.endsWith(',')) {
                        addressArr[i] = addressArr[i].slice(0, -1);
                    }
                    if (addressArr[i]?.startsWith('( , ')) {
                      addressArr[i] = addressArr[i].replace('( , ', '(');
                    }
                    if (addressArr[i]?.endsWith(', )')) {
                      addressArr[i] = addressArr[i].replace(', )', ')');
                    }
                    if (element === " " || element === ", " || element?.length === 0) {
                        addressArr.splice(i, 1);
                        i--;
                    }
                }
                addressArr = [key, addressArr]
                const addressStr = addressArr[1].join(', ').replace(', (',' (').replace('()',"")

                otherAddressesArr.push([addressArr[0], addressStr])
            }
            setOtherAddresses(otherAddressesArr)
            setAddressToForm(addresses[shippingAddress])
            
        setLoading(false)
        
    
  },[addresses])

  useEffect(()=>{
    if (addresses[addresses['selected']]?.firstName.length > 0) {
      setFirstNameHasValue(true)
    } else {
      setFirstNameHasValue(false)
    }
    if (addresses[addresses['selected']]?.lastName.length > 0) {
      setLastNameHasValue(true)
    } else {
      setLastNameHasValue(false)
    }
    if (addresses[addresses['selected']]?.company.length > 0) {
      setCompanyHasValue(true)
    } else {
      setCompanyHasValue(false)
    }
    if (addresses[addresses['selected']]?.address1.length > 0) {
      setAddress1HasValue(true)
    } else {
      setAddress1HasValue(false)
    }
    if (addresses[addresses['selected']]?.address2.length > 0) {
      setAddress2HasValue(true)
    } else {
      setAddress2HasValue(false)
    }
    if (addresses[addresses['selected']]?.city.length > 0) {
      setCityHasValue(true)
    } else {
      setCityHasValue(false)
    }
    if (addresses[addresses['selected']]?.zip.length > 0) {
      setZipHasValue(true)
    } else {
      setZipHasValue(false)
    }
    if (addresses[addresses['selected']]?.phone.length > 0) {
      setPhoneHasValue(true)
    } else {
      setPhoneHasValue(false)
    }
  },[addresses])
  const setAddressToForm = (address) => {
    
    reset()
    setFirstName(address?.firstName)
    setLastName(address?.lastName)
    setCompany(address?.company)
    setAddress1(address?.address1)
    setAddress2(address?.address2)
    setCity(address?.city)
    setCountry(address?.country)
    setState(address?.state)
    setZip(address?.zip)
    setPhone(address?.phone)
    if (address?.firstName.length > 0) {
      setFirstNameHasValue(true)
    } else {
      setFirstNameHasValue(false)
    }
    if (address?.lastName.length > 0) {
      setLastNameHasValue(true)
    } else {
      setLastNameHasValue(false)
    }
    if (address?.company.length > 0) {
      setCompanyHasValue(true)
    } else {
      setCompanyHasValue(false)
    }
    if (address?.address1.length > 0) {
      setAddress1HasValue(true)
    } else {
      setAddress1HasValue(false)
    }
    if (address?.address2.length > 0) {
      setAddress2HasValue(true)
    } else {
      setAddress2HasValue(false)
    }
    if (address?.city.length > 0) {
      setCityHasValue(true)
    } else {
      setCityHasValue(false)
    }
    if (address?.zip.length > 0) {
      setZipHasValue(true)
    } else {
      setZipHasValue(false)
    }
    if (address?.phone.length > 0) {
      setPhoneHasValue(true)
    } else {
      setPhoneHasValue(false)
    }
    setFirstNameFocused(false)
    setLastNameFocused(false)
    setCompanyFocused(false)
    setAddress1Focused(false)
    setAddress2Focused(false)
    setCityFocused(false)
    setZipFocused(false)
    setPhoneFocused(false)
  }
  useEffect(() => {
    setAddressToForm(addresses[shippingAddress])
  },[shippingAddress])

  const selectAddress = (e) => {
    const select = e.target.value;
    setShippingAddress(select)
    if (Number(select) >= 0) {
      setAddressToForm(addresses[shippingAddress])
    } else {
      reset()
    }

  }


  useEffect(()=>{
    reset()
    setAddressToForm(addresses[addresses['selected']])
  },[selectedAddress])

  return (
    <>
    <h5>Shipping Address</h5>
    <div className="form-field-select-wrapper">
      <div>
          <label className="form-field-title">
            Saved addresses
          </label>
          <select 
          id="shipping-address"
          className="form-field"
          value={shippingAddress || ""}
          onChange={selectAddress}
          // aria-label="state"
          // onFocus={handleStateFocus}
          // onBlur={handleStateBlur}
          // onChange={handleStateChange}
          // onKeyDown={handleStateChange}
          // onInput={handleStateInput}
          // ref={stateInputRef}
          >
              { selectedAddress &&
              <option value={selectedAddress[0]}>
                {selectedAddress[1]}
              </option>}
              
              { otherAddresses && otherAddresses.map((e, i) => {
              return (<option key={i} value={e[0]}>
                {e[1]}
              </option>)})}

              <option value="new address">
                  Use a new address
              </option>
          </select>
      </div>
      <i className="ri-arrow-down-s-line"></i>
  </div>

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
                    value={country || ""}
                    onFocus={handleCountryFocus}
                    onBlur={handleCountryBlur}
                    onChange={handleCountryChange}
                    onKeyDown={handleCountryChange}
                    onInput={handleCountryInput}
                    ref={countryInputRef}
                    // value={quantity || ""}
                    // onChange={handleQuantityChange}
                    >
                        <option value="" disabled>
                            Please Select
                        </option>
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
              value={state || ""}
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
                  <option value="">
                      Please Select
                  </option>
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
            Phone (Optional)
            </label>
        </div>
    </div>
    <div className="form-action-row">
    <Link to='/cart' className='return-to-basket'><i class="ri-arrow-left-s-line"></i>&nbsp;Return to basket
  </Link>
        <button className="continue-to-payment">Continue to payment</button>
    </div>
  
  </form>        
                
  </>


  





  )
}

export default AddressSection;
