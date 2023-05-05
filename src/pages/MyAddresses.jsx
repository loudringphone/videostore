import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Helmet } from '../components/helmet/Helmet'
import processing from '../assets/images/loading.gif'
import AddressForm from '../components/UI/AddressForm'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast, Zoom } from "react-toastify"

import {db} from '../firebase_setup/firebase';


export const MyAddresses = (props) => {
    const currentUser = props.currentUser
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({})
    const [defaultAddress, setDefaultAddress] = useState([])
    const [otherAddresses, setOtherAddresses] = useState([])
    const [loading, setLoading] = useState(true)
    const [cancelEdit, setCancelEdit] = useState(false)
    const [isLatest, setIsLatest] = useState(true)
    const [isFirstLoaded, setIsFirstLoaded] = useState(true)
    const [isDeleted, setIsDeleted] = useState(false)


    useEffect(() => {
        if (currentUser != null) {       
        if (!isLatest || isFirstLoaded) {
            console.log('fetching user')
            const fetchUser = async () => {
                const docRef = doc(db, "customers", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserInfo(docSnap.data());
                    setIsFirstLoaded(false)
                    // console.log(docSnap.data())
                } else {
                // docSnap.data() will be undefined in this case
                console.log("No such user!");
                }
                }
                fetchUser()
        }
        }
    }, [currentUser, isLatest])

    useEffect(() => {
        if (Object.keys(userInfo)?.length > 0) {
            if (userInfo.addresses?.default !== undefined) {
                const defaultAddressObj = userInfo.addresses[userInfo.addresses.default]
                let defaultAddressArr =
                    [
                        `${defaultAddressObj.firstName} ${defaultAddressObj.lastName}`,
                        defaultAddressObj.company,
                        defaultAddressObj.address1,
                        defaultAddressObj.address2,
                        `${defaultAddressObj.city}, ${defaultAddressObj.state}`,
                        `${defaultAddressObj.country} ${defaultAddressObj.zip}`,
                        defaultAddressObj.phone
                    ]
                    for (let i = 0; i < defaultAddressArr.length; i++) {
                        const element = defaultAddressArr[i];
                        if (defaultAddressArr[i]?.startsWith(',')) {
                            defaultAddressArr[i] = defaultAddressArr[i].slice(1);
                        }
                        defaultAddressArr[i] = defaultAddressArr[i]?.trim()
                        if (defaultAddressArr[i]?.endsWith(',')) {
                            defaultAddressArr[i] = defaultAddressArr[i].slice(0, -1);
                        }
                        if (element === " " || element === ", " || element.length === 0) {
                            defaultAddressArr.splice(i, 1);
                            i--;
                        }
                    }
                defaultAddressArr = [userInfo.addresses.default, defaultAddressArr]
                setDefaultAddress(defaultAddressArr)


            }
                const defaultIndex = userInfo.addresses.default
                let addressKeys = Object.keys(userInfo.addresses)
                addressKeys = addressKeys.filter((key) => key != defaultIndex && key != 'default' && key != 'selected')
                let otherAddressesArr = []
                for (let key of addressKeys) {
                    const addressObj = userInfo.addresses[key]
                    let addressArr = 
                    [
                        `${addressObj.firstName} ${addressObj.lastName}`,
                        addressObj.company,
                        addressObj.address1,
                        addressObj.address2,
                        `${addressObj.city}, ${addressObj.state}`,
                        `${addressObj.country} ${addressObj.zip}`,
                        addressObj.phone
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
                        if (element === " " || element === ", " || element?.length === 0) {
                            addressArr.splice(i, 1);
                            i--;
                        }
                    }
                    addressArr = [key, addressArr]
                    otherAddressesArr.push(addressArr)
                }
                setOtherAddresses(otherAddressesArr)
            
            setLoading(false)
            setTimeout(() => {
                setIsLatest(true)
            }, 500);
        }
    },[userInfo])

    function handleUpdate(newState) {
        setIsLatest(newState);
    }
    function handleCancelEdit(newState) {
        setCancelEdit(newState);
    }


    const [editAddress, setEditAddress] = useState(null);
    
    const handleEdit = (event) => {
        const id = event.target.id;
        setEditAddress([Number(id.replace("editAddress", "")), userInfo.addresses[Number(id.replace("editAddress", ""))]]);
        setCancelEdit(false)
    };
    useEffect(() => {
        if(cancelEdit) {
            setEditAddress(null)
        }

    },[cancelEdit])


    const handleDelete = (event) => {
        const deleteAddressId = event.target.id;
        const id = Number(deleteAddressId.replace("deleteAddress",""))
        const addresses = userInfo.addresses

        if (userInfo.addresses.default === id) {
            return (
                toast.error("Default address can't be deleted.", {autoClose: 1500, className: "custom-toast-error", transition: Zoom })
            )
        }

        delete addresses[id]
        async function deleteAddress() {
            const userRef = doc(db, "customers", userInfo.uid);
            setCancelEdit(true);
            await updateDoc(userRef, {
                addresses: addresses
              });
            setIsLatest(false)
            setIsDeleted(true)
            setTimeout(() => {
                toast.success("Address deleted.", {autoClose: 1500})
                setIsDeleted(false)
            }, 500);
            console.log('deleteAddress')
          }
        try {
            deleteAddress()
            
        } catch (error) {
          console.log(error.code)
        }
    };


    


    if (currentUser === null || currentUser === undefined) {
        setTimeout(()=> {
            navigate('/account/login')
        }, 1500)
        return (
            <Helmet title='Addresses'>
            <section className='account-page'>
                <div className="processing">
                    Please log in to view your account.
                </div>
            </section>
            </Helmet>
        ) 
    }
    else {
        if (Object.keys(currentUser)?.length === 0) {
            return (
                <Helmet title='Addresses'>
                <section className="account-page account-page-addresses">
                    <div className="processing">
                        <img src={processing} alt="processing" style={{height: '30px'}}/>
                        Loading address information...
                    </div>
                </section>
                </Helmet>

            )
        } else {
            if (loading) {
                return (
                    <Helmet title='Addresses'>
                    <section className="account-page account-page-addresses">
                        <div className="processing">
                            <img src={processing} alt="processing" style={{height: '30px'}}/>
                            Loading address information...
                        </div>
                    </section>
                    </Helmet>
    
                )


            // } else if (!isLatest){
            //     return (
            //         <Helmet title='Addresses'>
            //         <section className="account-page account-page-addresses">
                        // <div className="processing">
                        //     <img src={processing} alt="processing" style={{height: '30px'}}/>
                        //     Updating address information...
                        // </div>
            //         </section>
            //         </Helmet>
    
            //     )
            } else {
            
            return (
                <Helmet title='Addresses'>
                    
                <section className="account-page account-page-details">
                {!isLatest && (
                        
                        <div className="updating"> 
                            
                        </div>)}
                        {!isLatest && (
                        <div className="processing updating">
                                <img src={processing} alt="processing" style={{height: '30px'}}/>
                                Updating address information...
                            </div>)}
                    <header className="account-page-masthead">
                        <h2 className="account-page-title">
                        My Addresses
                        </h2>
                    </header>

                    <div className="account-page-content">
                    <div className="account-page--two-column">
                    {defaultAddress?.length > 0 || otherAddresses?.length > 0 ? (
                    <div className="account-page--column-half account-addresses">
                        <h5 className="account-page-subtitle">
                        Addresses
                        </h5>
                        


                        
                        <ul className="account-address-wrapper">
                            {defaultAddress.length > 0 && (
                            <li className="account-address" id={`address${defaultAddress[0]}`}>
                                <ul className="account-address-list">
                                {defaultAddress[1]?.map((e, i) => {
                                    return <li key={i}>{e}</li>;
                                })}
                                </ul>
                                <p className="account-address-item account-address-item--default" style={{fontStyle: 'italic'}}>
                                Default address
                                </p>
                                <div className="account-address-list-footer">
                                <button id={`editAddress${defaultAddress[0]}`} onClick={handleEdit}>
                                    Edit
                                </button>

                                <button id={`deleteAddress${defaultAddress[0]}`} onClick={handleDelete}>
                                    Delete
                                </button>
                                </div>
                            </li>
                            )}

                            {otherAddresses.map((address, index) => (
                            <li className="account-address" key={index} id={`address${address[0]}`}>
                                <ul className="account-address-list">
                                {address[1].map((detail, i) => (
                                    <li key={i}>{detail}</li>
                                ))}
                                </ul>
                                <div className="account-address-list-footer">
                                    <button id={`editAddress${address[0]}`} onClick={handleEdit}>
                                    Edit
                                    </button>
                                    <button id={`deleteAddress${address[0]}`} onClick={handleDelete}>
                                    Delete
                                    </button>
                                </div>
                            </li>
                            ))}
                        </ul>

                    </div>
                    ) : (
                        <></>
                    )
                    }
                        <div className="account-page--column-half account-addresses">
                            <AddressForm 
                                userInfo={userInfo}
                                handleIsLatest={handleUpdate}
                                editAddress={editAddress}
                                cancelEdit={handleCancelEdit}
                                isDeleted={isDeleted}
                            />
                        </div>

            
                        </div>
                        
                    </div>
                </section>
                </Helmet>
            
            )}
        }








    }
        
}
    
    
        
   

