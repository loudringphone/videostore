import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import { auth } from "../firebase_setup/firebase"
import {db} from '../firebase_setup/firebase';
import { doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth"
import { toast } from "react-toastify"
import useAuth from '../custom-hook/useAuth'



import processing from '../assets/images/loading.gif'
import '../styles/account-page.css'

const Logout = () => {
    const cart = useSelector(state => state.cart)
    const wishlist = useSelector(state => state.wishlist)
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const currentUser = useAuth()
   
    const logout = async () => {

      async function updateUserWishlist() {
        const userRef = doc(db, "customers", currentUser.uid);
        await updateDoc(userRef, {
            wishlist: wishlist
          });
        console.log('updateUserWishlist')
      }
      async function updateUserCart() {
        const userRef = doc(db, "customers", currentUser.uid);
        await updateDoc(userRef, {
            cart: cart
          });
        console.log('updateUserCart',cart)

      }
      try {
        await updateUserWishlist();
        await updateUserCart();
        await signOut(auth).then(() => {
            toast.dismiss()
            toast.success("Successfully logged out.", {autoClose: 1500})
            if (pathname==="/account/logout") {
                navigate('/')
            }
            }).catch(error => {
                console.log(error.message)
            })
      } catch(error) {
        console.log(error.message);
        console.log(auth.currentUser)
        if (auth.currentUser === null) {
          navigate('/')
        }else {
          await signOut(auth).then(() => {
            toast.dismiss()
            toast.success("Successfully logged out.", {autoClose: 1500})
            if (pathname==="/account/logout") {
                navigate('/')
            }
            }).catch(error => {
                console.log(error.message)
          })
        }
        
      }
    }
    
    useEffect(() => {
      if (currentUser != null) {       
        logout()
      } else {
        navigate('/')
      }
  }, [currentUser])
  

    return (
        <section className='account-page-register'>
          <div className="processing">
            <img src={processing} alt="processing" style={{height: '30px'}}/>
          Securely logging you out...
          </div>
        </section>
      )
}

export default Logout;