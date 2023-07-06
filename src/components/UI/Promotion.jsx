import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { collection, query, getDocs } from "firebase/firestore";
import {db} from '../../firebase_setup/firebase';

import '../../styles/promotion.css';

const Promotion = () => {

  const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const q = query(collection(db, "promotions"))
        await getDocs(q)
        .then((querySnapshot) => {
            const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }))
            setItems(newData.slice(0, 3));})
    }
    useEffect(()=>{
      fetchItems();
  }, [])

  
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div id="showcase">
      <Slider {...settings}>

            {
          items && items.map((item, i) => (
            <div key={i} className="box">
              {/* <Link to={`people/${item.name.replace(' ','').toLowerCase()}`}> */}
                <img src={item.image && item.image[0]?.downloadURL} alt={item.name} />
                {item.pathname ?
                
                <Link to={item.pathname}><button className='slide_button'>Shop Now</button></Link>
                :
                <></>}

{/* </Link> */}
            </div>
            ))
        }
            {/* <div className="promotion">
              <h3 className='end'>MUST END MONDAY</h3>
              <h1>AUTUMN SAVINGS! <span className='discount'>10% OFF</span> <span className='everything'>EVERYTHING</span> WHEN YOU SPEND $100</h1>
              <h3 className='code'>USE CODE AUTUMN10</h3>
            </div> */}
      </Slider>
    </div>
    
  )
}

export default Promotion;
