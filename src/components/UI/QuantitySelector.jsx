import React, { useState, useEffect, useRef } from 'react'
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice';
import { toast } from "react-toastify";
import { Zoom } from 'react-toastify';
import { useLocation } from "react-router-dom";
import accounting from 'accounting'
import '../../styles/product-details.css'

const QuantitySelector = (props) => {
    const item = props.item
    const [quantity, setQuantity] = useState( item.quantity || 1 );
    const [oldQuantity, setOldQuantity] = useState(0);
    const [input, setInput] = useState(false);
    const inputRef = useRef()
    const {pathname} = useLocation()
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch()
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        if (cart.cartItems.length > 0) {
            for (let cartItem of cart.cartItems) {
                if (cartItem.id === item.id) {
                    setOldQuantity(cartItem.quantity)
                    setQuantity(cartItem.quantity)
                }
            }
        }
    }, [item, cart]);
    useEffect(() => {
        if (quantity > 9) {
            setInput(true)
        }
    }, [oldQuantity]);
    const handleInputBlur = (e) => {
        const value = e.target.value;
        if (pathname === '/cart' && value === "") {
            if (document.activeElement !== inputRef.current) {
                setQuantity(oldQuantity)
            }
        }
    }
    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (pathname === '/cart') {
            if (value === "10+") {
                setInput(true)
                setTimeout(() => {
                    inputRef.current.focus();
                    setQuantity(10);
                    if (item.stock < 10) {
                        toast.dismiss()
                        toast.error(`You can't add more ${item.title} to the cart.`, { className: "custom-toast-error", transition: Zoom })
                    setQuantity(oldQuantity);
                    } else {
                        setQuantity(10);
                        setTimeout(() => {
                            dispatch(cartActions.amendItem({
                                id: item.id,
                                quantity: 10,
                            }))
                            }, 500);
                    }
                }, 0); 
            } else {
                if (value > (item.stock)) {
                    toast.dismiss()
                    toast.error(`You can't add more ${item.title} to the cart.`, { className: "custom-toast-error", transition: Zoom })
                setQuantity(oldQuantity);
                } else {
                    setQuantity(Number(value));
                    setTimeout(() => {
                        dispatch(cartActions.amendItem({
                            id: item.id,
                            quantity: Number(value),
                        }))
                        }, 500);
                }
            }
        } else {
            if (value !== "10+") {
                setQuantity(Number(value));
            } else {
                setInput(true)
                setTimeout(() => {
                    inputRef.current.focus();
                }, 0);
            }
        }
    };
    
    
    
    const [overordering, setOverordering] = useState(false);

    const addToCart = () => {
        if (pathname && pathname != '/cart') {
            if (quantity > item.stock - oldQuantity) {
                if (overordering === false) {
                    toast.dismiss()
                    toast.error(`You can't add more ${item.title} to the cart.`, { autoClose: false, className: "custom-toast-error", transition: Zoom })
                    setOverordering(true)
                }
                
            } else {
                toast.dismiss()
                if (overordering === true) {
                //    toast.dismiss()
                   setOverordering(false)
                }
                toast(
                    <div className='toast-message'>
                      <div className="product_img">
                        <img src={item.image[0].downloadURL} alt={item.title}></img>
                      </div>
            
                      <div className='toast-text'><span>Item added to your cart: </span><br />
                      {item.title} <br />
                      {quantity} × {accounting.formatMoney(item.price)}</div>
                    </div>
                    )
                setTimeout(() => {
                dispatch(cartActions.addItem({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                    stock: item.stock,
                    quantity: quantity,
                }))
                }, 500);
            }
        }
        
    }


    return (
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
                value={quantity || ""}
                onChange={handleQuantityChange}
                style={input ? { display: 'none' } : { display: 'block' }}
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
                <input 
                type="number"
                className="form-field"
                value={quantity || ""}
                onChange={handleQuantityChange}
                onBlur={handleInputBlur}
                // onFocus={e => e.target.select()}
                style={input ? { display: 'block' } : { display: 'none' }}
                ref={inputRef}
                />
            </div>
            <i className="ri-arrow-down-s-line" style={input ? { display: 'none' } : { display: 'block' }}></i>
            </div>
            { item?.stock &&  item.stock > 0 ? (
            <motion.button whileTap={{scale: 0.9}} className='add-cart' onClick={addToCart}>Add to cart</motion.button>
            ) : (
            <button className='sold-out'>Sold out</button>
            )}
        </div>
    )
}

export default QuantitySelector;
