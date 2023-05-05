import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import useAuth from '../../custom-hook/useAuth'
import { doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth"
import { auth } from "../../firebase_setup/firebase"
import { toast } from "react-toastify"
import UserLineIcon from 'remixicon-react/UserLineIcon';
import Heart3LineIcon from 'remixicon-react/Heart3LineIcon';
import ShoppingCartLineIcon from 'remixicon-react/ShoppingCartLineIcon';
import MenuLineIcon from 'remixicon-react/MenuLineIcon';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';

import {db} from '../../firebase_setup/firebase';

import SearchBox from "../UI/SearchBox";

import logo from "../../assets/images/vs-logo.png"
import '../../styles/header.css';

const nav_links = [
    {
        path: 'all',
        category: 'shop',
        display: 'All'
    },
    {
        path: 'arrow',
        category: 'collections',
        display: 'Arrow'
    },
    {
        path: 'bfi',
        category: 'collections',
        display: 'BFI'
    },
    {
        path: 'indicator',
        category: 'collections',
        display: 'Indicator'
    },
    {
        path: '4kuhd',
        category: 'shop',
        display: '4K Ultra HD'
    },
    {
        path: 'bluray',
        category: 'shop',
        display: 'Blu-ray'
    },
    {
        path: 'cd',
        category: 'shop',
        display: 'CD'
    },
]

const Header = () => {
    const cart = useSelector(state => state.cart)
    const wishlist = useSelector(state => state.wishlist)
    const [headerStyle, setHeaderStyle] = useState(null);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [prevScrollY, setPrevScrollY] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuDisplay, setMobileMenuDisplay] = useState("none");

    useEffect(() => {
        function handleResize() {
        if (window.innerWidth <= 1020) {
            setIsMobile(true)
            setMobileMenuDisplay("inline");
            setHeaderStyle({height: '120px'});
            setIsNavVisible(false);
            
        } else {
            setIsMobile(false)
            setMobileMenuDisplay("none");
            if (window.scrollY <= 150) {
                setHeaderStyle({height: '105px'});
                setIsNavVisible(true);
            } else {
                setHeaderStyle({height: '80px'});
                setIsNavVisible(false);
            }
        }
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (window.innerWidth > 1020) {
                setIsNavVisible(currentScrollY < 150);
                if(currentScrollY <= 150) {
                    setHeaderStyle({height: '105px'})
                }
                else {setHeaderStyle({height: '80px'})}
                setPrevScrollY(currentScrollY);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollY]);

    const [mobileNavStyle, setMobileNavStyle] = useState({display: 'none', width: '0px'});
    const [navigationStyle, setNavigationStyle] = useState({display: 'none'});

    const handleClose = () => {
        document.body.classList.remove('scroll-locked');
        setMobileNavStyle({display: 'inline', width: '0px'});
        setNavigationStyle({display: 'none'})
        setTimeout(() => {
            setMobileNavStyle({display: 'none', width: '0px'});
        }, 300);
    };
    const handleOpen = () => {
        document.body.classList.add('scroll-locked');
        setMobileNavStyle({display: 'inline', width: '0px'});

        setTimeout(() => {
            if (window.innerWidth <= 325) {
                setMobileNavStyle({display: 'inline', width: '225px', top: window.scrollY});
            } else {
                setMobileNavStyle({display: 'inline', width: '325px', top: window.scrollY});
            }
        }, 1);
        setTimeout(() => {
            setNavigationStyle({display: 'block'})
        }, 200);
    };
    const handleClick = () => {
        setHeaderStyle({overflow: 'visible'})
    }

    const currentUser = useAuth()

    const {pathname} = useLocation()
    const navigate = useNavigate()
    const logout = async (event) => {
        event.preventDefault()
        async function updateUserWishlist() {
            const userRef = doc(db, "customers", currentUser.uid);
            await updateDoc(userRef, {
                wishlist: wishlist
              });
        }

        async function updateUserCart() {
            const userRef = doc(db, "customers", currentUser.uid);
            await updateDoc(userRef, {
                cart: cart
              });
        }
       
        try {
            await updateUserWishlist();
            await updateUserCart();
            await signOut(auth).then(() => {
                toast.success("Successfully logged out.", {autoClose: 1500});
                if (pathname==="/apps/wishlist" || pathname==="/cart" || pathname==="/checkout" || pathname==="/account") {
                    navigate('/');
                }
            }).catch(error => {
                console.log(error.message);
            })
        } catch(error){
            console.log(error.message);
            await signOut(auth).then(() => {
                toast.success("Successfully logged out.", {autoClose: 1500});
                if (pathname==="/apps/wishlist" || pathname==="/cart" || pathname==="/checkout" || pathname==="/account") {
                    navigate('/');
                }
            }).catch(error => {
                console.log(error.message);
            })
        }
    }

    return (
        <>
            <div className="mobile-nav-overlay" style={navigationStyle} onClick={handleClose}></div>
            <header className='header' style={headerStyle}>
               
                        <div className="nav_wrapper">
                            <div className="mobile_menu" style={{ display: mobileMenuDisplay }} onClick={handleOpen}>
                                <span>
                                    <MenuLineIcon size={30} />
                                </span>
                            </div>
                            

                            <NavLink className="logo" to='/'>
                                <div className="logo">
                                    <img src={logo} alt="logo" />
                                    <h3>Video Store</h3>
                                </div>
                            </NavLink>
                            <div className="search_box">
                                <SearchBox onClick={handleClick}/>
                            </div>
                            <div className="navigation" >
                                { !isMobile ? (
                                    <div className="nav_icons" >
                                     { currentUser ? (
                                         <span className="user_icon"><NavLink to='account' ><UserLineIcon size={30} /></NavLink><div className="account-links"><span><NavLink to='account'>My Account</NavLink></span> <NavLink onClick={logout} to='account/logout'>Logout</NavLink></div></span>
                                     ): (
                                         <NavLink to='account/login'><span className="user_icon"><UserLineIcon size={30} /> Login</span></NavLink>)}
                                 
                                     <NavLink to='apps/wishlist'><span className="fav_icon"><Heart3LineIcon size={30} />
                                     {wishlist.length > 0 && (
                                         <span className="badge" style={{fontSize: wishlist.length > 99? "10px" : ""}}>
                                             {wishlist.length > 99 ? "99+" : wishlist.length}
                                         </span>
                                     )}
                                     </span></NavLink>
                                     <NavLink to='cart' className="badge-cart"><span className="cart_icon"><ShoppingCartLineIcon size={30} />
                                     {cart.totalQuantity > 0 && (
                                         <span className="badge-cart" style={{fontSize: cart.totalQuantity > 99? "10px" : ""}}>
                                             {cart.totalQuantity > 99 ? "99+" : cart.totalQuantity}
                                         </span>
                                     )}
                                     </span></NavLink>

                                    </div>
                                ):(
                                    <div className="nav_icons" >
                                        <NavLink to='cart' className="badge-cart"><span className="cart_icon"><ShoppingCartLineIcon size={30} />
                                        {cart.totalQuantity > 0 && (
                                            <span className="badge-cart" style={{fontSize: cart.totalQuantity > 99? "10px" : ""}}>
                                                {cart.totalQuantity > 99 ? "99+" : cart.totalQuantity}
                                            </span>
                                        )}
                                        </span></NavLink>
                                    </div>
                                )}
                                   
                                    
                                
                            </div>
                        </div>




                        <ul id='nav' style={{ display: isNavVisible ? 'flex' : 'none',
                    opacity: isNavVisible ? '1' : '0' }}>
                            {
                                nav_links.map((item, index) => (
                                    <li className="nav_item" key={index}>
                                        <NavLink
                                            to={item.category + '/' + item.path} 
                                            className={(navClass) => 
                                                navClass.isActive ? "nav_active" : ""
                                            }
                                        >
                                            {item.display}
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>

                        <div className="mobile_search_box">
                            <SearchBox onClick={handleClick}/>
                        </div>
            </header>
            <div className="mobile_nav"  style={mobileNavStyle}>
                                <div>
                                    <div className="navigation" style={navigationStyle}>
                                        <ul className="menu">
                                            <div className="nav_icons">
                                            { currentUser ? (
                                                <div className="account-links"><span><NavLink to='account' onClick={handleClose}>My Account</NavLink></span> <NavLink to='account/logout' onClick={logout}>Logout</NavLink></div>
                                            ):(
                                                <span className="user_icon" onClick={handleClose}><NavLink to='account/login'><UserLineIcon size={30} />Login</NavLink></span>
                                            )}
                                                
                                                <span className="fav_icon" onClick={handleClose}><NavLink to='apps/wishlist'><Heart3LineIcon size={30} />
                                                {wishlist.length > 0 && (
                                                    <span className="badge" style={{fontSize: wishlist.length > 99? "10px" : ""}}>
                                                        {cart.totalQuantity > 99 ? "99+" : wishlist.length}
                                                    </span>
                                                )}
                                        </NavLink></span>
                                                

                                            </div>
                                            <span className="close_icon" onClick={handleClose}><CloseLineIcon size={30} />
                                            </span>
                                        </ul>
                                        <ul className="quick_links">
                                            <li onClick={handleClose}><Link to='shop/all'>All products</Link></li>
                                            <li onClick={handleClose}><Link to='collections/arrow'>Arrow</Link></li>
                                            <li onClick={handleClose}><Link to='collections/bfi'>BFI</Link></li>
                                            <li onClick={handleClose}><Link to='collections/indicator'>Indicator</Link></li>
                                            <li onClick={handleClose}><Link to='shop/4kuhd'>4K Ultra HD</Link></li>
                                            <li onClick={handleClose}><Link to='shop/bluray'>Blu-ray</Link></li>
                                            <li onClick={handleClose}><Link to='shop/cd'>CD</Link></li>
            </ul>
                                    </div>
                                </div>
                            </div>
        </>
    )
}

export default Header