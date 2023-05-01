import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Helmet } from '../components/helmet/Helmet'
import processing from '../assets/images/loading.gif'
import AddressForm from '../components/UI/AddressForm'
import { doc, getDoc } from "firebase/firestore";
import {db} from '../firebase_setup/firebase';

export const MyAddresses = (props) => {
    const currentUser = props.currentUser
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({})
    const [defaultAddress, setDefaultAddress] = useState([])


    useEffect(() => {
        if (currentUser != null) {       

        const fetchUser = async () => {
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserInfo(docSnap.data());
                // console.log(docSnap.data())
            } else {
            // docSnap.data() will be undefined in this case
            console.log("No such user!");
            }
            }
            fetchUser()
        }
    }, [currentUser])

    useEffect(() => {
        if (Object.keys(userInfo)?.length > 0) {
            if (userInfo.addresses?.default) {
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
                        defaultAddressArr[i] = defaultAddressArr[i].trim()
                        if (defaultAddressArr[i].endsWith(',')) {
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
        }
    },[userInfo])














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
            return (
                <Helmet title='Addresses'>
                <section className="account-page account-page-details">
                    <header className="account-page-masthead">
                        <h2 className="account-page-title">
                        My Addresses
                        </h2>
                    </header>

                    <div className="account-page-content">
                    <div class="account-page--two-column">
                    {defaultAddress?.length > 0 ? (
                    <div class="account-page--column-half account-addresses">
                        <h5 class="account-page-subtitle">
                        Addresses
                        </h5>
                        


                        
                        <ul class="account-address-wrapper">
                        
                            <li class="account-address">
                                <ul class="account-address-list">
                                    {defaultAddress[1].map((e, i) => {
                                        return <li key={i}>{e}</li>;
                                    })}
                                </ul>
                                <p class="account-address-item account-address-item--default" style={{fontStyle: 'italic'}}>
                                Default address
                                </p>
                                <div class="account-address-list-footer">
                                    <button class="button-primary mdc-ripple-surface mdc-ripple-upgraded" type="button" data-edit-address="7713400127585">
                                    Edit
                                    </button>

                                    <button class="button-secondary mdc-ripple-surface mdc-ripple-upgraded" type="button" data-delete-address="7713400127585">
                                    Delete
                                    </button>
                                </div>
                            </li>
                            
                        </ul>
                        

            



                    </div>
                    ) : (
                        <></>
                    )
                    }
                        <div class="account-page--column-half account-addresses">
                            <AddressForm />
                        </div>

            
                        </div>
                        
                    </div>
                </section>
                </Helmet>
            
            )
        }








    }
        
}
    
    
        
   

