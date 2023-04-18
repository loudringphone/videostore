import React from 'react';
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import "../../styles/product-card.css";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cartActions } from '../../redux/slices/cartSlice';
import { toast } from "react-toastify";


const ProductCard = (item) => {

  const dispatch = useDispatch()
  const addToCart = () => {
    dispatch(cartActions.addItem({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
    }))

    toast.success(`item added successfully`)
  }


  const [buttonStyle, setButtonStyle] = useState({display: 'none'});
  const [cardStyle, setCardStyle] = useState({height: '320px', zIndex: '0', width: '230px'});
  const handleMouseEnter = function() {
    setButtonStyle({display: 'block'})
    const windowWidth = window.innerWidth;
      if (windowWidth < 770) {
        const newWidth = Math.max(150, Math.round(230 * (windowWidth / 770)));
        setCardStyle({height: '400px', zIndex: '99', width: `${newWidth}px`});
      } else {
        setCardStyle({height: '400px', zIndex: '99', width: '230px'});
      }
  };
  const handleMouseLeave = function() {
    const windowWidth = window.innerWidth;
      if (windowWidth < 770) {
        const newWidth = Math.max(150, Math.round(230 * (windowWidth / 770)));
        setCardStyle({height: '400px', zIndex: '0', width: `${newWidth}px`});
      } else {
        setButtonStyle({display: 'none'})
        setCardStyle({height: '320px', zIndex: '0', width: '230px'});
      }

  };

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;
      if (windowWidth < 770) {
        const newWidth = Math.max(150, Math.round(230 * (windowWidth / 770)));
        setButtonStyle({display: 'block'})
        setCardStyle({height: '400px', width: `${newWidth}px`});
      } else {
        setButtonStyle({display: 'none'})
        setCardStyle({width: '230px'});
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);





  return (
     <div className="product_item" 
          style={cardStyle}
          onMouseOver={handleMouseEnter}
          onMouseOut={handleMouseLeave}>
                        <div className="product_img" 
                            
                        >
                            <Link to={`/collections/all/${item.id}`}><motion.img whileHover={{scale:0.9}} src={item.image} alt={item.title}></motion.img></Link>
                        </div>
                    
                        <div className="product_card-bottom">
                            <div className="price_and_format">
                                <h5 className="price">${item.price}</h5>
                                <span>{item.format}</span>
                            </div>
                            <div className="product_name"><Link to={`/collections/all/${item.id}`}>{item.title}</Link></div>
                            {item.format === "CD" && <div className='originator'>{item.originator}</div>}
                            </div>
                            

                            <motion.button whileTap={{scale: 0.9}} style={buttonStyle} className='add_cart' onClick={addToCart}>Add to cart</motion.button>
                            
       </div>
  )
}

export default ProductCard;
