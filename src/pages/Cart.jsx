import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import {db} from '../firebase_setup/firebase';
import {documentId} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Helmet } from '../components/helmet/Helmet'
import { cartActions } from '../redux/slices/cartSlice';
import CartItemCard from '../components/UI/CartItemCard';
import accounting from 'accounting'

import '../styles/cart.css'

export const Cart = () => {
  const cart = useSelector(state => state.cart)
  const [cartItemIds, setCartItemIds] = useState([])
  const [items, setItems] = useState([]);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  const dispatch = useDispatch();
  useEffect(()=>{
    for (let item of items) {
      dispatch(cartActions.addItem({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        stock: item.stock,
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
    // console.log(cart.cartItems)
  }, [cart])
  useEffect(()=>{
    if (cartItemIds.length > 0) {
      fetchItems();
    }
  }, [])

  let title = "Your Basket";
  let q = query(collection(db, "empty"))
  const [loading, setLoading] = useState(true);
  if (cartItemIds.length >= 1 && cartItemIds.length === cart.cartItems.length) {
    q = query(collection(db, "items"), where(documentId(), 'in', cartItemIds));
  }
  const fetchItems = async () => {
    setLoading(true);
    await getDocs(q)
        .then((querySnapshot) => {
            const newData = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }))
                .sort((a, b) => {
                    const aTime = new Timestamp(a.createdAt.seconds, a.createdAt.nanoseconds).toDate();
                    const bTime = new Timestamp(b.createdAt.seconds, b.createdAt.nanoseconds).toDate();
                    return bTime - aTime;
                }); // Sort by createdAt field
            
            setItems(newData);
            console.log(items, newData);
            setLoading(false)
        });
  }

  const [showArrow, setShowArrow] = useState(false);

  const handleMouseOver = () => {
    setShowArrow(true);
  }

  const handleMouseLeave = () => {
    setShowArrow(false);
  }

  return (
    <Helmet title={title}>
      
      {cart.cartItems.length > 0 ? (
        <>        <header className='cart-title'>
        <div className='cart-title-left'>
          <h1>Your basket</h1>
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
          <Link to='/'><button className='cart-title-button'><i className="ri-shopping-cart-line"></i>&nbsp;Check out</button></Link>
        </div>
      </header>
        <section className='cartitems--container'>
          <ul className="cartitems--list">
            {
              cart.cartItems?.map((item, i) => (
                item.id? (
                  <li key={i}>
                    <CartItemCard key={i} item={item}/>
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
        <section className='cartitems--container-empty'>

          <div className="cartitems-empty">
            <p>Your basket is empty</p>
            <Link to='/'><button><i className="ri-shopping-cart-line"></i>&nbsp;Continue shopping</button>
  </Link>
          </div>
        </section>
      )}
      
    
    </Helmet>
  )
}
