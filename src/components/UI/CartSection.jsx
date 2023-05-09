import React, { useState, useEffect, useRef } from 'react'
import accounting from 'accounting'

import processing from '../../assets/images/loading.gif'
import '../../styles/checkout.css';

const AddressSection = (props) => {
    const checkoutItems = props.checkoutItems;
    const cart = props.cart;
   
  

  return (
    <div className='checkout-left'>
        <div className='checkout-cart'>
            {checkoutItems.map((item) => (
                <div className="checkout-item" key={item.id}>
                    <div className="img-placeholder">
                        <img src={item.image[0]?.downloadURL} alt={item.name} />
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
