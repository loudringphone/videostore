import React, { useState, useEffect } from 'react'
import { Helmet } from '../components/helmet/Helmet'
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { collection, query, where, getDocs, Timestamp, doc, getDoc } from "firebase/firestore";
import {db} from '../firebase_setup/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { toast } from "react-toastify";

import AddFavourite from '../components/UI/AddFavourite';
import '../styles/product-details.css'

export const ProductDetails = () => {
  const [item, setItem] = useState([]);
  const {itemId} = useParams()
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const docRef = doc(db, "items", itemId);

    const fetchItem = async () => {
      setLoading(true);
      try {
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        setItem(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItem();
  }, [itemId]);;



  const [quantity, setQuantity] = useState(1);
  const handleSelect = (e) => {
    const value = e.target.value;
    if (value != "10+") {
      setQuantity(Number(value));
    } 
  };

  const cart = useSelector(state => state.cart);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  const dispatch = useDispatch()
  const addToCart = () => {
    toast.success(<div>Item added to your cart: <br />
                  {item.title} <br />
                  1 × ${item.price}</div>)
    setTimeout(() => {
      dispatch(cartActions.addItem({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: quantity,
      }))
    }, 500);
    
  }

  
  if (loading) {
    return (
      <Helmet title="Fetching the product information...">
      <div className="productDetails" style={{display: 'flex',
        alignItems: 'center'}}>
        <p className='loading'>Fetching the product information...</p>
      </div>
      </Helmet>)
      
  }

  return (
    <Helmet title={item.title}>
    <div className="productDetails">
      <div className="product_img">
        <img src={item.image[0].downloadURL} alt={item.title}></img>
      </div>
      <div className="product_info">
        <h1 className='product-title'>{item.title}</h1>
        <p style={{fontWeight: "700"}}>{item.format}</p>
        <p className='product-price'>${item.price}</p>
        <p className='product-stock-level'>
          <span className='product-stock-level-availability'>Availability:&nbsp;</span>
            {item.stock > 25 ? (
              <span className="product-stock-level-high">
                <i className="ri-checkbox-circle-line"></i>&nbsp;Available
              </span>
            ) : (
              item.stock === 0 ? (
                <span className="product-stock-level-sold-out">
                  <i className="ri-close-circle-line"></i>&nbsp;Sold out
                </span>
              ) : (
                <span className="product-stock-level-low">
                  <i className="ri-error-warning-line"></i>
                  &nbsp;Low stock
                </span>
              )
            )}
        </p>
        <div className="form-button-wrapper">
          <div className="form-field-select-wrapper">
            <div>
              <label className="form-field-title">
                  Quantity
              </label>
              <select 
                id="product-quantity-select"
                className="form-field"
                aria-label="Quantity"
                defaultValue="1"
                onChange={handleSelect}
              >
                <option value="1">
                  1
                </option>
                <option value="2">
                  2
                </option>
                <option value="3">
                  3
                </option>
                <option value="4">
                  4
                </option>
                <option value="5">
                  5
                </option>
                <option value="6">
                  6
                </option>
                <option value="7">
                  7
                </option>
                <option value="8">
                  8
                </option>
                <option value="9">
                  9
                </option>
                <option value="10+">
                  10+
                </option>
              </select>
            </div>
            <i className="ri-arrow-down-s-line"></i>
          </div>
          { item?.stock &&  item.stock > 0 ? (
            <motion.button whileTap={{scale: 0.9}} className='add_cart' onClick={addToCart}>Add to cart</motion.button>
          ) : (
            <button className='sold_out'>Sold out</button>
          )}
        </div>

        <AddFavourite itemId={itemId} />

        <p>{item.description}</p>
      </div>
    </div>
    </Helmet>
  );
}
