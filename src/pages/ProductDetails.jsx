import React, { useState, useEffect } from 'react'
import { Helmet } from '../components/helmet/Helmet'
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, Timestamp, doc, getDoc } from "firebase/firestore";
import {db} from '../firebase_setup/firebase';


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
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        <p>{item.price}</p>
      </div>
    </div>
    </Helmet>
  );
}
