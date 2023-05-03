import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import { Helmet } from '../components/helmet/Helmet'
import { cartActions } from '../redux/slices/cartSlice';
import CartItemCard from '../components/UI/CartItemCard';
import accounting from 'accounting'
import { firebaseQuery } from '../functions/firebaseQuery';
import {db} from '../firebase_setup/firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";

import useAuth from '../custom-hook/useAuth'
import {loadStripe} from '@stripe/stripe-js';
import processing from '../assets/images/loading.gif'
import '../styles/cart.css'

import { getApp } from "@firebase/app";
import { getStripePayments } from "@stripe/firestore-stripe-payments";
import { createCheckoutSession } from "@stripe/firestore-stripe-payments";

import App from '../stripe';

export const Cart = () => {
  const cart = useSelector(state => state.cart)
  const [cartItemIds, setCartItemIds] = useState([])
  const [items, setItems] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useAuth()

  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    setLoading(false);

  }, [cart]);
  const dispatch = useDispatch();
  useEffect(()=>{
    for (let item of items) {
      dispatch(cartActions.addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 0,
      }))
    }
    // console.log(cart.cartItems)

  }, [items])
  useEffect(()=>{
    if (cart.cartItems.length > 0) {
      let arr = []
      for (let item of cart.cartItems) {
        if (item.id) {
          arr.push(item.id)
        } else {
          dispatch(cartActions.removeAllItems())
        }
      }
      setCartItemIds(arr)
    }
  }, [cart])
  useEffect(()=>{
    if (cartItemIds.length > 0 && !isFetched) {
      fetchItems();
      setIsFetched(true);
    }
  }, [cartItemIds, isFetched])

  useEffect(() => {
    let updatedCartItems = cart.cartItems.map((cartItem) => {
      let item = items.find((item) => item.id === cartItem.id);
      if (item) {
        return {
          ...cartItem,
          image: item.image,
          stock: item.stock
        };
      } else {
        return {
          ...cartItem,
          image: [{downloadURL: ""}],
          stock: 0
        };
      }
    });
    setCartItems(updatedCartItems)
    // setLoading(false);
  }, [cart.cartItems, items]);


  let title = "Your Basket";
  

  const fetchItems = async () => {
    const newData = await firebaseQuery(cartItemIds, "products");
    setItems(newData);
  }
  

  const [showArrow, setShowArrow] = useState(false);

  const handleMouseOver = () => {
    setShowArrow(true);
  }

  const handleMouseLeave = () => {
    setShowArrow(false);
  }


  const app = getApp();
  const payments = getStripePayments(app, {
    productsCollection: "products",
    customersCollection: "customers",
  });
  
  const checkout = async function(e) {
    e.preventDefault()
    try {
      
      const session = await createCheckoutSession(payments, {
        price: '100',
      });
      window.location.assign(session.url);
      
    
    } catch(error) {
      console.log(error)
    }
    
    
  };


  
  


  if (loading) {
    return (
      <Helmet title='Your Basket'>
        <>
        <header className='cart-title'>
        <div className='cart-title-left'>
          <h2>Your basket</h2>
        </div>
        <div className='cart-title-right'>
          
        <Link to='/' className='cart-continue' onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver}>
  Continue shopping&nbsp;
  {showArrow ? (
    <i className="ri-arrow-right-line"></i>
  ) : (
    <i className="ri-arrow-right-s-line"></i>
  )}
</Link>
        </div>
      </header>
      <section className='cartitems--container-empty'>

<div className="processing">
        <img src={processing} alt="processing" style={{height: '30px'}}/>
        Retrieving shopping cart...
</div>
</section>
        </>
        
      </Helmet>

    )
  }

  return (
    <Helmet title={title}>
      
      {cartItems.length > 0 ? (
        <> 
        <header className='cart-title'>
        <div className='cart-title-left'>
          <h2>Your basket</h2>
          <div className='cart-title-total-small'>
            <p>Subtotal</p>
            {accounting.formatMoney(cart.totalAmount)}
          </div>
        </div>
        <div className='cart-title-right'>
          <div className='cart-title-total-large'>
            <p>Subtotal</p>
            {accounting.formatMoney(cart.totalAmount)}
          </div>
          <Link to='/'><button onClick={checkout} className='cart-title-button'><i className="ri-shopping-cart-line"></i>&nbsp;Check out</button></Link>
        </div>
      </header>
        <section className='cartitems--container'>
          <ul className="cartitems--list">
            {
              cartItems?.map((item, i) => (
                item.id? (
                  <li key={i}>
                    <CartItemCard item={item}/>
                  </li>
                ):(
                  <></>
                )
              ))
          }
          </ul>
        </section>
        <div className="cart-final-total">
          <div className="cart-subtitle">
            <p>Subtotal</p>
            {accounting.formatMoney(cart.totalAmount)}
          </div>
          <div className="cart-shipping">
            <p className='cart-message'>Tax included and shipping calculated at checkout</p>
          </div>
          <Link to='/'><button className='primary-checkout'><i className="ri-shopping-cart-line"></i>&nbsp;Check out</button></Link>
          <Link to='/' className='cart-continue' onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver}>
  Continue shopping&nbsp;
  {showArrow ? (
    <i className="ri-arrow-right-line"></i>
  ) : (
    <i className="ri-arrow-right-s-line"></i>
  )}
</Link>
        </div>
        </>
    ):(
        <>
        <header className='cart-title'>
        <div className='cart-title-left'>
          <h2>Your basket</h2>
        </div>
        <div className='cart-title-right'>
          
        <Link to='/' className='cart-continue' onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver}>
  Continue shopping&nbsp;
  {showArrow ? (
    <i className="ri-arrow-right-line"></i>
  ) : (
    <i className="ri-arrow-right-s-line"></i>
  )}
</Link>
        </div>
      </header>
        <section className='cartitems--container-empty'>

          <div className="cartitems-empty">
            <p>Your basket is empty</p>
            <Link to='/'><button><i className="ri-shopping-cart-line"></i>&nbsp;Continue shopping</button>
  </Link>
          </div>
        </section>
   
        </>
      )}
      
    
    </Helmet>
  )
}
