import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import { Shop } from '../pages/Shop'
import { Wishlist } from '../pages/Wishlist'
import { Cart } from '../pages/Cart'
import { ProductDetails } from '../pages/ProductDetails'
import { Checkout } from '../pages/Checkout'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='apps/wishlist' element={<Wishlist />} />
            <Route path='collections/:id' element={<Shop />} />
            <Route path='shop/:id' element={<Shop />} />
            <Route path='/search' element={<Shop />} />
            <Route path='apps/wishlist/:itemId' element={<ProductDetails />} />
            <Route path='products/:itemId' element={<ProductDetails />} />
            <Route path='shop/:id/:itemId' element={<ProductDetails />} />
            <Route path='shop/all/:itemId' element={<ProductDetails />} />
            <Route path='collections/:id/:itemId' element={<ProductDetails />} />
            <Route path='cart' element={<Cart />} />
            <Route path='checkout' element={<Checkout />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
        </Routes>
    )
};

export default Routers;

