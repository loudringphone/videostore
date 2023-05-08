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


export const Checkout = (props) => {
  const currentUser = props.currentUser;
  const [userData, setUserData] = useState({})
  const cart = useSelector(state => state.cart)
  const [cartItemIds, setCartItemIds] = useState([])
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  useEffect(() => {
    if (currentUser != null) {       
        console.log('fetching user')
        const fetchUser = async () => {
            const docRef = doc(db, "customers", currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserData(docSnap.data());
            } else {
            // docSnap.data() will be undefined in this case
            console.log("No such user!");
            }
            }
            fetchUser()
            
    }
  }, [currentUser])

  const fetchItems = async () => {
    const newData = await firebaseQuery(cartItemIds, "products");
    setItems(newData);
    console.log('fetch items')
  }
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    setTimeout(() => {
      setLoading(false);
    }, 1500);

  }, [cart]);
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
    if (cartItemIds.length > 0) {
      fetchItems();
    }
  }, [cartItemIds])






  if (loading) {
    return (
      <Helmet title='Shipping'>

    <section className='checkout' style={{alignItems: 'center'}}>
      <div className='loading-shipping'>
        <img src={processing} alt="processing" style={{height: '20px'}}/>
        &nbsp;Generating shipping informaiton...
      </div>
    </section>
    </Helmet>
    )
  }
  return (
    <Helmet title='Shipping'>

    <section className='checkout'>
      <CartSection
        items={items}
        cart={cart}
      />
      
      <AddressSection
        userData={userData}
        cartItemIds={cartItemIds}
      />





    </section>
    </Helmet>

  )
}
