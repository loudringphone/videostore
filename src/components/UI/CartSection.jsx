import React, { useState, useEffect, useRef } from 'react'
import accounting from 'accounting'

import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import {db} from '../../firebase_setup/firebase';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import useInputValidation from "../../handles/useInputValidation";
import { getFunctions, httpsCallable } from "firebase/functions";
import { firebaseQuery } from '../../functions/firebaseQuery';

import processing from '../../assets/images/loading.gif'
import '../../styles/checkout.css';

const AddressSection = (props) => {
    const items = props.items;
    const cart = props.cart;
    const cartItems = cart.cartItems;
    const [checkoutItems, setCheckoutItems] = useState([])
    
    useEffect(()=>{
        let checkoutItemsArr = []
        for (let item of items) {
        for (let cartItem of cartItems) {
            if (item.id === cartItem.id) {
            const checkoutItem = {...cartItem, image: item.image}; // Create new object with spread syntax
            checkoutItemsArr.push(checkoutItem)
            }
        }
        }
        setCheckoutItems(checkoutItemsArr)
    },[])
    


  return (
    <div className='checkout-left'>
        <div className='checkout-cart'>
            {checkoutItems.map((item) => (
                <div className="checkout-item" key={item.id}>
                    <div className="img-placeholder">
                        <img src={item.image[0].downloadURL} alt={item.name} />
                        <span>{item.quantity}</span>
                    </div>
                    <div className="checkout-item-name">{item.name}</div>
                    <div className="checkout-item-total">{accounting.formatMoney(item.totalPrice)}</div>

                </div>
            ))}
            <div className='checkout-total'>
                <h5>Total</h5>
                <h5>AUD {accounting.formatMoney(cart.totalAmount)}</h5>
            </div>
        </div>
        

    </div>
   
                


  





  )
}

export default AddressSection;
