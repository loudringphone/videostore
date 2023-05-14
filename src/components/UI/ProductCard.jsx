import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import "../../styles/product-card.css";
import "../../styles/add-favourite.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice';
import { toast } from "react-toastify";
import AddFavourite from './AddFavourite';
import accounting from 'accounting'

const ProductCard = (props) => {
  const item = props.item;
  let {pathname} = useLocation()
  if (pathname === '/') {
    pathname = '/products'
  }
  const cart = useSelector(state => state.cart);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  const dispatch = useDispatch();
  const addToCart = () => {
    toast.dismiss()
    toast(
        <div className='toast-message'>
          <div className="product_img">
            <img src={item.image && item.image[0]?.downloadURL} alt={item.name}></img>
          </div>

          <div className='toast-text'><span>Item added to your cart: </span><br />
          {item.name} <br />
          1 × {accounting.formatMoney(item.price)}</div>
        </div>
        )
    setTimeout(() => {
      dispatch(cartActions.addItem({
        id: item.id,
        name: item.name,
        price: item.price,
      }))
    }, 500); 
  }


  const [buttonStyle, setButtonStyle] = useState({display: 'none'});
  const [cardStyle, setCardStyle] = useState({height: '360px', zIndex: '0'});
  const handleMouseEnter = function() {
    setButtonStyle({display: 'block'})
    const windowWidth = window.innerWidth;
      if (windowWidth > 768) {
        setCardStyle({height: '400px', zIndex: '99'});
      } 
  };
  const handleMouseLeave = function() {
    const windowWidth = window.innerWidth;
      if (windowWidth <= 768) {
        setCardStyle({height: '400px', zIndex: '0'});
      } else if (windowWidth > 768) {
        setButtonStyle({display: 'none'})
        setCardStyle({height: '360px', zIndex: '0'});
      }

  };

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 768) {
        setButtonStyle({display: 'block'})
        setCardStyle({height: '400px'});
      } else if (windowWidth > 768) {
        setButtonStyle({display: 'none'})
        setCardStyle({height: '360px', zIndex: '0'});
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  let itemURL = item.id + '-' + item.name.toLowerCase().replace(/[^a-z0-9'""]/g, "-").replace(/['"]/g, "");
  if (itemURL.endsWith("-")) {
    itemURL = itemURL.slice(0, -1);
  };

  return (
     <div className="product_card" 
          style={cardStyle}
          onMouseOver={handleMouseEnter}
          onMouseOut={handleMouseLeave}>
                        <div className="product_img">
                            <AddFavourite itemId={item.id} />
                            <Link to={{ pathname: `${pathname}/${itemURL}` }}>
                              { pathname !== "/apps/wishlist" ? (
                                <motion.img whileHover={{scale:0.9}} src={item.image[0]?.downloadURL} alt={item.name}></motion.img>
                              ) : (
                                <motion.img whileHover={{scale:1.2}} style={{width: "70%" }} src={item.image[0]?.downloadURL} alt={item.name}></motion.img>
                              )}
                            </Link>
                        </div>
                    
                        <div className="product_card-bottom">
                            <div className="price_and_format">
                                <h5 className="price">{accounting.formatMoney(item.price)}</h5>
                                <span>{item.format}</span>
                            </div>
                            <div className="product_name">
                            {pathname === "/apps/wishlist" ? (
                              <Link to={{ pathname: `/products/${itemURL}`}}>{item.name}</Link>
                            ):(
                              <Link to={{ pathname: `${pathname}/${itemURL}`}}>{item.name}</Link>
                            )}
                              
                            </div>
                            {item.format === "CD" && <div className='originator'>{item.originator}</div>}
                            <p className='product-stock-level'>
                                {item.stock > 25 ? (
                                  <span className="product-stock-level-high">
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
                                )}
                            </p>

                            </div>

                            { item?.stock &&  item.stock > 0 ? (
                              <motion.button whileTap={{scale: 0.9}} style={buttonStyle} className='add-cart' onClick={addToCart}>Add to cart</motion.button>
                            ) : (
                              <button style={buttonStyle} className='sold-out'>Sold out</button>
                            )}
                            

                            
                            
       </div>
  )
}

export default ProductCard;
