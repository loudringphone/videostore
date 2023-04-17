import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Container, Row } from "reactstrap"

import logo from "../../assets/images/vs-logo.png"

import UserLineIcon from 'remixicon-react/UserLineIcon';
import Heart3LineIcon from 'remixicon-react/Heart3LineIcon';
import ShoppingCartLineIcon from 'remixicon-react/ShoppingCartLineIcon';
import MenuLineIcon from 'remixicon-react/MenuLineIcon';

import { useSelector } from "react-redux"

import './header.css';

const nav_links = [
    {
        path: 'all',
        display: 'All'
    },
    {
        path: 'arrow',
        display: 'Arrow'
    },
    {
        path: 'bfi',
        display: 'BFI'
    },
    {
        path: 'indicator',
        display: 'Indicator'
    },
]

const Header = (props) => {
    const totalQuantity = useSelector(state => state.cart.totalQuantity)


    const [isNavVisible, setIsNavVisible] = useState(true);
    const [prevScrollY, setPrevScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
        const currentScrollY = window.scrollY;
        

        setIsNavVisible(currentScrollY < 150);
        setPrevScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollY]);




    return (
            <header className='header' style={{ height: isNavVisible ? '100px' : '70px'}}>
                <Container>
                    <Row>
                        <div className="nav_wrapper">
                            <NavLink to='home'>
                                <div className="logo">
                                    <img src={logo} alt="logo" />
                                    <h3>Video Store</h3>
                                </div>
                            </NavLink>
                            <div className="navigation">
                                <ul className="menu">
                                    <div className="nav_icons">
                                        <span className="user_icon"><NavLink to='login'><UserLineIcon size={30} /> Login</NavLink></span>
                                        <span className="fav_icon"><NavLink to='apps/wishlist'><Heart3LineIcon size={30} /><span className="badge">1</span></NavLink></span>
                                        <span className="cart_icon"><NavLink to='cart'><ShoppingCartLineIcon size={30} />
                                        {totalQuantity > 0 && <span className="badge">{totalQuantity}</span>}
                                        </NavLink></span>

                                    </div>
                                    <div className="mobile_menu">
                                        <span>
                                            <MenuLineIcon size={27} />
                                        </span>
                                    </div>
                                </ul>
                            </div>
                        </div>




                    </Row>
                    <Row>
                        <ul id='nav' style={{ display: isNavVisible ? 'flex' : 'none',
                    opacity: isNavVisible ? '1' : '0' }}>
                            {
                                nav_links.map((item, index) => (
                                    <li className="nav_item" key={index}>
                                        <NavLink
                                            to={'collections/' + item.path} 
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
                    </Row>
                </Container>
            </header>
    )
}

export default Header