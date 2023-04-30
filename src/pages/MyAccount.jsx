import React from 'react'
import { useNavigate } from "react-router-dom"
import processing from '../assets/images/loading.gif'


export const MyAccount = (props) => {
    const currentUser = props.currentUser
    const navigate = useNavigate()

    if (currentUser === null || currentUser === undefined) {
        setTimeout(()=> {
            navigate('/account/login')
        }, 1500)
        return (
            <section className='account-page'>
                <div className="processing">
                    Please log in to view your account.
                </div>
            </section>
        ) 
    }
    else {
        if (Object.keys(currentUser)?.length === 0) {
            return (
                <section className='account-page'>
                    <div className="processing">
                        <img src={processing} alt="processing" style={{height: '30px'}}/>
                        Verifying user information...
                    </div>
                </section>
            )
        } else {
            return (
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

                            <div class="account-info-block">
                            
                                <h5 class="account-page-subtitle">
                                Default address
                                </h5>

                                

                    <ul class="account-address-list">
                        <li>Australia </li>
                    </ul>
                            <p class="account-address-item">
                                
                                <a href="/account/addresses">
                                    View addresses (1)
                                </a>
                                
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
            
            )
        }








    }
        
}
    
    
        
   

