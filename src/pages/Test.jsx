import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { Helmet } from '../components/helmet/Helmet'
import {db} from '../firebase_setup/firebase';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { cartActions } from '../redux/slices/cartSlice';
import processing from '../assets/images/loading.gif'
import CartSection from '../components/UI/CartSection';
import AddressSection from '../components/UI/AddressSection';
import { firebaseQuery } from '../functions/firebaseQuery';

import '../styles/checkout.css';


export const Test = (props) => {
  
  return (
    <Helmet title='Shipping'>
        <div>teast</div>
     


    </Helmet>

  )
}
