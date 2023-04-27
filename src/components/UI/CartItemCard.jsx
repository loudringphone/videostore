import React from 'react';
import "../../styles/cart-item-card.css";
import { Link } from "react-router-dom";
import QuantitySelector from './QuantitySelector';
import { motion } from "framer-motion";


const CartItemCard = (props) => {
  const item = props.item;
  let itemURL = item.id + '-' + item.title.toLowerCase().replace(/[^a-z0-9'""]/g, "-").replace(/['"]/g, "");
  if (itemURL.endsWith("-")) {
    itemURL = itemURL.slice(0, -1);
  };
 



  return (
     <div className="cart-item-card" >
                        <div className="product_img">
                            <Link to={{ pathname: `/products/${itemURL}` }}>
                                <img src={item.image[0].downloadURL} alt={item.title}></img>
                            </Link>
                        </div>
                        <div className="cart-item--inner">
                            <div className="card-item--content">
                                <Link to={{ pathname: `/products/${itemURL}` }}>{item.title}</Link>
                                <p className="price">Price ${item.price}</p>
                                
                                <p className='product-stock-level'>
                                    {item.stock > 25 ? (
                                    <span className="product-stock-level-high" style={{display:'none'}}>
                                        Available
                                    </span>
                                    ) : (
                                    item.stock === 0 ? (
                                        <span className="product-stock-level-sold-out">
                                        Sold out
                                        </span>
                                    ) : (
                                        <span className="product-stock-level-low">
                                        Low stock
                                        </span>
                                    )
                                    )}
                                </p>
                            </div>

                            
                                <QuantitySelector item={item}/>
                                <div className="cart-item--info">
                                <div className="money">
                                    ${item.totalPrice}
                                </div>
                                <motion.i whileHover={{scale:1.1}}className="ri-close-circle-fill"></motion.i>
                            </div>
                        </div>
       </div>
  )
}

export default CartItemCard;
