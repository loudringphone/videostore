import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from '../components/helmet/Helmet'
import { cartActions } from '../redux/slices/cartSlice';
import CartItemCard from '../components/UI/CartItemCard';
import accounting from 'accounting'
import { firebaseQuery } from '../functions/firebaseQuery';
import processing from '../assets/images/loading.gif'
import '../styles/cart.css'
import {db} from '../firebase_setup/firebase';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { toast, Zoom } from "react-toastify";

export const Cart = (props) => {
  const cart = useSelector(state => state.cart)
  const [cartItemIds, setCartItemIds] = useState([])
  const [items, setItems] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const functions = getFunctions();
  
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

  const navigate = useNavigate()
  const checkout = async function(e) {
    e.preventDefault()
    if (!props.currentUser) {
      toast.error("Please login/signup before checkout.", { className: "custom-toast-error", transition: Zoom })
      return navigate('/account/login')
    }
    try {
      let lineItems = [];
      let checkoutCartItems = [];
      items.forEach((item)=>{
        cart.cartItems.forEach((ci)=>{
          if (ci.id === item.id) {
            const purchase = {};
            const checkoutCartitem = {};
            // purchase.price = item.prices[0] //prices from stripe client-only integration
            checkoutCartitem.id = item.id;
            checkoutCartitem.name = item.name;
            checkoutCartitem.price = item.price;
            checkoutCartitem.quantity = ci.quantity;
            checkoutCartitem.totalPrice = ci.quantity * item.price;
            purchase.price_data = {};
            purchase.price_data.currency = "aud";
            purchase.price_data.unit_amount = item.price * 100; //prices from firebase using cloud functions server-and-client integration
            purchase.price_data.product_data = {};
            purchase.price_data.product_data.name = item.name; //server-and-client integration
            purchase.quantity = ci.quantity;
            checkoutCartItems.push(checkoutCartitem);
            lineItems.push(purchase);
          }
        })
      })
      console.log(lineItems)
      async function updateUserCart() {
        const userRef = doc(db, "customers", props.currentUser.uid);
        await updateDoc(userRef, {
            checkoutCartItems: checkoutCartItems
          });
        console.log('updateUserCart',cart)
      }


      async function getUserData() {
        try {
          const userRef = doc(db, "customers", props.currentUser?.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            return userData;
          } else {
            return null;
          }
        }
        catch(error){
          console.error(error)
        }
      }
      const userInfo = await getUserData()
     
      let stripeId = null
      let userEmail = null

      if (userInfo != null) {
        stripeId = userInfo.stripeId
        userEmail = userInfo.email
        updateUserCart()
      }
      console.log(props.currentUser?.uid)

      const createStripeCheckout = httpsCallable(functions, 'createStripeCheckout');
      createStripeCheckout({
        // cartItems: cart.cartItems,
        lineItems: lineItems,
        mode: "payment",
        // customerEmail: userEmail,
        customer: stripeId,
        successUrl: `${window.location.origin}/account`,
        cancelUrl: `${window.location.origin}/cart`,
        uid: props.currentUser?.uid,
      })
        .then(result => {
          if (result.data.url) {
            console.log(result.data.id)
            window.location.assign(result.data.url)
          }
          // const sessionId = result.data.id
        
        })
        .catch(error => {
          // Handle any errors from the Cloud Function here
          console.error(error);
          // preliminaryOrderForCheckout(null)
        });
    } catch(error) {
      console.error(error)
      // preliminaryOrderForCheckout(null)
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
