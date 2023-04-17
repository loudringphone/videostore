import React from 'react'
import { Link } from "react-router-dom"

import logo from "../../assets/images/vs-logo.png"
import './footer.css';



export const Footer = () => {

  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer1">
            <div className="logo">
            <img src={logo} alt="logo" />
            <h4>Video Store</h4>
            </div>
            <p className="footer_text mt-1">
              Specialised in Blu-rays and CDs based in Sydney, Australia
            </p>
            <p className="copyright">Copyright © {year} developed by Winston Lau</p>
      </div>
      <div className="footer2">
        <div className="footer_quick-links">
          <h4 className="quick-link_titles">
            Top Categories
          </h4>
          <ul>
            <li><Link to='collections/arrow'>Arrow</Link></li>
            <li><Link to='collections/bfi'>BFI</Link></li>
            <li><Link to='collections/indicator'>Indicator</Link></li>
            <li><Link to='shop/4kuhd'>4K Ultra HD</Link></li>
            <li><Link to='shop/bluray'>Blu-ray</Link></li>
            <li><Link to='shop/cd'>CD</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer3">
        <div className="footer_quick-links">
          <h4 className="quick-link_titles">
            Useful Links
          </h4>
          <ul>
            <li><Link to='shop/all'>Shop</Link></li>
            <li><Link to='cart'>Cart</Link></li>
            <li><Link to='login'>Login</Link></li>
            <li><Link to='policy'>Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer4">
      <div className="footer_quick-links">
          <h4 className="quick-link_titles">
            Contact
          </h4>
          <ul>
            <li><span><i class="ri-phone-line"></i></span>+61-422-882-062</li>
            <li><span><i class="ri-mail-line"></i></span><a href="wingfunglau@gmail.com">wingfunglau@gmail.com</a></li>
            <li><span><i class="ri-github-line"></i></span><a href="https://github.com/loudringphone">https://github.com/loudringphone</a></li>
            <li><span><i class="ri-linkedin-box-line"></i></span><a href="https://www.linkedin.com/in/winston-lau">https://www.linkedin.com/in/winston-lau</a></li>
          </ul>
        </div>
      </div>

      
          
    </footer>
  )
}
