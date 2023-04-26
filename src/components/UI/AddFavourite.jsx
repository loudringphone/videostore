import React from 'react'

import '../../styles/add-favourite.css'

const AddFavourite = (props) => {
  return (
    <div className='add-favourite'>
        <button>
            <i className="ri-heart-3-line"></i>
            <i class="ri-heart-3-fill" style={{display: 'none'}}></i>
            <span>Add to Wishlist</span>
        </button>
    </div>
  )
}

export default AddFavourite;
