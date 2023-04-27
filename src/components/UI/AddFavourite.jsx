import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { wishlistActions } from '../../redux/slices/wishlistSlice';

import '../../styles/add-favourite.css'

const AddFavourite = (props) => {
    const itemId = props.itemId;
    const wishlist = useSelector(state => state.wishlist);
    useEffect(() => {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);
    const dispatch = useDispatch();
    const toggleFavourite = () => {
        if (!wishlist.includes(itemId)) {
            dispatch(wishlistActions.addItem(itemId))
        } else {
            dispatch(wishlistActions.removeItem(itemId))
        }
    }
    const [favourite, setFavourite] = useState(null)
    useEffect(() => {
        if (wishlist.includes(itemId)) {
          setFavourite(true);
        } else {
          setFavourite(false);
        }
      }, [wishlist, itemId]);
    
    const {pathname} = useLocation()
    if (pathname === '/apps/wishlist') {
        return (
            <div className='remove-favourite'>
                <button onClick={toggleFavourite}>
                    <i className="ri-close-line"></i>
                </button>
            </div>

        )
    }

    
  return (
    <div className='add-favourite'>
        <button onClick={toggleFavourite}>
            <i className="ri-heart-3-line" style={favourite ? { display: 'none' } : { display: 'block' }}></i>
            <i className="ri-heart-3-fill" style={favourite ? { display: 'block' } : { display: 'none' }}></i>
            <span>{favourite ? "In Wishlist" : "Add to Wishlist"}</span>
        </button>
    </div>
  )
}

export default AddFavourite;
