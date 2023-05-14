import React from 'react';
import "../../styles/cart-item-card.css";
import { Link } from "react-router-dom";
import QuantitySelector from './QuantitySelector';
import { motion } from "framer-motion";
import accounting from 'accounting'
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice';

const CartItemCard = (props) => {
  const item = props.item;
  let itemURL = item.id
  if (item.name) {
    itemURL = item.id + '-' + item.name.toLowerCase().replace(/[^a-z0-9'""]/g, "-").replace(/['"]/g, "");
  }
  if (itemURL.endsWith("-")) {
    itemURL = itemURL.slice(0, -1);
  };

  const dispatch = useDispatch()
  const removeCartItem = () => {
    dispatch(cartActions.removeItem({
        id: item.id,
    }))
  }
 



  return (
     <div className="cart-item-card" >
                        <div className="product_img">
                            <Link to={{ pathname: `/products/${itemURL}` }}>
                                {item.image[0]?.downloadURL !== "" ? (
                                    <img src={item.image[0]?.downloadURL} alt={item.name}></img>
                                ):(
                                    <></>
                                )}
                            </Link>
                        </div>
                        <div className="cart-item--inner">
                            <div className="card-item--content">
                                <Link to={{ pathname: `/products/${itemURL}` }}>{item.name}</Link>
                                <p className="price"><span>Price </span>{accounting.formatMoney(item.price)}</p>
                                
                                <p className='product-stock-level'>
                                    {item.stock? (
                                    item.stock > 25 ? (
                                    <span className="product-stock-level-high" style={{display:'none'}}>
                                        Available
                                    </span>
                                    ) : (
                                    item.stock <= 0 ? (
                                        <span className="product-stock-level-sold-out">
                                        Sold out
                                        </span>
                                    ) : (
                                        <span className="product-stock-level-low">
                                        Low stock
                                        </span>
                                    )
                                    )
                                    ):(<></>)}
                                </p>
                            </div>

                            
                                <QuantitySelector item={item}/>
                                <div className="cart-item--info">
                                <div className="money">
                                    {accounting.formatMoney(item.totalPrice)}
                                </div>
                                <motion.i whileHover={{scale:1.1}}className="ri-close-circle-fill" onClick={removeCartItem}></motion.i>
                            </div>
                        </div>
       </div>
  )
}

export default CartItemCard;
