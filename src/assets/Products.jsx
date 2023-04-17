import { collection, getDocs } from "firebase/firestore";
import {db} from '../firebase_setup/firebase';
import { useState, useEffect } from 'react';
import { motion } from "framer-motion"
import { Col } from "reactstrap"
import "../styles/product-card.css"

const Products = () => {
   const [items, setItems] = useState([]);
 
    const fetchItem = async () => {
       
        await getDocs(collection(db, "items"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setItems(newData);                
                console.log(items, newData);
            })
       
    }
   
    useEffect(()=>{
        fetchItem();
    }, [])

    // const a = items[0].image
    return (
       
            // JSON.stringify(items)
          
            <section className="products">
                {
                    items?.map((item,i)=>(
                        <Col lg='3' md='4'>
                        <div className="product_item" key={i}>
                        <div className="product_img">
                            <img src={item.image} alt={item.title}></img>
                        </div>
                        <h3 className="product_name">{item.title}</h3>
                        <span>{item.format}</span>
                        <div className="product_card-bottom">
                            <span className="price">${item.price}</span>
                            <span><i class="ri-add-line"></i></span>
                        </div>
                        </div>
                        </Col>
                        
                    ))
                }
            </section>



    )
}

export default Products