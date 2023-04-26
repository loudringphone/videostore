import React, { useState, useEffect, useRef } from 'react'
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice';
import { toast } from "react-toastify";
import '../../styles/product-details.css'
import { Zoom } from 'react-toastify';

const QuantitySelector = (props) => {
    const item = props.item
    const [quantity, setQuantity] = useState(1);
    const [input, setInput] = useState(false);
    const inputRef = useRef()
    const handleSelect = (e) => {
        const value = e.target.value;
        if (value !== "10+") {
            setQuantity(Number(value));
        } else {
            setInput(true)
            setTimeout(() => {
                inputRef.current.focus();
            }, 0);
        }
    };

    const cart = useSelector(state => state.cart);
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
    const dispatch = useDispatch()
    const [overordering, setOverordering] = useState(false);

    const addToCart = () => {
        if (quantity > item.stock) {
            if (overordering === false) {
                toast.error(`You can't add more ${item.title} to the cart.`, { autoClose: false, className: "custom-toast-error", transition: Zoom })
                setOverordering(true)
            }
            
        } else {
            console.log(overordering)
            if (overordering === true) {
               toast.dismiss()
               setOverordering(false)
            }
            toast.success(<div>{quantity === 1? "Item" : "Items"} added to your cart: <br />
                        {item.title} <br />
                        {quantity} × ${item.price}</div>)
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
                defaultValue="1"
                onChange={handleSelect}
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
                onChange={handleSelect}
                onFocus={e => e.target.select()}
                style={input ? { display: 'block' } : { display: 'none' }}
                ref={inputRef}
                />
            </div>
            <i className="ri-arrow-down-s-line"></i>
            </div>
            { item?.stock &&  item.stock > 0 ? (
            <motion.button whileTap={{scale: 0.9}} className='add_cart' onClick={addToCart}>Add to cart</motion.button>
            ) : (
            <button className='sold_out'>Sold out</button>
            )}
        </div>
    )
}

export default QuantitySelector;
