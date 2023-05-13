import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';

import './App.css';

import { Layout } from './components/layout/Layout';
import { loadStripe } from '@stripe/stripe-js';

import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);


    
function App() {
    const options = {
        // passing the client secret obtained from the server
        clientSecret: '',
      };

      return (
        // <PayPalScriptProvider options={{"client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID, "currency": "AUD"}}>
        <div className="App">
            <Elements stripe={stripePromise} options={{options}}>
            <ScrollToTop />
            <Layout />
            </Elements>
        </div>
        // </PayPalScriptProvider>

      );
}
 
export default App;




function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        document.documentElement.scrollTo({
        // In general, if you want to scroll to the top of the page, using document.documentElement.scrollTop is the more reliable and widely used approach. However, if you need to scroll to a specific position on the page or use more advanced scrolling behaviors, window.scrollTo or window.scrollBy may be more appropriate.
        top: 0,
        left: 0,
        behavior: "instant",
        });
    }, [pathname]);

    return null;
}