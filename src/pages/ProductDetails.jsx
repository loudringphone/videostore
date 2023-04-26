import React, { useState, useEffect } from 'react'
import { Helmet } from '../components/helmet/Helmet'
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, Timestamp, doc, getDoc } from "firebase/firestore";
import {db} from '../firebase_setup/firebase';


import AddFavourite from '../components/UI/AddFavourite';
import '../styles/product-details.css'
import QuantitySelector from '../components/UI/QuantitySelector';

export const ProductDetails = () => {
  const [item, setItem] = useState([]);
  let {itemId} = useParams()
  itemId = itemId.substring(0, itemId.indexOf("-"));
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

  if (item) {
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
        
        <QuantitySelector item={item} />

        <AddFavourite itemId={itemId} />

        <p>{item.description}</p>
      </div>
    </div>
    </Helmet>
  );
          }
}
