import React from 'react'
import { useNavigate } from "react-router-dom"
import { Helmet } from '../components/helmet/Helmet'
import processing from '../assets/images/loading.gif'
import AddressForm from '../components/UI/AddressForm'

export const MyAddresses = (props) => {
    const currentUser = props.currentUser
    const navigate = useNavigate()





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
                    <div class="account-page--column-half account-addresses">
                        <h5 class="account-page-subtitle">
                        Addresses
                        </h5>

                        <ul class="account-address-wrapper">
                        
                            <li class="account-address">
                                <ul class="account-address-list">
                                    <li>Australia </li>
                                </ul>
                                <p class="account-address-item account-address-item--default">
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
    
    
        
   

