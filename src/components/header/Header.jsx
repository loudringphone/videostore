import React, { useState, useEffect } from "react";
import { NavLink, Link } from 'react-router-dom';
import { Container, Row } from "reactstrap"

import logo from "../../assets/images/vs-logo.png"

import UserLineIcon from 'remixicon-react/UserLineIcon';
import Heart3LineIcon from 'remixicon-react/Heart3LineIcon';
import ShoppingCartLineIcon from 'remixicon-react/ShoppingCartLineIcon';
import MenuLineIcon from 'remixicon-react/MenuLineIcon';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';
import { useSelector } from "react-redux"

import SearchBox from "../UI/SearchBox";
import './header.css';

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
    const totalQuantity = useSelector(state => state.cart.totalQuantity)

    const [headerStyle, setHeaderStyle] = useState(null);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [prevScrollY, setPrevScrollY] = useState(0);

    


    const [navDisplay, setNavDisplay] = useState("inline");
    const [mobileMenuDisplay, setMobileMenuDisplay] = useState("none");

    useEffect(() => {
        function handleResize() {
        if (window.innerWidth <= 1020) {
            setNavDisplay("none");
            setMobileMenuDisplay("inline");
            setHeaderStyle({height: '135px'});
            setIsNavVisible(false);
            
        } else {
            setNavDisplay("inline");
            setMobileMenuDisplay("none");
            if (window.scrollY <= 150) {
                setHeaderStyle({height: '100px'});
                setIsNavVisible(true);
            } else {
                setHeaderStyle({height: '70px'});
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
                    setHeaderStyle({height: '100px'})
                }
                else {setHeaderStyle({height: '70px'})}
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
            setMobileNavStyle({display: 'inline', width: '325px', top: window.scrollY});
        }, 1);
        setTimeout(() => {
            setNavigationStyle({display: 'block'})
        }, 200);
    };





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
                                <SearchBox />
                            </div>
                            <div className="navigation" >
                                <ul className="menu">
                                    <div className="nav_icons" >
                                        <span className="user_icon" style={{ display: navDisplay }}><NavLink to='login'><UserLineIcon size={30} /> Login</NavLink></span>
                                        <span className="fav_icon" style={{ display: navDisplay }}><NavLink to='apps/wishlist'><Heart3LineIcon size={30} /><span className="badge">1</span></NavLink></span>
                                        <span className="cart_icon"><NavLink to='cart'><ShoppingCartLineIcon size={30} />
                                        {totalQuantity > 0 && <span className="badge-cart">{totalQuantity}</span>}
                                        </NavLink></span>

                                    </div>
                                    
                                </ul>
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
                            <SearchBox />
                        </div>
            </header>
            <div className="mobile_nav"  style={mobileNavStyle}>
                                <div>
                                    <div className="navigation" style={navigationStyle}>
                                        <ul className="menu">
                                            <div className="nav_icons">
                                                <span className="user_icon" onClick={handleClose}><NavLink to='login'><UserLineIcon size={27} /> Login</NavLink></span>
                                                <span className="fav_icon" onClick={handleClose}><NavLink to='apps/wishlist'><Heart3LineIcon size={27} /><span className="badge">1</span></NavLink></span>
                                                

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