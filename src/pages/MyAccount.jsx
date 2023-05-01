import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore";
import {db} from '../firebase_setup/firebase';
import { Helmet } from '../components/helmet/Helmet'
import processing from '../assets/images/loading.gif'




export const MyAccount = (props) => {
    const currentUser = props.currentUser
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({})
    const [defaultAddress, setDefaultAddress] = useState([])
    const [loading, setLoading] = useState(true)

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
                const defaultAddressObj = userInfo.addresses[userInfo.addresses?.default]
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
            setLoading(false)
        }
    },[userInfo])

    if (currentUser === null || currentUser === undefined) {
        setTimeout(()=> {
            navigate('/account/login')
        }, 1500)
        return (
            <Helmet title='Account'>
            <section className='account-page'>
                <div className="processing">
                    Please log in to view your account.
                </div>
            </section>
            </Helmet>
        ) 
    }
    else {
        if (loading) {
            return (
                <Helmet title='Account'>
                    <section className='account-page'>
                        <div className="processing">
                            <img src={processing} alt="processing" style={{height: '30px'}}/>
                            Verifying user information...
                        </div>
                    </section>
                </Helmet>

            )
        } else {
            return (
                <Helmet title='Account'>

                <section class="account-page account-page-details">
                    <header class="account-page-masthead">
                        <h2 class="account-page-title">
                        My Account
                        </h2>
                    </header>

                    <div class="account-page-content">
                        <div class="account-page--two-column">
                        
                        <div class="account-page--column-large account-order-history">
                            <h4 class="account-page-subtitle">
                            Order history
                            </h4>

                            
                            <p class="empty">You have no orders</p>
                            
                        </div>

                        
                        <div class="account-page--column-small account-info">
                            <div class="account-info-block">
                            <h2 class="account-page-subtitle">
                                
                            </h2>

                            <p class="account-info-item">
                                <a href={'mailto:' + currentUser.email}>
                                    {currentUser.email}
                                </a>
                            </p>
                            </div>

                            <div className="account-info-block">
                            
                            {defaultAddress?.length > 0 ? (
                                <h5 className="account-page-subtitle">
                                Default address
                                </h5>
                                ):(
                                    <></>
                                )
                                }
                                <ul className="account-address-list">
                                {defaultAddress[1].map((e, i) => {
                                    return <li key={i}>{e}</li>;
                                })}
                                </ul>
                            
                                
                                
                                
                            <p class="account-addresses">
                                {defaultAddress?.length > 0 ? (
                                    <a href="/account/addresses">
                                        View addresses ({userInfo.addresses[3] === undefined? userInfo.addresses[2] === undefined? 1 : 2 : 3})
                                    </a>
                                ) : (
                                    <a href="/account/addresses">
                                        Add new address
                                    </a>
                                )}
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
                </Helmet>

            
            )
        }








    }
        
}
    
    
        
   

