import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import { Helmet } from '../components/helmet/Helmet'
import { cartActions } from '../redux/slices/cartSlice';
import CartItemCard from '../components/UI/CartItemCard';
import accounting from 'accounting'
import { firebaseQuery } from '../functions/firebaseQuery';
import processing from '../assets/images/loading.gif'
import '../styles/cart.css'
import { loadStripe } from '@stripe/stripe-js';
import {db} from '../firebase_setup/firebase';
import { doc, updateDoc } from "firebase/firestore";


export const Cart = (props) => {
  const cart = useSelector(state => state.cart)
  const [cartItemIds, setCartItemIds] = useState([])
  const [items, setItems] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    setTimeout(() => {
      setLoading(false);
    }, 1500);

  }, [cart]);
  const dispatch = useDispatch();
  useEffect(()=>{
    for (let item of items) {
      dispatch(cartActions.addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 0,
      }))
    }

  }, [items])
  useEffect(()=>{
    if (cart.cartItems.length > 0) {
      let arr = []
      for (let item of cart.cartItems) {
        if (item.id) {
          arr.push(item.id)
        } else {
          dispatch(cartActions.removeAllItems())
        }
      }
      setCartItemIds(arr)
    }
  }, [cart])
  useEffect(()=>{
    if (cartItemIds.length > 0 && !isFetched) {
      fetchItems();
      setIsFetched(true);
    }
  }, [cartItemIds, isFetched])

  useEffect(() => {
    let updatedCartItems = cart.cartItems.map((cartItem) => {
      let item = items.find((item) => item.id === cartItem.id);
      if (item) {
        return {
          ...cartItem,
          image: item.image,
          stock: item.stock
        };
      } else {
        return {
          ...cartItem,
          image: [{downloadURL: ""}],
          stock: 0
        };
      }
    });
    setCartItems(updatedCartItems)
    // setLoading(false);
  }, [cart.cartItems, items]);

  let title = "Your Basket";
  

  const fetchItems = async () => {
    const newData = await firebaseQuery(cartItemIds, "products");
    setItems(newData);
  }
  

  const [showArrow, setShowArrow] = useState(false);

  const handleMouseOver = () => {
    setShowArrow(true);
  }

  const handleMouseLeave = () => {
    setShowArrow(false);
  }

  async function preliminaryOrderForCheckout(randomCode) {
    const userRef = doc(db, "customers", props.currentUser.uid);
    await updateDoc(userRef, {
      preliminaryOrder: {
                        orderId: randomCode,
                        address: {firstName:"testF",lastName:"testL",company:"",address1:"",address2:"",city:"",country:"",state:"Australia",zip:"",phone:""}
                      }
      });
  }
 
 
  const checkout = async function(e) {
    e.preventDefault()
    try {
      let stripePromise
      const getStripe = () => {
        if (!stripePromise) {
          stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
        }

        return stripePromise;
      };
      
      let lineItems = []
      items.forEach((item)=>{
      const purchase = {}
      purchase.price = item.prices[0]
      cart.cartItems.forEach((ci)=>{
        if (ci.id === item.id) {
          purchase.quantity = ci.quantity
        }
      })
      lineItems.push(purchase)})

      async function updateUserCart() {
        const userRef = doc(db, "customers", props.currentUser.uid);
        await updateDoc(userRef, {
            cart: cart
          });
        console.log('updateUserCart',cart)
      }
    
      let userEmail = undefined
      if (props.currentUser != null) {
        userEmail = props.currentUser.email
        updateUserCart()
      }
      
      function generateTemporaryCode(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }

      const temporaryCode = generateTemporaryCode(15)
      
      preliminaryOrderForCheckout(temporaryCode)

      const checkoutOptions = {
        lineItems: lineItems,
        mode: "payment",
        customerEmail: userEmail,
        successUrl: `${window.location.origin}/account/orders/${temporaryCode}`,
        cancelUrl: `${window.location.origin}/cart`,
        // shippingAddressCollection: {
        //   allowedCountries: ['US', 'CA', 'AU'],
        // },
      };
          console.log("redirectToCheckout");
        
          const stripe = await getStripe();
          const { error } = await stripe.redirectToCheckout(checkoutOptions);
          if (error) {
            console.log("Stripe checkout error", error);
            preliminaryOrderForCheckout(null)
          }
    } catch(error) {
      console.log(error)
    }
  };


  
  


  if (loading) {
    return (
      <Helmet title='Your Basket'>
        <>
        <header className='cart-title'>
        <div className='cart-title-left'>
          <h2>Your basket</h2>
        </div>
        <div className='cart-title-right'>
          
        <Link to='/' className='cart-continue' onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver}>
  Continue shopping&nbsp;
  {showArrow ? (
    <i className="ri-arrow-right-line"></i>
  ) : (
    <i className="ri-arrow-right-s-line"></i>
  )}
</Link>
        </div>
      </header>
      <section className='cartitems--container-empty'>

<div className="processing">
        <img src={processing} alt="processing" style={{height: '30px'}}/>
        Retrieving shopping cart...
</div>
</section>
        </>
        
      </Helmet>

    )
  }

  return (
    <Helmet title={title}>
      
      {cartItems.length > 0 ? (
        <> 
        <header className='cart-title'>
        <div className='cart-title-left'>
          <h2>Your basket</h2>
          <div className='cart-title-total-small'>
            <p>Subtotal</p>
            {accounting.formatMoney(cart.totalAmount)}
          </div>
        </div>
        <div className='cart-title-right'>
          <div className='cart-title-total-large'>
            <p>Subtotal</p>
            {accounting.formatMoney(cart.totalAmount)}
          </div>
          <Link to='/'><button onClick={checkout} className='cart-title-button'><i className="ri-shopping-cart-line"></i>&nbsp;Check out</button></Link>
          {/* <PaypalCheckoutButton products={items} /> */}
        </div>
      </header>
        <section className='cartitems--container'>
          <ul className="cartitems--list">
            {
              cartItems?.map((item, i) => (
                item.id? (
                  <li key={i}>
                    <CartItemCard item={item}/>
                  </li>
                ):(
                  <></>
                )
              ))
          }
          </ul>
        </section>
        <div className="cart-final-total">
          <div className="cart-subtitle">
            <p>Subtotal</p>
            {accounting.formatMoney(cart.totalAmount)}
          </div>
          <div className="cart-shipping">
            <p className='cart-message'>Tax included and shipping calculated at checkout</p>
          </div>
          <Link to='/'><button onClick={checkout} className='primary-checkout'><i className="ri-shopping-cart-line"></i>&nbsp;Check out</button></Link>
          <Link to='/' className='cart-continue' onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver}>
  Continue shopping&nbsp;
  {showArrow ? (
    <i className="ri-arrow-right-line"></i>
  ) : (
    <i className="ri-arrow-right-s-line"></i>
  )}
</Link>
        </div>
        </>
    ):(
        <>
        <header className='cart-title'>
        <div className='cart-title-left'>
          <h2>Your basket</h2>
        </div>
        <div className='cart-title-right'>
          
        <Link to='/' className='cart-continue' onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver}>
  Continue shopping&nbsp;
  {showArrow ? (
    <i className="ri-arrow-right-line"></i>
  ) : (
    <i className="ri-arrow-right-s-line"></i>
  )}
</Link>
        </div>
      </header>
        <section className='cartitems--container-empty'>

          <div className="cartitems-empty">
            <p>Your basket is empty</p>
            <Link to='/'><button><i className="ri-shopping-cart-line"></i>&nbsp;Continue shopping</button>
  </Link>
          </div>
        </section>
   
        </>
      )}
      
    
    </Helmet>
  )
}
