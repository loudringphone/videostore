import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import { Shop } from '../pages/Shop'
import { Wishlist } from '../pages/Wishlist'
import { Cart } from '../pages/Cart'
import { ProductDetails } from '../pages/ProductDetails'
import { Checkout } from '../pages/Checkout'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Signup from '../pages/Signup'
import ProtectedRoute from "./ProtectedRoute";


const Routers = () => {
    
    const {pathname} = useLocation();
    const [prevLocation, setPrevLocation] = useState(null);

    useEffect(() => {
        if (pathname !== '/account/login' && pathname !== '/account/register') {
            setPrevLocation(pathname);
        }
      }, [pathname]);

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='apps/wishlist' element={<Wishlist />} />
            <Route path='collections/:id' element={<Shop />} />
            <Route path='shop/:id' element={<Shop />} />
            <Route path='search' element={<Shop />} />
            <Route path='apps/wishlist/:itemId' element={<ProductDetails />} />
            <Route path='products/:itemId' element={<ProductDetails />} />
            <Route path='shop/:id/:itemId' element={<ProductDetails />} />
            <Route path='shop/all/:itemId' element={<ProductDetails />} />
            <Route path='collections/:id/:itemId' element={<ProductDetails />} />
            <Route path='cart' element={<Cart />} />
            <Route path='checkout' element={
                <ProtectedRoute>
                    <Checkout />
                </ProtectedRoute>} />
            <Route path='account/login' element={<Login prevLocation={prevLocation} />} />
            <Route path='account/logout' element={<Logout/>} />

            <Route path='account/register' element={<Signup prevLocation={prevLocation} />} />
        </Routes>
    )
};

export default Routers;

