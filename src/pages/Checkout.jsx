import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {db} from '../firebase_setup/firebase';
import { doc, updateDoc, getDoc } from "firebase/firestore";

import AddressSection from '../components/UI/AddressSection';
import '../styles/checkout.css';


export const Checkout = (props) => {
  const currentUser = props.currentUser;











  return (
    <section className='checkout'>
      <div className='checkout-left'>


      </div>
      <div className='checkout-right'>
      
      <AddressSection currentUser={currentUser} />

      </div>




    </section>
  )
}
